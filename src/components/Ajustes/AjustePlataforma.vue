<script setup lang="ts">
const props = defineProps(["plataforma"]);
const emit = defineEmits(["guardar"]);

const guardar = () => {
    emit("guardar", props.plataforma);
}
</script>
<template>
    <div class="bg-white border p-2">
        <h1 class="text-3xl">{{ plataforma.nombre }}</h1>
        <label class="block text-lg">Ruta api</label>
        <small class="block">Tenga cuidado al modificar la ruta api. Si no sabe lo que está haciendo, no modifique el
            valor</small>
        <input v-model="plataforma.ruta_api" type="text" placeholder="URL donde la API del plugin"
            class="border border-gray-200 focus:border-blue-500 focus:border-2 rounded-md outline-none p-1 text-xl">
        <label class="block text-lg">Serial (opcional)</label>
        <textarea placeholder="Aquí va el serial, sin espacios ni comillas"
            class="w-full block border border-gray-200 focus:border-blue-500 focus:border-2 rounded-md outline-none p-1 text-xl"
            rows="5" v-model="plataforma.licencia"></textarea>
        <br>
        <button @click="guardar"
            class="mt-2 bg-blue-500 text-white font-semibold rounded-md p-2 hover:bg-blue-400">Guardar</button>
    </div>
</template>
