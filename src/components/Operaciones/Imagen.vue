<script setup lang="ts">
import { computed, ref } from 'vue';
import { TamañoImagen, type ArgumentosParaDefinirImagen, Alineacion } from "@/types/Tipos"
import Select from "@/components/Select.vue"
import Range from '../Range.vue';
import FileUpload from '../FileUpload.vue';


type Propiedades = {
    modelValue: ArgumentosParaDefinirImagen,
};

const propiedades = withDefaults(defineProps<Propiedades>(), {
    modelValue: () => {
        return {
            tamaño: TamañoImagen.Normal,
            alineacion: Alineacion.Centro,
            alto: 0,
            ancho: 0,
            maximoAncho: 8,
            contenidoEnBase64: "",
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
const alineaciones = ref([
    {
        nombre: "Izquierda",
        valor: Alineacion.Izquierda,
    },
    {
        nombre: "Centro",
        valor: Alineacion.Centro,
    },
    {
        nombre: "Derecha",
        valor: Alineacion.Derecha,
    },

]);


const tamaños = ref([
    {
        nombre: "Normal",
        valor: TamañoImagen.Normal,
    },
    {
        nombre: "Doble ancho",
        valor: TamañoImagen.DobleAncho,
    },
    {
        nombre: "Doble largo",
        valor: TamañoImagen.DobleLargo,
    },
    {
        nombre: "Doble ancho y largo",
        valor: TamañoImagen.DobleAnchoYLargo,
    },

]);


const onImagenSeleccionada = async (archivos: File[]) => {
    if (archivos.length <= 0) {
        return;
    }
    const primerArchivo = archivos[0];
    const [alto, ancho] = await obtenerResolucionImagen(primerArchivo);
    propiedades.modelValue.alto = alto;
    propiedades.modelValue.ancho = ancho;
    propiedades.modelValue.contenidoEnBase64 = await obtenerArchivoComoBase64(primerArchivo);
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
        <img class="w-80" :src="propiedades.modelValue.contenidoEnBase64" v-if="hayImagenSeleccionada">
        <FileUpload label="Seleccionar archivo..." multiple accept="image/png,image/jpeg" @change="onImagenSeleccionada">
        </FileUpload>
    </div>
    <div class="flex flex-col md:flex-row" v-if="hayImagenSeleccionada">
        <Select :display-item-function="(alineacion) => alineacion.nombre" :items="alineaciones" label="Alineación"
            v-model="propiedades.modelValue.alineacion">
            <template #item="{ item, index }">
                <h1 class="text-xl">{{ item.nombre }}</h1>
            </template>
        </Select>
        <Select :display-item-function="(tamaño) => tamaño.nombre" :items="tamaños" label="Redimensionar al imprimir:"
            v-model="propiedades.modelValue.tamaño">
            <template #item="{ item, index }">
                <h1 class="text-xl">{{ item.nombre }}</h1>
            </template>
        </Select>
        <Range v-model="propiedades.modelValue.maximoAncho" min="8" :max="propiedades.modelValue.ancho" step="8"
            label="Ancho"></Range>
    </div>
</template>