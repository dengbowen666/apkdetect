<script setup>
import { onMounted, ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
// import menuComponent from '@/components/codeView/menuComponent.vue'
import codeEditor from '@/components/codeView/codeEditor.vue'
import { useRouter } from 'vue-router'
import { useApkStore } from '@/stores'
const router = useRouter()

const route = useRoute();
const id = route.params.id;

var code = ref('')

// var txt = ref('')

onBeforeMount(() => {
    if (useApkStore().checkwhat === 'xml') {
        code.value = useApkStore().xml
    } else if (useApkStore().checkwhat === 'txt') {
        code.value = useApkStore().txt
    }
})

onMounted(() => {
    console.log(id)
})

function back() {
    router.push({ name: 'static' })
}

</script>

<template>
    <div id="out">
        <el-button id="button" @click="back()">返回静态分析首页</el-button>
        <div
            style="text-align: center;color: antiquewhite;font-size: 36px;font-family: KaiTi;height: 60px;line-height: 60px;">
            {{ id }} 文件</div>
        <!-- <div id="menu">
            <menuComponent></menuComponent>
        </div> -->
        <div id="codeEditor">
            <codeEditor :code_content=code></codeEditor>
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
    background-size: cover;
    background-position: center;
}

#button {
    position: absolute;
    top: 20px;
    right: 20px;
    background-color: white;
    /* color: #fff; */
    font-size: 16px;
    font-family: KaiTi;
    font-weight: 600;
    /* margin-top: 20px; */
    /* margin-left: 20px; */

}

#menu {
    /* margin-left: 5%; */
    margin-top: 20px;
    height: 90%;
    width: 25%;
    float: left;
    /* background-color: #1E1F1C; */
}

#codeEditor {
    /* margin-top: 30px; */
    /* left: 50%; */
    margin-left: 50%;
    transform: translateX(-50%);
    height: 85%;
    width: 65%;
    /* float: left; */
    /* margin-left: 100px; */
    /* margin-top: 20px */
}
</style>