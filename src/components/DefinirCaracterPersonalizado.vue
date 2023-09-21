<script setup lang="ts">
import { defineProps, onMounted, ref } from "vue"

const canvas = ref(null);
const BIT_ENCENDIDO = "1",
    BIT_APAGADO = "0";
const arregloDeCaracter = [
    ["0", "0", "0", "0", "0", "1", "1", "1", "1", "0", "0", "0"],
    ["0", "0", "0", "0", "1", "0", "0", "0", "0", "1", "0", "0"],
    ["0", "0", "0", "1", "0", "0", "0", "1", "1", "1", "1", "0"],
    ["0", "0", "0", "1", "0", "0", "1", "0", "0", "0", "0", "1"],
    ["0", "1", "1", "1", "0", "0", "1", "0", "0", "0", "0", "1"],
    ["0", "1", "0", "1", "0", "0", "1", "0", "0", "0", "0", "1"],
    ["0", "1", "0", "1", "0", "0", "1", "0", "0", "0", "0", "1"],
    ["0", "1", "0", "1", "0", "0", "0", "1", "1", "1", "1", "0"],
    ["0", "1", "0", "1", "0", "0", "0", "0", "0", "0", "1", "0"],
    ["0", "1", "1", "1", "0", "0", "0", "0", "0", "0", "1", "0"],
    ["0", "0", "0", "1", "0", "0", "1", "1", "1", "0", "1", "0"],
    ["0", "0", "0", "1", "0", "0", "1", "0", "1", "0", "1", "0"],
    ["0", "0", "0", "1", "1", "1", "1", "0", "1", "1", "1", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["1", "1", "1", "0", "1", "0", "1", "0", "1", "1", "1", "0"],
    ["1", "0", "0", "0", "1", "0", "1", "0", "1", "0", "0", "0"],
    ["1", "1", "1", "0", "1", "0", "1", "0", "1", "1", "1", "0"],
    ["0", "0", "1", "0", "1", "0", "1", "0", "0", "0", "1", "0"],
    ["1", "1", "1", "0", "1", "1", "1", "0", "1", "1", "1", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
];
function getCursorPosition(canvas, event: any) {
    const rect = canvas.value.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return [x, y];
}

const convertirArregloACadenaParaCaracter = arreglo => {
    return arreglo.map(fila => fila.join("")).join("\n");
}

const MEDIDA_CUADRO = 5;
let matriz = "";
const dibujar = () => {
    const contexto = canvas.value.getContext("2d");
    // Tomado de https://parzibyte.me/blog/2020/10/31/dibujar-arreglo-canvas-javascript/

    // Comenzar a dibujar
    // x e y nos van a ayudar a dibujar usando las medidas de pixeles
    let y = 0, x = 0;
    for (const fila of arregloDeCaracter) {
        x = 0;
        for (const bit of fila) {
            // Indicamos el color que usaremos
            if (bit === BIT_ENCENDIDO) {
                contexto.fillStyle = "black"
            } else {
                contexto.fillStyle = "white"
            }
            // Y creamos el rectángulo en la posición X con Y, usando la misma altura y anchura
            contexto.fillRect(x, y, MEDIDA_CUADRO, MEDIDA_CUADRO);
            x += MEDIDA_CUADRO;
        }
        y += MEDIDA_CUADRO;
    }
    matriz = convertirArregloACadenaParaCaracter(arregloDeCaracter);
};
onMounted(() => {


    canvas.value.width = arregloDeCaracter[0].length * MEDIDA_CUADRO;
    canvas.value.height = arregloDeCaracter.length * MEDIDA_CUADRO;
    canvas.value.addEventListener("click", (evento) => {
        const [x, y] = getCursorPosition(canvas, evento);
        const indiceX = Math.floor(x / MEDIDA_CUADRO), indiceY = Math.floor(y / MEDIDA_CUADRO);
        if (indiceX < 0 || indiceY < 0) {
            return;
        }
        if (indiceX > arregloDeCaracter[0].length - 1 || indiceY > arregloDeCaracter.length - 1) {
            return;
        }
        if (arregloDeCaracter[indiceY][indiceX] == BIT_APAGADO) {
            arregloDeCaracter[indiceY][indiceX] = BIT_ENCENDIDO;
        } else {
            arregloDeCaracter[indiceY][indiceX] = BIT_APAGADO;
        }
        dibujar();
    });
    dibujar();

})

</script>

<template>
    {{ matriz }}
    <canvas ref="canvas" class="border border-zinc-500"></canvas>
</template>