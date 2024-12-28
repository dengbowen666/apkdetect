<script setup>
import directComponent from '@/components/directComponent.vue'
import { ref } from 'vue'
import { VideoPlay, Aim, Pointer } from '@element-plus/icons-vue'
import codeEditor from '@/components/dynamic/codeEditor.vue'

const text = ref('动态分析信息通知：')

const checkAll = ref(false)
const isIndeterminate = ref(true)
const checkList = ref(['Value selected and disabled', 'Value A', 'Value B', 'Value C', 'Value D', 'Value E'])
const Lists = ['Value A', 'Value B', 'Value C', 'Value D', 'Value E']

const checkAuxiliaryAll = ref(false)
const isIndeterminate1 = ref(true)
const checkAuxiliaryList = ref(['Value selected and disabled', 'Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 5', 'Value 6'])
const Lists1 = ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 5', 'Value 6']

const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
const handleCheckAllChange = (val) => {
    checkList.value = val ? Lists : []
    isIndeterminate.value = false
}
const handleCheckAllChange1 = (val) => {
    checkAuxiliaryList.value = val ? Lists1 : []
    isIndeterminate1.value = false
}

const handleCheckedChange = (value) => {
    const checkedCount = value.length
    checkAll.value = checkedCount === Lists.length
    isIndeterminate.value = checkedCount > 0 && checkedCount < Lists.length
}

const handleCheckedChange1 = (value) => {
    const checkedCount = value.length
    checkAuxiliaryAll.value = checkedCount === Lists1.length
    isIndeterminate1.value = checkedCount > 0 && checkedCount < Lists1.length
}

const options = ref(['com.ecpay.MainActivity', 'com.ecpay.SecondActivity', 'com.ecpay.ThirdActivity', 'com.ecpay.FourthActivity', 'com.ecpay.FifthActivity'])

const script = ref([
    'app-environment',
    'bypass-adb-detection',
    'bypass-emulator-detection',
    'bypass-react-native-emulator-detection',
    'crypto-aes-key',
    'crypto-dump-keystore',
    'crypto-keyguard-credential-intent',
    'crypto-trace-cipher',
    'crypto-trace-keygenparameterspec',
    'crypto-trace-keystore'])

function scriptClick(e) {
    const act = document.getElementsByClassName('active')
    if (act.length > 0) {
        act[0].classList.remove('active')
    }
    // console.log(e.target)
    e.target.classList.add('active')
    // console.log(e.target)
}

</script>

