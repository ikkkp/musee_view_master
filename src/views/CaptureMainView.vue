<template>
    <div class="container">
        <!-- Left Section -->
        <div class="left-section">
            <v-card class="left-card" color="#A1C9E3">
                <!-- First Card in Left Section -->
                <v-card class="inner-card-1" color="#F7F9F9">
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

.inner-card-1 {
    margin: 10px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
}

.inner-card-2 {
    margin: 0px 10px 10px 10px;
    flex: 1;
}


.color-cards {
    display: flex;
    margin: 0 20px 0 20px;
    width: 400px;
    justify-content: space-around;
    align-items: flex-end;
}

.color-card {
    width: 120px;
}
</style>
  