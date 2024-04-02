import Axios from '@/axios/axiosPlugin.js';
import { globalState } from '@/utils/store.js';
export async function fetchData() {
    try {
        // 发起第一个请求并等待结果
        // todo
        const responseOne = await Axios({
            method: 'get',
            url: '/api/student/question/base/order',
        });
        const data = responseOne.data.data;
        // 筛选出path不为null的项目
        const filteredData = data.filter(item => item.path !== null);
        // 获取前4个项目
        const topFourItems = filteredData.slice(0, 4);
        // 将这4个项目存储到globalState.history中
        globalState.history = topFourItems;
        // 确保有历史数据再进行第二次请求
        if (globalState.history.length > 0) {
            // 发起第二个请求并等待结果
            const responseTwo = await Axios({
                method: 'post',
                url: '/api/student/question/concrete',
                data: {
                    qid: globalState.history[0].qid,
                },
            });
            const concreteInfo = responseTwo.data.data;
            // 更新globalState
            globalState.title = concreteInfo.questionAnswer;
            globalState.Analyserdata = concreteInfo.questionAnswer;
            globalState.steps = concreteInfo.questionSteps.filter(step => step !== '');
            globalState.questionText = concreteInfo.questionText;
            globalState.knowledges = concreteInfo.knowledges;
            await updataContent();
        }
    } catch (error) {
        console.log('获取历史信息失败', error);
    }
}

export async function updataconcrete() {
    const responseTwo = await Axios({
        method: 'post',
        url: '/api/student/question/concrete',
        data: {
            qid: globalState.history[0].qid,
        },
    });
    const concreteInfo = responseTwo.data.data;
    console.log('concreteInfo', concreteInfo);
    // 更新globalState
    globalState.title = concreteInfo.questionAnswer;
    globalState.Analyserdata = concreteInfo.questionAnswer;
    globalState.steps = concreteInfo.questionSteps.filter(step => step !== '');
    globalState.questionText = concreteInfo.questionText;
    globalState.knowledges = concreteInfo.knowledges;
}

export async function updataContent() {
    Axios({
        method: 'get',
        url: '/api/student/question/communication',
        params: {
            "qid": globalState.history[0].qid,
        }
    }).then(function (response) {
        globalState.dialogueArray = response.data.data.wenxinChatHistory.map((item, index) => {
            // 确定发言者是用户还是助手
            const speaker = index % 2 === 0 ? "user" : "assistant";

            return {
                speaker: speaker, // 设置发言者
                message: speaker === "user" ? item.user : item.assistant, // 根据发言者获取消息
                avatarSrc: speaker === "user" ? "user-avatar.jpg" : "assistant-avatar.jpg", // 设置头像，假设有对应的头像文件
                timestamp: new Date().toLocaleString() // 使用当前时间作为时间戳，您可能需要根据实际情况调整
            };
        },
        );

        // 可以在这里处理成功的逻辑，比如更新UI等
    }).catch(function (error) {
        console.error('发送失败', error);
        // 可以在这里处理错误的逻辑
    });
    localStorage.setItem('renderedFormula', '');
}
