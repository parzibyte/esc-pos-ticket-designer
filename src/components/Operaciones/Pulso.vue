<script setup lang="ts">
import type { ArgumentosParaDefinirPulso } from '@/types/Tipos';
import { computed, } from 'vue';
import CustomInput from '../CustomInput.vue';

type Propiedades = {
	modelValue: ArgumentosParaDefinirPulso;
};
const propiedades = withDefaults(defineProps<Propiedades>(), {
	modelValue: () => {
		return {
			pin: 48,
			tiempoEncendido: 60,
			tiempoApagado: 120,
		};
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
</script>
<template>
	<div class="flex flex-col md:flex-row">
		<CustomInput type="number" placeholder="Pin" label="Pin" v-model="propiedades.modelValue.pin"></CustomInput>
		<CustomInput type="number" placeholder="Milisegundos encendido" label="Tiempo encendido"
			v-model="propiedades.modelValue.tiempoEncendido"></CustomInput>
		<CustomInput type="number" placeholder="Milisegundos apagado" label="Tiempo apagado"
			v-model="propiedades.modelValue.tiempoApagado"></CustomInput>

	</div>
</template>