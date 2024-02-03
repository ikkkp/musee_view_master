<template>
    <v-expand-transition class="conversation-container">
        <v-card v-if="overlayValue" class="v-card--reveal" style="height: 100%;">
            <v-card-text class="pb-0">
                <p class="text-h4 text--primary">
                    Origin
                </p>
                <p>late 16th century (as a noun denoting a place where alms were distributed): from medieval Latin
                    eleemosynarius, from late Latin eleemosyna ‘alms’, from Greek eleēmosunē ‘compassion’ </p>
            </v-card-text>
            <v-card-actions>
                <v-btn :class="['compact-button', 'icon-button']" icon="mdi-arrow-up-circle" @click="toggleOverlay" color="#2081C3">
                    <svg-icon type="mdi" :path="mdiMicrophoneOff" class="expand-icon"></svg-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-expand-transition>
</template>

<script setup>
import { defineProps, ref, watch } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMicrophoneOff } from '@mdi/js'

const props = defineProps({
    overlay: {
        type: Boolean,
        default: false,
    },
});


const overlayValue = ref(props.overlay);

watch(() => props.overlay, (val) => {
    overlayValue.value = val;
});


const emit = defineEmits(['update:overlay']);

function toggleOverlay() {
    overlayValue.value = !overlayValue.value;
    emit('update:overlay', overlayValue.value);
    console.log(overlayValue.value);
}
</script>

<style scoped>
.conversation-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.compact-button {
    density: compact;
    elevation: 0;
    width: 30px;
    height: 30px;
}

.icon-button {
    width: 50px;
    height: 50px;
}

.expand-icon {
    height: 50px;
    width: 50px;
}
</style>