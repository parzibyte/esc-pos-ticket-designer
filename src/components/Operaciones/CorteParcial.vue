<script setup lang="ts">
import type { ArgumentosParaDefinirCorteParcial } from '@/types/Tipos';
import { computed, } from 'vue';

type Propiedades = {
	modelValue: ArgumentosParaDefinirCorteParcial;
};
const propiedades = withDefaults(defineProps<Propiedades>(), {
	modelValue: () => {
		return {
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
	
</template>