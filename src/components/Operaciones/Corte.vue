<script setup lang="ts">
import { computed, } from 'vue';

type Propiedades = {
	modelValue: { lineas: number };
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
	<label class="block font-bold">Líneas</label>
	<input type="number" placeholder="Líneas" v-model.number="propiedades.modelValue.lineas"
		class="border border-emerald-300 rounded-md max-w-full focus:outline-none p-1">
</template>