<script setup lang="ts">
import { TipoDeCodigoDeBarras, type ArgumentosParaDefinirCodigoDeBarras,} from '@/types/Tipos';
import Range from '../Range.vue';
import CustomCheckbox from '../CustomCheckbox.vue';
import CustomInput from '../CustomInput.vue';
import AlertaAnchoImagen from '../Alertas/AlertaAnchoImagen.vue';
import SelectAlineacion from '../Selects/SelectAlineacion.vue';
import SelectTipoCodigoDeBarras from '../Selects/SelectTipoCodigoDeBarras.vue';
import SelectAlgoritmoImagen from '../Selects/SelectAlgoritmoImagen.vue';


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
        <CustomInput :label="$t('operationComponents.CodigoDeBarras.content')" v-model="propiedades.modelValue.contenido"
            type="text">
        </CustomInput>
        <SelectAlineacion v-model="propiedades.modelValue.alineacion"></SelectAlineacion>

    </div>
    <div class="flex md:flex-row flex-col">
        <div class="flex flex-col">
            <SelectAlgoritmoImagen v-model="propiedades.modelValue.algoritmoImpresionImagen"></SelectAlgoritmoImagen>
            <CustomCheckbox :label="$t('operationComponents.CodigoDeBarras.printContentUnderBarcode')"
                v-model="propiedades.modelValue.imprimirContenido"></CustomCheckbox>
            <CustomCheckbox v-if="deberiaMostrarCamposParaSumaDeVerificacion()"
                :label="$t('operationComponents.CodigoDeBarras.includeChecksum')"
                v-model="propiedades.modelValue.incluirSumaDeVerificacion">
            </CustomCheckbox>
            <CustomCheckbox v-if="deberiaMostrarCamposParaIntercalado()"
                :label="$t('operationComponents.CodigoDeBarras.interleaved')" v-model="propiedades.modelValue.intercalado">
            </CustomCheckbox>
            <CustomCheckbox v-if="deberiaMostrarCamposParaModoAsciiCompleto()"
                :label="$t('operationComponents.CodigoDeBarras.fullAsciiMode')"
                v-model="propiedades.modelValue.modoAsciiCompleto"></CustomCheckbox>
        </div>
        <Range v-model.number="propiedades.modelValue.ancho" min="8" max="648" :label="$t('width')"></Range>
        <Range v-model="propiedades.modelValue.alto" min="8" max="500" :label="$t('height')"></Range>
        <Range v-if="deberiaMostrarCamposParaNivelDeSeguridad()" v-model="propiedades.modelValue.nivelDeSeguridad" min="0"
            max="8" :label="$t('operationComponents.CodigoDeBarras.securityLevel')"> </Range>
    </div>
    <AlertaAnchoImagen :ancho="propiedades.modelValue.ancho">
    </AlertaAnchoImagen>
</template>