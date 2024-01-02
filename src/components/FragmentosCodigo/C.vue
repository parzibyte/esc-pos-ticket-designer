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
		"instalacion": `pacman -Syuu
pacman -S mingw-w64-x86_64-curl `,
		"principal": `#include <stdio.h>
#include <string.h>
#include <curl/curl.h>

struct Cadena
{
    size_t longitud;
    char *datos;
};

void iniciarCadena(struct Cadena *cadena)
{
    cadena->longitud = 0;
    cadena->datos = malloc(1);
    cadena->datos[cadena->longitud] = '\\0';
}
void concatenar(struct Cadena *cadena, char *otraCadena)
{
    size_t longitudDeOtraCadena = strlen(otraCadena);
    size_t nuevaLongitud = cadena->longitud + longitudDeOtraCadena;
    size_t nuevaLongitudConByteNulo = nuevaLongitud + 1;
    size_t longitudDeOtraCadenaIncluyendoByteNulo = longitudDeOtraCadena + 1;
    char *cadenaConNuevaLongitud = realloc(cadena->datos, nuevaLongitudConByteNulo);
    if (cadenaConNuevaLongitud == NULL)
    {
        printf("Sin memoria suficiente para concatenar la nueva cadena");
        return;
    }
    cadena->datos = cadenaConNuevaLongitud;
    memcpy((char *)(cadena->datos + cadena->longitud), otraCadena, longitudDeOtraCadenaIncluyendoByteNulo);
    cadena->longitud = nuevaLongitud;
}

size_t write_callback(void *contents, size_t size, size_t nmemb, void *userp)
{
    // Esta función podría ser invocada varias veces por cURL. https://curl.se/libcurl/c/CURLOPT_WRITEFUNCTION.html
    size_t realsize = size * nmemb;
    concatenar((struct Cadena *)userp, (char *)contents);
    concatenar((struct Cadena *)userp, "");
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
    struct Cadena *miCadena = (struct Cadena *)malloc(sizeof(struct Cadena));
    if (miCadena == NULL)
    {
        printf("Sin memoria suficiente para alojar el struct de cadena");
        return EXIT_FAILURE;
    }
    iniciarCadena(miCadena);
    char *url = "${propiedades.diseño.ruta_api}/imprimir";
    char *cargaUtil = "${propiedades.payloadEscapado}";
    struct curl_slist *list = NULL;
    list = curl_slist_append(list, "Content-Type: application/json");
    curl_easy_setopt(curl, CURLOPT_HTTPHEADER, list);
    curl_easy_setopt(curl, CURLOPT_URL, url);
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_callback);
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, (void *)miCadena);
    curl_easy_setopt(curl, CURLOPT_POST, 1L);
    curl_easy_setopt(curl, CURLOPT_POSTFIELDS, cargaUtil);
    res = curl_easy_perform(curl);
    if (res == CURLE_OK)
    {
        if (strcmp(miCadena->datos, "true\\n") == 0)
        {
            printf("Impreso correctamente");
        }
        else
        {
            printf("Error imprimiendo: %s\\n", miCadena->datos);
        }
    }
    else
    {
        fprintf(stderr, "Error en la petición: %s", curl_easy_strerror(res));
    }
    free(miCadena->datos);
    free(miCadena);
    curl_easy_cleanup(curl);
    curl_slist_free_all(list);
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