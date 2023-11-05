<script setup lang="ts">
import { type ArgumentosParaDefinirImpresionAlReves } from '@/types/Tipos';
import { computed, } from 'vue';
import CustomCheckbox from '../CustomCheckbox.vue';

type Propiedades = {
	modelValue: ArgumentosParaDefinirImpresionAlReves,
};
const propiedades = withDefaults(defineProps<Propiedades>(), {
	modelValue: () => {
		return {
			alReves: false,
		};
	}
})
const emit = defineEmits(["update:modelValue"]);
const valorSerializado = computed<ArgumentosParaDefinirImpresionAlReves>({
	set(value) {
		emit("update:modelValue", value);
	},
	get() {
		return propiedades.modelValue;
	},
});
</script>
<template>
	<CustomCheckbox label="Al revés" v-model="valorSerializado.alReves"></CustomCheckbox>
	<p>A partir de aquí, el texto <strong>{{ valorSerializado.alReves ? "" : "no" }}</strong> estará al revés</p>
</template>