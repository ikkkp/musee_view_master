import Axios from '@/axios/axiosPlugin.js';
import { globalState } from '@/utils/store.js';
export async function fetchData() {
    try {
        // 发起第一个请求并等待结果
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
            console.log(responseTwo);
            const concreteInfo = responseTwo.data.data;
            // 更新globalState
            globalState.title = concreteInfo.questionAnswer;
            globalState.Analyserdata = concreteInfo.questionAnswer;
            globalState.steps = concreteInfo.questionSteps;
            globalState.questionText = concreteInfo.questionText;
            globalState.knowledges = concreteInfo.knowledges;

        }
    } catch (error) {
        console.log('获取历史信息失败', error);
    }
}
