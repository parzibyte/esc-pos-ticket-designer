<script lang="ts" setup>
import {
    ALGORITMOS_PARA_IMPRIMIR_IMAGEN, ALGORITMO_IMPRESION_POR_DEFECTO,
    type AlgoritmoDeImpresionDeImagenConNombre
} from '@/types/Tipos'
import { ref, computed } from "vue"
import Select from "@/components/Select.vue"
type Propiedades = {
    modelValue: AlgoritmoDeImpresionDeImagenConNombre,
};

const propiedades = withDefaults(defineProps<Propiedades>(), {
    modelValue: () => {
        return ALGORITMO_IMPRESION_POR_DEFECTO;
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

const algoritmosDeImpresionDeImagen = ref(ALGORITMOS_PARA_IMPRIMIR_IMAGEN);
</script>
<template>
    <Select :display-item-function="(algorithm) => $t('imageAlgorithms.' + algorithm.nombre)"
        :items="algoritmosDeImpresionDeImagen" :label="$t('imageAlgorithm')" v-model="valorSerializado">
        <template #item="{ item, index }">
            <h1 class="text-xl">
                {{ $t('imageAlgorithms.' + item.nombre) }}
            </h1>
        </template>
    </Select>
</template>