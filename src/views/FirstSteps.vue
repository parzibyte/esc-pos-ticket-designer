<script setup lang="ts">
import CustomCheckbox from '@/components/CustomCheckbox.vue';
import SelectPlataformas from '@/components/Selects/SelectPlataformas.vue';
import { usePingPlatformStore } from '@/stores/ping_platform';
import { computed, ref } from 'vue';
import imagenExtraerDesktop from "@/assets/Extraer_plugin.png";
import imagenEjecutar from "@/assets/Desktop_ejecutar.png";
import desktopPermisos from "@/assets/Desktop_permisos.gif";
import DesktopWindows from "@/components/Guias/DesktopWindows.vue";
import ImpresoraWindows10YAnteriores from "@/components/Guias/ImpresoraWindows10YAnteriores.vue";
import CompartirDesktop from "@/components/Guias/CompartirDesktop.vue";
import ImpresoraW11 from '@/components/Guias/ImpresoraW11.vue';
import InstalarImpresoraWindowsComun from '@/components/Guias/InstalarImpresoraWindowsComun.vue';
import InstalarImpresoraWindows from '@/components/Guias/InstalarImpresoraWindows.vue';
import Instalar from "@/components/Guias/Desktop/Instalar.vue"
import Compartir from "@/components/Guias/Desktop/Compartir.vue"
import Descargar from "@/components/Guias/Desktop/Descargar.vue"
const pingStore = usePingPlatformStore();
const plataforma = ref({});
const estaConectado = computed(() => {
    if (!plataforma.value.id) {
        return false;
    }
    const estadoDePlataforma = pingStore.estado[plataforma.value.id];
    if (!estadoDePlataforma) {
        return false;
    }
    return estadoDePlataforma.detalles;
});

const indicePaso = ref(0);
const clase = (indice: number) => {
    if (indice === indicePaso.value) {
        return "border-b-2 border-b-indigo-500 text-indigo-500";
    }
    return "";
}
</script>
<template>
    <div>
        <SelectPlataformas v-model="plataforma"></SelectPlataformas>
        <div class="flex flex-row overflow-x-auto">
            <div @click="indicePaso = indice" class="cursor-pointer pt-1 pb-2 px-2 w-fit min-w-fit" :class="clase(indice)"
                v-for="(paso, indice) in ['1: Instalar impresora', '2: Compartir impresora', '3: Descargar plugin', '4: Ejecutar plugin', '5: Prueba de impresión']">
                {{ paso }}
            </div>
        </div>
        <Instalar v-if="indicePaso === 0"></Instalar>
        <Compartir v-if="indicePaso === 1"></Compartir>
        <Descargar v-if="indicePaso === 2"></Descargar>

        <p>El plugin es compatible con impresoras térmicas con el protocolo ESC POS. No es compatible con impresoras de
            etiquetas</p>
        <p>{{ plataforma }}</p>
        <strong>{{ estaConectado }}</strong>
    </div>
</template>