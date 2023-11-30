<script lang="ts" setup>
import { computed } from 'vue';
import BloqueDeCodigo from './BloqueDeCodigo.vue';
import type { PropiedadesParaFragmentoDeCodigo } from '@/types/Tipos';


const propiedades = withDefaults(defineProps<PropiedadesParaFragmentoDeCodigo>(), {
	json: () => {
		return {
			nombreImpresora: "",
			serial: "",
			operaciones: [],
		};
	},
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
const bloques = computed(() => {
	return {
		"principal": `curl -X POST -H "Content-Type: application/json" -d "${propiedades.payloadEscapado}" ${propiedades.diseño.ruta_api}/imprimir`
	}
});

</script>
<template>
	<BloqueDeCodigo :codigo="bloques.principal"></BloqueDeCodigo>
</template>