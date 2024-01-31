<template>
    <v-list>
        <v-card v-for="item in listItems" :key="item.id" :elevation="0" :color="'rgb(247, 249, 249)'"
            class="list-item-card">
            <v-list-item>
                <template v-slot:prepend>
                    <v-avatar color="#D0E4F1" size="45px" class="avatar-with-id">
                        <span class="id-text">{{ item.id }}</span>
                    </v-avatar>
                </template>
                <v-card-title class="list-item-title">{{ item.title }}</v-card-title>
                <v-card-text class="list-item-subtitle">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur
                    adipisicing elit.
                </v-card-text>
            </v-list-item>
        </v-card>
    </v-list>
</template>
  
<script>
export default {
    props: {
        listItems: {
            type: Array,
            required: true,
            default: () => [
                { id: 1, title: 'Item 1', avatarUrl: 'https://randomuser.me/api/portraits/women/8.jpg' },
                { id: 2, title: 'Item 2', avatarUrl: '...' },
                { id: 3, title: 'Item 3', avatarUrl: '...' }
            ]
        }
    }
}
</script>
  
<style scoped>
.list-item-card {
    margin: 5px 0;
    max-width: 100%;
    overflow-wrap: break-word;
}

.avatar-with-id .id-text {
    color: #FFF;
}

.list-item-title {
    white-space: normal;
    font-size: inherit;
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