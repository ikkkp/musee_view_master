<template>
    <div v-if="globalState.steps != ''" class="text-area">
        <v-list>
            <v-card v-for="(step, index) in globalState.steps" :key="index" :elevation="0" class="list-item-card"
                color="">
                <v-list-item>
                    <div style="display: flex;">
                        <!-- 由于此处不再需要显示id，移除avatar-with-id -->
                        <v-avatar size="45px" class="avatar-item">
                            <!-- 可以在这里显示步骤编号 -->
                            <span class="step-index">{{ index + 1 }}</span>
                        </v-avatar>
                        <!-- 使用step作为标题，展示解题步骤序号及内容 -->
                        <v-card-title class="list-item-title"> {{ step.content }}</v-card-title>
                        <!-- 步骤内容已包含在标题中，此处可以留空或提供额外信息 -->
                        <v-card-text class="list-item-subtitle"></v-card-text>
                    </div>
                </v-list-item>
            </v-card>
        </v-list>
    </div>
    <template v-else>
        <div class="text-area empty-area">
            <img src="@/images/empty-picture/no_data.svg" style="height: 50%" />
            <div class="text-font">请先拍题哦</div>
        </div>
    </template>
</template>

<script setup>
import { globalState } from '@/utils/store.js';


</script>

<style scoped>
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

.list-item-card {
    margin: 5px 0;
    max-width: 100%;
    overflow-wrap: break-word;
}

.avatar-with-id .id-text {
    color: #FFF;
}

.avatar-item {
    margin: 10px;
    background-color: rgb(208, 228, 241);
    color: rgb(247 249 249);
    width: 45px;
    height: 45px;
    margin: 10px;
    font-size: 20px;
    font-weight: 600;
    font-family: fantasy;
}

.list-item-title {
    white-space: normal;
    color: #969696;
    overflow-wrap: break-word;
    font-size: 16px;
    font-weight: 400;
    max-width: 90%;
    font-family: 'Inter';
    padding: 10px 50px 10px 10px;
}

.list-item-subtitle {
    white-space: normal;
    font-size: inherit;
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
}
</style>