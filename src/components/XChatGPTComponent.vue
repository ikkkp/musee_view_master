<template>
  <v-card class="card">

    <div class="flex-container">
      <div class="menu-container">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn :class="['compact-button', 'icon-button']" icon="mdi-format-list-bulleted" color="rgb(32, 129, 195)"
              v-bind="props">
              <svg-icon type="mdi" :path="mdiFormatListBulletedType" class="icon-svg" color="#FFF"></svg-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index" :value="index" @click="handleClick(index)"
              :style="{ backgroundColor: index == commonGlobalState.chatModel ? 'rgb(32, 129, 195)' : 'white' }">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <div class="switch-container">
        <v-switch v-model="commonGlobalState.globalModel" :label="`沉浸式`" hide-details inset
          color="rgb(32, 129, 195)"></v-switch>
      </div>
    </div>


    <div v-if="globalState.dialogueArray.length === 0" style="height: 70vh;">
      <div class="svg-container">
        <GPTSVGComponent></GPTSVGComponent>
        <!--文字标签-->
        <div class="prompts_btn">
          <v-btn
            style="background: rgb(161, 201, 227);height: 25px; background-image: url('../assets/flash.png');color: white; font-weight: bold;">
            <v-icon color='rgb(25,192,122)' style="left: -7px">mdi-flash</v-icon>
            <template v-if="commonGlobalState.chatModel === 0">
              默认配置
            </template>
            <template v-else-if="commonGlobalState.chatModel === 1">
              引导式问答
            </template>
            <template v-else-if="commonGlobalState.chatModel === 2">
              错题分析
            </template>
            <template v-else-if="commonGlobalState.chatModel === 3">
              举一反三
            </template>
            <template v-else>
              个性化解析
            </template>
          </v-btn>
        </div>
      </div>
      <ChipGroupComponent @addToTextArea="handleTagClick" />
    </div>

    <div v-else style="height: 65vh;overflow-y: auto;margin: 20px 0 0 0;" ref="scrollContainer">
      <div v-for="(message, index) in globalState.dialogueArray.slice(1)" :key="index">
        <ChatComponent v-if="message.speaker == 'user'" :userMessage="message.message" :avatarSrc="user.avatarSrc"
          :userName="message.speaker" :userInfo="user.userInfo"></ChatComponent>
        <ChatComponent v-else :userMessage="message.message" :avatarSrc="user.avatarSrc" :userName="message.speaker"
          :userInfo="user.userInfo"></ChatComponent>
      </div>

    </div>
    <div class="tags-section">
      <v-sheet class="tags-wrapper">
        <v-chip-group mandatory class="chip-group" selected-class="primary-text">
          <v-chip v-for="tag in tags" :key="tag" class="chip-item" @click="TagClick(tag)">{{ tag }}</v-chip>
        </v-chip-group>
      </v-sheet>
    </div>

    <!-- 更改 -->
    <div class="textarea-container" v-if="!ConversationShow">
      <v-text-field placeholder="Message" :model-value="textValue" variant="solo" rounded @click="openDialog"
        class="single-line-textarea"></v-text-field>

      <!-- 更改 -->
      <v-btn
        v-if="commonGlobalState.chatModel !== 0 && commonGlobalState.chatModel !== 3 && commonGlobalState.btnflag === true"
        :class="['compact-button', 'icon-button']" icon="mdi-arrow-up-circle" @click="FirstSend" color="#2081C3" rounded
        width="auto" style="padding: 5px;border-radius: 15px;">
        开始对话
      </v-btn>

      <!-- 更改 -->
      <v-btn v-else :class="['compact-button', 'icon-button']" icon="mdi-arrow-up-circle" @click="TextSend"
        color="#2081C3">
        <svg-icon type="mdi" :path="mdiArrowUpCircle" class="expand-icon"></svg-icon>
      </v-btn>


      <v-btn :class="['compact-button', 'icon-button']" icon="mdi-arrow-up-circle" @click="ConversationModel"
        color="#2081C3">
        <svg-icon type="mdi" :path="mdiMicrophone" class="expand-icon" style="height: 40px;height: 40px;"></svg-icon>
      </v-btn>
    </div>

    <ConversationComponents v-bind:overlay="ConversationShow" @update:overlay="handleOverlayUpdate" />
  </v-card>
  <!-- <v-btn :class="['compact-button', 'icon-button']" icon="mdi-arrow-up-circle" @click="test"
         color="#2081C3">
  </v-btn> -->
  <v-dialog v-model="dialog" width="auto">
    <v-card>
      <EditableArea :initMessage="textValue"></EditableArea>
    </v-card>
  </v-dialog>


</template>

<script setup>
import { ref, watchEffect, onMounted, nextTick, onUpdated, watch } from 'vue';
import { mdiArrowUpCircle, mdiMicrophone, mdiFormatListBulletedType } from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon';
import ChipGroupComponent from './ChipGroupComponent.vue';
import GPTSVGComponent from './GPTSVGComponent.vue';
import EditableArea from './EditableArea.vue';
import ChatComponent from '../components/ConversationComponent/ChatComponent.vue';
import ConversationComponents from './ConversationComponent/ConversationComponents.vue';
import { sendDefault, sendGuide, sendMistake, sendFeynman, sendexplanation } from '@/utils/handleChatRequest.js';
import { globalState } from '@/utils/store.js';
import { commonGlobalState } from '@/utils/commonStore.js';
import { getCommunication, getFeiman, getIns, getPersonalCom, getWrong } from "../utils/handleChatRequest";

const textValue = ref('');
const ConversationShow = ref(false);
const dialog = ref(false);
const items = [
  { title: '默认配置' },
  { title: '引导式问答' },
  { title: '错题分析' },
  { title: '费曼学习法' },
  { title: '个性化解析' },
];
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

function handleClick(index) {
  commonGlobalState.chatModel = index;
  if (commonGlobalState.chatModel == 2) {
    commonGlobalState.warntitle = '该模式请上传错解后进行问答'
    commonGlobalState.dialogVisible = true;
    setTimeout(() => {
      commonGlobalState.dialogVisible = false;
    }, 2000);
  }
  globalState.dialogueArray.splice(0, globalState.dialogueArray.length);
  recoverMsg();
}

function TagClick(tag) {
  textValue.value += tag;
  localStorage.setItem('renderedFormula', textValue.value);
}


function TextSend() {
  commonGlobalState.warntitle = '小沐正在努力思考~'
  commonGlobalState.dialogVisible = true;
  console.log('textValue.value', textValue.value);
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
  textValue.value = '';
  localStorage.setItem('renderedFormula', '');
}

//更改
function FirstSend() {
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
  commonGlobalState.dialogVisible = true;
  commonGlobalState.btnflag = false;
}

function recoverMsg() {
  switch (commonGlobalState.chatModel) {
    case 0:
      getCommunication();
      break;
    case 1:
      getIns();
      break;
    case 2:
      getWrong();
      break;
    case 3:
      getFeiman();
      break;
    case 4:
      getPersonalCom();
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
.flex-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  width: 50px;
  height: 50px;
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
