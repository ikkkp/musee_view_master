<template>
  <div class="formula-container">
    <v-card elevation="0" class="formula-card" title="输出区域" subtitle="Output">
      <div id="formula" class="formula-content">
        {{ renderedFormula ? `$${renderedFormula}$` : '' }}
      </div>
    </v-card>
    <div class="editor-area">
      <div id="wang-editor" class="editor"></div>
    </div>
  </div>
</template>


<script setup>
import E from "wangeditor";
import { ref, onMounted, nextTick, defineProps, watchEffect } from "vue";
import AlertMenu  from "@/utils/LatexTextRender/formula-menu-conf";

// 定义props
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
  MathJax.texReset();
  MathJax.typesetClear();
  MathJax.typesetPromise();
  localStorage.setItem("renderedFormula", renderedFormula.value);
}

function updateFormula() {
  renderedFormula.value = editor.value.txt.text();
  nextTick(convert); 
}

onMounted(() => {
  editor.value = new E("#wang-editor");
  editor.value.menus.extend('LatexTextRender', AlertMenu)
  editor.value.config.height = 360;
  editor.value.config.menus = ['head', 'bold', 'underline', 'strikeThrough','emoticon', 'undo', 'redo','LatexTextRender'];
  editor.value.config.onchange = updateFormula;
  editor.value.config.onchangeTimeout = 500;
  editor.value.create();
  editor.value.txt.html(props.initMessage);
});

</script>


<style scoped>
.formula-container {
  width: 800px;
  height: 700px;
}

.MathJax,
.MathJax_Display {
  font-size: 200% !important;
  display: block;
  text-align: center;
}

.formula-card {
  padding: 10px;
}

.formula-content {
  font-size: 150% !important;
  font-family: MJXZERO, MJXTEX;
  min-height: 2em;
  height: 180px;
  padding: 10px 20px 10px 20px;
  overflow-x: auto;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.editor-area {
  padding: 10px;
}
</style>