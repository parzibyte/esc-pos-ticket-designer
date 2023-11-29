<script setup lang="ts">
import { Operacion, listaCompletaDeOperaciones } from "../types/Operacion"
import { OperacionFactory } from "../types/OperacionFactory"
import { ref, type Ref, onMounted } from "vue";
import ComponenteOperacion from "@/components/Operacion.vue";
import { useDesignsOperationStore } from "@/stores/designOperation"
import { debounce, obtenerPayload, convertirOperacionesSerializadasAReactivas, obtenerPayloadComoJson } from "@/Helpers"
import type { DiseñoRecuperadoDeBaseDeDatos, OperacionConIndice } from "@/types/Tipos";
import ListaDeOperacionesParaAgregar from "@/components/ListaDeOperacionesParaAgregar.vue";
import Codigo from "@/components/FragmentosCodigo/Codigo.vue";
import DesignItem from "@/components/DesignItem.vue";
import { useDesignsStore } from "@/stores/designsStore";
import { useSettingsStore } from "@/stores/settings";
const estaCargando = ref(false);
const designsStore = useDesignsStore();
const designsOperationStore = useDesignsOperationStore();
const settingsStore = useSettingsStore();
const diseñoActualmenteEditado: Ref<DiseñoRecuperadoDeBaseDeDatos> = ref({
  ruta_api: "",
  id: 0,
  licencia: "",
  impresora: "",
  plataforma: "",
  nombre: "",
  id_plataforma: 0,
  fecha_modificacion: 0,
});
const props = defineProps<{
  id: number,
}>();
const todasLasOperaciones: Ref<Array<Operacion>> = ref(listaCompletaDeOperaciones);
const operaciones: Ref<Array<Operacion>> = ref([]);
const modoDesarrolladorActivado = ref(false);
const componenteCodigo: Ref<{ refrescarIndice: () => void }> = ref({
  refrescarIndice() { },
});

const eliminarOperacionPorIndice = async (indice: number) => {
  const operacionParaEliminar = operaciones.value[indice];
  estaCargando.value = true;
  await designsOperationStore.eliminarOperacion(operacionParaEliminar.id);
  await actualizarFechaDeModificacionDeDiseño();
  estaCargando.value = false;
  operaciones.value.splice(indice, 1);
}

const obtenerCodigo = () => {
  return obtenerPayload(
    diseñoActualmenteEditado.value.plataforma,
    operaciones.value,
    diseñoActualmenteEditado.value.impresora,
    diseñoActualmenteEditado.value.licencia,
  );
}

const onActualizado = debounce(async (op: Operacion) => {
  estaCargando.value = true;
  await designsOperationStore.actualizarArgumentosDeOperacion(op.clonar().obtenerArgumentosRealesSerializados(), op.id);
  await actualizarFechaDeModificacionDeDiseño();
  estaCargando.value = false;
}, 500);

const actualizarFechaDeModificacionDeDiseño = async () => {
  estaCargando.value = true;
  await designsStore.actualizarDiseño(
    diseñoActualmenteEditado.value.id_plataforma,
    diseñoActualmenteEditado.value.nombre,
    diseñoActualmenteEditado.value.impresora,
    props.id,
  );
  diseñoActualmenteEditado.value = await designsStore.obtenerDiseñoPorId(props.id);

  estaCargando.value = false;
}


const refrescarOperacionesDeDiseñoActualmenteEditado = async () => {
  operaciones.value = [];// Necesario para que se escuche el change de los argumentos
  estaCargando.value = true;
  operaciones.value = convertirOperacionesSerializadasAReactivas(await designsOperationStore.obtenerOperacionesDeDiseño(props.id));
  estaCargando.value = false;
}

onMounted(async () => {
  estaCargando.value = true;
  modoDesarrolladorActivado.value = !!(await settingsStore.obtenerAjustes()).modo_programador;
  diseñoActualmenteEditado.value = await designsStore.obtenerDiseñoPorId(props.id);
  await refrescarOperacionesDeDiseñoActualmenteEditado();
  if (modoDesarrolladorActivado.value) {
    await componenteCodigo.value.refrescarIndice();
  }
  estaCargando.value = false;
})

