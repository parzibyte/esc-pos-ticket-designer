<script setup lang="ts">
import InicioImpresoras from "@/assets/ImpresoraW11/InicioImpresoras.png"
import AgregarDispositivo from "@/assets/ImpresoraW11/AgregarDispositivo.png"
import AgregarManualmente from "@/assets/ImpresoraW11/AgregarManualmente.png"
import InstalarImpresoraWindowsComun from "@/components/Guias/Desktop/Windows/InstalarWindowsComun.vue";
import AvisoFabricanteWindows from "@/components/Guias/Desktop/Windows/AvisoFabricanteWindows.vue"
</script>
<template>
    <AvisoFabricanteWindows></AvisoFabricanteWindows>
    <ul class="list-decimal list-inside">
        <i18n-t keypath="firstSteps.desktop.installPrinter.windows11.goToControlPanel" tag="li">
            <template #printers>
                <strong>{{ $t("firstSteps.desktop.installPrinter.windows11.printers") }}</strong>
            </template>
        </i18n-t>
        <img class="mx-auto mb-4" :src="InicioImpresoras">
        <i18n-t keypath="firstSteps.desktop.installPrinter.windows11.clickAddDevice" tag="li">
            <template #addDevice>
                <strong>{{ $t("firstSteps.desktop.installPrinter.windows11.addDevice") }}</strong>
            </template>
        </i18n-t>
        <img class="mx-auto mb-4" :src="AgregarDispositivo">
        <i18n-t keypath="firstSteps.desktop.installPrinter.windows11.addManually" tag="li">
            <template #printerIsNotInTheList>
                <strong>{{ $t("firstSteps.desktop.installPrinter.windows11.printerIsNotInTheList") }}</strong>
            </template>
        </i18n-t>
        <img class="mx-auto mb-4" :src="AgregarManualmente">
        <InstalarImpresoraWindowsComun></InstalarImpresoraWindowsComun>
    </ul>
</template>