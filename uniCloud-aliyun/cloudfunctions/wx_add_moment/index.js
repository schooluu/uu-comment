'use strict';
const db = uniCloud.database()

exports.main = async (event, context) => {
  const { content, mediaList, location, privacy = 'public' } = event
  const uid = context?.auth?.uid
  
  // 验证必填参数
  if (!content && (!mediaList || mediaList.length === 0)) {
    return {
      code: -1,
      msg: '内容不能为空'
    }
  }
  
  try {
    // 构建朋友圈数据
    const momentData = {
      user_id: uid || 'anonymous',
      content,
      mediaType: mediaList && mediaList.length > 0 ? mediaList[0].type : null,
      mediaUrls: mediaList ? mediaList.map(item => item.url) : [],
      location,
      privacy,
      likes: [],
      comments: [],
      create_time: Date.now(),
      username: uid ? undefined : '匿名用户',
      avatar: uid ? undefined : 'https://img0.baidu.com/it/u=1415523915,841919565&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1713286800&t=a9e21a0e5650a672fa2cbd3b133ed7e0'
    }
    
    // 添加到数据库
    const res = await db.collection('wx-moments').add(momentData)
    
    return {
      code: 0,
      data: {
        id: res.id,
        isAnonymous: !uid
      },
      msg: '发布成功'
    }
    
  } catch (error) {
    return {
      code: -1,
      msg: error.message || '发布失败'
    }
  }
}