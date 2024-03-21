<template>
  <TopNavComponent />
  <RouterView />
  <LoginModal ref="loginModal" />
  <div class="pa-4 text-center">
        <v-dialog v-model="commonGlobalState.dialogVisible" max-width="320" persistent>
            <v-list class="py-2" color="primary" elevation="12" rounded="lg">
                <v-list-item prepend-icon="$vuetify-outline" :title='commonGlobalState.warntitle'>
                    <template v-slot:prepend>
                        <div class="pe-4">
                            <v-icon color="primary" size="x-large"></v-icon>
                        </div>
                    </template>
                    <template v-slot:append>
                        <v-progress-circular color="primary" indeterminate="disable-shrink" size="16"
                            width="2"></v-progress-circular>
                    </template>
                </v-list-item>
            </v-list>
        </v-dialog>
    </div>
</template>

<script setup>
import{commonGlobalState}from '@/utils/commonStore.js'
import TopNavComponent from './components/TopNavComponent.vue';
import LoginModal from './views/LoginModal.vue';
import { onMounted } from 'vue';
import { fetchData } from './utils/common.js';
onMounted(
  fetchData,
//   updataContent
);

</script>

<style scoped></style>
