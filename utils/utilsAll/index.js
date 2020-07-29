/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * 将时间字符串转换成时间戳
 * 在iOS的web js里必须是 yyyy/MM/dd的格式，否则无法识别
 */
export function getTimeTamp(time) {
  if (time) {
    time = time.replace(/\-/g, '/')
    return Date.parse(time)
  }
  return new Date().getTime()
}

/**
 * 将时间戳格式化成时间文本
 * @param timestamp number
 */
export function formatDate(timestamp, format = 'yyyy-MM-dd hh:mm:ss') {
  Date.prototype.format = function(fmt) {
    let o = {
      'M+': this.getMonth() + 1, //月份
      'd+': this.getDate(), //日
      'h+': this.getHours(), //小时
      'm+': this.getMinutes(), //分
      's+': this.getSeconds(), //秒
      'q+': Math.floor((this.getMonth() + 3) / 3), //季度
      'S': this.getMilliseconds() //毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  }
  return new Date(timestamp).format(format)
}

/**
 * 格式化时间
 * @param time 2019-03-25 20:14:43
 */
export function formatIntervalTime(time) {
  let tDate
  if (time) {
    tDate = new Date()
    //在iOS的web js里必须是 yyyy/MM/dd的格式，否则无法识别
    time = time.replace(/\-/g, '/')
    let time1 = Date.parse(time)
    tDate.setTime(time1)
  } else {
    tDate = new Date()
  }
  let t = tDate.getTime()
  if (isToday(tDate.getTime())) {
    return formatDate(t, 'hh:mm')
  }
  if (isYesterday(tDate.getTime())) {
    return '昨天' + formatDate(t, 'hh:mm')
  }
  return formatDate(t, 'yyyy年MM月dd日 hh:mm')
}

/**
 * 格式化时间
 * @param timestamp 时间戳
 */
export function formatIntervalTimestamp(timestamp) {
  if (!timestamp) {
    timestamp = new Date().getTime()
  }
  if (isToday(timestamp)) {
    return formatDate(timestamp, 'hh:mm')
  }
  if (isYesterday(timestamp)) {
    return '昨天' + formatDate(timestamp, 'hh:mm')
  }
  return formatDate(timestamp, 'yyyy年MM月dd日 hh:mm')
}

/**
 * 格式化时间
 * @param timestamp 时间戳
 */
export function formatIntervalTimestamp2(timestamp) {
  if (!timestamp) {
    timestamp = new Date().getTime()
  }
  if (isToday(timestamp)) {
    return formatDate(timestamp, 'hh:mm')
  }
  if (isYesterday(timestamp)) {
    return '昨天' + formatDate(timestamp, 'hh:mm')
  }
  if (isThisYear(timestamp)) {
    return formatDate(timestamp, 'MM-dd')
  }
  return formatDate(timestamp, 'yyyy-MM-dd')
}

/**
 * 获取下技能订单对应的Picker时间数组
 * @param timeTamp 时间戳
 */
export function getOrderPickerTimes(column, value, now) {
  now = now ? new Date(now) : new Date();
  let minute = (Math.ceil(now.getMinutes() / 15) + 1) * 15;
  now.setMinutes(minute)
  //日期的数组
  const today = isToday(now.getTime());
  // console.log('today', today)
  const showDays = [];
  let days = [];
  for (let i = 0; i < 3; i++) {
    if (i == 0 && !today) continue;
    if (i > 0) now.setDate(now.getDate() + 1);
    const day = formatDate(now.getTime(), 'yyyy/MM/dd');
    const week = ['日', '一', '二', '三', '四', '五', '六'][now.getDay()];
    showDays.push(['今天', '明天', '后天'][i] + `(周${week})`)
    days.push(day)
  }
  //分钟的数组
  let minuteIndex = now.getMinutes() / 15;
  const firstMinutes = [];
  const minutes = [];
  for (let i = minuteIndex; i < 4; i++) {
    firstMinutes.push(('00' + i * 15).slice(-2))
  }
  for (let i = 0; i < 4; i++) {
    minutes.push(('00' + i * 15).slice(-2))
  }
  const hour = now.getHours();
  const firstHours = [];
  const hours = [];
  for (let i = hour; i < 24; i++) {
    firstHours.push(('00' + i).slice(-2))
  }
  for (let i = 0; i < 24; i++) {
    hours.push(('00' + i).slice(-2))
  }
  const pickerTime = {
    showDays,
    days,
    firstHours,
    hours,
    firstMinutes,
    minutes
  }
  // console.log('pickerTime', pickerTime)
  return pickerTime
}

/**
 * 判断输入的时间戳是否是今天
 * @param timeTamp 时间戳
 */
export function isToday(timeTamp) {
  let tDate = new Date(timeTamp)
  let tYear = tDate.getFullYear()
  let tMonth = tDate.getMonth()
  let tDay = tDate.getDate()
  let today = new Date()
  return (tYear == today.getFullYear()) && (tMonth == today.getMonth()) && (tDay == today.getDate())
}

/**
 * 判断输入的时间戳是否是昨天天
 * @param timeTamp 时间戳
 */
export function isYesterday(timeTamp) {
  let tDate = new Date(timeTamp)
  let tYear = tDate.getFullYear()
  let tMonth = tDate.getMonth()
  let tDay = tDate.getDate()
  let yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return (tYear == yesterday.getFullYear()) && (tMonth == yesterday.getMonth()) && (tDay == yesterday.getDate())
}

/**
 * 判断输入的时间戳是否是今年
 * @param timeTamp 时间戳
 */
export function isThisYear(timeTamp) {
  let tDate = new Date(timeTamp)
  let tYear = tDate.getFullYear()
  let today = new Date()
  return tYear == today.getFullYear()
}

/**
 * 服务器返回的金额都为分，显示时处理成元
 * @param cent 分
 */
export function formatPrice(cent) {
  cent = cent.toFixed(0);
  let num = (isNaN(cent)) ? String(0) : String(cent)
  let zero = ''
  for (let i = num.length; i < 3; i++) {
    zero += '0'
  }
  num = zero + num
  return `${num.slice(0, num.length - 2)}.${num.slice(num.length - 2)}`
}

/**
 保留N位小数
 最终返回的是字符串
 若转换失败，返回参数原值
 @params
 str - 数字或字符串
 x   - 保留几位小数点
 */
export function pointX(str, x = 0) {
  if (!str && str !== 0) {
    return str
  }
  const temp = Number(str)
  if (temp === 0) {
    return temp.toFixed(x)
  }
  return temp ? temp.toFixed(x) : str
}

/**
   去掉字符串两端空格与回车换行,(^\s*)|(\s*$)去掉收尾空格，\r去掉回车\n去掉换行
   */
export function trim(str) {
  const reg = /(^\s*)|(\s*$)/g
  return str.replace(reg, '')
}

/**
   去掉字符串所有空格与回车换行
   */
export function trimAll(str) {
  const reg = /^\s*|\s*$|\r|\n/g
  return str.replace(reg, '')
}

/**
 * 计算字符串的字符长度（英文，标点符号算一个字符，中文算两个字符，表情算四个字符）
 * 使用正则替换所有中文字符,然后再按照byte进行计算长度
 */
export function getStrBLen(str) {
  for (var i = str.length, n = 0; i--;) {
    n += str.charCodeAt(i) > 255 ? 2 : 1;
  }
  return n;
}

/**
 * 计算字符串的字符长度（英文，标点符号算一个字符，中文算两个字符，表情算四个字符）
 * 使用正则替换所有中文字符,然后再按照byte进行计算长度
 */
export function cutStrByte(str, len, endstr) {
  var len = +len,
    endstr = typeof(endstr) == 'undefined' ? "..." : endstr.toString();

  function n2(a) {
    var n = a / 2 | 0;
    return (n > 0 ? n : 1)
  } //用于二分法查找
  if (!(str + "").length || !len || len <= 0) {
    return "";
  }
  if (this.getStrBLen(str) <= len) {
    return str;
  } //整个函数中最耗时的一个判断,欢迎优化
  var lenS = len - this.getStrBLen(endstr),
    _lenS = 0,
    _strl = 0
  while (_strl <= lenS) {
    var _lenS1 = n2(lenS - _strl)
    _strl += this.getStrBLen(str.substr(_lenS, _lenS1))
    _lenS += _lenS1
  }
  return str.substr(0, _lenS - 1) + endstr
}

/**
  显示缩略图的尺寸
  ps：产品觉得2倍图不满足，先用3倍图
  */
export const getrpxTopx = (size) => {
  let pxSize = Math.ceil(parseFloat(uni.getSystemInfoSync().windowWidth * parseInt(size) * 3) / 750)
  // console.error('pxSize',pxSize)
  return pxSize
}

/**
  给字符串打马赛克
  如：将123456转换为1****6，最多将字符串中间6个字符变成*
  如果字符串长度小于等于2，将不会有效果
  */
export function addMosaic(str) {
  const s = String(str)
  const lenth = s.length
  const howmuch = (() => {
    if (s.length <= 2) {
      return s.length
    }
    const l = s.length - 2
    if (l <= 6) {
      return l
    }
    return 6
  })()
  const start = Math.floor((lenth - howmuch) / 2)
  const ret = s.split('').map((v, i) => {
    if (i >= start && i < start + howmuch) {
      return '*'
    }
    return v
  })
  return ret.join('')
}

/**
 * 清除一个对象中那些属性为空值的属性
 * 0 算有效值
 * **/
export function clearNull(obj) {
  const temp = {}
  Object.keys(obj).forEach((item) => {
    if (obj[item] === 0 || !!obj[item]) {
      temp[item] = obj[item]
    }
  })
  return temp
}

/*
 * 判断参数是否为空
 * */
export function isEmpty(obj) {
  // 检验null和undefined
  if (!obj && obj !== 0 && obj !== '') {
    return true
  }
  // 检验数组
  if (Array.prototype.isPrototypeOf(obj) && obj.length === 0) {
    return true
  }
  // 检验对象
  if (Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length === 0) {
    return true
  }
  return false
}

/*
 * 1.清除一个对象中那些属性为空值的属性
 *   0 算有效值
 * 2.清楚一个对象中的字符串前后空格
 * */
export function clearAll(obj) {
  let temp = {}
  let clearNull = this.clearNull(obj)
  Object.keys(clearNull).forEach((item) => {
    if (typeof obj[item] === 'string') {
      temp[item] = this.trimAll(obj[item])
    } else {
      temp[item] = obj[item]
    }
  })
  return temp
}

/**
 * 函数防抖，在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。用于防止表单多次提交。
 * @param fn 要执行的函数
 * @param wait 等待时间
 */
export function debounce(fn, wait = 300) {
  let timer = null
  return function() {
    let context = this
    let args = arguments
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(function() {
      fn.apply(context, args)
    }, wait)
  }
}

/**
 * 函数节流,规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。
 * 用于游戏中的刷新率等
 * @param fn 要执行的函数
 * @param gapTime 单位
 */
export function throttle(fn, gapTime = 300) {
  let _lastTime = null
  return function() {
    let _nowTime = +new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments)
      _lastTime = _nowTime
    }
  }
}

