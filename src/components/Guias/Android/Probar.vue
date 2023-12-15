<script setup lang="ts">
import verDispositivos from "@/assets/Android/VerDispositivos.jpg";
import ticketImpreso from "@/assets/Android/TicketImpreso.jpg";
</script>
<template>
    <div>
        {{ $t("firstSteps.android.testFromPlugin.considerations") }}
        <ol class="list-inside list-decimal">
            <li>{{ $t("firstSteps.android.testFromPlugin.printerPaired") }}</li>
            <i18n-t tag="li" keypath="firstSteps.android.testFromPlugin.pluginRunningInTheBackground">
            </i18n-t>
            <i18n-t tag="li" keypath="firstSteps.android.testFromPlugin.runPluginAndGoToHome">
                <template #pluginRunning>
                    <strong>{{ $t("firstSteps.android.installPlugin.pluginRunning") }}</strong>
                </template>
            </i18n-t>
            <i18n-t tag="li" keypath="firstSteps.android.testFromPlugin.addPrinter">
                <template #pluginRunning>
                    <strong>{{ $t("firstSteps.android.installPlugin.pluginRunning") }}</strong>
                </template>
            </i18n-t>
        </ol>
        <hr class="mb-2">
        <i18n-t keypath="firstSteps.android.testFromPlugin.makeTest">
            <template #showPrinters>
                <strong>{{ $t("firstSteps.android.testFromPlugin.showPrinters") }}</strong>
            </template>
            <template #printTest>
                <strong>{{ $t("firstSteps.android.testFromPlugin.printTest") }}</strong>
            </template>
            <template #printerName>
                <strong>{{ $t("firstSteps.android.pairPrinter.printerName") }}</strong>
            </template>
        </i18n-t>
        <img class="mx-auto mb-4" :src="verDispositivos" alt="">
        <p>{{ $t("firstSteps.android.testFromPlugin.refreshList") }}</p>
        <p>{{ $t("firstSteps.android.testFromPlugin.printedSuccessfully") }}</p>
        <img class="mx-auto mb-4" :src="ticketImpreso" alt="">
    </div>
</template>