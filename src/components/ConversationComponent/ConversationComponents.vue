<template>
    <v-expand-transition class="conversation-container">
        <v-card v-if="overlayValue" class="v-card--reveal">
            <GPTSVGComponent class="svg-display" :style="{ width: computedWidth + 'px' }" />
            {{ volume }}
            <div class="btn-area">
                <div> <v-btn :class="['compact-button', 'icon-button']" icon="mdi-arrow-up-circle"
                        @click="toggleOverlay" color="#2081C3" style="margin: 10px 10px;">
                        <svg-icon type="mdi" :path="mdiCloseCircleOutline" class="expand-icon"></svg-icon>
                    </v-btn>
                </div>
                <div>
                    <v-btn icon="mdi-arrow-up-circle" @click="stopRecording" color="#2081C3"
                        style="margin: 10px 10px; ">
                        <svg-icon :type="'mdi'" :path="isRecord ? mdiStopCircleOutline : mdiRadioboxMarked"
                            class="expand-icon">
                        </svg-icon>
                    </v-btn>
                </div>

            </div>
        </v-card>
    </v-expand-transition>
</template>

<script setup>
import { defineProps, ref, watch, onMounted, onUnmounted } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiCloseCircleOutline, mdiStopCircleOutline, mdiRadioboxMarked } from '@mdi/js'
import Recorder from 'recorder-core'
import 'recorder-core/src/engine/pcm'
import GPTSVGComponent from '@/components/GPTSVGComponent.vue';
import { recordSendDefault, recordSendGuide, recordSendMistake, recordSendFeynman, recordSendexplanation } from '@/utils/handleRecordRequest.js';
import { globalState } from '@/utils/store.js';
import { commonGlobalState } from '@/utils/commonStore.js';
// import useVolume from "@/hooks/useVolume/useVolume";
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
// var mediaRecorder;
// var recordedChunks = []; // 在函数内定义 recordedChunks 变量
const isRecord = ref(false);
var rec, wave;

// function startRecording() {
//     navigator.mediaDevices.getUserMedia({ audio: true })
//         .then(stream => {
//             // 尝试设置输出为PCM，注意：这可能不被所有浏览器支持
//             const options = { mimeType: 'audio/pcm' };
//             if (MediaRecorder.isTypeSupported(options.mimeType)) {
//                 mediaRecorder = new MediaRecorder(stream, options);
//             } else {
//                 // 如果不支持PCM，则回退到默认设置
//                 mediaRecorder = new MediaRecorder(stream);
//             }

//             mediaRecorder.start();
//             volume.value = useVolume(stream);
//             mediaRecorder.ondataavailable = event => {
//                 recordedChunks.push(event.data);
//             };

//             mediaRecorder.onstop = () => {
//                 const audioBlob = new Blob(recordedChunks, { type: 'audio/pcm' });

//                 const downloadLink = document.createElement('a');
//                 downloadLink.href = URL.createObjectURL(audioBlob);
//                 downloadLink.download = 'recorded_audio.pcm';

//                 document.body.appendChild(downloadLink);
//                 downloadLink.click();

//                 document.body.removeChild(downloadLink);
//             };
//         })
//         .catch(error => {
//             console.error("Error starting recording: ", error);
//         });
// }


// function stopRecording() {
//     if (mediaRecorder && mediaRecorder.state !== 'inactive') {
//         mediaRecorder.stop();
//     }
// }

/**调用open打开录音请求好录音权限**/
var recOpen = function (success) {
    rec = Recorder({
        type: "pcm", sampleRate: 16000, bitRate: 16
        , onProcess: function (buffers, powerLevel, bufferDuration, bufferSampleRate, newBufferIdx, asyncEnd) {
            wave && wave.input(buffers[buffers.length - 1], powerLevel, bufferSampleRate);
        }
    });

    rec.open(function () {
        isRecord.value = true;
        if (Recorder.WaveView) wave = Recorder.WaveView({ elem: ".recwave" });
        success && success();
    }, function (msg, isUserNotAllow) {//用户拒绝未授权或不支持
        console.log((isUserNotAllow ? "UserNotAllow，" : "") + "无法录音:" + msg);
    });
};

/**开始录音**/
function recStart() {//打开了录音后才能进行start、stop调用
    rec.start();
};

/**结束录音**/
function recStop() {
    rec.stop(function (blob, duration) {
        isRecord.value = false;
        //简单利用URL生成本地文件地址，注意不用了时需要revokeObjectURL，否则霸占内存
        //此地址只能本地使用，比如赋值给audio.src进行播放，赋值给a.href然后a.click()进行下载
        var localUrl = (window.URL || webkitURL).createObjectURL(blob);
        console.log(blob, localUrl, "时长:" + duration + "ms");
        rec.close();//释放录音资源
        rec = null;

        uploadFile(blob);

        const downloadLink = document.createElement('a');
        downloadLink.href = localUrl;
        downloadLink.download = 'recorded_audio.pcm';

        document.body.appendChild(downloadLink);
        downloadLink.click();

        document.body.removeChild(downloadLink);


    }, function (msg) {
        console.log("录音失败:" + msg);
        rec.close();
        rec = null;
    });
};

function uploadFile(blob) {
    const formData = new FormData();
    formData.append('file', blob, 'recorded_audio.pcm');

    commonGlobalState.warntitle = '小沐正在努力思考~'
    commonGlobalState.dialogVisible = true;

    switch (commonGlobalState.chatModel) {
        case 0:
            recordSendDefault(formData);
            break;
        case 1:
            recordSendGuide(formData);
            break;
        case 2:
            recordSendMistake(formData);
            break;
        case 3:
            recordSendFeynman(formData);
            break;
        case 4:
            recordSendexplanation(formData);
            break;
    }

}

function startRecording() {
    recOpen(function () {
        recStart();
    });
}

function stopRecording() {
    if (isRecord.value)
        recStop();
    else recOpen(function () {
        recStart();
    });
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