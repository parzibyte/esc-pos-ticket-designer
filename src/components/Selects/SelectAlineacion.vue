<script lang="ts" setup>
import { ALINEACIONES_PARA_IMAGEN_O_TEXTO, type AlineacionConNombreYValor, Alineacion } from '@/types/Tipos'
import { ref, computed } from "vue"
import Select from "@/components/Select.vue"
type Propiedades = {
	modelValue: AlineacionConNombreYValor,
};

const propiedades = withDefaults(defineProps<Propiedades>(), {
	modelValue: () => {
		return {
			nombre: "Centro",
			valor: Alineacion.Centro,
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

const alineaciones = ref(ALINEACIONES_PARA_IMAGEN_O_TEXTO);
</script>
<template>
	<Select :display-item-function="(alineacion) => $t('alignments.' + alineacion.nombre)" :items="alineaciones"
		:label="$t('alignment')" v-model="valorSerializado">
		<template #item="{ item, index }">
			<h1 class="text-xl">
				{{ $t('alignments.' + item.nombre) }}
			</h1>
		</template>
	</Select>
</template>