import md5 from 'js-md5'
import store from '@/store'
import * as utils from '@/utils'
import { baseUrl } from '@/config'
import createAxios from "./uni-axios"
import { qqRefresh, silentLogin } from '@/utils/authorize'

const VERSION_CODE = '116'
const APP_TYPE_QQ = 'applet-qq'
const AUTHORIZE_URL = '/pages/tabBar/loading/index'

/**
 * 对请求参数签名
 * @param {Number} timestamp 时间戳
 * @param {string} appType app type
 * @param {obj} params 参数对象
 */
function signUrl(timestamp, appType = 'applet-qq', params) {
  let paramsMap = Object.assign({}, params)
  paramsMap.apptype = appType
  paramsMap.timestamp = timestamp
  paramsMap.versioncode = VERSION_CODE
  let keys = Object.keys(paramsMap)
  let content = ''
  keys.sort().filter((v) => {
    return v
  }).forEach(function (key) {
    //数组不参与签名
    let v = paramsMap[key]
    if (typeof (v) == 'undefined' || v == null) return
    if (v instanceof Array) return
    let value = '' + v
    value = value.replace(/\*/g, '')
    value = value.replace(/[ ]/g, '')
    // value = value.replace(/[\f\r\t\v]+/g, '')
    // value = value.replace(/\s\n/g, '')
    if (value) {
      value = encodeURIComponent(value)
      value = replaceEscapeChar(value)
      content += `${key}=${value}&`
    }
  })
  if (content.length > 0) {
    content = content.substring(0, content.length - 1)
  }
  // console.error('参与签名字符串:==>' + content)
  let sign = md5(content)
  return sign.toString()
}

/**
 * 替换所有encodeURIComponent未编码的字符
 */
function replaceEscapeChar(text) {
  if (!text) {
    return text
  }
  text = text.replace(/\(/g, escape('('))
  text = text.replace(/\)/g, escape(')'))
  text = text.replace(/\~/g, escape('~'))
  text = text.replace(/\./g, escape('.'))
  text = text.replace(/\*/g, escape('*'))
  text = text.replace(/\'/g, escape('\''))
  text = text.replace(/_/g, escape('_'))
  text = text.replace(/!/g, escape('!'))
  return text
}

const showToast = (title, icon = 'none', duration = 1000) => {
  uni.showToast({
    title: title,
    icon: icon,
    mask: true,
    duration: duration
  })
}

/**
 * 提示函数
 * 禁止点击蒙层
 */
const tip = msg => {
  uni.showModal({
    content: msg,
    showCancel: false,
    confirmColor: '#ff9d69',
    confirmText: '确认'
  });
}

// loading
const loading = () => {
  uni.showLoading({
    title: '加载中',
    mask: true
  });
}

// hide
const hide = () => {
  uni.hideLoading();
}

/**
 * 是否跳转性别选择页
 */
const isGoSexOption = () => {
  return (!store.getters['login/_gender'] && !store.getters['login/_isLogin'])
}

// 创建axios实例 -------------------
const service = createAxios({
  baseUrl: baseUrl()
});

// 请求拦截器
service.interceptors.request.use(
  request => {
    let { method, subUrl, data } = request
    let appType = APP_TYPE_QQ;
    let timestamp = +new Date();
    let sign;
    if (method === 'get' || method === 'delete') {
      //get或delete时只对url签名
      sign = md5(encodeURIComponent(subUrl)).toString()
    } else {
      sign = signUrl(timestamp, appType, data)
    }
    //需要添加头部
    let header = {
      'Content-Type': 'application/json;charset=UTF-8',
      'apptype': appType,
      'versioncode': VERSION_CODE,
      'sign': sign,
      'timestamp': timestamp,
      'token': store.getters['login/_token']
    }
    request.header = header
    return request;
  },
  error => {
    return Promise.reject(error);
  });

// 响应拦截器
service.interceptors.response.use(
  async (response, request) => {
    let { method, url, data } = request
    switch (response.data.status) {
      case 1000:
        return Promise.resolve(response);
      case 218: // 无效操作
        tip(response.data.message)
        if (isGoSexOption()) {
          uni.reLaunch({
            url: '/pages/tabBar/sexOption/index',
          })
          return
        }
        await silentLogin({ method, url, data })
        return
      case 219: // 登陆失效
        tip(response.data.message)
        if (isGoSexOption()) {
          uni.reLaunch({
            url: '/pages/tabBar/sexOption/index',
          })
          return
        }
        uni.reLaunch({
          url: AUTHORIZE_URL
        });
        return;
      // case 43001: // 登陆失效
      //   tip(response.data.message)
      //   qqRefresh({ method, url, data })
      //   return
      case 220: // QQ小程序session失效
        tip(response.data.message)
        await qqRefresh({ method, url, data })
        return;
    }
    return Promise.resolve(response)
  },
  error => {
    // 断网 或者 请求超时 状态
    if (error && error.response) {
      console.log('断网了')
    }
    switch (error.statusCode) {
      case 401:
        tip('未授权，请登录')
        break
      case 403:
        tip('拒绝访问')
        break
      case 404:
        tip('请求地址错误')
        break
      case 500:
        tip('服务器内部错误')
        break
      case 502:
        tip('服务器重启中')
        break
      case 503:
        tip('服务不可用')
        break
      default:
        tip('其他未知错误')
    }
    return
  });

export const request = ({
  method = 'post',
  url = '',
  data = {},
  isLoad = true, // loading model
  showErr = 1, // 0无 1showToast 2tip
}) => {
  if (isLoad) { loading() }
  return new Promise((resolve, reject) => {
    service.request({
      method: method,
      url: url,
      data: utils.clearAll(data),
    }).then(res => {
      if (isLoad) { hide() }
      // 兼容res undefined
      if (!res) { return }
      if (res.data.status == 1000) {
        return resolve(res.data.data)
      }
      switch (showErr) {
        case 1:
          showToast(res.data.message)
          break;
        case 2:
          tip(res.data.message)
          break;
      }
      reject(res.data)
    }).catch(res => {
      if (isLoad) { hide() }
      console.log('异常', res)
      return
    })
  })
}
