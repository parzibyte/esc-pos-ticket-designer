<script lang="ts" setup>
import { computed } from 'vue';
import BloqueDeCodigo from './BloqueDeCodigo.vue';

type Propiedades = {
	json: string,
	diseño: object,
	payloadEscapado: string,
};
const propiedades = withDefaults(defineProps<Propiedades>(), {
	json: "",
	diseño: () => {
		return {};
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