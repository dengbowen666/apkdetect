<script setup>
import { Management, ArrowDown, EditPen, Promotion, Share, ChatDotRound } from '@element-plus/icons-vue'
import { ref, onMounted, onBeforeMount } from 'vue'
import { useApkStore } from '@/stores'
import basicInfo from '@/components/static/basicInfo.vue'
import codeCheck from '@/components/static/codeCheck.vue'
import asrpComponent from '@/components/static/asrpComponent.vue'
import certificateComponent from '@/components/static/certificateComponent.vue'
import permissionComponent from '@/components/static/permissionComponent.vue'
import intentComponent from '@/components/static/intentComponent.vue'
// import domainComponent from '@/components/static/domainComponent.vue'
import urlComponent from '@/components/static/urlComponent.vue'
import featuresComponent from '@/components/static/featuresComponent.vue'
import directComponent from '@/components/directComponent.vue'
import directComponentHelper from '@/components/directComponent_helper.vue'

// import { apkDetail } from '@/api/static/static'

const apkStore = useApkStore()

const getInfo = () => {
    const res = apkStore.apkInfo
    console.log(res)
    fileInfos.value.文件名 = res.apk_name
    fileInfos.value.文件大小 = res.apk_size
    fileInfos.value.MD5 = res.MD5
    fileInfos.value.SHA1 = res.sha1.replace(/:/g, "");
    fileInfos.value.SHA256 = res.sha256.replace(/:/g, "");

    appInfos.value[0].value = res.app_name
    appInfos.value[1].value = res.package_name
    // appInfos.value[2].value = res.main_activity
    appInfos.value[3].value = res.target_sdk
    appInfos.value[4].value = res.min_sdk
    appInfos.value[5].value = res.max_sdk
    appInfos.value[6].value = res.andro_name
    appInfos.value[7].value = res.andro_code

    activities.value = res.activities.split(';')
    services.value = res.services ? res.services.split(';') : []
    receivers.value = res.receivers ? res.receivers.split(';') : []
    providers.value = res.providers ? res.providers.split(';') : []

    cardInfo.value[0].num = activities.value.length
    cardInfo.value[1].num = services.value.length
    cardInfo.value[2].num = receivers.value.length
    cardInfo.value[3].num = providers.value.length

    // // 缺少证书信息
    // console.log(res.permissions.split(';'))
    var temp_permissions = res.permissions.split(';')
    console.log(temp_permissions)
    for (let i = 0; i < temp_permissions.length; i++) {
        permissions.value.push({
            permission: temp_permissions[i],
            status: '',
            description: ''
        })
    }
    // permissions.value = res.permissions
    // max(temp_intent_action.length, temp_intent_category.length)
    var temp_intent_action = res.intent_action.split(';')
    var temp_intent_category = res.intent_category.split(';')
    for (let i = 0; i < Math.max(temp_intent_action.length, temp_intent_category.length); i++) {
        intents.value.push({
            action: temp_intent_action[i],
            category: temp_intent_category[i]
        })
    }

    // feature.value = res.feature
    features.value = res.feature ? res.feature.split(';') : []

    console.log(res.banUrl.indexOf(res.allUrl[1]) !== -1)

    for (let i = 0; i < res.allUrl.length; i++) {
        urls.value.push({
            url: res.allUrl[i],
            isBanned: res.banUrl.indexOf(res.allUrl[i]) !== -1 ? 'yes' : 'no'
        })
    }

    if (res.appBanned === 0) {
        appInfos.value[8].value = ''
    } else if (res.appBanned === 1) {
        appInfos.value[8].value = '（在黑名单中）'
    } else if (res.appBanned === 2) {
        appInfos.value[8].value = '（在白名单中）'
    }
}

onBeforeMount(() => {
    console.log(apkStore.apkInfo)
    getInfo()
})


onMounted(() => {
    document.body.style.setProperty('--el-bg-color', 'transparent');

})

var fileInfos = ref({
    '文件名': 'ECpay.apk',
    '文件大小': '1.2MB',
    'MD5': '3c84e8089786022d6169285af3f30e81',
    'SHA1': '178d83a51b1e1a80544f8e1ff3697ada37aa7f60',
    'SHA256': '0214ee9a5b0e0910252a3744c406b6faea881293ccd07ab0947b9d892c3133e6'
})

