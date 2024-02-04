<template>
    <v-expand-transition class="conversation-container">
        <v-card v-if="overlayValue" class="v-card--reveal" style="height: 100%;">
            <GPTSVGComponent class="svg-display" :style="{ 'width': computedWidth }" />
            {{ volume }}
            <v-card-actions>
                <v-btn :class="['compact-button', 'icon-button']" icon="mdi-arrow-up-circle" @click="toggleOverlay"
                    color="#2081C3">
                    <svg-icon type="mdi" :path="mdiMicrophoneOff" class="expand-icon"></svg-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-expand-transition>
</template>

<script setup>
import { defineProps, ref, watch, onMounted } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import GPTSVGComponent from '@/components/GPTSVGComponent.vue';
import { mdiMicrophoneOff } from '@mdi/js'
import useVolume from "@/hooks/useVolume/useVolume";
const volume = ref(0)
const props = defineProps({
    overlay: {
        type: Boolean,
        default: false,
    },
});
const emit = defineEmits(['update:overlay']);
const overlayValue = ref(props.overlay);
const computedwidth = ref(0);
onMounted(() => {
    navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((s) => {
            volume.value = useVolume(s);
        });
})
function computedWidth() {
    // 根据 volume 值映射到宽度范围
    // 这里假设音量最大为 100，对应的最大宽度为 300px
    return `${100 + volume * 20}px`;
}
watch(() => props.overlay, (val) => {
    overlayValue.value = val;
});

watch(() => volume, (val) => {
    computedwidth.value = 100+val*20;
});

function toggleOverlay() {
    overlayValue.value = !overlayValue.value;
    emit('update:overlay', overlayValue.value);
    console.log(overlayValue.value);
    stopRecording();
}
</script>

<style scoped>
.conversation-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;

}

.expand-icon {
    height: 50px;
    width: 50px;
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(-360deg);
    }
}

.svg-display {

    animation: rotate 5s linear infinite;
    /* 使用rotate动画，设置旋转时间、动画速度和无限循环 */
    transform-origin: center;
    /* 设置旋转的中心点为元素中心 */
    margin: 10px 20px 80px 20px;
}
</style>