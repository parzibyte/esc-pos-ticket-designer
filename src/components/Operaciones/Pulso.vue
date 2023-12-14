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
		<CustomInput type="number" :placeholder="$t('operationComponents.Pulso.connectorPin')"
			:label="$t('operationComponents.Pulso.connectorPin')" v-model="propiedades.modelValue.pin"></CustomInput>
		<CustomInput type="number" :placeholder="$t('operationComponents.Pulso.onTime')"
			:label="$t('operationComponents.Pulso.onTime')" v-model="propiedades.modelValue.tiempoEncendido"></CustomInput>
		<CustomInput type="number" :placeholder="$t('operationComponents.Pulso.offTime')"
			:label="$t('operationComponents.Pulso.offTime')" v-model="propiedades.modelValue.tiempoApagado"></CustomInput>

	</div>
</template>