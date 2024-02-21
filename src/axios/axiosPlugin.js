import axios from 'axios';
import {
    baseURL
} from '@/config.js';

export const Axios = axios.create({
    baseURL: baseURL,
    timeout: 10 * 1000,
});

