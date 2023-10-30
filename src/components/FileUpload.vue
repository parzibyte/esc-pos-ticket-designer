<script lang="ts" setup>
import { computed, ref } from 'vue';
type Props = {
    modelValue: File[],
    label: string,
};

const props = withDefaults(defineProps<Props>(), {
    modelValue: () => {
        return [];
    },
    label: "Select file",
})

const emit = defineEmits(["change", "update:modelValue"]);
const fileList = computed({
    set(value) {
        emit("update:modelValue", value);
    },
    get() {
        return props.modelValue;
    },
});

const inputReference = ref(null);

const handleClick = () => {
    inputReference.value.click()
}

const onActualInputChange = (e: Event) => {
    const files = e.target.files;
    fileList.value = files;
    if (files.length <= 0) {
        return;
    }
    emit("change", files);
}
</script>
<template>
    <button @click="handleClick"
        class="max-w-max h-10 p-2 bg-sky-500 text-white rounded-md mx-1 mt-1 font-semibold hover:bg-sky-400">{{ label }}</button>
    <div>
        <span class="mr-2 mt-1 mb-1 inline-block text-white bg-indigo-500 p-1 font-semibold rounded-md text-xs"
            v-for="file in props.modelValue">{{ file.name }}</span>
        <input v-bind="$attrs" @change="onActualInputChange" ref="inputReference" class="hidden" type="file">
    </div>
</template>