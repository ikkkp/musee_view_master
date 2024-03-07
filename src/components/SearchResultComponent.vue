<template>
    <div class="tab-cards">
        <v-card v-for="(card, index) in colorCards" :key="index" class="color-card"
            :color="card.isActive ? '#FFFFFF' : card.color" :width="card.width"
            :height="card.isActive ? '39px' : card.height" @click="selectCard(index)">
            <div class="custom-style" :style="{
            'color': card.isActive ? '#000' : '#8F9CA6'
        }">
                {{ card.title }}
            </div>
        </v-card>
    </div>

    <v-card class="content-cards" color="#FFFFFF" elevation="0" v-show="selectedCardIndex === 0" :key='key'>
        <AnalysisCard/>
    </v-card>
    <v-card class="content-cards" color="#FFFFFF" elevation="0" v-show="selectedCardIndex === 1" >
        <StepsCard/>
    </v-card>
    <v-card class="content-cards" color="#FFFFFF" elevation="0" v-if="selectedCardIndex === 2">
        <NotesCard />
    </v-card>
</template>

<script setup>
import { ref ,watchEffect} from 'vue';
import AnalysisCard from './ResultSecComponent/AnalysisCard.vue';
import StepsCard from './ResultSecComponent/StepsCard.vue';
import NotesCard from './ResultSecComponent/NotesCard.vue';
import { globalState } from '@/utils/store.js';


const key = ref(Math.random());

watchEffect(() => {
    globalState.Analyserdata;
    key.value = Math.random();
});

const colorCards = ref([
    { color: '#D0E4F1', width: '120px', height: '34px', elevation: '0', isActive: false, title: '题目解析' },
    { color: '#D0E4F1', width: '120px', height: '34px', elevation: '0', isActive: true, title: '解题步骤' },
    { color: '#D0E4F1', width: '120px', height: '34px', elevation: '0', isActive: false, title: '做题笔记' },
]);

var selectedCardIndex = 1;
const selectCard = (index) => {
    colorCards.value.forEach((card, i) => {
        card.isActive = i === index;
        selectedCardIndex = index;
    });
};
</script>

<style scoped>
.content-cards {
    margin: 0px 10px 10px 10px;
    flex: 1;
}


.tab-cards {
    display: flex;
    margin: 0 20px 0 20px;
    width: 400px;
    justify-content: space-around;
    align-items: flex-end;
}

.custom-style {
    font-size: 20px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    font-family: 'Inter';
    font-style: normal;
    line-height: normal;
    letter-spacing: 1.7px;
}

.color-card {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
}

/* 对于一些浏览器可能需要自定义滚动条样式 */
/* 注意：这些是实验性质或特定浏览器的前缀属性 */
::-webkit-scrollbar {
    /* Webkit 浏览器（Chrome, Safari等） */
    width: 10px;
    height: 20px;
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
