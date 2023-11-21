<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Menu from "vue-material-design-icons/Menu.vue";
import MenuOpen from "vue-material-design-icons/MenuOpen.vue";
import ViewList from "vue-material-design-icons/ViewList.vue";
import CellPhoneLink from "vue-material-design-icons/CellPhoneLink.vue";
import { ref } from "vue"
const mostrarMenu = ref(false);
const clasesParaMenu = () => {
  return { "w-1/4": mostrarMenu.value };
}

const clasesParaContenedor = () => {
  return { "w-3/4": mostrarMenu.value, "w-full": !mostrarMenu.value };
}
</script>

<template>
  <header>
    <nav class="bg-red-500 text-white p-4 font-semibold flex flex-row items-center">
      <button @click="mostrarMenu = !mostrarMenu" class="mr-4 p-1 hover:bg-red-600">
        <Menu v-show="!mostrarMenu"></Menu>
        <MenuOpen v-show="mostrarMenu"></MenuOpen>
      </button>
      <p>Diseñador de tickets By Parzibyte</p>
    </nav>
  </header>
  <div class="flex flex-row">
    <div class="flex flex-col border border-r-gray-200 font-semibold text-gray-700" v-show="mostrarMenu"
      :class="clasesParaMenu()">
      <RouterLink to="/designs" class="p-3 hover:bg-gray-100 flex flex-row">
        <ViewList class="mr-6"></ViewList>
        Mis diseños
      </RouterLink>
      <RouterLink to="/designs" class="p-3 hover:bg-gray-100 flex flex-row">
        <ViewList class="mr-6"></ViewList>
        Primeros pasos
      </RouterLink>
      <RouterLink to="/platforms-settings" class="p-3 hover:bg-gray-100 flex flex-row">
        <CellPhoneLink class="mr-6"></CellPhoneLink>
        Plataformas
      </RouterLink>
      <RouterLink to="/designs" class="p-3 hover:bg-gray-100 flex flex-row">
        <ViewList class="mr-6"></ViewList>
        Remover pie de página
      </RouterLink>
      <RouterLink to="/settings" class="p-3 hover:bg-gray-100 flex flex-row">
        <ViewList class="mr-6"></ViewList>
        Ajustes
      </RouterLink>
      <RouterLink to="/designs" class="p-3 hover:bg-gray-100 flex flex-row">
        <ViewList class="mr-6"></ViewList>
        Ayuda
      </RouterLink>
      <p class="text-center font-normal text-xs">
        ESC POS ticket designer developed by Parzibyte
      </p>
    </div>
    <RouterView :class="clasesParaContenedor()" />
  </div>
</template>
