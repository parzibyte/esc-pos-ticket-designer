<script setup lang="ts">
import { ref } from "vue";
import CompartirW10 from "@/components/Guias/Desktop/Windows/10/Compartir.vue";
import CompartirW11 from "@/components/Guias/Desktop/Windows/11/Compartir.vue";
const indiceSistema = ref(0);
const clase = (indice: number) => {
    if (indice === indiceSistema.value) {
        return "border-b-2 border-b-green-500 text-green-500";
    }
    return "";
}
</script>
<template>
    <div>
        <p class="px-2">{{ $t("firstSteps.desktop.sharePrinter.shareNote") }}</p>
        <div class="flex flex-row overflow-x-auto">
            <div :class="clase(indice)" @click="indiceSistema = indice"
                class="cursor-pointer pt-1 pb-2 px-2 w-fit min-w-fit"
                v-for="(sistema, indice) in [$t('firstSteps.desktop.installPrinter.windows10.title'), $t('firstSteps.desktop.installPrinter.windows11.title'), $t('firstSteps.desktop.installPrinter.linux.title')]">
                {{ sistema }}
            </div>
        </div>
        <div class="px-4 leading-relaxed text-xl text-justify">
            <CompartirW10 v-if="indiceSistema === 0"></CompartirW10>
            <CompartirW11 v-if="indiceSistema === 1"></CompartirW11>
            <div v-if="indiceSistema === 2">
                <p>{{ $t("firstSteps.desktop.sharePrinter.linux.note") }}</p>
            </div>
        </div>
    </div>
</template>