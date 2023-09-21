<script setup lang="ts">

import { defineProps } from "vue"

type MyComponentProps = {
    tipo: string,
};
const props = defineProps<MyComponentProps>();
</script>

<template>
    <input :type="props.tipo" class="border border-emerald-300 rounded-md max-w-full focus:outline-none p-1">
</template>