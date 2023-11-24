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
		"modoCliente": `"use client";`,
		"boton": `export default function Home() {
  return (
    <button onClick={imprimir}>Imprimir</button>
  );
}`,
		"funcion": `const imprimir = () => {
  const payload = "${propiedades.payloadEscapado}";
  fetch("${propiedades.diseño.ruta_api}/imprimir", {
    method: "POST",
    body: payload
  })
    .then(respuesta => respuesta.json())
    .then(respuesta => {
      if (respuesta === true) {
        // Éxito
        console.log("Impreso correctamente");
      } else {
        // Error (el mensaje de error está en "respuesta")
        console.log("Error con el plugin: " + respuesta);
      }
    })
    .catch(e => {
      console.log("Error haciendo petición. Verifica que el plugin se está ejecutando. El error dice: " + e);
    });
}`,
	}
});

</script>
<template>
	<p>Recuerda que React usa JavaScript, así que puedes usar el código de JavaScript nativo. Aquí hay un ejemplo
		específico. Recuerda que
		si tu aplicación se ejecutará del lado del servidor, es obligatorio que uses JS del lado del cliente.
		<br>
		Primero, indica que el componente será ejecutado en el lado del cliente (necesario a partir de Next 13) en la parte
		superior de tu archivo:
	</p>
	<BloqueDeCodigo :codigo="bloques.modoCliente"></BloqueDeCodigo>
	<p>Ahora vamos a regresar solo un botón para todo nuestro componente. Ese botón va a invocar a <code>imprimir</code> en
		el <code>onClick</code>:</p>
	<BloqueDeCodigo :codigo="bloques.boton"></BloqueDeCodigo>
	<p>Finalmente veamos la definición de la función invocada:</p>
	<BloqueDeCodigo :codigo="bloques.funcion"></BloqueDeCodigo>
</template>