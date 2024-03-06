<template>
    <div class="text-center">
        <v-dialog v-model="globalState.showModal" max-width="500px">
            <v-card class="pa-4" elevation="2">
                <v-card-title class="text-h5 mb-4">
                    {{ isLoginMode ? '登录' : '注册' }}
                </v-card-title>

                <v-card-text v-if="isLoginMode">
                    <v-text-field v-model="username" label="用户名" prepend-icon="mdi-account" outlined class="mb-4"
                        required></v-text-field>

                    <v-text-field v-model="password" label="密码" :type="showPassword ? 'text' : 'password'"
                        prepend-icon="mdi-lock" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPassword = !showPassword" outlined required></v-text-field>

                </v-card-text>

                <!-- 注册表单 -->
                <v-card-text v-else>
                    <v-text-field v-model="username" label="用户名" prepend-icon="mdi-account" outlined class="mb-4"
                        required></v-text-field>

                    <v-text-field v-model="email" label="邮箱" prepend-icon="mdi-email" outlined class="mb-4"
                        required></v-text-field>

                    <v-text-field v-model="password" label="密码" :type="showPassword ? 'text' : 'password'"
                        prepend-icon="mdi-lock" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPassword = !showPassword" outlined required></v-text-field>

                </v-card-text>

                <v-card-actions>
                    <v-btn text color="primary" @click="toggleMode">{{ isLoginMode ? '没有账号？注册' : '已有账号？登录' }}
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn text color="grey" @click="globalState.showModal = false">取消</v-btn>
                    <v-btn color="primary" depressed @click="handleLogin">
                        {{ isLoginMode ? '登录' : '注册' }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { globalState } from '@/utils/store.js';
import Axios from '@/axios/axiosPlugin';
import { fetchData } from '@/utils/common.js';
const isLoginMode = ref(true); // 切换登录和注册模式
const username = ref('');
const password = ref('');
const showPassword = ref(false); // 控制密码的可见性

function toggleMode() {
    isLoginMode.value = !isLoginMode.value;
}

function handleLogin() {
    try {
        if (isLoginMode.value) {
            Axios({
                method: 'get',
                url: '/api/student/login',
                params: {
                    username: username.value,
                    password: password.value,
                },
            }).then(function (response) {
                if (response.data.code === 200 && response.data.status === 1) {
                    localStorage.setItem('uid', response.data.data[0]);
                    localStorage.setItem('token', response.data.data[1]);
                    localStorage.setItem('username', username.value);
                    fetchData();
                }
            }).catch(function (error) {
                console.log('登录失败', error);
            });

        } else {
            console.log('注册', username.value, password.value);
        }
        globalState.showModal = false; // 成功后关闭对话框
    } catch (error) {
        console.error('登录失败', error);
    }
}
</script>


<style>
.v-card {
    background-color: #f5f5f5;
    /* 淡色背景 */
}
</style>

