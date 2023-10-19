<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { TamañoImagen, type ArgumentosParaDefinirImagen, Alineacion } from "@/types/Tipos"

const referenciaAlInput = ref(null);

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
const extraerExtensionDeArchivo = (nombre: string) => {
    const indice = nombre.lastIndexOf(".");
    if (indice === -1) {
        return "";
    }
    return nombre.substring(indice + 1);
}
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
            console.log({ imagen });
            URL.revokeObjectURL(objectUrl);
            resolve([imagen.naturalHeight, imagen.naturalWidth]);
        }
        imagen.src = objectUrl;
    });
}

const onArchivoSeleccionado = async (e: Event) => {
    const files = e.target.files;
    if (files.length <= 0) {
        return;
    }
    const primerArchivo = files[0];
    const [alto, ancho] = await obtenerResolucionImagen(primerArchivo);
    propiedades.modelValue.alto = alto;
    propiedades.modelValue.ancho = ancho;
    propiedades.modelValue.contenidoEnBase64 = await obtenerArchivoComoBase64(primerArchivo);
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
</script>
<template>
    <div>
        <label class="font-bold">Alineación</label>
        <select class="border border-gray-200" v-model="propiedades.modelValue.alineacion">
            <option v-for="alineacion in alineaciones" :value="alineacion.valor">{{ alineacion.nombre }}</option>
        </select>
        <label class="font-bold">Redimensionar al imprimir:</label>
        <select class="border border-gray-200" v-model="propiedades.modelValue.tamaño">
            <option v-for="tamaño in tamaños" :value="tamaño.valor">{{ tamaño.nombre }}</option>
        </select>
        <input type="range" step="8" v-model.number="propiedades.modelValue.maximoAncho" :max="propiedades.modelValue.ancho">
        <img class="max-h-40" :src="propiedades.modelValue.contenidoEnBase64"
            v-if="propiedades.modelValue.contenidoEnBase64.length > 0">
        <input accept="image/png,image/jpeg" @change="onArchivoSeleccionado" ref="referenciaAlInput"
            class="border border-gray-200 rounded-md" type="file">
    </div>
</template>