<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Menu from "vue-material-design-icons/Menu.vue";
import MenuOpen from "vue-material-design-icons/MenuOpen.vue";
import ViewList from "vue-material-design-icons/ViewList.vue";
import CellPhoneLink from "vue-material-design-icons/CellPhoneLink.vue";
import ReceiptTextRemove from "vue-material-design-icons/ReceiptTextRemove.vue";
import Cog from "vue-material-design-icons/Cog.vue";
import Help from "vue-material-design-icons/Help.vue";
import Hiking from "vue-material-design-icons/Hiking.vue";

import router from '@/router';
import { ref } from "vue"
const mostrarMenu = ref(false);
const clasesParaMenu = () => {
  return { "w-1/4": mostrarMenu.value };
}

const clasesParaContenedor = () => {
  return { "md:w-3/4": mostrarMenu.value, "w-full": true };
}

const navegarAComponente = (nombre: string) => {
  router.push({
    name: nombre,
  });
  mostrarMenu.value = false;
}
</script>

<template>
  <div class="h-full flex flex-col">
    <header>
      <nav class="bg-red-500 text-white p-4 font-semibold flex flex-row items-center">
        <button @click="mostrarMenu = !mostrarMenu" class="mr-4 p-1 hover:bg-red-600">
          <Menu v-show="!mostrarMenu"></Menu>
          <MenuOpen v-show="mostrarMenu"></MenuOpen>
        </button>
        <p>Diseñador de tickets By Parzibyte</p>
      </nav>
    </header>
    <div class="flex md:flex-row flex-col flex-1">
      <div class="flex flex-col border border-r-gray-200 font-semibold text-gray-700 w-full md:w-1/4" v-show="mostrarMenu"
        :class="clasesParaMenu()">
        <a href="#" @click="navegarAComponente('FirstSteps')" class="p-3 hover:bg-gray-100 flex flex-row">
          <Hiking class="mr-6"></Hiking>
          Primeros pasos
        </a>
        <a href="#" @click="navegarAComponente('Designs')" class="p-3 hover:bg-gray-100 flex flex-row">
          <ViewList class="mr-6"></ViewList>
          Mis diseños
        </a>
        <a href="#" @click="navegarAComponente('PlatformsSettings')" class="p-3 hover:bg-gray-100 flex flex-row">
          <CellPhoneLink class="mr-6"></CellPhoneLink>
          Plataformas
        </a>
        <a href="#" @click="navegarAComponente('RemoveFooter')" class="p-3 hover:bg-gray-100 flex flex-row">
          <ReceiptTextRemove class="mr-6"></ReceiptTextRemove>
          Remover pie de página
        </a>
        <a href="#" @click="navegarAComponente('Settings')" class="p-3 hover:bg-gray-100 flex flex-row">
          <Cog class="mr-6"></Cog>
          Ajustes
        </a>
        <a href="#" @click="navegarAComponente('Help')" class="p-3 hover:bg-gray-100 flex flex-row">
          <Help class="mr-6"></Help>
          Ayuda
        </a>
        <p class="text-center font-normal text-xs">
          ESC POS ticket designer developed by Parzibyte
        </p>
      </div>
      <RouterView :class="clasesParaContenedor()" />
    </div>

  </div>
</template>
