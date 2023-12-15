<script setup lang="ts">
import { ref } from 'vue';
import Instalar from "@/components/Guias/Desktop/Instalar.vue"
import Compartir from "@/components/Guias/Desktop/Compartir.vue"
import Descargar from "@/components/Guias/Desktop/Descargar.vue"
import PruebaImpresion from "@/components/Guias/PruebaImpresion.vue"
import type { PlataformaRecuperadaDeBaseDeDatos } from '@/types/Tipos';
const props = defineProps<{
    plataforma: PlataformaRecuperadaDeBaseDeDatos,
}>();
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
            v-for="(paso, indice) in [$t('firstSteps.desktop.installPrinter.title'), $t('firstSteps.desktop.sharePrinter.title'), $t('firstSteps.desktop.downloadAndExecutePlugin.title'), $t('firstSteps.desktop.printTest.title')]">
            {{ paso }}
        </div>
    </div>
    <div class="leading-relaxed ">
        <Instalar v-if="indicePaso === 0"></Instalar>
        <Compartir v-if="indicePaso === 1"></Compartir>
        <Descargar v-if="indicePaso === 2"></Descargar>
        <PruebaImpresion :plataforma="props.plataforma" v-if="indicePaso === 3"></PruebaImpresion>
    </div>
</template>