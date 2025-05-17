'use strict';

const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	try {
        // 访问接口
        const response = await uniCloud.httpclient.request('https://www.xygalaxy.com/api/link/list', {
            method: 'GET',
            dataType: 'json'
        });

		

        const linkList = response.data.linkList; // 获取 linkList 数组

        // 检查 linkList 是否存在
        if (!linkList || !Array.isArray(linkList)) {
            return {
                success: false,
                message: 'linkList 为空或格式不正确'
            };
        }
        // 循环遍历 linkList
        for (const link of linkList) {
            const { linkGroupList, type } = link; // 获取需要的字段
			for (const item of linkGroupList) {
                // 插入到数据库表中
                await db.collection('xr-tip-list').add({
                    type: type,
                    ...item
                });
            }
        }
    } catch (error) {
        console.error('发生错误:', error);
        return {
            success: false,
            message: '数据插入失败',
            error: error
        };
    }
};
