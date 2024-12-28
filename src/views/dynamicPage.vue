<script setup>
import directComponent from '@/components/directComponent.vue'
import { WarnTriangleFilled } from '@element-plus/icons-vue'
import basicInfo from '@/components/static/basicInfo.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const warning = ref(false)

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
])

function startDynamic() {
  router.push({ name: 'dynamicContent', params: { id: '1' } })
}
</script>

<template>
  <div id="out">
    <img src="../assets/gif1.gif" alt="" id="el-aside__logo">
    <directComponent style="top: 30%;" id="static">静态</directComponent>
    <directComponent style="top: 50%;" id="dynamic">动态</directComponent>
    <directComponent style="top: 70%;" id="system">系统</directComponent>
    <div id="title">动 态 分 析</div>
    <div class="warning" v-if="warning">
      <el-icon style="left: 50%; transform: translateX(-50%);" color="yellow" size="50">
        <WarnTriangleFilled />
      </el-icon>
      <p>未找到安卓实例，请先安装安卓模拟器并确保安卓模拟器已经启动，再刷新页面</p>
      <p>
        如果仍然存在错误，请在<strong>settings_loc</strong>或者通过环境变量<strong>MOBSF_ANALYZER_IDENTIFIER</strong>设置<i>ANALYZER_IDENTIFIER</i>
      </p>
    </div>
    <div class="success" v-if="!warning">
      <basicInfo :file-info="fileInfos" :app-info="appInfos"></basicInfo>
      <div id="button" @click="startDynamic">开始动态分析</div>
    </div>

  </div>
</template>

<style scoped>
#out {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-image: url('../assets/bcg1.png');

  #el-aside__logo {
    position: fixed;
    width: 15%;
    height: 30%;
    top: 0;
  }

  #title {
    position: absolute;
    top: 8%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 38px;
    color: #fff;
    font-family: KaiTi;
  }

  .warning {
    width: 675px;
    padding: 22.5px;
    border: 1px solid #fff;
    border-radius: 7.5px;
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 18px;
    color: #fff;
    font-family: KaiTi;
  }

  .success {
    position: absolute;
    top: 20%;
    /* left: 50%; */
    left: -4%;

    #button {
      width: 150px;
      height: 37.5px;
      line-height: 37.5px;
      text-align: center;
      background-color: #0f6bc2;
      color: #fff;
      font-size: 18px;
      font-family: KaiTi;
      border-radius: 10px;
      position: absolute;
      margin-top: 50px;
      left: 50%;
      /* transform: translateX(-50%); */
    }
  }
}
</style>