<script setup lang="ts">
import { computed, ref } from 'vue';
import { Alineacion } from "@/types/Tipos"


type Propiedades = {
    modelValue: {
        texto: string,
        ancho: number,
        alto: number,
        enfatizado: boolean,
        alineacion: Alineacion,
        subrayado: boolean,
        alReves: boolean,
        inverso: boolean,
        rotacion90: boolean,
    };
};
const alineaciones = ref([
    {
        nombre: "Izquierda",
        valor: Alineacion.Izquierda,
    },
    {
        nombre: "Centro",
        valor: Alineacion.Centro,
    },
    {
        nombre: "Derecha",
        valor: Alineacion.Derecha,
    },
]);
const propiedades = withDefaults(defineProps<Propiedades>(), {
    modelValue: () => {
        return {
            texto: "",
            ancho: 1,
            alto: 1,
            enfatizado: false,
            alineacion: Alineacion.Izquierda,
            subrayado: false,
            alReves: false,
            inverso: false,
            rotacion90: false,
        };
    }
})
const tamañosFuente = [1, 2, 3, 4, 5, 6, 7, 8];
const emit = defineEmits(["update:modelValue"]);
const valorSerializado = computed({
    set(value) {
        emit("update:modelValue", value);
    },
    get() {
        return propiedades.modelValue;
    },
});
</script>
<template>
    <label class="block font-bold">Fuente</label>
    <label class="font-bold">Ancho</label>
    <select v-model="propiedades.modelValue.ancho" class="border border-gray-200">
        <option v-for="tamaño in tamañosFuente" :value="tamaño">{{ tamaño }}</option>
    </select>
    <label class="font-bold">Alto</label>
    <select class="border border-gray-200" v-model="propiedades.modelValue.alto">
        <option v-for="tamaño in tamañosFuente" :value="tamaño">{{ tamaño }}</option>
    </select>
    <label class="font-bold">Enfatizado</label>
    <input type="checkbox" v-model="propiedades.modelValue.enfatizado">
    <label class="font-bold">Alineación</label>
    <select class="border border-gray-200" v-model="propiedades.modelValue.alineacion">
        <option v-for="alineacion in alineaciones" :value="alineacion.valor">{{ alineacion.nombre }}</option>
    </select>
    <label class="font-bold">Subrayado</label>
    <input type="checkbox" v-model="propiedades.modelValue.subrayado">


    <label class="font-bold">Al revés</label>
    <input type="checkbox" v-model="propiedades.modelValue.alReves">
    <label class="font-bold">Inverso</label>
    <input type="checkbox" v-model="propiedades.modelValue.inverso">
    <label class="font-bold">Rotación 90 °</label>
    <input type="checkbox" v-model="propiedades.modelValue.rotacion90">
    <label class="block font-bold">Texto</label>
    <textarea placeholder="Texto para imprimir" rows="3"
        class="border border-emerald-300 rounded-md max-w-full focus:outline-none p-1"
        v-model="propiedades.modelValue.texto"></textarea>
</template>