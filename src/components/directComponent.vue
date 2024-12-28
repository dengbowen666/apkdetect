<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const data = defineProps(['id'])

function mouseenter($event) {
    // apis.value = [
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
    // ]
    // console.log(activities)
    $event.target.classList.remove('change_mod_out')
    $event.target.classList.add('change_mod')
    // 将div的内容改为静态分析
    if ($event.target.innerHTML.trim() == '静态') {
        $event.target.innerHTML = '静态分析';
    }
    else if ($event.target.innerHTML.trim() == '动态')
        $event.target.innerHTML = '动态分析';
    else if ($event.target.innerHTML.trim() == '系统')
        $event.target.innerHTML = '系统信息';
}

function mouseleave($event) {
    // apis.value = []
    $event.target.classList.remove('change_mod')
    $event.target.classList.add('change_mod_out')
    if ($event.target.innerHTML.trim() == '静态分析')
        $event.target.innerHTML = '静态'
    else if ($event.target.innerHTML.trim() == '动态分析')
        $event.target.innerHTML = '动态'
    else if ($event.target.innerHTML.trim() == '系统信息')
        $event.target.innerHTML = '系统'
}

function toDirection() {
    // 跳转到system页面
    if (data.id == 'system')
        router.push('/system')
    // 跳转到static页面
    else if (data.id == 'static')
        router.push('/static')
    // 跳转到dynamic页面
    else if (data.id == 'dynamic')
        router.push('/dynamic')
    else
        console.log('error')
}   
</script>

<template>
    <div class="change_mod_out" @click="toDirection" @mouseenter="mouseenter($event)" @mouseleave="mouseleave($event)"
        style="top: 30%;z-index: 9999;">
        <slot></slot>
    </div>
</template>

<style scoped>
.change_mod {
    width: 16%;
    height: 7%;
    line-height: 50px;
    font-family: KaiTi;
    font-size: 25px;
    border: #BBBBBB 1px solid;
    border-radius: 60px 0px 0px 60px;
    position: fixed;
    background-color: #001529;
    right: 0px;
    color: #BBBBBB;
    text-align: center;
}

.change_mod_out {
    width: 5%;
    height: 7%;
    border: #BBBBBB 1px solid;
    border-radius: 60px 0px 0px 60px;
    position: fixed;
    background-color: #001529;
    right: 0px;
    font-family: KaiTi;
    font-size: 25px;
    color: #BBBBBB;
    text-align: center;
    line-height: 50px;
}
</style>