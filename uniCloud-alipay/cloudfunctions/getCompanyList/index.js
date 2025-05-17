'use strict';
const db = uniCloud.database()
const dbCmd = db.command
const $ = dbCmd.aggregate

exports.main = async (event, context) => {
  const { page = 1, pageSize = 10, keyword = '', city = '' } = event
  
  try {
    const collection = db.collection('company')
    
    const matchObj = {}
    if (keyword) {
      matchObj.companyName = dbCmd.regex({
        regexp: keyword,
        options: 'i'
      })
    }
    if (city) {
      matchObj.city = city
    }

    const {data} = await collection
      .aggregate()
      .match(matchObj)
      .lookup({
        from: 'comments',
        let: {
          company_id: '$_id'
        },
        pipeline: $.pipeline()
          .match(dbCmd.expr($.eq(['$companyId', '$$company_id'])))
          .group({
            _id: null,
            count: $.sum(1),
            avgRating: $.avg('$rating')
          })
          .done(),
        as: 'commentStats'
      })
      .addFields({
        reviewCount: $.cond({
          if: $.eq([$.size('$commentStats'), 0]),
          then: 0,
          else: $.arrayElemAt(['$commentStats.count', 0])
        })
      })
      .sort({
        createTime: -1
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .end()
      
    return {
      code: 0,
      data: data,
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