<script setup lang="ts">
import ImagenCompartirW11 from "@/assets/ImpresoraW11/CompartirW11.png";
</script>
<template>
    <div>
        <ul class="list-decimal list-inside">
            <i18n-t keypath="firstSteps.desktop.sharePrinter.windows11.goToPrinters" tag="li">
                <template #printers>
                    <strong>{{ $t("firstSteps.desktop.sharePrinter.windows11.printers") }}</strong>
                </template>
                <template #printerSettings>
                    <strong>{{ $t("firstSteps.desktop.sharePrinter.windows11.printerSettings") }}</strong>
                </template>
                <template #properties>
                    <strong>{{ $t("firstSteps.desktop.sharePrinter.windows11.properties") }}</strong>
                </template>
            </i18n-t>
            <i18n-t keypath="firstSteps.desktop.sharePrinter.windows11.goToShareTab" tag="li">
                <template #shareTab>
                    <strong>{{ $t("firstSteps.desktop.sharePrinter.windows11.shareTab") }}</strong>
                </template>
                <template #shareThisPrinter>
                    <strong>{{ $t("firstSteps.desktop.sharePrinter.windows11.shareThisPrinter") }}</strong>
                </template>
                <template #changeShareOptions>
                    <strong>{{ $t("firstSteps.desktop.sharePrinter.windows11.changeShareOptions") }}</strong>
                </template>
            </i18n-t>
            <i18n-t keypath="firstSteps.desktop.sharePrinter.windows11.finishSharing" tag="li">
                <template #shareThisPrinter>
                    <strong>{{ $t("firstSteps.desktop.sharePrinter.windows11.shareThisPrinter") }}</strong>
                </template>
                <template #nameWarning>
                    <strong>{{ $t("firstSteps.desktop.sharePrinter.windows11.nameWarning") }}</strong>
                </template>
                <template #ok>
                    <strong>{{ $t("firstSteps.desktop.sharePrinter.windows11.ok") }}</strong>
                </template>
            </i18n-t>
        </ul>
        <img class="mx-auto" :src="ImagenCompartirW11" />
    </div>
</template>