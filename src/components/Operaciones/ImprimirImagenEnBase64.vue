<script setup lang="ts">
import { Alineacion, type ArgumentosParaDefinirImagenEnBase64, ALGORITMO_IMPRESION_POR_DEFECTO } from '@/types/Tipos';
import { computed, } from 'vue';
import CustomTextarea from '../CustomTextarea.vue';
import SelectAlineacion from '../Selects/SelectAlineacion.vue';
import Range from '../Range.vue';
import AlertaAnchoImagen from '../Alertas/AlertaAnchoImagen.vue';
import SelectAlgoritmoImagen from '../Selects/SelectAlgoritmoImagen.vue';

type Propiedades = {
	modelValue: ArgumentosParaDefinirImagenEnBase64;
};
const propiedades = withDefaults(defineProps<Propiedades>(), {
	modelValue: () => {
		return {
			maximoAncho: 8,
			alineacion: {
				nombre: "Centro",
				valor: Alineacion.Centro,
			},
			algoritmoImagen: ALGORITMO_IMPRESION_POR_DEFECTO,
			contenidoEnBase64: "",
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
	<div class="flex flex-col">
		<CustomTextarea v-model="propiedades.modelValue.contenidoEnBase64"
			:label="$t('operationComponents.ImprimirImagenEnBase64.label')"
			:placeholder="$t('operationComponents.ImprimirImagenEnBase64.label')"> </CustomTextarea>
	</div>
	<div class="flex flex-col md:flex-row">
		<SelectAlineacion v-model="propiedades.modelValue.alineacion"></SelectAlineacion>
		<SelectAlgoritmoImagen v-model="propiedades.modelValue.algoritmoImagen"></SelectAlgoritmoImagen>
		<Range v-model="propiedades.modelValue.maximoAncho" min="1" :max="648" :label="$t('width')"></Range>
	</div>
	<AlertaAnchoImagen :ancho="propiedades.modelValue.maximoAncho"></AlertaAnchoImagen>
</template>