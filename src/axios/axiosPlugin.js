import axios from 'axios';
import { commonGlobalState } from '@/utils/commonStore.js';
import { baseURL } from '@/config.js';
const Axios = axios.create({
    baseURL: baseURL,
    timeout: 1000 * 1000,
});


// 响应拦截器
Axios.interceptors.response.use(
    response => {
        // 你的响应成功处理逻辑
        console.log(response);
        if (localStorage.getItem('token') == null){
            if (response.data && response.data.status === 0) {
                commonGlobalState.showModal = true;
            }
        }
        if (response.data.msg=="请先登录" && response.data.status === 0) {
            commonGlobalState.showModal = true;
        }
        return response;
    },
    error => {
        // 响应错误处理
        return Promise.reject(error);
    }
);

Axios.defaults.withCredentials = true

export default Axios;
