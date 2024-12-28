<script setup>
import { Basketball } from '@element-plus/icons-vue';
import { watch, nextTick } from 'vue';
const data = defineProps(['domains']);
const rowStyle_domain = ({
    row
}) => {
    var ans = {}
    //向ans添加height属性为75px
    ans['height'] = '56px'
    if (row.status === 'danger') {
        ans['background-color'] = '#FF4D4F'
        return ans
    } else if (row.status === 'warning') {
        ans['background-color'] = '#FFA940'
        return ans
    } else if (row.status === 'safe') {
        ans['background-color'] = '#52C41A'
        return ans
    }
    return ans
}

watch(() => data.domains, (newVal) => {
    nextTick(() => {
        // console.log(newVal)
        var domain = document.getElementById('domain')
        domain.style['height'] = 200 + newVal.length * 56 + 'px'
    })
},
    { immediate: true })
</script>

<template>
    <div id="domain">
        <h1 class="title"><el-icon size="25">
                <Basketball />
            </el-icon>&nbsp; 域名检查</h1>
        <el-table :data="data.domains" :header-cell-style="{ fontSize: '18px' }" :row-style="rowStyle_domain"
            :cell-style="{ height: '70px' }">
            <el-table-column prop="domain" label="Domain" width="280" />
            <el-table-column prop="status" label="Status" width="110" />
            <el-table-column prop="IP" label="IP" width="" />
            <el-table-column prop="country" label="Country" width="" />
            <el-table-column prop="region" label="Region" width="" />
            <el-table-column prop="city" label="City" width="" />
            <el-table-column prop="latitude" label="Latitude" width="" />
            <el-table-column prop="longitude" label="Longitude" width="" />
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

#domain {
    width: 80%;
    height: 337px;
    margin-left: 18%;
    margin-top: 15px;
    border: 1px solid #BBBBBB;
    border-radius: 30px 30px 30px 30px;
    box-shadow: 10px 10px 10px #001529;
}
</style>