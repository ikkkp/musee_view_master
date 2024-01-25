<template>
    <!-- Colorful Cards -->
    <div class="color-cards">
        <v-card v-for="(card, index) in colorCards" :key="index" class="color-card"
            :color="card.isActive ? '#FFFFFF' : card.color" :width="card.width"
            :height="card.isActive ? '40px' : card.height" :elevation="card.isActive ? '' : card.elevation"
            @click="selectCard(index)"></v-card>
    </div>

    <!-- Second Card in Left Section -->
    <v-card class="inner-card-2" color="#FFFFFF" elevation="0">
        <div style="height: 200px;"></div>
    </v-card>
</template>
<script setup>
import { ref } from 'vue';

const colorCards = ref([
    { color: '#D0E4F1', width: '120px', height: '37px', elevation: '0', isActive: false },
    { color: '#D0E4F1', width: '120px', height: '37px', elevation: '0', isActive: true },
    { color: '#D0E4F1', width: '120px', height: '37px', elevation: '0', isActive: false },
]);


const selectCard = (index) => {
    colorCards.value.forEach((card, i) => {
        card.isActive = i === index;
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

.color-card {
    width: 120px;
}
</style>
