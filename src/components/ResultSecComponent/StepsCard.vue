<template>
    <v-list>
        <v-card v-for="(step, index) in listItems.solutionSteps" :key="index" :elevation="0" class="list-item-card" color="">
            <v-list-item>
                <div style="display: flex;">
                    <!-- 由于此处不再需要显示id，移除avatar-with-id -->
                    <v-avatar size="45px" class="avatar-item">
                        <!-- 可以在这里显示步骤编号 -->
                        <span class="step-index">{{ index + 1 }}</span>
                    </v-avatar>
                    <!-- 使用step作为标题，展示解题步骤序号及内容 -->
                    <v-card-title class="list-item-title">步骤 {{ index + 1 }}: {{ step }}</v-card-title>
                    <!-- 步骤内容已包含在标题中，此处可以留空或提供额外信息 -->
                    <v-card-text class="list-item-subtitle"></v-card-text>
                </div>
            </v-list-item>
        </v-card>
    </v-list>
</template>
  
<script>
export default {
    props: {
        listItems: {
            type: Object,
            required: true,
            default: () => ({
                id: 1,
                title: '双曲线题目1',
                question: '已知双曲线方程为$\\frac{x^2}{9} - \\frac{y^2}{4} = 1$，求焦点坐标、顶点坐标和渐近线方程。',
                solutionSteps: [
                    '第一步：根据标准双曲线方程形式，可知a² = 9, b² = 4，则c² = a² + b² = 9 + 4 = 13，所以$c = \\sqrt{13}$。',
                    '第二步：焦点坐标位于原点两侧且距离为$c$，因此焦点坐标为$(±\\sqrt{13}, 0)$。',
                    '第三步：顶点坐标是中心与实轴的交点，对于此双曲线，顶点坐标为$(±a, 0)$，即顶点坐标为$(±3, 0)$。',
                    '第四步：计算渐近线方程。由于双曲线的标准形式下，渐近线方程为$y = ±\\frac{b}{a}x$，所以此处渐近线方程为$y = ±\\frac{2}{3}x$。'
                ]
            })
        }
    }
}
</script>
  
<style scoped>
.list-item-card {
    margin: 5px 0;
    max-width: 100%;
    overflow-wrap: break-word;
}

.avatar-with-id .id-text {
    color: #FFF;
}

.avatar-item {
    margin: 10px;
    background-color: rgb(208, 228, 241);
    color: rgb(247 249 249);
    width: 45px;
    height: 45px;
    margin: 10px;
    font-size: 20px;
    font-weight: 600;
    font-family: fantasy;
}

.list-item-title {
    white-space: normal;
    color: #969696;
    overflow-wrap: break-word;
    max-width: 90%;
    font-size: 15px;
    font-weight: 600;
    font-family: 'Inter';
    padding: 10px 50px 10px 10px;
}

.list-item-subtitle {
    white-space: normal;
    font-size: inherit;
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
}
</style>