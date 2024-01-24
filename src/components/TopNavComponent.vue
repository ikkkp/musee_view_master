<script setup>
import { ref } from 'vue';
const buttons = ref([
    {
        rounded: 'xl',
        size: 'x-large',
        color: '#D6F3FF',
        elevation: '0',
        fontSize: '20px',
        textColor: '#96ABB3',
        label: '沐斯拍题',
        isActive: true,
    },
    {
        rounded: 'xl',
        size: 'x-large',
        color: '#D6F3FF',
        elevation: '0',
        fontSize: '20px',
        textColor: '#96ABB3',
        label: '错题集',
        isActive: false,
    },
    {
        rounded: 'xl',
        size: 'x-large',
        color: '#D6F3FF',
        elevation: '0',
        fontSize: '20px',
        textColor: '#96ABB3',
        label: '学生档案',
        isActive: false,
    },
]);

const changeColor = (index) => {
    buttons.value.forEach((button, i) => {
        button.isActive = i === index;
    });
};

</script>

<template>
    <div class="header-container">
        <div class="logo-section">
            <img src="@/icons/ChatGPT.png" alt="" class="logo-image">
            <div class="logo-text">
                <div class="main-title">Musee</div>
                <div class="subtitle">Education</div>
            </div>
        </div>
        <div class="button-section">
            <v-btn v-for="(button, index) in buttons" :key="index" :rounded="button.rounded" :size="button.size"
                :color="button.isActive ? '#2081C3' : button.color" :elevation="button.elevation"
                :style="{ fontSize: button.fontSize, color: button.isActive ? '#FFFFFF' : button.textColor }"
                @click="changeColor(index)">
                {{ button.label }}
            </v-btn>
        </div>
        <div class="about-us-section">
            <v-btn rounded="xl" size="x-large" variant="outlined" color="#388FCA">About us</v-btn>
            <v-avatar color="info" size="45px">
                <span class="text-h6">IK</span>
            </v-avatar>
        </div>
    </div>
</template>

<style scoped>
.header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logo-section {
    display: flex;
    align-items: center;
}

.logo-image {
    height: 60px;
    padding: 5px;
}

.logo-text {
    color: black;
    font-size: xx-large;
    font-weight: bolder;
    padding: 10px 10px;
    display: flex;
}

.main-title {
    color: #388fca;
    font-weight: bold;
}

.subtitle {
    color: #a1c9e3;
    font-weight: bold;
}

.button-section {
    display: flex;
    justify-content: space-around;
    width: 35%;
}

.about-us-section {
    width: 200px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
</style>
