<script setup lang="ts">
import type { ArgumentosParaDefinirTextoSimple } from '@/types/Tipos';
import { computed, } from 'vue';
import CustomTextarea from '../CustomTextarea.vue';

type Propiedades = {
	modelValue: ArgumentosParaDefinirTextoSimple,
};
const propiedades = withDefaults(defineProps<Propiedades>(), {
	modelValue: () => {
		return {
			contenido: "",
		};
	}
})
const emit = defineEmits(["update:modelValue"]);
const valorSerializado = computed<ArgumentosParaDefinirTextoSimple>({
	set(value) {
		emit("update:modelValue", value);
	},
	get() {
		return propiedades.modelValue;
	},
});
</script>
<template>
	<CustomTextarea v-model="valorSerializado.contenido" :placeholder="$t('operationComponents.TextoSimple.placeholder')"
		:label="$t('operationComponents.TextoSimple.placeholder')"></CustomTextarea>
</template>