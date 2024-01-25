<template>
    <v-card style="height: 85vh;    padding: 20px 5px 20px 20px;
    display: flex;
    flex-direction: column;">
        <v-btn density="compact" icon="mdi-format-list-bulleted">
            <svg-icon type="mdi" :path="mdiFormatListBulleted"></svg-icon>
        </v-btn>
        <div style="    display: flex;
    /* flex: 1; */
    justify-content: flex-end;
    height: 40%;
    flex-direction: column;
    align-items: center;">
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
                <path d="M45.9502 69.85V33.85L73.9252 17.7C89.4252 8.75 117.175 30.825 105.525 51.025" stroke="#2081C3"
                    stroke-opacity="0.89" stroke-width="6" stroke-linejoin="round" />
                <path d="M45.9502 52.35L77.1252 34.35L105.1 50.5C120.6 59.45 115.35 94.525 92.0252 94.525" stroke="#2081C3"
                    stroke-opacity="0.89" stroke-width="6" stroke-linejoin="round" />
                <path d="M61.1 43.6L92.275 61.6V93.925C92.275 111.825 59.275 124.825 47.625 104.625" stroke="#2081C3"
                    stroke-opacity="0.89" stroke-width="6" stroke-linejoin="round" />
                <path d="M76.2499 53V88.35L48.2749 104.5C32.7749 113.45 5.02489 91.375 16.6749 71.175" stroke="#2081C3"
                    stroke-opacity="0.89" stroke-width="6" stroke-linejoin="round" />
                <path d="M76.25 69.85L45.075 87.85L17.1 71.7C1.57497 62.725 6.82497 27.675 30.15 27.675" stroke="#2081C3"
                    stroke-opacity="0.89" stroke-width="6" stroke-linejoin="round" />
                <path d="M61.0998 78.6L29.9248 60.6V28.275C29.9248 10.375 62.9248 -2.625 74.5748 17.575" stroke="#2081C3"
                    stroke-opacity="0.89" stroke-width="6" stroke-linejoin="round" />
            </svg>
        </div>
        <div>
            <v-row justify="space-around">
                <v-col cols="auto">
                    <v-sheet elevation="0" class="py-4 px-1" style="padding: 10px 0 0 0 !important;">
                        <v-chip-group mandatory selected-class="text-primary">
                            <v-chip v-for="tag in prompts" :key="tag">
                                {{ tag }}
                            </v-chip>
                        </v-chip-group>
                    </v-sheet>
                    <v-sheet elevation="0" class="py-4 px-1" style="padding:0 !important; overflow-x: hidden;">
                        <transition name="slide">
                            <v-chip-group mandatory selected-class="text-primary">
                                <v-chip v-for="tag in tapromptsgs" :key="tag">
                                    {{ tag }}
                                </v-chip>
                            </v-chip-group>
                        </transition>
                    </v-sheet>
                </v-col>
            </v-row>
        </div>
        <div style="  display: flex;  flex-direction: column;
    height: 400px;
    justify-content: flex-end;">
            <div style="    display: flex;
    align-items: center;">
                <p>Tags:</p>
                <v-sheet elevation="0" class="py-4 px-1" style="padding: 10px !important; overflow-x: hidden;">
                    <v-chip-group mandatory selected-class="text-primary">
                        <v-chip v-for="tag in tags" :key="tag">
                            {{ tag }}
                        </v-chip>
                    </v-chip-group>
                </v-sheet>
            </div>
            <div style="display: flex;">
                    <v-autocomplete :items="items" append-inner-icon="mdi-microphone" auto-select-first
                class="flex-full-width" density="comfortable" item-props menu-icon=""
                placeholder="Search Google or type a URL" prepend-inner-icon="mdi-magnify" rounded theme="light"
                variant="solo"></v-autocomplete>
            </div>
        </div>


    </v-card>
</template>

<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiFormatListBulleted } from '@mdi/js';

var prompts = [
    'Work',
    'Home Improvement',
    'Vacation',
    'Food',
    'Drawers',
    'Shopping',
    'Art',
    'Tech',
    'Creative Writing',
];
var tags = [
    '#步骤1',
    '#步骤2',
    '#步骤3'
];
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: transform 0.5s ease;
}

.slide-enter,
.slide-leave-to {
    transform: translateX(100%);
    /* 初始状态为从右边进入或离开 */
}
</style>