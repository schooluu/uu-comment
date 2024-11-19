'use strict';
exports.main = async (event, context) => {

  try {

    const data = {
      projects: [
        {
          id: 1,
          title: '人人点评',
          description: '匿名化点评平台，为用户提供真实可靠的评价信息',
          image: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/phonecase1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ppny09lg%2F20241119%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241119T073205Z&X-Amz-Expires=900&X-Amz-Signature=ffdbc90b57ee70f8c7c78b458eb31f6f03b50f4e1b40960116be804444d25b4a&X-Amz-SignedHeaders=host&x-id=GetObject',
          tags: ['Vue3', 'uniapp'],
          path: '/pages/comment/index/index'
        },
        {
          id: 2,
          title: '智能课程',
          description: 'AI驱动的智能课程模板，提供全方位的智能服务',
          image: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/computer2.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ppny09lg%2F20241119%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241119T073301Z&X-Amz-Expires=900&X-Amz-Signature=8cb87c6d66d9632e5a18624f859e67cd2c3a9438ff1038d5963b2bbf27cbcf1d&X-Amz-SignedHeaders=host&x-id=GetObject',
          tags: ['Vue3', 'uniapp'],
           path: '/pages/dance/home/index'
        },
      ],
      wechatQr: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20241119152557.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ppny09lg%2F20241119%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241119T072639Z&X-Amz-Expires=900&X-Amz-Signature=b3ee419319de6fc2e9b6020d7bd4e3ddff49e7505eb7864de8d983472c56e22b&X-Amz-SignedHeaders=host&x-id=GetObject'
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