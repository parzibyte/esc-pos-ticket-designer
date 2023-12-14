<script setup lang="ts">
import { ref } from 'vue';
import Sincronizar from "@/components/Guias/Android/SincronizarImpresora.vue"
import Descargar from "@/components/Guias/Android/Descargar.vue"
import Instalar from "@/components/Guias/Android/Instalar.vue"
import Probar from "@/components/Guias/Android/Probar.vue"
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
            v-for="(paso, indice) in [$t('firstSteps.android.pairPrinter.title'), $t('firstSteps.android.downloadPlugin.title'), $t('firstSteps.android.installPlugin.title'), $t('firstSteps.android.testFromPlugin.title'), $t('firstSteps.android.testFromDesigner.title')]">
            {{ paso }}
        </div>
    </div>
    <div class="p-4 leading-relaxed text-xl text-justify">
        <Sincronizar v-if="indicePaso === 0"></Sincronizar>
        <Descargar v-if="indicePaso === 1"></Descargar>
        <Instalar v-if="indicePaso === 2"></Instalar>
        <Probar v-if="indicePaso === 3"></Probar>
        <PruebaImpresion :plataforma="props.plataforma" v-if="indicePaso === 4"></PruebaImpresion>
    </div>
</template>