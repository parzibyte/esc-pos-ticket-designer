<script lang="ts" setup>
import type { Diseño } from '@/types/Tipos';
import { computed } from 'vue';
import { usePingPlatformStore } from "@/stores/ping_platform"
import router from '@/router';
const pingStore = usePingPlatformStore();

const props = withDefaults(defineProps<{
    diseño: Diseño,
}>(), {
    diseño: () => {
        return {
            id: 0,
            nombre: "",
            fechaModificacion: "",
        };
    }
});


const estaConectado = computed(() => {
    const estadoDePlataforma = pingStore.estado[props.diseño.id_plataforma];
    if (!estadoDePlataforma) {
        return false;
    }
    return estadoDePlataforma.detalles;
});

const navegarAAyuda = () => {
    router.push({ name: "FirstSteps" });
}


</script>
<template>
    <div class="inline-block" v-if="estaConectado">
        <div class="flex flex-row items-center">
            <span class="relative flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <p class="text-green-600 ml-1">{{ estaConectado.plataforma }} {{ estaConectado.version }} ({{
                estaConectado.sistemaOperativo }})</p>
        </div>
    </div>
    <div class="inline-block" v-if="!estaConectado">
        <div class="flex flex-row items-center">
            <span class="relative flex h-3 w-3">
                <span class="rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <p class="text-red-600 ml-1 cursor-pointer" @click="navegarAAyuda">Error</p>
        </div>
    </div>
</template>