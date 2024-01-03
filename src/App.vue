<script setup lang="ts">
import { RouterView } from 'vue-router'
import Menu from "vue-material-design-icons/Menu.vue";
import MenuOpen from "vue-material-design-icons/MenuOpen.vue";
import ViewList from "vue-material-design-icons/ViewList.vue";
import CellPhoneLink from "vue-material-design-icons/CellPhoneLink.vue";
import ReceiptTextRemove from "vue-material-design-icons/ReceiptTextRemove.vue";
import Cog from "vue-material-design-icons/Cog.vue";
import Help from "vue-material-design-icons/Help.vue";
import Hiking from "vue-material-design-icons/Hiking.vue";
import Translate from "vue-material-design-icons/Translate.vue";

import router from '@/router';
import { ref, onMounted } from "vue"
import { useSettingsStore } from './stores/settings';
import { useI18n } from 'vue-i18n';
const i18n = useI18n();
const settingsStore = useSettingsStore();
const mostrarMenu = ref(true);
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
onMounted(async () => {
  const idioma = await settingsStore.obtenerIdioma();
  i18n.locale.value = idioma;
});

const alternarIdioma = async () => {
  let nuevoIdioma = "es";
  if (i18n.locale.value === "es") {
    nuevoIdioma = "en";
  }
  i18n.locale.value = nuevoIdioma;
  await settingsStore.guardarIdioma(nuevoIdioma);
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
        <p>{{ $t("title") }}</p>
        <a target="_blank" class="ml-auto bg-white p-2 rounded-sm text-red-500"
          href="https://www.youtube.com/playlist?list=PLat1rFhO_zZiFR2CdNJWkcCcRKO0sYQVL">
          {{ $t("help.checkYoutubeTutorials") }}
        </a>
      </nav>
    </header>
    <div class="flex md:flex-row flex-col flex-1">
      <div class="flex flex-col border border-r-gray-200 font-semibold text-gray-700 w-full md:w-1/4" v-show="mostrarMenu"
        :class="clasesParaMenu()">
        <span href="#" @click="navegarAComponente('FirstSteps')"
          class="p-3 hover:bg-gray-100 flex flex-row cursor-pointer">
          <Hiking class="mr-6"></Hiking>
          {{ $t("menu.firstSteps") }}
        </span>
        <span href="#" @click="navegarAComponente('Designs')" class="p-3 hover:bg-gray-100 flex flex-row cursor-pointer">
          <ViewList class="mr-6"></ViewList>
          {{ $t("menu.myDesigns") }}
        </span>
        <span href="#" @click="navegarAComponente('PlatformsSettings')"
          class="p-3 hover:bg-gray-100 flex flex-row cursor-pointer">
          <CellPhoneLink class="mr-6"></CellPhoneLink>
          {{ $t("menu.platforms") }}
        </span>
        <span href="#" @click="navegarAComponente('RemoveFooter')"
          class="p-3 hover:bg-gray-100 flex flex-row cursor-pointer">
          <ReceiptTextRemove class="mr-6"></ReceiptTextRemove>
          {{ $t("menu.removeFooter") }}
        </span>
        <span href="#" @click="navegarAComponente('Settings')" class="p-3 hover:bg-gray-100 flex flex-row cursor-pointer">
          <Cog class="mr-6"></Cog>
          {{ $t("menu.settings") }}
        </span>
        <span href="#" @click="navegarAComponente('Help')" class="p-3 hover:bg-gray-100 flex flex-row cursor-pointer">
          <Help class="mr-6"></Help>
          {{ $t("menu.help") }}
        </span>
        <span href="#" @click="alternarIdioma()"
          class="text-white bg-gray-700 p-5 my-2 hover:bg-gray-900 flex flex-row cursor-pointer">
          <Translate class="mr-6"></Translate>
          {{ $t("menu.changeLanguage") }}
        </span>
        <p class="text-center font-normal text-xs">
          {{ $t("menu.footer") }}
          <br>
          <a target="_blank" class="text-sky-500" href="https://www.flaticon.com/free-icons/receipt"
            title="receipt icons">Receipt icons created by SBTS2018 -
            Flaticon</a>
        </p>
      </div>
      <RouterView :class="clasesParaContenedor()" />
    </div>
  </div>
</template>
