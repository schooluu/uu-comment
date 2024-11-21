'use strict';
const db = uniCloud.database()

exports.main = async (event, context) => {
  const { momentId, content } = event
  const uid = context?.auth?.uid
  
  try {
    // 检查朋友圈是否存在
    const moment = await db.collection('wx-moments').doc(momentId).get()
    if (!moment.data || !moment.data[0]) {
      return {
        code: -1,
        msg: '朋友圈不存在'
      }
    }
    
    // 构建评论数据
    const commentData = {
      user_id: uid || 'anonymous',
      content,
      create_time: Date.now(),
      username: uid ? undefined : '匿名用户',
      avatar: uid ? undefined : 'https://img0.baidu.com/it/u=1415523915,841919565&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1713286800&t=a9e21a0e5650a672fa2cbd3b133ed7e0'
    }
    
    // 添加评论
    await db.collection('wx-moments').doc(momentId).update({
      comments: db.command.push(commentData)
    })
    
    return {
      code: 0,
      data: {
        isAnonymous: !uid,
        comment: commentData
      },
      msg: '评论成功'
    }
    
  } catch (error) {
    return {
      code: -1,
      msg: error.message || '评论失败'
    }
  }
} 