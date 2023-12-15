<script setup lang="ts">
import agregarImpresora from "@/assets/Android/AgregarImpresora.jpg"

</script>
<template>
    <div>
        <p>
            {{ $t("firstSteps.android.pairPrinter.pairPrinter") }}
        </p>
        <i18n-t keypath="firstSteps.android.pairPrinter.goToBluetooth" tag="p">
            <template #option>
                <strong>{{ $t("firstSteps.android.pairPrinter.syncNewDevice") }}</strong>
            </template>
            <template #printerName>
                <strong>{{ $t("firstSteps.android.pairPrinter.printerName") }}</strong>
            </template>
        </i18n-t>
        <img class="mx-auto" :src="agregarImpresora" alt="">
        <p>{{ $t("firstSteps.android.pairPrinter.pairingCode") }}</p>
    </div>
</template>