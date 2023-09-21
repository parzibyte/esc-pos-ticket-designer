<script setup lang="ts">

import { ref, onBeforeMount, watch, defineProps, withDefaults, computed } from "vue"
import { TiposParaArgumento, type OperacionDelDiseñador, type ArgumentoDeFuncion } from '@/types/Tipos';

import Delete from 'vue-material-design-icons/Delete.vue';
import CampoInput from "./CampoInput.vue"
import DefinirCaracterPersonalizado from "./DefinirCaracterPersonalizado.vue"

type MyComponentProps = {
    argumento: ArgumentoDeFuncion,
    operacion: OperacionDelDiseñador,
};
const props = defineProps<MyComponentProps>();
</script>
<template>
    <template v-if="argumento.tipo === TiposParaArgumento.Number || argumento.tipo === TiposParaArgumento.String">
        <CampoInput :tipo="argumento.tipo === TiposParaArgumento.String ? 'text' : 'number'" />
    </template>
    <template v-if="argumento.tipo === TiposParaArgumento.LongString">
        <DefinirCaracterPersonalizado />
    </template>
</template>