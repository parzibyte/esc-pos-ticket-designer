<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useDatabaseStore } from "@/stores/db"
import Select from "@/components/Select.vue";
import CheckBold from "vue-material-design-icons/CheckBold.vue";
import FormatListText from "vue-material-design-icons/FormatListText.vue";
import router from "@/router";
const store = useDatabaseStore();
const plataformas = ref([]);
const referenciaAlSelect = ref(null);
const nombre = ref("");
const plataformaSeleccionada = ref({});

const filterFunction = (criteria: string, items: any[]) => {
	const expresion = new RegExp(`${criteria}.*`, "i");
	return items.filter((plataforma) => {
		return expresion.test(plataforma.nombre) || expresion.test(plataforma.descripcion);
	});
};

const guardarDiseño = async () => {
	const argumentos = [plataformaSeleccionada.value.id, nombre.value, "", ""];
	console.log({ argumentos });
	await store.exec("INSERT INTO diseños(id_plataforma, nombre, fecha_creacion, fecha_modificacion) VALUES (?, ?, ?, ?)", argumentos);
}

const navegarADiseños = ()=>{
	router.push({
		name:"Designs",
	});
}

onMounted(async () => {
	plataformas.value = await store.exec("SELECT id, nombre, descripcion FROM plataformas");
});
</script>
<template>
	<div class="p-1">
		<label for="nombre" class="font-semibold text-xl">Dale un nombre a tu diseño</label>
		<input v-model="nombre" id="nombre" type="text" placeholder="Nombre"
			class="mt-2 border border-gray-500 rounded-md p-2 block text-xl w-full focus:border-2 focus:border-blue-500 outline-none">
		<Select v-model="plataformaSeleccionada" label="¿Para cuál plataforma?" ref="referenciaAlSelect"
			:items="plataformas" :filter-function="filterFunction"
			:display-item-function="(plataforma) => `${plataforma.nombre}`">
			<template #item="{ item, index }">
				<h1 class="text-xl">{{ item.nombre }}</h1>
				<p>{{ item.descripcion }}</p>
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