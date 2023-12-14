<script lang="ts" setup>
import { TAMAÑOS_IMAGEN, type TamañoConNombreYValor, TamañoImagen } from '@/types/Tipos'
import { ref, computed } from "vue"
import Select from "@/components/Select.vue"
type Propiedades = {
	modelValue: TamañoConNombreYValor,
};

const propiedades = withDefaults(defineProps<Propiedades>(), {
	modelValue: () => {
		return {
			nombre: "Normal",
			valor: TamañoImagen.Normal,
		};
	}
})
const emit = defineEmits(["update:modelValue"]);
const valorSerializado = computed({
	set(value) {
		emit("update:modelValue", value);
	},
	get() {
		return propiedades.modelValue;
	},
});

const tamaños = ref(TAMAÑOS_IMAGEN);
</script>
<template>
	<Select :display-item-function="(tamaño) => $t('imageSizes.' + tamaño.nombre)" :items="tamaños" :label="$t('imageSize')"
		v-model="valorSerializado">
		<template #item="{ item, index }">
			<h1 class="text-xl"> {{ $t("imageSizes." + item.nombre) }}</h1>
		</template>
	</Select>
</template>