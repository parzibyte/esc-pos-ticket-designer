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
        <CustomInput v-model="plataforma.ruta_api" type="text" :placeholder="$t('platformSetting.apiEndpointPlaceholder')"
            :label="$t('platformSetting.apiEndpoint')">
        </CustomInput>
        <small class="block">{{ $t("platformSetting.apiEndpointWarning") }}</small>
        <CustomTextarea v-model="plataforma.licencia" :placeholder="$t('platformSetting.serialPlaceholder')" rows="5"
            :label="$t('platformSetting.serial')"></CustomTextarea>
        <button @click="guardar" class="mt-2 bg-blue-500 text-white font-semibold rounded-md p-2 hover:bg-blue-400">{{
            $t("save") }}</button>
    </div>
</template>
