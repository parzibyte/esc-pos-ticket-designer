<script setup lang="ts">
import { TamañoImagen, type ArgumentosParaDefinirCodigoQr, RecuperacionQr, Alineacion } from '@/types/Tipos';
import { ref } from 'vue';
import CustomInputVue from '../CustomInput.vue';
import Select from '../Select.vue';
import Range from '../Range.vue';
import CustomCheckboxVue from '../CustomCheckbox.vue';


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
    <div class="flex md:flex-row flex-col">
        <CustomInputVue v-model="propiedades.modelValue.contenido" type="text" label="Contenido del QR"></CustomInputVue>
        <Select :display-item-function="(alineacion) => alineacion.nombre" :items="alineaciones" label="Alineación"
            v-model="propiedades.modelValue.alineacion">
            <template #item="{ item, index }">
                <h1 class="text-xl">{{ item.nombre }}</h1>
            </template>
        </Select>
        <Range label="Ancho" step="8" min="8" max="500" v-model="propiedades.modelValue.ancho"></Range>
        <CustomCheckboxVue v-model="propiedades.modelValue.imprimirContenido"
            label="Imprimir contenido como texto debajo del código QR"></CustomCheckboxVue>
    </div>
    <div class="flex flex-col md:flex-row">
        <Select :display-item-function="(tamaño) => tamaño.nombre" :items="tamaños" label="Redimensionar al imprimir:"
            v-model="propiedades.modelValue.tamaño">
            <template #item="{ item, index }">
                <h1 class="text-xl">{{ item.nombre }}</h1>
            </template>
        </Select>
        <Select :display-item-function="(nivel) => nivel.nombre" :items="recuperaciones" label="Recuperación:"
            v-model="propiedades.modelValue.nivelDeRecuperacion">
            <template #item="{ item, index }">
                <h1 class="text-xl">{{ item.nombre }}</h1>
            </template>
        </Select>
    </div>
</template>