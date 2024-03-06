import { reactive } from 'vue';

export const globalState = reactive({
    showModal: false,
    title: "",
    Analyserdata: "",
    questionText: "",
    steps: [],
    history: [],
});

