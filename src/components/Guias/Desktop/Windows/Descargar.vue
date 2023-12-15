<script setup lang="ts">
import imagenDescargarDesktop from "@/assets/Desktop_descargar.png";
import imagenExtraerDesktop from "@/assets/Extraer_plugin.png";
import imagenEjecutar from "@/assets/Desktop_ejecutar.png";
import desktopPermisos from "@/assets/Desktop_permisos.gif";
import PluginEnEjecucionWindows from "@/assets/PluginEnEjecucionWindows.png";
</script>
<template>
    <ol class="list-inside list-decimal">
        <i18n-t keypath="firstSteps.desktop.downloadAndExecutePlugin.windows.navigateToPluginDownload" tag="li">
            <template #link>
                <a class="text-blue-500 font-semibold hover:text-blue-600"
                    href="https://github.com/parzibyte/plugin-impresora-termica-v3/releases/latest" target="_blank">
                    https://github.com/parzibyte/plugin-impresora-termica-v3/releases/latest</a>
            </template>
        </i18n-t>
        <i18n-t keypath="firstSteps.desktop.downloadAndExecutePlugin.windows.unknownArch" tag="li">
            <template #plugin64>
                <code>{{ $t("firstSteps.desktop.downloadAndExecutePlugin.windows.plugin64") }}</code>
            </template>
        </i18n-t>
        <i18n-t keypath="firstSteps.desktop.downloadAndExecutePlugin.windows.knownArch" tag="li">
            <template #plugin64>
                <code>{{ $t("firstSteps.desktop.downloadAndExecutePlugin.windows.plugin64") }}</code>
            </template>
            <template #plugin32>
                <code>{{ $t("firstSteps.desktop.downloadAndExecutePlugin.windows.plugin32") }}</code>
            </template>
        </i18n-t>
        <i18n-t keypath="firstSteps.desktop.downloadAndExecutePlugin.windows.compatibility" tag="li">
            <template #plugin32>
                <code>{{ $t("firstSteps.desktop.downloadAndExecutePlugin.windows.plugin32") }}</code>
            </template>
        </i18n-t>
    </ol>

    <img class="mx-auto" :src="imagenDescargarDesktop" alt="">
    <div class="bg-red-500 rounded-md  p-2 text-white">
        <i18n-t keypath="firstSteps.desktop.downloadAndExecutePlugin.windows.antivirusesWarning" tag="p">
            <template #pluginIsSecure>
                <strong>{{ $t("firstSteps.desktop.downloadAndExecutePlugin.windows.pluginIsSecure") }}</strong>
            </template>
        </i18n-t>

    </div>
    <i18n-t keypath="firstSteps.desktop.downloadAndExecutePlugin.windows.onceDownloaded" tag="p">
        <template #mandatoryToExtract>
            <strong>{{ $t("firstSteps.desktop.downloadAndExecutePlugin.windows.mandatoryToExtract") }}</strong>
        </template>
    </i18n-t>
    <img :src="imagenExtraerDesktop" alt="">
    <p>
        {{ $t("firstSteps.desktop.downloadAndExecutePlugin.windows.onceExtracted") }}
    </p>
    <img class="mx-auto" :src="imagenEjecutar" alt="">
    <div class="my-2 bg-red-500 rounded-md  p-2 text-white">
        <i18n-t keypath="firstSteps.desktop.downloadAndExecutePlugin.windows.secondWarning" tag="p">
            <template #moreInfo>
                <strong>{{ $t("firstSteps.desktop.downloadAndExecutePlugin.windows.moreInfo") }}</strong>
            </template>
            <template #advancedOptions>
                <strong>{{ $t("firstSteps.desktop.downloadAndExecutePlugin.windows.advancedOptions") }}</strong>
            </template>
            <template #givePermissions>
                <strong>{{ $t("firstSteps.desktop.downloadAndExecutePlugin.windows.givePermissions") }}</strong>
            </template>
        </i18n-t>
    </div>
    <img class="mx-auto" :src="desktopPermisos" alt="">
    <i18n-t keypath="firstSteps.desktop.downloadAndExecutePlugin.windows.executionError" tag="p">
        <template #plugin32>
            <code>{{ $t("firstSteps.desktop.downloadAndExecutePlugin.windows.plugin32") }}</code>
        </template>
    </i18n-t>
    <strong>{{ $t("firstSteps.desktop.downloadAndExecutePlugin.windows.noErrors") }}</strong>
    <i18n-t keypath="firstSteps.desktop.downloadAndExecutePlugin.windows.finalCheck" tag="p">
        <template #keyCommand>
            (<code>CTRL + SHIFT + ESC</code>)
        </template>
        <template #details>
            <strong>{{ $t("firstSteps.desktop.downloadAndExecutePlugin.windows.details") }}</strong>
        </template>
    </i18n-t>
    <img :src="PluginEnEjecucionWindows" alt="">
</template>