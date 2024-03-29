<script setup lang="ts">
import JavascriptCliente from "./JS.vue";
import CodigoJson from "./JSON.vue";
import CSharp from "./CSharp.vue";
import CurlWindows from "./CurlWindows.vue";
import Java from "./Java.vue";
import Python from "./Python.vue";
import C from "./C.vue";
import PHP from "./PHP.vue";
import Laravel from "./Laravel.vue";
import Dart from "./Dart.vue";
import React from "./React.vue";
import Angular from "./Angular.vue";
import Vue from "./Vue.vue";
import Golang from "./Golang.vue";
import { ref } from "vue"
import { useSettingsStore } from "@/stores/settings";
import type { DiseñoRecuperadoDeBaseDeDatos, Payload, PayloadAndroid } from "@/types/Tipos";
const settingsStore = useSettingsStore();
type Propiedades = {
	json: Payload | PayloadAndroid,
	diseño: DiseñoRecuperadoDeBaseDeDatos,
};
const propiedades = withDefaults(defineProps<Propiedades>(), {
	json: () => ({
		nombreImpresora: "",
		serial: "",
		operaciones: [],
	}),
	diseño: () => {
		return {
			ruta_api: "",
			id: 0,
			licencia: "",
			plataforma: "",
			impresora: "",
			id_plataforma: 0,
			nombre: "",
			fecha_modificacion: 0,
		};
	},
})

const indiceLenguajeSeleccionado = ref(0);
const lenguajes = [
	{
		nombre: "Angular",
		componente: Angular,
	},
	{
		nombre: "C#",
		componente: CSharp,
	},
	{
		nombre: "cURL",
		componente: CurlWindows,
	},
	{
		nombre: "C y C++",
		componente: C,
	},
	{
		nombre: "Dart y Flutter",
		componente: Dart,
	},
	{
		nombre: "Golang",
		componente: Golang,
	},
	{
		nombre: "Java",
		componente: Java,
	},
	{
		nombre: "JavaScript (Cliente y servidor)",
		componente: JavascriptCliente,
	},
	{
		nombre: "JSON",
		componente: CodigoJson,
	},
	{
		nombre: "Laravel",
		componente: Laravel,
	},
	{
		nombre: "PHP",
		componente: PHP,
	},
	{
		nombre: "Python",
		componente: Python,
	},
	{
		nombre: "React",
		componente: React,
	},
	{
		nombre: "Vue 3",
		componente: Vue,
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

const onIndiceCambiado = async (nuevoIndice: number) => {
	indiceLenguajeSeleccionado.value = nuevoIndice;
	await settingsStore.guardarAjustesDeDiseño(propiedades.diseño.id, nuevoIndice);
}

const refrescarIndice = async () => {
	indiceLenguajeSeleccionado.value = (await settingsStore.obtenerAjustesDeDiseño(propiedades.diseño.id)).indice_lenguaje_programacion;
}

defineExpose({ refrescarIndice });

</script>
<template>
	<div class="flex flex-row overflow-x-auto">
		<div @click="onIndiceCambiado(indice)" v-for="(lenguaje, indice) in lenguajes" :class="clase(indice)"
			class="cursor-pointer pt-1 pb-2 px-2  w-fit min-w-fit">{{ lenguaje.nombre }}</div>
	</div>
	<component :payloadEscapado="payloadEscapado()" :diseño="diseño" :json="propiedades.json"
		:is="lenguajes[indiceLenguajeSeleccionado].componente"></component>
</template>