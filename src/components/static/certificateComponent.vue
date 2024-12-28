<script setup>
import { EditPen } from '@element-plus/icons-vue';
const data = defineProps(['certifications']);
</script>

<template>
    <div id="certificate">
        <h1 class="title"><el-icon size="25">
                <EditPen />
            </el-icon>&nbsp; 签名证书</h1>
        <p class="certifications" v-for="certificate in data.certifications" :key="certificate">
            {{ certificate.name }}: {{ certificate.value }}
        </p>
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

#certificate {
    width: 80%;
    height: 337px;
    margin-left: 18%;
    margin-top: 15px;
    border: 1px solid #BBBBBB;
    border-radius: 30px 30px 30px 30px;
    box-shadow: 10px 10px 10px #001529;
}

.certifications {
    font-size: 17.5px;
    font-family: KaiTi;
    color: #BBBBBB;
    margin-left: 45px;
    padding: 0px;
    margin-top: 7.5px;
    margin-bottom: 0px;
}
</style>