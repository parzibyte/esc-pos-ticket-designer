<script lang="ts" setup>
import { Operacion, listaCompletaDeOperaciones } from '@/types/Operacion';
import OperacionParaAgregar from './OperacionParaAgregar.vue';
import { type Ref, ref } from "vue"
type PropiedadesDelComponente = {
    operaciones: Operacion[],
};
const propiedades = withDefaults(defineProps<PropiedadesDelComponente>(), {
    operaciones: [],
})
const emit = defineEmits(['operacionSeleccionada'])
const todasLasOperaciones: Ref<Array<Operacion>> = ref(listaCompletaDeOperaciones);
const onClick = (operacion: Operacion) => {
    emit("operacionSeleccionada", operacion);
}
</script>
<template>
    <div class="grid gap-2 grid-cols-5 bg-gray-200 p-1">
        <OperacionParaAgregar @click="onClick(operacion)" :operacion="operacion" v-for="operacion in todasLasOperaciones">
        </OperacionParaAgregar>
    </div>
</template>