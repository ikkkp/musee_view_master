<script setup>
import TopNavComponent from './components/TopNavComponent.vue';
import LoginModal from './views/LoginModal.vue';
import Axios from '@/axios/axiosPlugin';
import { globalState } from '@/utils/store.js';
import { onMounted } from 'vue';
onMounted(() => {
  Axios({
    method: 'get',
    url: '/api/student/history',
  }).then(function (response) {
    globalState.history = response.data.data;
    console.log('获取历史信息成功', response.data.data);
  }).catch(function (error) {
    console.log('获取历史信息失败', error);
  });

});
</script>

<template>
  <TopNavComponent />
  <RouterView />
  <LoginModal ref="loginModal" />
</template>

<style scoped></style>
