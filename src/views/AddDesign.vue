<script setup lang="ts">
import { OperacionFactory, Operacion } from "../types/Tipos"
import { ref, type Ref, onMounted } from "vue";
import Select from "@/components/Select.vue";
import ComponenteOperacion from "@/components/Operacion.vue";
import { useDatabaseStore } from "@/stores/db"
const store = useDatabaseStore();
const referenciaAlSelect = ref(null);
const diseñoActualmenteEditado = ref({});
const props = defineProps<{
  id: number,
}>();
const todasLasOperaciones: Ref<Array<Operacion>> = ref([
  OperacionFactory.crearAPartirDeClaveYArgumentos("Corte", { lineas: 1 }),
  OperacionFactory.crearAPartirDeClaveYArgumentos("DefinirCaracterPersonalizado", { caracterQueReemplaza: "", matrizDeBits: [["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]] }),

]);
const operaciones: Ref<Array<Operacion>> = ref([]);
const agregarOperacionSeleccionada = async () => {
  const operacionSinReferencias = opcionSeleccionada.value.clonar();
  const argumentosSerializados = operacionSinReferencias.obtenerArgumentosRealesSerializados();
  const operacionRecienInsertada = await store.exec("INSERT INTO operaciones_diseños(id_diseño, clave, argumentos) VALUES (?, ?, ?) RETURNING *",
    [props.id, operacionSinReferencias.clave, argumentosSerializados],
  )
  console.log({ operacionRecienInsertada });
  operaciones.value.push(operacionSinReferencias);
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
const opcionSeleccionada: Ref<Operacion> = ref(OperacionFactory.crearAPartirDeClaveYArgumentos("", {}));

const eliminarOperacionPorIndice = (indice: number) => {
  operaciones.value.splice(indice, 1);
}

const imprimir = () => {
  for (const operacion of operaciones.value) {
    console.log(operacion.obtenerArgumentosPorPlataforma("Desktop"));
  }
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

onMounted(async () => {
  const diseñosCoincidentesConId = await store.exec(`select d.id,
	d.nombre,
	d.fecha_creacion,
	d.fecha_modificacion,
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
    const operacion = OperacionFactory.crearAPartirDeClaveYArgumentosSerializados(operacionSerializada.clave, operacionSerializada.argumentos);
    operaciones.value.push(operacion);
    console.log({ operacion });
  }

})

</script>
<template>
  <div class="p-1">
    <h1 class="text-4xl" contenteditable="">{{ diseñoActualmenteEditado.nombre }}</h1>
    <div class="bg-pink-500">
      <ComponenteOperacion :key="'componente_' + indice" @eliminar="eliminarOperacionPorIndice(indice)"
        v-for="(operacion, indice) in operaciones" :operacion="operacion" />
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
</template>