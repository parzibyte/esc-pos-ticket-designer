<script lang="ts" setup>
import { computed, ref } from 'vue';
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
	<p>Funciona el navegador web. Recuerda que debes estar en localhost o en un sitio con https, de otro
		modo no funcionará.
	</p>
	<BloqueDeCodigo :codigo="bloques.principal"></BloqueDeCodigo>
</template>