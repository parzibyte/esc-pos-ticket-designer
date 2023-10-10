<script setup lang="ts">
import { onMounted, ref, toRaw } from "vue";
import type { Ref } from "vue";
import {
  type OperacionDelDiseñador,
} from "../types/Tipos";
import Select from "@/components/Select.vue";
import ComponenteOperacion from "@/components/Operacion.vue";
import Corte from "@/components/Operaciones/Corte.vue"
import DefinirCaracterPersonalizado from "@/components/Operaciones/DefinirCaracterPersonalizado.vue";

const referenciaAlSelect = ref(null);
const todasLasOperaciones: Ref<Array<OperacionDelDiseñador>> = ref([
  {
    nombre: "Corte",
    descripcion: `Avanza el papel especificado por el número de líneas y después lo corta`,
    componente: Corte,
    argumentos: {
      lineas: 10,
    }
  },
  {
    nombre: "Corte parcial",
    descripcion: `Corte parcial`,
    componente: Corte,
  },
  {
    nombre: "Carácter personalizado",
    descripcion: `Establece un carácter personalizado de 24x12.`,
    componente: DefinirCaracterPersonalizado,
    argumentos: { dibujo: [["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]] },
  },
  {
    nombre: "Imagen",
    descripcion: `Imprime una imagen`,
    componente: DefinirCaracterPersonalizado,
  },
]);

const operaciones: Ref<Array<OperacionDelDiseñador>> = ref([]);
const agregarOperacionSeleccionada = () => {
  const opcionSeleccionadaSinReferencias = Object.assign({}, opcionSeleccionada.value);
  //opcionSeleccionadaSinReferencias.argumentos = Object.assign({}, opcionSeleccionadaSinReferencias.argumentos);
  opcionSeleccionadaSinReferencias.argumentos = structuredClone(toRaw(opcionSeleccionadaSinReferencias.argumentos));
  operaciones.value.push(opcionSeleccionadaSinReferencias);
  referenciaAlSelect.value.clearSelectedItem();
};
const displayItemFunction = (op: OperacionDelDiseñador): string => {
  return op.nombre;
};

const filterFunction = (criteria: string, items: OperacionDelDiseñador[]) => {
  const expresion = new RegExp(`${criteria}.*`, "i");
  return items.filter((opcion: OperacionDelDiseñador) => {
    return expresion.test(opcion.nombre) || expresion.test(opcion.descripcion);
  });
};
const opcionSeleccionada: Ref<OperacionDelDiseñador> = ref({
  nombre: "",
  descripcion: "",
});

const eliminarOperacionPorIndice = (indice: number) => {
  operaciones.value.splice(indice, 1);
}

const guardar = () => {
  for (const operacion of operaciones.value) {
    console.log(operacion.argumentos);
  }
}

</script>
<template>
  <div>
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
    <button class="bg-lime-400 p-1 rounded-md text-white my-1" @click="agregarOperacionSeleccionada">
      Agregar
    </button>
    <button class="bg-lime-400 p-1 rounded-md text-white my-1" @click="guardar">
      Guardar todo
    </button>
  </div>
</template>