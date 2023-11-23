<script setup lang="ts">
import InicioImpresoras from "@/assets/ImpresoraW11/InicioImpresoras.png"
import AgregarDispositivo from "@/assets/ImpresoraW11/AgregarDispositivo.png"
import AgregarManualmente from "@/assets/ImpresoraW11/AgregarManualmente.png"
import InstalarImpresoraWindowsComun from "./InstalarImpresoraWindowsComun.vue";
import AvisoFabricanteWindows from "./AvisoFabricanteWindows.vue";
</script>
<template>
    <AvisoFabricanteWindows></AvisoFabricanteWindows>
    <ul class="list-decimal list-inside">
        <li>
            En el inicio, busca y elige <strong>Impresoras y escáneres</strong>
            <img :src="InicioImpresoras">
        </li>
        <li>Haz clic en <strong>Agregar dispositivo</strong>

            <img :src="AgregarDispositivo">
        </li>
        <li>
            Espera a que aparezca la opción y haz clic en <strong>Agregar manualmente</strong>
            <img :src="AgregarManualmente">
        </li>
        <InstalarImpresoraWindowsComun></InstalarImpresoraWindowsComun>
    </ul>
</template>