'use strict';
const db = uniCloud.database()

exports.main = async (event, context) => {
  const { momentId, content, images } = event
  const uid = context?.auth?.uid
  
  // 日志记录，方便调试
  console.log('收到评论请求:', {
    momentId,
    content,
    imagesCount: images ? images.length : 0,
    images: images
  })
  
  try {
    // 检查朋友圈是否存在
    const moment = await db.collection('wx-moments').doc(momentId).get()
    if (!moment.data || !moment.data[0]) {
      return {
        code: -1,
        msg: '朋友圈不存在'
      }
    }
    
    // 验证图片数据格式
    const validImages = Array.isArray(images) ? images.filter(img => typeof img === 'string' && img.trim()) : []
    
    // 构建评论数据
    const commentData = {
      user_id: uid || 'anonymous',
      content: content || '',  // 确保有默认值
      images: validImages,  // 保存评论图片数组（已验证）
      create_time: Date.now(),
      username: uid ? undefined : '匿名用户',
      avatar: uid ? undefined : 'https://img0.baidu.com/it/u=1415523915,841919565&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1713286800&t=a9e21a0e5650a672fa2cbd3b133ed7e0'
    }
    
    console.log('准备保存的评论数据:', commentData)
    
    // 添加评论
    await db.collection('wx-moments').doc(momentId).update({
      comments: db.command.push(commentData)
    })
    
    console.log('评论保存成功，包含', validImages.length, '张图片')
    
    return {
      code: 0,
      data: {
        isAnonymous: !uid,
        comment: commentData,
        savedImagesCount: validImages.length  // 返回保存的图片数量
      },
      msg: validImages.length > 0 ? `评论成功（含${validImages.length}张图片）` : '评论成功'
    }
    
  } catch (error) {
    return {
      code: -1,
      msg: error.message || '评论失败'
    }
  }
} 