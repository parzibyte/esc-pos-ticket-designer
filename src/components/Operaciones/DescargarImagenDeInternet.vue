<script setup lang="ts">
import type { ArgumentosParaDefinirImagenDeInternet } from '@/types/Tipos';
import { Alineacion, ALGORITMO_IMPRESION_POR_DEFECTO, } from '@/types/Tipos';
import { computed, } from 'vue';
import CustomInput from '../CustomInput.vue';
import SelectAlineacion from '../Selects/SelectAlineacion.vue';
import Range from '../Range.vue';
import AlertaAnchoImagen from '../Alertas/AlertaAnchoImagen.vue';
import SelectAlgoritmoImagen from '../Selects/SelectAlgoritmoImagen.vue';

type Propiedades = {
	modelValue: ArgumentosParaDefinirImagenDeInternet;
};
const propiedades = withDefaults(defineProps<Propiedades>(), {
	modelValue: () => {
		return {
			url: "",
			alineacion: {
				nombre: "Centro",
				valor: Alineacion.Centro,
			},
			algoritmoImagen: ALGORITMO_IMPRESION_POR_DEFECTO,
			maximoAncho: 8,
		};
	}
})
const emit = defineEmits(["update:modelValue"]);
const valorSerializado = computed<ArgumentosParaDefinirImagenDeInternet>({
	set(value) {
		emit("update:modelValue", value);
	},
	get() {
		return propiedades.modelValue;
	},
});
</script>
<template>
	<div class="flex flex-col md:flex-row">
		<CustomInput :label="$t('operationComponents.DescargarImagenDeInternet.absoluteUrl')" type="text"
			:placeholder="$t('operationComponents.DescargarImagenDeInternet.absoluteUrlPlaceholder')"
			v-model="valorSerializado.url">
		</CustomInput>
		<SelectAlineacion v-model="valorSerializado.alineacion"></SelectAlineacion>
		<SelectAlgoritmoImagen v-model="valorSerializado.algoritmoImagen"></SelectAlgoritmoImagen>
		<Range :label="$t('width')" v-model="valorSerializado.maximoAncho" max="648" min="1"></Range>
	</div>
	<AlertaAnchoImagen :ancho="valorSerializado.maximoAncho"></AlertaAnchoImagen>
</template>