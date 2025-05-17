'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
    // 获取分页参数
    const page = event.page || 1;
    const pageSize = 2000;
    const skip = (page - 1) * pageSize;
    
    // 从 xr-tip-list 表中获取数据并根据 type 分组
    const result = await db.collection('xr-tip-list')
        .aggregate()
        .skip(skip)  // 跳过前面的数据
        .limit(pageSize)  // 限制返回数量
        .end();

    // 获取总数据量，用于判断是否还有更多数据
    const countResult = await db.collection('xr-tip-list').count();
    const total = countResult.total;
    
    return {
        data: result.data,
        total: total,
        hasMore: skip + pageSize < total
    };
};
