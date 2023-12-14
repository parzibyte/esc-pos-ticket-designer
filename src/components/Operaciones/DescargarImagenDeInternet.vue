<script setup lang="ts">
import type { ArgumentosParaDefinirImagenDeInternet } from '@/types/Tipos';
import { Alineacion, TamañoImagen } from '@/types/Tipos';
import { computed, } from 'vue';
import CustomInput from '../CustomInput.vue';
import SelectAlineacion from '../Selects/SelectAlineacion.vue';
import SelectTamanioImagen from '../Selects/SelectTamanioImagen.vue';
import Range from '../Range.vue';
import AlertaAnchoImagen from '../Alertas/AlertaAnchoImagen.vue';

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
			tamaño: {
				nombre: "Normal",
				valor: TamañoImagen.Normal,
			},
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
		<SelectTamanioImagen v-model="valorSerializado.tamaño"></SelectTamanioImagen>
		<Range :label="$t('width')" v-model="valorSerializado.maximoAncho" max="648" min="8" step="8"></Range>
	</div>
	<AlertaAnchoImagen :ancho="valorSerializado.maximoAncho"></AlertaAnchoImagen>
</template>