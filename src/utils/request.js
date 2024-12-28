import axios from 'axios'
// import { ElMessage } from 'element-plus'
// import { useRouter } from 'vue-router'
// const router = useRouter()
const baseURL = 'http://47.108.183.218:5000'

const instance = axios.create({
  baseURL,
  timeout: 50000
})

// instance.interceptors.response.use(
//     function (response) {
//         // 2xx 范围内的状态码都会触发该函数。
//         // 对响应数据做点什么
//         if (response.data.code === 0) {
//         return response
//         }
//         ElMessage.error(response.data.message || '服务异常')
//         return Promise.reject(response.data)
//     },
//     function (error) {
//         // 超出 2xx 范围的状态码都会触发该函数。
//         // 对响应错误做点什么
//         if (error.response?.status === 401) {
//         router.push('/login')
//         }

//         ElMessage.error(error.response.message || '服务异常')
//         return Promise.reject(error)
//     }
// )

export default instance
export { baseURL }
