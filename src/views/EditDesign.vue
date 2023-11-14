<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useDesignsStore } from "@/stores/designsStore"
import CheckBold from "vue-material-design-icons/CheckBold.vue";
import FormatListText from "vue-material-design-icons/FormatListText.vue";
import router from "@/router";
import CustomInput from "@/components/CustomInput.vue";
import SelectPlataformas from "@/components/Selects/SelectPlataformas.vue";
import SelectImpresoras from "@/components/Selects/SelectImpresoras.vue";
import { usePlatformStore } from "@/stores/platform";
const designsStore = useDesignsStore();
const platformStore = usePlatformStore();
const impresoras = ref([]);
const nombre = ref("");
const plataformaSeleccionada = ref({});
const impresoraSeleccionada = ref("");
const props = defineProps<{
	id: number,
}>();
const guardarDiseño = async () => {
	await designsStore.actualizarDiseño(plataformaSeleccionada.value.id, nombre.value, impresoraSeleccionada.value, props.id);
	navegarADiseños();
}

const navegarADiseños = () => {
	router.push({
		name: "Designs",
	});
}

const onPlataformaCambiada = async (plataforma: any) => {
	const rutaApi = plataforma.ruta_api;
	const response = await fetch(`${rutaApi}/impresoras`);
	impresoras.value = await response.json();
}
onMounted(async () => {
	const diseñoActualmenteEditado = await designsStore.obtenerDiseñoPorId(props.id);
	nombre.value = diseñoActualmenteEditado.nombre;
	impresoraSeleccionada.value = diseñoActualmenteEditado.impresora;
	plataformaSeleccionada.value = await platformStore.obtenerPlataformaPorId(diseñoActualmenteEditado.id_plataforma);
	await onPlataformaCambiada(plataformaSeleccionada.value);
});
</script>
<template>
	<div class="p-1">
		<CustomInput label="Dale un nombre a tu diseño" type="text" placeholder="Por ejemplo, ticket de venta"
			v-model="nombre"></CustomInput>
		<SelectPlataformas @change="onPlataformaCambiada" v-model="plataformaSeleccionada"></SelectPlataformas>
		<SelectImpresoras v-model="impresoraSeleccionada" :impresoras="impresoras"></SelectImpresoras>
		<button @click="guardarDiseño"
			class="rounded-md px-3 py-2 mt-2 bg-green-500 text-white hover:bg-green-400 font-bold inline-flex items-center">
			<CheckBold></CheckBold>
			Guardar
		</button>
		<button @click="navegarADiseños"
			class="rounded-md px-3 py-2 mt-2 ml-2 bg-blue-500 text-white hover:bg-blue-400 font-bold inline-flex items-center">
			<FormatListText></FormatListText>
			Ir a diseños
		</button>
	</div>
</template>