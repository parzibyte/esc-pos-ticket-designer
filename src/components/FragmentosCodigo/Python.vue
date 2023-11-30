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
		"instalacion": `pip install requests`,
		"principal": `import requests
payload = "${propiedades.payloadEscapado}"
try:
	respuestaCodificada = requests.post("${propiedades.diseño.ruta_api}/imprimir", data=payload)
	respuesta = respuestaCodificada.json()
	if respuesta == True:
		print("Impreso correctamente")
	else:
		print("Petición OK, pero error con el plugin: " + respuesta)
except Exception as exception:
	print(f"Error haciendo petición. ¿Tal vez el plugin no está en ejecución? El error dice: {exception}")
	`}
});

</script>
<template>
	<p>Vas a necesitar el paquete <strong>requests</strong>. Dependiendo de tu entorno, la instalación puede cambiar. Si
		usas pip, ejecuta:</p>
	<BloqueDeCodigo :codigo="bloques.instalacion"></BloqueDeCodigo>
	<p>Después, importa el paquete en tu archivo de Python y haz la petición HTTP:</p>
	<BloqueDeCodigo :codigo="bloques.principal"></BloqueDeCodigo>
</template>