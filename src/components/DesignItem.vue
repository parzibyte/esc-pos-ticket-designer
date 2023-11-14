<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
import { type Diseño } from "@/types/Tipos"
import Delete from "vue-material-design-icons/Delete.vue";
import Pencil from "vue-material-design-icons/Pencil.vue";
import CalendarBlank from "vue-material-design-icons/CalendarBlank.vue";
import ShareVariant from "vue-material-design-icons/ShareVariant.vue";
import PlayListEdit from "vue-material-design-icons/PlayListEdit.vue";
import router from '@/router';
import BotonImprimir from './BotonImprimir.vue';
import Ping from './Ping.vue';
import { useDatabaseStore } from '@/stores/db';
import FileUpload from './FileUpload.vue';
const store = useDatabaseStore();
const props = withDefaults(defineProps<{
	diseño: Diseño,
	mostrarBotonModificar: boolean,
	mostrarBotonEliminar: boolean,
	mostrarBotonExportar: boolean,
	mostrarBotonImportar: boolean,
}>(), {
	diseño: () => {
		return {
			mostrarBotonModificar: false,
			mostrarBotonEliminar: false,
			mostrarBotonExportar: false,
			mostrarBotonImportar: false,
			id: 0,
			nombre: "",
			fechaModificacion: "",
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
	console.log(props.diseño);
	const operacionesRecuperadasDeBaseDeDatos = await store.obtenerOperacionesDeDiseño(props.diseño.id);
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
}
const onErrorImprimiendo = (err) => {
	alert("Error imprimiendo: " + err);
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
	const reader = new FileReader();
	reader.onload = async () => {
		const operacionesCodificadas = reader.result as string;
		if (!esCadenaValida(operacionesCodificadas)) {
			return alert("El archivo importado no es válido");
		}
		const operacionesSerializadas = JSON.parse(operacionesCodificadas);
		for (const operacion of operacionesSerializadas) {
			await store.exec(`INSERT INTO
    operaciones_diseños(id_diseño, clave, argumentos, orden)
VALUES
    (
        ?,
        ?,
        ?,
        (
            SELECT
                COALESCE(
                    (
                        SELECT
                            orden
                        FROM
                            operaciones_diseños
                        WHERE
                            id_diseño = ?
                        ORDER BY
                            orden DESC
                        LIMIT
                            1
                    ), 0
                )
        ) + 1
    ) RETURNING *`,
				[props.diseño.id, operacion.clave, operacion.argumentos],
			)
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
			<small class="text-sm text-gray-500">{{ props.diseño.fecha_modificacion }}</small>
			<div class="inline-block bg-blue-500 rounded-md text-white mx-2 p-1 text-sm">{{ props.diseño.plataforma }} ({{
				props.diseño.impresora }})</div>
			<Ping :diseño="props.diseño"></Ping>
		</div>
		<div class="flex flex-col md:flex-row">
			<div class="flex flex-row">
				<BotonImprimir @error="onErrorImprimiendo" :diseño="props.diseño"></BotonImprimir>
				<button v-show="mostrarBotonModificar" @click="modificarOperacionesDeDiseño"
					class="rounded-md px-3 py-2 m-1 bg-indigo-500 text-white hover:bg-indigo-400 text-sm font-semibold inline-flex items-center">
					<PlayListEdit></PlayListEdit>
					Operaciones
				</button>

			</div>
			<div class="flex flex-row">
				<button v-show="mostrarBotonModificar" @click="modificarDiseño"
					class="rounded-md px-3 py-2 m-1 bg-amber-500 text-white hover:bg-amber-400 text-sm font-semibold inline-flex items-center">
					<Pencil></Pencil>
					Editar
				</button>
				<button v-show="mostrarBotonExportar" @click="exportarDiseño"
					class="rounded-md px-3 py-2 m-1 bg-green-500 text-white hover:bg-green-400 text-sm font-semibold inline-flex items-center">
					<ShareVariant></ShareVariant>
					Exportar
				</button>
				<FileUpload v-if="mostrarBotonImportar" accept="application/json"
					@change="onArchivoParaImportarSeleccionado" label="Importar...">
				</FileUpload>
				<button v-show="mostrarBotonEliminar" @click="eliminarDiseño"
					class="rounded-md px-3 py-2 m-1 bg-red-500 text-white hover:bg-red-400 text-sm font-semibold inline-flex items-center">
					<Delete></Delete>
					Eliminar
				</button>
			</div>
		</div>

	</div>
</template>