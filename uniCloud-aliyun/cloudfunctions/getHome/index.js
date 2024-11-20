'use strict';
exports.main = async (event, context) => {

	try {

		const data = {
			projects: [{
					id: 1,
					title: '人人点评模板',
					description: '匿名化点评平台，为用户提供真实可靠的评价信息',
					image: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/phonecase1.jpg',
					tags: ['Vue3', 'uniapp'],
					path: '/pages/comment/index/index'
				},
				{
					id: 2,
					title: '舞蹈店模板',
					description: 'AI驱动的智能舞蹈店模板，提供全方位的智能服务',
					image: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/computer2.jpg',
					tags: ['Vue3', 'uniapp'],
					path: '/pages/dance/home/index'
				},
			],
			wechatQr: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/20241119152557.png'
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