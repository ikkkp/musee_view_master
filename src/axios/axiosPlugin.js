import axios from 'axios';
import { globalState } from '@/utils/store.js';
import { baseURL } from '@/config.js';

const Axios = axios.create({
    baseURL: baseURL,
    timeout: 20 * 1000,
});

// 请求拦截器
Axios.interceptors.request.use(
    config => {
        // 尝试从localStorage获取token
        const token = localStorage.getItem('token');
        if (token) {
            // 如果token存在，将其添加到请求头部
            config.headers['userToken'] = `${token}`;
        }
        return config;
    },
    error => {
        // 请求错误处理
        return Promise.reject(error);
    }
);

// 响应拦截器
Axios.interceptors.response.use(
    response => {
        // 你的响应成功处理逻辑
        if (localStorage.getItem('token') == null)
            if (response.data && response.data.status === 0) {
                globalState.showModal = true;
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
