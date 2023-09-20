<script setup lang="ts">
import { ref } from "vue"
import type { Ref } from 'vue'
import type { Operacion } from "../types/Tipos"
import Select from "@/components/Select.vue";
//import Operacion from "../types/Operacion"
const operaciones: Ref<Array<Operacion>> = ref([]);
const agregarOperacionVacia = () => {
    operaciones.value.push({ nombre: "Parzibyte" });
}
const opcion1: Ref<any> = ref(null);

</script>
<template>
    <div class="bg-zinc-300">
        <input type="text" class="border-2 border-sky-800 rounded-md">
        <div>
            La opción 1 es {{ opcion1 }}
        </div>
    </div>
    <div class="max-w-xs content-center">
        <Select v-model="opcion1" label="Selecciona una opción">
            <template #item="{ item, index }">
                <h1 class="text-2xl">e</h1>
                <p>El item es
                    <strong>
                        {{ item }}
                    </strong>
                    con índice
                    <span class="bg-red-200">
                        {{ index }}
                    </span>
                </p>

            </template>
        </Select>
        <Select :displayItemFunction="(item) => { return 'soy el item ' + item }" />
    </div>
    <button @click="agregarOperacionVacia">Agregar</button>
</template>