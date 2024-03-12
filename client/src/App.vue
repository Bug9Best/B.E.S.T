<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
  <Toast position="bottom-right"/>
  <ConfirmDialog></ConfirmDialog>
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