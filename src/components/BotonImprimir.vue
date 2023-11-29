<script lang="ts" setup>
import type { Diseño, DiseñoRecuperadoDeBaseDeDatos } from '@/types/Tipos';
import { convertirOperacionesSerializadasAReactivas, obtenerPayloadComoJson } from '@/Helpers';
import Printer from "vue-material-design-icons/Printer.vue";
import Loading from "vue-material-design-icons/Loading.vue";
import { useDesignsOperationStore } from '@/stores/designOperation';
const designsOperationStore = useDesignsOperationStore();
const props = withDefaults(defineProps<{
    diseño: DiseñoRecuperadoDeBaseDeDatos,
    cargando: boolean,
}>(), {
    diseño: () => {
        return {
            id: 0,
            nombre: "",
            fecha_modificacion: 0,
            ruta_api: "",
            licencia: "",
            plataforma: "",
            impresora: "",
            id_plataforma: 0,
        };
    },
    cargando: false,
});

const emit = defineEmits(["error", "exito"]);

const imprimir = async () => {
    const operacionesRecuperadasDeBaseDeDatos = await designsOperationStore.obtenerOperacionesDeDiseño(props.diseño.id);
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
    <button :disabled="cargando" @click="imprimir"
        class="disabled:bg-sky-200 rounded-md px-3 py-2 m-1 bg-sky-500 text-white hover:bg-sky-400 text-sm font-semibold inline-flex items-center">
        <Loading v-if="cargando" class="animate-spin"></Loading>
        <Printer v-if="!cargando"></Printer>
        Imprimir
    </button>
</template>