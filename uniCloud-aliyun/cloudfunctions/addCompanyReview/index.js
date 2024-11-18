'use strict';
const db = uniCloud.database()
const companyReviews = db.collection('company')
const CryptoJS = require('crypto-js')

// 解密密钥
const SECRET_KEY = 'your-secret-key-here'

// 解密数据
const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY)
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}

exports.main = async (event, context) => {
  try {
    // 解密数据
    const data = decryptData(event.encryptedData)
    
    // 添加创建时间
    data.createTime = Date.now()
    
    // 存储到数据库
    const collection = db.collection('company')
    const res = await collection.add(data)
    
    return {
      code: 0,
      data: res,
      message: '添加成功'
    }
  } catch (error) {
    return {
      code: -1,
      data: null,
      message: error.message || '添加失败'
    }
  }
} 