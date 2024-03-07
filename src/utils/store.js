import { reactive } from 'vue';

export const globalState = reactive({
    dialogVisible: false,
    showModal: false,
    qid: "",
    title: "",
    Analyserdata: "",
    questionAnswer: "",
    questionText: "",
    steps: [],
    history: [],
    knowledges: [],
    dialogueArray: [],
});

