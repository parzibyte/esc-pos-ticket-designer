<script setup lang="ts">
import { defineProps, onMounted, ref, type Ref } from "vue"
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
const canvas = ref(null);
const BIT_ENCENDIDO = "1",
    BIT_APAGADO = "0";
let arregloDeCaracter = Array(24).fill(false).map(() => Array(12).fill(BIT_APAGADO))
function getCursorPosition(canvas, event: any) {
    const rect = canvas.value.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return [x, y];
}

const convertirArregloACadenaParaCaracter = arreglo => {
    return arreglo.map(fila => fila.join("")).join("\n");
}

const MEDIDA_CUADRO = 10;
const limpiarCanvas = () => {
    arregloDeCaracter = arregloDeCaracter.map(fila => {
        return fila.map(cadena => BIT_APAGADO);
    });
    dibujar();
};
const dibujar = () => {
    const contexto = canvas.value.getContext("2d");
    let y = 0, x = 0;
    for (const fila of arregloDeCaracter) {
        x = 0;
        for (const bit of fila) {
            contexto.beginPath();
            // Indicamos el color que usaremos
            if (bit === BIT_ENCENDIDO) {
                contexto.fillStyle = "black"
            } else {
                contexto.fillStyle = "white"
            }
            contexto.rect(x, y, MEDIDA_CUADRO, MEDIDA_CUADRO);
            if (bit === BIT_ENCENDIDO) {
                contexto.strokeStyle = "black";
                contexto.fill();
            } else {
                contexto.strokeStyle = "#e2e8f0";
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
onMounted(() => {
    canvas.value.width = arregloDeCaracter[0].length * MEDIDA_CUADRO;
    canvas.value.height = arregloDeCaracter.length * MEDIDA_CUADRO;
    ["mousedown", "touchstart"].forEach(nombreEvento => {
        canvas.value.addEventListener(nombreEvento, () => {
            isDrawing = true;
        });
    });

    ["mouseup", "touchend"].forEach(nombreEvento => {
        canvas.value.addEventListener(nombreEvento, () => {
            isDrawing = false;
        });
    });
    ["mousemove", "click"].forEach(nombreEvento => {
        canvas.value.addEventListener(nombreEvento, (evento) => {
            evento.preventDefault();
            //evento.preventDefault();
            if (!isDrawing && evento.type !== "click") {
                return;
            }
            const [x, y] = getCursorPosition(canvas, evento);
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
</script>

<template>
    <button class="text-white p-1" @click="onClickEnBoton(boton)" v-for="boton in botones" :class="obtenerClases(boton)">
        <component :is="boton.icono"></component>
    </button>
    <canvas ref="canvas" class="border border-zinc-100"></canvas>
</template>
