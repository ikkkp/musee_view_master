<template>
    <v-card class="card-small" elevation="0">
        <div class="card-grid" v-for="(image, index) in smallImages" :key="index">
            <v-img class="grid-image" cover :height="90" :width="130" :src="image.url" :lazy-src="image.lazySrc"
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
                { url: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg', lazySrc: 'https://picsum.photos/10/6?image=1' },
                { url: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg', lazySrc: 'https://picsum.photos/10/6?image=1' },
                { url: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg', lazySrc: 'https://picsum.photos/10/6?image=1' },
                // Add more default images or make sure you pass an array with the correct structure from parent component
            ]
        },
        largeImage: {
            type: Object,
            required: true,
            default: () => ({
                url: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg', lazySrc: 'https://picsum.photos/10/6?image=1'
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
}

.grid-image {
    margin: auto;
    width: 100%;
    height: 90px;
}

.card-large {
    height: 95%;
    width: 73%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
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