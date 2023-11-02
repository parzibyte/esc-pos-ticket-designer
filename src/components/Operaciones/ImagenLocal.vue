<script setup lang="ts">
import { Alineacion, TamañoImagen, type ArgumentosParaDefinirImagenLocal } from '@/types/Tipos';
import { computed, ref, } from 'vue';
import CustomInput from '../CustomInput.vue';
import Select from '../Select.vue';
import Range from '../Range.vue';

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

const alineaciones = ref([
	{
		nombre: "Izquierda",
		valor: Alineacion.Izquierda,
	},
	{
		nombre: "Centro",
		valor: Alineacion.Centro,
	},
	{
		nombre: "Derecha",
		valor: Alineacion.Derecha,
	},

]);


const tamaños = ref([
	{
		nombre: "Normal",
		valor: TamañoImagen.Normal,
	},
	{
		nombre: "Doble ancho",
		valor: TamañoImagen.DobleAncho,
	},
	{
		nombre: "Doble largo",
		valor: TamañoImagen.DobleLargo,
	},
	{
		nombre: "Doble ancho y largo",
		valor: TamañoImagen.DobleAnchoYLargo,
	},

]);
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
	<Select :display-item-function="(tamaño) => tamaño.nombre" :items="tamaños" label="Redimensionar al imprimir:"
		v-model="propiedades.modelValue.tamaño">
		<template #item="{ item, index }">
			<h1 class="text-xl">{{ item.nombre }}</h1>
		</template>
	</Select>
	<Select :display-item-function="(alineacion) => alineacion.nombre" :items="alineaciones" label="Alineación"
		v-model="propiedades.modelValue.alineacion">
		<template #item="{ item, index }">
			<h1 class="text-xl">{{ item.nombre }}</h1>
		</template>
	</Select>
	<Range label="Ancho" step="8" min="8" max="648" v-model="propiedades.modelValue.maximoAncho"></Range>
	<CustomInput type="text" placeholder="/home/parzibyte/mj.png" label="Ruta absoluta de la imagen"
		v-model="propiedades.modelValue.ruta"></CustomInput>
</template>