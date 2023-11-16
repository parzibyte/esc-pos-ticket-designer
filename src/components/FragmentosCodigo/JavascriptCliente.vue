<script lang="ts" setup>
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
</script>
<template>
	<p>Funciona el navegador web. Recuerda que debes estar en localhost o en un sitio con https, de otro
		modo no funcionará.
	</p>
	<pre class="bg-gray-200 overflow-x-auto p-4 break-all whitespace-pre-wrap rounded-md">const payload = `{{ propiedades.payloadEscapado }}`;
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