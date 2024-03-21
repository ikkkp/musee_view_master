<template>
    <div class="container">
        <!-- Left Section -->
        <div class="left-section">
            <v-card class="left-card" color="#FFFFFF">
                <CollectionIndex></CollectionIndex>
            </v-card>
        </div>
        <!-- Right Section -->
        <div class="right-section">
            <v-card color="#FFFFFF" style="height: 100%;">
                <div style="height: 100%;overflow-y: auto;">
                    <div style="margin: 10px 0;" v-for="(mistake, index) in mistakeData" :key="index">
                        <MistakePreviewComponent :tags="mistake.tags" :cardTitle="mistake.cardTitle"
                            :cardMsg="mistake.cardMsg" :cardTime="mistake.cardTime" :cardColor="mistake.cardColor" :imgSrc="mistake.imgSrc">
                        </MistakePreviewComponent>
                    </div>
                </div>
            </v-card>
        </div>
    </div>
</template>

<script setup>
import CollectionIndex from '@/components/CollectionIndex.vue';
import MistakePreviewComponent from '@/components/MistakePreviewComponent.vue';
const mistakeData = [
    {
        tags: ['综合', '选择'],
        cardTitle: '反比例函数在几何图形中的应用',
        cardMsg:
            '错误地将反比例函数的应用局限于四边形的面积计算，而没有将其扩展到整个图形的性质和特征中，学生可能对反比例函数和几何图形的性质和特征理解不够深入，未能掌握反比例函数在解决几何问题中的重要应用。',
        cardTime: '2024/1/4',
        cardColor: '#D0E4F1',
        imgSrc:'https://p4.itc.cn/q_70/images03/20220412/5e59aaab355b45ab88fa4bc4d738b825.jpeg'
    },
    {
        tags: ['数学', '代数'],
        cardTitle: '解一元二次方程的方法',
        cardMsg: '详细介绍了使用配方法和公式法解一元二次方程的步骤，注意点和常见错误。',
        cardTime: '2024/2/15',
        cardColor: '#D0E4F1',
        imgSrc:'https://5b0988e595225.cdn.sohucs.com/images/20190803/b4b5d9450e784d25a1e9acd27c6b04cf.jpeg'
    },
    {
        tags: ['物理', '力学'],
        cardTitle: '牛顿第二定律的实际应用',
        cardMsg: '通过实例解释了牛顿第二定律在不同物理场景中的应用，强调了力与加速度的关系。',
        cardTime: '2024/3/22',
        cardColor: '#D0E4F1',
        imgSrc:'https://puui.qpic.cn/vpic_cover/e03560j8srb/e03560j8srb_hz.jpg'
    },
    {
        tags: ['化学', '化学键'],
        cardTitle: '离子键的形成和特性',
        cardMsg: '详细介绍了离子键的形成条件，特性和应用，通过实验和图表展示了离子键的特性。',
        cardTime: '2024/4/30',
        cardColor: '#D0E4F1',
        imgSrc:'https://i.ytimg.com/vi/uhVnS0axFJY/sddefault.jpg'
    },]
</script>
  
<style scoped>
.container {
    height: 85vh;
    display: flex;
}

.left-section {
    width: 33vw;
    padding: 20px 5px 0px 20px;
    display: flex;
    min-width: 500px;
}

.right-section {
    width: 67vw;
    min-width: 500px;
    padding: 20px 20px 0px 5px
}

.left-card {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}

.inner-card {
    margin: 10px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
}
</style>
  