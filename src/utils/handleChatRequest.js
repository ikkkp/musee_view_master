import Axios from '@/axios/axiosPlugin.js';
import { globalState } from '@/utils/store.js';
import { commonGlobalState } from '@/utils/commonStore.js';

export const sendDefault = (textValue) => Axios({
    method: 'post',
    url: '/api/student/question/communication',
    data: {
        "basicQuestion": { "qid": globalState.qid },
        "content": textValue.value,
    }
}).then(function (response) {
    globalState.dialogueArray = response.data.data.map((item, index) => {
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
    commonGlobalState.btnflag = false;

    // 可以在这里处理成功的逻辑，比如更新UI等
}).catch(function (error) {
    console.error('发送失败', error);
    // 可以在这里处理错误的逻辑
});

export const sendMistake = (textValue) => Axios({
    method: 'post',
    url: '/api/student/question/communication/wrongAnswer',
    data: {
        "basicQuestion": { "qid": globalState.qid },
        "content": textValue.value,
    }
}).then(function (response) {
    globalState.dialogueArray = response.data.data.map((item, index) => {
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
    commonGlobalState.btnflag = false;

    // 可以在这里处理成功的逻辑，比如更新UI等
}).catch(function (error) {
    console.error('发送失败', error);
    // 可以在这里处理错误的逻辑
});

export const sendGuide = (textValue) => Axios({
    method: 'get',
    url: '/api/student/chat/inspiration',
    params: {
        "question": textValue.value,
        "qid": globalState.qid,
    }
}).then(function (response) {
    console.log('发送成功', response);
    globalState.dialogueArray = response.data.map((item, index) => {
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
    commonGlobalState.btnflag = false;

    // 可以在这里处理成功的逻辑，比如更新UI等
}).catch(function (error) {
    console.error('发送失败', error);
    // 可以在这里处理错误的逻辑
});

export const sendFeynman = (textValue) => Axios({
    method: 'get',
    url: '/api/student/chat/feiman',
    params: {
        "question": textValue.value,
        "qid": globalState.qid,
    }
}).then(function (response) {
    globalState.dialogueArray = response.data.map((item, index) => {
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
    commonGlobalState.btnflag = false;

    // 可以在这里处理成功的逻辑，比如更新UI等
}).catch(function (error) {
    console.error('发送失败', error);
    // 可以在这里处理错误的逻辑
});


export const sendexplanation = (textValue) => Axios({
    method: 'get',
    url: '/api/student/chat/explanation',
    params: {
        "question": textValue.value,
        "qid": globalState.qid,
    }
}).then(function (response) {
    globalState.dialogueArray = response.data.map((item, index) => {
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
    commonGlobalState.btnflag = false;

    // 可以在这里处理成功的逻辑，比如更新UI等
}).catch(function (error) {
    console.log(textValue.value)
    console.error('发送失败', error);
    // 可以在这里处理错误的逻辑
});

// export const sendExplanation = (textValue) => {
//     const question = textValue.value !== null ? textValue.value : ""; // 如果textValue.value为null，设置question为""
//
//     return Axios({
//         method: 'get',
//         url: '/api/student/chat/explanation',
//         params: {
//             "qid": globalState.qid,
//             "question": question,
//         }
//     }).then(function (response) {
//         globalState.dialogueArray = response.data.map((item, index) => {
//             // 确定发言者是用户还是助手
//             const speaker = index % 2 === 0 ? "user" : "assistant";
//             return {
//                 speaker: speaker, // 设置发言者
//                 message: speaker === "user" ? item.user : item.assistant, // 根据发言者获取消息
//                 avatarSrc: speaker === "user" ? "user-avatar.jpg" : "assistant-avatar.jpg", // 设置头像，假设有对应的头像文件
//                 timestamp: new Date().toLocaleString() // 使用当前时间作为时间戳，您可能需要根据实际情况调整
//             };
//         });
//         commonGlobalState.dialogVisible = false;
//         commonGlobalState.btnflag = false;
//
//         // 可以在这里处理成功的逻辑，比如更新UI等
//     }).catch(function (error) {
//         console.error('发送失败', error);
//         // 可以在这里处理错误的逻辑
//     });
// };


export const getCommunication = () => Axios({
    method: 'get',
    url: '/api/student/question/communication',
    params: {
        "qid": globalState.qid,
    }
}).then(function (response) {

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



}).catch(function (error) {
    console.error('发送失败', error);
    // 可以在这里处理错误的逻辑
});

export const getWrong = () => Axios({
    method: 'get',
    url: '/api/student/question/communication/wrongAnswer',
    params: {
        "qid": globalState.qid,
    }
}).then(function (response) {

    //检测内容是否为空
    if (response.data.data === undefined){
        commonGlobalState.btnflag = true;
    }else {

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


export const getIns = () => Axios({
    method: 'get',
    url: '/api/student/chat/inspiration/history',
    params: {
        "qid": globalState.qid,
    }
}).then(function (response) {

    //检测内容是否为空
    if (response.data.data === undefined){
        commonGlobalState.btnflag = true;
    }else {
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
        "qid": globalState.qid,
    }
}).then(function (response) {
    //检测内容是否为空
    if (response.data.data === undefined){
        commonGlobalState.btnflag = true;
    }else {
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
        "qid": globalState.qid,
    }
}).then(function (response) {

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



}).catch(function (error) {
    console.error('发送失败', error);
    // 可以在这里处理错误的逻辑
});
