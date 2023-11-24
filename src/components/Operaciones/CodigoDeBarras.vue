<script setup lang="ts">
import { TipoDeCodigoDeBarras, type ArgumentosParaDefinirCodigoDeBarras, TamañoImagen, Alineacion } from '@/types/Tipos';
import Range from '../Range.vue';
import CustomCheckbox from '../CustomCheckbox.vue';
import CustomInput from '../CustomInput.vue';
import AlertaAnchoImagen from '../Alertas/AlertaAnchoImagen.vue';
import SelectAlineacion from '../Selects/SelectAlineacion.vue';
import SelectTamanioImagen from '../Selects/SelectTamanioImagen.vue';
import SelectTipoCodigoDeBarras from '../Selects/SelectTipoCodigoDeBarras.vue';


type Propiedades = {
    modelValue: ArgumentosParaDefinirCodigoDeBarras,
};
const propiedades = defineProps<Propiedades>();
const deberiaMostrarCamposParaSumaDeVerificacion = () => {
    if (!propiedades.modelValue.tipo) {
        return false;
    }
    if (propiedades.modelValue.tipo.valor === TipoDeCodigoDeBarras.Code39) {
        return true;
    }
    return false;
}

const deberiaMostrarCamposParaNivelDeSeguridad = () => {
    if (!propiedades.modelValue.tipo) {
        return false;
    }
    if (propiedades.modelValue.tipo.valor === TipoDeCodigoDeBarras.Pdf417) {
        return true;
    }
    return false;
}
const deberiaMostrarCamposParaIntercalado = () => {
    if (!propiedades.modelValue.tipo) {
        return false;
    }
    if (propiedades.modelValue.tipo.valor === TipoDeCodigoDeBarras.TwoOffFiveITF) {
        return true;
    }
    return false;
}
const deberiaMostrarCamposParaModoAsciiCompleto = () => {
    if (!propiedades.modelValue.tipo) {
        return false;
    }
    if (propiedades.modelValue.tipo.valor === TipoDeCodigoDeBarras.Code39) {
        return true;
    }
    return false;
}
</script>

<template>
    <div class="flex md:flex-row flex-col md:items-center">
        <SelectTipoCodigoDeBarras v-model="propiedades.modelValue.tipo"></SelectTipoCodigoDeBarras>
        <CustomInput label="Contenido" v-model="propiedades.modelValue.contenido" type="text">
        </CustomInput>
        <SelectAlineacion v-model="propiedades.modelValue.alineacion"></SelectAlineacion>
        <CustomCheckbox label="Imprimir contenido como texto debajo el código"
            v-model="propiedades.modelValue.imprimirContenido"></CustomCheckbox>
    </div>
    <div class="flex md:flex-row flex-col">
        <SelectTamanioImagen v-model="propiedades.modelValue.tamaño"></SelectTamanioImagen>
        <div class="flex flex-col">
            <CustomCheckbox v-if="deberiaMostrarCamposParaSumaDeVerificacion()" label="Incluir suma de verificación"
                v-model="propiedades.modelValue.incluirSumaDeVerificacion">
            </CustomCheckbox>
            <CustomCheckbox v-if="deberiaMostrarCamposParaIntercalado()" label="Intercalado"
                v-model="propiedades.modelValue.intercalado"></CustomCheckbox>
            <CustomCheckbox v-if="deberiaMostrarCamposParaModoAsciiCompleto()" label="Modo ASCII completo"
                v-model="propiedades.modelValue.modoAsciiCompleto"></CustomCheckbox>
        </div>
        <Range step="8" v-model.number="propiedades.modelValue.ancho" min="8" max="648" label="Ancho"></Range>
        <Range v-model="propiedades.modelValue.alto" min="8" max="500" label="Alto"></Range>
        <Range v-if="deberiaMostrarCamposParaNivelDeSeguridad()" v-model="propiedades.modelValue.nivelDeSeguridad" min="0"
            max="8" label="Nivel de seguridad"> </Range>
    </div>
    <AlertaAnchoImagen :ancho="propiedades.modelValue.ancho">
    </AlertaAnchoImagen>
</template>