<template>
  <div class="formula-container">
    <v-card elevation="0" class="formula-card"  title="输出区域"
      subtitle="Output">
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
import E from "../utils/formula-menu-conf";
import { ref, onMounted, nextTick } from "vue";

const editor = ref(null);
const renderedFormula = ref("");

function convert() {
  MathJax.texReset();
  MathJax.typesetClear();
  MathJax.typesetPromise();
}

function updateFormula() {
  renderedFormula.value = editor.value.txt.text();
  nextTick(convert);
}

onMounted(() => {
  editor.value = new E("#wang-editor");
  editor.value.config.height = 360;
  editor.value.config.menus = ['head', 'bold', 'underline', 'strikeThrough', 'undo', 'redo'];
  editor.value.config.onchange = updateFormula;
  editor.value.config.onchangeTimeout = 500;
  editor.value.create();
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
  /* color: white !important; */
  /* background-color: black !important; */
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
  overflow-x: auto; /* 允许横向滚动，根据需要使用"scroll"或"auto" */
  border: 1px solid #ccc;
  border-radius: 4px;
}

.editor {
  /* Add any specific styles for the editor here */
}

.editor-area {
padding: 10px;
}
</style>