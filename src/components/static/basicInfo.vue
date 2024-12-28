<script setup>
import { defineProps, ref, watch } from 'vue';
import { CircleCloseFilled } from '@element-plus/icons-vue';
import { getFinal, getimg } from '@/api/static/static';
import { useApkStore } from '@/stores';
const data = defineProps(['fileInfo', 'appInfo']);
// const res1 = ref('涉诈软件');
// const res2 = ref('涉诈软件');
// const res3 = ref('涉诈软件');
const dialog = ref(false);
const type = ref('');

const progress = ref(false);
const format = () => {
    return '分析中';
}

const show = async () => {
    progress.value = true;
    await getFinal(useApkStore().apkFileName).then((res) => {
        progress.value = false;
        console.log(res)
        if (res.data == 'black') {
            type.value = '黑产软件'
        } else if (res.data == 'gamble') {
            type.value = '涉赌软件'
        } else if (res.data == 'scam') {
            type.value = '涉诈软件'
        } else if (res.data == 'sex') {
            type.value = '涉黄软件'
        } else {
            type.value = '安全软件'
        }

        if (data.appInfo[8].value == '（在黑名单中）' && type.value == '安全软件') {
            type.value = '黑产软件'
        }
        if (data.appInfo[8].value == '（在白名单中）') {
            type.value = '安全软件'
        }
    }).catch((err) => {
        console.log(err)
    });

    await getimg(useApkStore().apkFileName).then((res) => {
        // console.log(atob(res.data))

        // 假设res.data是Base64编码的图片数据
        const base64ImageData = res.data;

        // 创建Image元素
        const img = new Image();

        // 设置Image元素的src属性，这里假设图片类型为png
        img.src = 'data:image/png;base64,' + base64ImageData;

        img.style.width = '100px';
        img.style.height = '100px';
        // 将Image元素添加到DOM中，这里假设有一个id为'image-container'的元素
        document.getElementById('app_img').appendChild(img);
        // dialog.value = true;
        // progress.value = false;
    });
    // console.log(res)
    dialog.value = true;
    progress.value = false;
}

watch(() => type, (newVal) => {
    if (newVal == '黑产软件') {
        document.getElementById('type').style.color = 'black'
    } else if (newVal == '涉赌软件') {
        document.getElementById('type').style.color = 'red'
    } else if (newVal == '涉诈软件') {
        document.getElementById('type').style.color = 'red'
    } else if (newVal == '涉黄软件') {
        document.getElementById('type').style.color = 'yellow'
    } else {
        document.getElementById('type').style.color = 'white'
    }
})

</script>

<template>
    <el-dialog v-model="dialog" width="800" :show-close="false" style="background-color: white">
        <template #header="{ close, titleId, titleClass }">
            <div class="my-header">
                <h4 :id="titleId" :class="titleClass" style="font-family: KaiTi;font-size: 22px;margin-top: 5px;">智能分析内容
                </h4>
                <el-button type="danger" @click="close">
                    <el-icon class="el-icon--left">
                        <CircleCloseFilled />
                    </el-icon>
                    Close
                </el-button>
            </div>
        </template>
        <div>
            <b>1、机器学习、灰度图识别、icon识别混合判定结果：</b>
            <p>&nbsp;&nbsp;&nbsp;&nbsp; 分类结果：{{ type }}</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp; 灰度图：</p>
            <img src="../../assets/hdt.png" alt="" style="margin-left: 50%;transform: translateX(-50%)">
        </div>
    </el-dialog>
    <div id="basicInfo">
        <div id="left">
            <div id="app_img">
                <!-- <img src="../../assets/bcg1.png" alt="none" style="width: 100px;height: 100px;"> -->
            </div>
            <div id="brief">
                <p id="type"
                    style="text-align: center;font-size: 22px;font-weight: 600;font-family: KaiTi;margin-top: 0px;color: red;">
                    {{ type }}</p>
                <div style="height: 50px;width: 100px;border: 1px whitesmoke solid;font-family: KaiTi;border-radius: 5px 5px 5px 5px;text-align: center;padding-top: 10px;font-size: 14px;"
                    @click="show()">点击查看图标<br>和综合智能<br>分析内容</div>
                <el-progress style="margin-top: 20px;" v-if="progress" id="progress" :percentage="100" :format="format"
                    :indeterminate="true" />
            </div>
        </div>
        <div id="mid">
            <h1>文件信息</h1>
            <div class="attr" v-for="(key, value) in data.fileInfo" :key="key">
                <div class="key">{{ value }}</div>
                <div class="value">{{ key }}</div>
            </div>
        </div>
        <div id="right">
            <h1>APP信息 {{ data.appInfo[8].value }}</h1>
            <div class="attr" v-for="Info in data.appInfo.slice(0, 3)" :key="Info">
                <div class="key">{{ Info.key }}</div>
                <div class="value">{{ Info.value }}</div>
            </div>
            <div class="SDK" v-for="Info in data.appInfo.slice(3, 6)" :key="Info">
                <div class="SDK_key">{{ Info.key }}</div>
                <div class="SDK_value">{{ Info.value }}</div>
            </div>
            <div class="releases" v-for="Info in data.appInfo.slice(6, 8)" :key="Info">
                <div class="releases_key">{{ Info.key }}</div>
                <div class="releases_value">{{ Info.value }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.my-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 16px;
    height: 50px;
}

