<template>
    <v-card class="card">
        <v-btn :class="['compact-button', 'icon-button']" icon="mdi-format-list-bulleted">
            <svg-icon type="mdi" :path="mdiFormatListBulleted" class="icon-svg"></svg-icon>
        </v-btn>
        <div class="svg-container">
            <GPTSVGComponent></GPTSVGComponent>
        </div>
        <ChipGroupComponent @addToTextArea="handleTagClick" />

        <div class="tags-section">
            <span class="tags-title">Tags:</span>
            <v-sheet class="tags-wrapper">
                <v-chip-group mandatory class="chip-group" selected-class="primary-text">
                    <v-chip v-for="tag in tags" :key="tag" class="chip-item">{{ tag }}</v-chip>
                </v-chip-group>
            </v-sheet>
        </div>

        <div class="textarea-container">
            <v-text-field placeholder="Message" :model-value="textValue" variant="solo" rounded @click="openDialog"
                class="single-line-textarea"></v-text-field>
            <v-btn :class="['compact-button', 'icon-button']" icon="mdi-arrow-up-circle"
                @click="textReset">
                <svg-icon type="mdi" :path="mdiArrowUpCircle" class="expand-icon"></svg-icon>
            </v-btn>
        </div>
    </v-card>
    <v-dialog v-model="dialog" width="auto">
        <v-card>
            <EditableArea :initMessage="textValue"></EditableArea>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, watchEffect, onMounted } from 'vue';
import { mdiArrowUpCircle, mdiFormatListBulleted } from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon';
import ChipGroupComponent from './ChipGroupComponent.vue';
import GPTSVGComponent from './GPTSVGComponent.vue';
import EditableArea from './EditableArea.vue';


const textValue = ref('');
const dialog = ref(false);
onMounted(() => {
    textReset();
});

watchEffect(() => {
    dialog.value;
    textValue.value = localStorage.getItem('renderedFormula');
});

function textReset(){
    textValue.value = '';
    localStorage.setItem('renderedFormula', '');

}

function handleTagClick(tag) {
    textValue.value += tag;
    localStorage.setItem('renderedFormula', textValue.value);
}

function openDialog() {
    dialog.value = true;
}

var tags = [
    '#步骤1',
    '#步骤2',
    '#步骤3'
];
</script>

<style scoped>
.card {
    height: 85vh;
    padding: 20px 5px 20px 20px;
    display: flex;
    flex-direction: column;
}

.svg-container {
    display: flex;
    justify-content: flex-end;
    height: 40%;
    flex-direction: column;
    align-items: center;
}

.tags-section {
    display: flex;
    align-items: center;
    padding-left: 40px;
}

.tags-title {
    color: #398FCA;
    font-family: Inter;
    font-size: 16px;
    font-weight: 600;
}

.tags-wrapper {
    padding: 10px !important;
    overflow-x: hidden;
}

.compact-button {
    density: compact;
    elevation: 0;
    width: 30px;
    height: 30px;
}

.icon-button {
    width: 52px;
    height: 52px;
}

.textarea-container {
    display: flex;
    padding: 0 10px 0 30px;
    width: 95%;
}

.textarea-field {
    rows: 1;
}

.expand-icon {
    height: 50px;
    width: 50px;
}

.primary-text {
    color: primary;
}
</style>