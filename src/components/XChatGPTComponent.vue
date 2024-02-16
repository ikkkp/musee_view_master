<template>
    <v-card class="card">
        <v-btn :class="['compact-button', 'icon-button']" icon="mdi-format-list-bulleted">
            <svg-icon type="mdi" :path="mdiFormatListBulleted" class="icon-svg"></svg-icon>
        </v-btn>
        <div v-if="dialogueArray.length === 0" style="height: 70vh;">
            <div class="svg-container">
                <GPTSVGComponent></GPTSVGComponent>
            </div>
            <ChipGroupComponent @addToTextArea="handleTagClick" />
        </div>

        <div v-else style="height: 65vh;overflow-y: auto;margin: 20px 0 0 0;" ref="scrollContainer">
            <div v-for="(message, index) in dialogueArray" :key="index">
                <ChatComponent v-if="message.speaker == '用户'" :userMessage=message.message :avatarSrc="user.avatarSrc"
                    :userName="message.speaker" :userInfo="user.userInfo"></ChatComponent>
                <ChatComponent v-else :userMessage=message.message :avatarSrc="user.avatarSrc" :userName="message.speaker"
                    :userInfo="user.userInfo"></ChatComponent>
            </div>
        </div>
        <div class="tags-section">
            <span class="tags-title">Tags:</span>
            <v-sheet class="tags-wrapper">
                <v-chip-group mandatory class="chip-group" selected-class="primary-text">
                    <v-chip v-for="tag in tags" :key="tag" class="chip-item">{{ tag }}</v-chip>
                </v-chip-group>
            </v-sheet>
        </div>
        <div class="textarea-container" v-if="!ConversationShow">
            <v-text-field placeholder="Message" :model-value="textValue" variant="solo" rounded @click="openDialog"
                class="single-line-textarea"></v-text-field>
            <v-btn :class="['compact-button', 'icon-button']" icon="mdi-arrow-up-circle" @click="TextSend" color="#2081C3">
                <svg-icon type="mdi" :path="mdiArrowUpCircle" class="expand-icon"></svg-icon>
            </v-btn>
            <v-btn :class="['compact-button', 'icon-button']" icon="mdi-arrow-up-circle" @click="ConversationModel"
                color="#2081C3">
                <svg-icon type="mdi" :path="mdiMicrophone" class="expand-icon"
                    style="height: 40px;height: 40px;"></svg-icon>
            </v-btn>
        </div>
        <ConversationComponents v-bind:overlay="ConversationShow" @update:overlay="handleOverlayUpdate" />
    </v-card>
    <v-dialog v-model="dialog" width="auto">
        <v-card>
            <EditableArea :initMessage="textValue"></EditableArea>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, watchEffect, onMounted } from 'vue';
import { mdiArrowUpCircle, mdiFormatListBulleted, mdiMicrophone } from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon';
import ChipGroupComponent from './ChipGroupComponent.vue';
import GPTSVGComponent from './GPTSVGComponent.vue';
import EditableArea from './EditableArea.vue';
import ChatComponent from '../components/ConversationComponent/ChatComponent.vue';
import ConversationComponents from './ConversationComponent/ConversationComponents.vue';

const textValue = ref('');
const ConversationShow = ref(false);
const dialog = ref(false);
const user = ref({ 'userName': '测试01', 'avatarSrc': 'test', 'userInfo': '初高中万千少萝的梦' });
const scrollContainer = ref(null);

// 与大模型对话的会话信息数组（初中数学题相关）
const dialogueArray = ref([
    {
        "speaker": "用户",
        "message": "你好，大模型！请问能帮我解决一道初中数学题吗？",
        "avatarSrc": "user-avatar.jpg", // 用户头像假设路径
        "timestamp": "2023-03-24T16:30:00Z"
    },
    {
        "speaker": "大模型",
        "message": "当然可以，请告诉我具体题目内容。",
        "avatarSrc": "model-avatar.png", // 模型头像假设路径
        "timestamp": "2023-03-24T16:30:05Z"
    },
    {
        "speaker": "用户",
        "message": "好的，这是一道代数题：已知 2x + 3 = 7，求 x 的值。",
        "avatarSrc": "user-avatar.jpg",
        "timestamp": "2023-03-24T16:30:10Z"
    },
    {
        "speaker": "大模型",
        "message": "解这个方程很简单，首先将等式两边减去3得到：2x = 4，然后两边同时除以2得到：x = 2。",
        "avatarSrc": "model-avatar.png",
        "timestamp": "2023-03-24T16:30:15Z"
    },
    {
        "speaker": "用户",
        "message": "非常感谢，那接下来这是一道几何题：在直角三角形中，直角边长分别为3和4，求斜边长度。",
        "avatarSrc": "user-avatar.jpg",
        "timestamp": "2023-03-24T16:30:20Z"
    },
    {
        "speaker": "大模型",
        "message": "根据勾股定理，斜边的长度等于两直角边平方和的平方根。所以，斜边长度 c = √(3² + 4²) = √(9 + 16) = √25 = 5。",
        "avatarSrc": "model-avatar.png",
        "timestamp": "2023-03-24T16:30:25Z"
    },
]);


onMounted(() => {
    MathJax.texReset();
    MathJax.typesetClear();
    MathJax.typesetPromise();
    textValue.value = '';
    localStorage.setItem('renderedFormula', '');
    setTimeout(() => {
        scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
    }, 0);
});

watchEffect(() => {
    dialog.value;
    textValue.value = localStorage.getItem('renderedFormula');
});

function TextSend() {
    dialogueArray.value.push({
        "speaker": "用户",
        "message": textValue.value,
        "avatarSrc": "user-avatar.jpg",
        "timestamp": "2023-03-24T16:30:20Z"
    });
    setTimeout(() => {
        scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
    }, 0);
    textValue.value = '';
    localStorage.setItem('renderedFormula', '');
}

function ConversationModel() {
    ConversationShow.value = true;
}

function handleOverlayUpdate(value) {
    ConversationShow.value = value;
};

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
    padding: 20px 10px 20px 10px;
    height: 100%;
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
    margin: 5px;
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
    height: 49px;
    width: 48px;
}

.primary-text {
    color: primary;
}

/* 对于一些浏览器可能需要自定义滚动条样式 */
/* 注意：这些是实验性质或特定浏览器的前缀属性 */
::-webkit-scrollbar {
    /* Webkit 浏览器（Chrome, Safari等） */
    width: 10px;
}

::-webkit-scrollbar-thumb {
    /* 滚动条滑块部分 */
    background-color: rgba(143, 156, 166, 0.8);
    border-radius: 5px;
}

/* 其他浏览器的滚动条样式支持，但请注意不是所有浏览器都支持完全自定义滚动条 */
::-moz-scrollbar {
    /* Firefox */
    width: 10px;
}

::-ms-scrollbar {
    /* Internet Explorer和旧版Edge */
    width: 10px;
}
</style>