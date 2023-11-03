<script setup lang="ts">
import { Operacion, listaCompletaDeOperaciones } from "../types/Operacion"
import { OperacionFactory } from "../types/OperacionFactory"
import { ref, type Ref, onMounted } from "vue";
import Select from "@/components/Select.vue";
import ComponenteOperacion from "@/components/Operacion.vue";
import { useDatabaseStore } from "@/stores/db"
import { debounce } from "@/Helpers"
const store = useDatabaseStore();
const referenciaAlSelect = ref(null);
const diseñoActualmenteEditado = ref({});
const props = defineProps<{
  id: number,
}>();
const todasLasOperaciones: Ref<Array<Operacion>> = ref(listaCompletaDeOperaciones);
const operaciones: Ref<Array<Operacion>> = ref([]);
const agregarOperacionSeleccionada = async () => {
  const operacionSinReferencias = opcionSeleccionada.value.clonar();
  const argumentosSerializados = operacionSinReferencias.obtenerArgumentosRealesSerializados();
  const operacionesInsertadas = await store.exec("INSERT INTO operaciones_diseños(id_diseño, clave, argumentos) VALUES (?, ?, ?) RETURNING *",
    [props.id, operacionSinReferencias.clave, argumentosSerializados],
  )
  const operacionRecienInsertada = operacionesInsertadas[0];
  const operacion = OperacionFactory.crearAPartirDeClaveYArgumentosSerializados(
    operacionRecienInsertada.id, operacionRecienInsertada.clave, operacionRecienInsertada.argumentos);
  operaciones.value.push(operacion);
  referenciaAlSelect.value.clearSelectedItem();
};
const displayItemFunction = (op: Operacion): string => {
  return op.nombre;
};

const filterFunction = (criteria: string, items: Operacion[]) => {
  const expresion = new RegExp(`${criteria}.*`, "i");
  return items.filter((opcion: Operacion) => {
    return expresion.test(opcion.nombre) || expresion.test(opcion.descripcion);
  });
};
const opcionSeleccionada: Ref<Operacion> = ref(OperacionFactory.crearAPartirDeClaveYArgumentos(0, "", {}));

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
  return `curl -X POST https://reqbin.com/echo/post/json
-H 'Content-Type: application/json'
-d '{"login":"my_login","password":"my_password"}'`;
};

const imprimir = async () => {
  await fetch(`${diseñoActualmenteEditado.value.ruta_api}/imprimir`, {
    method: "POST",
    body: obtenerPayloadComoJson(),
  })

}
const guardar = async () => {
  for (const operacion of operaciones.value) {
    const argumentosSerializados = operacion.obtenerArgumentosRealesSerializados();
    const operacionRecienInsertada = await store.exec("INSERT INTO operaciones(clave, argumentos) VALUES (?, ?) RETURNING *",
      [operacion.clave, argumentosSerializados],
    )
    console.log({ operacionRecienInsertada });
  }
}


const onActualizado = debounce(async (op: Operacion) => {
  console.log("se actualizó alguna operación");
  const operacionRecienInsertada = await store.exec(`UPDATE operaciones_diseños SET argumentos = ? WHERE id = ?`,
    [op.clonar().obtenerArgumentosRealesSerializados(), op.id]);
  await store.exec(`UPDATE diseños SET fecha_modificacion = ? WHERE id = ?`, [new Date().toLocaleDateString(), props.id]);
  console.log({ operacionRecienInsertada });
}, 500);


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
  const operacionesSerializadas = await store.exec("SELECT id, clave, argumentos FROM operaciones_diseños WHERE id_diseño = ?", [props.id]);
  for (const operacionSerializada of operacionesSerializadas) {
    const operacion = OperacionFactory.crearAPartirDeClaveYArgumentosSerializados(operacionSerializada.id, operacionSerializada.clave, operacionSerializada.argumentos);
    operaciones.value.push(operacion);
    console.log({ operacion });
  }

})

</script>
<template>
  <div class="flex flex-col md:flex-row">
    <div class="p-1 bg-gray-100 w-full md:w-3/4">
      <h1 class="text-4xl" contenteditable="">{{ diseñoActualmenteEditado.nombre }}</h1>
      <div class="">
        <ComponenteOperacion @actualizado="onActualizado" :key="'componente_' + indice"
          @eliminar="eliminarOperacionPorIndice(indice)" v-for="(operacion, indice) in operaciones"
          :operacion="operacion" />
      </div>
      <div class="max-w-xs content-center">
        <Select ref="referenciaAlSelect" :filterFunction="filterFunction" :items="todasLasOperaciones"
          :displayItemFunction="displayItemFunction" v-model="opcionSeleccionada" label="Selecciona una opción">
          <template #item="{ item, index }">
            <h1 class="text-xl">{{ item.nombre }}</h1>
            <p>{{ item.descripcion }}</p>
          </template>
        </Select>
        <button class="bg-lime-400 p-1 rounded-md text-white m-1" @click="agregarOperacionSeleccionada">
          Agregar
        </button>
        <button class="bg-lime-400 p-1 rounded-md text-white m-1" @click="imprimir">
          Imprimir
        </button>
        <button class="bg-lime-400 p-1 rounded-md text-white m-1" @click="guardar">
          Guardar
        </button>
      </div>
    </div>
    <div class="bg-white w-full md:w-1/4 overflow-x-auto p-1 break-words">
      <code>{{ obtenerCodigo() }}</code>
    </div>
  </div>
</template>