<script setup lang="ts">
import { defineProps, type Component, watch } from "vue";
import { Operacion } from "@/types/Tipos";
import Delete from "vue-material-design-icons/Delete.vue";
import Corte from "./Operaciones/Corte.vue";
import DefinirCaracterPersonalizado from "./Operaciones/DefinirCaracterPersonalizado.vue";

const componentes: { [key: string]: Component } = {
    "Corte": Corte,
    "DefinirCaracterPersonalizado": DefinirCaracterPersonalizado,
};

type MyComponentProps = {
    operacion: Operacion;
};
const props = defineProps<MyComponentProps>();
const emit = defineEmits<{
    (e: "eliminar"): void,
    (e: "actualizado", operacion: Operacion): void,
}>();

const eliminar = () => {
    emit("eliminar");
}

watch(props.operacion.argumentos, () => {
    emit("actualizado", props.operacion);
});

</script>
<template>
    <div class="p-1 my-2 bg-white rounded-md">
        <div class="flex my-2">
            <h1 class="text-xl">{{ props.operacion.nombre }}</h1>
            <button @click="eliminar" class="bg-red-500 text-white p-1 mx-2 rounded-md hover:bg-red-600 focus:bg-red-600">
                <Delete />
            </button>
        </div>
        <component v-model="operacion.argumentos" :is="componentes[operacion.clave]"></component>
    </div>
</template>