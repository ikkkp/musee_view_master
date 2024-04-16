import Axios from '@/axios/axiosPlugin.js'
import { globalState } from '@/utils/store.js'
import { commonGlobalState } from '@/utils/commonStore.js'
import { fetchData } from '@/utils/common.js'

export const handleUploadCommonPic = async (formData) =>
    Axios({
        method: 'post',
        url: '/api/student/bigModel',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then((response) => {
            if (response.data.status === 1) {
                const temp = response.data.data
                globalState.qid = temp.basicQuestion.qid
                globalState.title = temp.basicQuestion.questionText
                globalState.Analyserdata = temp.concreteQuestion.questionAnalysis
                globalState.questionAnswer = temp.concreteQuestion.questionAnswer
                globalState.steps = temp.concreteQuestion.questionSteps
                globalState.knowledges = temp.concreteQuestion.knowledges
                globalState.dialogueArray = []
            }
            console.log(globalState)
            commonGlobalState.dialogVisible = false
            return fetchData();
        })
        .catch((error) => {
            console.error(error);
            commonGlobalState.dialogVisible = false
            // 这里可以添加一些上传失败的处理
        });

export const handleUploadMistakePic = async (formData) =>
    Axios({
        method: 'post',
        url: '/api/student/bigModel/wrongAnswer',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then((response) => {
            commonGlobalState.dialogVisible = false
        })
        .catch((error) => {
            console.error(error);
            commonGlobalState.dialogVisible = false
            // 这里可以添加一些上传失败的处理
        });