<script setup>
import { UploadFilled, Upload } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import directComponentHome from '@/components/directComponent_home.vue';
import { uploadApk, detail, configBlackApp, configBlackUrl, configWhiteApp, addUrlApk } from '@/api/static/static';
import { useApkStore } from '@/stores'
import { ElMessage } from 'element-plus'
onMounted(() => {
  document.body.style.setProperty('--el-fill-color-blank', 'transparent');
});
const router = useRouter();

var fileList = ref();

const input1 = ref('');

const textarea1 = ref('');

const textarea2 = ref('');

const textarea3 = ref('');

const drawer = ref(false);

const format = ref(() => "正在检测中……");
var show = ref(false);

const dialogVisible = ref(false);

const fatherClick = () => {
  drawer.value = true;
};

watch(() => fileList.value, (newVal) => {
  console.log(newVal);
});

const changeFile = (file) => {
  fileList.value = file.raw;
};

const removeFile = () => {
  fileList.value = undefined;
};

const detect = async () => {
  // console.log(input1.value)
  // console.log(fileList.value)
  if (input1.value === '' && fileList.value === undefined) {
    alert('请输入APK下载地址或上传apk文件');
  } else if (input1.value !== '' && fileList.value === undefined) {
    // const formData = new FormData();
    // formData.append('url', input1.value.trim());
    // uploadDownloadPage(formData).then((res) => {
    // console.log(formData);
    show.value = true;
    await addUrlApk(input1.value.trim()).then((res) => {
      console.log(res);
      if (res.data === 'yes') {
        console.log('上传成功');
        show.value = false;
        dialogVisible.value = true;
        // alert('上传成功');
        // return;
      }
    }).catch((err) => {
      console.log(err);
      ElMessage.error('上传出错');
    });
    // router.push({ path: '/static', query: { url: input1.value } });
    // });
  } else if (input1.value === '' && fileList.value !== undefined) {
    const formData = new FormData();
    // console.log(fileList.value)
    formData.append('apk_file', fileList.value);
    console.log(formData);
    show.value = true;
    await uploadApk(formData).then((res) => {
      console.log(res.data);
      if (res.data === 'yes') {
        console.log('上传成功');
        show.value = false;
        dialogVisible.value = true;
        // alert('上传成功');
        // return;
      }
      // router.push({ path: '/static', query: { url: res.data.url } });
    }).catch((err) => {
      console.log(err);
      ElMessage.error('上传出错');
    });
  } else {
    ElMessage.error('只能输入APK下载地址或上传apk文件');
  }
}

const handleClose = () => {
  dialogVisible.value = false;
};

const showStatic = () => {
  dialogVisible.value = false
  console.log('跳转');
  detail().then((res) => {
    console.log(res);
    useApkStore().setApkInfo(res.data);
    console.log(useApkStore().apkInfo)
    router.push({ path: '/static' });
  });

};

const setbw = async () => {
  var url = textarea1.value.split('\n') || [];
  // var statu1, statu2, statu3;
  console.log(url);
  await configBlackUrl(url).then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log(err);
    ElMessage.error('配置出错');
  })
  var app = textarea2.value.split('\n') || [];
  await configBlackApp(app).then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log(err);
    ElMessage.error('配置出错');
  })
  var white = textarea3.value.split('\n') || [];
  await configWhiteApp(white).then((res) => {
    console.log(res);
    drawer.value = false;
  }).catch((err) => {
    console.log(err);
    ElMessage.error('配置出错');
  })
  // console.log(textarea1.value.split('\n'));
  // console.log(textarea2.value.split('\n'));
  // console.log(textarea3.value.split('\n'));
  // drawer.value = false;
};

</script>

