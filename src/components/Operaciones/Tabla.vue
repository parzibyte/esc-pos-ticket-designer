<script setup lang="ts">
import type { ArgumentosParaDefinirTabla } from '@/types/Tipos';
import { table } from 'console';


type Propiedades = {
    modelValue: ArgumentosParaDefinirTabla,
};
const propiedades = withDefaults(defineProps<Propiedades>(), {
    modelValue: () => {
        return {
            tabla: [],
        };
    }
})
const cantidadColumnas = () => {
    let cantidad = 0;
    if (propiedades.modelValue.tabla.length > 0) {
        cantidad = propiedades.modelValue.tabla[0].length;
    }
    return cantidad;
}
const agregarColumna = () => {
    for (const fila of propiedades.modelValue.tabla) {
        fila.push("columna");
    }
}
const agregarFila = () => {
    const fila = [];
    for (let i = 0; i < cantidadColumnas(); i++) {
        fila.push("Soy una columna de la fila recién agregada");
    }
    propiedades.modelValue.tabla.push(fila);
    /*
    propiedades.modelValue.tabla.push([]);
    const ultimoIndice = propiedades.modelValue.tabla.length - 1;
    for (let i = 0; i < cantidadColumnas; i++) {
        propiedades.modelValue.tabla[ultimoIndice].push("Fila");

    }
    */
}

const quitarColumna = (indice: number) => {
    for (let i = 0; i < propiedades.modelValue.tabla.length; i++) {
        propiedades.modelValue.tabla[i].splice(indice, 1);
    }
    console.log("quitarColumna");
    console.log({ indice });
}

const quitarFila = (indice: number) => {
    propiedades.modelValue.tabla.splice(indice, 1);
    console.log("quitarFila");

    console.log({ indice });
}
</script>
<template>
    <p>Soy tabla</p>

    <table class="border border-gray-200">
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