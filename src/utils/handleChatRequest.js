import Axios from '@/axios/axiosPlugin.js';
import { globalState } from '@/utils/store.js';
import { commonGlobalState } from '@/utils/commonStore.js';
import { baseURL } from '@/config.js';

export const sendDefault = (textValue) => {
    getCommunication().then(function (response) {
        globalState.dialogueArray.push({
            speaker: 'user',
            message: textValue,
            avatarSrc: 'user-avatar.jpg',
            timestamp: new Date().toLocaleString()
        });
        globalState.dialogueArray.push({
            speaker: 'assistant',
            message: '',
            avatarSrc: 'assistant-avatar.jpg',
            timestamp: new Date().toLocaleString()
        });

        // 对用户输入进行编码，准备发送
        const encodedContent = encodeURIComponent(textValue);
        const qid = globalState.history[0].qid;
        const sid = localStorage.getItem('sid');

        // 初始化 EventSource 连接，如果它尚未存在
        if (!globalState.eventSource) {
            globalState.eventSource = new EventSource(`${baseURL}/api/student/question/communicationWithUser/?content=${encodedContent}&qid=${qid}&sid=${sid}`);

            // 设置接收消息的回调函数
            globalState.eventSource.onmessage = (event) => {
                globalState.dialogueArray[globalState.dialogueArray.length - 1].message += event.data;
                commonGlobalState.dialogVisible = false;
                // 将大模型的回答添加到对话数组中
            };
            // 监听错误事件
            globalState.eventSource.onerror = (error) => {
                commonGlobalState.dialogVisible = false;
                globalState.eventSource.close(); // 关闭出错的连接
                globalState.eventSource = null; // 重置 eventSource 变量，允许重建连接
            };
        }
    }).catch(function (error) {
        console.error('发送失败', error);
        // 可以在这里处理错误的逻辑
    });
}

export const sendMistake = (textValue) => {
    getWrong().then(function (response) {
        globalState.dialogueArray.push({
            speaker: 'user',
            message: textValue,
            avatarSrc: 'user-avatar.jpg',
            timestamp: new Date().toLocaleString()
        });
        globalState.dialogueArray.push({
            speaker: 'assistant',
            message: '',
            avatarSrc: 'assistant-avatar.jpg',
            timestamp: new Date().toLocaleString()
        });

        // 对用户输入进行编码，准备发送
        const encodedContent = encodeURIComponent(textValue);
        const qid = globalState.history[0].qid;
        const sid = localStorage.getItem('sid');

        // 初始化 EventSource 连接，如果它尚未存在
        if (!globalState.eventSource) {
            globalState.eventSource = new EventSource(`${baseURL}/api/student/question/communicationWithUser/wrongAnswer?content=${encodedContent}&qid=${qid}&sid=${sid}`);

            // 设置接收消息的回调函数
            globalState.eventSource.onmessage = (event) => {
                globalState.dialogueArray[globalState.dialogueArray.length - 1].message += event.data;
                commonGlobalState.dialogVisible = false;
                // 将大模型的回答添加到对话数组中
            };
            // 监听错误事件
            globalState.eventSource.onerror = (error) => {
                commonGlobalState.dialogVisible = false;
                globalState.eventSource.close(); // 关闭出错的连接
                globalState.eventSource = null; // 重置 eventSource 变量，允许重建连接
            };
        }
        commonGlobalState.btnflag = false;
    }).catch(function (error) {
        console.error('发送失败', error);
        // 可以在这里处理错误的逻辑
    });
}


export const sendGuide = (textValue) => {
    getIns().then(function (response) {
        globalState.dialogueArray.push({
            speaker: 'user',
            message: textValue,
            avatarSrc: 'user-avatar.jpg',
            timestamp: new Date().toLocaleString()
        });
        globalState.dialogueArray.push({
            speaker: 'assistant',
            message: '',
            avatarSrc: 'assistant-avatar.jpg',
            timestamp: new Date().toLocaleString()
        });

        // 对用户输入进行编码，准备发送
        const encodedContent = encodeURIComponent(textValue);
        const qid = globalState.history[0].qid;
        const sid = localStorage.getItem('sid');

        // 初始化 EventSource 连接，如果它尚未存在
        if (!globalState.eventSource) {
            globalState.eventSource = new EventSource(`${baseURL}/api/student/chat/inspiration?content=${encodedContent}&qid=${qid}&sid=${sid}`);

            // 设置接收消息的回调函数
            globalState.eventSource.onmessage = (event) => {
                const data = JSON.parse(event.data);
                globalState.dialogueArray[globalState.dialogueArray.length - 1].message += data.choices[0].delta.content;
                commonGlobalState.dialogVisible = false;
                // 将大模型的回答添加到对话数组中
            };
            // 监听错误事件
            globalState.eventSource.onerror = (error) => {
                commonGlobalState.dialogVisible = false;
                globalState.eventSource.close(); // 关闭出错的连接
                globalState.eventSource = null; // 重置 eventSource 变量，允许重建连接
            };
        }

        commonGlobalState.btnflag = false;
    }).catch(function (error) {
        console.error('发送失败', error);
        // 可以在这里处理错误的逻辑
    });
}

