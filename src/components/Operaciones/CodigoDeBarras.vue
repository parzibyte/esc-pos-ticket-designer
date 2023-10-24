<script setup lang="ts">

import { TipoDeCodigoDeBarras, type ArgumentosParaDefinirCodigoDeBarras, TamañoImagen, Alineacion } from '@/types/Tipos';
import { ref } from 'vue';


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
    if (propiedades.modelValue.tipo === TipoDeCodigoDeBarras.Code39) {
        return true;
    }
    return false;
}

const deberiaMostrarCamposParaNivelDeSeguridad = () => {
    if (propiedades.modelValue.tipo === TipoDeCodigoDeBarras.Pdf417) {
        return true;
    }
    return false;
}
const deberiaMostrarCamposParaIntercalado = () => {
    if (propiedades.modelValue.tipo === TipoDeCodigoDeBarras.TwoOffFiveITF) {
        return true;
    }
    return false;
}
const deberiaMostrarCamposParaModoAsciiCompleto = () => {
    if (propiedades.modelValue.tipo === TipoDeCodigoDeBarras.Code39) {
        return true;
    }
    return false;
}
</script>

<template>
    <label class="font-bold">Tipo</label>
    <select class="border border-gray-200" v-model="propiedades.modelValue.tipo">
        <option v-for="tipo in tipos" :value="tipo.valor">{{ tipo.nombre }}</option>
    </select>
    <label class="font-bold">Alineación</label>
    <select class="border border-gray-200" v-model="propiedades.modelValue.alineacion">
        <option v-for="alineacion in alineaciones" :value="alineacion.valor">{{ alineacion.nombre }}</option>
    </select>
    <label class="font-bold">Redimensionar al imprimir:</label>
    <select class="border border-gray-200" v-model="propiedades.modelValue.tamaño">
        <option v-for="tamaño in tamaños" :value="tamaño.valor">{{ tamaño.nombre }}</option>
    </select>
    <template v-if="deberiaMostrarCamposParaSumaDeVerificacion()">
        <label class="font-bold">Incluir suma de verificación</label>
        <input type="checkbox" v-model="propiedades.modelValue.incluirSumaDeVerificacion">
    </template>
    <template v-if="deberiaMostrarCamposParaNivelDeSeguridad()">
        <label class="font-bold">Nivel de seguridad</label>
        <input type="range" min="0" max="0" v-model.number="propiedades.modelValue.nivelDeSeguridad">
    </template>
    <template v-if="deberiaMostrarCamposParaIntercalado()">
        <label class="font-bold">Intercalado</label>
        <input type="checkbox" v-model="propiedades.modelValue.intercalado">
    </template>
    <template v-if="deberiaMostrarCamposParaModoAsciiCompleto()">
        <label class="font-bold">Modo ASCII completo</label>
        <input type="checkbox" v-model="propiedades.modelValue.modoAsciiCompleto">
    </template>
    <input type="range" step="8" v-model.number="propiedades.modelValue.ancho" max="500">
    <input type="range" step="8" v-model.number="propiedades.modelValue.alto" max="500">
    <input type="text" v-model="propiedades.modelValue.contenido">
    <label>Imprimir contenido</label>
    <input type="checkbox" v-model="propiedades.modelValue.imprimirContenido">
</template>