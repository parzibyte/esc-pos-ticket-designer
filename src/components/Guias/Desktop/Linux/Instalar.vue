<script setup lang="ts">
import BloqueDeCodigo from "@/components/FragmentosCodigo/BloqueDeCodigo.vue";
import listar from "@/assets/Linux/Listar.png";
import gid from "@/assets/Linux/Gid.png";
const codigoImprimir = `echo "Imprimiendo en una impresora termica en Linux desde el blog de parzibyte (parzibyte.me/blog)" >> /dev/usb/lp1`;
</script>
<template>
    <div>
        <p>{{ $t("firstSteps.desktop.installPrinter.linux.commandWarning") }}</p>
        <ol class="list-inside list-decimal">
            <i18n-t keypath="firstSteps.desktop.installPrinter.linux.showPrinters" tag="li">
                <template #commandListPrinters>
                    <BloqueDeCodigo codigo="ls /dev/usb"></BloqueDeCodigo>
                </template>
                <template #myPrinter>
                    <code>{{ $t("firstSteps.desktop.installPrinter.linux.myPrinter") }}</code>
                </template>
            </i18n-t>
            <img :src="listar" class="my-2">
            <i18n-t keypath="firstSteps.desktop.installPrinter.linux.checkGroup" tag="li">
                <template #commandStat>
                    <BloqueDeCodigo codigo="stat /dev/usb/lp1"></BloqueDeCodigo>
                </template>
                <template #gid>
                    <strong>{{ $t("firstSteps.desktop.installPrinter.linux.gid") }}</strong>
                </template>
                <template #group>
                    <code>{{ $t("firstSteps.desktop.installPrinter.linux.group") }}</code>
                </template>
            </i18n-t>
            <img :src="gid" alt="">
            <i18n-t keypath="firstSteps.desktop.installPrinter.linux.addUser" tag="li">
                <template #myUser>
                    <code>{{ $t("firstSteps.desktop.installPrinter.linux.myUser") }}</code>
                </template>
                <template #commandToAddUser>
                    <BloqueDeCodigo codigo="sudo usermod -a -G lp parzibyte"></BloqueDeCodigo>
                </template>
            </i18n-t>
            <li>{{ $t("firstSteps.desktop.installPrinter.linux.reboot") }}</li>
            <i18n-t keypath="firstSteps.desktop.installPrinter.linux.testPrinter" tag="li">
                <template #printerName>
                    <code>{{ $t("firstSteps.desktop.installPrinter.linux.myPrinter") }}</code>
                </template>
                <template #commandToPrint>

                    <BloqueDeCodigo :codigo="codigoImprimir"></BloqueDeCodigo>
                </template>
            </i18n-t>
            <li>{{ $t("firstSteps.desktop.installPrinter.linux.printedSuccessfully") }}</li>
        </ol>
    </div>
</template>