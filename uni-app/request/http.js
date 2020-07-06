import md5 from 'js-md5'
import store from '@/store'
import * as utils from '@/utils'
import {
  baseUrl
} from '@/config'

const VERSION_CODE = '111'
const APP_TYPE_QQ = 'applet-qq'

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
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
  uni.showModal({
    content: msg,
    showCancel: false,
    confirmColor: '#ff9d69',
    confirmText:'确认'
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

// requset showErr:1显示alert提示框 2显示toast提示框 3不显示提示框
export const requset = (params, b) => {
  b = Object.assign({}, { load: 1, showErr: 1 }, b);
  if (b.load == 2) { //1隐藏 2显示
    loading();
  }
  if (params._ossUrlSize) {
    const size = utils.getrpxTopx(params._ossUrlSize);
    params.ossUrlStyle = `image/resize,w_${size},h_${size},m_fill/auto-orient,1/quality,q_100`;
    delete params._ossUrlSize
  }
  let appType = APP_TYPE_QQ;
  let timestamp = +new Date();
  let sign;
  if (b.method === 'get' || b.method === 'delete') {
    //get或delete时只对url签名
    sign = md5(encodeURIComponent(b.url)).toString()
  } else {
    sign = signUrl(timestamp, appType, params)
  }
  //需要添加头部
  let header = Object.assign({}, (params.header || {}), {
    'Content-Type': 'application/json;charset=UTF-8',
    'apptype': appType,
    'versioncode': VERSION_CODE,
    'sign': sign,
    'timestamp': timestamp,
    'token': store.state.login.token
  })
  return new Promise((resolve, reject) => {
    let type = b.method ? b.method : 'post'
    uni.request({
      method: type,
      url: baseUrl() + b.url,
      data: utils.clearAll(params),
      header: header,
      success(res) {
        if (res.data.status == 1000) {
          return resolve(res.data.data)
        } else if (res.data.status == 219 || res.data.status == 218) {
          reject();
          // 登陆失效
          uni.reLaunch({
            url: '/pages/authorize/index?invalid=1'
          });
        } else if (res.data.status == 220) {
          // 刷新code
          if (b.url === '/live/qq/applet/lrefresh') return reject();
          qq.login({
            success(res) {
              if (res.code) {
                requset({ code: res.code }, { method: 'post', url: '/live/qq/applet/lrefresh', load: 2 }).then(data => {
                  requset(params, b).then(resolve).catch(reject);
                }).catch(reject)
              } else {
                // 登陆失效
                uni.reLaunch({
                  url: '/pages/authorize/index?invalid=1'
                });
                reject();
              }
            }
          })
        } else if (res.data.status == 214) {
          // 重复操作
          reject()
        } else {
          if (b.showErr == 2) {
            showToast(res.data.message)
          } else if (b.showErr == 1) {
            console.log(res)
            tip(res.data.message)
          }
          return reject(res.data);
        }
      },
      fail(err) {
        reject()
      },
      complete() {
        if (b.load == 2) { //1隐藏 2显示 3隐藏强制提示
          hide()
        }
      }
    })
  })
}
