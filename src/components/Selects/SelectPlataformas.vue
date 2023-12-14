<script setup lang="ts">
import { computed, onMounted, ref, type Ref } from 'vue';
import Select from '../Select.vue';
import type { Plataforma, PlataformaRecuperadaDeBaseDeDatos } from '@/types/Tipos';
import { usePlatformStore } from '@/stores/platform';
const plataformas: Ref<PlataformaRecuperadaDeBaseDeDatos[]> = ref([]);
const platformStore = usePlatformStore();
type Propiedades = {
	modelValue: PlataformaRecuperadaDeBaseDeDatos,
};

const propiedades = withDefaults(defineProps<Propiedades>(), {
	modelValue: () => {
		return {
			id: 0,
			licencia: "",
			nombre: "",
			ruta_api: "",
			descripcion: "",
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
	plataformas.value = await platformStore.obtenerPlataformas();
});


</script>
<template>
	<Select @change="onPlataformaCambiada" v-model="valorSerializado" :label="$t('chooseAPlatform')" :items="plataformas"
		:filter-function="funcionDeFiltroParaPlataformas" :display-item-function="displayItemFunction">
		<template #item="{ item, index }">
			<h1 class="text-xl">{{ $t("platforms." + item.nombre + ".name") }}</h1>
			<p>{{ $t("platforms." + item.nombre + ".description") }}</p>
		</template>
	</Select>
</template>