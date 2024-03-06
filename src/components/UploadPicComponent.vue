<template>
    <v-card class="card-small" elevation="0" color="#F7F9F9">
        <div class="card-grid" v-for="(image, index) in smallImages" :key="index">
            <v-img class="grid-image" Default :height="90" :src="image.path" :lazy-src="lazySrc" max-width="500">
                <template v-slot:placeholder>
                    <div class="progress-placeholder">
                        <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                    </div>
                </template>
            </v-img>
        </div>
    </v-card>

    <v-card class="card-large" elevation="0">
        <div class="card-content">
            <v-img class="large-image" Default height="300" :src="largeImage.path" :lazy-src="lazySrc" max-width="500"
                @click="handleClick()">

                <template v-slot:placeholder>
                    <div class="progress-placeholder">
                        <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                    </div>
                </template>
            </v-img>
        </div>
    </v-card>
    <input type="file" accept="image/*" ref="docFileUploader" name="docFileUploader" @change="handleFileChange"
        hidden />

</template>

<script setup>
import { ref, computed } from 'vue';
import { globalState } from '@/utils/store.js';
import Axios from '@/axios/axiosPlugin';

const docFileUploader = ref(null);
const selectedFile = ref(null);
const lazySrc = ref('src/images/empty-picture/no_search.svg');

// 使用computed函数创建计算属性
const smallImages = computed(() => {
    // 使用globalState.history.value访问响应式引用的值
    return globalState.history.slice(1, 4);
});

const largeImage = computed(() => {
    if (globalState.history.length === 0) {
        return {
            path: 'src/images/empty-picture/no_search.svg',
        };
    }
    return globalState.history[0];
});


function handleClick() {
    docFileUploader.value.click();
};

function handleFileChange(event) {
    // 获取到选中的文件
    selectedFile.value = event.target.files[0];
    uploadFile();
};


function uploadFile() {
    let formData = new FormData();
    formData.append('question', selectedFile.value);
    Axios({
        method: 'post',
        url: '/api/student/bigModel',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then((response) => {
            if (response.data.status === 1) {
                let match = response.data.data.match(/题目：\n\n([^\n]+)/);
                let steps = response.data.data.match(/(步骤\d+：[^\n]+)/g);
                globalState.title = match
                globalState.Analyserdata = response.data.data
                globalState.steps = steps
            }
        })
        .catch((error) => {
            console.error(error);
            // 这里可以添加一些上传失败的处理
        });
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
    width: 100%;
    height: 90px;
    width: 100%;
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