var appInfos = ref([
    { key: '应用名', value: 'ECpay' },
    { key: '包名', value: 'com.ecpay' },
    { key: '主要活动', value: 'com.ecpay.MainActivity' },
    { key: '目标SDK', value: '30' },
    { key: '最小SDK', value: '21' },
    { key: '最大SDK', value: '30' },
    { key: '安卓版本', value: '10.0' },
    { key: '安卓版本码', value: '2021020409' },
    { key: 'isBanned', value: '' }
])

var cardInfo = ref([
    { num: '164', item: 'ACTIVITIES' },
    { num: '0', item: 'SERVICES' },
    { num: '0', item: 'RECEIVERS' },
    { num: '0', item: 'PROVIDERS' },
])

function navigate(item) {
    document.getElementById(item.toLowerCase()).scrollIntoView({ behavior: "smooth" })
}

function navigateTo(name) {
    document.getElementById(name).scrollIntoView({ behavior: "smooth" })
}

var activities = ref([
    "com.ecpay.MainActivity",
    "com.ecpay.LoginActivity",
    "com.ecpay.RegisterActivity",

])

var services = ref([])

var receivers = ref([])

var providers = ref([])

var certifications = ref([
    { name: "所有者", value: "CN=panda, OU=APE, O=apache, L=qingcheng, ST=qingyuan, C=CN" },
    { name: "发布者", value: "CN=panda, OU=APE, O=apache, L=qingcheng, ST=qingyuan, C=CN" },
    { name: "序列号", value: "1a2b3c4d5e6f7g8h9i0j" },
    { name: "生效时间", value: "2021-10-01" },
    { name: "失效时间", value: "2022-10-01" },
    { name: "签名算法", value: "SHA256withRSA" },
    { name: "MD5", value: "A1:B2:C3:D4:E5:F6:G7:H8:I9:J0" },
    { name: "SHA1", value: "A1:B2:C3:D4:E5:F6:G7:H8:I9:J0" },
    { name: "SHA256", value: "A1:B2:C3:D4:E5:F6:G7:H8:I9:J0" },
    { name: "版本", value: "V3" },
])

var features = ref([])

const permissions = ref([
    // {
    //     permission: 'android.permission.INTERNET',
    //     status: 'danger',
    //     description: '允许应用程序打开网络套接字'
    // },
    // {
    //     permission: 'android.permission.ACCESS_NETWORK_STATE',
    //     status: 'warning',
    //     description: '允许应用程序访问有关网络的信息'
    // },
    // {
    //     permission: 'android.permission.ACCESS_WIFI_STATE',
    //     status: 'safe',
    //     info: '危险',
    //     description: '允许应用程序访问Wi-Fi网络状态信息'
    // },
    // {
    //     permission: 'android.permission.READ_PHONE_STATE',
    //     status: 'danger',
    //     info: '危险',
    //     description: '允许应用程序访问设备的电话功能'
    // },
])

// const apis = ref([
//     {
//         api: 'android.app.Activity',
//         file: 'com.ecpay.MainActivity'
//     },
//     {
//         api: 'android.app.Activity',
//         file: 'com.ecpay.LoginActivity'
//     },
//     {
//         api: 'android.app.Activity',
//         file: 'com.ecpay.RegisterActivity'
//     },
//     {
//         api: 'android.app.Activity',
//         file: 'com.ecpay.ForgetActivity'
//     },
//     {
//         api: 'android.app.Activity',
//         file: 'com.ecpay.PayActivity'
//     },
//     {
//         api: 'android.app.Activity',
//         file: 'com.ecpay.OrderActivity'
//     },
//     {
//         api: 'android.app.Activity',
//         file: 'com.ecpay.ShopActivity'
//     },
//     {
//         api: 'android.app.Activity',
//         file: 'com.ecpay.CartActivity'
//     },
// ])

// const domains = ref([
//     {
//         'domain': 'www.baidu.com',
//         'status': 'safe',
//         'IP': '192.168.0.1',
//         'country': 'China',
//         'province': 'Beijing',
//         'city': 'Beijing',
//         'latitude': '39.90469',
//         'longitude': '116.40717'
//     },
//     {
//         'domain': 'www.baidu.com',
//         'status': 'warning',
//         'IP': '192.168.0.1',
//         'country': 'China',
//         'province': 'Beijing',
//         'city': 'Beijing',
//         'latitude': '39.90469',
//         'longitude': '116.40717'
//     },
//     {
//         'domain': 'www.baidu.com',
//         'status': 'danger',
//         'IP': '192.168.0.1',
//         'country': 'China',
//         'province': 'Beijing',
//         'city': 'Beijing',
//         'latitude': '39.90469',
//         'longitude': '116.40717'
//     },
//     {
//         'domain': 'www.baidu.com',
//         'status': 'safe',
//         'IP': '192.168.0.1',
//         'country': 'China',
//         'province': 'Beijing',
//         'city': 'Beijing',
//         'latitude': '39.90469',
//         'longitude': '116.40717'
//     }
// ])

