import { reactive } from 'vue';

export const globalState = reactive({
    dialogVisible: false,
    DraggableDialogVisible: false,
    warntitle: "",
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
    position: "",
    folderList: {
        "数学错题本": {
            "导数": {
                "极值点": {
                    "多次求导": {},
                    "鞍点": {},
                },
                "求导方法": {
                    "泰勒展开": {},
                    "洛必达法则": {}
                }
            },
            "双曲线": {},
            "数学物理方法": {}
        },
    }
});