export const sendFeynman = (textValue) => {
    getFeiman().then(function (response) {
        globalState.dialogueArray.push({
            speaker: 'user',
            message: textValue,
            avatarSrc: 'user-avatar.jpg',
            timestamp: new Date().toLocaleString()
        });
        globalState.dialogueArray.push({
            speaker: 'assistant',
            message: '',
            avatarSrc: 'assistant-avatar.jpg',
            timestamp: new Date().toLocaleString()
        });

        // 对用户输入进行编码，准备发送
        const encodedContent = encodeURIComponent(textValue);
        const qid = globalState.history[0].qid;
        const sid = localStorage.getItem('sid');

        // 初始化 EventSource 连接，如果它尚未存在
        if (!globalState.eventSource) {
            globalState.eventSource = new EventSource(`${baseURL}/api/student/chat/feiman?content=${encodedContent}&qid=${qid}&sid=${sid}`);

            // 设置接收消息的回调函数
            globalState.eventSource.onmessage = (event) => {
                const data = JSON.parse(event.data);
                globalState.dialogueArray[globalState.dialogueArray.length - 1].message += data.choices[0].delta.content;
                commonGlobalState.dialogVisible = false;
                // 将大模型的回答添加到对话数组中
            };
            // 监听错误事件
            globalState.eventSource.onerror = (error) => {
                commonGlobalState.dialogVisible = false;
                globalState.eventSource.close(); // 关闭出错的连接
                globalState.eventSource = null; // 重置 eventSource 变量，允许重建连接
            };
        }
        commonGlobalState.btnflag = false;
    }).catch(function (error) {
        console.error('发送失败', error);
        // 可以在这里处理错误的逻辑
    });
}


export const sendexplanation = (textValue) => {
    getPersonalCom().then(function (response) {
        globalState.dialogueArray.push({
            speaker: 'user',
            message: textValue,
            avatarSrc: 'user-avatar.jpg',
            timestamp: new Date().toLocaleString()
        });
        globalState.dialogueArray.push({
            speaker: 'assistant',
            message: '',
            avatarSrc: 'assistant-avatar.jpg',
            timestamp: new Date().toLocaleString()
        });

        // 对用户输入进行编码，准备发送
        const encodedContent = encodeURIComponent(textValue);
        const qid = globalState.history[0].qid;
        const sid = localStorage.getItem('sid');

        // 初始化 EventSource 连接，如果它尚未存在
        if (!globalState.eventSource) {
            globalState.eventSource = new EventSource(`${baseURL}/api/student/chat/explanation?content=${encodedContent}&qid=${qid}&sid=${sid}`);

            // 设置接收消息的回调函数
            globalState.eventSource.onmessage = (event) => {
                const data = JSON.parse(event.data);
                globalState.dialogueArray[globalState.dialogueArray.length - 1].message += data.choices[0].delta.content;
                commonGlobalState.dialogVisible = false;
                // 将大模型的回答添加到对话数组中
            };
            // 监听错误事件
            globalState.eventSource.onerror = (error) => {
                commonGlobalState.dialogVisible = false;
                globalState.eventSource.close(); // 关闭出错的连接
                globalState.eventSource = null; // 重置 eventSource 变量，允许重建连接
            };
        }
        commonGlobalState.btnflag = false;
    }).catch(function (error) {
        console.error('发送失败', error);
        // 可以在这里处理错误的逻辑
    });
}


export const getCommunication = () => Axios({
    method: 'get',
    url: '/api/student/question/communication',
    params: {
        "qid": globalState.history[0].qid,
    }
}).then(function (response) {
    if (response.data.data === undefined) {
        commonGlobalState.btnflag = true;
        globalState.dialogueArray = [];
    } else {
        commonGlobalState.btnflag = false;
        globalState.dialogueArray = response.data.data.wenxinChatHistory.map((item, index) => {
            // 确定发言者是用户还是助手
            const speaker = index % 2 === 0 ? "user" : "assistant";
            return {
                speaker: speaker, // 设置发言者
                message: speaker === "user" ? item.user : item.assistant, // 根据发言者获取消息
                avatarSrc: speaker === "user" ? "user-avatar.jpg" : "assistant-avatar.jpg", // 设置头像，假设有对应的头像文件
                timestamp: new Date().toLocaleString() // 使用当前时间作为时间戳，您可能需要根据实际情况调整
            };
        });
        commonGlobalState.dialogVisible = false;
        // 可以在这里处理成功的逻辑，比如更新UI等
    }
}).catch(function (error) {
    console.error('发送失败', error);
    // 可以在这里处理错误的逻辑
});

