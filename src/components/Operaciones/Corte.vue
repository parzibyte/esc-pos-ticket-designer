<template>
	<input @change="serializarVModel()" type="number" placeholder="Líneas" v-model.number="valorInterno"
		class="border border-emerald-300 rounded-md max-w-full focus:outline-none p-1">
</template>
<script setup lang="ts">
import { computed, type Ref, ref, watch, onMounted } from 'vue';

type Propiedades = {
	modelValue: string;
};
const propiedadesDelComponente = withDefaults(defineProps<Propiedades>(), {
	modelValue: () => {
		return "";
	}
})
const serializarVModel = (valorInterno: any): string => {
	return JSON.stringify(valorInterno);
}

const deserializarVModel = (valorSerializado: any): number => {
	if (!valorSerializado) {
		return 0;
	}
	return JSON.parse(valorSerializado);
}
const valorInterno: Ref<number> = ref(deserializarVModel(propiedadesDelComponente.modelValue));
const emit = defineEmits(["update:modelValue"]);
const valorSerializado = computed({
	set(value: string) {
		// Es invocado cuando el input cambia, cuando se hace un valorSerializado.value
		console.log("Set");
		valorInterno.value = deserializarVModel(value);
		emit("update:modelValue", value);
	},
	get() {
		return propiedadesDelComponente.modelValue;
	},
});

watch(
	() => {
		return propiedadesDelComponente.modelValue;
	},
	(value: string, oldValue: string) => {
		valorSerializado.value = value;
	}
);

onMounted(() => {
	return
	if (propiedadesDelComponente.modelValue) {
		valorInterno.value = deserializarVModel(valorSerializado.value);
	} else {
		propiedadesDelComponente.modelValue = serializarVModel(valorInterno.value);
	}
});

</script>