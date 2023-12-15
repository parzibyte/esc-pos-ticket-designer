<script setup lang="ts">
import clicDerecho from "@/assets/CompartirW10Anteriores/Click-derecho.png";
import compartir1 from "@/assets/CompartirW10Anteriores/Compartir-1.png";
import compartirImpresoraLocal from "@/assets/CompartirW10Anteriores/Compartir-2.png";
</script>
<template>
    <div>
        <ul class="list-decimal list-inside">
            <i18n-t keypath="firstSteps.desktop.sharePrinter.windows10.goToPrinters" tag="li">
                <template #controlPanel>
                    <strong>{{ $t("firstSteps.desktop.sharePrinter.windows10.controlPanel") }}</strong>
                </template>
                <template #printers>
                    <strong>{{ $t("firstSteps.desktop.sharePrinter.windows10.printers") }}</strong>
                </template>
                <template #properties>
                    <strong>{{ $t("firstSteps.desktop.sharePrinter.windows10.properties") }}</strong>
                </template>
            </i18n-t>
            <img class="mx-auto" :src="clicDerecho" />
            <i18n-t keypath="firstSteps.desktop.sharePrinter.windows10.goToShareTab" tag="li">
                <template #shareTab>
                    <strong>{{ $t("firstSteps.desktop.sharePrinter.windows10.shareTab") }}</strong>
                </template>
                <template #shareThisPrinter>
                    <strong>{{ $t("firstSteps.desktop.sharePrinter.windows10.shareThisPrinter") }}</strong>
                </template>
                <template #changeShareOptions>
                    <strong>{{ $t("firstSteps.desktop.sharePrinter.windows10.changeShareOptions") }}</strong>
                </template>
            </i18n-t>
            <img class="mx-auto" :src="compartir1" />
            <i18n-t keypath="firstSteps.desktop.sharePrinter.windows10.finishSharing" tag="li">
                <template #shareThisPrinter>
                    <strong>{{ $t("firstSteps.desktop.sharePrinter.windows10.shareThisPrinter") }}</strong>
                </template>
                <template #nameWarning>
                    <strong>{{ $t("firstSteps.desktop.sharePrinter.windows10.nameWarning") }}</strong>
                </template>
                <template #imageShared>
                    <img class="mx-auto" :src="compartirImpresoraLocal" />
                </template>
                <template #ok>
                    <strong>{{ $t("firstSteps.desktop.sharePrinter.windows10.ok") }}</strong>
                </template>
            </i18n-t>
        </ul>
    </div>
</template>