<template>
    <div id="out">
        <img src="../assets/gif1.gif" alt="" id="el-aside__logo">
        <directComponent style="top: 30%;" id="static">静态</directComponent>
        <directComponent style="top: 50%;" id="dynamic">动态</directComponent>
        <directComponent style="top: 70%;" id="system">系统</directComponent>

        <textarea id="stat" v-model="text"></textarea>

        <div id="operation">
            <div class="button">移除ROOT CA</div>
            <div class="button">设置HTTP代理</div>
            <div class="button">TLS测试</div>
            <div class="button">获取依赖</div>
            <div class="button">截屏</div>
            <div class="button">Logcat信息</div>
            <div class="button">API监控</div>
            <div class="button">生成报告</div>
            <br><br><br><br>
            <hr>
            <div id="frida">
                <div id="frida_title">Frida 脚本选择</div>
                <div id="default">
                    <p
                        style="padding-left: 10px; font-family: KaiTi;color: gainsboro;margin-top: 0px;margin-bottom: 0px;">
                        默认选择</p>
                    <el-checkbox style="padding-left: 15px;" v-model="checkAll" :indeterminate="isIndeterminate"
                        @change="handleCheckAllChange">
                        Check all
                    </el-checkbox>
                    <el-checkbox-group v-model="checkList" size="middle" @change="handleCheckedChange" id="checkbox1">
                        <el-checkbox label="API Monitoring" value="Value A" />
                        <el-checkbox label="SSL Pinning Bypass" value="Value B" />
                        <el-checkbox label="Clipboard Monitor" value="Value C" />
                        <el-checkbox label="Debugger Check Bypass" value="Value D" />
                        <el-checkbox label="Root Detection Bypass" value="Value E" />
                    </el-checkbox-group>
                </div>

                <div id="auxiliary">
                    <p
                        style="padding-left: 10px; font-family: KaiTi;color: gainsboro;margin-top: 0px;margin-bottom: 0px;">
                        辅助选项</p>
                    <el-checkbox style="padding-left: 10px;" v-model="checkAuxiliaryAll"
                        :indeterminate="isIndeterminate1" @change="handleCheckAllChange1">
                        Check all
                    </el-checkbox>
                    <el-checkbox-group v-model="checkAuxiliaryList" size="middle" @change="handleCheckedChange1"
                        id="checkbox2">
                        <el-checkbox label="Enumerate Loaded Classes" value="Value 1" />
                        <el-checkbox label="Capture Strings" value="Value 2" />
                        <el-checkbox label="Capture String Comparisons" value="Value 3" />
                        <el-checkbox label="Enumerate Class methods" value="Value 4" />
                        <br>
                        <el-input v-model="input1" style="width: 520px;height: 26px;" placeholder="java.io.File" />
                        <br>
                        <el-checkbox label="Search Class Pattern" value="Value 5" />
                        <br>
                        <el-input v-model="input2" style="width: 520px;height: 26px;" placeholder="ssl\.Trust*" />
                        <br>
                        <el-checkbox label="Trace Class Methods" value="Value 6" />
                        <br>
                        <el-input v-model="input3" style="width: 520px;height: 26px;"
                            placeholder="java.net.Socket,java.io.File,java.lang.String" />
                    </el-checkbox-group>
                    <button id="button1"><el-icon :size="12">
                            <VideoPlay />
                        </el-icon> Spawn & inject</button>
                    <button id="button2"><el-icon :size="12">
                            <Aim />
                        </el-icon> inject</button>
                    <button id="button3"><el-icon :size="12">
                            <Pointer />
                        </el-icon> Attach</button>
                    <br>
                    <p
                        style="padding-left: 10px; font-family: KaiTi;color: gainsboro;margin-top:12px;margin-bottom: 5px;">
                        开启活动</p>
                    <el-select v-model="option_value" :placeholder="options[0]" style="width: 520px;margin-left: 10px;height: 28px;">
                        <el-option v-for="item in options" :key="item" :label="item" :value="item" />
                    </el-select>
                    <button id="button4">开启活动</button>
                </div>

            </div>

        </div>
        <div id="codeArea">
            <codeEditor id="codeEditor"></codeEditor>
            <p style="float: left;font-size: 22px;color: #fff;font-family: KaiTi;margin-top: 10px;margin-left: 5px;">
                可用的脚本</p>
            <button
                style="width: 100px;height: 35px;margin-top: 5px;margin-left: 20px;font-family: KaiTi;font-size: 18px;border-radius: 5px;background-color: #0f6bc2;color: #fff;">上传</button>
            <br><br>

            <div id="scroll" :v-model="script">
                <ul>
                    <li v-for="item in script" :key="item" @click="scriptClick">{{ item }}</li>
                </ul>
            </div>
        </div>


    </div>
</template>

