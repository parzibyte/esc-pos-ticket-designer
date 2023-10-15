<script setup lang="ts">
import DesignItem from "@/components/DesignItem.vue";
import { useDatabaseStore } from "@/stores/db"
import { ref, onMounted } from "vue"
import router from "@/router/index"
import FilePlus from "vue-material-design-icons/FilePlus.vue";

const store = useDatabaseStore();
const diseños = ref([]);

onMounted(async () => {
	const consulta = `select d.id,
	d.nombre,
	d.fecha_creacion,
	d.fecha_modificacion,
	p.id AS id_plataforma,
	p.nombre AS plataforma,
	p.licencia,
	p.ruta_api
from diseños d
	inner join plataformas p on d.id_plataforma = p.id;`
	diseños.value = await store.exec(consulta);
});

const agregarNuevoDiseño = () => {
	router.push({
		name: "CreateDesign"
	});

}
</script>
<template>
	<div class="bg-gray-100 p-1">
		<button @click="agregarNuevoDiseño"
			class="rounded-md px-3 py-2 ml-2 bg-green-500 text-white hover:bg-green-400 font-bold inline-flex items-center">
			<FilePlus></FilePlus>
			Nuevo diseño
		</button>
		<DesignItem v-for="(diseño, indiceDiseño) in diseños" :key="indiceDiseño" :diseño="diseño"></DesignItem>
	</div>
</template>