<script setup lang="ts">
import { Alineacion, TamañoImagen, type ArgumentosParaDefinirImagenLocal } from '@/types/Tipos';
import { computed, ref, } from 'vue';
import CustomInput from '../CustomInput.vue';
import Range from '../Range.vue';
import SelectTamanioImagen from '../Selects/SelectTamanioImagen.vue';
import SelectAlineacion from '../Selects/SelectAlineacion.vue';

type Propiedades = {
	modelValue: ArgumentosParaDefinirImagenLocal;
};
const propiedades = withDefaults(defineProps<Propiedades>(), {
	modelValue: () => {
		return {
			ruta: "",
			tamaño: {
				nombre: "Normal",
				valor: TamañoImagen.Normal,
			},
			alineacion: {
				nombre: "Centro",
				valor: Alineacion.Centro,
			},
			maximoAncho: 8,
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
	<SelectTamanioImagen v-model="propiedades.modelValue.tamaño"></SelectTamanioImagen>
	<SelectAlineacion v-model="propiedades.modelValue.alineacion"></SelectAlineacion>
	<Range label="Ancho" step="8" min="8" max="648" v-model="propiedades.modelValue.maximoAncho"></Range>
	<CustomInput type="text" placeholder="/home/parzibyte/mj.png" label="Ruta absoluta de la imagen"
		v-model="propiedades.modelValue.ruta"></CustomInput>
</template>