const onOperacionIntercambiada = async (operacionReemplazoConIndice: OperacionConIndice, operacionReemplazadaConIndice: OperacionConIndice) => {
  const ordenReemplazo = operacionReemplazoConIndice.operacion.orden;
  const ordenReemplazado = operacionReemplazadaConIndice.operacion.orden;
  const idReemplazo = operacionReemplazoConIndice.operacion.id;
  const idReemplazado = operacionReemplazadaConIndice.operacion.id;
  estaCargando.value = true;
  await designsOperationStore.cambiarOrdenDeOperacion(idReemplazo, ordenReemplazado);
  await designsOperationStore.cambiarOrdenDeOperacion(idReemplazado, ordenReemplazo);
  await actualizarFechaDeModificacionDeDiseño();
  await refrescarOperacionesDeDiseñoActualmenteEditado();
  estaCargando.value = false;
}

const onOperacionSeleccionada = async (operacion: Operacion) => {
  const operacionSinReferencias = operacion.clonar();
  const argumentosSerializados = operacionSinReferencias.obtenerArgumentosRealesSerializados();
  estaCargando.value = true;
  const operacionesInsertadas = await designsOperationStore.agregarOperacion(props.id, operacionSinReferencias.clave, argumentosSerializados)
  const operacionRecienInsertada = operacionesInsertadas[0];
  await actualizarFechaDeModificacionDeDiseño();
  const operacionParaAgregarAlArreglo = OperacionFactory.crearAPartirDeClaveYArgumentosSerializados(
    operacionRecienInsertada.id,
    operacionRecienInsertada.clave,
    operacionRecienInsertada.argumentos,
    operacionRecienInsertada.orden,
  );
  operaciones.value.push(operacionParaAgregarAlArreglo);

  estaCargando.value = false;
}

const onArchivoImportado = async () => {
  estaCargando.value = true;
  await refrescarOperacionesDeDiseñoActualmenteEditado();
  estaCargando.value = false;
}

const clasesParaContenedorDeOperaciones = () => {
  return {
    "md:w-3/4": modoDesarrolladorActivado.value,
  };
}

const clasesParaContenedorDeCodigo = () => {
  return {
    "md:w-1/4": modoDesarrolladorActivado.value,
  };
}
</script>
<template>
  <div class="flex flex-col md:flex-row">
    <div class="p-1 bg-gray-100 w-full" :class="clasesParaContenedorDeOperaciones()">
      <DesignItem :cargando="estaCargando" @importado="onArchivoImportado" :mostrar-boton-exportar="true"
        :mostrar-boton-importar="true" :mostrarBotonEliminar="false" :mostrarBotonModificar="false"
        :diseño="diseñoActualmenteEditado"></DesignItem>
      <div v-show="operaciones.length <= 0" class="bg-sky-500 my-2 p-8 rounded-md text-center text-white text-2xl">
        <p>Tu diseño está vacío. Elige una operación de la lista de abajo para empezar</p>
      </div>
      <div class="">
        <ComponenteOperacion @intercambiar="onOperacionIntercambiada" :indice="indice" @actualizado="onActualizado"
          :key="'componente_' + indice" @eliminar="eliminarOperacionPorIndice(indice)"
          v-for="(operacion, indice) in operaciones" :operacion="operacion" />
      </div>
      <div class="bg-red-500">
        <ListaDeOperacionesParaAgregar @operacionSeleccionada="onOperacionSeleccionada"
          :operaciones="todasLasOperaciones"></ListaDeOperacionesParaAgregar>
      </div>
    </div>
    <div v-if="modoDesarrolladorActivado" class="bg-white overflow-x-auto p-2 break-all w-full"
      :class="clasesParaContenedorDeCodigo()">
      <Codigo ref="componenteCodigo" :json="obtenerCodigo()" :diseño="diseñoActualmenteEditado"></Codigo>
    </div>
  </div>
</template>