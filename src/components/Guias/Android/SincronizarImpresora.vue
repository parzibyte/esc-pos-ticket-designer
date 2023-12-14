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
        <p>Si te pide algún código para realizar el emparejamiento revisa el manual de usuario o prueba con las
            combinaciones más comunes como
            <code>1234</code>, <code>0000</code>, <code>1111</code>, etcétera. Eso depende de tu impresora
        </p>
    </div>
</template>