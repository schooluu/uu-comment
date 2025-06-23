'use strict';
exports.main = async (event, context) => {

	try {

		const data = {
			projects: [{
					id: 1,
					title: '人人点评模板',
					description: '匿名化点评平台，可做公司黑名单、外卖黑名单、等等',
					image: 'https://env-00jxtfbgd5dl.normal.cloudstatic.cn/kescoy-banner1.jpg?expire_at=1747497128&er_sign=6cfe4c0d265a98808372d74a8b60b148',
					tags: ['Vue3', 'uniapp'],
					path: '/pages/comment/index/index'
				},
				{
					id: 2,
					title: '舞蹈店预约模板',
					description: '舞蹈店预约模板，方便舞蹈店提供给用户预约功能',
					image: 'https://env-00jxtfbgd5dl.normal.cloudstatic.cn/banner1.jpg?expire_at=1747497140&er_sign=d71b824588d4f3caae86d249ec7cc085',
					tags: ['Vue3', 'uniapp'],
					path: '/pages/dance/home/index'
				},
				{
					id: 3,
					title: '仿微信朋友圈模板',
					description: '仿微信朋友圈模板，提供全方位的智能服务',
					image: 'https://env-00jxtfbgd5dl.normal.cloudstatic.cn/微信图片_20241120114537.png?expire_at=1747497189&er_sign=208848dd037776c9a4fb75803f6e5f8a',
					tags: ['Vue3', 'uniapp'],
					path: '/pages/wx/home/index'
				}
			],
			wechatQr: 'https://objectstorageapi.bja.sealos.run/ppny09lg-xr-im/1b29f2859000024a54da3f1854593d5f.jpeg',
			wechatQunQr: 'https://objectstorageapi.bja.sealos.run/ppny09lg-xr-im/7060a41f08bc0a068442f8b5bde52631.jpeg'
		}

		return {
			code: 0,
			data: data,
			message: 'success'
		}
	} catch (error) {
		return {
			code: -1,
			data: null,
			message: error.message
		}
	}
}