<style scoped>
#out {
    /* position: absolute; */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-image: url('../assets/bcg1.png');
    background-size: cover;
    background-position: center;

    #el-aside__logo {
        position: absolute;
        margin-left: 50px;
        width: 15%;
        height: 30%;
        top: -2%;
    }

    #stat {
        width: 320px;
        height: 70%;
        margin-top: 180px;
        margin-left: 20px;
        background: none repeat scroll 0 0 #EDEDED;
        border-color: -moz-use-text-color #FFFFFF #FFFFFF -moz-use-text-color;
        border-image: none;
        border-radius: 6px 6px 6px 6px;
        border-style: none solid solid none;
        border-width: medium 1px 1px medium;
        box-shadow: 1px 1px 1px rgb(255, 255, 255);
        color: black;
        font-family: KaiTi;
        font-size: 18px;
        line-height: 18px;
        padding: 10px 10px;
        transition: background-color 0.2s ease 0s;
    }

    /* textarea:focus {
        background: none repeat scroll 0 0 #FFFFFF;
        outline-width: 0;
    } */

    #operation {
        padding-left: 20px;
        width: 580px;
        height: 690px;
        padding: 30px;
        /* border: 1px solid #fff; */
        border-radius: 10px;
        position: absolute;
        top: -3%;
        left: 44%;
        transform: translateX(-45%);
        font-size: 20px;
    }

    .button {
        width: 112px;
        height: 37px;
        line-height: 37px;
        text-align: center;
        background-color: #0f6bc2;
        color: #fff;
        font-size: 18px;
        font-family: KaiTi;
        border-radius: 10px;
        float: left;
        margin-left: 25px;
        margin-top: 10px;
        /* position: absolute; */
    }

    #frida {
        width: 550px;
        height: 600px;

        border-radius: 10px;

        #frida_title {
            width: 98%;
            height: 30px;
            color: #fff;
            font-size: 22px;
            font-family: KaiTi;
            padding-left: 10px;
            /* margin-left: 10px; */
            margin-top: 5px;
        }

        .el-checkbox__label {
            font-size: 18px;
            /* 调整字体大小 */
        }

        .el-checkbox__inner {
            width: 30px;
            /* 调整复选框宽度 */
            height: 30px;
            /* 调整复选框高度 */
        }

        #default {
            width: 96%;
            height: 112px;
            padding: 10px;
            margin-top: 5px;
            margin-left: 15px;
            border-top: 1px solid #ffffff4b;
            border-bottom: 1px solid #ffffff4b;

            #checkbox1 {
                padding-left: 15px;
                font-weight: 600;
            }
        }

        #auxiliary {
            width: 92%;
            height: 410px;
            padding: 7.5px;
            margin-left: 15px;
            border-top: 1px solid #ffffff4b;
            border-bottom: 1px solid #ffffff4b;

            #checkbox2 {
                padding-left: 7.5px;
                margin-bottom: 7.5px;
                font-weight: 600;
            }

            #button1 {
                width: 135px;
                height: 26.5px;
                line-height: 22px;
                text-align: center;
                background-color: #0f6bc2;
                color: #fff;
                font-size: 14px;
                font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
                border-radius: 8px;
                float: left;
                margin-left: 15px;
                margin-top: 8px;
            }

            #button2 {
                width: 90px;
                height: 26.5px;
                line-height: 22px;
                text-align: center;
                background-color: #0f6bc2;
                color: #fff;
                font-size: 16px;
                font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
                border-radius: 10px;
                float: left;
                margin-left: 15px;
                margin-top: 8px;
            }

            #button3 {
                width: 100px;
                height: 26.5px;
                line-height: 22px;
                text-align: center;
                background-color: #0f6bc2;
                color: #fff;
                font-size: 18px;
                font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
                border-radius: 10px;
                float: left;
                margin-left: 15px;
                margin-top: 8px;
            }

            #button4 {
                width: 80px;
                height: 30px;
                line-height: 25px;
                text-align: center;
                background-color: #0f6bc2;
                color: #fff;
                font-size: 16px;
                font-family: KaiTi;
                border-radius: 10px;
                float: left;
                margin-left: 20px;
                margin-top: 15px;
            }
        }

    }

    #codeArea {
        width: 416px;
        height: 680px;
        margin-top: 0px;
        margin-left: 20px;
        position: absolute;
        top: 2%;
        left: 68%;

        /* transform: translateX(-50%); */
        #codeEditor {
            font-size: 15px;
        }

        #scroll {
            width: 100%;
            height: 150px;
            overflow: auto;
            margin-top: -20px;
            /* margin-top: 10px; */
            /* margin-left: 10px; */
            font-size: 18px;
            color: grey;
            font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;

            ul {
                list-style-type: none;
                padding: 0;
                margin: 0;
            }

            li {
                padding: 10px;
                /* margin: 10px; */
                height: 8px;
                line-height: 8px;
                background-color: #EDEDED;
                border: 1px solid rgba(228, 227, 227, 0.586);
                /* border-radius: 10px; */
            }

            .active {
                background-color: #0f6bc2;
            }
        }
    }
}
</style>