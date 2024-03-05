import { reactive } from 'vue';

export const globalState = reactive({
    showModal: false,
    Analyserdata: "",
    title: "",
    steps: [],
    history: [{}],
});
