<template>
    <!-- Colorful Cards -->
    <div class="color-cards">
        <v-card v-for="(card, index) in colorCards" :key="index" class="color-card"
            :color="card.isActive ? '#FFFFFF' : card.color" :width="card.width"
            :height="card.isActive ? '39px' : card.height" 
            @click="selectCard(index)">
            <div class="custom-style" :style="{
                'color': card.isActive ? '#000' : '#8F9CA6'
            }">
                {{ card.title }}
            </div>
        </v-card>

    </div>

    <!-- Second Card in Left Section -->
    <v-card class="inner-card-2" color="#FFFFFF" elevation="0" v-if="selectedCardIndex === 0">
        <div style="height: 200px;">题目解析</div>
    </v-card>
    <v-card class="inner-card-2" color="#FFFFFF" elevation="0" v-if="selectedCardIndex === 1">
        <div style="height: 200px;">解题步骤</div>
    </v-card>
    <v-card class="inner-card-2" color="#FFFFFF" elevation="0" v-if="selectedCardIndex === 2">
        <div style="height: 200px;">做题笔记</div>
    </v-card>
</template>
<script setup>
import { ref } from 'vue';

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
.left-card {
    height: auto;
}

.inner-card-1 {
    margin: 10px;
    height: 400px;
}

.inner-card-2 {
    margin: 0px 10px 10px 10px;
    flex: 1;
}


.color-cards {
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
</style>
