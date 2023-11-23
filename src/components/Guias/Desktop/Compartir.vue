<script setup lang="ts">
import clicDerecho from "@/assets/CompartirW10Anteriores/Click-derecho.png";
import compartir1 from "@/assets/CompartirW10Anteriores/Compartir-1.png";
import compartirImpresoraLocal from "@/assets/CompartirW10Anteriores/Compartir-2.png";
import { ref } from "vue";
import CompartirImpresoraWindows10YAnteriores from "@/components/Guias/Desktop/Windows/10/Compartir.vue";
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
        <p>Vamos a compartir la impresora aunque esto no es para usarla en red, es para que el plugin funcione</p>
        <div class="flex flex-row overflow-x-auto">
            <div :class="clase(indice)" @click="indiceSistema = indice"
                class="cursor-pointer pt-1 pb-2 px-2 w-fit min-w-fit"
                v-for="(sistema, indice) in ['Windows 8, 8.1 y 10', 'Windows 11', 'Linux y Raspbian']">{{ sistema }}
            </div>
        </div>
        <CompartirImpresoraWindows10YAnteriores v-if="indiceSistema === 0"></CompartirImpresoraWindows10YAnteriores>
        <CompartirW11 v-if="indiceSistema === 1"></CompartirW11>
        <div v-if="indiceSistema === 2">
            <p>En derivados de Debian y Raspbian, este paso no es necesario</p>
        </div>

    </div>
</template>