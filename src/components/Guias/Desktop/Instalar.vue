<script setup lang="ts">
import ImpresoraW11 from "@/components/Guias/Desktop/Windows/11/Instalar.vue";
import ImpresoraWindows10YAnteriores from "@/components/Guias/Desktop/Windows/10/Instalar.vue";
import { ref } from "vue";
import InstalarLinuxLike from "@/components/Guias/Desktop/Linux/Instalar.vue";
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
                v-for="(sistema, indice) in ['Windows 8, 8.1 y 10', 'Windows 11', 'Linux y Raspbian']">{{ sistema }}
            </div>
        </div>
        <ImpresoraW11 v-if="indiceSistema === 1"></ImpresoraW11>
        <ImpresoraWindows10YAnteriores v-if="indiceSistema === 0"></ImpresoraWindows10YAnteriores>
        <InstalarLinuxLike v-if="indiceSistema === 2"></InstalarLinuxLike>
    </div>
</template>