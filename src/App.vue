<template>
  <TopNavComponent />
  <RouterView />
  <LoginModal ref="loginModal" />
</template>

<script setup>
import TopNavComponent from './components/TopNavComponent.vue';
import LoginModal from './views/LoginModal.vue';
import { onMounted } from 'vue';
import { fetchData } from './utils/common.js';
onMounted(
  fetchData
);

</script>

<style scoped></style>
