<template>
  <div class="formula-container">
    <v-card elevation="1" class="formula-card">
      <div id="formula" class="formula-content">
        {{ renderedFormula ? `$${renderedFormula}$` : '' }}
      </div>
    </v-card>
    <div id="wang-editor" class="editor"></div>
  </div>
</template>


<script setup>
import { renderFormula } from "easy-formula-editor";
import E from "../utils/formula-menu-conf";
import { ref, onMounted, nextTick } from "vue";

function convert() {
  // Your convert function logic
  MathJax.texReset();
  MathJax.typesetClear();
  MathJax.typesetPromise();
}

const editor = ref(null);
const renderedFormula = ref("");

function updateFormula() {
  renderedFormula.value = editor.value.txt.text();
  nextTick(convert);
}

function renderMath() {
  try {
    const el = document.getElementById("formula");
    renderFormula(el);
  } catch (error) {
    console.error(error);
  }
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
  height: 720px;
  padding: 5px 5px 0 5px;
}

.MathJax,
.MathJax_Display {
  font-size: 200% !important;
  /* color: white !important; */
  /* background-color: black !important; */
}

.formula-card {
  padding: 30px;
}

.formula-content {
  font-size: 200% !important;
  font-family: MJXZERO, MJXTEX;
  min-height: 2em;
  height: 250px;
}

.editor {
  /* Add any specific styles for the editor here */
}
</style>