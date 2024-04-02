import { reactive } from 'vue';

export const globalState = reactive({
    qid: "",
    title: "",
    Analyserdata: "",
    questionAnswer: "",
    questionText: "",
    steps: [],
    history: [],
    knowledges: [],
    dialogueArray: [],
    position: "",
    eventSource: null,
});

