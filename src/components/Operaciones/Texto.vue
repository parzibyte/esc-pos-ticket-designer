<script setup lang="ts">
import { computed, ref } from 'vue';
import { Alineacion, type ArgumentosParaDefinirTexto } from "@/types/Tipos"
import Select from "@/components/Select.vue";
import CustomCheckbox from "@/components/CustomCheckbox.vue";
import CustomTextarea from "@/components/CustomTextarea.vue";

type Propiedades = {
    modelValue: ArgumentosParaDefinirTexto,
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
            alineacion: {
                nombre: "Izquierda",
                valor: Alineacion.Izquierda,
            },
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
    <CustomTextarea rows="3" placeholder="Escribe el texto para imprimir..." label="Texto para imprimir"
        v-model="propiedades.modelValue.texto"></CustomTextarea>
    <div class="flex flex-col md:flex-row">
        <Select :items="tamañosFuente" label="Ancho" v-model.number="propiedades.modelValue.ancho">
            <template #item="{ item, index }">
                <h1 class="text-xl">{{ item }}</h1>
            </template>
        </Select>
        <Select :items="tamañosFuente" label="Alto" v-model.number="propiedades.modelValue.alto">
            <template #item="{ item, index }">
                <h1 class="text-xl">{{ item }}</h1>
            </template>
        </Select>
        <Select :display-item-function="alineacion => alineacion.nombre" :items="alineaciones" label="Alineación"
            v-model="propiedades.modelValue.alineacion">
            <template #item="{ item, index }">
                <h1 class="text-xl">{{ item.nombre }}</h1>
            </template>
        </Select>
    </div>
    <div class="flex md:flex-row flex-col">
        <CustomCheckbox label="Enfatizado" v-model="propiedades.modelValue.enfatizado"></CustomCheckbox>
        <CustomCheckbox label="Subrayado" v-model="propiedades.modelValue.subrayado"></CustomCheckbox>
        <CustomCheckbox label="Al revés" v-model="propiedades.modelValue.alReves"></CustomCheckbox>
        <CustomCheckbox label="Inverso" v-model="propiedades.modelValue.inverso"></CustomCheckbox>
        <CustomCheckbox label="Rotar 90°" v-model="propiedades.modelValue.rotacion90"></CustomCheckbox>
    </div>
    <div class="bg-red-500 rounded-md text-white p-1 my-2"
        v-show="propiedades.modelValue.alto !== 1 && propiedades.modelValue.rotacion90">
        <strong>
            Problemas conocidos:
        </strong>

        cuando se elige
        <strong>
            Rotación de 90°
        </strong>
        el
        <strong>Alto</strong>
        debería ser 1
    </div>
</template>