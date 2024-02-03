<template>
    <div style="    display: flex;
    /* width: 80%; */
    flex-direction: row;
    justify-content: center;">
        <v-card-text style="width: 70%;    padding: 1rem 3rem !important;" >
            <v-text-field :loading="loading" density="compact" variant="solo" label="Search templates"
                append-inner-icon="mdi-magnify" single-line hide-details
                @click:append-inner="onSearchFieldClick"></v-text-field>
        </v-card-text>

    </div>
    <div style="   
     display: flex;
    flex-direction: column;
    align-items: center;  overflow-y: auto;">
        <div v-for="collection in mistakeCollections" :key="collection.id" style="margin:10px 0  ;">
            <CollectGroup :tags="collection.tags" :cardTitle="collection.title" :cardSubtitle="collection.subtitle" :cardColor="collection.color"/>
        </div>
    </div>
    <div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
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
        tags: ['填空', '几何'],
        title: '物理错题集',
        subtitle: '3',
        color: '#D0E4F1',
    },
    {
        id: 3,
        tags: ['阅读理解', '写作技巧'],
        title: '英语阅读写作错题集',
        subtitle: '5',
        color: '#A1C9E3',
    },
    {
        id: 4,
        tags: ['化学方程式', '元素周期表'],
        title: '高中化学错题集',
        subtitle: '2',
        color: '#D0E4F1',
    },
    {
        id: 5,
        tags: ['生物结构', '生态学'],
        title: '生物学错题集',
        subtitle: '4',
        color: '#A1C9E3',
    },
    // 更多其他错题集...
]);
const loaded = ref(false);
const loading = ref(false);

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