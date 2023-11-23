<script setup lang="ts">
import { ref } from 'vue';
import Instalar from "@/components/Guias/Desktop/Instalar.vue"
import Compartir from "@/components/Guias/Desktop/Compartir.vue"
import Descargar from "@/components/Guias/Desktop/Descargar.vue"
import Ejecutar from "@/components/Guias/Desktop/Ejecutar.vue"
import PruebaImpresion from "@/components/Guias/Desktop/PruebaImpresion.vue"
const indicePaso = ref(0);
const clase = (indice: number) => {
    if (indice === indicePaso.value) {
        return "border-b-2 border-b-indigo-500 text-indigo-500";
    }
    return "";
}
</script>
<template>
    <div class="flex flex-row overflow-x-auto">
        <div @click="indicePaso = indice" class="cursor-pointer pt-1 pb-2 px-2 w-fit min-w-fit" :class="clase(indice)"
            v-for="(paso, indice) in ['1: Instalar impresora', '2: Compartir impresora', '3: Descargar plugin', '4: Ejecutar plugin', '5: Prueba de impresión']">
            {{ paso }}
        </div>
    </div>
    <Instalar v-if="indicePaso === 0"></Instalar>
    <Compartir v-if="indicePaso === 1"></Compartir>
    <Descargar v-if="indicePaso === 2"></Descargar>
    <Ejecutar v-if="indicePaso === 3"></Ejecutar>
    <PruebaImpresion v-if="indicePaso === 4"></PruebaImpresion>
</template>