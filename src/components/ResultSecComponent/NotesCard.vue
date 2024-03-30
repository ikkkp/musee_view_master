<template>
    <div v-if="hasData" class="text-area" @click="openNotesCard">
        <div v-html="textValue"></div>
    </div>
    <template v-else>
        <div class="text-area empty-area" @click="openNotesCard">
            <img src="@/images/empty-picture/no_data.svg" style="height: 50%" />
            <div class="text-font">点击任意处创建笔记</div>
        </div>
    </template>
    <v-dialog v-model="dialog" width="auto">
        <v-card>
            <NotesEditableArea :initMessage="textValue"></NotesEditableArea>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, watchEffect, onMounted ,watch} from 'vue';
import NotesEditableArea from '../NotesEditableArea.vue';
import Axios from '@/axios/axiosPlugin';
import { globalState } from '@/utils/store';

const dialog = ref(false);
const textValue = ref('');
const hasData = ref(false);

onMounted(() => {
    localStorage.setItem('Notes', '');
    Axios({
        method: 'post',
        url: '/api/student/question/getnote',
        data: {
            qid: globalState.history[0].qid,
        }
    }).then((res) => {
        textValue.value = res.data.data;
        hasData.value = res.data.data !== '';
        localStorage.setItem('Notes', res.data.data);
    });
});

watch(() => dialog.value, () => {
    if(dialog.value === false){
        textValue.value = localStorage.getItem('Notes');
        Axios({
        method: 'post',
        url: '/api/student/question/note',
        data: {
            qid: globalState.history[0].qid,
            note: textValue.value
        }
    }).then((res) => {
        textValue.value = res.data.data;
        hasData.value = res.data.data !== '';
        localStorage.setItem('Notes', textValue.value);
    });
    }

});

watchEffect(() => {
    dialog.value;
    textValue.value = localStorage.getItem('Notes');
    hasData.value = localStorage.getItem('Notes') !== '';
});



function openNotesCard() {
    dialog.value = true;
}
</script>

<style>
.text-area {
    width: 100%;
    height: 100%;
    padding: 20px;
    overflow-y: auto;
    border-radius: 4px;
}

.empty-area {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    flex-direction: column;
}

.text-font {
    padding: 10px 0;
    font-size: 15px;
    font-weight: 600;
    font-family: Inter;
    font-style: normal;
    line-height: normal;
    letter-spacing: 1.7px;
    color: rgb(166, 200, 227);
}

/* table 样式 */
table {
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
}

table td,
table th {
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 3px 5px;
}

table th {
    border-bottom: 2px solid #ccc;
    text-align: center;
}

/* blockquote 样式 */
blockquote {
    display: block;
    border-left: 8px solid #d0e5f2;
    padding: 5px 10px;
    margin: 10px 0;
    line-height: 1.4;
    font-size: 100%;
    background-color: #f1f1f1;
}

/* code 样式 */
code {
    display: inline-block;
    background-color: #f1f1f1;
    border-radius: 3px;
    padding: 3px 5px;
    margin: 0 3px;
}

pre code {
    display: block;
}

/* ul ol 样式 */
ul,
ol {
    margin: 10px 0 10px 20px;
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