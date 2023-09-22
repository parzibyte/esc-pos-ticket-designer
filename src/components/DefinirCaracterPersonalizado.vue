<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue"
import Brush from 'vue-material-design-icons/Brush.vue';
import Eraser from 'vue-material-design-icons/Eraser.vue';
import Broom from 'vue-material-design-icons/Broom.vue';
enum Accion {
    Borrar,
    Pintar,
    Limpiar,
}

type Boton = {
    icono: Object,
    seleccionado: boolean,
    clases: string,
    clasesSeleccionado: string,
    accion: Accion,
}
let isDrawing = false;
let matriz: Ref<string> = ref("");
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
let verdaderoCanvas: HTMLCanvasElement;
let contexto: CanvasRenderingContext2D;
const BIT_ENCENDIDO = "1",
    BIT_APAGADO = "0",
    MEDIDA_CUADRO = 10,
    COLOR_NEGRO = "black",
    COLOR_BLANCO = "white",
    COLOR_GRIS = "#e2e8f0";
let arregloDeCaracter: Array<Array<string>>;

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

const convertirArregloACadenaParaCaracter = (arreglo: Array<Array<string>>) => {
    return arreglo.map(fila => fila.join("")).join("\n");
}

const limpiarCanvas = () => {
    arregloDeCaracter = Array(24).fill(false).map(() => Array(12).fill(BIT_APAGADO))
    dibujar();
};

const dibujar = () => {
    let y = 0, x = 0;
    for (const fila of arregloDeCaracter) {
        x = 0;
        for (const bit of fila) {
            contexto?.beginPath();
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
    matriz.value = convertirArregloACadenaParaCaracter(arregloDeCaracter);
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
    limpiarCanvas();
    verdaderoCanvas.width = arregloDeCaracter[0].length * MEDIDA_CUADRO;
    verdaderoCanvas.height = arregloDeCaracter.length * MEDIDA_CUADRO;
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
            if (indiceX > arregloDeCaracter[0].length - 1 || indiceY > arregloDeCaracter.length - 1) {
                return;
            }
            if (accionSeleccionada.value === Accion.Pintar) {
                arregloDeCaracter[indiceY][indiceX] = BIT_ENCENDIDO;
            } else if (accionSeleccionada.value === Accion.Borrar) {
                arregloDeCaracter[indiceY][indiceX] = BIT_APAGADO;
            }
            dibujar();
        });
    });
    dibujar();
})
</script>

<template>
    <button class="text-white p-1" @click="onClickEnBoton(boton)" v-for="boton in botones" :class="obtenerClases(boton)">
        <component :is="boton.icono"></component>
    </button>
    <canvas ref="canvas" class="border border-zinc-100"></canvas>
</template>
