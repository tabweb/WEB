// axios的完美二次封装
// https://gitee.com/chun_cheng/axios_package/blob/master/src/axiosUtil/request.js#


import axios from 'axios';
import config from '../config.js';
import { getToken, reLogin } from './auth.js';
import { errorCreate, errorLog, loading } from './tostTools';

let { HTTP_REQUEST_URL, HEADER, TOKEN_FORMAT, CACHE_TOKEN, TOKENNAME } = config

// 缓存存储格式：get和post请求数据单独分为两个对象，分别存储url+params的拼接结果作为key值，缓存值作为value
const cache = { get: {}, post: {} };

/*
* 对象key值排序方法，保证不同顺序的key值对比有效
*/
function objKeySort(obj) {
  var newkey = Object.keys(obj).sort();
  //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  var newObj = {};                 //创建一个新的对象，用于存放排好序的键值对
  for (var i = 0; i < newkey.length; i++) {           //遍历newkey数组
    newObj[newkey[i]] = obj[newkey[i]];         //向新创建的对象中按照排好的顺序依次增加键值对
  }
  return newObj;              //返回排好序的新对象
}

// 创建一个 axios 实例
const instance = axios.create({
  baseURL: HTTP_REQUEST_URL,               // 公共的接口地址
  timeout: 50000,             // 请求超时时间设置
  withCredentials: true      //跨域时使用凭证，默认带上cookies
});

// 请求拦截器，config 是发送请求的参数信息
instance.interceptors.request.use(
  config => {
    // 是否请求需要带上 token
    if (!config.noToken) config.headers[TOKENNAME] = TOKEN_FORMAT(getToken(CACHE_TOKEN));
    return config;
  },
  // 请求拦截的错误回调
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器，response为响应的结构组织，包括data，headers，status，statusText，config，request
instance.interceptors.response.use(
  response => {
    // 后台返回数据
    const data = response.data
    // 这个状态码和提示信息是和后端约定的
    const { code, msg } = data
    // 根据 code 进行判断，与后端约定某些状态该返回什么数据
    switch (code) {
      // 如果没有 code，可能后端返回的数据不是json类型，直接返回响应结构
      case undefined: return response;
      //code === 200 代表没有错误，这里的状态 200 是与后端协商的成功状态码
      case 200: return data;
      // 举例：token已过期的code报错，需要返回登录页重新登录！与后端约定20003为token过期状态！
      case 20003:
        errorCreate(`token已过期，请重新登录`);
        // 跳转登录页，清除登录信息！
        break;
      // 其他 code，抛出错误提示信息
      default: errorCreate(`[ code: ${code}] ${msg}`); return data;
    }
  },
  // 响应拦截的报错信息，协议报错
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400: error.message = '请求错误'; break
        case 401: error.message = '未授权，请登录', reLogin(); break
        case 403: error.message = '拒绝访问'; break
        case 404: error.message = `请求地址错误: ${error.response.config.url}`; break
        case 408: error.message = '请求超时'; break
        case 500: error.message = '服务器内部错误'; break
        case 501: error.message = '服务未实现'; break
        case 502: error.message = '网关错误'; break
        case 503: error.message = '服务不可用'; break
        case 504: error.message = '网关超时'; break
        case 505: error.message = 'HTTP版本不受支持'; break
        default: error.message = '其他未知错误'; break
      }
    }
    errorLog(error)
    return Promise.reject(error)
  }
)

// 封装 axios 实例
/**
 * @param {Object} config 同axios配置
 * @param {Boolean} noToken 是否请求带有token，false表示请求带token，true代表不带token请求
 * @param {Boolean} noLoading 是否取消加载提示，false代表需要请求前加载动画
 * @param {params} 剩余的其他配置
 *
 * @returns {Axios} 一个 axios 的实列
 *
 */
