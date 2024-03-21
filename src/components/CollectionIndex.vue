<template>
    <div style="    display: flex;
    /* width: 80%; */
    flex-direction: row;
    justify-content: center;">
        <v-card-text style="width: 70%;    padding: 2rem 2rem 1rem 2rem!important;">
            <v-text-field :loading="loading" density="compact" variant="solo" label="点我搜索之前的错题吧！"
                append-inner-icon="mdi-magnify" single-line hide-details @click:append-inner="onSearchFieldClick"
                rounded></v-text-field>
        </v-card-text>

    </div>
    <div style="   
     display: flex;
    flex-direction: column;
    align-items: center;  overflow-y: auto;">
        <div v-for="collection in mistakeCollections" :key="collection.id" style="margin:10px 0  ;">
            <CollectGroup :tags="collection.tags" :cardTitle="collection.title" :cardSubtitle="collection.subtitle"
                :cardColor="collection.color" />
        </div>
    </div>
    <div>

    </div>
</template>

<script setup>
import Axios from '@/axios/axiosPlugin';
import { ref, onMounted } from 'vue';
import { globalState } from '@/utils/store.js';
import CollectGroup from './CollectGroupComponent.vue';
const mistakeCollections = ref([
    {
        id: 1,
        tags: ['综合', '选择'],
        title: '数学错题集',
        subtitle: '10',
        color: '#A1C9E3',
    },
    {
        id: 2,
        tags: ['数学', '代数'],
        title: '物理错题集',
        subtitle: '5',
        color: '#A1C9E3',
    },
    {
        id: 3,
        tags: ['物理', '力学'],
        title: '化学错题集',
        subtitle: '3',
        color: '#A1C9E3',
    },
    {
        id: 4,
        tags: ['化学', '化学键'],
        title: '英语错题集',
        subtitle: '7',
        color: '#A1C9E3',
    },
]);
const loaded = ref(false);
const loading = ref(false);

// onMounted(() => {
//     Axios({
//         method: 'get',
//         url: '/api/student/question/position/basicQuestion',
//         params: {
//             qid: globalState.qid,
//         },
//     })
//         .then((response) => {
//             if (response.data.status === 1) {
//                 const temp = response.data.data;
//                 mistakeCollections.value = temp;
//             }
//         })
//         .catch((error) => {
//             console.error(error);
//         });
// });

function onSearchFieldClick() {
    loading.value = true
    setTimeout(() => {
        loading.value = false
        loaded.value = true
    }, 2000)
}
</script>

<style scoped>
/* 对于一些浏览器可能需要自定义滚动条样式 */
/* 注意：这些是实验性质或特定浏览器的前缀属性 */
::-webkit-scrollbar {
    /* Webkit 浏览器（Chrome, Safari等） */
    width: 10px;
}

::-webkit-scrollbar-thumb {
    /* 滚动条滑块部分 */
    background-color: rgba(143, 156, 166, 0.8);
    border-radius: 5px;
}

/* 其他浏览器的滚动条样式支持，但请注意不是所有浏览器都支持完全自定义滚动条 */
::-moz-scrollbar {
    /* Firefox */
    width: 10px;
}

::-ms-scrollbar {
    /* Internet Explorer和旧版Edge */
    width: 10px;
}
</style>