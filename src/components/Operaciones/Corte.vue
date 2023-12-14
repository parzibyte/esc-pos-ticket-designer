<script setup lang="ts">
import type { ArgumentosParaDefinirCorte } from '@/types/Tipos';
import { computed, } from 'vue';
import CustomInput from '../CustomInput.vue';

type Propiedades = {
	modelValue: ArgumentosParaDefinirCorte;
};
const propiedades = withDefaults(defineProps<Propiedades>(), {
	modelValue: () => {
		return {
			lineas: 0,
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
	<CustomInput type="number" :placeholder="$t('operationComponents.Corte.lines')"
		:label="$t('operationComponents.Corte.lines')" v-model="propiedades.modelValue.lineas"></CustomInput>
</template>