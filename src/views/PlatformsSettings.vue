<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AjustePlataforma from "@/components/Ajustes/AjustePlataforma.vue"
import { usePlatformStore } from '@/stores/platform';
const plataformas = ref([]);
const platformStore = usePlatformStore();

const guardarPlataforma = async (plataforma) => {
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