//请求成功resolve，失败则reject。其他逻辑(code的不同情况)在resolve出去的地方处理。
const requestData = obj => {
  obj.method = obj.method || 'POST'
  obj.token = obj.token || wx.getStorageSync('token')
  obj.data = obj.data || {}
  obj.header = {
    'Content-Type': obj.header || 'application/json',
    token: obj.token,
    farmAppID: api.APP_ID
  }

  return new Promise((resolve, reject) => {
    wx.request({
      ...obj,
      success: res => {
        if (res.statusCode == 502) {
          common.sM('服务器没有响应，请稍后再试！', false)
          return
        }
        resolve(res)
      },
      fail(err) {
        common.sM(err.errMsg || '请求错误，请检查网络环境!', false)
        common.hL()
        reject(err)
      }
    })
  })
}