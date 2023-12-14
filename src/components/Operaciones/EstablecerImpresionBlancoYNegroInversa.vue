<script setup lang="ts">
import { type ArgumentosParaDefinirImpresionBlancoYNegroInversa } from '@/types/Tipos';
import { computed, } from 'vue';
import CustomCheckbox from '../CustomCheckbox.vue';

type Propiedades = {
	modelValue: ArgumentosParaDefinirImpresionBlancoYNegroInversa,
};
const propiedades = withDefaults(defineProps<Propiedades>(), {
	modelValue: () => {
		return {
			inversa: false,
		};
	}
})
const emit = defineEmits(["update:modelValue"]);
const valorSerializado = computed<ArgumentosParaDefinirImpresionBlancoYNegroInversa>({
	set(value) {
		emit("update:modelValue", value);
	},
	get() {
		return propiedades.modelValue;
	},
});
</script>
<template>
	<CustomCheckbox :label="$t('negative')" v-model="valorSerializado.inversa"></CustomCheckbox>
</template>