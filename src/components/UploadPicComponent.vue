<template>
    <v-card class="card-small" elevation="0" color="#F7F9F9">
        <div class="card-grid" v-for="(image, index) in smallImages" :key="index">
            <v-img class="grid-image" cover :height="90" :src="image.url" :lazy-src="image.lazySrc"
                max-width="500">
                <template v-slot:placeholder>
                    <div class="progress-placeholder">
                        <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                    </div>
                </template>
            </v-img>
        </div>
    </v-card>

    <v-card class="card-large" elevation="0">
        <div class="card-content">
            <v-img class="large-image" cover height="300" :src="largeImage.url" :lazy-src="largeImage.lazySrc" max-width="500">
                <template v-slot:placeholder>
                    <div class="progress-placeholder">
                        <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                    </div>
                </template>
            </v-img>
        </div>
    </v-card>
</template>
  
<script>
export default {
    props: {
        smallImages: {
            type: Array,
            required: true,
            default: () => [
                { url: 'src/images/empty-picture/no_search.svg', lazySrc: 'src/images/empty-picture/no_search.svg' },
                { url: '', lazySrc: 'src/images/empty-picture/no_search.svg' },
                { url: '', lazySrc: 'src/images/empty-picture/no_search.svg' },
                // Add more default images or make sure you pass an array with the correct structure from parent component
            ]
        },
        largeImage: {
            type: Object,
            required: true,
            default: () => ({
                url: 'src/images/empty-picture/no_search.svg'
            })
        }
    }
}
</script>
  
<style scoped>
.card-small {
    height: 95%;
    width: 24%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.card-grid {
    height: 85px;
    width: 100%;
    border: 1px solid rgb(165 176 184);
    border-radius: 10px;
}

.grid-image {
    margin: auto;
    width: 100%;
    height: 90px;
    width: 100%;
}

.card-large {
    height: 95%;
    width: 73%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border: 1px solid rgb(165 176 184);
    border-radius: 10px;
}

.card-content {
    width: 100%;
    height: 100%;
}

.large-image {
    margin: auto;
    width: 100%;
    height: 100%;
    max-width: 500px;
}

.progress-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
</style>