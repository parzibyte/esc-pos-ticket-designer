<script setup lang="ts">
import descargar from "@/assets/portada.jpg";
</script>
<template>
    <div class="p-1 items-center flex flex-col">
        <a href="https://www.youtube.com/watch?v=8a4ZgqSsnbs" target="_blank" class="hover:text-blue-500">
            <p class="text-xl">{{ $t("guiaEn2Minutos") }}</p>
        </a>
        <a target="_blank" href="https://www.youtube.com/watch?v=8a4ZgqSsnbs">
            <img class="hover:border-blue-500 hover:border-2 mx-auto max-w-xl rounded-md" :src="descargar" alt="">
        </a>
    </div>
</template>