'use strict';
const db = uniCloud.database()

exports.main = async (event, context) => {
  try {
    const { companyId } = event
    
    if (!companyId) {
      return {
        code: -1,
        message: '参数错误'
      }
    }
    
    const collection = db.collection('comments')
    const { data } = await collection
      .where({
        companyId: companyId
      })
      .orderBy('createdAt', 'desc')
      .get()
    
    return {
      code: 0,
      data: data,
      message: '获取成功'
    }
  } catch (error) {
    return {
      code: -1,
      data: null,
      message: '获取失败'
    }
  }
}; 