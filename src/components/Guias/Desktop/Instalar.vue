<script setup lang="ts">
import InstalarW11 from "@/components/Guias/Desktop/Windows/11/Instalar.vue";
import InstalarW10 from "@/components/Guias/Desktop/Windows/10/Instalar.vue";
import { ref } from "vue";
import InstalarLinux from "@/components/Guias/Desktop/Linux/Instalar.vue";
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
        <div class="flex flex-row overflow-x-auto">
            <div @click="indiceSistema = indice" class="cursor-pointer pt-1 pb-2 px-2 w-fit min-w-fit"
                :class="clase(indice)"
                v-for="(sistema, indice) in [$t('firstSteps.desktop.installPrinter.windows10.title'), $t('firstSteps.desktop.installPrinter.windows11.title'), $t('firstSteps.desktop.installPrinter.linux.title')]">
                {{ sistema }}
            </div>
        </div>
        <div class="px-4 text-xl text-justify">
            <InstalarW10 v-if="indiceSistema === 0"></InstalarW10>
            <InstalarW11 v-if="indiceSistema === 1"></InstalarW11>
            <InstalarLinux v-if="indiceSistema === 2"></InstalarLinux>
        </div>
    </div>
</template>