<script setup lang="ts">
import type { ArgumentosParaDefinirTabla } from '@/types/Tipos';

import TableColumnRemove from "vue-material-design-icons/TableColumnRemove.vue";
import TableRowRemove from "vue-material-design-icons/TableRowRemove.vue";
import TableRowPlusAfter from "vue-material-design-icons/TableRowPlusAfter.vue";
import TableColumnPlusAfter from "vue-material-design-icons/TableColumnPlusAfter.vue";
import Range from "@/components/Range.vue"

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

const LONGITUD_MAXIMA_POR_DEFECTO = 10;
/**
 * En la impresora GOOJPRT PT-210 de 58 milímetros puedo imprimir hasta 30 caracteres, y al medir la
 * línea horizontal mide 47 mm. Me imagino que los 11 mm faltantes son de márgenes horizontales
 * 
 * Entonces si son 30 caracteres que ocupan 47 mm, 
 * cada carácter ocupa 1.5666666666666666666666666666667 mm efectivamente,
 * pero redondeando con margen ocupa 1.93
 * 
 * Tomando en cuenta eso, para una de 80 milímetros deben caber 41.45 caracteres (80/1.93), 
 * pero si suponemos que el margen es de 11 milímetros, sobran 69 milímetros para puro carácter,
 * dividido entre 1.56 sería 44.23 caracteres
 * 
 * Así que, como al momento de escribir esto no tengo una impresora de 80 milímetros,
 * supondré que en una impresora de 80 milímetros caben 45 caracteres como máximo
 * 
 */
const LONGITUD_MAXIMA_POR_LINEA_EN_80_MM = 45;
const LONGITUD_MAXIMA_POR_LINEA_EN_58_MM = 30;

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

const totalCaracteresPorLinea = () => {
    let total = 0;
    for (const encabezado of propiedades.modelValue.ajustesEncabezados) {
        total += encabezado.longitudMaxima;
    }
    return total;
}

const deberiaMostrarAlertaDeMaximosCaracteres = () => {
    return totalCaracteresPorLinea() > LONGITUD_MAXIMA_POR_LINEA_EN_58_MM;
}
</script>
<template>
    <div class="flex flex-row">
        <div class="flex flex-col bg-lime-500">
            <label class="inline-block">Separador de columnas:</label>
            <input class="border border-gray-200 focus:border-blue-500 rounded-md p-1 outline-none focus:border-2"
                type="text" v-model="propiedades.modelValue.caracterSeparadorColumnasDatos" maxlength="1">

        </div>
        <div class="bg-red-500">
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni corporis rem dolore minima non enim sit
                obcaecati ut? Reiciendis beatae tempore similique impedit debitis distinctio voluptatem nesciunt? Amet, ut
                facere.</p>
        </div>
        <div class="bg-zinc-500">
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni corporis rem dolore minima non enim sit
                obcaecati ut? Reiciendis beatae tempore similique impedit debitis distinctio voluptatem nesciunt? Amet, ut
                facere.</p>
        </div>
        <div class="bg-yellow-500">
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni corporis rem dolore minima non enim sit
                obcaecati ut? Reiciendis beatae tempore similique impedit debitis distinctio voluptatem nesciunt? Amet, ut
                facere.</p>
        </div>
    </div>
    <div>

        <div>
            <label class="inline-block">Separador de columnas:</label>
            <input class="border border-gray-200 focus:border-blue-500 rounded-md p-1 outline-none focus:border-2 mx-2"
                type="text" v-model="propiedades.modelValue.caracterSeparadorColumnasDatos" maxlength="1">
        </div>
    </div>
    <label>Separador de filas:</label>
    <input class="border border-gray-200 focus:border-blue-500 rounded-md p-1 outline-none focus:border-2 mx-2" type="text"
        v-model="propiedades.modelValue.caracterSeparadorFilas" maxlength="1">
    <label>Separador de columnas dentro de las filas:</label>
    <input class="border border-gray-200 focus:border-blue-500 rounded-md p-1 outline-none focus:border-2 mx-2" type="text"
        v-model="propiedades.modelValue.caracterSeparadorColumnasEnSeparadorDeFilas" maxlength="1">
    <label>Relleno:</label>
    <input class="border border-gray-200 focus:border-blue-500 rounded-md p-1 outline-none focus:border-2 mx-2" type="text"
        v-model="propiedades.modelValue.relleno" maxlength="1">
    <div v-show="deberiaMostrarAlertaDeMaximosCaracteres()" class="my-1 p-2 bg-orange-600 text-white rounded-md">
        <strong>Nota:</strong> según pruebas, en impresoras de 58mm la cantidad máxima por línea es de 30 caracteres.
        En impresoras de 80mm, la cantidad máxima es de 45. Usted tiene actualmente {{ totalCaracteresPorLinea() }}
        caracteres en total.
    </div>
    <div class="overflow-x-auto">
        <table class="border-collapse w-full table-auto">
            <tbody>
                <tr>
                    <td class="p-0 border border-gray-200"
                        v-for="(ajuste, indiceAjuste) in propiedades.modelValue.ajustesEncabezados" :key="indiceAjuste">
                        <Range :max="LONGITUD_MAXIMA_POR_LINEA_EN_80_MM" min="1" label="Máxima longitud:"
                            v-model="ajuste.longitudMaxima">
                        </Range>
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