export const getWrong = () => Axios({
    method: 'get',
    url: '/api/student/question/communication/wrongAnswer',
    params: {
        "qid": globalState.history[0].qid,
    }
}).then(function (response) {
    //检测内容是否为空
    if (response.data.data === undefined) {
        commonGlobalState.btnflag = true;
        globalState.dialogueArray = [];
    } else {
        commonGlobalState.btnflag = false;
        globalState.dialogueArray = response.data.data.wenxinChatHistory.map((item, index) => {
            // 确定发言者是用户还是助手
            const speaker = index % 2 === 0 ? "user" : "assistant";
            return {
                speaker: speaker, // 设置发言者
                message: speaker === "user" ? item.user : item.assistant, // 根据发言者获取消息
                avatarSrc: speaker === "user" ? "user-avatar.jpg" : "assistant-avatar.jpg", // 设置头像，假设有对应的头像文件
                timestamp: new Date().toLocaleString() // 使用当前时间作为时间戳，您可能需要根据实际情况调整
            };
        });
        // 可以在这里处理成功的逻辑，比如更新UI等
    }

}).catch(function (error) {
    console.error('发送失败', error);
    // 可以在这里处理错误的逻辑
});


export const getIns = () => Axios({
    method: 'get',
    url: '/api/student/chat/inspiration/history',
    params: {
        "qid": globalState.history[0].qid,
    }
}).then(function (response) {
    //检测内容是否为空
    if (response.data.data === undefined) {
        commonGlobalState.btnflag = true;
        globalState.dialogueArray = [];
    } else {
        commonGlobalState.btnflag = false;

        console.log('发送成功', response);
        globalState.dialogueArray = response.data.data.wenxinChatHistory.map((item, index) => {
            // 确定发言者是用户还是助手
            const speaker = index % 2 === 0 ? "user" : "assistant";
            return {
                speaker: speaker, // 设置发言者
                message: speaker === "user" ? item.user : item.assistant, // 根据发言者获取消息
                avatarSrc: speaker === "user" ? "user-avatar.jpg" : "assistant-avatar.jpg", // 设置头像，假设有对应的头像文件
                timestamp: new Date().toLocaleString() // 使用当前时间作为时间戳，您可能需要根据实际情况调整
            };
        });
        commonGlobalState.dialogVisible = false;
        // 可以在这里处理成功的逻辑，比如更新UI等
    }
}).catch(function (error) {
    console.error('发送失败', error);
    // 可以在这里处理错误的逻辑
});

export const getPersonalCom = () => Axios({
    method: 'get',
    url: '/api/student/chat/explanation/history',
    params: {
        "qid": globalState.history[0].qid,
    }
}).then(function (response) {
    //检测内容是否为空
    if (response.data.data === undefined) {
        commonGlobalState.btnflag = true;
        globalState.dialogueArray = [];
    } else {
        commonGlobalState.btnflag = false;
        console.log('发送成功', response);
        globalState.dialogueArray = response.data.data.wenxinChatHistory.map((item, index) => {
            // 确定发言者是用户还是助手
            const speaker = index % 2 === 0 ? "user" : "assistant";
            return {
                speaker: speaker, // 设置发言者
                message: speaker === "user" ? item.user : item.assistant, // 根据发言者获取消息
                avatarSrc: speaker === "user" ? "user-avatar.jpg" : "assistant-avatar.jpg", // 设置头像，假设有对应的头像文件
                timestamp: new Date().toLocaleString() // 使用当前时间作为时间戳，您可能需要根据实际情况调整
            };
        });
        commonGlobalState.dialogVisible = false;
        // 可以在这里处理成功的逻辑，比如更新UI等
    }
}).catch(function (error) {
    console.error('发送失败', error);
    // 可以在这里处理错误的逻辑
});

export const getFeiman = () => Axios({
    method: 'get',
    url: '/api/student/chat/feiman/history',
    params: {
        "qid": globalState.history[0].qid,
    }
}).then(function (response) {
    if (response.data.data === undefined) {
        commonGlobalState.btnflag = true;
        globalState.dialogueArray = [];
    }
    else {
        console.log('发送成功', response);
        globalState.dialogueArray = response.data.data.wenxinChatHistory.map((item, index) => {
            // 确定发言者是用户还是助手
            const speaker = index % 2 === 0 ? "user" : "assistant";
            return {
                speaker: speaker, // 设置发言者
                message: speaker === "user" ? item.user : item.assistant, // 根据发言者获取消息
                avatarSrc: speaker === "user" ? "user-avatar.jpg" : "assistant-avatar.jpg", // 设置头像，假设有对应的头像文件
                timestamp: new Date().toLocaleString() // 使用当前时间作为时间戳，您可能需要根据实际情况调整
            };
        });
        commonGlobalState.dialogVisible = false;
        // 可以在这里处理成功的逻辑，比如更新UI等
    }
}).catch(function (error) {
    console.error('发送失败', error);
    // 可以在这里处理错误的逻辑
});
