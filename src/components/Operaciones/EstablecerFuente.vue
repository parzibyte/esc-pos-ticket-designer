<script setup lang="ts">
import { Fuente, type ArgumentosParaDefinirFuente } from '@/types/Tipos';
import { computed, ref, } from 'vue';
import Select from '../Select.vue';

type Propiedades = {
	modelValue: ArgumentosParaDefinirFuente,
};
const propiedades = withDefaults(defineProps<Propiedades>(), {
	modelValue: () => {
		return {
			fuente: {
				nombre: "Fuente A (24x12)",
				valor: Fuente.A,
			}
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
const fuentes = ref([
	{
		nombre: "Fuente A (24x12)",
		valor: Fuente.A,
	},
	{
		nombre: "Fuente B (9x17)",
		valor: Fuente.B,
	},
]);
</script>
<template>
	<Select :display-item-function="(fuente) => fuente.nombre" :items="fuentes" label="Fuente:"
		v-model="propiedades.modelValue.fuente">
		<template #item="{ item, index }">
			<h1 class="text-xl">{{ item.nombre }}</h1>
		</template>
	</Select>
</template>