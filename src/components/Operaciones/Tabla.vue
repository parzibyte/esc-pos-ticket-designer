<script setup lang="ts">
import type { ArgumentosParaDefinirTabla } from '@/types/Tipos';

import TableColumnRemove from "vue-material-design-icons/TableColumnRemove.vue";
import TableRowRemove from "vue-material-design-icons/TableRowRemove.vue";
import TableRowPlusAfter from "vue-material-design-icons/TableRowPlusAfter.vue";
import TableColumnPlusAfter from "vue-material-design-icons/TableColumnPlusAfter.vue";

type Propiedades = {
    modelValue: ArgumentosParaDefinirTabla,
};
const propiedades = withDefaults(defineProps<Propiedades>(), {
    modelValue: () => {
        return {
            tabla: [],
            ajustesEncabezados: [],
            caracterSeparadorColumnasDatos: "|",
            caracterSeparadorColumnasEnSeparadorDeFilas: "+",
            caracterSeparadorFilas: "-",
            relleno: " ",
        };
    }
})

const LONGITUD_MAXIMA_POR_DEFECTO = 5;

const cantidadFilas = () => {
    return propiedades.modelValue.tabla.length;
}
const cantidadColumnas = () => {
    let cantidad = 0;
    if (cantidadFilas() > 0) {
        cantidad = propiedades.modelValue.tabla[0].length;
    }
    return cantidad;
}
const agregarColumna = () => {
    if (cantidadFilas() <= 0) {
        agregarFila();
        // Regresamos porque agregarFila agregará una columna si no hay ninguna
        return;
    }
    for (const fila of propiedades.modelValue.tabla) {
        fila.push("");
    }
    propiedades.modelValue.ajustesEncabezados.push({ longitudMaxima: LONGITUD_MAXIMA_POR_DEFECTO });
}
const agregarFila = () => {
    const fila = [];
    for (let i = 0; i < cantidadColumnas(); i++) {
        fila.push("");
    }
    propiedades.modelValue.tabla.push(fila);
    if (cantidadColumnas() <= 0) {
        agregarColumna();
    }
}

const quitarColumna = (indice: number) => {
    for (let i = 0; i < propiedades.modelValue.tabla.length; i++) {
        propiedades.modelValue.tabla[i].splice(indice, 1);
    }
    propiedades.modelValue.ajustesEncabezados.splice(indice, 1);
}

const quitarFila = (indice: number) => {
    propiedades.modelValue.tabla.splice(indice, 1);
}
</script>
<template>
    <input type="text" v-model="propiedades.modelValue.caracterSeparadorColumnasDatos" maxlength="1">
    <input type="text" v-model="propiedades.modelValue.caracterSeparadorFilas" maxlength="1">
    <input type="text" v-model="propiedades.modelValue.caracterSeparadorColumnasEnSeparadorDeFilas" maxlength="1">
    <input type="text" v-model="propiedades.modelValue.relleno" maxlength="1">

    <div class="overflow-x-auto">
        <table class="border-collapse w-full table-auto">
            <tbody>
                <tr>
                    <td class="p-0  border border-gray-200" v-for="ajuste in propiedades.modelValue.ajustesEncabezados">
                        <input class="w-full h-full outline-none p-3 focus:border focus:border-blue-500  border-collapse"
                            type="number" v-model.number="ajuste.longitudMaxima">
                    </td>
                    <td class="p-0  border border-gray-200 text-center">
                        <button @click="agregarColumna()" class="bg-sky-500 text-white rounded-md p-2">
                            <TableColumnPlusAfter></TableColumnPlusAfter>
                        </button>
                    </td>
                </tr>
                <tr v-for="(fila, indiceFila) in propiedades.modelValue.tabla">
                    <td class="p-0 border-collapse border border-gray-200" v-for="(celda, indiceColumna) in fila">
                        <input type="text" placeholder="Escriba aquí el contenido de la celda..."
                            class="w-full h-full outline-none p-3 focus:border focus:border-blue-500  border-collapse"
                            v-model="propiedades.modelValue.tabla[indiceFila][indiceColumna]">
                    </td>
                    <td class="border border-gray-200 text-center">
                        <button class="bg-red-500 text-white rounded-md p-2 m-2" @click="quitarFila(indiceFila)">
                            <TableRowRemove></TableRowRemove>
                        </button>
                    </td>
                </tr>
                <tr>
                    <td class="border border-gray-200 text-center" v-for="indice in cantidadColumnas()">
                        <button class="bg-red-500 text-white rounded-md p-2 m-2" @click="quitarColumna(indice - 1)">
                            <TableColumnRemove></TableColumnRemove>
                        </button>
                    </td>
                    <td class="text-center border-gray-200 border">
                        <button @click="agregarFila()" class="bg-sky-500 rounded-md p-2 text-white">
                            <TableRowPlusAfter></TableRowPlusAfter>
                        </button>

                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>