'use strict';
const db = uniCloud.database()

exports.main = async (event, context) => {
  try {
    const dbJQL = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云函数context
      context
    })
    
    // 获取总点评数
    const totalReviews = await db.collection('comment').count()
    
    // 获取已收录企业数
    const totalCompanies = await db.collection('company').count()
    
    // 获取今日新增点评数
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayReviews = await db.collection('company')
      .where({
        createTime: db.command.gte(today.getTime())
      })
      .count()
    
    return {
      code: 0,
      message: 'success',
      data: {
        totalReviews: totalReviews.total,
        totalCompanies: totalCompanies.total,
        todayReviews: todayReviews.total
      }
    }
    
  } catch (error) {
    return {
      code: -1,
      message: error.message || '获取统计数据失败',
      data: null
    }
  }
} 