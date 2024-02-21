<template>
    <v-expand-transition class="conversation-container">
        <v-card v-if="overlayValue" class="v-card--reveal">
            <GPTSVGComponent class="svg-display" :style="{ width: computedWidth + 'px' }" />
            {{ volume }}
            <div class="btn-area">
                <div> <v-btn :class="['compact-button', 'icon-button']" icon="mdi-arrow-up-circle" @click="toggleOverlay"
                        color="#2081C3" style="margin: 10px 10px;">
                        <svg-icon type="mdi" :path="mdiCloseCircleOutline" class="expand-icon"></svg-icon>
                    </v-btn>
                </div>
                <div>
                    <v-btn icon="mdi-arrow-up-circle" @click="stopRecording" color="#2081C3" style="margin: 10px 10px; ">
                        <svg-icon type="mdi" :path="mdiStopCircleOutline" class="expand-icon"></svg-icon>
                    </v-btn>
                </div>

            </div>
        </v-card>
    </v-expand-transition>
</template>

<script setup>
import { defineProps, ref, watch, onMounted, onUnmounted, nextTick } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import GPTSVGComponent from '@/components/GPTSVGComponent.vue';
import { mdiCloseCircleOutline, mdiStopCircleOutline } from '@mdi/js'
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
const computedWidth = ref(200);
var mediaRecorder;
var recordedChunks = []; // 在函数内定义 recordedChunks 变量


function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            volume.value = useVolume(stream);
            mediaRecorder.ondataavailable = event => {
                recordedChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(recordedChunks, { type: 'audio/wav' });

                const downloadLink = document.createElement('a');
                downloadLink.href = URL.createObjectURL(audioBlob);
                downloadLink.download = 'recorded_audio.wav';

                document.body.appendChild(downloadLink);
                downloadLink.click();

                document.body.removeChild(downloadLink);
            };
        })
        .catch(error => {
            console.error("Error starting recording: ", error);
        });
}

function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
    }
}

let intervalId = null;
onMounted(() => {
    let increasing = true; // 初始设定为递增

    intervalId = setInterval(() => {
        if (computedWidth.value >= 200) {
            increasing = false; // 达到300后开始递减
        } else if (computedWidth.value <= 100) {
            increasing = true; // 达到100后开始递增
        }

        if (increasing) {
            computedWidth.value += 5; // 递增宽度
        } else {
            computedWidth.value -= 5; // 递减宽度
        }
    }, 33.33); // 30fps
});

onUnmounted(() => {
    if (intervalId) {
        clearInterval(intervalId);
    }
});

watch(() => props.overlay, (val) => {
    overlayValue.value = val;
    if (val) {
        startRecording();
    } else {
        stopRecording();
    }
});



function toggleOverlay() {
    stopRecording();
    overlayValue.value = !overlayValue.value;
    emit('update:overlay', overlayValue.value);
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
    height: 49px;
    width: 49px;
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
    margin: 10px 20px 50px 20px;
}

.btn-area {
    display: flex;


}
</style>