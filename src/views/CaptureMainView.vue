<script setup>
import SearchResultComponent from '@/components/SearchResultComponent.vue';
</script>
<template>
    <div class="container">
        <!-- Left Section -->
        <div class="left-section">
            <v-card class="left-card" color="#A1C9E3">
                <!-- First Card in Left Section -->
                <v-card class="inner-card-1" color="#F7F9F9">
                    <v-card-title>Card title</v-card-title>
                    <v-card-subtitle>Card subtitle secondary text</v-card-subtitle>
                </v-card>
                <SearchResultComponent />

            </v-card>
        </div>

        <!-- Right Section -->
        <div class="right-section">
            <v-card>
                <v-card-item>
                    <v-card-title>Card title</v-card-title>
                    <v-card-subtitle>Card subtitle secondary text</v-card-subtitle>
                </v-card-item>

                <v-card-text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore
                    magna aliqua.
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>
  
<style scoped>
.container {
    display: flex;
}

.left-section {
    width: 45%;
    height: 100%;
    padding: 20px 5px 20px 20px;
}

.right-section {
    width: 55%;
    height: 100%;
    padding: 20px 20px 20px 5px;
}

.left-card {
    height: auto;
}

.inner-card-1 {
    margin: 10px;
    height: 400px;
}

.inner-card-2 {
    margin: 0px 10px 10px 10px;
    height: 400px;
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
  