<template>
    <v-dialog v-model="commonGlobalState.DraggableDialogVisible" width="40%">
        <v-card prepend-icon="mdi-update" style="
        color: #388fca;
    font-weight: bold;
    font-family: Inter;
    font-size: 25px;
    font-style: normal;
    font-weight: 600;padding:10px 0px 30px 0px;border-radius: 16px;" title="Musee 错题本" elevation="16">
            <template v-slot:prepend>
                <v-icon size="large"></v-icon>
            </template>
            <v-list :v-model:opened=open style="margin: 10px 30px;">
                <FolderTree :items="commonGlobalState.folderList" :currentPath="[]" />
            </v-list>
            <v-list-item :prepend-icon="'mdi-plus-circle-outline'" title="新建根目录错题本" @click="openCreateFolder()"
                style="margin: 0px 30px;" color="#FFFFFF">
            </v-list-item>
        </v-card>
    </v-dialog>
    <v-dialog v-model="createFolderDialogVisible" style="width: 30%;border-radius: 16px;">
        <v-card style="padding: 20px 0 10px 0 ;">
            <v-card-text>
                <v-text-field v-model="newFolderName" label="文件夹名称" outlined></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn color="blue darken-1" text
                    @click="createFolderDialogVisible = !createFolderDialogVisible">创建</v-btn>
            </v-card-actions>

        </v-card>
    </v-dialog>
</template>

<script setup>
import FolderTree from './FolderTree.vue';
import { commonGlobalState } from '@/utils/commonStore.js';
import { ref, watch } from 'vue';

const open = ref([]);

const createFolderDialogVisible = ref(false);
const newFolderName = ref('');

function openCreateFolder() {
    createFolderDialogVisible.value = true;
}

watch(createFolderDialogVisible, (newValue, oldValue) => {
    if (oldValue === true && newValue === false && newFolderName.value.trim() !== '') {
        createFolder([newFolderName.value]);
        console.log(commonGlobalState.folderList);
        newFolderName.value = ''; // Reset folder name after creation
    }
});


function createFolder(pathArray = []) {
    // 使用 reduce 方法沿着路径数组迭代，为每个不存在的属性创建一个新对象
    pathArray.reduce((accumulator, currentKey, currentIndex) => {
        // 如果当前键不存在或者不是一个对象，则创建一个新对象
        if (!accumulator[currentKey] || typeof accumulator[currentKey] !== 'object') {
            // 如果是路径数组的最后一个元素，则直接设置为 {}
            // 否则设置为一个新对象，以便进一步嵌套
            accumulator[currentKey] = currentIndex === pathArray.length - 1 ? {} : {};
        }
        // 返回下一层级的引用，供下一次迭代使用
        return accumulator[currentKey];
    }, commonGlobalState.folderList);
}


</script>