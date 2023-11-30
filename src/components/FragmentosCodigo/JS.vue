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
		"principal": `const payload = "${propiedades.payloadEscapado}";
fetch(\"${propiedades.diseño.ruta_api}/imprimir\",{
	method: \"POST\",
	body: payload
})
.then(respuesta => respuesta.json())
.then(respuesta => {
	if (respuesta === true) {
		// Éxito
		console.log(\"Impreso correctamente\");
	} else {
		// Error (el mensaje de error está en \"respuesta\")
		console.log(\"Error con el plugin: \" + respuesta);
	}
})
.catch(e => {
	console.log("Error haciendo petición. Verifica que el plugin se está ejecutando. El error dice: " + e);
});`}
});

</script>
<template>
	<p>El código funciona en el cliente y servidor. Si lo usas en el cliente, es
		<strong>
			obligatorio invocar al plugin desde un sitio con https
		</strong>
	</p>

	<BloqueDeCodigo :codigo="bloques.principal"></BloqueDeCodigo>
</template>