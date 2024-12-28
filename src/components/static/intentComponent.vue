<script setup>
import { Aim } from '@element-plus/icons-vue';
import { watch, nextTick } from 'vue';
const data = defineProps(['intents']);
const rowStyle_intent = ({
    rowIndex
}) => {
    // console.log(row, rowIndex)
    var ans = {}
    //向ans添加height属性为75px
    ans['height'] = '56px'
    if (rowIndex % 2 == 0) {
        ans['background-color'] = '#2b73af'
        return ans
    }
    return ans
}

watch(() => data.intents, (newVal) => {
    nextTick(() => {
        // console.log(newVal)
        var intent = document.getElementById('intent')
        intent.style['height'] = 150 + newVal.length * 58 + 'px'
    })
},
    { immediate: true })
</script>

<template>
    <div id="intent">
        <h1 class="title"><el-icon size="25">
                <Aim />
            </el-icon>&nbsp; 相关intent</h1>
        <el-table :data="data.intents" :header-cell-style="{ fontSize: '18px' }" :row-style="rowStyle_intent"
            :cell-style="{ height: '52px' }">
            <el-table-column prop="action" label="action" width="600" />
            <el-table-column prop="category" label="category" width="" />
        </el-table>
    </div>
</template>

<style scoped>
.title {
    font-size: 25px;
    font-family: KaiTi;
    color: #BBBBBB;
    margin-left: 15px;
    padding: 0px;
    margin-top: 7.5px;
    margin-bottom: 15px;
}

.el-table {
    font-size: 18px;
    margin-left: 2.5%;
    width: 95%;
    background-color: transparent;
    color: #000000;
    font-family: KaiTi;

}

#intent {
    width: 80%;
    height: 800px;
    margin-left: 18%;
    margin-top: 15px;
    border: 1px solid #BBBBBB;
    border-radius: 30px 30px 30px 30px;
    box-shadow: 10px 10px 10px #001529;
}
</style>