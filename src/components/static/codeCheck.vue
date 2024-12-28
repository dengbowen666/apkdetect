<script setup>
import { View, Download } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { getxml, getzip, gettxt } from '@/api/static/static'
import { ElMessage } from 'element-plus'
import { useApkStore } from '@/stores'
const router = useRouter()
const props = defineProps(['isView', 'contentInfo'])

const getfile = async () => {
    console.log("getfile")
    var res;
    if (props.contentInfo === 'AndroidManifest') {
        useApkStore().setCheckwhat('xml')
        res = await getxml(useApkStore().apkFileName).then((res) => {
            console.log(res.data)
            useApkStore().setxml(res.data)
            console.log(useApkStore().xml)
            router.push({ name: 'codeView', params: { id: props.contentInfo } })
        }).catch((err) => {
            console.log(err)
        })
    } else if (props.contentInfo === 'Source') {
        useApkStore().setCheckwhat('zip')
        res = await getzip(useApkStore().apkFileName).then((res) => {
            // console.log(res.data)
            const blob = new Blob([res.data], { type: 'application/zip' });
            console.log(blob)
            // 创建一个指向该 Blob 的 URL
            const url = URL.createObjectURL(blob);

            // 创建一个临时的 a 标签用于下载
            const a = document.createElement('a');
            a.href = url;
            a.download = 'downloaded.zip'; // 指定下载文件的名称
            document.body.appendChild(a); // 将 a 标签添加到文档中
            a.click(); // 模拟点击 a 标签以下载文件

            // 清理：下载后释放创建的 URL
            URL.revokeObjectURL(url);
            a.remove(); // 移除临时创建的 a 标签
        }).catch((err) => {
            console.log(err)
        })
    } else if (props.contentInfo === 'txt') {
        useApkStore().setCheckwhat('txt')
        res = await gettxt(useApkStore().apkFileName).then((res) => {
            console.log(res)
            useApkStore().settxt(res.data)
            router.push({ name: 'codeView', params: { id: props.contentInfo } })
        }).catch((err) => {
            console.log(err)
        })
    } else {
        res = 'error';
        console.log("error")
    }
    return res
}

const openError = () => {
    ElMessage({
        message: '查看文件错误',
        type: 'error',
        plain: true,
    })
}

function toCodeOrDownload() {
    if (props.isView) {
        console.log("view")
        var res = getfile()
        if (res !== 'error') {
            openError()
        } else {
            router.push({ name: 'codeView', params: { id: props.contentInfo } })
        }
    } else {
        console.log("download")
        console.log(props.contentInfo)
    }
}

</script>

<template>
    <el-button class="button" @click="toCodeOrDownload()">
        <el-icon :size="20">
            <View v-if="props.isView" />
            <Download v-else />
        </el-icon>&nbsp;<slot></slot>
    </el-button>
</template>

<style scoped>
.button {
    float: left;
    width: 17%;
    height: 56px;
    border-radius: 15px 15px 15px 15px;
    border: 1px solid #BBBBBB;
    margin-left: 30px;
    margin-right: 225px;
    margin-top: 15px;
    font-size: 17px;
    font-weight: 500;
    font-family: KaiTi;
    background-color: transparent;
    color: #BBBBBB;
}
</style>