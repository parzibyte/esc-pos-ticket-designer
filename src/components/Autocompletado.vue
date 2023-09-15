<script setup lang="ts">
import { computed, ref } from "vue"
import type { Ref } from 'vue'
import ChevronDownCircleOutline from 'vue-material-design-icons/ChevronDownCircleOutline.vue';
const opciones: Ref<Array<string>> = ref(["Hola", "sí"]);
const tieneFocus: Ref<boolean> = ref(false);
const deberiaMostrarElementos = computed(() => {
    return tieneFocus;
});

const onFocus = () => {
    tieneFocus.value = true;
}
const onLostFocus = () => {
    tieneFocus.value = false;
}

const onOpcionSeleccionada = (opcion: any) => {
    console.log({ opcion });
}
</script>
<template>
    <div class="flex flex-col bg-gray-100 p-2">
        <div class="flex">
            <input placeholder="Selecciona una opción" @focus="onFocus" @blur="onLostFocus" type="text"
                class="w-full h-12 border-2 border-sky-800 rounded-l-md p-2">
            <button class="px-3 bg-blue-500 text-white rounded-r-md">
                <ChevronDownCircleOutline/>
            </button>
        </div>
        <ul class="w-full" v-show="tieneFocus || true">
            <li @click="onOpcionSeleccionada(opcion)" v-for="opcion in opciones"
                class="rounded-md my-1 p-4 bg-white hover:bg-sky-200 hover:cursor-pointer">
                {{ opcion }}
            </li>
        </ul>
    </div>
</template>