<script setup lang="ts">
import { Alineacion, type AlineacionConNombreYValor } from '@/types/Tipos';
import { computed, } from 'vue';
import SelectAlineacion from '../Selects/SelectAlineacion.vue';

type Propiedades = {
	modelValue: {
		alineacion: AlineacionConNombreYValor,
	},
};
const propiedades = withDefaults(defineProps<Propiedades>(), {
	modelValue: () => {
		return {
			alineacion: {
				nombre: "Centro",
				valor: Alineacion.Centro,
			},
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
	<SelectAlineacion v-model="propiedades.modelValue.alineacion"></SelectAlineacion>
</template>