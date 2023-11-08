<script lang="ts" setup>
import { Operacion } from '@/types/Operacion';
type PropiedadesDelComponente = {
    operacion: Operacion,
};
const propiedades = withDefaults(defineProps<PropiedadesDelComponente>(), {
})
</script>
<template>
    <div class="bg-white p-1 rounded-md  break-words cursor-pointer border border-gray-150 hover:bg-gray-100">
        <h1 class="text-md  text-center text-black">{{ propiedades.operacion.nombre }}</h1>
        <p class="text-xs text-gray-700">{{ propiedades.operacion.descripcion }}</p>
    </div>
</template>