<script setup lang="ts">
import CustomInput from '../CustomInput.vue';
import CustomTextarea from '../CustomTextarea.vue';

const props = defineProps(["plataforma"]);
const emit = defineEmits(["guardar"]);

const guardar = () => {
    emit("guardar", props.plataforma);
}
</script>
<template>
    <div class="bg-white border p-2">
        <h1 class="text-3xl">{{ plataforma.nombre }}</h1>
        <CustomInput v-model="plataforma.ruta_api" type="text" placeholder="URL API del plugin" label="Ruta API">
        </CustomInput>
        <small class="block">Tenga cuidado al modificar la ruta api. Si no sabe lo que está haciendo, no modifique el
            valor</small>
        <CustomTextarea v-model="plataforma.licencia" placeholder="Serial sin espacios ni comillas" rows="5"
            label="Serial (Opcional)"></CustomTextarea>
        <button @click="guardar"
            class="mt-2 bg-blue-500 text-white font-semibold rounded-md p-2 hover:bg-blue-400">Guardar</button>
    </div>
</template>
