<script setup lang="ts">
import { obtenerNombreDeImpresoraComoCadena, obtenerPayloadComoJson } from "@/Helpers";
import Ping from "@/components/Ping.vue";
import SelectImpresoras from "@/components/Selects/SelectImpresoras.vue";
import { usePingPlatformStore } from "@/stores/ping_platform";
import { OperacionFactory } from "@/types/OperacionFactory";
import type { PlataformaRecuperadaDeBaseDeDatos, ArgumentosParaDefinirTextoSimple } from "@/types/Tipos";
import { computed, onMounted, ref, watch } from "vue"

const props = defineProps<{ plataforma: PlataformaRecuperadaDeBaseDeDatos }>();
const pingStore = usePingPlatformStore();
const impresoras = ref([]);
const impresoraSeleccionada = ref("");

const obtenerImpresoras = async () => {
    const response = await fetch(`${props.plataforma.ruta_api}/impresoras`);
    impresoras.value = await response.json();
}

const imprimir = async () => {
    try {
        const operacion = OperacionFactory.crearAPartirDeClaveYArgumentos(0, "TextoSimple", <ArgumentosParaDefinirTextoSimple>{
            contenido: "Si puede leer esto, ya puede usar la aplicacion para crear tickets y recibos\n\n\n",
        });
        const verdaderoNombreImpresora = obtenerNombreDeImpresoraComoCadena(props.plataforma, impresoraSeleccionada.value);
        const payload = obtenerPayloadComoJson(props.plataforma.nombre, [operacion], verdaderoNombreImpresora, props.plataforma.licencia);
        const httpResponse = await fetch(`${props.plataforma.ruta_api}/imprimir`, {
            method: "POST",
            body: payload,
        });
        const respuesta = await httpResponse.json();
        if (respuesta === true) {
            alert("Ok");
        } else {
            alert("Error: " + respuesta);
        }
    } catch (e) {
        alert("Error: " + e);
    }
}
const estaConectado = computed(() => {
    if (!props.plataforma) {
        return false;
    }
    if (!props.plataforma.id) {
        return false;
    }
    const estadoDePlataforma = pingStore.estado[props.plataforma.id];
    if (!estadoDePlataforma) {
        return false;
    }
    if (!estadoDePlataforma.detalles) {
        return false;
    }
    return estadoDePlataforma.detalles.activa;
});

watch(estaConectado, async (valorActual, valorAnterior) => {
    // Solo necesito saber cuando antes estaba desconectado y ahora ya está conectado
    if (valorAnterior === false && valorActual !== false) {
        await obtenerImpresoras();
    }
})


watch(() => props.plataforma, async (nuevaPlataforma) => {
    if (!nuevaPlataforma) {
        return;
    }
    if (!nuevaPlataforma.ruta_api) {
        return;
    }
    await obtenerImpresoras();
}, {
    deep: true,
})

const deberiaMostrarBoton = computed(() => {
    if (!estaConectado) {
        return false;
    }
    if (!impresoraSeleccionada.value) {
        return false;
    }
    return true;
});

onMounted(() => {
    if (estaConectado.value !== false) {
        if (estaConectado.value) {
            obtenerImpresoras();
        }
    }
});
</script>
<template>
    <div>
        <Ping :idPlataforma="props.plataforma.id"></Ping>
        <div class="bg-red-500 text-white p-2 mx-2 rounded-md" v-show="!estaConectado">
            {{ $t("firstSteps.android.testFromDesigner.pluginNotRunning") }}
        </div>
        <SelectImpresoras :plataforma="plataforma" v-show="estaConectado" :impresoras="impresoras"
            v-model="impresoraSeleccionada">
        </SelectImpresoras>
        <button @click="imprimir()" v-show="deberiaMostrarBoton"
            class="p-2 m-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-400">Imprimir</button>
    </div>
</template>