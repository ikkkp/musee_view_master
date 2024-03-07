<template>
  <div v-if="globalState.Analyserdata != ''" class="text-area" @click="openStepsCard">
    <v-card class="analysis-content mx-auto" elevation="0">
      <v-card-item>
        <!-- <v-card-title style="white-space: normal;">{{ globalState.Analyserdata }}</v-card-title> -->
        <!-- 单个视频源 -->
        <!-- <div class="video-container">
        <video controls width="100%" height="240px">
          <source src="https://youtu.be/YRvf00NooN8" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div> -->
        <v-card-subtitle style="white-space: normal; font-size: larger;line-height: 1.5rem;">
          {{ globalState.Analyserdata }}
        </v-card-subtitle>
      </v-card-item>
      <v-sheet style="margin: 0px 10px;">
          <v-chip-group mandatory selected-class="primary-text">
            <v-chip v-for="tag in globalState.knowledges" :key="tag" class="chip-item">{{ tag }}</v-chip>
          </v-chip-group>
        </v-sheet>
    </v-card>
  </div>
  <template v-else>
    <div class="text-area empty-area">
      <img src="@/images/empty-picture/no_data.svg" style="height: 50%" />
      <div class="text-font">请先拍题哦</div>
    </div>
  </template>
</template>

<script setup>
import { globalState } from '@/utils/store.js';
import { onMounted, nextTick } from "vue";
function convert() {
  MathJax.texReset();
  MathJax.typesetClear();
  MathJax.typesetPromise();
}

function updateFormula() {
  setTimeout(() => {
    nextTick(convert);
  }, 100);
  
}

onMounted(() => {
  updateFormula();
});

</script>

<style scoped>
.analysis-content {
  padding: 10px 10px;
  white-space: normal;
  height: 100%;
  overflow-y: auto;
}

.video-container {
  padding: 10px 0 0 0;
  border-radius: 10px;
  background-color: #ffffff;
}

.video-container video {
  width: 100%;
  border-radius: inherit;
}
</style>