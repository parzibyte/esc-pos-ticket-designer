<script lang="ts" setup>
import type { Diseño } from '@/types/Tipos';
import { computed } from 'vue';
import { usePingPlatformStore } from "@/stores/ping_platform"
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
    return estadoDePlataforma.activa;
});

const navegarAAyuda = () => {
    //TODO
}


</script>
<template>
    <div class="inline-block" v-show="estaConectado">
        <div class="flex flex-row items-center">
            <span class="relative flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <p class="text-green-600 ml-1">Plugin</p>
        </div>
    </div>
    <div class="inline-block" v-show="!estaConectado">
        <div class="flex flex-row items-center">
            <span class="relative flex h-3 w-3">
                <span class="rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <p class="text-red-600 ml-1 cursor-pointer" @click="navegarAAyuda">Error</p>
        </div>
    </div>
</template>