<template>
    <v-list-group v-for="(value, name) in props.items" :key="name" :value=name>
        <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :prepend-icon="'mdi-folder'" :title=name @click="clickFolder(name, value)">
            </v-list-item>
        </template>

        <!-- 递归地调用当前组件来显示子项 -->
        <FolderTree v-if="hasChildren(value)" :items="value" />
        <v-list-item :prepend-icon="'mdi-plus-circle-outline'" title="添加" @click="createFolder(name, value)">
        </v-list-item>
    </v-list-group>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import FolderTree from './FolderTree.vue';

const props = defineProps({
    items: Object,
});

const hasChildren = (item) => {
    return item && Object.keys(item).length > 0;
};

// 这里的参数也进行了相应的修改
const clickFolder = (name, value) => {
    if (Object.keys(value).length === 0) {
        console.log('null');
    }
    console.log(name, value);
};

const createFolder = (name, value) => {
    console.log(name, value);
    console.log('create');
};
</script>