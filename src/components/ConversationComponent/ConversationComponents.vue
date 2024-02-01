<template>
    <v-overlay v-model="overlayValue" persistent>
        <v-btn :class="['compact-button', 'icon-button']" icon="mdi-arrow-up-circle" @click="toggleOverlay" style="    top: 20px;
    left: 20px;">
            <svg-icon  type="mdi" :path="mdiArrowDownDropCircle" class="expand-icon"></svg-icon>
        </v-btn>
    </v-overlay>
</template>

<script setup>
import { defineProps, ref, watch } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiArrowDownDropCircle } from '@mdi/js'

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