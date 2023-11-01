<script setup lang="ts">

import { TipoDeCodigoDeBarras, type ArgumentosParaDefinirCodigoDeBarras, TamañoImagen, Alineacion } from '@/types/Tipos';
import { ref } from 'vue';
import Select from '../Select.vue';
import Range from '../Range.vue';
import CustomCheckbox from '../CustomCheckbox.vue';
import CustomInput from '../CustomInput.vue';
import AlertaAnchoImagen from '../Alertas/AlertaAnchoImagen.vue';


type Propiedades = {
    modelValue: ArgumentosParaDefinirCodigoDeBarras,
};
const propiedades = withDefaults(defineProps<Propiedades>(), {
    modelValue: () => {
        return {
            tipo: TipoDeCodigoDeBarras.Ean,
            contenido: "",
            ancho: 200,
            alto: 10,
            tamaño: TamañoImagen.Normal,
            incluirSumaDeVerificacion: false,
            modoAsciiCompleto: false,
            intercalado: false,
            alineacion: Alineacion.Centro,
            nivelDeSeguridad: 1,
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
const tipos = ref([
    {
        nombre: "Codabar",
        valor: TipoDeCodigoDeBarras.Codabar,
    },
    {
        nombre: "Code 128",
        valor: TipoDeCodigoDeBarras.Code128,
    },
    {
        nombre: "Code 39",
        valor: TipoDeCodigoDeBarras.Code39,
    },
    {
        nombre: "Code93",
        valor: TipoDeCodigoDeBarras.Code93,
    },
    {
        nombre: "Ean",
        valor: TipoDeCodigoDeBarras.Ean,
    },
    {
        nombre: "Ean 8",
        valor: TipoDeCodigoDeBarras.Ean8,
    },
    {
        nombre: "PDF 417",
        valor: TipoDeCodigoDeBarras.Pdf417,
    },
    {
        nombre: "Two off five ITF",
        valor: TipoDeCodigoDeBarras.TwoOffFiveITF,
    },
    {
        nombre: "UPC A",
        valor: TipoDeCodigoDeBarras.UpcA,
    },
    {
        nombre: "UPC E",
        valor: TipoDeCodigoDeBarras.UpcE,
    },

]);

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
        <Select :items="tipos" :display-item-function="(tipo) => tipo.nombre" label="Tipo"
            v-model="propiedades.modelValue.tipo">
            <template #item="{ item, index }">
                <h1 class="text-xl">{{ item.nombre }}</h1>
            </template>
        </Select>
        <CustomInput label="Contenido" v-model="propiedades.modelValue.contenido" type="text">
        </CustomInput>
        <Select :items="alineaciones" :display-item-function="(alineacion) => alineacion.nombre" label="Alineación"
            v-model="propiedades.modelValue.alineacion">
            <template #item="{ item, index }">
                <h1 class="text-xl">{{ item.nombre }}</h1>
            </template>
        </Select>
        <CustomCheckbox label="Imprimir contenido como texto debajo el código"
            v-model="propiedades.modelValue.imprimirContenido"></CustomCheckbox>
    </div>
    <div class="flex md:flex-row flex-col">
        <Select :display-item-function="(tamaño) => tamaño.nombre" :items="tamaños" label="Redimensionar al imprimir:"
            v-model="propiedades.modelValue.tamaño">
            <template #item="{ item, index }">
                <h1 class="text-xl">{{ item.nombre }}</h1>
            </template>
        </Select>
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