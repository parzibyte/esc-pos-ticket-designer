<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue';
import AjustePlataforma from "@/components/Ajustes/AjustePlataforma.vue"
import { usePlatformStore } from '@/stores/platform';
import type { PlataformaRecuperadaDeBaseDeDatos } from '@/types/Tipos';
const plataformas: Ref<PlataformaRecuperadaDeBaseDeDatos[]> = ref([]);
const platformStore = usePlatformStore();

const guardarPlataforma = async (plataforma: PlataformaRecuperadaDeBaseDeDatos) => {
    platformStore.actualizarPlataforma(plataforma);
}

onMounted(async () => {
    plataformas.value = await platformStore.obtenerPlataformas();
});
</script>
<template>
    <div>
        <AjustePlataforma @guardar="guardarPlataforma" v-for="plataforma in plataformas" :plataforma="plataforma">
        </AjustePlataforma>
    </div>
</template>