<script setup lang="ts">
import type { ArgumentosParaDefinirTabla } from '@/types/Tipos';


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

    <table class="border border-gray-200">
        <thead>
            <tr>
                <th v-for="ajuste in propiedades.modelValue.ajustesEncabezados">
                    <input type="number" v-model.number="ajuste.longitudMaxima">
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="border border-gray-200" v-for="(fila, indiceFila) in propiedades.modelValue.tabla">
                <td class="border border-gray-200" v-for="(celda, indiceColumna) in fila">
                    <input type="text"
                        class="outline-none rounded-md border border-gray-200 focus:border-2 focus:border-blue-500 p-2"
                        v-model="propiedades.modelValue.tabla[indiceFila][indiceColumna]">
                </td>
                <td>
                    <button @click="quitarFila(indiceFila)">Quitar fila</button>
                </td>
            </tr>
            <tr>
                <td class="border border-gray-200" v-for="indice in cantidadColumnas()">
                    <button @click="quitarColumna(indice - 1)">Quitar columna</button>
                </td>
                <td>Nada</td>
            </tr>
        </tbody>
    </table>
    <button @click="agregarFila()">Agregar fila</button>
    <button @click="agregarColumna()">Agregar columna</button>
</template>