const intents = ref([
    {
        'action': 'android.intent.action.MAIN',
        'category': 'android.intent.category.LAUNCHER',
    },
    {
        'action': 'android.intent.action.MAIN',
        'category': 'android.intent.category.LAUNCHER',
    },
    {
        'action': 'android.intent.action.MAIN',
        'category': 'android.intent.category.LAUNCHER',
    },
    {
        'action': 'android.intent.action.MAIN',
        'category': 'android.intent.category.LAUNCHER',
    }
])

const urls = ref([
    // {
    //     'url': 'www.baidu.com',
    //     'file': 'com.ecpay.MainActivity'
    // },
    // {
    //     'url': 'www.baidu.com',
    //     'file': 'com.ecpay.LoginActivity'
    // },
    // {
    //     'url': 'www.baidu.com',
    //     'file': 'com.ecpay.RegisterActivity'
    // },
    // {
    //     'url': 'www.baidu.com',
    //     'file': 'com.ecpay.ForgetActivity'
    // }

])

</script>

<template>
    <div id="out">
        <!-- <img src="../assets/bcg2.svg" alt="" id="img1"> -->
        <el-container id="container">
            <el-aside width="16%" id="side">
                <img src="../assets/gif1.gif" alt="" id="el-aside__logo">
                <el-menu active-text-color="rgb(255,255,255)" background-color="#001529" :default-active="$route.path"
                    text-color="#BBBBBB" router>
                    <a @click="navigateTo('basicInfo')">
                        <el-menu-item class="menu_item">
                            <el-icon :size="25">
                                <Management />
                            </el-icon>
                            <span>基本信息</span>
                        </el-menu-item>
                    </a>
                    <a @click="navigateTo('activities')">
                        <el-menu-item class="menu_item">
                            <el-icon :size="25">
                                <Management />
                            </el-icon>
                            <span>ACTIVITIES信息</span>
                        </el-menu-item>
                    </a>
                    <!-- <el-menu-item index="#activities" class="menu_item">
                        <el-icon :size="25">
                            <Management />
                        </el-icon>
                        <span>ACTIVITIES信息</span>
                    </el-menu-item> -->
                    <a @click="navigateTo('services')">
                        <el-menu-item class="menu_item">
                            <el-icon :size="25">
                                <Management />
                            </el-icon>
                            <span>SERVICES信息</span>
                        </el-menu-item>
                    </a>
                    <a @click="navigateTo('receivers')">
                        <el-menu-item class="menu_item">
                            <el-icon :size="25">
                                <Management />
                            </el-icon>
                            <span>RECEIVERS信息</span>
                        </el-menu-item>
                    </a>
                    <a @click="navigateTo('providers')">
                        <el-menu-item class="menu_item">
                            <el-icon :size="25">
                                <Management />
                            </el-icon>
                            <span>PROVIDERS信息</span>
                        </el-menu-item>
                    </a>
                    <a @click="navigateTo('certificate')">
                        <el-menu-item class="menu_item">
                            <el-icon :size="25">
                                <Management />
                            </el-icon>
                            <span>签名证书</span>
                        </el-menu-item>
                    </a>
                    <a @click="navigateTo('permission')">
                        <el-menu-item class="menu_item">
                            <el-icon :size="25">
                                <Management />
                            </el-icon>
                            <span>应用许可</span>
                        </el-menu-item>
                    </a>
                    <a @click="navigateTo('intent')">
                        <el-menu-item class="menu_item">
                            <el-icon :size="25">
                                <Management />
                            </el-icon>
                            <span>intents信息</span>
                        </el-menu-item>
                    </a>
                    <a @click="navigateTo('url')">
                        <el-menu-item class="menu_item">
                            <el-icon :size="25">
                                <Management />
                            </el-icon>
                            <span>urls信息</span>
                        </el-menu-item>
                    </a>

                    <a @click="navigateTo('features')">
                        <el-menu-item class="menu_item">
                            <el-icon :size="25">
                                <Management />
                            </el-icon>
                            <span>feature信息</span>
                        </el-menu-item>
                    </a>
                </el-menu>
            </el-aside>
            <el-main id="main">
                <directComponent style="top: 30%;" id="static">静态</directComponent>
                <directComponent style="top: 50%;" id="dynamic">动态</directComponent>
                <directComponent style="top: 70%;" id="system">系统</directComponent>
                <directComponentHelper style="top: 10%" id="helper">助手</directComponentHelper>

                <basicInfo :file-info="fileInfos" :app-info="appInfos"></basicInfo>
                <br>
                <div id="code_check">
                    <codeCheck :is-view='true' :content-info="'AndroidManifest'">AndroidManifest.xml</codeCheck>
                    <codeCheck :is-view='true' :content-info="'Source'">View Source</codeCheck>
                    <codeCheck :is-view='true' :content-info="'txt'" style="margin-right: 0;">View txt</codeCheck>
                    <!-- <codeCheck :is-view='false' :content-info="'Source'">Download Source</codeCheck> -->
                    <!-- <codeCheck :is-view="false" :content-info="'Smali'">Download Smali</codeCheck> -->
                    <!-- <codeCheck :is-view="false" style="margin-right: 0;" :content-info="'APK'">Download APK</codeCheck> -->
                </div>

                <div id="card_area">
                    <div class="card" v-for="Info in cardInfo" :key="Info">
                        <p class="num">{{ Info.num }}</p>
                        <div class="item">{{ Info.item }}</div>
                        <el-button type="primary" :icon="ArrowDown" size="large" circle @click="navigate(Info.item)" />
                    </div>
                </div>

                <asrpComponent :datas="activities" id="activities"><el-icon :size="22">
                        <EditPen />
                    </el-icon>&nbsp; ACTIVITIES
                </asrpComponent>

                <asrpComponent :datas="services" id="services"><el-icon :size="22">
                        <Share />
                    </el-icon>&nbsp; SERVICES
                </asrpComponent>

                <asrpComponent :datas="receivers" id="receivers"><el-icon :size="22">
                        <Promotion />
                    </el-icon>&nbsp; RECEIVERS
                </asrpComponent>

                <asrpComponent :datas="providers" id="providers"><el-icon :size="22">
                        <ChatDotRound />
                    </el-icon>&nbsp; PROVIDERS
                </asrpComponent>

                <certificateComponent :certifications="certifications" id="certificate"></certificateComponent>

                <permissionComponent :permissions="permissions" id="permission"></permissionComponent>

                <intentComponent :intents="intents" id="intent"></intentComponent>

                <!-- <domainComponent :domains="domains" id="domain"></domainComponent> -->

                <urlComponent :urls="urls" id="url"></urlComponent>

                <featuresComponent :features="features" id="features">
                    <el-icon :size="22">
                        <ChatDotRound />
                    </el-icon>&nbsp; feature信息
                </featuresComponent>

            </el-main>
        </el-container>
    </div>
