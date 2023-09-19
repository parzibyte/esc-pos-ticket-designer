<script setup lang="ts">
import { ref } from "vue"
import type { Ref } from 'vue'
import type { Operacion } from "../types/Tipos"
import Autocompletado from "@/components/Autocompletado.vue";
//import Operacion from "../types/Operacion"
const operaciones: Ref<Array<Operacion>> = ref([]);
const agregarOperacionVacia = () => {
    operaciones.value.push({ nombre: "Parzibyte" });
}
</script>
<template>
    <div class="bg-zinc-300">
        <input type="text" class="border-2 border-sky-800 rounded-md">
        <div>
            e
        </div>
    </div>
    <div class="max-w-xs content-center">
        <Autocompletado/>
        <Autocompletado/>
    </div>
    <button @click="agregarOperacionVacia">Agregar</button>
</template>