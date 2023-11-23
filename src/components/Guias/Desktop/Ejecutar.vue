<script setup lang="ts">
import EjecutarWindows from "@/components/Guias/Desktop/Windows/Ejecutar.vue";
import EjecutarLinux from "@/components/Guias/Desktop/Linux/Ejecutar.vue";
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
        <EjecutarWindows v-if="indiceSistema === 0"></EjecutarWindows>
        <EjecutarLinux v-if="indiceSistema === 1"></EjecutarLinux>
    </div>
</template>