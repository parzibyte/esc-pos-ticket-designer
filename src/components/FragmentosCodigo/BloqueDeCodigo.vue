<script lang="ts" setup>
type Propiedades = {
    codigo: string,
};
const propiedades = withDefaults(defineProps<Propiedades>(), {
    codigo: () => "",
})
</script>
<template>
    <pre class="bg-gray-800 overflow-x-auto p-4 break-all whitespace-pre-wrap rounded-md text-white"><slot></slot></pre>
</template>