<script setup lang="ts">
import { type ArgumentosParaDefinirCodigoQr, } from '@/types/Tipos';
import CustomInputVue from '../CustomInput.vue';
import Range from '../Range.vue';
import CustomCheckboxVue from '../CustomCheckbox.vue';
import AlertaAnchoImagen from '../Alertas/AlertaAnchoImagen.vue';
import SelectAlineacion from '../Selects/SelectAlineacion.vue';
import SelectRecuperacionQr from '../Selects/SelectRecuperacionQr.vue';
import SelectAlgoritmoImagen from '../Selects/SelectAlgoritmoImagen.vue';


type Propiedades = {
    modelValue: ArgumentosParaDefinirCodigoQr,
};
const propiedades = defineProps<Propiedades>();

</script>
<template>
    <div class="flex md:flex-row flex-col">
        <CustomInputVue v-model="propiedades.modelValue.contenido" type="text"
            :label="$t('operationComponents.CodigoQr.content')"></CustomInputVue>
        <SelectAlineacion v-model="propiedades.modelValue.alineacion"></SelectAlineacion>
        <Range :label="$t('width')" min="1" max="648" v-model="propiedades.modelValue.ancho"></Range>
        <CustomCheckboxVue v-model="propiedades.modelValue.imprimirContenido"
            :label="$t('operationComponents.CodigoQr.printContentUnderQrCode')"></CustomCheckboxVue>
    </div>
    <div class="flex flex-col md:flex-row">
        <SelectAlgoritmoImagen v-model="propiedades.modelValue.algoritmoImagen"></SelectAlgoritmoImagen>
        <SelectRecuperacionQr v-model="propiedades.modelValue.nivelDeRecuperacion"></SelectRecuperacionQr>
    </div>
    <AlertaAnchoImagen :ancho="propiedades.modelValue.ancho"></AlertaAnchoImagen>
</template>