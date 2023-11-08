<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
import { type Diseño } from "@/types/Tipos"
import Printer from "vue-material-design-icons/Printer.vue";
import Delete from "vue-material-design-icons/Delete.vue";
import Pencil from "vue-material-design-icons/Pencil.vue";
import router from '@/router';
const props = withDefaults(defineProps<{
	diseño: Diseño,
}>(), {
	diseño: () => {
		return {
			id: 0,
			nombre: "",
			fechaModificacion: "",
		};
	}
});
const emit = defineEmits(["eliminar"]);

const modificarDiseño = () => {
	router.push({
		name: "add-design",
		params: {
			id: props.diseño.id,
		}
	});
}

const eliminarDiseño = () => {
	emit("eliminar", props.diseño);
}
</script>
<template>
	<div class="bg-white p-2 mx-2 my-2 rounded-md">
		<h1 class="text-4xl mb-2 inline-block text-zinc-700 font-semibold">{{ props.diseño.nombre }}</h1>
		<div class="inline-block bg-blue-500 rounded-md text-white ml-2 p-1 text-sm">{{ props.diseño.plataforma }}</div>
		<br>
		<button
			class="rounded-md px-3 py-2 m-1 bg-sky-500 text-white hover:bg-sky-400 text-sm font-semibold inline-flex items-center">
			<Printer></Printer>
			Imprimir
		</button>
		<button @click="modificarDiseño"
			class="rounded-md px-3 py-2 m-1 bg-amber-500 text-white hover:bg-amber-400 text-sm font-semibold inline-flex items-center">
			<Pencil></Pencil>
			Modificar
		</button>
		<button @click="eliminarDiseño"
			class="rounded-md px-3 py-2 m-1 bg-red-500 text-white hover:bg-red-400 text-sm font-semibold inline-flex items-center">
			<Delete></Delete>
			Eliminar
		</button>
	</div>
</template>