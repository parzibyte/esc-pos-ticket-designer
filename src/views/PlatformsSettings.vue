<script setup lang="ts">
import { PlataformasService } from '@/services/PlataformasService';
import { ref, onMounted } from 'vue';
import { useDatabaseStore } from '@/stores/db';
import AjustePlataforma from "@/components/Ajustes/AjustePlataforma.vue"
const plataformas = ref([]);
const store = useDatabaseStore();
const plataformasService = new PlataformasService(store);

const guardarPlataforma = async (plataforma) => {
    await plataformasService.actualizarPlataforma(plataforma);
}

onMounted(async () => {
    plataformas.value = await plataformasService.obtenerPlataformas();
});
</script>
<template>
    <div>
        <AjustePlataforma @guardar="guardarPlataforma" v-for="plataforma in plataformas" :plataforma="plataforma">
        </AjustePlataforma>
    </div>
</template>