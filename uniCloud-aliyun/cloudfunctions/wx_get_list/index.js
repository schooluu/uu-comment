'use strict';
const db = uniCloud.database()

// 定义默认的空数据
const emptyData = [{
  _id: 'default_1',
  content: '欢迎来到朋友圈，这里是一个分享生活的地方~',
  mediaType: 'image',
  mediaUrls: [
    'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/life-1.jpg',
    'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/computer2.jpg'
  ],
  likes: [],
  comments: [
    {
      user_id: 'system_1',
      content: '欢迎欢迎~',
      images: [],
      create_time: Date.now() - 3600000,
      username: '小明',
      avatar: 'https://img0.baidu.com/it/u=1415523915,841919565&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1713286800&t=a9e21a0e5650a672fa2cbd3b133ed7e0'
    },
    {
      user_id: 'system_2',
      content: '期待你的分享！',
      images: [],
      create_time: Date.now() - 1800000,
      username: '小红',
      avatar: 'https://img0.baidu.com/it/u=1415523915,841919565&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1713286800&t=a9e21a0e5650a672fa2cbd3b133ed7e0'
    }
  ],
  create_time: Date.now() - 7200000,
  user_id: 'system_admin',
  username: '系统管理员',
  avatar: 'https://img0.baidu.com/it/u=1415523915,841919565&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1713286800&t=a9e21a0e5650a672fa2cbd3b133ed7e0'
}]

exports.main = async (event, context) => {
  const { page = 1, pageSize = 10 } = event
  // return {
  //   code: -1,
  //   msg: '网站被攻击，恢复时间请关注我们官方网站schooluu.cn'
  // }
  try {
    const { total } = await db.collection('wx-moments').count()
    
    // 直接查询，不使用聚合分组
    const { data: list } = await db.collection('wx-moments')
      .orderBy('create_time', 'desc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()
    
    console.log('直接查询到的数据（第一条）:', JSON.stringify(list[0], null, 2))

    // 处理数据
    const processedList = page === 1 && list.length === 0 ? emptyData : list
    
    // 调试日志：查看原始数据
    console.log('处理后的列表数据（第一条）:', JSON.stringify(processedList[0], null, 2))
    
    const currentUid = context.auth?.uid
    const finalList = processedList.map(item => {
      // 调试日志：查看评论数据
      if (item.comments && item.comments.length > 0) {
        console.log('动态ID:', item._id, '评论数量:', item.comments.length)
        console.log('第一条评论数据:', JSON.stringify(item.comments[0], null, 2))
      }
      
      return {
        ...item,
        isLiked: currentUid ? item.likes?.includes(currentUid) : false,
        time: formatTime(item.create_time),
        avatar: item.avatar || 'https://img0.baidu.com/it/u=1415523915,841919565&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1713286800&t=a9e21a0e5650a672fa2cbd3b133ed7e0',
        username: item.username || '匿名用户',
        // 直接使用数据库返回的评论数据，包含完整的 images 字段
        comments: Array.isArray(item.comments) 
          ? item.comments
              .filter(comment => {
                // 过滤掉空评论：必须有内容或图片
                return comment && (
                  (comment.content && comment.content.trim()) || 
                  (comment.images && comment.images.length > 0)
                )
              })
              .map(comment => ({
                ...comment,
                images: comment.images || [],  // 确保 images 是数组
                time: formatTime(comment.create_time),
                avatar: comment.avatar || 'https://img0.baidu.com/it/u=1415523915,841919565&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1713286800&t=a9e21a0e5650a672fa2cbd3b133ed7e0',
                username: comment.username || '匿名用户'
              }))
          : []
      }
    })
    
    console.log('最终返回的数据（第一条）:', JSON.stringify(finalList[0], null, 2))
    
    return {
      code: 0,
      data: {
        list: finalList,
        total,
        hasMore: total > page * pageSize
      },
      message: 'success'
    }
    
  } catch (error) {
    return {
      code: -1,
      msg: error.message || '获取失败'
    }
  }
}

// 格式化时间函数
function formatTime(timestamp) {
  const now = Date.now()
  const diff = now - timestamp
  
  if (diff < 60000) return '刚刚'
  if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前'
  if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前'
  if (diff < 2592000000) return Math.floor(diff / 86400000) + '天前'
  
  const date = new Date(timestamp)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
