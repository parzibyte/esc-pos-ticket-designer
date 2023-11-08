<script lang="ts" setup>
import type { Diseño } from '@/types/Tipos';

import { useDatabaseStore } from "@/stores/db"
import { convertirOperacionesSerializadasAReactivas, obtenerPayloadComoJson } from '@/Helpers';
import Printer from "vue-material-design-icons/Printer.vue";
import { emit } from 'process';
const store = useDatabaseStore();
const props = withDefaults(defineProps<{
    diseño: Diseño,
}>(), {
    diseño: () => {
        return {
            id: 0,
            nombre: "",
            fechaModificacion: "",
        };
    }
});

const emit = defineEmits(["error", "exito"]);

const imprimir = async () => {
    const operacionesRecuperadasDeBaseDeDatos = await store.obtenerOperacionesDeDiseño(props.diseño.id);
    const payload = obtenerPayloadComoJson(
        props.diseño.plataforma,
        convertirOperacionesSerializadasAReactivas(operacionesRecuperadasDeBaseDeDatos),
        props.diseño.impresora,
        props.diseño.licencia,
    );
    try {
        const httpResponse = await fetch(`${props.diseño.ruta_api}/imprimir`, {
            method: "POST",
            body: payload,
        });
        const respuesta = await httpResponse.json();
        if (respuesta === true) {
            emit("exito");
        } else {
            emit("error", respuesta);
        }
    } catch (e) {
        console.log({ e });
        emit("error", e);
    }
}
</script>
<template>
    <button @click="imprimir"
        class="rounded-md px-3 py-2 m-1 bg-sky-500 text-white hover:bg-sky-400 text-sm font-semibold inline-flex items-center">
        <Printer></Printer>
        Imprimir
    </button>
</template>