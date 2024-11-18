'use strict';
const db = uniCloud.database()
const dbCmd = db.command

exports.main = async (event, context) => {
  try {
    const { id } = event
    
    if (!id) {
      return {
        code: -1,
        message: '参数错误'
      }
    }

    // 1. 先获取公司详情
    const collection = db.collection('company')
    const { data } = await collection.doc(id).get()

    if (!data.length) {
      return {
        code: -1,
        message: '公司不存在'
      }
    }

    // 2. 更新浏览量 (使用事务处理)
    const transaction = await db.startTransaction()
    try {
      await collection.doc(id).update({
        viewCount: dbCmd.inc(1)
      })
      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      console.error('更新浏览量失败:', err)
    }

    // 3. 获取最新的评论统计
    const commentsCollection = db.collection('comments')
    const { total: reviewCount } = await commentsCollection.where({
      companyId: id
    }).count()

    // 4. 组装返回数据
    const companyData = data[0]
    companyData.reviewCount = reviewCount
    companyData.viewCount = (companyData.viewCount || 0) + 1

    return {
      code: 0,
      data: companyData,
      message: '获取成功'
    }
  } catch (error) {
    return {
      code: -1,
      data: null,
      message: error.message || '获取失败'
    }
  }
} 