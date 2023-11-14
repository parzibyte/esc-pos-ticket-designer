<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Select from '../Select.vue';
import type { Plataforma } from '@/types/Tipos';
import { useDatabaseStore } from "@/stores/db"
import { PlataformasService } from "@/services/PlataformasService"
const store = useDatabaseStore();
const plataformas = ref([]);
const plataformasService = new PlataformasService(store);


type Propiedades = {
	modelValue: Plataforma,
};

const propiedades = withDefaults(defineProps<Propiedades>(), {
	modelValue: () => {
		return {

		};
	}
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
const onPlataformaCambiada = async (plataforma: any) => {
	emit("change", plataforma);
}
const funcionDeFiltroParaPlataformas = (criteria: string, items: any[]) => {
	const expresion = new RegExp(`${criteria}.*`, "i");
	return items.filter((plataforma) => {
		return expresion.test(plataforma.nombre) || expresion.test(plataforma.descripcion);
	});
}
const displayItemFunction = (plataforma: Plataforma): string => {
	if (plataforma.nombre) {
		return plataforma.nombre.toString();
	}
	return "";
}
onMounted(async () => {
	plataformas.value = await plataformasService.obtenerPlataformas();
});


</script>
<template>
	<Select @change="onPlataformaCambiada" v-model="valorSerializado" label="¿Para cuál plataforma?" :items="plataformas"
		:filter-function="funcionDeFiltroParaPlataformas" :display-item-function="displayItemFunction">
		<template #item="{ item, index }">
			<h1 class="text-xl">{{ item.nombre }}</h1>
			<p>{{ item.descripcion }}</p>
		</template>
	</Select>
</template>