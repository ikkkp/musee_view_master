<template>
  <v-card class="analysis-content mx-auto" elevation="0">
    <v-card-item>
      <v-card-title>{{ algebraQuestion.title }}</v-card-title>
      <!-- 单个视频源 -->
      <div class="video-container">
        <video controls width="100%" height="240px">
          <source src="" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
      <v-sheet>
        <v-chip-group mandatory selected-class="primary-text">
          <v-chip v-for="tag in tags" :key="tag" class="chip-item">{{ tag }}</v-chip>
        </v-chip-group>
      </v-sheet>
      <v-card-subtitle style="white-space: normal; font-size: inherit;">
        {{ algebraQuestion.solution }}
      </v-card-subtitle>
    </v-card-item>
  </v-card>
</template>
  
<script setup>
import { defineProps } from 'vue';

const tags = [
  '#双曲线',
  '#选择题',
  '#初中数学'
];

const props = defineProps({
  algebraQuestion: {
    type: Object,
    required: true,
    default: () => ({
      title: '已知方程为 2x + 3 = 7，要求解 x 的值。',
      solution: '减去常数：首先，我们将等式两边减去3，得到 2x = 4。除以系数：然后，我们将方程两边同时除以2，得到 x = 2。减去常数：首先，我们将等式两边减去3，得到 2x = 4。除以系数：然后，我们将方程两边同时除以2，得到 x = 2。减去常数：首先，我们将等式两边减去3，得到 2x = 4。除以系数：然后，我们将方程两边同时除以2，得到 x = 2。减去常数：首先，我们将等式两边减去3，得到 2x = 4。除以系数：然后，我们将方程两边同时除以2，得到 x = 2。减去常数：首先，我们将等式两边减去3，得到 2x = 4。除以系数：然后，我们将方程两边同时除以2，得到 x = 2。减去常数：首先，我们将等式两边减去3，得到 2x = 4。除以系数：然后，我们将方程两边同时除以2，得到 x = 2。',
    }),
  },
});
</script>

<style scoped>
.analysis-content {
  padding: 10px 10px;
  white-space: normal;
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