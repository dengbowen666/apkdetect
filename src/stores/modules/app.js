import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useApkStore = defineStore('apk', () => {
  const apkInfo = ref()
  const checkwhat = ref()
  const xml = ref()
  const txt = ref()
  const apkFileName = computed(() => apkInfo.value.apk_name)
  const hash = computed(() => apkInfo.value.MD5)
  // const detectTime = computed(() => apkInfo.value.detectTime)
  const setApkInfo = (apk) => {
    apkInfo.value = apk
  }

  const setxml = (xmlData) => {
    xml.value = xmlData
  }

  const settxt = (txtData) => {
    txt.value = txtData
  }

  const setCheckwhat = (checkwhatData) => {
    checkwhat.value = checkwhatData
  }

  return { apkInfo,xml,txt,checkwhat, apkFileName, hash, setApkInfo, setxml, settxt, setCheckwhat}
})

export const useAppStore = defineStore('app', () => {
  const appBasicInfo = ref({'fileName':'','hash':'','detectTime':''})
  const appFileName = computed(() => appBasicInfo.value.fileName)
  const hash = computed(() => appBasicInfo.value.hash)
  const detectTime = computed(() => appBasicInfo.value.detectTime)

  return { appBasicInfo, appFileName, hash, detectTime}
})
