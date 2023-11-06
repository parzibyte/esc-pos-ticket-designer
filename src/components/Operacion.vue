<script setup lang="ts">
import { defineProps, type Component, watch, ref } from "vue";
import { Operacion } from "@/types/Operacion";
import Delete from "vue-material-design-icons/Delete.vue";
import UnfoldLessHorizontal from "vue-material-design-icons/UnfoldLessHorizontal.vue";
import UnfoldMoreHorizontal from "vue-material-design-icons/UnfoldMoreHorizontal.vue";
import Corte from "./Operaciones/Corte.vue";
import DefinirCaracterPersonalizado from "./Operaciones/DefinirCaracterPersonalizado.vue";
import Texto from "./Operaciones/Texto.vue";
import Imagen from "./Operaciones/Imagen.vue";
import Tabla from "./Operaciones/Tabla.vue";
import CodigoDeBarras from "./Operaciones/CodigoDeBarras.vue";
import CodigoQr from "./Operaciones/CodigoQr.vue";
import ImagenLocal from "./Operaciones/ImagenLocal.vue";
import CorteParcial from "./Operaciones/CorteParcial.vue";
import DescargarImagenDeInternet from "./Operaciones/DescargarImagenDeInternet.vue";
import DeshabilitarCaracteresPersonalizados from "./Operaciones/DeshabilitarCaracteresPersonalizados.vue";
import DeshabilitarCaracteresChinos from "./Operaciones/DeshabilitarCaracteresChinos.vue";
import TextoSimple from "./Operaciones/TextoSimple.vue";
import EstablecerAlineacion from "./Operaciones/EstablecerAlineacion.vue";
import EstablecerEnfatizado from "./Operaciones/EstablecerEnfatizado.vue";
import EstablecerFuente from "./Operaciones/EstablecerFuente.vue";
import EstablecerImpresionAlReves from "./Operaciones/EstablecerImpresionAlReves.vue";
import EstablecerImpresionBlancoYNegroInversa from "./Operaciones/EstablecerImpresionBlancoYNegroInversa.vue";
import EstablecerRotacionDe90Grados from "./Operaciones/EstablecerRotacionDe90Grados.vue";
import EstablecerSubrayado from "./Operaciones/EstablecerSubrayado.vue";
import EstablecerTamanioFuente from "./Operaciones/EstablecerTamanioFuente.vue";
import Feed from "./Operaciones/Feed.vue";
import HabilitarCaracteresPersonalizados from "./Operaciones/HabilitarCaracteresPersonalizados.vue";
import HabilitarElModoDeCaracteresChinos from "./Operaciones/HabilitarElModoDeCaracteresChinos.vue";
import ImprimirImagenEnBase64 from "./Operaciones/ImprimirImagenEnBase64.vue";
import Iniciar from "./Operaciones/Iniciar.vue";
import Pulso from "./Operaciones/Pulso.vue";
import TextoSegunPaginaDeCodigos from "./Operaciones/TextoSegunPaginaDeCodigos.vue";

const componentes: { [key: string]: Component } = {
    "Corte": Corte,
    "DefinirCaracterPersonalizado": DefinirCaracterPersonalizado,
    "Texto": Texto,
    "Imagen": Imagen,
    "Tabla": Tabla,
    "CodigoDeBarras": CodigoDeBarras,
    "CodigoQr": CodigoQr,
    "ImagenLocal": ImagenLocal,
    "CorteParcial": CorteParcial,
    "DescargarImagenDeInternet": DescargarImagenDeInternet,
    "DeshabilitarCaracteresPersonalizados": DeshabilitarCaracteresPersonalizados,
    "DeshabilitarElModoDeCaracteresChinos": DeshabilitarCaracteresChinos,
    "TextoSimple": TextoSimple,
    "EstablecerAlineacion": EstablecerAlineacion,
    "EstablecerEnfatizado": EstablecerEnfatizado,
    "EstablecerFuente": EstablecerFuente,
    "EstablecerImpresionAlReves": EstablecerImpresionAlReves,
    "EstablecerImpresionBlancoYNegroInversa": EstablecerImpresionBlancoYNegroInversa,
    "EstablecerRotacionDe90Grados": EstablecerRotacionDe90Grados,
    "EstablecerSubrayado": EstablecerSubrayado,
    "EstablecerTamañoFuente": EstablecerTamanioFuente,
    "Feed": Feed,
    "HabilitarCaracteresPersonalizados": HabilitarCaracteresPersonalizados,
    "HabilitarElModoDeCaracteresChinos": HabilitarElModoDeCaracteresChinos,
    "ImprimirImagenEnBase64": ImprimirImagenEnBase64,
    "Iniciar": Iniciar,
    "Pulso": Pulso,
    "TextoSegunPaginaDeCodigos": TextoSegunPaginaDeCodigos,
};

type MyComponentProps = {
    operacion: Operacion;
};
const props = defineProps<MyComponentProps>();
const emit = defineEmits<{
    (e: "eliminar"): void,
    (e: "actualizado", operacion: Operacion): void,
}>();

const eliminar = () => {
    emit("eliminar");
}

const mostrarElementos = ref(true);

watch(props.operacion.argumentos, () => {
    emit("actualizado", props.operacion);
});

const alternarVisibilidad = () => {
    mostrarElementos.value = !mostrarElementos.value;
}

</script>
<template>
    <div class="p-1 my-2 bg-white rounded-md">
        <div class="flex my-2">
            <h1 class="text-xl">{{ props.operacion.nombre }}</h1>
            <button @click="eliminar" class="bg-red-500 text-white p-1 mx-2 rounded-md hover:bg-red-600 focus:bg-red-600">
                <Delete />
            </button>
            <button @click="alternarVisibilidad()" class="bg-sky-500 text-white p-1 mx-2 rounded-md hover:bg-sky-600 ">
                <UnfoldLessHorizontal v-if="mostrarElementos"></UnfoldLessHorizontal>
                <UnfoldMoreHorizontal v-else></UnfoldMoreHorizontal>
            </button>
        </div>
        <Transition>
            <div v-show="mostrarElementos">
                <component v-model="operacion.argumentos" :is="componentes[operacion.clave]"></component>
            </div>
        </Transition>
    </div>
</template>
<style>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>