<template>
    <v-card style="height: 85vh;    padding: 20px 5px 20px 20px;
    display: flex;">
        <v-btn density="compact" icon="mdi-format-list-bulleted">
            <svg-icon type="mdi" :path="mdiFormatListBulleted"></svg-icon>
        </v-btn>
    </v-card>
</template>

<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiFormatListBulleted } from '@mdi/js';

</script>