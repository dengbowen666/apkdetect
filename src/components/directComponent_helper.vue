<script setup>
// const emit = defineEmits(['fatherClick'])
import { useRouter } from 'vue-router'
const router = useRouter()

function mouseenter($event) {
    $event.target.classList.remove('change_mod_out')
    $event.target.classList.add('change_mod')
    // 将div的内容改为静态分析
    $event.target.innerHTML = '查询小助手';
}

function mouseleave($event) {
    // apis.value = []
    $event.target.classList.remove('change_mod')
    $event.target.classList.add('change_mod_out')
    $event.target.innerHTML = '助手';
}

function toDirection() {
    router.push({ name: 'helper' })
}   
</script>

<template>
    <div class="change_mod_out" @click="toDirection" @mouseenter="mouseenter($event)" @mouseleave="mouseleave($event)"
        style="top: 10%;z-index: 9999;">
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