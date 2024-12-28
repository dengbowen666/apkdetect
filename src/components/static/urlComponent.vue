<script setup>
import { Basketball } from '@element-plus/icons-vue';
import { watch, nextTick } from 'vue';

const data = defineProps(['urls']);
const rowStyle_url = ({
    row, rowIndex
}) => {
    // console.log(row, rowIndex)
    var ans = {}
    //向ans添加height属性为75px
    ans['height'] = '56px'
    if (row.isBanned === 'yes') {
        ans['background-color'] = '#FF4D4F'
        return ans
    }
    if (rowIndex % 2 == 0) {
        ans['background-color'] = '#2b73af'
        return ans
    }
    return ans
}

watch(() => data.urls, (newVal) => {
    nextTick(() => {
        // console.log(newVal)
        var url = document.getElementById('url')
        url.style['height'] = 150 + newVal.length * 56 + 'px'
    })
},
    { immediate: true })
</script>

<template>
    <div id="url">
        <h1 class="title"><el-icon size="25">
                <Basketball />
            </el-icon>&nbsp; 相关URL</h1>
        <el-table :data="data.urls" :header-cell-style="{ fontSize: '18px' }" :row-style="rowStyle_url"
            :cell-style="{ height: '52px' }">
            <el-table-column prop="url" label="Url" width="800" />
            <el-table-column prop="isBanned" label="isBanned" width="" />
        </el-table>
    </div>
</template>

<style scoped>
.title {
    font-size: 30px;
    font-family: KaiTi;
    color: #BBBBBB;
    margin-left: 15px;
    padding: 0px;
    margin-top: 7.5px;
    margin-bottom: 15px;
}

.el-table {
    font-size: 17px;
    margin-left: 2.5%;
    width: 95%;
    background-color: transparent;
    color: #000000;
    font-family: KaiTi;

}

#url {
    width: 80%;
    height: 337px;
    margin-left: 18%;
    margin-top: 15px;
    border: 1px solid #BBBBBB;
    border-radius: 30px 30px 30px 30px;
    box-shadow: 10px 10px 10px #001529;
}
</style>