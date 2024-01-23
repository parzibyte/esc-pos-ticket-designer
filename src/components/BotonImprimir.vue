<script lang="ts" setup>
import type { DiseñoRecuperadoDeBaseDeDatos } from '@/types/Tipos';
import { convertirOperacionesSerializadasAReactivas, obtenerPayloadComoJson } from '@/Helpers';
import Printer from "vue-material-design-icons/Printer.vue";
import Loading from "vue-material-design-icons/Loading.vue";
import { useDesignsOperationStore } from '@/stores/designOperation';
import { computed, ref, onMounted, onUnmounted } from 'vue';
onMounted(() => {
    document.addEventListener("keydown", manejadorImprimirConTeclas);
});
onUnmounted(() => {
    document.removeEventListener("keydown", manejadorImprimirConTeclas);
});
const manejadorImprimirConTeclas = (event: KeyboardEvent) => {
    if (event.key === "p" && event.ctrlKey) {
        event.preventDefault();
        imprimir();
    }
}
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
const cargandoInternamente = ref(false);

const cargandoComputed = computed<boolean>(() => props.cargando || cargandoInternamente.value);

const imprimir = async () => {
    cargandoInternamente.value = true;
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
    } finally {
        cargandoInternamente.value = false;
    }
}

</script>
<template>
    <button :disabled="cargandoComputed" @click="imprimir"
        class="disabled:bg-sky-200 rounded-md px-3 py-2 m-1 bg-sky-500 text-white hover:bg-sky-400 text-sm font-semibold inline-flex items-center">
        <Loading v-if="cargandoComputed" class="animate-spin"></Loading>
        <Printer v-if="!cargandoComputed"></Printer>
        {{ $t("print") }} (CTRL + P)
    </button>
</template>