/**
 * 防抖和节流 加强版节流 固定的时间必须给用户一个响应
 * @param fn 要执行的函数
 * @param gapTime 单位
 */
export function throttle2(fn, delay = 300) {
  let last = 0,
    timer = null;
  return function(...args) {
    let context = this;
    let now = new Date();
    if (now - last < delay) {
      clearTimeout(timer);
      setTimeout(function() {
        last = now;
        fn.apply(context, args);
      }, delay);
    } else {
      // 这个时候表示时间到了，必须给响应
      last = now;
      fn.apply(context, args);
    }
  }
}

/**
 * 是否偶数 isEven(2) // true
 */
export function isEven(num) {
  return (num % 2 == 0)
}

/**
 * 判断字符串是否为JSON格式
 */
export function isJSON(str) {
  if (typeof str == 'string') {
    try {
      var obj = JSON.parse(str);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }

    } catch (e) {
      console.log('error：' + str + '!!!' + e);
      return false;
    }
  }
  console.log('It is not a string!')
}

/**
 * 生成随机数
 */
export function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
}

/**
 * 转化为中文数字
 */
export function toChinesNum(num) {
  let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; //changeNum[0] = "零"
  let unit = ["", "十", "百", "千", "万"];
  num = parseInt(num);
  let getWan = (temp) => {
    let strArr = temp.toString().split("").reverse();
    let newNum = "";
    for (var i = 0; i < strArr.length; i++) {
      newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : changeNum[
        strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
    }
    return newNum;
  }
  let overWan = Math.floor(num / 10000);
  let noWan = num % 10000;
  if (noWan.toString().length < 4) noWan = "0" + noWan;
  return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
}

/**
 * 判断2数组相等
 */
export function arrIsEqual(arr1, arr2) {
  if (arr1 === arr2) {
    return true;
  } else {
    if (arr1.length != arr2.length) {
      return false;
    } else {
      for (let i in arr1) {
        if (arr1[i] != arr2[i]) {
          return false;
        }
      }
      return true;
    }
  }
}

/**
 * 深拷贝
 * a = deepCopy(obj)
 */
export function deepCopy(source) {
  var sourceCopy = source instanceof Array ? [] : {};
  for (var item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? deepCopy(source[item]) : source[item];
  }
  return sourceCopy;
}

/**
 * 对比数据
 * isContained([1,2,3],[1,2])
 */
export function isContained(aa, bb) {
  if (!(aa instanceof Array) || !(bb instanceof Array) || ((aa.length < bb.length))) {
    return false;
  }
  for (var i = 0; i < bb.length; i++) {
    var flag = false;
    for (var j = 0; j < aa.length; j++) {
      if (aa[j] == bb[i]) {
        flag = true;
        break;
      }
    }
    if (flag == false) {
      return flag;
    }
  }
  return true;
}
