<script setup lang="ts">
import { type ArgumentosParaDefinirRotacionDe90Grados } from '@/types/Tipos';
import { computed, } from 'vue';
import CustomCheckbox from '../CustomCheckbox.vue';

type Propiedades = {
	modelValue: ArgumentosParaDefinirRotacionDe90Grados,
};
const propiedades = withDefaults(defineProps<Propiedades>(), {
	modelValue: () => {
		return {
			rotar: false,
		};
	}
})
const emit = defineEmits(["update:modelValue"]);
const valorSerializado = computed<ArgumentosParaDefinirRotacionDe90Grados>({
	set(value) {
		emit("update:modelValue", value);
	},
	get() {
		return propiedades.modelValue;
	},
});
</script>
<template>
	<CustomCheckbox label="¿Rotar 90°?" v-model="valorSerializado.rotar"></CustomCheckbox>
	<p>A partir de aquí, el texto <strong>{{ valorSerializado.rotar ? "" : "no" }}</strong> estará rotado</p>
</template>