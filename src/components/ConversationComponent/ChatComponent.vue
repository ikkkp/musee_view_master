<template>
  <v-card class="card-container inner-card-1" color="#FFF" elevation="0">
    <v-card-actions>
      <v-list-item class="w-100">
        <template v-slot:prepend>
          <v-avatar color="grey-darken-3"
            image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
            v-if="props.userName == 'user'"></v-avatar>
          <v-avatar color="grey-lignt-3" v-else>
            <GPTSVGComponent></GPTSVGComponent>
          </v-avatar>
        </template>
        <v-list-item-title>{{ props.userName == 'user' ? props.userName : "ChatGPT" }}</v-list-item-title>
        <v-list-item-subtitle>{{ props.userName == 'user' ? props.userInfo : "沐斯慧教AI大模型" }}</v-list-item-subtitle>
      </v-list-item>
    </v-card-actions>
    <v-card-subtitle style="white-space: normal; font-size: 1.1rem;    line-height: 2rem;">{{ props.userMessage
      }}</v-card-subtitle>
  </v-card>
</template>

<script setup>
import { defineProps } from 'vue';
import GPTSVGComponent from '../GPTSVGComponent.vue';
const props = defineProps({
  userMessage: {
    type: String,
    default: "",
  },
  userName: {
    type: String,
    default: "",
  },
  userInfo: {
    type: String,
    default: "",
  },
  avatarSrc: { // 更改 "vAvatar" 为实际用于表示图片源的 prop 名称，如 "avatarSrc"
    type: String,
    default: "",
  },
});
</script>

<style>
.card-container {
  margin: 30px 10px;
  flex: 1;
}
</style>