<template>
  <div id="out">
    <!-- <img src="../assets/bcg2.svg" alt="" id="img1"> -->
    <img src="../assets/gif1.gif" alt="" id="img2">
    <!-- <img src="../assets/gif3.gif" alt="" id="img3"> -->
    <!-- <img src="../assets/gif2.gif" alt="" id="img4"> -->
    <!-- <img src="../assets/gif4.gif" alt="" id="img5"> -->
    <directComponentHome style="top: 45%;" id="bw" @fatherClick="fatherClick">黑白名单库配置</directComponentHome>

    <el-drawer v-model="drawer" direction="ltr" title="I am the title" :with-header="false">
      <el-button style="background-color: #409EFF;font-family: KaiTi;color: white;" @click="setbw()">确认配置</el-button>
      <p style="text-align: center;font-family: KaiTi;font-size: 25px;">URL黑名单库配置</p>
      <el-input v-model="textarea1" style="width: 400px;margin-left: 0px;" :autosize="{ minRows: 15, maxRows: 50 }"
        type="textarea" placeholder="请设置URL黑名单" />
      <p style="text-align: center;font-family: KaiTi;font-size: 25px;">APP黑名单库配置</p>
      <el-input v-model="textarea2" style="width: 400px;margin-left: 0px;" :autosize="{ minRows: 15, maxRows: 50 }"
        type="textarea" placeholder="请设置APP黑名单" />
      <p style="text-align: center;font-family: KaiTi;font-size: 25px;">APP白名单库配置</p>
      <el-input v-model="textarea3" style="width: 400px;margin-left: 0px;" :autosize="{ minRows: 15, maxRows: 50 }"
        type="textarea" placeholder="请设置APP白名单" />
    </el-drawer>

    <el-upload ref="upload" class="upload-demo" drag :auto-upload="false" :on-change="changeFile" :on-remove="removeFile">
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text" style="color: black; font-size: 15px;">
        点击这里上传apk文件
      </div>
    </el-upload>
    <!-- <div id="input"> -->
    <!-- <el-input style="max-width: 600px" placeholder="请输入APK下载地址">
        <template #prepend>Http://</template>
</el-input> -->
    <input id="input" v-model="input1" style="max-width: 600px; color: black;" placeholder="请输入APK下载地址" type="text">
    <!-- </div> -->
    <el-button type="primary" id="button" @click="detect">
      上传&nbsp;&nbsp;<el-icon :size="20" class="el-icon--right">
        <Upload />
      </el-icon>
    </el-button>

    <el-progress v-if="show" id="progress" :percentage="100" :format="format" :indeterminate="true" />

    <el-dialog v-model="dialogVisible" title="提示" width="500" :before-close="handleClose">
      <span>是否要跳转至静态页面</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="showStatic()">
            跳转
          </el-button>
        </div>
      </template>
    </el-dialog>


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
}

#img1 {
  left: 15%;
  position: absolute;
  width: 70%;
  height: 100%;
  opacity: 0.3;
}

#img2 {
  top: -4%;
  position: fixed;
  width: 15%;
  height: 30%;
}

#img3 {
  top: -4%;
  right: 20px;
  position: fixed;
  width: 15%;
  height: 30%;
}

#img4 {
  bottom: 0;
  left: 20px;
  position: fixed;
  width: 15%;
  height: 30%;
}

#img5 {
  bottom: 0px;
  right: 0px;
  position: fixed;
  width: 15%;
  height: 30%;
}

.upload-demo {
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20%;
  /* height: 210px; */
  text-align: center;
  opacity: 100%;
  background-color: transparent;
}

.el-upload-dragger {
  background-color: transparent;
}

.el-icon--upload {
  color: #409EFF;
}

#input {
  position: fixed;
  top: 62%;
  left: 50%;
  width: 19%;
  transform: translate(-50%, -50%);
  height: 4%;
  border-radius: 5px 5px 5px 5px;
  background-color: transparent;
  border: 1px dashed #409EFF;
  padding-left: 10px;
}

#button {
  position: fixed;
  top: 68%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20%;
  height: 4%;
  border-radius: 5px 5px 5px 5px;
  background-color: #409EFF;
  font-size: 18px;
  color: white;
}

#progress {
  position: fixed;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20%;
  height: 4%;
  border-radius: 5px 5px 5px 5px;
  background-color: transparent;
}
</style>