#basicInfo {
    color: #BBBBBB;
    margin-left: 18%;
    margin-top: 1%;
    width: 80%;
    height: 300px;
    border-radius: 40px 40px 40px 40px;
    border: #BBBBBB 1px solid;
    box-shadow: 5px 5px 6px #001529;

    #left {
        width: 10%;
        height: 300px;
        float: left;
        margin-left: 15px;
        margin-top: 7px;

        #app_img {
            border: 1px solid #BBBBBB;
            width: 100px;
            height: 100px;
            margin-left: 15px;
            margin-top: 15px;
        }

        #brief {
            /* border: 1px solid #BBBBBB; */
            width: 100px;
            height: 90px;
            margin-left: 15px;
            margin-top: 30px;
        }
    }

    #mid {
        width: 48%;
        height: 300px;
        float: left;
        margin-left: 15px;
        margin-top: 7.5px;

        h1 {
            font-size: 24px;
            font-family: KaiTi;
            margin-left: 15px;
            margin-top: 15px;
            margin-left: 165px;
            height: 18px;
        }

        .attr {
            width: 100%;
            height: 30px;
            line-height: 30px;
            margin-left: 15px;
            margin-top: 11px;
            /* border: 1px solid #BBBBBB; */
        }
    }

    #right {
        width: 38%;
        height: 300px;
        float: left;
        margin-left: 15px;
        margin-top: 7.5px;

        h1 {
            font-size: 24px;
            font-family: KaiTi;
            margin-left: 15px;
            margin-top: 15px;
            margin-left: 165px;
            height: 17.5px;
        }

        .attr {
            width: 100%;
            height: 30px;
            line-height: 30px;
            margin-left: 15px;
            margin-top: 12.5px;
            /* border: 1px solid #BBBBBB; */
        }

        .SDK {
            width: 135px;
            height: 30px;
            line-height: 30px;
            float: left;
            margin-left: 7.5px;
            margin-top: 12.5px;

            .SDK_key {
                background-color: #4095E5;
                width: 65px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                float: left;
                margin-left: 22.5px;
                /* margin-top: 20px; */
                font-size: 13.5px;
                font-family: KaiTi;
                border-radius: 10px 10px 10px 10px;
            }

            .SDK_value {
                width: 45px;
                height: 30px;
                line-height: 30px;
                float: left;
                /* margin-left: 20px; */
                /* margin-top: 20px; */
                font-size: 12px;
                font-family: KaiTi;
                text-align: center;
            }
        }

        .releases {
            width: 200px;
            height: 30px;
            line-height: 30px;
            float: left;
            margin-left: 7.5px;
            margin-top: 12.5px;

            .releases_key {
                background-color: #4095E5;
                width: 65px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                float: left;
                margin-left: 22.5px;
                /* margin-top: 20px; */
                font-size: 12px;
                font-family: KaiTi;
                border-radius: 10px 10px 10px 10px;
            }

            .releases_value {
                width: 105px;
                height: 30px;
                line-height: 30px;
                float: left;
                /* margin-left: 20px; */
                /* margin-top: 20px; */
                font-size: 12px;
                font-family: KaiTi;
                text-align: center;
            }
        }
    }

    .key {
        background-color: #4095E5;
        width: 65px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        float: left;
        margin-left: 15px;
        /* margin-top: 20px; */
        font-size: 13.5px;
        font-family: KaiTi;
        border-radius: 10px 10px 10px 10px;
    }

    .value {
        width: 320px;
        height: 30px;
        line-height: 30px;
        float: left;
        margin-left: 15px;
        /* padding-left: 50%; */
        /* margin-top: 20px; */
        font-size: 12px;
        font-family: KaiTi;
        text-align: center;
        /* margin-left: 50%; */

    }
}
</style>