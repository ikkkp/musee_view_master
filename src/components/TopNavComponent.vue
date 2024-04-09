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
                @click="() => ConversationShow = true">About
                us</v-btn>
            <v-avatar color="info" size="45px" @click="()=> dialog=true">
                <span class="text-h6">IK</span>
            </v-avatar>
        </div>
    </div>
    <div class="text-center">
        <v-dialog v-model="ConversationShow" width="600px">
            <v-card>
                <v-card-title class="headline blue lighten-2 white--text" style="padding-left:40px;">关于沐斯慧教</v-card-title>
                <v-card-text class="mt-4">
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-img src="src/images/musee-edu/musee-edu.webp" aspect-ratio="1.7" class="mx-auto" cover
                                    :height="300"></v-img>
                            </v-col>
                            <v-col cols="12" sm="6">
                                {{ intro }}
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="ConversationShow = false">关闭</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <template>
            <v-row justify="center">
                <v-dialog v-model="dialog" persistent width="1024">
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">个人信息</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="昵称" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="账号"
                                            hint="example of helper text only on focus"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="学历" hint="example of persistent helper text"
                                            persistent-hint required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="邮箱*" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="密码*" type="password" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-select :items="['0-6', '7-12', '12-15', '18+']" label="Age*"
                                            required></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-autocomplete
                                            :items="['语文', '数学', '英语', '物理', '化学', '生物', '历史', '政治', '地理']"
                                            label="专业" multiple></v-autocomplete>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <small>*项必填</small>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                                Close
                            </v-btn>
                            <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                                Save
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
const dialog= ref(false);
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
        to: '/musee_view_master/collection',
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
</style>
