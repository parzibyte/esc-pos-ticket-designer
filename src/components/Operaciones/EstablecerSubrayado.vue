<script setup lang="ts">
import { type ArgumentosParaDefinirSubrayado } from '@/types/Tipos';
import { computed, } from 'vue';
import CustomCheckbox from '../CustomCheckbox.vue';

type Propiedades = {
	modelValue: ArgumentosParaDefinirSubrayado,
};
const propiedades = withDefaults(defineProps<Propiedades>(), {
	modelValue: () => {
		return {
			subrayar: false,
		};
	}
})
const emit = defineEmits(["update:modelValue"]);
const valorSerializado = computed<ArgumentosParaDefinirSubrayado>({
	set(value) {
		emit("update:modelValue", value);
	},
	get() {
		return propiedades.modelValue;
	},
});
</script>
<template>
	<CustomCheckbox :label="$t('underline')" v-model="valorSerializado.subrayar"></CustomCheckbox>
</template>