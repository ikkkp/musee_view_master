<template>
  <div class="formula-container">

    <div id="formula" style="height: 30vh;">
      {{ renderedFormula ? `$${renderedFormula}$` : '' }}
    </div>

    <div id="wang-editor"></div>
    <div style="display: flex; justify-content: flex-end;">
      <v-btn color="primary" width="92" rounded variant="outlined" @click="render()" style="margin: 10px 5px;">
        渲染
      </v-btn>
      <v-btn color="primary" width="92" rounded variant="outlined" @click="insert()" style="margin: 10px 5px;">
        确定
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { renderFormula } from "easy-formula-editor";
import E from "../utils/formula-menu-conf";
import { ref, onMounted, nextTick } from "vue";

const editor = ref(null);
const renderedFormula = ref("");

function insert() {
  renderedFormula.value = editor.value.txt.text();
  nextTick(() => renderMath());
}
function render() {
  renderedFormula.value = editor.value.txt.text();
  nextTick(() => renderMath());
}

/**
* @author Huangzl
* @date 2024/01/28 22:27:27
* @TODO 渲染公式
*/

function renderMath() {
  try {
    const el = document.getElementById("formula");
    renderFormula(el);
  } catch (e) {
    console.log(e);
  }

};

onMounted(() => {
  editor.value = new E("#wang-editor");
  editor.value.config.height = 300
  editor.value.config.menus = ['head', 'bold', 'underline', 'strikeThrough', 'undo', 'redo'];
  editor.value.create();
});
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.formula-container {
  width: 100vh;
  height: 70vh;
}
</style>
