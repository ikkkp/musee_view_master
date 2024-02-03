<template>
    <v-card width="400" :color="cardColor" rounded="lg">
        <div style="padding: 5px 15px;
    font-size: x-large;
    font-weight: 600;
    color: #475863;">{{ props.cardTitle }}</div>
        <v-sheet class="tags-wrapper" :style="{ backgroundColor: cardColor }"
            style="padding-top:0px !important;padding-bottom: 0px !important;display: flex;   align-items: center;">
            <v-chip-group mandatory class="chip-group" selected-class="primary-text" style="flex: 2; ">
                <v-chip v-for="tag in tags" :key="tag" class="chip-item">{{ tag }}</v-chip>
            </v-chip-group>
            <div style="padding: 5px 15px;
    font-weight: 600;
    color: #F7F9F9;flex: 1;">累计收录：{{ props.cardSubtitle }}题</div>
        </v-sheet>
    </v-card>
</template>
  
<script setup>
import { defineProps, ref } from 'vue';

const props = defineProps({
    tags: {
        type: Array,
        required: true,
        default: [
            '综合',
            '选择',
            '填空'
        ]
    },
    cardTitle: {
        type: String,
        required: true,
        default: 'Card Title',
    },
    cardSubtitle: {
        type: String,
        default: 'Card Subtitle',
    },

    cardColor: {
        type: String,
        default: '#A1C9E3',
    },
});

</script>
  
<style>
.tags-wrapper {
    display: flex;
    padding: 10px !important;
    overflow-x: hidden;
}

.v-card-item {
    align-items: center;
    display: grid;
    flex: none;
    grid-template-areas: "prepend content append";
    grid-template-columns: max-content auto max-content;
    padding: 5px 15px;
}

.v-card-text {
    flex: 1 1 auto;
    font-size: 0.875rem;
    font-weight: 400;
    letter-spacing: 0.0178571429em;
    padding: 0rem 1rem !important;
    text-transform: none;
}

.v-chip__content {
    align-items: center;
    display: inline-flex;
    color: #5F6C6A;
    caret-color: rgb(0, 0, 0);
    font-weight: 600;
}

.v-chip--variant-tonal {
    background: #d6f3ff !important;
    color: #5F6C6A;
}
</style>