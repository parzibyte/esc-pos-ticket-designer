<script lang="ts" setup>
import ContentCopy from "vue-material-design-icons/ContentCopy.vue";
type Propiedades = {
    codigo: string,
};
const propiedades = withDefaults(defineProps<Propiedades>(), {
    codigo: () => "",
})

const copiar = async () => {
    await navigator.clipboard.writeText(propiedades.codigo);
}
</script>
<template>
    <div class="relative">
        <button @click="copiar"
            class="absolute right-0 mr-2 top-0 mt-2 border-2 border-gray-100 h-8 w-8 rounded flex items-center justify-center">
            <ContentCopy fillColor="#ffffff"></ContentCopy>
        </button>
        <pre
            class="bg-gray-800 overflow-x-auto p-4 break-all whitespace-pre-wrap rounded-md text-white">{{ propiedades.codigo }}</pre>
    </div>
</template>