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
		"imports": `import java.net.http.HttpRequest;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpResponse;`,
		"principal": `String postEndpoint = "${propiedades.diseño.ruta_api}/imprimir";
String inputJson = "${propiedades.payloadEscapado}";
var request = HttpRequest.newBuilder().uri(URI.create(postEndpoint)).header("Content-Type", "application/json")
		.POST(HttpRequest.BodyPublishers.ofString(inputJson)).build();
var client = HttpClient.newHttpClient();
try {

	var response = client.send(request, HttpResponse.BodyHandlers.ofString());
	if (response.statusCode() != 200) {
		System.out.println("código de respuesta distinto a 200. Verifique que el plugin se está ejecutando");
	} else {
		String respuesta = response.body();
		if (respuesta.equals("true\\n")) {
			System.out.println("Impreso correctamente");
		} else {
			System.out.println("Petición ok pero error en el plugin: " + respuesta);
		}
	}
} catch (IOException | InterruptedException e) {
	System.out.println("Error haciendo petición: " + e.getMessage());
}`,
	}
});

</script>
<template>
	<p>Importa los paquetes necesarios:</p>
	<BloqueDeCodigo :codigo="bloques.imports"></BloqueDeCodigo>
	<p>Después, haz la petición HTTP:</p>
	<BloqueDeCodigo :codigo="bloques.principal"></BloqueDeCodigo>
</template>