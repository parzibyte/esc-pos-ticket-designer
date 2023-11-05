<script setup lang="ts">
import { type ArgumentosParaDefinirTamañoFuente } from '@/types/Tipos';
import { computed, } from 'vue';
import SelectTamanioFuente from '../Selects/SelectTamanioFuente.vue';

type Propiedades = {
	modelValue: ArgumentosParaDefinirTamañoFuente,
};
const propiedades = withDefaults(defineProps<Propiedades>(), {
	modelValue: () => {
		return {
			alto: 1,
			ancho: 1,
		};
	}
})
const emit = defineEmits(["update:modelValue"]);
const valorSerializado = computed<ArgumentosParaDefinirTamañoFuente>({
	set(value) {
		emit("update:modelValue", value);
	},
	get() {
		return propiedades.modelValue;
	},
});
</script>
<template>
	<div class="flex flex-col md:flex-row">
		<SelectTamanioFuente label="Alto" v-model="valorSerializado.alto"></SelectTamanioFuente>
		<SelectTamanioFuente label="Ancho" v-model="valorSerializado.ancho"></SelectTamanioFuente>
	</div>
</template>