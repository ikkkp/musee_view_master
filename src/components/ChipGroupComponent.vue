<template>
    <div class="prompts_container">
        <v-row justify="space-around">
            <v-col cols="auto">
                <v-sheet elevation="0" class="py-4 px-1" style="padding:0 !important">
                    <v-chip-group elevation="0" class="py-4 px-1" style="padding-bottom: 0 !important;">
                        <div class="prompts_btn" v-if="globalState.suggest != null">
                            <v-btn v-for="(tag, index) in globalState.suggest" :key="tag" :color="getTagColor(index)"
                                elevation="0" rounded style="margin: 0 10px;" @click="addToTextArea(tag)">
                                <span class="chip-around">
                                    {{ tag }}
                                </span>
                            </v-btn>
                        </div>
                    </v-chip-group>
                </v-sheet>

                <v-sheet elevation="0" class="py-4 px-1" style="padding:0 !important">
                    <v-chip-group elevation="0" class="py-4 px-1" style="padding-bottom: 0 !important;">
                        <div class="prompts_btn" v-if="globalState.suggest != null">
                            <v-btn v-for="(tag, index) in globalState.suggest.reverse()" :key="tag" :color="getTagColor(index)"
                                elevation="0" rounded style="margin: 0 10px;" @click="addToTextArea(tag)">
                                <span class="chip-around">
                                    {{ tag }}
                                </span>
                            </v-btn>
                        </div>
                    </v-chip-group>
                </v-sheet>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
import { defineEmits } from 'vue';
import { globalState } from '@/utils/store';

// 声明将要使用的自定义事件
const emit = defineEmits(['addToTextArea']);

function addToTextArea(tag) {
    // 使用 emit 触发事件
    emit('addToTextArea', tag);
}
function getTagColor(index) {
    return '#' + tagColors[index % tagColors.length];
};
var tagColors = ["A1C9E3", "2081C3", "BED8D4"]


</script>

<style scoped>
.prompts_container {
    height: 35vh;
}

.prompts_btn {
    animation: marquee 20s linear infinite;
}

/* 伪类失效 */
.prompts_btn:hover {
    animation-play-state: paused;
}

@keyframes marquee {
    0% {
        transform: translateX(-50%);
    }

    100% {
        transform: translateX(0%);
    }
}

.chip-around {
    margin: 0 10px;
    color: #FFF;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}
</style>