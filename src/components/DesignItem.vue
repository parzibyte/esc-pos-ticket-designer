<script setup lang="ts">
import { computed, defineProps, ref, withDefaults } from 'vue';
import { type Diseño, type DiseñoRecuperadoDeBaseDeDatos } from "@/types/Tipos"
import Delete from "vue-material-design-icons/Delete.vue";
import Pencil from "vue-material-design-icons/Pencil.vue";
import CalendarBlank from "vue-material-design-icons/CalendarBlank.vue";
import ShareVariant from "vue-material-design-icons/ShareVariant.vue";
import PlayListEdit from "vue-material-design-icons/PlayListEdit.vue";
import router from '@/router';
import BotonImprimir from './BotonImprimir.vue';
import Ping from './Ping.vue';
import FileUpload from './FileUpload.vue';
import { useFiltersStore } from '@/stores/filters';
import { useDesignsOperationStore } from '@/stores/designOperation';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const designsOperationStore = useDesignsOperationStore();
const filterStore = useFiltersStore();
const cargandoEnEsteComponente = ref(false);
const cargandoComputed = computed(() => cargandoEnEsteComponente.value === true || props.cargando === true);
const props = withDefaults(defineProps<{
	diseño: DiseñoRecuperadoDeBaseDeDatos,
	mostrarBotonModificar: boolean,
	mostrarBotonEliminar: boolean,
	mostrarBotonExportar: boolean,
	mostrarBotonImportar: boolean,
	cargando: boolean,
}>(), {
	diseño: () => {
		return {
			mostrarBotonModificar: false,
			mostrarBotonEliminar: false,
			mostrarBotonExportar: false,
			mostrarBotonImportar: false,
			id: 0,
			nombre: "",
			fecha_modificacion: 0,
			ruta_api: "",
			licencia: "",
			plataforma: "",
			id_plataforma: 0,
			impresora: "",
		};
	}
});
const emit = defineEmits(["eliminar", "importado"]);


const modificarDiseño = () => {
	router.push({
		name: "EditDesign",
		params: {
			id: props.diseño.id,
		}
	});
}
const modificarOperacionesDeDiseño = () => {
	router.push({
		name: "EditDesignOperations",
		params: {
			id: props.diseño.id,
		}
	});
}

const eliminarDiseño = () => {
	emit("eliminar", props.diseño);
}

const exportarDiseño = async () => {
	cargandoEnEsteComponente.value = true;
	const operacionesRecuperadasDeBaseDeDatos = await designsOperationStore.obtenerOperacionesDeDiseño(props.diseño.id);
	const operacionesParaGuardar = operacionesRecuperadasDeBaseDeDatos.map(operacion => {
		const { clave, argumentos } = operacion;
		return { clave, argumentos };
	});
	const archivo = new Blob([JSON.stringify(operacionesParaGuardar)], { type: 'application/json' });
	const a = document.createElement("a");
	const url = URL.createObjectURL(archivo);
	a.href = url;
	a.download = `${props.diseño.nombre}.json`
	a.click();
	URL.revokeObjectURL(url);
	a.remove();
	cargandoEnEsteComponente.value = false;
}
const onErrorImprimiendo = (err: Error) => {
	alert(t("designItem.printingError") + err);
}

const esCadenaValida = (operacionesCodificadas: string) => {
	const operacionesSerializadas = JSON.parse(operacionesCodificadas);
	if (!operacionesSerializadas) {
		return false;
	}
	if (!Array.isArray(operacionesSerializadas)) {
		return false;
	}
	for (const operacion of operacionesSerializadas) {
		if (typeof operacion.clave !== "string") {
			return false;
		}
		if (typeof operacion.argumentos !== "string") {
			return false;
		}
	}
	return true;
}

const onArchivoParaImportarSeleccionado = async (archivos: File[]) => {
	if (archivos.length <= 0) {
		return;
	}
	const primerArchivo = archivos[0];
	cargandoEnEsteComponente.value = true;
	const reader = new FileReader();
	reader.onload = async () => {
		const operacionesCodificadas = reader.result as string;
		if (!esCadenaValida(operacionesCodificadas)) {
			cargandoEnEsteComponente.value = false;
			return alert(t("designItem.importFileInvalid"));
		}
		const operacionesSerializadas = JSON.parse(operacionesCodificadas);
		for (const operacion of operacionesSerializadas) {
			await designsOperationStore.agregarOperacion(props.diseño.id, operacion.clave, operacion.argumentos);
			cargandoEnEsteComponente.value = false;
		}
		emit("importado");
	}
	reader.readAsText(primerArchivo);
}
</script>
<template>
	<div class="bg-white p-2 my-2 rounded-md">
		<h1 class="text-4xl mb-2 inline-block text-zinc-700 font-semibold">{{ props.diseño.nombre }}
		</h1>
		<div class="flex flex-row items-center">
			<CalendarBlank fillColor="#6b7280"></CalendarBlank>
			<small class="text-sm text-gray-500">{{ filterStore.date(props.diseño.fecha_modificacion) }}</small>
			<div class="inline-block bg-blue-500 rounded-md text-white mx-2 p-1 text-sm">{{ props.diseño.plataforma }} ({{
				props.diseño.impresora }})</div>
			<Ping :idPlataforma="props.diseño.id_plataforma"></Ping>
		</div>
		<div class="flex flex-col md:flex-row">
			<div class="flex flex-row">
				<BotonImprimir :cargando="cargandoComputed" @error="onErrorImprimiendo" :diseño="props.diseño">
				</BotonImprimir>
				<button v-show="mostrarBotonModificar" @click="modificarOperacionesDeDiseño"
					class="rounded-md px-3 py-2 m-1 bg-indigo-500 text-white hover:bg-indigo-400 text-sm font-semibold inline-flex items-center">
					<PlayListEdit></PlayListEdit>
					{{ $t("designItem.operations") }}
				</button>

			</div>
			<div class="flex flex-row">
				<button v-show="mostrarBotonModificar" @click="modificarDiseño"
					class="rounded-md px-3 py-2 m-1 bg-amber-500 text-white hover:bg-amber-400 text-sm font-semibold inline-flex items-center">
					<Pencil></Pencil>
					{{ $t("designItem.edit") }}
				</button>
				<button v-show="mostrarBotonExportar" @click="exportarDiseño"
					class="rounded-md px-3 py-2 m-1 bg-green-500 text-white hover:bg-green-400 text-sm font-semibold inline-flex items-center">
					<ShareVariant></ShareVariant>
					{{ $t("designItem.export") }}
				</button>
				<FileUpload v-if="mostrarBotonImportar" accept="application/json"
					@change="onArchivoParaImportarSeleccionado" :label="$t('designItem.import')">
				</FileUpload>
				<button v-show="mostrarBotonEliminar" @click="eliminarDiseño"
					class="rounded-md px-3 py-2 m-1 bg-red-500 text-white hover:bg-red-400 text-sm font-semibold inline-flex items-center">
					<Delete></Delete>
					{{ $t("designItem.delete") }}
				</button>
			</div>
		</div>

	</div>
</template>