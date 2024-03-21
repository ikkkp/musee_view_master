<template>
    <v-list-group v-for="(value, name, index) in props.items" :key="index" :value="name">
        <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :prepend-icon="'mdi-folder'" :title="name" @click="clickFolder(name, value)">
            </v-list-item>
        </template>

        <!-- 递归地调用当前组件来显示子项 -->
        <FolderTree v-if="hasChildren(value)" :items="value" :currentPath="[...props.currentPath, name]" />
        <v-list-item :prepend-icon="'mdi-plus-circle-outline'" title="添加"
            @click="openCreateFolder([...currentPath, name], value)">
        </v-list-item>
    </v-list-group>
    <v-dialog v-model="createFolderDialogVisible" style="width: 30%; border-radius: 16px;">
        <v-card style="padding: 20px 0 10px 0;">
            <v-card-text>
                <v-text-field v-model="newFolderName" label="文件夹名称" outlined></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn color="blue darken-1" text @click="addNewFolder()">创建</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import {commonGlobalState} from '@/utils/commonStore.js';
import FolderTree from './FolderTree.vue';
import { globalState } from '@/utils/store.js';
import Axios from '@/axios/axiosPlugin';
const props = defineProps({
    items: Object,
    currentPath: {
        type: Array,
        default: () => []
    }
});

const createFolderDialogVisible = ref(false);
const newFolderName = ref('');
const currentPaths = ref([]); // 用于存储当前文件夹的路径


function openCreateFolder(path = [], value) {
    // 检查是否存在子目录
    if (!hasChildren(value)) {
        // 如果没有子目录，执行添加错题的逻辑
        // 例如，可以在这里打开一个对话框来让用户添加错题
        alert("添加错题到" + path.join('/'));
        Axios({
            method: 'post',
            url: '/api/student/question/position',
            data: {
                qid: globalState.qid,
                position: path.join('/'),
            },
        })
            .then((response) => {
                if (response.data.status === 1) {
                    createFolderDialogVisible.value = false; // 关闭对话框
                    alert("添加错题成功");
                }
            })
            .catch((error) => {
                alert("添加错题失败");
                console.error(error);
            });
        createFolderDialogVisible.value = false; // 关闭对话框
        // 注意：这里只是一个示例，你可能需要根据你的应用逻辑进行相应的操作
    } else {
        // 如果存在子目录，只更新路径并显示创建文件夹的对话框
        currentPaths.value = path;
        createFolderDialogVisible.value = true;
    }
}

const hasChildren = (item) => {
    return item && Object.keys(item).length > 0;
};

const clickFolder = (name, value) => {
    console.log(currentPaths.value, name, value)
};

function addNewFolder() {
    if (newFolderName.value.trim() !== '') {
        const pathArray = [...currentPaths.value, newFolderName.value];
        createFolder(pathArray);
        newFolderName.value = ''; // Reset folder name after creation
        createFolderDialogVisible.value = false; // Close the dialog
    }
}

function createFolder(pathArray = []) {
    // 使用 reduce 方法沿着路径数组迭代，但不包括最后一个元素，因为最后一个元素是新文件夹的名称
    const parentFolder = pathArray.slice(0, -1).reduce((accumulator, currentKey) => {
        console.log("pathArray", pathArray);
        // 如果当前键不存在或者不是一个对象，则创建一个新对象
        if (!accumulator[currentKey] || typeof accumulator[currentKey] !== 'object') {
            accumulator[currentKey] = {};
        }
        // 返回下一层级的引用，供下一次迭代使用
        return accumulator[currentKey];
    }, commonGlobalState.folderList);

    // 获取新文件夹的名称，它是路径数组的最后一个元素
    const newFolderName = pathArray[pathArray.length - 1];
    // 在父文件夹中创建新的文件夹，如果它还不存在的话
    if (!parentFolder[newFolderName]) {
        parentFolder[newFolderName] = {};
    }
}

</script>
