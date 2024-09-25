<script setup lang="ts">
import { computed } from 'vue';
import { type ArgumentosParaDefinirImagen, Alineacion, ALGORITMO_IMPRESION_POR_DEFECTO, MAXIMO_ANCHO_IMAGEN_58_MM } from "@/types/Tipos"
import Range from '../Range.vue';
import FileUpload from '../FileUpload.vue';
import AlertaAnchoImagen from '@/components/Alertas/AlertaAnchoImagen.vue';
import SelectAlineacion from '@/components/Selects/SelectAlineacion.vue';
import SelectAlgoritmoImagen from '@/components/Selects/SelectAlgoritmoImagen.vue';
import CustomCheckbox from '../CustomCheckbox.vue';


type Propiedades = {
    modelValue: ArgumentosParaDefinirImagen,
};

const propiedades = withDefaults(defineProps<Propiedades>(), {
    modelValue: () => {
        return {
            alineacion: { nombre: "Centro", valor: Alineacion.Centro },
            algoritmo: ALGORITMO_IMPRESION_POR_DEFECTO,
            alto: 0,
            ancho: 0,
            maximoAncho: 8,
            maximoAlto: 8,
            contenidoEnBase64: "",
            aplicarDithering: true,
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

const obtenerArchivoComoBase64 = async function (file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async () => {
            resolve(reader.result as string);
        };
        reader.onerror = error => {
            reject(error);
        }
        reader.readAsDataURL(file);
    });
}


const obtenerResolucionImagen = function (archivo: File): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
        const imagen = new Image();
        const objectUrl = URL.createObjectURL(archivo)
        imagen.onload = () => {
            URL.revokeObjectURL(objectUrl);
            resolve([imagen.naturalHeight, imagen.naturalWidth]);
        }
        imagen.src = objectUrl;
    });
}
const onImagenSeleccionada = async (archivos: File[]) => {
    if (archivos.length <= 0) {
        return;
    }
    const primerArchivo = archivos[0];
    const [alto, ancho] = await obtenerResolucionImagen(primerArchivo);
    propiedades.modelValue.alto = alto;
    propiedades.modelValue.ancho = ancho;
    propiedades.modelValue.contenidoEnBase64 = await obtenerArchivoComoBase64(primerArchivo);
    if (ancho > MAXIMO_ANCHO_IMAGEN_58_MM) {
        propiedades.modelValue.maximoAncho = MAXIMO_ANCHO_IMAGEN_58_MM;
    } else {
        propiedades.modelValue.maximoAncho = ancho;
    }
}

const hayImagenSeleccionada = computed(() => {
    if (propiedades.modelValue.contenidoEnBase64.length > 0) {
        return true;
    }
    return false;
});

</script>
<template>
    <div class="flex flex-col">
        <img class="max-w-max" :src="propiedades.modelValue.contenidoEnBase64" v-if="hayImagenSeleccionada">
        <FileUpload :label="$t('operationComponents.Imagen.label')" accept="image/png,image/jpeg"
            @change="onImagenSeleccionada">
        </FileUpload>
    </div>
    <div class="flex flex-col md:flex-row" v-if="hayImagenSeleccionada">
        <SelectAlineacion v-model="propiedades.modelValue.alineacion"></SelectAlineacion>
        <SelectAlgoritmoImagen v-model="propiedades.modelValue.algoritmo"></SelectAlgoritmoImagen>
        <Range v-model="propiedades.modelValue.maximoAncho" min="8" :max="propiedades.modelValue.ancho"
            :label="$t('width')"></Range>
        <CustomCheckbox :label="$t('operationComponents.Imagen.aplicarDithering')"
            v-model="propiedades.modelValue.aplicarDithering"></CustomCheckbox>
    </div>
    <AlertaAnchoImagen :ancho="propiedades.modelValue.maximoAncho"></AlertaAnchoImagen>
</template>