<script setup lang="ts">
import agregarImpresora from "@/assets/ImpresoraWindows10YAnteriores/Agregar-impresora.png";
import InstalarImpresoraWindowsComun from "@/components/Guias/Desktop/Windows/InstalarWindowsComun.vue"
import AvisoFabricanteWindows from "@/components/Guias/Desktop/Windows/AvisoFabricanteWindows.vue";
</script>
<template>
    <div>
        <AvisoFabricanteWindows></AvisoFabricanteWindows>
        <ul class="list-decimal list-inside">
            <li>Ve al
                <strong>Panel de control</strong>, selecciona
                <strong>Dispositivos e impresoras</strong>, una vez ahí elige
                <strong>Agregar una impresora</strong>
            </li>
            <li>Espera a que aparezca la opción
                <strong>La impresora deseada no está en la lista</strong>
                y haz clic en ella
                <img class="mx-auto" :src="agregarImpresora">
            </li>
            <InstalarImpresoraWindowsComun></InstalarImpresoraWindowsComun>
        </ul>
    </div>
</template>