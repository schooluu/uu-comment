'use strict';
const db = uniCloud.database()

exports.main = async (event, context) => {
  const { momentId } = event
  const uid = context?.auth?.uid
  
  try {
    const moment = await db.collection('wx-moments').doc(momentId).get()
    
    // 检查数据是否存在
    if (!moment.data || !moment.data[0]) {
      return {
        code: -1,
        msg: '朋友圈不存在，请刷新一下画面'
      }
    }
    
    const likes = moment.data[0].likes || []
    
    // 如果已登录，使用uid；如果未登录，使用临时标识
    const identifier = uid || 'anonymous'
    const hasLiked = likes.includes(identifier)
    
    // 更新点赞状态
    await db.collection('wx-moments').doc(momentId).update({
      likes: hasLiked 
        ? db.command.pull(identifier)
        : db.command.addToSet(identifier)
    })
    
    return {
      code: 0,
      data: {
        isLiked: !hasLiked,
        isAnonymous: !uid
      }
    }
    
  } catch (error) {
    return {
      code: -1,
      msg: error.message || '操作失败'
    }
  }
} 