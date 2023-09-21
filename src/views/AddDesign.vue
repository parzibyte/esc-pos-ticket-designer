<script setup lang="ts">
import { ref } from "vue"
import type { Ref } from 'vue'
import { TiposParaArgumento, type Operacion, type OperacionDelDiseñador } from "../types/Tipos"
import Select from "@/components/Select.vue";
import FormularioOperacion from "@/components/FormularioOperacion.vue";

const referenciaAlSelect= ref(null);
const todasLasOperaciones: Ref<Array<OperacionDelDiseñador>> = ref([
    {
        nombre: "Corte",
        descripcion: `Avanza el papel especificado por el número de líneas y después lo corta`,
        funcion: {
            nombre: "Corte",
            argumentos: [{
                nombre: "lineas",
                tipo: TiposParaArgumento.Number,
                descripcion: "Líneas",
            }]
        },
    },
    {
        nombre: "Corte parcial",
        descripcion: `Corte parcial`,
        funcion: {
            nombre: "CorteParcial",
            argumentos: []
        },
    },
    {
        nombre: "Carácter personalizado",
        descripcion: `Establece un carácter personalizado de 24x12.`,
        funcion: {
            nombre: "DefinirCaracterPersonalizado",
            argumentos: [
                {
                    nombre: "caracterRemplazoComoCadena",
                    descripcion: "Carácter que se reemplaza",
                    tipo: TiposParaArgumento.String,
                },
                {
                    nombre: "matrizComoCadena",
                    descripcion: "Matriz como cadena",
                    tipo: TiposParaArgumento.LongString,
                },
            ]
        },
    },
]);

const operaciones: Ref<Array<OperacionDelDiseñador>> = ref([
{
        nombre: "Carácter personalizado",
        descripcion: `Establece un carácter personalizado de 24x12.`,
        funcion: {
            nombre: "DefinirCaracterPersonalizado",
            argumentos: [
                {
                    nombre: "caracterRemplazoComoCadena",
                    descripcion: "Carácter que se reemplaza",
                    tipo: TiposParaArgumento.String,
                },
                {
                    nombre: "matrizComoCadena",
                    descripcion: "Matriz como cadena",
                    tipo: TiposParaArgumento.LongString,
                },
            ]
        },
    },
]);
const agregarOperacionSeleccionada = () => {
    operaciones.value.push(opcionSeleccionada.value);
    referenciaAlSelect.value.clearSelectedItem();
}
const displayItemFunction = (op: OperacionDelDiseñador): string => {
    return op.nombre;
}

const filterFunction = (criteria: string, items: OperacionDelDiseñador[]) => {
    const expresion = new RegExp(`${criteria}.*`, "i");
    return items.filter((opcion: OperacionDelDiseñador) => {
        return expresion.test(opcion.nombre) || expresion.test(opcion.descripcion);
    });
}
const opcionSeleccionada: Ref<OperacionDelDiseñador> = ref({
    nombre: "",
    descripcion: "",
    funcion: {
        nombre: "",
        argumentos: [],
        descripcion: "",
    },

});


</script>
<template>
    <div>
        <FormularioOperacion v-for="operacion in operaciones" :operacion="operacion" />
    </div>
    <div class="max-w-xs content-center">
        <Select ref="referenciaAlSelect" :filterFunction="filterFunction" :items="todasLasOperaciones" :displayItemFunction="displayItemFunction"
            v-model="opcionSeleccionada" label="Selecciona una opción">
            <template #item="{ item, index }">
                <h1 class="text-xl">{{ item.nombre }}</h1>
                <p>{{ item.descripcion }}</p>
            </template>
        </Select>
        <button class="bg-lime-400 p-1 rounded-md text-white my-1" @click="agregarOperacionSeleccionada">Agregar</button>
    </div>
</template>