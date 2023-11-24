<script lang="ts" setup>
import { computed } from 'vue';
import BloqueDeCodigo from './BloqueDeCodigo.vue';
import type { DiseñoRecuperadoDeBaseDeDatos, Payload } from '@/types/Tipos';

type Propiedades = {
	json: Payload,
	diseño: DiseñoRecuperadoDeBaseDeDatos,
	payloadEscapado: string,
};
const propiedades = withDefaults(defineProps<Propiedades>(), {
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
		"principal": `<?php
$url = "${propiedades.diseño.ruta_api}/imprimir";
$opciones = array(
    "http" => array(
        "header" => "Content-type: application/json\\r\\n",
        "method" => "POST",
        "content" => "${propiedades.payloadEscapado}",
    ),
);
$contexto = stream_context_create($opciones);
$resultado = file_get_contents($url, false, $contexto);
if ($resultado === false) {
    echo "Error haciendo petición. Verifica que el plugin se está ejecutando";
    exit;
}
$respuesta = json_decode($resultado);
if ($respuesta === true){
	echo "Impreso correctamente";
} else {
	echo "Error imprimiendo: " . $respuesta;
}`,
	};
});

</script>
<template>
	<p>Este ejemplo supone que no usas tu aplicación de PHP desde un navegador web. Si tu web será abierta desde el
		navegador y vas a subirla a internet, mejor usa el código de JavaScript; este ejemplo supone que PHP se ejecuta en
		el mismo lugar que el plugin</p>
	<BloqueDeCodigo :codigo="bloques.principal"></BloqueDeCodigo>
</template>