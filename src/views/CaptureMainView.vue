<template>
    <div class="container" :key="componentKey">
        <!-- Left Section -->
        <div class="left-section">
            <v-card class="left-card" color="#A1C9E3">
                <!-- First Card in Left Section -->
                <v-card class="inner-card" color="#F7F9F9">
                    <UploadPicComponent></UploadPicComponent>
                </v-card>
                <SearchResultComponent />
            </v-card>
        </div>

        <!-- Right Section -->
        <div class="right-section">
            <XChatGPTComponent></XChatGPTComponent>
        </div>
    </div>
</template>

<script setup>
import SearchResultComponent from '@/components/SearchResultComponent.vue';
import UploadPicComponent from '@/components/UploadPicComponent.vue';
import XChatGPTComponent from '@/components/XChatGPTComponent.vue';
import { globalState } from '@/utils/store';
import { ref, watch } from 'vue';
const componentKey = ref(0);

// 监听某个响应式状态的变化
watch(globalState, (newValue, oldValue) => {
    // 当状态发生变化时，改变key以强制组件重新创建
    console.log('render again');
    componentKey.value++;
});

</script>

<style scoped>
.container {
    height: 85vh;
    display: flex;
}

.left-section {
    width: 45vw;
    padding: 20px 5px 0px 20px;
    display: flex;
    min-width: 500px;
}

.right-section {
    width: 55vw;
    min-width: 500px;
    padding: 20px 20px 0px 5px
}

.left-card {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}

.inner-card {
    margin: 10px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
}
</style>