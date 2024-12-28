<script setup>
const emit = defineEmits(['fatherClick'])

function mouseenter($event) {
    $event.target.classList.remove('change_mod_out')
    $event.target.classList.add('change_mod')
    // 将div的内容改为静态分析
    $event.target.innerHTML = '黑白名单库配置';
}

function mouseleave($event) {
    // apis.value = []
    $event.target.classList.remove('change_mod')
    $event.target.classList.add('change_mod_out')


}

function toDirection() {
    emit('fatherClick')
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
    width: 20%;
    height: 8%;
    line-height: 60px;

    font-family: KaiTi;
    font-size: 32px;
    border: #BBBBBB 1px solid;
    border-radius: 60px 0px 0px 60px;
    position: fixed;
    background-color: #001529;
    right: 0px;
    color: #BBBBBB;
    text-align: center;
    overflow-x: hidden;
    /* 禁止换行 */
    white-space: nowrap;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
}

.change_mod_out {
    width: 6%;
    height: 8%;
    box-sizing: border-box;
    border: #BBBBBB 1px solid;
    border-radius: 60px 0px 0px 60px;
    position: fixed;
    background-color: #001529;
    right: 0px;
    padding-left: 32px;
    font-family: KaiTi;
    font-size: 28px;
    color: #BBBBBB;
    text-align: center;
    line-height: 60px;
    overflow-x: hidden;
    white-space: nowrap;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
}
</style>