</template>

<style scoped>
/* Your style code here */
#out {
    /* position: absolute; */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
}

#img1 {
    left: 15%;
    position: absolute;
    width: 70%;
    height: 100%;
    opacity: 0.3;
    z-index: 2;
}

#container {
    #side {
        position: fixed;
        background-color: #001529;
        border-right: 0px #585757;
        height: 100%;

        #el-aside__logo {
            margin-left: 10%;
            width: 80%;
            height: 24%;
        }

        a {
            text-decoration: none;
        }

        .menu_item {
            height: 4%;
            line-height: 54px;
            border-bottom: 1px solid #585757;
            border-top: 1px solid #585757;
            border-right: #585757;


            span {
                margin-left: 10px;
                font-size: 20px;
                font-family: KaiTi;
            }
        }
    }

    #main {
        background-image: url('../assets/bcg1.png');

        #code_check {
            width: 80%;
            height: 90px;
            margin-left: 250px;
            margin-top: 7.5px;
            /* border-radius: 40px 40px 40px 40px; */
            /* border: #BBBBBB 1px solid; */
            /* box-shadow: 5px 5px 6px #001529; */
        }

        #card_area {
            width: 82%;
            height: 250px;
            margin-left: 17%;
            margin-top: 15px;

            .card {
                width: 265px;
                height: 220px;
                border: 1px solid #BBBBBB;
                margin-left: 20px;
                /* margin-top: 20px; */
                border-radius: 30px 30px 30px 30px;
                float: left;
                color: #BBBBBB;

                .num {
                    font-size: 30px;
                    font-family: monospace;
                    /* font-weight: 600; */
                    margin-left: 22.5px;
                }

                .item {
                    font-size: 30px;
                    font-family: monospace;
                    font-weight: 600;
                    margin-left: 22.5px;
                }

                .el-button {
                    margin-left: 120px;
                    margin-top: 30px;
                }
            }
        }
    }
}
</style>