<script setup lang="ts">
import SelectPlataformas from '@/components/Selects/SelectPlataformas.vue';
import { ref, type Ref } from 'vue';
import Desktop from '@/components/Guias/Desktop.vue';
import Android from '@/components/Guias/Android.vue';
import type { PlataformaRecuperadaDeBaseDeDatos } from '@/types/Tipos';
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
        <p class="p-2">
            <strong>Nota:</strong>
            El plugin es compatible con impresoras térmicas con el protocolo ESC POS; no es compatible con impresoras de
            etiquetas (o al menos no he probado). En Desktop solo es compatible con impresoras USB conectadas al lugar donde
            el plugin está en
            ejecución; en Android solo es compatible con impresoras Bluetooth
        </p>
        <SelectPlataformas v-model="plataforma"></SelectPlataformas>
        <Desktop v-if="plataforma.nombre === 'Desktop'" :plataforma="plataforma"></Desktop>
        <Android v-if="plataforma.nombre === 'Android'" :plataforma="plataforma"></Android>
    </div>
</template>