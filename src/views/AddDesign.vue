<script setup lang="ts">
import { Operacion, listaCompletaDeOperaciones } from "../types/Operacion"
import { OperacionFactory } from "../types/OperacionFactory"
import { ref, type Ref, onMounted } from "vue";
import ComponenteOperacion from "@/components/Operacion.vue";
import { useDatabaseStore } from "@/stores/db"
import { debounce, obtenerPayload, convertirOperacionesSerializadasAReactivas, obtenerPayloadComoJson } from "@/Helpers"
import type { OperacionConIndice } from "@/types/Tipos";
import ListaDeOperacionesParaAgregar from "@/components/ListaDeOperacionesParaAgregar.vue";
import BotonImprimir from "@/components/BotonImprimir.vue";
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

const obtenerCodigo = () => {
  return obtenerPayload(
    diseñoActualmenteEditado.value.plataforma,
    operaciones.value,
    diseñoActualmenteEditado.value.impresora,
    diseñoActualmenteEditado.value.licencia,
  );
}

const imprimir = async () => {
  await fetch(`${diseñoActualmenteEditado.value.ruta_api}/imprimir`, {
    method: "POST",
    body: obtenerPayloadComoJson(diseñoActualmenteEditado.value.plataforma, operaciones.value, diseñoActualmenteEditado.value.impresora, diseñoActualmenteEditado.value.licencia),
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
  operaciones.value = [];// Necesario para que se escuche el change de los argumentos
  operaciones.value = convertirOperacionesSerializadasAReactivas(await store.obtenerOperacionesDeDiseño(props.id));
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

const onErrorImprimiendo = (err) => {
  alert("Error imprimiendo: " + err);
}

</script>
<template>
  <div class="flex flex-col md:flex-row">
    <div class="p-1 bg-gray-100 w-full md:w-3/4">
      <div class="p-2 bg-indigo-600 w-full text-white rounded-md">
        <div class="flex flex-row items-end">
          <p class="text-4xl capitalize mr-2" contenteditable="">{{ diseñoActualmenteEditado.nombre }}</p>
          <p>
            <strong>Creado </strong> {{ diseñoActualmenteEditado.fecha_creacion }} <strong>Modificado</strong> {{
              diseñoActualmenteEditado.fecha_modificacion }}
          </p>
          <div class="inline-block bg-blue-500 rounded-md text-white p-1 text-sm ml-2">
            {{ diseñoActualmenteEditado.plataforma }}
            ({{ diseñoActualmenteEditado.impresora }})
          </div>
        </div>
        <BotonImprimir @error="onErrorImprimiendo" :diseño="diseñoActualmenteEditado"></BotonImprimir>
      </div>
      <div v-show="operaciones.length <= 0" class="bg-sky-500 my-2 p-8 rounded-md text-center text-white text-2xl">
        <p>Tu diseño está vacío. Elige una operación de la lista de abajo para empezar</p>
      </div>
      <div class="">
        <ComponenteOperacion @intercambiar="onOperacionIntercambiada" :indice="indice" @actualizado="onActualizado"
          :key="'componente_' + indice" @eliminar="eliminarOperacionPorIndice(indice)"
          v-for="(operacion, indice) in operaciones" :operacion="operacion" />
      </div>
      <div class="bg-red-500">
        <ListaDeOperacionesParaAgregar @operacionSeleccionada="onOperacionSeleccionada"
          :operaciones="todasLasOperaciones"></ListaDeOperacionesParaAgregar>
      </div>
    </div>
    <div class="bg-white w-full md:w-1/4 overflow-x-auto p-1 break-words">
      <pre>{{ obtenerCodigo() }}</pre>
    </div>
  </div>
</template>
<style></style>