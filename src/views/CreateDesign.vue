<script setup lang="ts">
import { ref, type Ref } from "vue"
import CheckBold from "vue-material-design-icons/CheckBold.vue";
import FormatListText from "vue-material-design-icons/FormatListText.vue";
import router from "@/router";
import CustomInput from "@/components/CustomInput.vue";
import SelectPlataformas from "@/components/Selects/SelectPlataformas.vue";
import SelectImpresoras from "@/components/Selects/SelectImpresoras.vue";
import { useDesignsStore } from "@/stores/designsStore";
import type { PlataformaRecuperadaDeBaseDeDatos } from "@/types/Tipos";
import { obtenerNombreDeImpresoraComoCadena } from "@/Helpers";
const impresoras: Ref<any> = ref([]);
const nombre = ref("");
const plataformaSeleccionada: Ref<PlataformaRecuperadaDeBaseDeDatos> = ref({
	nombre: "",
	licencia: "",
	id: 0,
	ruta_api: "",
	descripcion: "",
});
const impresoraSeleccionada: Ref<any> = ref("");
const designsStore = useDesignsStore();

const guardarDiseño = async () => {
	let verdaderoNombreImpresora = obtenerNombreDeImpresoraComoCadena(plataformaSeleccionada.value, impresoraSeleccionada.value);
	await designsStore.insertarDiseño(plataformaSeleccionada.value.id, nombre.value, verdaderoNombreImpresora);
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
</script>
<template>
	<div class="p-1">
		<CustomInput :label="$t('createDesign.giveItAName')" type="text" :placeholder="$t('createDesign.nameExample')"
			v-model="nombre"></CustomInput>
		<SelectPlataformas @change="onPlataformaCambiada" v-model="plataformaSeleccionada"></SelectPlataformas>
		<SelectImpresoras :plataforma="plataformaSeleccionada" v-model="impresoraSeleccionada" :impresoras="impresoras">
		</SelectImpresoras>
		<button @click="guardarDiseño"
			class="rounded-md px-3 py-2 mt-2 bg-green-500 text-white hover:bg-green-400 font-bold inline-flex items-center">
			<CheckBold></CheckBold>
			{{ $t("save") }}
		</button>
		<button @click="navegarADiseños"
			class="rounded-md px-3 py-2 mt-2 ml-2 bg-blue-500 text-white hover:bg-blue-400 font-bold inline-flex items-center">
			<FormatListText></FormatListText>
			{{ $t("createDesign.goToDesigns") }}
		</button>
	</div>
</template>