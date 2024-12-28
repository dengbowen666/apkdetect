<script setup>
import { watch, nextTick, onMounted } from 'vue';

const d = defineProps(['datas', 'id'])

onMounted(() => {
    console.log(d.datas)
    var asrp = document.getElementById(d.id)
    asrp.style['height'] = 65 + d.datas.length * 40 + 'px'
})

watch(() => d.datas, (newVal) => {
    console.log(newVal)
    nextTick(() => {
        var asrp = document.getElementById(d.id)
        // console.log(asrp)
        asrp.style['height'] = 65 + newVal.length * 40 + 'px'
    })
})
</script>

<template>
    <div class="asrp" :id="d.id">
        <h1 class="title">
            <slot></slot>
        </h1>
        <p class="asrp_item" v-for="data in d.datas" :key="data">{{ data }}</p>
    </div>
</template>

<style scoped>
.title {
    font-size: 22px;
    font-family: KaiTi;
    color: #BBBBBB;
    margin-left: 20px;
    padding: 0px;
    margin-top: 3px;
    margin-bottom: 0px;
}

.asrp {
    width: 80%;
    height: 56px;
    line-height: 56px;
    margin-left: 18%;
    margin-top: 15px;
    border: 1px solid #BBBBBB;
    border-radius: 30px 30px 30px 30px;
    box-shadow: 10px 10px 10px #001529;
    /* background-color: #001529; */
}

.asrp_item {
    height: 40px;
    line-height: 40px;
    font-size: 19px;
    font-family: KaiTi;
    color: #BBBBBB;
    margin-left: 30px;
    padding: 0px;
    margin-top: 0px;
    margin-bottom: 0px;
}
</style>