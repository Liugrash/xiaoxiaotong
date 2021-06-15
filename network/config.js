const baseURL = 'https://scut.chenct.top/api/v1'
// const baseURL = 'http://localhost:8000/api/v1'


export default function(options) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseURL + options.url,
      method: options.method || 'get',
      data: options.data || {},
      success: resolve,
      fail: reject
    })
  })
}