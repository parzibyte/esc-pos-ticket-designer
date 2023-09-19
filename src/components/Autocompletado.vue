<script setup lang="ts">
import { computed, ref, onBeforeMount, watch } from "vue"
import type { Ref } from 'vue'
import ChevronDown from 'vue-material-design-icons/ChevronDown.vue';
import ChevronUp from 'vue-material-design-icons/ChevronUp.vue';
import Backspace from 'vue-material-design-icons/Backspace.vue';

const opciones: Ref<Array<string>> = ref(["Imagen", "Iniciar", "Descargar imagen e imprimir", "Corte", "CorteParcial", "Imprimir imagen local", "Imagen en base64"]);
const opcionesFiltradas: Ref<Array<string>> = ref([]);
const textoParaMostrar: Ref<string> = ref("");
const mostrarElementos: Ref<boolean> = ref(false);
const inputEstaEnfocado: Ref<boolean> = ref(false);
const opcionSeleccionada: Ref<any> = ref(null);
const input: Ref<any> = ref(null);

watch(mostrarElementos, (nuevo, anterior) => {
    if (nuevo) {
        filtrarOpciones();
    }
})

onBeforeMount(() => {
    opcionesFiltradas.value = opciones.value;
})

const onOpcionSeleccionada = (opcion: any) => {
    opcionSeleccionada.value = opcion;
    console.log({ opcion });
    mostrarElementos.value = false;
    textoParaMostrar.value = opcion;
}

const onKeyup = () => {
    opcionSeleccionada.value = null;
    filtrarOpciones();
}

const filtrarOpciones = () => {
    opcionesFiltradas.value = funcionDeFiltro(textoParaMostrar.value, opciones.value);
}

const onInputClick = () => {
    mostrarElementos.value = true;
}

const onInputFocus = () => {
    inputEstaEnfocado.value = true;
}

const onInputBlur = () => {
    inputEstaEnfocado.value = false;
}

const deberiaMostrarBotonLimpiar = () => {
    return (textoParaMostrar.value);
}

const limpiar = () => {
    textoParaMostrar.value = "";
    opcionSeleccionada.value = null;
    mostrarElementos.value = true;
    input.value.focus();
    filtrarOpciones();
}


const funcionDeFiltro = (busqueda: string, opciones: any[]) => {
    const expresion = new RegExp(`${busqueda}.*`, "i");
    return opciones.filter((opcion: any) => {
        return expresion.test(opcion);
    });
}


</script>
<template>
    <div class="flex flex-col">
        <strong>Seleccione una opción</strong>
        <div class="flex flex-col relative">
            <div class="flex">
                <input ref="input" @focus="onInputFocus" @blur="onInputBlur" @keyup="onKeyup" @click="onInputClick"
                    v-model="textoParaMostrar" placeholder="Selecciona una opción" type="input"
                    class="focus:outline-none w-full h-10 border border-l-emerald-200 border-t-emerald-200 border-b-emerald-200 border-r-0 rounded-tl-md p-2">
                <button v-if="deberiaMostrarBotonLimpiar()" @click="limpiar"
                    class="focus:outline-none p-1 bg-white text-zinc-200 border border-l-0 border-r-0 border-t-emerald-200 border-b-emerald-200 ">
                    <Backspace />
                </button>
                <button @click="mostrarElementos = !mostrarElementos"
                    class="focus:outline-none p-1 bg-white text-zinc-200 rounded-tr-md border-b-emerald-200 border border-l-0 border-r-emerald-200 border-t-emerald-200">
                    <ChevronDown v-if="!mostrarElementos" />
                    <ChevronUp v-if="mostrarElementos" />
                </button>
            </div>
            <Transition>
                <ul class="w-full border border-emerald-200 border-t-0 absolute mt-10 z-10" v-show="mostrarElementos">
                    <li @click="onOpcionSeleccionada(opcion)" v-for="opcion in opcionesFiltradas"
                        class="p-2 bg-white hover:bg-zinc-200 hover:cursor-pointer">
                        {{ opcion }}
                    </li>
                </ul>
            </Transition>
        </div>
    </div>
</template>
<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
    transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>