<script setup lang="ts">
type Propiedades = {
	json: string,
	diseño: object,
};
const propiedades = withDefaults(defineProps<Propiedades>(), {
	json: "",
	diseño: () => {
		return {};
	},
})

const payloadEscapado = () => {
	const codificado = JSON.stringify(propiedades.json);
	return codificado
		.replace(/\\/g, '\\\\')
		.replace(/"/g, '\\"');
}
</script>
<template>
	<pre class="bg-gray-200 overflow-x-auto p-4 break-all whitespace-pre-wrap rounded-md">const payload = `{{ payloadEscapado() }}`;
fetch("{{ diseño.ruta_api }}/imprimir",{
	method: "POST",
	body: payload
})
.then(respuesta => respuesta.json())
.then(respuesta =>{
	if(respuesta===true){
		// Éxito
		alert("Impreso correctamente");
	}else{
		// Error (el mensaje de error está en "respuesta")
		alert("Error: " + respuesta);
	}
});</pre>
</template>