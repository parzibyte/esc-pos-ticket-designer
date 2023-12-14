<script setup lang="ts">
import { type ArgumentosParaDefinirEnfatizado } from '@/types/Tipos';
import { computed, } from 'vue';
import CustomCheckbox from '../CustomCheckbox.vue';

type Propiedades = {
	modelValue: ArgumentosParaDefinirEnfatizado,
};
const propiedades = withDefaults(defineProps<Propiedades>(), {
	modelValue: () => {
		return {
			enfatizado: false,
		};
	}
})
const emit = defineEmits(["update:modelValue"]);
const valorSerializado = computed<ArgumentosParaDefinirEnfatizado>({
	set(value) {
		emit("update:modelValue", value);
	},
	get() {
		return propiedades.modelValue;
	},
});
</script>
<template>
	<CustomCheckbox :label="$t('emphasized')" v-model="valorSerializado.enfatizado"></CustomCheckbox>
</template>