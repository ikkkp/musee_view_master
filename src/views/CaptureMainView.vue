<template>
    <div class="container">
        <!-- Left Section -->
        <div class="left-section">
            <v-card class="left-card" color="#A1C9E3">
                <!-- First Card in Left Section -->
                <v-card class="inner-card" color="#F7F9F9">
                    <UploadPicComponent></UploadPicComponent>
                    <DoClassifyComponent></DoClassifyComponent>
                </v-card>
                <SearchResultComponent />
            </v-card>
        </div>

        <!-- Right Section -->
        <div class="right-section" :key="componentKey">
            <XChatGPTComponent></XChatGPTComponent>
        </div>

        <v-dialog v-model="commonGlobalState.globalModel" width="70vw" persistent>
            <v-card elevation="0">
                <div style="display: flex;justify-content: space-between;margin: 0px 10px;">
                    <v-switch v-model="commonGlobalState.globalModel" :label="`沉浸式`" hide-details inset
                        color="rgb(32, 129, 195)"></v-switch>
                    <div class="menu-container">
                    </div>
                </div>
                <keep-alive>
                    <v-stepper editable :items="['拍照', '拍错题', '启发式问答', '个性化解析', '举一反三', '题解']" elevation="0"
                        hide-actions @update:modelValue="onStepChange">
                        <template v-slot:item.1>
                            <div
                                style="margin: 10px;display: flex;align-items: center;flex-direction: row;justify-content: space-around;height: 30vh;">
                                <UploadPicComponent></UploadPicComponent>
                            </div>
                        </template>
                        <template v-slot:item.2>
                            <div
                                style="margin: 10px;display: flex;align-items: center;flex-direction: row;justify-content: space-around;height: 30vh;">
                                <UploadPicComponent></UploadPicComponent>
                            </div>
                        </template>
                        <template v-for="i in [3, 4, 5]" :key="i" v-slot:[`item.${i}`]>
                            <div>
                                <div v-if="globalState.dialogueArray.length === 0" style="height: 60vh;">
                                    <div class="svg-container">
                                        <GPTSVGComponent></GPTSVGComponent>
                                    </div>
                                    <ChipGroupComponent @addToTextArea="handleTagClick" />
                                </div>
                                <div v-else style="height: 50vh;overflow-y: auto;margin: 20px 0 0 0;"
                                    ref="scrollContainer">
                                    <div v-for="(message, index) in globalState.dialogueArray.slice(1)" :key="index">
                                        <ChatComponent v-if="message.speaker == 'user'" :userMessage="message.message"
                                            :avatarSrc="user.avatarSrc" :userName="message.speaker"
                                            :userInfo="user.userInfo"></ChatComponent>
                                        <ChatComponent v-else :userMessage="message.message" :avatarSrc="user.avatarSrc"
                                            :userName="message.speaker" :userInfo="user.userInfo"></ChatComponent>
                                    </div>

                                </div>
                                <div class="tags-section">
                                    <v-sheet class="tags-wrapper">
                                        <v-chip-group mandatory class="chip-group" selected-class="primary-text">
                                            <v-chip v-for="tag in tags" :key="tag" class="chip-item"
                                                @click="TagClick(tag)">{{ tag }}</v-chip>
                                        </v-chip-group>
                                    </v-sheet>
                                </div>

                                <!-- 更改 -->
                                <div class="textarea-container" v-if="!ConversationShow">
                                    <v-text-field placeholder="Message" :model-value="textValue" variant="solo" rounded
                                        @click="openDialog" class="single-line-textarea"></v-text-field>

                                    <!-- 更改 -->
                                    <v-btn
                                        v-if="commonGlobalState.chatModel !== 0 && commonGlobalState.chatModel !== 3 && commonGlobalState.btnflag === true"
                                        :class="['compact-button', 'icon-button']" icon="mdi-arrow-up-circle"
                                        @click="FirstSend" color="#2081C3" rounded width="auto"
                                        style="padding: 5px;border-radius: 15px;">
                                        开始对话
                                    </v-btn>

                                    <!-- 更改 -->
                                    <v-btn v-else :class="['compact-button', 'icon-button']" icon="mdi-arrow-up-circle"
                                        @click="TextSend" color="#2081C3">
                                        <svg-icon type="mdi" :path="mdiArrowUpCircle" class="expand-icon"></svg-icon>
                                    </v-btn>


                                    <v-btn :class="['compact-button', 'icon-button']" icon="mdi-arrow-up-circle"
                                        @click="ConversationModel" color="#2081C3">
                                        <svg-icon type="mdi" :path="mdiMicrophone" class="expand-icon"
                                            style="height: 40px;height: 40px;"></svg-icon>
                                    </v-btn>
                                </div>

                                <ConversationComponents v-bind:overlay="ConversationShow"
                                    @update:overlay="handleOverlayUpdate" />
                            </div>
                        </template>

                        <template v-slot:item.6>
                            <div style="height: 50vh">
                                <StepsCard></StepsCard>
                                <AnalysisCard></AnalysisCard>
                            </div>
                        </template>
                    </v-stepper>
                </keep-alive>
            </v-card>
        </v-dialog>
    </div>
    <v-dialog v-model="dialog" width="auto">
        <v-card>
            <EditableArea :initMessage="textValue"></EditableArea>
        </v-card>
    </v-dialog>

</template>

