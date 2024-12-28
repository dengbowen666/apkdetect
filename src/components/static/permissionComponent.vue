<script setup>
import { Key } from '@element-plus/icons-vue';
import { watch, nextTick, onMounted } from 'vue'
const data = defineProps(['permissions']);

onMounted(() => {
    // console.log(data.permissions)
    var permission = document.getElementById('permission')
    // 设置activity的高度
    permission.style['height'] = 130 + data.permissions.length * 60 + 'px'
})

const rowStyle_permission = ({
    rowIndex
}) => {
    // console.log(row, rowIndex)
    var ans = {}
    //向ans添加height属性为56px
    ans['height'] = '56px'
    if (rowIndex % 2 == 0) {
        ans['background-color'] = '#2b73af'
        return ans
    }
    return ans
}

watch(() => data.permissions, (newVal) => {
    // 获得providers的标签
    console.log(data.permissions)
    nextTick(() => {
        var permission = document.getElementById('permission')
        // 设置activity的高度
        permission.style['height'] = 130 + newVal.length * 58 + 'px'
    })
})
</script>

<template>
    <div id="permission">
        <h1 class="title"><el-icon :size="25">
                <Key />
            </el-icon>&nbsp; 应用许可</h1>
        <el-table :data="data.permissions" :header-cell-style="{ fontSize: '18px' }" :row-style="rowStyle_permission"
            :cell-style="{ height: '52px' }">
            <el-table-column prop="permission" label="Permission" width="500" />
            <el-table-column prop="status" label="Status" width="150" />
            <!-- <el-table-column prop="info" label="Info" width="150" /> -->
            <el-table-column prop="description" label="Description" />
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

#permission {
    width: 80%;
    height: 337px;
    margin-left: 18%;
    margin-top: 15px;
    border: 1px solid #BBBBBB;
    border-radius: 30px 30px 30px 30px;
    box-shadow: 10px 10px 10px #001529;
}

.el-table {
    font-size: 17px;
    margin-left: 2.5%;
    width: 95%;
    background-color: transparent;
    color: #000000;
    font-family: KaiTi;

}
</style>