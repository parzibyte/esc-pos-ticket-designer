<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useDatabaseStore } from "@/stores/db"
import Select from "@/components/Select.vue";
import CheckBold from "vue-material-design-icons/CheckBold.vue";
import FormatListText from "vue-material-design-icons/FormatListText.vue";
import router from "@/router";
import { PlataformasService } from "@/services/PlataformasService"
import CustomInput from "@/components/CustomInput.vue";
import type { Plataforma } from "@/types/Tipos";
const store = useDatabaseStore();
const plataformas = ref([]);
const impresoras = ref([]);
const nombre = ref("");
const plataformaSeleccionada = ref({});
const impresoraSeleccionada = ref("");
const plataformasService = new PlataformasService(store);

const funcionDeFiltroParaPlataformas = (criteria: string, items: any[]) => {
	const expresion = new RegExp(`${criteria}.*`, "i");
	return items.filter((plataforma) => {
		return expresion.test(plataforma.nombre) || expresion.test(plataforma.descripcion);
	});
}
const funcionDeFiltroParaImpresoras = (criteria: string, items: any[]) => {
	const expresion = new RegExp(`${criteria}.*`, "i");
	return items.filter((impresora) => {
		return expresion.test(impresora);
	});
};;

const guardarDiseño = async () => {
	const argumentos = [plataformaSeleccionada.value.id, nombre.value, "", "", impresoraSeleccionada.value];
	await store.exec("INSERT INTO diseños(id_plataforma, nombre, fecha_creacion, fecha_modificacion, impresora) VALUES (?, ?, ?, ?, ?)", argumentos);
	router.push({
		name: "Designs",
	});
}

const navegarADiseños = () => {
	router.push({
		name: "Designs",
	});
}

const onPlataformaCambiada = async (plataforma: any) => {
	const rutaApi = plataforma.ruta_api;
	const response = await fetch(`${rutaApi}/impresoras`);
	impresoras.value = await response.json();
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
	<div class="p-1">
		<CustomInput label="Dale un nombre a tu diseño" type="text" placeholder="Por ejemplo, ticket de venta"
			v-model="nombre"></CustomInput>
		<Select @change="onPlataformaCambiada" v-model="plataformaSeleccionada" label="¿Para cuál plataforma?"
			:items="plataformas" :filter-function="funcionDeFiltroParaPlataformas"
			:display-item-function="displayItemFunction">
			<template #item="{ item, index }">
				<h1 class="text-xl">{{ item.nombre }}</h1>
				<p>{{ item.descripcion }}</p>
			</template>
		</Select>
		<Select v-model="impresoraSeleccionada" label="¿En dónde se va a imprimir?" :items="impresoras"
			:filter-function="funcionDeFiltroParaImpresoras" :display-item-function="(impresora) => impresora">
			<template #item="{ item, index }">
				<h1 class="text-xl">{{ item }}</h1>
			</template>
		</Select>
		<button @click="guardarDiseño"
			class="rounded-md px-3 py-2 mt-2 bg-green-500 text-white hover:bg-green-400 font-bold inline-flex items-center">
			<CheckBold></CheckBold>
			Guardar
		</button>
		<button @click="navegarADiseños"
			class="rounded-md px-3 py-2 mt-2 ml-2 bg-blue-500 text-white hover:bg-blue-400 font-bold inline-flex items-center">
			<FormatListText></FormatListText>
			Ir a diseños
		</button>
	</div>
</template>