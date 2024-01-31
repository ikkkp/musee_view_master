<template>
    <div @click="() => { dialog = true }" style="height:200px">
        <span v-html="textValue"></span>
    </div>
    <v-dialog v-model="dialog" width="auto">
        <v-card>
            <NotesEditableArea :initMessage="textValue"></NotesEditableArea>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, watchEffect, onMounted } from 'vue';
import NotesEditableArea from '../NotesEditableArea.vue';

const dialog = ref(false);
const textValue = ref('');

onMounted(() => {
    textValue.value = '';
    localStorage.setItem('Notes', '');
});

watchEffect(() => {
    dialog.value;
    textValue.value = localStorage.getItem('Notes');
});
</script>