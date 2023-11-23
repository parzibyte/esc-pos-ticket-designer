<script setup lang="ts">
import SelectPlataformas from '@/components/Selects/SelectPlataformas.vue';
import { usePingPlatformStore } from '@/stores/ping_platform';
import { computed, ref } from 'vue';
import Desktop from '@/components/Guias/Desktop.vue';
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

</script>
<template>
    <div>
        <p>El plugin es compatible con impresoras térmicas con el protocolo ESC POS. No es compatible con impresoras de
            etiquetas</p>
        <SelectPlataformas v-model="plataforma"></SelectPlataformas>
        <Desktop v-if="plataforma.nombre === 'Desktop'" :plataforma="plataforma"></Desktop>
    </div>
</template>