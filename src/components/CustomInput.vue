<script setup lang="ts">
import { computed } from "vue"
type PropiedadesDelComponente = {
    label: string,
    modelValue: number | string,
};
const propiedades = withDefaults(defineProps<PropiedadesDelComponente>(), {
    label: "",
    modelValue: 0,
})
const emit = defineEmits(['update:modelValue'])
const value = computed({
    get() {
        return propiedades.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
});
</script>
<template>
    <div class="flex flex-col p-1">
        <label class="inline-block font-semibold mb-1 text-md">{{ propiedades.label }}</label>
        <input class="max-w-full w-full max-h-10 h-10 border border-gray-200 focus:border-blue-500 rounded-md p-1 outline-none focus:border-2"
            v-bind="$attrs" v-model="value">

    </div>
</template>