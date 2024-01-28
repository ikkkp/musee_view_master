<template>
    <div class="render-container">
        <div id="render-area"></div>
        {{ msg }}
    </div>
</template>
  
<script>
import E from "../utils/formula-menu-conf";

export default {
    props: {
        msg: String,
    },
    mounted() {
        const editor = new E("#render-area");
        editor.create();
    },
};
</script>
<style scoped>
.render-container {
    width: 800px;
    height: 380px;
}
</style>
