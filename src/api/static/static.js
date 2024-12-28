import request from '@/utils/request'

export const configBlackUrl = (url) => request.post('/info/configBlackUrl', { "blackUrl": url })

export const configBlackApp = (url) => request.post('/info/configBlackApp', { "blackApp": url })

export const configWhiteApp = (url) => request.post('/info/configWhiteApp', { "whiteApp": url })

export const uploadApk = (apk_file) => request.post('/info/addApk', apk_file, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

export const addUrlApk = (url) => request.post('/info/addUrlApk', { "url": url })

export const detail = () => request.post('/info/detail')

export const uploadDownloadPage = (url) => request.post('/api/uploadDownloadPage',url)

export const apkDetail = (apk) => request.post('/info/addApk', apk)

export const getFinal = (apk) => request.post('/info/getFinal',{"name": apk} )

export const getxml = (apk) => request.post('/info/getxml', { name: apk })

export const gettxt = (apk) => request.post('/info/gettxt', { name: apk })

export const getzip = (apk) => request.post('/info/getzip', { name: apk })

export const getimg = (apk) => request.post('/info/getimg', { name: apk })

export const question = (question) => request.post('/info/question', { "question": question })
