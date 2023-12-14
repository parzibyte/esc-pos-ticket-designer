<script lang="ts" setup>
import { type NivelDeRecuperacionConNombreYValor, RecuperacionQr } from '@/types/Tipos'
import { ref, computed } from "vue"
import Select from "@/components/Select.vue"
type Propiedades = {
	modelValue: NivelDeRecuperacionConNombreYValor,
};

const propiedades = withDefaults(defineProps<Propiedades>(), {
	modelValue: () => {
		return {
			nombre: "Normal",
			valor: RecuperacionQr.Medio,
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

const recuperaciones = ref([
	{
		nombre: "Bajo",
		valor: RecuperacionQr.Bajo,
	},
	{
		nombre: "Medio",
		valor: RecuperacionQr.Medio,
	},
	{
		nombre: "Alto",
		valor: RecuperacionQr.Alto,
	},
	{
		nombre: "El mejor",
		valor: RecuperacionQr.ElMasAlto,
	},
]);
</script>
<template>
	<Select :display-item-function="(nivel) => $t('qrErrorCorrection.' + nivel.nombre)" :items="recuperaciones"
		:label="$t('operationComponents.CodigoQr.errorCorrection')" v-model="valorSerializado">
		<template #item="{ item, index }">
			<h1 class="text-xl">{{ $t("qrErrorCorrection." + item.nombre) }}</h1>
		</template>
	</Select>
</template>