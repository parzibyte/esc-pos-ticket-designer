<script setup lang="ts">
import configuracion from "@/assets/Android/Configuracion.jpg"
import confiar from "@/assets/Android/Confiar.jpg"
import permitirInstalacion from "@/assets/Android/PermitirInstalacion.jpg"
import instalar from "@/assets/Android/Instalar.jpg"
import darPermisos from "@/assets/Android/DarPermisos.jpg"
import instalacionCorrecta from "@/assets/Android/InstalacionCorrecta.jpg"
</script>
<template>
    <div>
        <i18n-t keypath="firstSteps.android.installPlugin.locatePlugin" tag="p">
            <template #installPermission>
                <strong>{{ $t("firstSteps.android.installPlugin.installPermission") }}</strong>
            </template>
        </i18n-t>
        <img class="mx-auto mb-2" :src="configuracion" alt="">
        <p>{{ $t("firstSteps.android.installPlugin.trustSource") }}</p>
        <img class="mx-auto mb-2" :src="confiar" alt="">
        <p>{{ $t("firstSteps.android.installPlugin.allowInstall") }}</p>
        <img class="mx-auto mb-2" :src="permitirInstalacion" alt="">
        <p>{{ $t("firstSteps.android.installPlugin.install") }}</p>
        <img class="mx-auto mb-2" :src="instalar" alt="">
        <strong>{{ $t("firstSteps.android.installPlugin.forceInstall") }}</strong>
        <img class="mx-auto mb-2" :src="darPermisos" alt="">
        <i18n-t keypath="firstSteps.android.installPlugin.appPermissions">
            <template #pluginRunning>
                <strong>{{ $t("firstSteps.android.installPlugin.pluginRunning") }}</strong>
            </template>
        </i18n-t>
        <img class="mx-auto mb-2" :src="instalacionCorrecta" alt="">
        <p>{{ $t("firstSteps.android.installPlugin.nextStep") }}</p>
        <div class="p-2 text-white bg-red-500 rounded-sm">
            <i18n-t keypath="firstSteps.android.installPlugin.allowBackgroundExecution">
                <template #pluginRunning>
                    <strong>{{ $t("firstSteps.android.installPlugin.pluginRunning") }}</strong>
                </template>
            </i18n-t>
        </div>
    </div>
</template>