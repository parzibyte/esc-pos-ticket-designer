<script setup lang="ts">
import imagenDescargarDesktop from "@/assets/Descargar_linux_raspbian.png";
import BloqueDeCodigo from "@/components/FragmentosCodigo/BloqueDeCodigo.vue";
import EjecutarPluginLinux from "@/assets/Ejecutando-plugin-para-impresora-termica-en-Linux.png"
</script>
<template>
    <ol class="list-inside list-decimal">
        <i18n-t keypath="firstSteps.desktop.downloadAndExecutePlugin.linux.navigateToPluginDownload" tag="li">
            <template #link>
                <a class="text-blue-500 font-semibold hover:text-blue-600"
                    href="https://github.com/parzibyte/plugin-impresora-termica-v3/releases/latest" target="_blank">
                    https://github.com/parzibyte/plugin-impresora-termica-v3/releases/latest</a>
            </template>
        </i18n-t>
        <i18n-t keypath="firstSteps.desktop.downloadAndExecutePlugin.linux.debianBased" tag="li">
            <template #plugin_debian>
                <code>{{ $t("firstSteps.desktop.downloadAndExecutePlugin.linux.debian") }}</code>
            </template>
        </i18n-t>
        <i18n-t keypath="firstSteps.desktop.downloadAndExecutePlugin.linux.raspberryPiOSBased" tag="li">
            <template #plugin_raspberry>
                <code>{{ $t("firstSteps.desktop.downloadAndExecutePlugin.linux.raspberryPiOS") }}</code>
            </template>
        </i18n-t>
    </ol>
    <img :src="imagenDescargarDesktop" alt="">
    <div class="bg-red-500 rounded-md my-2 p-2 text-white">
        <i18n-t keypath="firstSteps.desktop.downloadAndExecutePlugin.linux.forceDownload" tag="p">
            <template #pluginSafe>
                <strong>{{ $t("firstSteps.desktop.downloadAndExecutePlugin.linux.pluginSafe") }}</strong>
            </template>
        </i18n-t>
    </div>
    <i18n-t keypath="firstSteps.desktop.downloadAndExecutePlugin.linux.onceDownloaded" tag="p">
        <template #zipUtility>
            <code>unzip</code>
        </template>
        <template #unzipCode>
            <BloqueDeCodigo :codigo="`unzip ${$t('firstSteps.desktop.downloadAndExecutePlugin.linux.zipName')}`">
            </BloqueDeCodigo>
        </template>
    </i18n-t>
    <i18n-t keypath="firstSteps.desktop.downloadAndExecutePlugin.linux.onceExtracted" tag="p">
        <template #codeToGivePermission>
            <BloqueDeCodigo
                :codigo="`sudo chmod +x ${$t('firstSteps.desktop.downloadAndExecutePlugin.linux.pluginsName')}`">
            </BloqueDeCodigo>
        </template>
    </i18n-t>
    <i18n-t keypath="firstSteps.desktop.downloadAndExecutePlugin.linux.execute" tag="p">
        <template #cd>
            <code>cd</code>
        </template>
        <template #codeToExecutePlugin>
            <BloqueDeCodigo :codigo="`./${$t('firstSteps.desktop.downloadAndExecutePlugin.linux.pluginsName')}`">
            </BloqueDeCodigo>
        </template>
    </i18n-t>
    <p>{{ $t("firstSteps.desktop.downloadAndExecutePlugin.linux.exampleLook") }}</p>
    <img :src="EjecutarPluginLinux">
    <i18n-t keypath="firstSteps.desktop.downloadAndExecutePlugin.linux.backgroundExecute" tag="p">
        <template #codeToRunInBackground>
            <BloqueDeCodigo :codigo="`./${$t('firstSteps.desktop.downloadAndExecutePlugin.linux.pluginsName')} 2>1 &`">
            </BloqueDeCodigo>
        </template>
    </i18n-t>
    <strong>{{ $t('firstSteps.desktop.downloadAndExecutePlugin.linux.goToNextStep') }}</strong>
</template>