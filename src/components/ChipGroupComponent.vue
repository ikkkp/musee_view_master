<template>
    <div class="prompts_container">
        <v-row justify="space-around">
            <v-col cols="auto">
                <v-sheet elevation="0" class="py-4 px-1" style="padding:0 !important">
                    <v-chip-group elevation="0" class="py-4 px-1" style="padding-bottom: 0 !important;">
                        <div class="prompts_btn">
                            <v-btn v-for="(tag, index) in prompts" :key="tag" :color="getTagColor(index)" elevation="0"
                                rounded style="margin: 0 10px;" @click="addToTextArea(tag)">
                                <span class="chip-around">
                                    {{ tag }}
                                </span>
                            </v-btn>
                        </div>
                    </v-chip-group>
                </v-sheet>

                <v-sheet elevation="0" class="py-4 px-1" style="padding:0 !important">
                    <v-chip-group elevation="0" class="py-4 px-1" style="padding-bottom: 0 !important;">
                        <div class="prompts_btn">
                            <v-btn v-for="(tag, index) in prompts" :key="tag" :color="getTagColor(index)" elevation="0"
                                rounded style="margin: 0 10px;">
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
var prompts = [
    '反比例函数是什么？',
    '反比例函数的一般方程？',
    '辅助线怎么作？',
    '我错在哪？',
    '反比例函数的k值？',
    '笛卡尔坐标系',
    '反比例函数是什么？',
    '反比例函数的一般方程？',
    '辅助线怎么作？',
    '我错在哪？',
    '反比例函数的k值？',
    '笛卡尔坐标系',
];

</script>
<style scoped>
.prompts_container {
    height: 40vh;
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