function request(config, { noToken, noLoading } = {}) {
  // get类型请求默认的Content-Type 类型
  const GET_CONTENT_TYPE = 'application/x-www-form-urlencoded;charset=UTF-8';
  // post请求的默认Content-Type类型
  const POST_CONTENT_TYPE = 'application/json;charset=utf-8';
  // 获取请求方法
  const method = String.prototype.toUpperCase.call(config.method) || 'GET';
  // 合并headers
  let headers = config.headers = Object.assign({}, HEADER, config.headers);
  // 是否需要请求带token
  if (!noToken) headers[TOKENNAME] = TOKEN_FORMAT(getToken(CACHE_TOKEN));
  config.noToken = noToken
  // Content-Type 忽略大小写拼写key是否在对象是已定义
  if (!checkKeyIgnoreUpCase(headers, 'content-type')) {
    if (method == 'GET' || method == 'DELETE') headers['Content-Type'] = GET_CONTENT_TYPE;
    if (method === 'POST' || method == 'PUT') headers['Content-Type'] = POST_CONTENT_TYPE;
  }
  //加载中提示
  let toast = noLoading ? false : loading();

  // post 请求的缓存处理

  // 给get请求设置缓存，config.isCache.time设置值如果大于0，代表给该请求设置了数据缓存，数值代表设置缓存时间长，单位为ms
  if (method == 'GET' && config.isCache.time > 0) {
    let cacheUrl = config.url.charAt(0) == '/' ? config.url : '/' + config.url;      // 获取需要缓存的 url 请求接口作为key值
    let cacheObj = {};   // 保存可能会出现在 url 后的参数
    // get请求参数可能存在于url中，所以单独处理一次
    if (/\?/.test(cacheUrl)) {
      let tempArr = cacheUrl.match(/\?(.*)$/)[1];
      tempArr.forEach(v => {
        let temp = v.split('=');
        cacheObj[temp[0]] = cacheObj[temp[1]];
      });
      cacheUrl = cacheUrl.match.match(/^(.*)(?=\?)/)[0];
    }
    Object.assign(cacheObj, config.params ? config.params : {});

    let cacheParams = cacheUrl + JSON.stringify(objKeySort(cacheObj));   // url和特定的参数结合作为唯一的有效key值

    // 判断缓存中是否存在该请求接口的数据缓存
    if (cache.get[cacheParams]) {
      // 存在缓存值，直接返回该缓存的数据。
      return new Promise((reslove, reject) => {
        reslove(Object.assign({}, cache.get[cacheParams]));
      }).finally(() => {
        //关闭加载提示
        if (toast) toast.close();
      });
    } else {
      // 不存在缓存，返回axios实例，继续请求接口数据
      return instance(config).then(res => {
        // 把请求到的数据信息缓存到 get 缓存区
        cache.get[cacheParams] = res;
        // 设置定时器，在缓存时间内清除数据
        setTimeout(() => {
          delete cache.get[cacheParams]
        }, config.isCache.time);

        return res;
      }).finally(() => {
        //关闭加载提示
        if (toast) toast.close();
      });
    }
  } else if (method == 'POST' && config.isCache.time > 0) {       // 给post请求方法设置数据缓存
    let cacheurl = url.charAt(0) == '/' ? url : '/' + url;
    let cacheObj = {};
    Object.assign(cacheObj, params ? params : {});
    let cacheParams = cacheurl + JSON.stringify(objKeySort(cacheObj));

    if (cache.post[cacheParams]) {
      return new Promise((reslove, reject) => {
        reslove(Object.assign({}, cache.post[cacheParams]));
      }).finally(() => {
        //关闭加载提示
        if (toast) toast.close();
      });
    } else {
      return instance(config).then(res => {
        cache.post[cacheParams] = res;
        // 设置定时器，在缓存时间内清除数据
        setTimeout(() => {
          delete cache.post[cacheParams]
        }, config.isCache.time);

        return res;
      }).finally(() => {
        //关闭加载提示
        if (toast) toast.close();
      });
    }

  } else {
    // 发起请求，返回axios实例
    return instance(config).finally(() => {
      //关闭加载提示
      if (toast) toast.close();
    })
  }

}

/**
 * @description 把上面的request方法转换成一个利于理解，方便的请求方法结构
 * @param {String} url 请求地址，必传值
 * @param {Object} data 数据，默认为空
 * @param {String} method 请求方法，默认GET方法
 * @param {Boolean} noToken 是否取消token，默认不需要携带token
 * @param {Boolean} noLoading 是否取消加载提示，默认需要加载
 * @param {Object} isCache 设置缓存时间，如果time为0，视为不设置缓存，默认time=0，单位ms
 * @param {String} responseType 设置响应文件类型，默认为json，有时候会出现二进制流文件，例如 arraybuffer
 * @param {params} 可以自定义其他参数来决定接口的不同需求
 *
 * @returns {Axios} 返回一个axios实例，也就是上面的request方法执行
*/
// 导出一个更简便的方法
function fetch(url, method = "GET", data = {}, { noToken, noLoading } = { noToken: true, noLoading: false }, isCache = { time: 0 }, responseType = 'json') {
  // 获取请求类型
  method = method.toUpperCase();
  const config = {
    url,
    method,
    responseType,
    isCache
  }
  // data处理，get和post的data传输不一样
  if (method == 'GET')
    config.params = data;
  else
    config.data = data;
  return request(config, { noToken, noLoading });
}

// fetch.get()/fetch.post()等等类似这样的页能调用
['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
  fetch[method] = (api, data, opt) => fetch(api, method, data, opt || {})
});

// 忽略key大小写检查
function checkKeyIgnoreUpCase(target, key) {
  let res = false;
  if (typeof target !== "object" || target === null) {
    return res;
  }
  let keys = Object.keys(target)
  res = keys.some((k) => {
    if (typeof k === "string") {
      return k.toLocaleLowerCase() === key.toLocaleLowerCase()
    }
    return k === key
  })
  return res;
}
// 导出
export {
  instance,
  request,
  fetch
};
