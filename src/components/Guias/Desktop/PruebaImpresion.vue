<script setup lang="ts">
import Ping from "@/components/Ping.vue";
import SelectImpresoras from "@/components/Selects/SelectImpresoras.vue";
import { usePingPlatformStore } from "@/stores/ping_platform";
import { computed, onMounted, ref, watch } from "vue"

const props = defineProps<{ plataforma: any }>();
const pingStore = usePingPlatformStore();
const impresoras = ref([]);
const impresoraSeleccionada = ref("");

const obtenerImpresoras = async () => {
    const response = await fetch(`${props.plataforma.ruta_api}/impresoras`);
    impresoras.value = await response.json();
}

const imprimir = async () => {
    try {
        const httpResponse = await fetch(`${props.plataforma.ruta_api}/imprimir`, {
            method: "POST",
            body: JSON.stringify({
                nombreImpresora: impresoraSeleccionada.value,
                serial: props.plataforma.licencia,
                operaciones: [
                    {
                        nombre: "EscribirTexto",
                        argumentos: ["Esto es una prueba\n\n"]
                    }
                ]
            })
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
        <div class="bg-red-500 text-white p-2" v-show="!estaConectado">
            Parece que el plugin no se está ejecutando. Por favor, revise todos los pasos anteriores para descargarlo y
            ejecutarlo
        </div>
        <SelectImpresoras v-show="estaConectado" :impresoras="impresoras" v-model="impresoraSeleccionada">
        </SelectImpresoras>
        <button @click="imprimir()" v-show="deberiaMostrarBoton"
            class="p-2 m-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-400">Imprimir</button>
    </div>
</template>