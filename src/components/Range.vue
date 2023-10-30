<script setup lang="ts">
import { computed, useAttrs } from 'vue';

type PropiedadesDelComponente = {
    label: string,
    modelValue: number,
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
const estiloInput = () => {
    const { min: stringMin, max: stringMax } = useAttrs() as { min: string, max: string };
    const min = parseInt(stringMin);
    const max = parseInt(stringMax);
    const percentage = (propiedades.modelValue - min) * 100 / (max - min);
    return {
        "backgroundSize": `${percentage}% 100%`,
    };
}
</script>
<template>
    <div class="p-1">
        <label class="block">
            <span class="font-semibold">
                {{ label }}
            </span>
            {{ value }}</label>
        <input v-bind="$attrs" :style="estiloInput()" type="range" v-model.number="value">
    </div>
</template>
<style lang="css" scoped>
input[type="range"] {
    background-color: transparent;
    appearance: none;
    height: 0.5rem;
    background-image: linear-gradient(theme("colors.sky.500"), theme("colors.sky.500"));
    background-repeat: no-repeat;
    border-radius: 5px;
    background-color: theme("colors.gray.200");

}

/**El puntito */
input[type="range"]::-webkit-slider-thumb {
    background: theme("colors.white");
    height: 1rem;
    width: 1rem;
    appearance: none;
    border: 1px solid theme("colors.gray.200");
    border-radius: 3px;
    margin-top: 0.1rem;
    cursor: pointer;
}
input[type="range"]::-webkit-slider-thumb:hover {
    border: 2px solid theme("colors.blue.200");
}

/*La barra*/
input[type="range"]::-webkit-slider-runnable-track {
    appearance: none;
}

input[type="range"]:focus {
    outline: none;
}
</style>