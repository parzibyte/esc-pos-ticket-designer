<script setup lang="ts">
import { Operacion, listaCompletaDeOperaciones } from "../types/Operacion"
import { OperacionFactory } from "../types/OperacionFactory"
import { ref, type Ref, onMounted } from "vue";
import ComponenteOperacion from "@/components/Operacion.vue";
import { useDatabaseStore } from "@/stores/db"
import { debounce } from "@/Helpers"
import type { OperacionConIndice } from "@/types/Tipos";
import ListaDeOperacionesParaAgregar from "@/components/ListaDeOperacionesParaAgregar.vue";
const store = useDatabaseStore();
const diseñoActualmenteEditado = ref({});
const props = defineProps<{
  id: number,
}>();
const todasLasOperaciones: Ref<Array<Operacion>> = ref(listaCompletaDeOperaciones);
const operaciones: Ref<Array<Operacion>> = ref([]);

const eliminarOperacionPorIndice = async (indice: number) => {
  const operacionParaEliminar = operaciones.value[indice];
  await store.exec("DELETE FROM operaciones_diseños WHERE id = ?", [operacionParaEliminar.id])
  operaciones.value.splice(indice, 1);
}

const obtenerPayload = () => {
  const operacionesParaPayload = [];
  for (const operacion of operaciones.value) {
    operacionesParaPayload.push(...(operacion.obtenerArgumentosPorPlataforma(diseñoActualmenteEditado.value.plataforma)));
  }
  return {
    nombreImpresora: diseñoActualmenteEditado.value.impresora,
    serial: diseñoActualmenteEditado.value.licencia,
    operaciones: operacionesParaPayload,
  };
}

const obtenerPayloadComoJson = () => {
  return JSON.stringify(obtenerPayload())
}

const obtenerCodigo = () => {
  return obtenerPayload();
}

const imprimir = async () => {
  await fetch(`${diseñoActualmenteEditado.value.ruta_api}/imprimir`, {
    method: "POST",
    body: obtenerPayloadComoJson(),
  })

}


const onActualizado = debounce(async (op: Operacion) => {
  console.log("se actualizó alguna operación");
  console.log(op.clonar());

  const operacionRecienInsertada = await store.exec(`UPDATE operaciones_diseños SET argumentos = ? WHERE id = ?`,
    [op.clonar().obtenerArgumentosRealesSerializados(), op.id]);
  await store.exec(`UPDATE diseños SET fecha_modificacion = ? WHERE id = ?`, [new Date().toLocaleDateString(), props.id]);
  console.log({ operacionRecienInsertada });
}, 500);


const refrescarOperacionesDeDiseñoActualmenteEditado = async () => {
  operaciones.value = [];
  const operacionesSerializadas = await store.exec("SELECT id, clave, argumentos, orden FROM operaciones_diseños WHERE id_diseño = ? ORDER BY orden ASC", [props.id]);
  for (const operacionSerializada of operacionesSerializadas) {
    const operacion = OperacionFactory.crearAPartirDeClaveYArgumentosSerializados(operacionSerializada.id, operacionSerializada.clave, operacionSerializada.argumentos, operacionSerializada.orden);
    operaciones.value.push(operacion);
  }
}

onMounted(async () => {
  const diseñosCoincidentesConId = await store.exec(`select d.id,
	d.nombre,
	d.fecha_creacion,
	d.fecha_modificacion,
	d.impresora,
	p.id AS id_plataforma,
	p.nombre AS plataforma,
	p.licencia,
	p.ruta_api
from diseños d
	inner join plataformas p on d.id_plataforma = p.id
  WHERE d.id = ?`, [props.id]);

  diseñoActualmenteEditado.value = diseñosCoincidentesConId[0];
  await refrescarOperacionesDeDiseñoActualmenteEditado();
})

const onOperacionIntercambiada = async (operacionReemplazoConIndice: OperacionConIndice, operacionReemplazadaConIndice: OperacionConIndice) => {
  const ordenReemplazo = operacionReemplazoConIndice.operacion.orden;
  const ordenReemplazado = operacionReemplazadaConIndice.operacion.orden;
  const idReemplazo = operacionReemplazoConIndice.operacion.id;
  const idReemplazado = operacionReemplazadaConIndice.operacion.id;
  await store.exec("UPDATE operaciones_diseños SET orden = ? WHERE id = ?",
    [ordenReemplazado, idReemplazo]);
  await store.exec("UPDATE operaciones_diseños SET orden = ? WHERE id = ?",
    [ordenReemplazo, idReemplazado]);
  await refrescarOperacionesDeDiseñoActualmenteEditado();
}

const onOperacionSeleccionada = async (operacion: Operacion) => {
  const operacionSinReferencias = operacion.clonar();
  const argumentosSerializados = operacionSinReferencias.obtenerArgumentosRealesSerializados();
  const operacionesInsertadas = await store.exec(` INSERT INTO
    operaciones_diseños(id_diseño, clave, argumentos, orden)
VALUES
    (
        ?,
        ?,
        ?,
        (
            SELECT
                COALESCE(
                    (
                        SELECT
                            orden
                        FROM
                            operaciones_diseños
                        WHERE
                            id_diseño = ?
                        ORDER BY
                            orden DESC
                        LIMIT
                            1
                    ), 0
                )
        ) + 1
    ) RETURNING *`,
    [props.id, operacionSinReferencias.clave, argumentosSerializados, props.id],
  )
  const operacionRecienInsertada = operacionesInsertadas[0];
  const operacionParaAgregarAlArreglo = OperacionFactory.crearAPartirDeClaveYArgumentosSerializados(
    operacionRecienInsertada.id, operacionRecienInsertada.clave, operacionRecienInsertada.argumentos, operacionRecienInsertada.orden);
  operaciones.value.push(operacionParaAgregarAlArreglo);
}

</script>
<template>
  <div class="flex flex-col md:flex-row">
    <div class="p-1 bg-gray-100 w-full md:w-3/4">
      <h1 class="text-4xl" contenteditable="">{{ diseñoActualmenteEditado.nombre }}</h1>
      <div class="">
        <ComponenteOperacion @intercambiar="onOperacionIntercambiada" :indice="indice" @actualizado="onActualizado"
          :key="'componente_' + indice" @eliminar="eliminarOperacionPorIndice(indice)"
          v-for="(operacion, indice) in operaciones" :operacion="operacion" />
      </div>
      <div class="bg-red-500">
        <ListaDeOperacionesParaAgregar @operacionSeleccionada="onOperacionSeleccionada"
          :operaciones="todasLasOperaciones"></ListaDeOperacionesParaAgregar>
      </div>
      <div class="max-w-xs content-center">
        <button class="bg-lime-400 p-1 rounded-md text-white m-1" @click="imprimir">
          Imprimir
        </button>
      </div>
    </div>
    <div class="bg-white w-full md:w-1/4 overflow-x-auto p-1 break-words">
      <pre>{{ obtenerCodigo() }}</pre>
    </div>
  </div>
</template>
<style></style>