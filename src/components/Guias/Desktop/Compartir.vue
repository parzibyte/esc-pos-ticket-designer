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
        <p>Vamos a compartir la impresora para que el plugin pueda detectarla. No te confundas, esto no
            habilita la impresión a través de la red, pero es un paso obligatorio</p>
        <div class="flex flex-row overflow-x-auto">
            <div :class="clase(indice)" @click="indiceSistema = indice"
                class="cursor-pointer pt-1 pb-2 px-2 w-fit min-w-fit"
                v-for="(sistema, indice) in ['Windows 8, 8.1 y 10', 'Windows 11', 'Linux y Raspbian']">{{ sistema }}
            </div>
        </div>
        <div class="px-4 leading-relaxed text-xl text-justify">
            <CompartirW10 v-if="indiceSistema === 0"></CompartirW10>
            <CompartirW11 v-if="indiceSistema === 1"></CompartirW11>
            <div v-if="indiceSistema === 2">
                <p>En derivados de Debian y Raspbian, este paso no es necesario</p>
            </div>
        </div>
    </div>
</template>