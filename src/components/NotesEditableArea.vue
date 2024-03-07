<template>
    <div class="formula-container">
        <div class="editor-area">
            <div id="wang-editor-area" class="editor"></div>
        </div>
    </div>
</template>
  
  
<script setup>
import E from "wangeditor";
import  AlertMenu  from "@/utils/LatexSvgRender/formula-menu-conf";
import { ref, onMounted, nextTick, defineProps, watchEffect } from "vue";

const props = defineProps({
    initMessage: {
        type: String,
        default: "",
    }
});

watchEffect(() => {
    props.initMessage;
});

const editor = ref(null);
const renderedFormula = ref("");

function convert() {
    localStorage.setItem("Notes", renderedFormula.value);
}

function updateFormula() {
    renderedFormula.value = editor.value.txt.html();
    nextTick(convert);
}

onMounted(() => {
    editor.value = new E("#wang-editor-area");
    editor.value.menus.extend('LatexSvgRender', AlertMenu)
    editor.value.config.height = 400;
    editor.value.config.menus = ['head',
        'bold',
        'fontSize',
        'fontName',
        'italic',
        'underline',
        'strikeThrough',
        'indent',
        'lineHeight',
        'foreColor',
        'backColor',
        'link',
        'list',
        'todo',
        'justify',
        'quote',
        'emoticon',
        'image',
        'video',
        'table',
        'code',
        'splitLine','LatexSvgRender',
        'undo',
        'redo',];
    editor.value.config.onchange = updateFormula;
    editor.value.config.onchangeTimeout = 500;
    editor.value.create();
    editor.value.txt.html(props.initMessage);
});

</script>
  
  
<style scoped>
.formula-container {
    width: 800px;
    height: 530px;
    display: flex;
    align-items: flex-end;
}

.editor-area {
    padding: 10px;
}

</style>