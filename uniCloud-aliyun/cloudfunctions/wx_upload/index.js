'use strict';
// 云函数作为上传代理，避免前端 CORS 问题
// 使用方法：前端用 uni.uploadFile 上传到云函数 URL 化地址

exports.main = async (event, context) => {
  const UPLOAD_URL = 'http://117.72.208.124:40027/upload'
  
  try {
    // 从事件中获取文件数据
    // 注意：需要先在 uniCloud 控制台启用云函数 URL 化
    const httpInfo = event.httpInfo || {}
    const body = event.body
    const headers = event.headers || {}
    
    // 如果是 HTTP URL 化访问
    if (event.isUniCloud || httpInfo.path) {
      const httpClient = uniCloud.httpclient()
      
      // 转发请求到目标服务器
      const result = await httpClient.request(UPLOAD_URL, {
        method: 'POST',
        headers: {
          ...headers,
          'host': undefined, // 移除原 host
          'Host': undefined
        },
        content: body, // 使用 content 而不是 data，保持原始二进制数据
        dataType: 'json',
        timeout: 30000
      })
      
      // 返回 HTTP 响应
      return {
        mpserverlessComposedResponse: true,
        statusCode: result.status,
        headers: {
          'content-type': 'application/json'
        },
        body: result.data
      }
    }
    
    // 如果不是 HTTP 触发，返回提示
    return {
      status: false,
      message: '此云函数需要通过 URL 化方式访问。请在 uniCloud 控制台开启云函数 URL 化功能。',
      data: null
    }
    
  } catch (error) {
    console.error('上传代理错误:', error)
    
    // 返回错误响应
    if (event.isUniCloud || event.httpInfo) {
      return {
        mpserverlessComposedResponse: true,
        statusCode: 500,
        headers: {
          'content-type': 'application/json'
        },
        body: {
          status: false,
          message: `上传失败: ${error.message}`,
          data: null
        }
      }
    }
    
    return {
      status: false,
      message: `上传异常: ${error.message}`,
      data: null
    }
  }
}
