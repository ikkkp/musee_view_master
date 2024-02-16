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
            <v-btn rounded="xl" size="x-large" variant="outlined" color="#388FCA" @click="() => ConversationShow = true">About
                us</v-btn>
            <v-avatar color="info" size="45px">
                <span class="text-h6">IK</span>
            </v-avatar>
        </div>
    </div>
    <div class="text-center">
        <v-dialog v-model="ConversationShow" width="auto">
            <v-card>
                <v-card-text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua.
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" block @click="ConversationShow = false">Close Dialog</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import router from '@/router';
const ConversationShow = ref(false);
const buttons = ref([
    {
        rounded: 'xl',
        size: 'x-large',
        color: '#D6F3FF',
        elevation: '0',
        fontSize: '20px',
        textColor: '#96ABB3',
        label: '沐斯拍题',
        isActive: false,
        to: '/',
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
        to: '/collection',
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
        to: '/userinfo'
    },
]);

const changeColor = (index) => {
    buttons.value.forEach((button, i) => {
        button.isActive = i === index;
    });
    router.push(buttons.value[index].to);
};
onMounted(() => {
    const path = window.location.pathname;
    if (path === '/') {
        buttons.value[0].isActive = true;
    } else if (path === '/collection') {
        buttons.value[1].isActive = true;
    } else if (path === '/userinfo') {
        buttons.value[2].isActive = true;
    }
});

</script>

<style scoped>
.header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logo-section {
    display: flex;
    align-items: center;
    width: 350px;
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
    width: 450px;
}

.about-us-section {
    width: 200px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
</style>
