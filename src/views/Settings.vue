<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useSettingsStore } from '@/stores/settings';
import CustomCheckbox from '@/components/CustomCheckbox.vue';
const settingsStore = useSettingsStore();
const ajustes = ref({
    modo_programador: false,
});


const guardar = async () => {
    await settingsStore.guardarAjustes(Number(ajustes.value.modo_programador));
}

onMounted(async () => {
    const ajustesRecuperados = await settingsStore.obtenerAjustes();
    ajustes.value = {
        modo_programador: ajustesRecuperados.modo_programador === 1,
    }
});
</script>
<template>
    <div>
        <CustomCheckbox v-model="ajustes.modo_programador" label="Modo desarrollador"></CustomCheckbox>
        <button class="bg-green-500 text-white p-2 rounded-md m-2 font-semibold hover:bg-green-400" @click="guardar">Guardar</button>
    </div>
</template>