<script setup lang="ts">
import { TamañoImagen, type ArgumentosParaDefinirCodigoQr, RecuperacionQr, Alineacion } from '@/types/Tipos';
import { ref } from 'vue';
import CustomInputVue from '../CustomInput.vue';
import Select from '../Select.vue';
import Range from '../Range.vue';
import CustomCheckboxVue from '../CustomCheckbox.vue';
import AlertaAnchoImagen from '../Alertas/AlertaAnchoImagen.vue';
import type SelectAlineacionVue from '../Selects/SelectAlineacion.vue';
import SelectTamanioImagen from '../Selects/SelectTamanioImagen.vue';
import SelectRecuperacionQr from '../Selects/SelectRecuperacionQr.vue';


type Propiedades = {
    modelValue: ArgumentosParaDefinirCodigoQr,
};
const propiedades = defineProps<Propiedades>();

</script>
<template>
    <div class="flex md:flex-row flex-col">
        <CustomInputVue v-model="propiedades.modelValue.contenido" type="text" label="Contenido del QR"></CustomInputVue>
        <SelectAlineacionVue v-model="propiedades.modelValue.alineacion"></SelectAlineacionVue>
        <Range label="Ancho" step="8" min="8" max="648" v-model="propiedades.modelValue.ancho"></Range>
        <CustomCheckboxVue v-model="propiedades.modelValue.imprimirContenido"
            label="Imprimir contenido como texto debajo del código QR"></CustomCheckboxVue>
    </div>
    <div class="flex flex-col md:flex-row">
        <SelectTamanioImagen v-model="propiedades.modelValue.tamaño"></SelectTamanioImagen>
        <SelectRecuperacionQr v-model="propiedades.modelValue.nivelDeRecuperacion"></SelectRecuperacionQr>
    </div>
    <AlertaAnchoImagen :ancho="propiedades.modelValue.ancho"></AlertaAnchoImagen>
</template>