<script setup lang="ts">
import { computed } from 'vue';
import { Alineacion, type ArgumentosParaDefinirTexto } from "@/types/Tipos"
import CustomCheckbox from "@/components/CustomCheckbox.vue";
import CustomTextarea from "@/components/CustomTextarea.vue";
import SelectAlineacion from '../Selects/SelectAlineacion.vue';
import SelectTamanioFuente from '../Selects/SelectTamanioFuente.vue';

type Propiedades = {
    modelValue: ArgumentosParaDefinirTexto,
};
const propiedades = withDefaults(defineProps<Propiedades>(), {
    modelValue: () => {
        return {
            texto: "",
            ancho: 1,
            alto: 1,
            enfatizado: false,
            alineacion: {
                nombre: "Izquierda",
                valor: Alineacion.Izquierda,
            },
            subrayado: false,
            alReves: false,
            inverso: false,
            rotacion90: false,
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
</script>
<template>
    <CustomTextarea rows="3" :placeholder="$t('operationComponents.Texto.placeholder')"
        :label="$t('operationComponents.Texto.label')" v-model="propiedades.modelValue.texto"></CustomTextarea>
    <div class="flex flex-col md:flex-row">
        <SelectTamanioFuente v-model="propiedades.modelValue.ancho" :label="$t('width')"></SelectTamanioFuente>
        <SelectTamanioFuente v-model="propiedades.modelValue.alto" :label="$t('height')"></SelectTamanioFuente>
        <SelectAlineacion v-model="propiedades.modelValue.alineacion"></SelectAlineacion>
    </div>
    <div class="flex md:flex-row flex-col">
        <CustomCheckbox :label="$t('emphasized')" v-model="propiedades.modelValue.enfatizado"></CustomCheckbox>
        <CustomCheckbox :label="$t('underline')" v-model="propiedades.modelValue.subrayado"></CustomCheckbox>
        <CustomCheckbox :label="$t('upsideDown')" v-model="propiedades.modelValue.alReves"></CustomCheckbox>
        <CustomCheckbox :label="$t('negative')" v-model="propiedades.modelValue.inverso"></CustomCheckbox>
        <CustomCheckbox :label="$t('rotate90Degrees')" v-model="propiedades.modelValue.rotacion90"></CustomCheckbox>
    </div>
    <div class="bg-red-500 rounded-md text-white p-1 my-2"
        v-show="propiedades.modelValue.alto !== 1 && propiedades.modelValue.rotacion90">
        <strong>
            Problemas conocidos:
        </strong>

        cuando se elige
        <strong>
            Rotación de 90°
        </strong>
        el
        <strong>Alto</strong>
        debería ser 1
    </div>
</template>