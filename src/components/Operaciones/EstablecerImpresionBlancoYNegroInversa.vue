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
	<CustomCheckbox label="B&N inverso" v-model="valorSerializado.inversa"></CustomCheckbox>
	<p>A partir de aquí, el texto <strong>{{ valorSerializado.inversa ? "" : "no" }}</strong> estará inverso</p>
</template>