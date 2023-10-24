<script setup lang="ts">
import { TamañoImagen, type ArgumentosParaDefinirCodigoQr, RecuperacionQr, Alineacion } from '@/types/Tipos';
import { ref } from 'vue';


type Propiedades = {
    modelValue: ArgumentosParaDefinirCodigoQr,
};
const propiedades = withDefaults(defineProps<Propiedades>(), {
    modelValue: () => {
        return {
            alineacion: Alineacion.Centro,
            contenido: "",
            ancho: 200,
            tamaño: TamañoImagen.Normal,
            nivelDeRecuperacion: RecuperacionQr.Medio,
            imprimirContenido: false,
        };
    }
})

const alineaciones = ref([
    {
        nombre: "Izquierda",
        valor: Alineacion.Izquierda,
    },
    {
        nombre: "Centro",
        valor: Alineacion.Centro,
    },
    {
        nombre: "Derecha",
        valor: Alineacion.Derecha,
    },

]);


const tamaños = ref([
    {
        nombre: "Normal",
        valor: TamañoImagen.Normal,
    },
    {
        nombre: "Doble ancho",
        valor: TamañoImagen.DobleAncho,
    },
    {
        nombre: "Doble largo",
        valor: TamañoImagen.DobleLargo,
    },
    {
        nombre: "Doble ancho y largo",
        valor: TamañoImagen.DobleAnchoYLargo,
    },

]);

const recuperaciones = ref([
    {
        nombre: "Bajo",
        valor: RecuperacionQr.Bajo,
    },
    {
        nombre: "Medio",
        valor: RecuperacionQr.Medio,
    },
    {
        nombre: "Alto",
        valor: RecuperacionQr.Alto,
    },
    {
        nombre: "El mejor",
        valor: RecuperacionQr.ElMasAlto,
    },
]);
</script>
<template>
    <input type="text" v-model="propiedades.modelValue.contenido">
    <label class="font-bold">Alineación</label>
    <select class="border border-gray-200" v-model="propiedades.modelValue.alineacion">
        <option v-for="alineacion in alineaciones" :value="alineacion.valor">{{ alineacion.nombre }}</option>
    </select>
    <label class="font-bold">Redimensionar al imprimir:</label>
    <select class="border border-gray-200" v-model="propiedades.modelValue.tamaño">
        <option v-for="tamaño in tamaños" :value="tamaño.valor">{{ tamaño.nombre }}</option>
    </select>
    <label class="font-bold">Recuperación:</label>
    <select class="border border-gray-200" v-model="propiedades.modelValue.nivelDeRecuperacion">
        <option v-for="nivelDeRecuperacion in recuperaciones" :value="nivelDeRecuperacion.valor">{{
            nivelDeRecuperacion.nombre }}</option>
    </select>
    <input type="range" step="8" v-model.number="propiedades.modelValue.ancho">
    <label>Imprimir contenido</label>
    <input type="checkbox" v-model="propiedades.modelValue.imprimirContenido">
</template>