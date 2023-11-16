<script setup lang="ts">
import JavascriptCliente from "./JavascriptCliente.vue";
import CSharp from "./CSharp.vue";
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
		nombre: "JavaScript (Cliente)",
		componente: JavascriptCliente,
	},
	{
		nombre: "C#",
		componente: CSharp,
	},
	{
		nombre: "Golang",
		componente: "Go",
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