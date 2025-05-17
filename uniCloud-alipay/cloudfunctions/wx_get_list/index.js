'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate

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
      create_time: Date.now() - 3600000,
      username: '小明',
      avatar: 'https://img0.baidu.com/it/u=1415523915,841919565&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1713286800&t=a9e21a0e5650a672fa2cbd3b133ed7e0'
    },
    {
      user_id: 'system_2',
      content: '期待你的分享！',
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
  
  try {
    const { total } = await db.collection('wx-moments').count()
    
    const list = await db.collection('wx-moments')
      .aggregate()
      .lookup({
        from: 'uni-id-users',
        localField: 'user_id',
        foreignField: '_id',
        as: 'userInfo'
      })
      .unwind({
        path: '$comments',
        preserveNullAndEmptyArrays: true
      })
      .lookup({
        from: 'uni-id-users',
        localField: 'comments.user_id',
        foreignField: '_id',
        as: 'comments.userInfo'
      })
      .group({
        _id: '$_id',
        user_id: $.first('$user_id'),
        content: $.first('$content'),
        mediaType: $.first('$mediaType'),
        mediaUrls: $.first('$mediaUrls'),
        likes: $.first('$likes'),
        create_time: $.first('$create_time'),
        username: $.first($.arrayElemAt(['$userInfo.nickname', 0])),
        avatar: $.first($.arrayElemAt(['$userInfo.avatar', 0])),
        comments: {
          $push: {
            $cond: {
              if: {
                $and: [
                  { $ne: ['$comments', null] },
                  { $ne: ['$comments', ''] },
                  { $ne: ['$comments.content', null] },
                  { $ne: ['$comments.content', ''] }
                ]
              },
              then: {
                user_id: '$comments.user_id',
                content: '$comments.content',
                create_time: '$comments.create_time',
                username: $.arrayElemAt(['$comments.userInfo.nickname', 0]),
                avatar: $.arrayElemAt(['$comments.userInfo.avatar', 0])
              },
              else: '$$REMOVE'
            }
          }
        }
      })
      .sort({
        create_time: -1
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .end()

    // 处理数据
    const processedList = page === 1 && list.data.length === 0 ? emptyData : list.data
    const currentUid = context.auth?.uid
    const finalList = processedList.map(item => ({
      ...item,
      isLiked: currentUid ? item.likes?.includes(currentUid) : false,
      time: formatTime(item.create_time),
      avatar: item.avatar || 'https://img0.baidu.com/it/u=1415523915,841919565&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1713286800&t=a9e21a0e5650a672fa2cbd3b133ed7e0',
      username: item.username || '匿名用户',
      comments: Array.isArray(item.comments) 
        ? item.comments
            .filter(comment => comment && typeof comment === 'object' && comment.content)
            .map(comment => ({
              ...comment,
              time: formatTime(comment.create_time),
              avatar: comment.avatar || 'https://img0.baidu.com/it/u=1415523915,841919565&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1713286800&t=a9e21a0e5650a672fa2cbd3b133ed7e0',
              username: comment.username || '匿名用户'
            }))
        : []
    }))
    
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
