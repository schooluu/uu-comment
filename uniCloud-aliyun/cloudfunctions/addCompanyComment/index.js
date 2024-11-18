'use strict';
const db = uniCloud.database()

exports.main = async (event, context) => {
  try {
    const { companyId, content, rating } = event
    
    if (!companyId || !content) {
      return {
        code: -1,
        message: '参数错误'
      }
    }
	if (!companyId) {
	  return {
	    code: -1,
	    message: '参数错误'
	  }
	}
    
    const commentData = {
      companyId,
      content,
      rating: rating || 0,
      userName:  '匿名用户',
      createdAt: new Date().toISOString()
    }
    
    // 添加评论
    const collection = db.collection('comments')
    await collection.add(commentData)
    
    return {
      code: 0,
      message: '评论成功'
    }
  } catch (error) {
    return {
      code: -1,
      message: error.message
    }
  }
}; 