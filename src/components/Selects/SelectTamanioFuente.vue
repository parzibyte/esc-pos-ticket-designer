<script lang="ts" setup>
import { computed } from "vue"
import Select from "@/components/Select.vue"
type Propiedades = {
	modelValue: number,
	label: string,
};

const propiedades = withDefaults(defineProps<Propiedades>(), {
	modelValue: () => {
		return 1;
	},
	label: "",
})
const emit = defineEmits(["update:modelValue"]);
const valorSerializado = computed<number>({
	set(value) {
		emit("update:modelValue", value);
	},
	get() {
		return propiedades.modelValue;
	},
});

const tamañosFuente = [1, 2, 3, 4, 5, 6, 7, 8];

</script>
<template>
	<div class="flex flex-col md:flex-row">
		<Select :display-item-function="(tamaño) => tamaño.toString()" :items="tamañosFuente" :label="label"
			v-model="valorSerializado">
			<template #item="{ item, index }">
				<h1 class="text-xl">{{ item }}</h1>
			</template>
		</Select>
	</div>
</template>