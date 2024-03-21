<template>
    <!-- Main card container -->
    <v-card class="mx-auto main-card" height="16vh">
        <!-- Card title -->
        <v-card-title class="card-title">
            亲爱的Museer，欢迎回来！
        </v-card-title>

        <!-- Button container -->
        <v-container class="button-container" style="padding-left: 0 !important;">
            <v-row class="button-row">
                <!-- Error analysis button -->
                <v-col cols="auto">
                    <v-btn class="action-button" size="large">错题分析</v-btn>
                </v-col>

                <!-- Learning suggestion button -->
                <v-col cols="auto">
                    <v-btn class="action-button" size="large">学习建议</v-btn>
                </v-col>

                <!-- Knowledge module button -->
                <v-col cols="auto">
                    <v-btn class="action-button" size="large">知识模块</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-card>

    <!-- Secondary card for additional content -->
    <v-card class="mx-auto content-card" height="64vh" style="display: flex;">
        <div style="background-color: #F7F9F9;border-radius: 16px;">
            <div ref="echartRef1" style="width: 60vw; height: 28vh;"></div>
            <div ref="echartRef2" style="width: 60vw; height: 28vh;"></div>
        </div>
        <div style="margin-left:10px;background-color: #F7F9F9;border-radius: 16px;">
            <div ref="echartRef3" style="width: 30vw; height: 60vh;"></div>
        </div>
    </v-card>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';

const echartRef1 = ref(null);
const echartRef2 = ref(null);
const echartRef3 = ref(null);
const days = Array.from({ length: 30 }, (_, i) => i + 1); // 生成1到30的数组表示天数
const searchData = days.map(() => Math.floor(Math.random() * 20)); // 生成随机搜索量数据
const categories = ['代数', '几何', '物理', '化学', '生物', '历史', '地理']; // 错题种类
const categoryData = [120, 200, 150, 80, 70, 110, 130]; // 各种类错题数量
const errorData = [
    { value: 40, name: '语法错误' },
    { value: 30, name: '拼写错误' },
    { value: 20, name: '逻辑错误' },
    { value: 10, name: '事实错误' }
];


onMounted(() => {
    const myChart1 = echarts.init(echartRef1.value);
    const option1 = {
        title: {
            text: '本月每日搜题量'
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: Array.from({ length: 15 }, (_, i) => `${i + 1}`) // 生成1到30日的标签
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '搜索量',
                type: 'line',
                data: searchData, // 使用上面生成的搜索量数据
                markPoint: {
                    data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                    ]
                },
                markLine: {
                    data: [{ type: 'average', name: '平均值' }]
                }
            }
        ]
    };

    myChart1.setOption(option1);
    const myChart2 = echarts.init(echartRef2.value);

    const option2 = {
        title: {
            text: '错题种类分布'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'category',
            data: categories
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '错题数量',
                type: 'bar',
                data: categoryData,
                emphasis: {
                    focus: 'series'
                },
                itemStyle: {
                    color: '#5470C6' // 可以设置条形的颜色
                }
            }
        ]
    };

    myChart2.setOption(option2);
    const myChart3 = echarts.init(echartRef3.value);

    const option3 = {
        title: {
            text: '错题类型分析',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: '错题类型',
                type: 'pie',
                radius: '50%',
                data: errorData,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    myChart3.setOption(option3);

});
</script>

<style scoped>
/* Style for the main card */
.main-card {
    width: 95vw;
    margin: 50px 0px 20px 0px;
    padding: 20px;
}

/* Style for the card title */
.card-title {
    font-size: 30px;
}

/* Style for the button container */
.button-container {
    margin-left: 0 !important;
}

/* Style for the button row */
.button-row {
    display: flex;
    flex: 1 1 auto;
    flex-direction: row;
    justify-content: flex-start;
    margin: 0 !important;
    padding: 0 !important;
}

/* Style for action buttons */
.action-button {
    density: default;
    variant: outlined;
}

/* Style for the content card */
.content-card {
    width: 95vw;
    padding: 20px;
}
</style>