<script setup lang="ts">
import { computed } from 'vue';
import Select from '../Select.vue';
import type { ImpresoraAndroid, PlataformaRecuperadaDeBaseDeDatos } from '@/types/Tipos';
import { plataformaEsAndroid } from '@/Helpers';
type Propiedades = {
	modelValue: any,
	impresoras: any[],
	plataforma: PlataformaRecuperadaDeBaseDeDatos,
};

const propiedades = withDefaults(defineProps<Propiedades>(), {
	modelValue: () => {
		return "";
	},
	impresoras: () => [],
	plataforma: () => {
		return {
			descripcion: "",
			id: 0,
			licencia: "",
			nombre: "",
			ruta_api: "",
		};
	}
})
const emit = defineEmits(["update:modelValue", "change"]);
const valorSerializado = computed({
	set(value) {
		emit("update:modelValue", value);
	},
	get() {
		return propiedades.modelValue;
	},
});
const onImpresoraCambiada = async (impresora: string) => {
	emit("change", impresora);
}

const funcionDeFiltroCadenas = (criteria: string, items: any[]) => {
	const expresion = new RegExp(`${criteria}.*`, "i");
	return items.filter((impresora) => {
		return expresion.test(impresora);
	});
};
const funcionDeFiltroParaAndroid = (criteria: string, items: ImpresoraAndroid[]) => {
	const expresion = new RegExp(`${criteria}.*`, "i");
	return items.filter((impresora) => {
		return expresion.test(impresora.name);
	});
};

const obtenerFuncionParaFiltrarImpresoras = () => {
	if (plataformaEsAndroid(propiedades.plataforma)) {
		return funcionDeFiltroParaAndroid;
	}
	return funcionDeFiltroCadenas;
};


const obtenerFuncionParaMostrarImpresora = () => {
	if (!plataformaEsAndroid(propiedades.plataforma)) {
		return (impresora: string) => impresora;
	}
	return (impresora: ImpresoraAndroid) => {
		if (!impresora) {
			return "";
		}
		return `${impresora.name} (${impresora.mac})`;
	};
}

</script>
<template>
	<Select @change="onImpresoraCambiada" v-model="valorSerializado" label="¿En dónde se va a imprimir?"
		:items="propiedades.impresoras" :filter-function="obtenerFuncionParaFiltrarImpresoras()"
		:display-item-function="obtenerFuncionParaMostrarImpresora()">
		<template v-if="plataformaEsAndroid(plataforma)" #item="{ item, index }">
			<h1 class="text-xl">{{ item.name }} <small>{{ item.mac }}</small> </h1>
		</template>
		<template v-if="!plataformaEsAndroid(plataforma)" #item="{ item, index }">
			<h1 class="text-xl">{{ item }}</h1>
		</template>
	</Select>
</template>