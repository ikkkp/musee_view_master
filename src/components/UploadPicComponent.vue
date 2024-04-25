<template>
  
  <v-card class="card-small" elevation="0" color="#F7F9F9">
    <div class="card-grid" v-for="(image, index) in smallImages" :key="index" @click="handlesmallImageClick(index)" style="height: 33%;">
      <v-img class="grid-image" cover :src="image.path" :lazy-src="lazySrc" max-width="500">
      </v-img>
    </div>
  </v-card>

  <v-card class="card-large" elevation="0">
    <div class="card-content">
      <v-img class="large-image" cover :src="largeImage.path" :lazy-src="lazySrc" max-width="500">
      </v-img>
      <v-btn :class="['compact-button', 'icon-button']" icon="mdi-format-list-bulleted"
             style="position: absolute;bottom: 20px; right: 20px;" size="small" @click="handleClick()">
        <svg-icon type="mdi" :path="mdiCamera" class="icon-svg" color="rgb(32, 129, 195)"></svg-icon>
      </v-btn>
      <v-btn :class="['compact-button', 'icon-button']" icon="mdi-format-list-bulleted"
             style="position: absolute;bottom: 20px; right: 75px;" size="small" @click="handleClassifyClick()">
        <svg-icon type="mdi" :path="mdiBookPlus" class="icon-svg" color="rgb(32, 129, 195)"></svg-icon>
      </v-btn>
    </div>
  </v-card>
  <input type="file" accept="image/*" ref="docFileUploader" name="docFileUploader" @change="handleFileChange"
         hidden />
</template>

<script setup>
import { ref, computed } from 'vue';
import { mdiCamera, mdiBookPlus } from '@mdi/js';
import { globalState } from '@/utils/store.js';
import Axios from '@/axios/axiosPlugin';
import {  updataContent, updataconcrete } from '@/utils/common.js';
import {commonGlobalState}from '@/utils/commonStore.js'
import { handleUploadMistakePic, handleUploadCommonPic } from '@/utils/handleUploadPic.js';
import SvgIcon from '@jamescoyle/vue-icon';
const docFileUploader = ref(null);
const selectedFile = ref(null);
const lazySrc = ref('@/images/empty-picture/no_data.svg');

// 使用computed函数创建计算属性
const smallImages = computed(() => {
  if (globalState.history.length === 0) {
    return [
      { path: '/src/images/empty-picture/no_search.svg' },
      { path: '/src/images/empty-picture/no_search.svg' },
      { path: '/src/images/empty-picture/no_search.svg' },
    ];
  }
  // 使用globalState.history.value访问响应式引用的值
  return globalState.history.slice(1, 4);
});

const largeImage = computed(() => {
  if (globalState.history.length === 0) {
    return {
      path: '/src/images/empty-picture/no_search.svg',
    };
  }
  return globalState.history[0];
});

function handlesmallImageClick(index) {
  globalState.history.unshift(globalState.history.splice(index + 1, 1)[0]);
  updataContent();
  updataconcrete();
}

function handleClick() {
  docFileUploader.value.click();
};


function handleClassifyClick() {
  commonGlobalState.DraggableDialogVisible = true
  //在这边进行json的获取
  Axios({
    method: 'get',
    url: '/api/student/question/position/details',
    data: {
      position: globalState.position,
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
      .then((response) => {
        if (response.data.status === 1) {
          response.data.data.forEach((element) => {
            if (element.classification) {
              console.log('找到了classification属性:', element.classification);
            }
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });

};

function handleFileChange(event) {
  // 获取到选中的文件
  selectedFile.value = event.target.files[0];
  uploadFile();
};


function uploadFile() {
  let formData = new FormData();
  formData.append('question', selectedFile.value);

  let wrongFormData = new FormData();
  wrongFormData.append('wrongAnswer', selectedFile.value);
  wrongFormData.append("qid",globalState.history[0].qid)

  commonGlobalState.dialogVisible = true
  commonGlobalState.warntitle = '让小沐想想看哈~'
  console.log(commonGlobalState.chatModel);
  switch (commonGlobalState.chatModel) {
    case 2:
      handleUploadMistakePic(wrongFormData);
      break;
    default:
      handleUploadCommonPic(formData);
      break;
  }
}
</script>


<style scoped>
.card-small {
  height: 95%;
  width: 24%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-grid {
  height: 85px;
  width: 100%;
  border: 1px solid rgb(165 176 184);
  border-radius: 10px;
}

.grid-image {
  margin: auto;
  width: 90%;
  height: 90px;
}

.card-large {
  height: 95%;
  width: 73%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid rgb(165 176 184);
  border-radius: 10px;
}

.card-content {
  width: 100%;
  height: 100%;
}

.large-image {
  margin: auto;
  width: 100%;
  height: 100%;
  max-width: 500px;
}

.progress-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
