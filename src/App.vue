<script setup>
import { useApkStore } from '@/stores'

const apkStore = useApkStore()

if (sessionStorage.getItem('store') !== undefined) {
  console.log(sessionStorage.getItem('store'))
  console.log(JSON.parse(sessionStorage.getItem('store')))
  apkStore.setApkInfo(JSON.parse(sessionStorage.getItem('store')))
}

// 在页面刷新时将vuex里的信息保存到sessionStorage里
// beforeunload事件在页面刷新时先触发
window.addEventListener('beforeunload', () => {
  console.log(apkStore.apkInfo)
  if (apkStore.apkInfo !== null) {
    sessionStorage.setItem('store', JSON.stringify(apkStore.apkInfo))
  }
})



</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped></style>
