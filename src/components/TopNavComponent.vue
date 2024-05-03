<template>
    <div class="header-container">
        <div class="logo-section">
            <img src="@/icons/ChatGPT.png" alt="" class="logo-image">
            <div class="logo-text">
                <div class="main-title">Musee</div>
                <div class="subtitle">Education</div>
            </div>
        </div>
        <div class="button-section">
            <v-btn v-for="(button, index) in buttons" :key="index" :rounded="button.rounded" :size="button.size"
                :color="button.isActive ? '#2081C3' : button.color" :elevation="button.elevation"
                :style="{ fontSize: button.fontSize, color: button.isActive ? '#FFFFFF' : button.textColor }"
                @click="changeColor(index)">
                {{ button.label }}
            </v-btn>
        </div>
        <div class="about-us-section">
            <v-btn rounded="xl" size="x-large" variant="outlined" color="#388FCA"
                @click="() => { show == false; ConversationShow = true;}">About
                us</v-btn>
            <v-avatar color="info" size="45px" @click="() => dialog = true">
                <span class="text-h6">IK</span>
            </v-avatar>
        </div>
    </div>

    <div class="text-center">
        <template>
            <v-dialog v-model="ConversationShow" width="600px">
                <v-card class="mx-auto" max-width="344">
                    <div class="image-container">
                        <v-img src="../src/images/musee-edu/musee-edu.webp" height="200px" cover></v-img>
                        <v-btn icon small class="close-button"
                            @click="() => { show = false; ConversationShow = false;}">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </div>
                    <v-card-title> 沐斯慧教 </v-card-title>

                    <v-card-subtitle> MuseeEducation </v-card-subtitle>

                    <v-card-actions>
                        <v-btn color="orange-lighten-2" text="Explore More"></v-btn>

                        <v-spacer></v-spacer>

                        <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>

                    </v-card-actions>

                    <v-expand-transition>
                        <div v-show="show">
                            <v-divider></v-divider>
                            <v-card-text>{{intro}}</v-card-text>
                        </div>
                    </v-expand-transition>
                </v-card>
            </v-dialog>
        </template>


        <template>
            <v-row justify="center">
                <v-dialog v-model="dialog" persistent width="1024">
                    <v-card class="hidden-flow">
                        <v-card-title>
                            <div>
                                <v-avatar color="info" size="33 !important">
                                    <v-icon icon="mdi-account-circle" size="32"></v-icon>
                                </v-avatar>&nbsp;&nbsp;&nbsp;
                                <span class="text-h5">个人信息</span>
                            </div>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6">
                                        <v-text-field label="昵称" hint="Enter your nickname" clearable></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-select :items="['0-6', '7-12', '12-15', '18+']" label="年龄*"
                                            required></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-select :items="['高中及以下', '大学专科', '大学本科', '硕士及以上']" label="学历*"
                                            required></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-select :items="['语文', '数学', '英语', '物理', '化学', '生物', '历史', '政治', '地理']"
                                            label="专业" chips multiple clearable></v-select>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="账号*" prepend-inner-icon="mdi-account"
                                            hint="Enter your account" required clearable></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="密码*" required prepend-inner-icon="mdi-lock"
                                            :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                            @click:append="showPassword = !showPassword"
                                            :type="showPassword ? 'text' : 'password'" hint="Enter your password"
                                            counter="20" clearable></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="邮箱" prepend-inner-icon="mdi-email" hint="Enter your email"
                                            clearable></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <small>*项必填</small>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn rounded="xl" color="blue-darken-1" @click="() => dialog = false">
                                关闭
                            </v-btn>

                            <v-btn rounded="xl" color="blue-darken-1"  @click="() => dialog = false">
                                保存
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </template>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import router from '@/router';
const ConversationShow = ref(false);
const dialog = ref(false);
const showPassword = ref(false);
const show=ref(false);
const intro = ref("沐斯慧教（MuseeEducation）致力于运用人工智能大模型推动教育的智慧化转型。通过结合先进的AI技术和教育行业的深刻理解，能够为学习者提供更加个性化、互动性强和效率高的学习体验。沐斯慧教的核心理念是利用大数据分析、自然语言处理和机器学习等技术，为教育领域带来创新的解决方案，包括但不限于个性化学习路径推荐、智能辅导机器人、以及基于学习者表现的实时反馈系统。");
const buttons = ref([
    {
        rounded: 'xl',
        size: 'x-large',
        color: '#D6F3FF',
        elevation: '0',
        fontSize: '20px',
        textColor: '#96ABB3',
        label: '沐斯拍题',
        isActive: false,
        to: '/musee_view_master/',
    },
    {
        rounded: 'xl',
        size: 'x-large',
        color: '#D6F3FF',
        elevation: '0',
        fontSize: '20px',
        textColor: '#96ABB3',
        label: '错题集',
        isActive: false,
        to: '/musee_view_master/collection',
    },
    {
        rounded: 'xl',
        size: 'x-large',
        color: '#D6F3FF',
        elevation: '0',
        fontSize: '20px',
        textColor: '#96ABB3',
        label: '学生档案',
        isActive: false,
        to: '/musee_view_master/userinfo'
    },
]);

const changeColor = (index) => {
    buttons.value.forEach((button, i) => {
        button.isActive = i === index;
    });
    router.push(buttons.value[index].to);
};
onMounted(() => {
    const path = window.location.pathname;
    if (path === '/musee_view_master/') {
        buttons.value[0].isActive = true;
    } else if (path === '/musee_view_master/collection') {
        buttons.value[1].isActive = true;
    } else if (path === '/musee_view_master/userinfo') {
        buttons.value[2].isActive = true;
    }
});

</script>

<style scoped>
.header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logo-section {
    display: flex;
    align-items: center;
    width: 350px;
}

.logo-image {
    height: 60px;
    padding: 5px;
}

.logo-text {
    color: black;
    font-size: xx-large;
    font-weight: bolder;
    padding: 10px 10px;
    display: flex;
}

.main-title {
    color: #388fca;
    font-weight: bold;
}

.subtitle {
    color: #a1c9e3;
    font-weight: bold;
}

.button-section {
    display: flex;
    justify-content: space-around;
    width: 450px;
}

.about-us-section {
    width: 200px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.image-container {
    position: relative;
    width: 100%;
    height: 200px;
}

.close-button {
    background-color: transparent !important;
    border: none !important;
    box-shadow: none !important;
    position: absolute;
    top: 2px;
    right: 2px;
    z-index: 1;
    width: 13px !important;
    height: 13px !important;
    padding: 0;
}

.close-button .v-icon {
    font-size: 13px;
}

.hidden-flow{
    overflow: hidden !important;
}
</style>
