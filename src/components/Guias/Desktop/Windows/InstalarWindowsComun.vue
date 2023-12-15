<script setup lang="ts">
import agregarImpresoraLocal from "@/assets/ImpresoraWindows10YAnteriores/Agregar-impresora-local.png";
import impresoraUsb1 from "@/assets/ImpresoraWindows10YAnteriores/Impresora-usb-1.png";
import generico from "@/assets/ImpresoraWindows10YAnteriores/Drivers-genéricos.png";
import nombre from "@/assets/ImpresoraWindows10YAnteriores/Nombre-de-la-impresora.png";
import instalacionTerminada from "@/assets/ImpresoraWindows10YAnteriores/Instalación-terminada.png";
</script>
<template>
    <i18n-t keypath="firstSteps.desktop.installPrinter.commonInstructionsForWindows.manuallyAdd" tag="li">
        <template #addLocalPrinter>
            <strong>{{ $t("firstSteps.desktop.installPrinter.commonInstructionsForWindows.addLocalPrinter") }}</strong>
        </template>
        <template #next>
            <strong>{{ $t("firstSteps.desktop.installPrinter.commonInstructionsForWindows.next") }}</strong>
        </template>
    </i18n-t>
    <img class="mx-auto" :src="agregarImpresoraLocal" />
    <li>{{ $t("firstSteps.desktop.installPrinter.commonInstructionsForWindows.setupPort") }}</li>
    <img class="mx-auto" :src="impresoraUsb1" />
    <i18n-t keypath="firstSteps.desktop.installPrinter.commonInstructionsForWindows.setupDrivers" tag="li">
        <template #generic>
            <strong>{{ $t("firstSteps.desktop.installPrinter.commonInstructionsForWindows.generic") }}</strong>
        </template>
        <template #manufacturer>
            <strong>{{ $t("firstSteps.desktop.installPrinter.commonInstructionsForWindows.manufacturer") }}</strong>
        </template>
        <template #genericTextOnly>
            <strong>{{ $t("firstSteps.desktop.installPrinter.commonInstructionsForWindows.genericTextOnly") }}</strong>
        </template>
        <template #printers>
            <strong>{{ $t("firstSteps.desktop.installPrinter.commonInstructionsForWindows.printers") }}</strong>
        </template>
        <template #next>
            <strong>{{ $t("firstSteps.desktop.installPrinter.commonInstructionsForWindows.next") }}</strong>
        </template>
    </i18n-t>
    <img class="mx-auto" :src="generico" />
    <i18n-t keypath="firstSteps.desktop.installPrinter.commonInstructionsForWindows.setupName" tag="li">
        <template #nameWarning>
            <strong>{{ $t("firstSteps.desktop.installPrinter.commonInstructionsForWindows.nameWarning") }}</strong>
        </template>
        <template #next>
            <strong>{{ $t("firstSteps.desktop.installPrinter.commonInstructionsForWindows.next") }}</strong>
        </template>
    </i18n-t>
    <img class="mx-auto" :src="nombre" />
    <li>
        {{ $t("firstSteps.desktop.installPrinter.commonInstructionsForWindows.printTest") }}
    </li>
    <img class="mx-auto" :src="instalacionTerminada" />
</template>