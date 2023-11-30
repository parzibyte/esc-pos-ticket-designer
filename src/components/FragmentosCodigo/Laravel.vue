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
		"imports": `use Illuminate\\Support\\Facades\\Http;`,
		"principal": `$response = Http::withBody("${propiedades.payloadEscapado}","application/json")->post("${propiedades.diseño.ruta_api}/imprimir");
if ($response->ok()) {
	$respuestaPlugin = $response->json();
	if ($respuestaPlugin === true) {
		// Impreso correctamente
	} else {
		// Error. El mensaje de error está en $respuestaPlugin
	}
} else {
	// Error haciendo petición. Tal vez el plugin no se está ejecutando
}`,
		"vista": `Route::get('/', function () {
    $response = Http::withBody("${propiedades.payloadEscapado}", "application/json")->post("${propiedades.diseño.ruta_api}/imprimir");
    if ($response->ok()) {
        $respuestaPlugin = $response->json();
        if ($respuestaPlugin === true) {
            return response()->json(true);
        } else {
            return response()->json("Error. El mensaje es: " . $respuestaPlugin);
        }
    } else {
        return response()->json("Error haciendo petición. Verifique que el plugin se está ejecutando");
    }
});`,
	}
});

</script>
<template>
	<p>Puedes usar el enfoque que aparece a continuación o revisar el ejemplo con PHP nativo. Con Laravel aplica lo mismo
		que con PHP: si vas a subir la app a internet, entonces mejor usa JavaScript del lado del cliente</p>
	<p>En caso de que necesites hacerlo con Laravel, entonces "importa" Http:</p>
	<BloqueDeCodigo :codigo="bloques.imports"></BloqueDeCodigo>
	<p>Y haz la petición. Revisa <code>$respuestaPlugin</code>, si es <code>true</code> entonces la impresión fue correcta,
		en caso contrario el error estará en esa misma variable</p>
	<BloqueDeCodigo :codigo="bloques.principal"></BloqueDeCodigo>
	<p>Puedes usar el código en cualquier lugar de Laravel. Por ejemplo, en las rutas, devolviendo un JSON:</p>
	<BloqueDeCodigo :codigo="bloques.vista"></BloqueDeCodigo>
</template>