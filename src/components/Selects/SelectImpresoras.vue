<script setup lang="ts">
import { computed } from 'vue';
import Select from '../Select.vue';
type Propiedades = {
	modelValue: string,
	impresoras: string[],
};

const propiedades = withDefaults(defineProps<Propiedades>(), {
	modelValue: () => {
		return "";
	},
	impresoras: () => [],
})
const emit = defineEmits(["update:modelValue", "change"]);
const valorSerializado = computed({
	set(value) {
		emit("update:modelValue", value);
	},
	get() {
		return propiedades.modelValue;
	},
});
const onImpresoraCambiada = async (impresora: string) => {
	emit("change", impresora);
}
const funcionDeFiltroParaImpresoras = (criteria: string, items: any[]) => {
	const expresion = new RegExp(`${criteria}.*`, "i");
	return items.filter((impresora) => {
		return expresion.test(impresora);
	});
};
</script>
<template>
	<Select @change="onImpresoraCambiada" v-model="valorSerializado" label="¿En dónde se va a imprimir?"
		:items="propiedades.impresoras" :filter-function="funcionDeFiltroParaImpresoras"
		:display-item-function="(impresora) => impresora">
		<template #item="{ item, index }">
			<h1 class="text-xl">{{ item }}</h1>
		</template>
	</Select>
</template>