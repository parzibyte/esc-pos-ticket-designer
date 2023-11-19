<script setup lang="ts">
import JavascriptCliente from "./Javascript.vue";
import CSharp from "./CSharp.vue";
import CurlWindows from "./CurlWindows.vue";
import Java from "./Java.vue";
import Python from "./Python.vue";
import C from "./C.vue";
import { ref } from "vue"
type Propiedades = {
	json: string,
	diseño: object,
};
const propiedades = withDefaults(defineProps<Propiedades>(), {
	json: "",
	diseño: () => {
		return {};
	},
})

const indiceLenguajeSeleccionado = ref(0);
const lenguajes = [
	{
		nombre: "JavaScript (Cliente y servidor)",
		componente: JavascriptCliente,
	},
	{
		nombre: "C#",
		componente: CSharp,
	},
	{
		nombre: "CURL Windows",
		componente: CurlWindows,
	},
	{
		nombre: "Java",
		componente: Java,
	},
	{
		nombre: "Python",
		componente: Python,
	},
	{
		nombre: "PHP",
		componente: Python,
	},
	{
		nombre: "Laravel",
		componente: Python,
	},
	{
		nombre: "Dart",
		componente: Python,
	},
	{
		nombre: "React",
		componente: Python,
	},
	{
		nombre: "Angular",
		componente: Python,
	},
	{
		nombre: "Golang",
		componente: "Go",
	},
{
		nombre: "C",
		componente: C,
	},
];
const clase = (indice: number) => {
	if (indice === indiceLenguajeSeleccionado.value) {
		return "border-b-2 border-b-green-500 text-green-500";
	}
	return "";
}

const payloadEscapado = () => {
	const codificado = JSON.stringify(propiedades.json);
	return codificado
		.replace(/\\/g, '\\\\')
		.replace(/"/g, '\\"');
}
</script>
<template>
	<div class="flex flex-row overflow-x-auto">
		<div @click="indiceLenguajeSeleccionado = indice" v-for="(lenguaje, indice) in lenguajes" :class="clase(indice)"
			class="cursor-pointer pt-1 pb-2 px-2  w-fit min-w-fit">{{ lenguaje.nombre }}</div>
	</div>
	<component :payloadEscapado="payloadEscapado()" :diseño="diseño" :json="propiedades.json"
		:is="lenguajes[indiceLenguajeSeleccionado].componente"></component>
</template>