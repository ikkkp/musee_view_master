<template>
    <v-dialog v-model="globalState.DraggableDialogVisible" width="40%" >
        <v-card prepend-icon="mdi-update" style="
        color: #388fca;
    font-weight: bold;
    font-family: Inter;
    font-size: 25px;
    font-style: normal;
    font-weight: 600;padding-bottom: 30px;" title="错题本" elevation="16">
            <template v-slot:prepend>
                <v-icon size="x-large"></v-icon>
            </template>
            <v-list :v-model:opened=open style="margin: 10px 40px;">
                <FolderTree :items="globalState.folderList" />
            </v-list>
        </v-card>
    </v-dialog>
</template>

<script setup>
import FolderTree from './FolderTree.vue';
import { globalState } from '@/utils/store.js';
import { ref } from 'vue';

const open = ref([]);


</script>