<script setup lang="ts">
import { computed } from "vue"
type PropiedadesDelComponente = {
    label: string,
    modelValue: string,
};
const propiedades = withDefaults(defineProps<PropiedadesDelComponente>(), {
    label: "",
    modelValue: "",
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
        <label class="inline-block font-semibold mb-1">{{ propiedades.label }}</label>
        <textarea
            class="max-w-full w-full border border-gray-200 focus:border-blue-500 rounded-md p-1 outline-none focus:border-2"
            v-bind="$attrs" v-model="value"></textarea>

    </div>
</template>