<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <Toast position="bottom-right"></Toast>
  <RouterView />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Mitr', sans-serif;
}

a {
  text-decoration: none;
}
</style>