<template>
  <v-card class="analysis-content mx-auto" elevation="0">
    <v-card-item>
      <v-card-title>{{ globalState.title }}</v-card-title>
      <!-- 单个视频源 -->
      <!-- <div class="video-container">
        <video controls width="100%" height="240px">
          <source src="https://youtu.be/YRvf00NooN8" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div> -->
      <v-sheet>
        <v-chip-group mandatory selected-class="primary-text">
          <v-chip v-for="tag in tags" :key="tag" class="chip-item">{{ tag }}</v-chip>
        </v-chip-group>
      </v-sheet>
      <v-card-subtitle style="white-space: normal; font-size: inherit;">
        {{ globalState.Analyserdata }}
      </v-card-subtitle>
    </v-card-item>
  </v-card>
</template>
  
<script setup>
import { globalState } from '@/utils/store.js';
const tags = [
  '#双曲线',
  '#选择题',
  '#初中数学'
];


</script>

<style scoped>
.analysis-content {
  padding: 10px 10px;
  white-space: normal;
  height: 100%;
  overflow-y: auto;
}

.video-container {
  padding: 10px 0 0 0 ;
  border-radius: 10px;
  background-color: #ffffff;
}

.video-container video {
  width: 100%;
  border-radius: inherit;
}
</style>