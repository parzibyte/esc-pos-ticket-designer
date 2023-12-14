<script lang="ts" setup>
import { TipoDeCodigoDeBarras, type TipoDeCodigoDeBarrasConNombreYValor } from '@/types/Tipos'
import { ref, computed } from "vue"
import Select from "@/components/Select.vue"
type Propiedades = {
	modelValue: TipoDeCodigoDeBarrasConNombreYValor,
};

const propiedades = withDefaults(defineProps<Propiedades>(), {
	modelValue: () => {
		return {
			nombre: "Ean",
			valor: TipoDeCodigoDeBarras.Ean,
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

const tipos = ref([
	{
		nombre: "Codabar",
		valor: TipoDeCodigoDeBarras.Codabar,
	},
	{
		nombre: "Code 128",
		valor: TipoDeCodigoDeBarras.Code128,
	},
	{
		nombre: "Code 39",
		valor: TipoDeCodigoDeBarras.Code39,
	},
	{
		nombre: "Code93",
		valor: TipoDeCodigoDeBarras.Code93,
	},
	{
		nombre: "Ean",
		valor: TipoDeCodigoDeBarras.Ean,
	},
	{
		nombre: "Ean 8",
		valor: TipoDeCodigoDeBarras.Ean8,
	},
	{
		nombre: "PDF 417",
		valor: TipoDeCodigoDeBarras.Pdf417,
	},
	{
		nombre: "Two off five ITF",
		valor: TipoDeCodigoDeBarras.TwoOffFiveITF,
	},
	{
		nombre: "UPC A",
		valor: TipoDeCodigoDeBarras.UpcA,
	},
	{
		nombre: "UPC E",
		valor: TipoDeCodigoDeBarras.UpcE,
	},

]);
</script>
<template>
	<Select :items="tipos" :display-item-function="(tipo) => tipo.nombre" :label="$t('operationComponents.CodigoDeBarras.barcodeType')" v-model="valorSerializado">
		<template #item="{ item, index }">
			<h1 class="text-xl">{{ item.nombre }}</h1>
		</template>
	</Select>
</template>