<script setup lang="ts">
import agregarImpresora from "@/assets/Android/AgregarImpresora.jpg"

</script>
<template>
    <div>
        <p>
            Si nunca has impreso con tu impresora, debes seguir estos pasos. Enciende tu Bluetooth y la impresora. Si el
            manual
            o fabricante indican los pasos para colocar la impresora en modo descubrimiento, debes seguir los pasos.
        </p>
        <p>Ve a tus ajustes Bluetooth y elige <strong>Sincronizar un nuevo dispositivo</strong>, en este ejemplo la
            impresora es la
            <strong>MTP-II</strong>:
        </p>
        <img class="mx-auto" :src="agregarImpresora" alt="">
        <p>Si te pide algún código para realizar el emparejamiento revisa el manual de usuario o prueba con las
            combinaciones más comunes como
            <code>1234</code>, <code>0000</code>, <code>1111</code>, etcétera. Eso depende de tu impresora
        </p>
    </div>
</template>