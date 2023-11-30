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
		"instalacionDart": `dart pub add http`,
		"instalacionFlutter": `flutter pub add http`,
		"import": `import 'package:http/http.dart' as http;`,
		"principal": `void main() async {
var url = Uri.parse("${propiedades.diseño.ruta_api}/imprimir");
try {
var response = await http.post(url,
	headers: {
		"Content-Type": "application/json",
	},
	body:
		"${propiedades.payloadEscapado}");
var respuestaComoCadena = response.body;
if (respuestaComoCadena == "true\\n") {
	print("Impresión correcta");
} else {
	print("Error imprimiendo: $respuestaComoCadena");
}
} catch (e) {
print(
	"Excepción haciendo petición. Verifique que el plugin se está ejecutando. Error: " +
		e.toString());
}
}

`,
	}
});

</script>
<template>
	<p>Vas a necesitar el paquete <code>http</code>. Si usas dart:</p>
	<BloqueDeCodigo :codigo="bloques.instalacionDart"></BloqueDeCodigo>
	<p>En caso de usar Flutter:</p>
	<BloqueDeCodigo :codigo="bloques.instalacionFlutter"></BloqueDeCodigo>
	<p>Luego, impórtalo:</p>
	<BloqueDeCodigo :codigo="bloques.import"></BloqueDeCodigo>
	<p>Finalmente haz la petición HTTP. Recuerda que debes estar dentro de una función asíncrona (en este caso se ejecuta en
		el <code>main</code> el cual fue marcado con <code>async</code>):</p>
	<BloqueDeCodigo :codigo="bloques.principal"></BloqueDeCodigo>
</template>