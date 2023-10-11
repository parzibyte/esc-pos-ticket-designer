<script setup lang="ts">
import type { OperacionDelDiseñador, ArgumentosParaDefinirCaracterPersonalizado, ArgumentosParaDefinirCorte } from "../types/Tipos";
import { ref, toRaw } from "vue";
import type { Ref } from "vue";
import Select from "@/components/Select.vue";
import ComponenteOperacion from "@/components/Operacion.vue";
const crearAPartirDeClaveYArgumentos = (clave: string, argumentos: any): OperacionDelDiseñador => {
  const mapa: { [key: string]: OperacionDelDiseñador } = {
    "Corte": {
      clave,
      argumentos: argumentos,
      nombre: "Corte",
      descripcion: `Avanza el papel especificado por el número de líneas y después lo corta`,
      plataformas: {
        "Desktop": (argumentos: ArgumentosParaDefinirCorte) => {
          return {
            nombre: "Corte",
            argumentos: [argumentos.lineas],
          };
        },
      },
    },
    "DefinirCaracterPersonalizado": {
      clave,
      argumentos: argumentos,
      nombre: "DefinirCaracterPersonalizado",
      descripcion: `Define un char`,
      plataformas:
      {
        "Desktop": (argumentos: ArgumentosParaDefinirCaracterPersonalizado) => {
          const matrizComoCadena = argumentos.matrizDeBits.map(fila => fila.join("")).join("\n");
          return {
            nombre: "DefinirCaracterPersonalizado",
            argumentos: [argumentos.caracterReemplazo, matrizComoCadena],
          };
        },
      },

    },
  };
  return mapa[clave];
};

const referenciaAlSelect = ref(null);
const todasLasOperaciones: Ref<Array<OperacionDelDiseñador>> = ref([
  crearAPartirDeClaveYArgumentos("Corte", { lineas: 1 }),
  crearAPartirDeClaveYArgumentos("DefinirCaracterPersonalizado", { caracterReemplazo: "", matrizDeBits: [["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]] }),

]);
const operaciones: Ref<Array<OperacionDelDiseñador>> = ref([]);
const agregarOperacionSeleccionada = () => {
  const opcionSeleccionadaSinReferencias = Object.assign({}, opcionSeleccionada.value);
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
  argumentos: {},
  plataformas: {},
  clave: "",
});

const eliminarOperacionPorIndice = (indice: number) => {
  operaciones.value.splice(indice, 1);
}

const guardar = () => {
  for (const operacion of operaciones.value) {
    console.log(operacion.plataformas.Desktop(operacion.argumentos));
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