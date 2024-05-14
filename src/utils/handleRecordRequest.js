import Axios from '@/axios/axiosPlugin.js';
import { globalState } from '@/utils/store.js';
import { commonGlobalState } from '@/utils/commonStore.js';
import { baseURL } from '@/config.js';

export const recordSendDefault = (formData) => {
    getCommunication().then(function (_response) {

        const qid = globalState.history[0].qid;
        const sid = localStorage.getItem('sid');

        // 初始化 EventSource 连接，如果它尚未存在
        const response = fetch(`${baseURL}/api/student/chat/inspiration/audio?qid=${qid}&sid=${sid}`, {
            method: 'POST',
            body: formData
        });

        const reader = response.body.getReader();
        let decoder = new TextDecoder();
        let buffer = '';

        return reader.read().then(function processText({ done, value }) {
            if (done) {
                console.log("Stream completed");
                return;
            }
            buffer += decoder.decode(value, { stream: true });

            // 处理每一条消息
            let boundary = buffer.indexOf('\n\n');
            while (boundary !== -1) {
                let message = buffer.substring(0, boundary);
                console.log("Received message:", message);
                buffer = buffer.substring(boundary + 2);
                boundary = buffer.indexOf('\n\n');
            }

            return reader.read().then(processText);
        });

    }).catch(function (error) {
        console.error('发送失败', error);
        // 可以在这里处理错误的逻辑
    });
}

export const recordSendMistake = (formData) => {
    getWrong().then(function (_response) {

        const qid = globalState.history[0].qid;
        const sid = localStorage.getItem('sid');

        // 初始化 EventSource 连接，如果它尚未存在
        const response = fetch(`${baseURL}/api/student/question/communicationWithUser/wrongAnswer/audio?qid=${qid}&sid=${sid}`, {
            method: 'POST',
            body: formData
        });

        const reader = response.body.getReader();
        let decoder = new TextDecoder();
        let buffer = '';

        return reader.read().then(function processText({ done, value }) {
            if (done) {
                console.log("Stream completed");
                return;
            }
            buffer += decoder.decode(value, { stream: true });

            // 处理每一条消息
            let boundary = buffer.indexOf('\n\n');
            while (boundary !== -1) {
                let message = buffer.substring(0, boundary);
                console.log("Received message:", message);
                buffer = buffer.substring(boundary + 2);
                boundary = buffer.indexOf('\n\n');
            }

            return reader.read().then(processText);
        });

    }).catch(function (error) {
        console.error('发送失败', error);
        // 可以在这里处理错误的逻辑
    });
}


export const recordSendGuide = (formData) => {
    getIns().then(function (_response) {

        const qid = globalState.history[0].qid;
        const sid = localStorage.getItem('sid');

        // 初始化 EventSource 连接，如果它尚未存在
        const response = fetch(`${baseURL}/api/student/chat/inspiration/audio?qid=${qid}&sid=${sid}`, {
            method: 'POST',
            body: formData
        });

        const reader = response.body.getReader();
        let decoder = new TextDecoder();
        let buffer = '';

        return reader.read().then(function processText({ done, value }) {
            if (done) {
                console.log("Stream completed");
                return;
            }
            buffer += decoder.decode(value, { stream: true });

            // 处理每一条消息
            let boundary = buffer.indexOf('\n\n');
            while (boundary !== -1) {
                let message = buffer.substring(0, boundary);
                console.log("Received message:", message);
                buffer = buffer.substring(boundary + 2);
                boundary = buffer.indexOf('\n\n');
            }

            return reader.read().then(processText);
        });

    }).catch(function (error) {
        console.error('发送失败', error);
        // 可以在这里处理错误的逻辑
    });
}

export const recordSendFeynman = (formData) => {
    getFeiman().then(function (_response) {

        const qid = globalState.history[0].qid;
        const sid = localStorage.getItem('sid');

        // 初始化 EventSource 连接，如果它尚未存在
        const response = fetch(`${baseURL}/api/student/chat/feiman/audio?qid=${qid}&sid=${sid}`, {
            method: 'POST',
            body: formData
        });

        const reader = response.body.getReader();
        let decoder = new TextDecoder();
        let buffer = '';

        return reader.read().then(function processText({ done, value }) {
            if (done) {
                console.log("Stream completed");
                return;
            }
            buffer += decoder.decode(value, { stream: true });

            // 处理每一条消息
            let boundary = buffer.indexOf('\n\n');
            while (boundary !== -1) {
                let message = buffer.substring(0, boundary);
                console.log("Received message:", message);
                buffer = buffer.substring(boundary + 2);
                boundary = buffer.indexOf('\n\n');
            }

            return reader.read().then(processText);
        });

    }).catch(function (error) {
        console.error('发送失败', error);
        // 可以在这里处理错误的逻辑
    });
}


export const recordSendexplanation = (formData) => {
    getPersonalCom().then(function (_response) {

        const qid = globalState.history[0].qid;
        const sid = localStorage.getItem('sid');

        // 初始化 EventSource 连接，如果它尚未存在
        const response = fetch(`${baseURL}/api/student/chat/explanation/audio?qid=${qid}&sid=${sid}`, {
            method: 'POST',
            body: formData
        });

        const reader = response.body.getReader();
        let decoder = new TextDecoder();
        let buffer = '';

        return reader.read().then(function processText({ done, value }) {
            if (done) {
                console.log("Stream completed");
                return;
            }
            buffer += decoder.decode(value, { stream: true });

            // 处理每一条消息
            let boundary = buffer.indexOf('\n\n');
            while (boundary !== -1) {
                let message = buffer.substring(0, boundary);
                console.log("Received message:", message);
                buffer = buffer.substring(boundary + 2);
                boundary = buffer.indexOf('\n\n');
            }

            return reader.read().then(processText);
        });

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
