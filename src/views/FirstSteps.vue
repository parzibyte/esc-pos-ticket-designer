<script setup lang="ts">
import SelectPlataformas from '@/components/Selects/SelectPlataformas.vue';
import { ref, type Ref } from 'vue';
import Desktop from '@/components/Guias/Desktop.vue';
import Android from '@/components/Guias/Android.vue';
import type { PlataformaRecuperadaDeBaseDeDatos } from '@/types/Tipos';
import { plataformaEsAndroid } from '@/Helpers';
const plataforma: Ref<PlataformaRecuperadaDeBaseDeDatos> = ref({
    ruta_api: "",
    licencia: "",
    id: 0,
    nombre: "",
    descripcion: "",
});

</script>
<template>
    <div>
        <p class="p-2">{{ $t("firstSteps.pluginCompatibility") }}</p>
        <SelectPlataformas v-model="plataforma"></SelectPlataformas>
        <Desktop v-if="plataforma && plataforma.nombre === 'Desktop'" :plataforma="plataforma"></Desktop>
        <Android v-if="plataforma && plataforma.nombre === 'Android'" :plataforma="plataforma"></Android>
    </div>
</template>