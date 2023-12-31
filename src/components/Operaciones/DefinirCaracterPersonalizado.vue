<script setup lang="ts">
import { onMounted, ref, type Ref, defineProps, computed, watch, withDefaults } from "vue"
import Brush from 'vue-material-design-icons/Brush.vue';
import Eraser from 'vue-material-design-icons/Eraser.vue';
import Broom from 'vue-material-design-icons/Broom.vue';
import type { ArgumentosParaDefinirCaracterPersonalizado } from "@/types/Tipos";
import CustomInput from "../CustomInput.vue";
import FileUpload from "../FileUpload.vue";
enum Accion {
    Borrar,
    Pintar,
    Limpiar,
}
type PropiedadesDelComponente = {
    modelValue: ArgumentosParaDefinirCaracterPersonalizado,
};
const propiedades = withDefaults(defineProps<PropiedadesDelComponente>(), {
    modelValue: () => {
        return { matrizDeBits: Array(24).fill(false).map(() => Array(12).fill(BIT_APAGADO)), caracterQueReemplaza: "" };
    }
})
const emit = defineEmits(['update:modelValue'])
const arregloDeCaracter = computed({
    get() {
        return propiedades.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
});
watch(arregloDeCaracter,
    () => {
        dibujar();
    },
    {
        deep: true,
    });
type Boton = {
    icono: Object,
    seleccionado: boolean,
    clases: string,
    clasesSeleccionado: string,
    accion: Accion,
}
let isDrawing = false;
const accionSeleccionada: Ref<Accion> = ref(Accion.Pintar);
const botones: Ref<Array<Boton>> = ref([
    {
        icono: Brush,
        seleccionado: true,
        clases: "bg-lime-300",
        clasesSeleccionado: "bg-lime-500",
        accion: Accion.Pintar,

    },
    {
        icono: Eraser,
        seleccionado: false,
        clases: "bg-amber-300",
        clasesSeleccionado: "bg-amber-600",
        accion: Accion.Borrar,
    },
    {
        icono: Broom,
        seleccionado: false,
        clases: "bg-red-300",
        clasesSeleccionado: "bg-red-500",
        accion: Accion.Limpiar,
    },
]);
const canvas: Ref<HTMLCanvasElement | null> = ref(null);
let ancho = ref(1);
let alto = ref(1);
let verdaderoCanvas: HTMLCanvasElement;
let contexto: CanvasRenderingContext2D;
const BIT_ENCENDIDO = "1",
    BIT_APAGADO = "0",
    MEDIDA_CUADRO = 10,
    COLOR_NEGRO = "black",
    COLOR_BLANCO = "white",
    COLOR_GRIS = "#e2e8f0";

function getCursorPosition(event: PointerEvent | TouchEvent | MouseEvent) {
    const rect = verdaderoCanvas.getBoundingClientRect();
    let x: number = 0, y: number = 0;
    if (event instanceof PointerEvent || event instanceof MouseEvent) {
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
    } else if (event instanceof TouchEvent) {
        if (event.touches.length > 0) {
            x = event.touches[0].clientX - rect.left;
            y = event.touches[0].clientY - rect.top;
        }
    }
    return [x, y];
}

const limpiarCanvas = () => {
    arregloDeCaracter.value.matrizDeBits = Array(24).fill(false).map(() => Array(12).fill(BIT_APAGADO))
};

const dibujar = () => {
    let y = 0, x = 0;
    for (const fila of arregloDeCaracter.value.matrizDeBits) {
        x = 0;
        for (const bit of fila) {
            contexto.beginPath();
            if (bit === BIT_ENCENDIDO) {
                contexto.fillStyle = COLOR_NEGRO;
            } else {
                contexto.fillStyle = COLOR_BLANCO;
            }
            contexto.rect(x, y, MEDIDA_CUADRO, MEDIDA_CUADRO);
            if (bit === BIT_ENCENDIDO) {
                contexto.strokeStyle = COLOR_NEGRO;
                contexto.fill();
            } else {
                contexto.strokeStyle = COLOR_GRIS;
                contexto.stroke();
                contexto.fill();
            }
            contexto.closePath();
            x += MEDIDA_CUADRO;
        }
        y += MEDIDA_CUADRO;
    }
};

const obtenerClases = (boton: Boton) => {
    if (boton.seleccionado) {
        return boton.clasesSeleccionado;
    } else {
        return boton.clases;
    }
}
const onClickEnBoton = (boton: Boton) => {
    if (boton.accion === Accion.Limpiar) {
        limpiarCanvas();
        return;
    }
    for (const boton of botones.value) {
        boton.seleccionado = false;
    }
    boton.seleccionado = true;
    accionSeleccionada.value = boton.accion;
}

onMounted(() => {
    verdaderoCanvas = canvas.value as HTMLCanvasElement;
    contexto = verdaderoCanvas.getContext("2d") as CanvasRenderingContext2D;
    ancho.value = verdaderoCanvas.width = arregloDeCaracter.value.matrizDeBits[0].length * MEDIDA_CUADRO;
    alto.value = verdaderoCanvas.height = arregloDeCaracter.value.matrizDeBits.length * MEDIDA_CUADRO;
    ["mousedown", "touchstart"].forEach(nombreEvento => {
        verdaderoCanvas.addEventListener(nombreEvento, () => {
            isDrawing = true;
        });
    });
    ["mouseup", "touchend"].forEach(nombreEvento => {
        verdaderoCanvas.addEventListener(nombreEvento, () => {
            isDrawing = false;
        });
    });
    ["mousemove", "click", "touchmove"].forEach(nombreEvento => {
        verdaderoCanvas.addEventListener(nombreEvento, (evento) => {
            evento.preventDefault();
            if (!isDrawing && evento.type !== "click") {
                return;
            }
            let [x, y] = [0, 0];
            if (evento instanceof TouchEvent) {
                [x, y] = getCursorPosition(evento as TouchEvent);
            } else if (evento instanceof PointerEvent) {
                [x, y] = getCursorPosition(evento as PointerEvent);
            } else if (evento instanceof MouseEvent) {
                [x, y] = getCursorPosition(evento as MouseEvent);
            }
            const indiceX = Math.floor(x / MEDIDA_CUADRO), indiceY = Math.floor(y / MEDIDA_CUADRO);
            if (indiceX < 0 || indiceY < 0) {
                return;
            }
            if (indiceX > arregloDeCaracter.value.matrizDeBits[0].length - 1 || indiceY > arregloDeCaracter.value.matrizDeBits.length - 1) {
                return;
            }
            if (accionSeleccionada.value === Accion.Pintar) {
                arregloDeCaracter.value.matrizDeBits[indiceY][indiceX] = BIT_ENCENDIDO;
            } else if (accionSeleccionada.value === Accion.Borrar) {
                arregloDeCaracter.value.matrizDeBits[indiceY][indiceX] = BIT_APAGADO;
            }
        });
    });
    dibujar();
})

const estiloDelCanvas = () => {
    return {
        width: ancho.value + "px",
        height: alto.value + "px",
    };
};

const onArchivoSeleccionado = async (archivos: File[]) => {
    const umbralParaDecidirSiElGrisSeConvierteEnNegro = 210;
    const totalFilas = 24;
    const elementosPorFila = 12;
    // Al invocar a getImagaData, se nos devuelve un arreglo lineal en donde
    // vienen los valores R,G,B,A,R,G,B,A...
    // Dicho con otras palabras, cada pixel ocupa 4 posiciones
    const posicionesPorPixel = 4;
    if (archivos.length <= 0) {
        return;
    }
    const primerArchivo = archivos[0];
    const imagen = await createImageBitmap(primerArchivo);
    const canvas = new OffscreenCanvas(imagen.width, imagen.height);
    const contexto = canvas.getContext("2d");
    if (!contexto) {
        return;
    }
    contexto.drawImage(imagen, 0, 0, imagen.width, imagen.height);
    const datosDeImagen = contexto.getImageData(0, 0, imagen.width, imagen.height);
    const pixeles = datosDeImagen.data;
    const cantidadDePixeles = pixeles.length / posicionesPorPixel;
    const totalElementos = totalFilas * elementosPorFila;
    if (cantidadDePixeles < totalElementos) {
        return alert("Imagen muy pequeña");
    }
    let bit;
    for (let indice = 0; indice < totalElementos * posicionesPorPixel; indice += posicionesPorPixel) {
        const rojo = pixeles[indice];
        const verde = pixeles[indice + 1];
        const azul = pixeles[indice + 2];
        // El alpha está en indice + 3, pero no lo necesitamos
        const promedioEnGris = (rojo + verde + azul) / 3;
        const indiceX = (indice / posicionesPorPixel) % elementosPorFila;
        const indiceY = Math.floor((indice / posicionesPorPixel) / elementosPorFila);
        if (promedioEnGris > umbralParaDecidirSiElGrisSeConvierteEnNegro) {
            bit = BIT_APAGADO;
        } else {
            bit = BIT_ENCENDIDO;
        }
        arregloDeCaracter.value.matrizDeBits[indiceY][indiceX] = bit;
    }
}
</script>

<template>
    <div class="flex flex-col md:flex-row">
        <div class="flex flex-col">
            <div class="flex flex-row">
                <button class="text-white p-1 mt-1 h-8" @click="onClickEnBoton(boton)" v-for="boton in botones"
                    :class="obtenerClases(boton)">
                    <component :is="boton.icono"></component>
                </button>
            </div>
            <canvas :style="estiloDelCanvas()" ref="canvas" class="flex-1 border border-zinc-100 mt-2"></canvas>
            <FileUpload accept="image/png,image/jpeg,image/bmp" @change="onArchivoSeleccionado"
                :label="$t('operationComponents.DefinirCaracterPersonalizado.createFromImage')">
            </FileUpload>
        </div>
        <div>
            <CustomInput v-model="propiedades.modelValue.caracterQueReemplaza"
                :label="$t('operationComponents.DefinirCaracterPersonalizado.replacedCharacter')" maxlength="1" type="text">
            </CustomInput>
        </div>

    </div>
</template>
