<template>
    <div class="card-container">
        <v-card class="main-card" :color="cardColor" rounded="lg" elevation="0">
            <div class="card-title">{{ props.cardTitle }}</div>
            <div class="card-msg">{{ props.cardMsg }}</div>
            <div class="card-time-chip">
                <v-chip-group mandatory class="chip-group" selected-class="primary-text">
                    <v-chip class="chip-item">{{ props.cardTime }}</v-chip>
                </v-chip-group>
                <v-sheet class="tags-wrapper" :style="{ backgroundColor: cardColor }">
                    <v-chip-group mandatory class="chip-group" selected-class="primary-text">
                        <v-chip v-for="tag in tags" :key="tag" class="chip-item">{{ tag }}</v-chip>
                    </v-chip-group>
                </v-sheet>
            </div>
        </v-card>
        <v-card class="image-card" width="360" height="200" elevation="0" :image="props.imgSrc"></v-card>
    </div>
</template>
  
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    tags: {
        type: Array,
        required: true,
        default: () => ['综合', '选择', '填空'],
    },
    cardTitle: {
        type: String,
        required: true,
        default: '',
    },
    cardMsg: {
        type: String,
        default: '',
    },
    imgSrc: {
        type: String,
        default: 'https://images.unsplash.com/photo-1439405326854-014607f694d7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    cardTime: {
        type: String,
        default: '',
    },
    cardColor: {
        type: String,
        default: '#D0E4F1',
    },
});
</script>
  
<style scoped>
.card-container {
    display: flex;
    align-items: center;
    background-color: #D0E4F1;
    margin: 0 10px;
    border-radius: 10px;
}

.card-title {
    padding: 5px 20px;
    font-size: x-large;
    font-weight: 600;
    color: rgb(71, 88, 99);
}

.card-msg {
    padding: 10px 20px 0 20px;
    margin-bottom: 10px;
    color: rgb(95, 108, 106);
    caret-color: rgb(0, 0, 0);
    font-weight: 600;
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.5em;
}

.card-time-chip {
    display: flex;
    align-items: center;
    color: #BED8D4;
    caret-color: rgb(0, 0, 0);
    font-weight: 600;
    padding: 0px 20px;
}

.chip-group {
    padding: 0;
}

.chip-item {
    /* 根据实际需求添加具体的_chip样式 */
}

.tags-wrapper {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    display: flex;
    align-items: center;
    
}

.main-card {
    flex: 4;
}

.primary-text {
    /* 在这里添加选中时的样式 */
}

.image-card {
    border-radius: 10px;
    margin: 10px 10px;
    flex: 5;
}
</style>