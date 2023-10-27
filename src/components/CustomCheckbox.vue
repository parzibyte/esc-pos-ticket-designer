<script setup lang="ts">
import Check from "vue-material-design-icons/Check.vue";
import { computed, ref } from "vue"
type ComponentProps = {
    label: string,
    modelValue: boolean,
};
const props = withDefaults(defineProps<ComponentProps>(), {
    label: "",
    modelValue: false,
})

const isFocused = ref(false);

const emit = defineEmits(['update:modelValue'])
const booleanValue = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
});

const checkboxClasses = () => {
    return {
        "bg-sky-500": booleanValue.value,
        "border-blue-500": isFocused.value && !booleanValue.value,
    };
}

const onCheckboxClick = () => {
    booleanValue.value = !booleanValue.value
}

const onHover = () => {
    isFocused.value = true;
}

const onBlur = () => {
    isFocused.value = false;
}

const labelClasses = () => {
    return {
        "text-black": isFocused.value || booleanValue.value,
        "text-gray-500": !isFocused.value,
    };
}
</script>
<template>
    <div @mouseenter="onHover()" @focus="onHover()" @mouseleave="onBlur()" @click="onCheckboxClick"
        class="flex flex-row p-1 items-center select-none">
        <input v-model="booleanValue" type="checkbox" class="absolute opacity-0 -z-50">
        <div :class="checkboxClasses()"
            class="text-white h-8 w-8 border-2 border-gray-200 rounded-md cursor-pointer items-center flex justify-center">
            <Check :size="20"></Check>
        </div>
        <label :class="labelClasses()" class="font-semibold cursor-pointer text-base h-4 ml-2 ">{{ label }}</label>
    </div>
</template>