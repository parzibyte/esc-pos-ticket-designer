<script setup lang="ts">
import { Alineacion, type ArgumentosParaDefinirImagenLocal, ALGORITMO_IMPRESION_POR_DEFECTO } from '@/types/Tipos';
import { computed } from 'vue';
import CustomInput from '../CustomInput.vue';
import Range from '../Range.vue';
import SelectAlineacion from '../Selects/SelectAlineacion.vue';
import SelectAlgoritmoImagen from '../Selects/SelectAlgoritmoImagen.vue';

type Propiedades = {
	modelValue: ArgumentosParaDefinirImagenLocal;
};
const propiedades = withDefaults(defineProps<Propiedades>(), {
	modelValue: () => {
		return {
			ruta: "",
			algoritmoImagen: ALGORITMO_IMPRESION_POR_DEFECTO,
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
	<SelectAlgoritmoImagen v-model="propiedades.modelValue.algoritmoImagen"></SelectAlgoritmoImagen>
	<SelectAlineacion v-model="propiedades.modelValue.alineacion"></SelectAlineacion>
	<Range :label="$t('width')" min="8" max="648" v-model="propiedades.modelValue.maximoAncho"></Range>
	<CustomInput type="text" placeholder="/home/parzibyte/mj.png"
		:label="$t('operationComponents.ImagenLocal.absolutePath')" v-model="propiedades.modelValue.ruta"></CustomInput>
</template>