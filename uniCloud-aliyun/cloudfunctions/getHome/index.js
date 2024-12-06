'use strict';
exports.main = async (event, context) => {

	try {

		const data = {
			projects: [{
					id: 1,
					title: '人人点评模板',
					description: '匿名化点评平台，可做公司黑名单、外卖黑名单、等等',
					image: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/phonecase1.jpg',
					tags: ['Vue3', 'uniapp'],
					path: '/pages/comment/index/index'
				},
				{
					id: 2,
					title: '舞蹈店预约模板',
					description: '舞蹈店预约模板，方便舞蹈店提供给用户预约功能',
					image: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/computer2.jpg',
					tags: ['Vue3', 'uniapp'],
					path: '/pages/dance/home/index'
				},
				{
					id: 3,
					title: '仿微信朋友圈模板',
					description: '仿微信朋友圈模板，提供全方位的智能服务',
					image: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/life-1.jpg',
					tags: ['Vue3', 'uniapp'],
					path: '/pages/wx/home/index'
				},
				{
					id: 4,
					title: '门店模板',
					description: '门店模板，方便门店提供给用户点单功能',
					image: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/sticker.jpg',
					tags: ['Vue3', 'uniapp'],
					path: '/pages/shop/home/index'
				}, {
					id: 5,
					title: '物流公司系统',
					description: '物流公司系统，包括用户端和管理端',
					image: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/2-image_04.jpg',
					tags: ['Vue3', 'uniapp'],
					path: 'https://static-host-ppny09lg-uu-pro.sealosbja.site'
				},{
					id: 6,
					title: '自营电商系统',
					description: '自营电商系统，包括用户端和管理端',
					image: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/2-image_01.jpg',
					tags: ['Vue3', 'uniapp'],
					path: 'https://static-host-ppny09lg-uu-store.sealosbja.site'
				},{
					id: 7,
					title: '同城生活模板',
					description: '同城生活模板，本地生活',
					image: 'https://img1.baidu.com/it/u=2297377264,1459357291&fm=253&fmt=auto&app=138&f=JPG?w=265&h=380',
					tags: ['Vue3', 'uniapp'],
					path: '/pages/city/home/index'
				}
			],
			wechatQr: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/微信图片_20241120134411.png',
			wechatQunQr: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/20241119152557.png'
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