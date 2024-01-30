<template>
    <v-card class="card-container">
        <v-btn density="compact" icon="mdi-format-list-bulleted" elevation="0" width="30" height="30">
            <svg-icon type="mdi" :path="mdiFormatListBulleted" style="height: 30px;width: 30px;"></svg-icon>
        </v-btn>
        <div class="svg-container">
            <GPTSVGComponent></GPTSVGComponent>
        </div>
        <ChipGroupComponent />
        <div class="tags-container">
            <span class="tags-font">Tags:</span>
            <v-sheet elevation="0" class="py-4 px-1 tags-sheet">
                <v-chip-group mandatory selected-class="text-primary">
                    <v-chip v-for="tag in tags" :key="tag">
                        {{ tag }}
                    </v-chip>
                </v-chip-group>
            </v-sheet>
        </div>

        <div class="textarea">
            <v-textarea placeholder="Message" rows="1" variant="solo" rounded @click="openDialog"></v-textarea>
            <v-btn density="compact" icon="mdi-format-list-bulleted" elevation="0" width="52" height="52">
                <svg-icon type="mdi" :path="mdiArrowUpCircle" class="textarea-svg"></svg-icon>
            </v-btn>
        </div>
    </v-card>
    <v-dialog v-model="dialog" width="auto">
        <v-card>
            <EditableArea></EditableArea>

        </v-card>
    </v-dialog>
</template>

<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import ChipGroupComponent from './ChipGroupComponent.vue';
import GPTSVGComponent from './GPTSVGComponent.vue';
import EditableArea from './EditableArea.vue';
import { mdiFormatListBulleted } from '@mdi/js';
import { ref } from 'vue';

const dialog = ref(false);

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
.card-container {
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


.tags-container {
    display: flex;
    align-items: center;
    padding: 0 0 0 40px;
}

.tags-font {
    color: #398FCA;
    font-family: Inter;
    font-size: 16px;
    font-weight: 600;
}

.tags-sheet {
    padding: 10px !important;
    overflow-x: hidden;
}

.textarea {
    display: flex;
    padding: 0 10px 0 30px;
    width: 95%
}

.textarea-svg {
    height: 50px;
    width: 50px;
}
</style>