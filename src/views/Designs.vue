<script setup lang="ts">
import DesignItem from "@/components/DesignItem.vue";
import { ref, onMounted } from "vue"
import router from "@/router/index"
import FilePlus from "vue-material-design-icons/FilePlus.vue";
import type { Diseño } from "@/types/Tipos";
import { useDesignsStore } from "@/stores/designsStore";

const designsStore = useDesignsStore();
const diseños = ref([]);

onMounted(async () => {
	await refrescarListaDeDiseños();
});

const agregarNuevoDiseño = () => {
	router.push({
		name: "CreateDesign"
	});
}
const refrescarListaDeDiseños = async () => {
	diseños.value = await designsStore.obtenerDiseños();
}

const eliminarDiseño = async (diseño: Diseño) => {
	await designsStore.eliminarDiseño(diseño.id);
	await refrescarListaDeDiseños();
}
</script>
<template>
	<div class="bg-gray-100 p-1">
		<button @click="agregarNuevoDiseño"
			class="rounded-md px-3 py-2 ml-2 bg-green-500 text-white hover:bg-green-400 font-bold inline-flex items-center">
			<FilePlus></FilePlus>
			{{ $t("designs.addDesign") }}
		</button>
		<DesignItem :cargando="false" :mostrar-boton-exportar="false" :mostrar-boton-importar="false" :mostrar-boton-modificar="true"
			:mostrar-boton-eliminar="true" @eliminar="eliminarDiseño" v-for="(diseño, indiceDiseño) in diseños"
			:key="indiceDiseño" :diseño="diseño"></DesignItem>
	</div>
</template>