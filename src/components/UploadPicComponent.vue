<template>
    <v-card class="card-small" elevation="0" color="#F7F9F9">
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
                { url: 'https://lh3.googleusercontent.com/proxy/-KfYfchF-2wje2vip04vQ_q8Kyq20e6leXHZYH2K3yKRR8_1YIDKNS7AXVAtsI5DeDC66ANH66sxMU21QJOAiqR2vAKZeQ-wOft5VQ', lazySrc: 'https://picsum.photos/10/6?image=1' },
                { url: 'data:image/jpeg;base64,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', lazySrc: 'https://picsum.photos/10/6?image=1' },
                { url: 'https://www.haotiw.com/media/Question/2022/09/nwzh1412.png?width=480&height=240&rmode=crop&token=v2L%2BaWCAK%2BA%2BBlTKISAavTgj44n3jXV40U0LwDG9TB4%3D', lazySrc: 'https://picsum.photos/10/6?image=1' },
                // Add more default images or make sure you pass an array with the correct structure from parent component
            ]
        },
        largeImage: {
            type: Object,
            required: true,
            default: () => ({
                url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEGs6-8jIZi5vTHL_g-zA5Ad2WwVhDVHNOng&usqp=CAU'
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