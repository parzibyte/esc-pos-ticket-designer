<script setup lang="ts">
import DescargarWindows from "@/components/Guias/Desktop/Windows/Descargar.vue";
import DescargarLinux from "@/components/Guias/Desktop/Linux/Descargar.vue";
import { ref } from "vue";
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
                :class="clase(indice)" v-for="(sistema, indice) in ['Windows 8, 8.1, 10 y 11', 'Linux y Raspbian']">{{
                    sistema }}
            </div>
        </div>
        <div class="p-4 leading-relaxed text-xl text-justify">
            <DescargarWindows v-if="indiceSistema === 0"></DescargarWindows>
            <DescargarLinux v-if="indiceSistema === 1"></DescargarLinux>
        </div>
    </div>
</template>