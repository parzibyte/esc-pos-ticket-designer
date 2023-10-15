<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/add-design">Agregar diseño</RouterLink>
      <RouterLink to="/designs">Diseños</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>
