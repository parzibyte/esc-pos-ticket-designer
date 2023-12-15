<script setup lang="ts">
import descargar from "@/assets/Android/DescargarPlugin.png";
import forzarDescarga from "@/assets/Android/ForzarDescarga.jpg";
</script>
<template>
    <div>
        <i18n-t keypath="firstSteps.android.downloadPlugin.goToDownloadLink" tag="p">
            <template #assets>
                <strong>{{ $t("firstSteps.android.downloadPlugin.assets") }}</strong>
            </template>
            <template #pluginName>
                <code class="break-all">{{ $t("firstSteps.android.downloadPlugin.pluginName") }}</code>
            </template>
            <template #downloadLink>
                <a class="text-blue-500 hover:text-blue-600 hover:font-semibold" target="_blank"
                    :href="$t('firstSteps.android.downloadPlugin.downloadLink')">{{
                        $t('firstSteps.android.downloadPlugin.downloadLink')
                    }}</a>
            </template>
        </i18n-t>
        <img class="mx-auto" :src="descargar" alt="">
        <div class="bg-indigo-500 text-white p-2 my-2 rounded-sm">
            {{ $t("firstSteps.android.downloadPlugin.pluginIsSafe", {
                forceDownload:
                    $t("firstSteps.android.downloadPlugin.forceDownload")
            }) }}
        </div>
        <img class="mx-auto" :src="forzarDescarga" alt="">
        <div>
            {{ $t("firstSteps.android.downloadPlugin.onceDownloaded") }}
        </div>
    </div>
</template>