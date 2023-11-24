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
		"instalacion": `pacman -Syuu
pacman -S mingw-w64-x86_64-curl `,
		"principal": `#include <stdio.h>
#include <curl/curl.h>

struct RespuestaHttp
{
	char *datos;
	size_t size;
};

size_t write_callback(void *contents, size_t size, size_t nmemb, void *userp)
{
	// Esta función puede ser invocada varias veces por CURL. https://curl.se/libcurl/c/CURLOPT_WRITEFUNCTION.html
	size_t realsize = size * nmemb;
	struct RespuestaHttp *mem = (struct RespuestaHttp *)userp;
	mem->datos = malloc(realsize + 1);
	if (mem->datos == NULL)
	{
		printf("No se pudo asignar memoria\\n");
		return CURL_WRITEFUNC_ERROR;
	}
	memcpy(mem->datos, contents, realsize);
	mem->size = realsize;
	mem->datos[realsize] = 0;
	return realsize;
}

int main(void)
{
	CURL *curl;
	CURLcode res;
	curl_global_init(CURL_GLOBAL_DEFAULT);

	curl = curl_easy_init();
	if (!curl)
	{
		printf("No se pudo inicializar CURL\\n");
		return 0;
	}
	struct RespuestaHttp respuesta;
	respuesta.datos = NULL;
	respuesta.size = 0;
	curl_easy_setopt(curl, CURLOPT_URL, "${propiedades.diseño.ruta_api}/imprimir");
	curl_easy_setopt(curl, CURLOPT_POST, 1L);
	curl_easy_setopt(curl, CURLOPT_POSTFIELDS, "${propiedades.payloadEscapado}");
	curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_callback);
	curl_easy_setopt(curl, CURLOPT_WRITEDATA, (void *)&respuesta);
	res = curl_easy_perform(curl);
	if (res == CURLE_OK)
	{
		if (strcmp(respuesta.datos, "true\\n") == 0)
		{
			printf("Impreso correctamente");
		}
		else
		{
			printf("Error con el plugin: %s", respuesta.datos);
		}
	}
	else
	{
		fprintf(stderr, "Error en la petición: %s\\n", curl_easy_strerror(res));
	}
	free(respuesta.datos);
	curl_easy_cleanup(curl);
	curl_global_cleanup();
	return 0;
}`,
		"compilacion": `gcc imprimir.c -o imprimir.exe -Wall -lcurl`,
		"ejecucion": `imprimir.exe`,
	}
});

</script>
<template>
	<p>Vas a necesitar libcurl. Si usas MSYS2 con pacman ejecuta lo siguiente. La instalación varía dependiendo de tu
		plataforma</p>
	<BloqueDeCodigo :codigo="bloques.instalacion"></BloqueDeCodigo>
	<p>Luego ya puedes ejecutar el código. En este caso he colocado todo dentro del <code>main</code></p>
	<BloqueDeCodigo :codigo="bloques.principal"></BloqueDeCodigo>
	<p>Compila así (suponiendo que tu archivo se llama <code>imprimir.c</code>):</p>
	<BloqueDeCodigo :codigo="bloques.compilacion"></BloqueDeCodigo>
	<p>Finalmente, ejecuta:</p>
	<BloqueDeCodigo :codigo="bloques.ejecucion"></BloqueDeCodigo>
</template>