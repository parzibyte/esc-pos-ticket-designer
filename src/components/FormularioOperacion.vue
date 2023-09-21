<script setup lang="ts">

import { defineProps, } from "vue"
import { type OperacionDelDiseñador } from '@/types/Tipos';

import Delete from 'vue-material-design-icons/Delete.vue';
import CampoParaFormularioDeOperacion from "./CampoParaFormularioDeOperacion.vue";

type MyComponentProps = {
    operacion: OperacionDelDiseñador,
};
const props = defineProps<MyComponentProps>();
</script>
<template>
    <div class="p-1 border border-zinc-500">
        <div class="flex">
            <h1 class="text-xl">{{ props.operacion.nombre }}</h1>
            <button class="bg-red-500  text-white p-1 mx-2 rounded-md hover:bg-red-600 focus:bg-red-600">
                <Delete />
            </button>
        </div>
        <template v-for="argumento in props.operacion.funcion.argumentos">
            <div class="mb-2">
                <p>{{ argumento.descripcion }}:</p>
                <CampoParaFormularioDeOperacion :argumento="argumento" :operacion="props.operacion" />
            </div>
        </template>
    </div>
</template>