<script setup>
import SearchResultComponent from '@/components/SearchResultComponent.vue';
import UploadPicComponent from '@/components/UploadPicComponent.vue';
import XChatGPTComponent from '@/components/XChatGPTComponent.vue';
import DoClassifyComponent from '@/components/DoClassifyComponent.vue';
import { globalState } from '@/utils/store';
import { ref, watch, onMounted, watchEffect, onUpdated, nextTick } from 'vue';
import { mdiArrowUpCircle, mdiMicrophone, mdiCog } from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon';
import ChipGroupComponent from '@/components/ChipGroupComponent.vue';
import GPTSVGComponent from '@/components/GPTSVGComponent.vue';
import ChatComponent from '@/components/ConversationComponent/ChatComponent.vue';
import ConversationComponents from '@/components/ConversationComponent/ConversationComponents.vue';
import { commonGlobalState } from '@/utils/commonStore.js';
import AnalysisCard from '@/components/ResultSecComponent/AnalysisCard.vue';
import EditableArea from '@/components/EditableArea.vue';
import { sendDefault, sendGuide, sendMistake, sendFeynman, sendexplanation } from '@/utils/handleChatRequest.js';
import { getCommunication, getFeiman, getIns, getPersonalCom, getWrong } from "../utils/handleChatRequest";
import StepsCard from '@/components/ResultSecComponent/StepsCard.vue';

const componentKey = ref(0);
const textValue = ref('');
const ConversationShow = ref(false);
const dialog = ref(false);
function onStepChange(newStep) {
    console.log('newStep:', newStep);
    switch (newStep) {
        case 1:
            commonGlobalState.chatModel = 0;
            break;
        case 2:
            commonGlobalState.chatModel = 2;
            break;
        case 3:
            commonGlobalState.chatModel = 1;
            break;
        case 4:
            commonGlobalState.chatModel = 4;
            break;
        case 5:
            commonGlobalState.chatModel = 3;
            break;
    }
    recoverMsg();
}

const user = ref({ 'userName': '测试01', 'avatarSrc': 'user-avatar.jpg', 'userInfo': '别人能做到的事情，我也能做到。' });
const scrollContainer = ref(null);
onMounted(() => {
    updateFormula();
    textValue.value = '';
    localStorage.setItem('renderedFormula', '');
    user.username = localStorage.getItem('username');
});

function convert() {
    MathJax.texReset();
    MathJax.typesetClear();
    MathJax.typesetPromise();
}

function updateFormula() {
    setTimeout(() => {
        nextTick(convert);
    }, 0);
}

// 监听某个响应式状态的变化
watch(globalState, (newValue, oldValue) => {
    // 当状态发生变化时，改变key以强制组件重新创建
    console.log('render again');
    componentKey.value++;
});

watchEffect(() => {
    dialog.value;
    textValue.value = localStorage.getItem('renderedFormula');
});

watch(globalState.dialogueArray, () => {
    scrollToBottom();
});


// 使用onUpdated生命周期钩子确保在每次组件更新后滚动到底部
onUpdated(() => {
    scrollToBottom();
});

function scrollToBottom() {
    // 使用nextTick来确保DOM更新完成
    nextTick(() => {
        const container = scrollContainer.value;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    });
}

function TagClick(tag) {
    textValue.value += tag;
    localStorage.setItem('renderedFormula', textValue.value);
}


function TextSend() {
    try {
        commonGlobalState.warntitle = '小沐正在努力思考~'
        commonGlobalState.dialogVisible = true;
        switch (commonGlobalState.chatModel) {
            case 0:
                sendDefault(textValue.value);
                break;
            case 1:
                sendGuide(textValue.value);
                break;
            case 2:
                sendMistake(textValue.value);
                break;
            case 3:
                sendFeynman(textValue.value);
                break;
            case 4:
                sendexplanation(textValue.value);
                break;
        }
        textValue.value = ' ';
        localStorage.setItem('renderedFormula', '');
    } catch (error) {
        textValue.value = '';
        localStorage.setItem('renderedFormula', '');
    }

}

//更改
function FirstSend() {
    console.log('FirstSend', textValue.value);
    switch (commonGlobalState.chatModel) {
        case 1:
            sendGuide(textValue.value);
            break;
        case 2:
            sendMistake(textValue.value);
            break;
        case 4:
            sendexplanation(textValue.value);
            break;
    }
    textValue.value = "";
    commonGlobalState.warntitle = '小沐正在思考中~'
    commonGlobalState.btnflag = false;
}

function recoverMsg() {
    switch (commonGlobalState.chatModel) {
        case 0:
            getCommunication();
            break;
        case 1:
            getIns();
            console.log('getIns');
            break;
        case 2:
            getWrong();
            console.log('getWrong');
            break;
        case 3:
            getFeiman();
            console.log('getFeiman');
            break;
        case 4:
            getPersonalCom();
            console.log('getPersonalCom');
            break;
    }
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

var tags = globalState.steps.map((item, index) => {
    return `步骤${index + 1}`;
});

</script>

<style scoped>
.container {
    height: 85vh;
    display: flex;
}

.left-section {
    width: 45vw;
    padding: 20px 5px 0px 20px;
    display: flex;
    min-width: 500px;
}

.right-section {
    width: 55vw;
    min-width: 500px;
    padding: 20px 20px 0px 5px
}

.left-card {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}

.inner-card {
    max-height: 350px;
    margin: 10px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
}

.menu-container,
.switch-container {
    margin-right: 10px;
}

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
    padding: 0px 20px;
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
</style>