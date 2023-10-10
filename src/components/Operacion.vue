<script setup lang="ts">
import { defineProps } from "vue";
import { type OperacionDelDiseñador } from "@/types/Tipos";

import Delete from "vue-material-design-icons/Delete.vue";
import Corte from "./Operaciones/Corte.vue";

type MyComponentProps = {
    operacion: OperacionDelDiseñador;
};
const props = defineProps<MyComponentProps>();
const emit = defineEmits<{
    (e: "eliminar"): void,
}>();

const eliminar = () => {
    emit("eliminar");
}
</script>
<template>
    <div class="p-1 my-2 border border-zinc-500">
        <div class="flex my-2">
            <h1 class="text-xl">{{ props.operacion.nombre }}</h1>
            <small>{{ operacion.valor }}</small>
            <button @click="eliminar" class="bg-red-500 text-white p-1 mx-2 rounded-md hover:bg-red-600 focus:bg-red-600">
                <Delete />
            </button>
        </div>
        <component v-model="operacion.argumentos" :is="props.operacion.componente"></component>
    </div>
</template>