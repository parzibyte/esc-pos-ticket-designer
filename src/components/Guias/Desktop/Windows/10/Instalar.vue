<script setup lang="ts">
import agregarImpresora from "@/assets/ImpresoraWindows10YAnteriores/Agregar-impresora.png";
import InstalarImpresoraWindowsComun from "@/components/Guias/Desktop/Windows/InstalarWindowsComun.vue"
import AvisoFabricanteWindows from "@/components/Guias/Desktop/Windows/AvisoFabricanteWindows.vue";
</script>
<template>
    <div>
        <AvisoFabricanteWindows></AvisoFabricanteWindows>
        <ul class="list-decimal list-inside">
            <i18n-t keypath="firstSteps.desktop.installPrinter.windows10.goToControlPanel" tag="li">
                <template #controlPanel>
                    <strong>{{ $t("firstSteps.desktop.installPrinter.windows10.controlPanel") }}</strong>
                </template>
                <template #printers>
                    <strong>{{ $t("firstSteps.desktop.installPrinter.windows10.printers") }}</strong>
                </template><template #addPrinter>
                    <strong>{{ $t("firstSteps.desktop.installPrinter.windows10.addPrinter") }}</strong>
                </template>
            </i18n-t>
            <li>Ve al
                <strong>Panel de control</strong>, selecciona
                <strong>Dispositivos e impresoras</strong>, una vez ahí elige
                <strong>Agregar una impresora</strong>
            </li>
            <i18n-t keypath="firstSteps.desktop.installPrinter.windows10.addManually" tag="li">
                <template #printerIsNotInTheList>
                    <strong>{{ $t("firstSteps.desktop.installPrinter.windows10.printerIsNotInTheList") }}</strong>
                </template>
            </i18n-t>
            <img :src="agregarImpresora" class="mx-auto" alt="">
            <InstalarImpresoraWindowsComun></InstalarImpresoraWindowsComun>
        </ul>
    </div>
</template>