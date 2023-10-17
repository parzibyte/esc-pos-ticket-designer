<script setup lang="ts">
import { computed, } from 'vue';

type Propiedades = {
    modelValue: { texto: string };
};
const propiedades = withDefaults(defineProps<Propiedades>(), {
    modelValue: () => {
        return {
            texto: "",
        };
    }
})
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
    <label class="block font-bold">Texto</label>
    <input type="text" placeholder="Texto" v-model="propiedades.modelValue.texto"
        class="border border-emerald-300 rounded-md max-w-full focus:outline-none p-1">
</template>