import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken,removeToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 配置在.env.** 的配置文件里，根据不同环境使用不同的url
  timeout: 5000, // request timeout
})

// 请求拦截
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(

  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      Message({
        message: res.msg || 'error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 401) {
        // to re-login
        MessageBox.confirm('你好像还没登录，或者你的凭证已经过期，请重新登录！', '校验失败', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          location.replace("/login")
          // store.dispatch('user/resetToken').then(() => {
          //   location.reload()
          // })
        })
      }
      return Promise.reject(res.message || 'error')
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    removeToken()
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    timeout(()=>{
      window.location.reload()
    },2000)
    return Promise.reject(error)
  }
)

export default service
