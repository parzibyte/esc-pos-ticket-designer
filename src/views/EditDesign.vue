<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue"
import { useDesignsStore } from "@/stores/designsStore"
import CheckBold from "vue-material-design-icons/CheckBold.vue";
import FormatListText from "vue-material-design-icons/FormatListText.vue";
import router from "@/router";
import CustomInput from "@/components/CustomInput.vue";
import SelectPlataformas from "@/components/Selects/SelectPlataformas.vue";
import SelectImpresoras from "@/components/Selects/SelectImpresoras.vue";
import { usePlatformStore } from "@/stores/platform";
import type { ImpresoraAndroid, PlataformaRecuperadaDeBaseDeDatos } from "@/types/Tipos";
import { obtenerNombreDeImpresoraComoCadena, plataformaEsAndroid } from "@/Helpers";
const designsStore = useDesignsStore();
const platformStore = usePlatformStore();
const impresoras: Ref<any> = ref([]);
const nombre = ref("");
const plataformaSeleccionada: Ref<PlataformaRecuperadaDeBaseDeDatos> = ref({
	ruta_api: "",
	licencia: "",
	id: 0,
	nombre: "",
	descripcion: "",
});
const impresoraSeleccionada: Ref<any> = ref("");
const props = defineProps<{
	id: number,
}>();
const guardarDiseño = async () => {
	let verdaderoNombreImpresora = obtenerNombreDeImpresoraComoCadena(plataformaSeleccionada.value, impresoraSeleccionada.value);
	await designsStore.actualizarDiseño(plataformaSeleccionada.value.id, nombre.value, verdaderoNombreImpresora, props.id);
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
	plataformaSeleccionada.value = await platformStore.obtenerPlataformaPorId(diseñoActualmenteEditado.id_plataforma);
	nombre.value = diseñoActualmenteEditado.nombre;
	await onPlataformaCambiada(plataformaSeleccionada.value);
	if (plataformaEsAndroid(plataformaSeleccionada.value)) {
		// Esto es porque solo guardamos la MAC, y para el select se necesita el objeto completo
		const impresora = impresoras.value.find(
			(impresora: ImpresoraAndroid) => {
				if (impresora.mac === diseñoActualmenteEditado.impresora) {
					return true;
				}
				return false;
			}
		);
		impresoraSeleccionada.value = impresora;
	} else {
		impresoraSeleccionada.value = diseñoActualmenteEditado.impresora;
	}
});
</script>
<template>
	<div class="p-1">
		<CustomInput :label="$t('editDesign.giveItAName')" type="text" :placeholder="$t('editDesign.nameExample')"
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
			{{ $t("editDesign.goToDesigns") }}
		</button>
	</div>
</template>