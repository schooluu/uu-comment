"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const storeInfo = common_vendor.ref({
      id: 1,
      name: "喜茶北京三里屯店",
      images: [
        "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
        "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
        "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg"
      ],
      rating: 4.8,
      reviewCount: 2580,
      status: "open",
      statusText: "营业中",
      address: "北京市朝阳区三里屯太古里北区N8-B1-3",
      distance: 0.8,
      businessHours: "10:00-22:00",
      phone: "010-12345678",
      features: [
        { icon: "🚗", name: "停车场" },
        { icon: "🔋", name: "充电宝" },
        { icon: "📶", name: "WIFI" },
        { icon: "🎫", name: "礼品卡" },
        { icon: "🧊", name: "店内取餐" },
        { icon: "🛵", name: "外卖配送" }
      ],
      notice: "本店新推出夏日特饮系列，欢迎品尝！",
      hotProducts: [
        {
          id: 1,
          name: "多肉葡萄",
          price: "32",
          image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg"
        }
        // ... 更多商品
      ],
      reviews: [
        {
          id: 1,
          avatar: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
          name: "张三",
          time: "2024-01-20",
          rating: 5,
          ratingText: "非常满意",
          content: "店员服务很好，饮品口感一如既往的赞！",
          images: [
            "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
            "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg"
          ]
        }
        // ... 更多评价
      ],
      latitude: 39.934,
      longitude: 116.455
    });
    const navigate = () => {
      common_vendor.index.openLocation({
        latitude: storeInfo.value.latitude,
        longitude: storeInfo.value.longitude,
        name: storeInfo.value.name,
        address: storeInfo.value.address
      });
    };
    const makeCall = () => {
      common_vendor.index.makePhoneCall({
        phoneNumber: storeInfo.value.phone
      });
    };
    const goToProduct = (product) => {
      common_vendor.index.navigateTo({
        url: `/pages/shop/product/detail?id=${product.id}`
      });
    };
    const viewAllReviews = () => {
      common_vendor.index.navigateTo({
        url: `/pages/shop/store/reviews?id=${storeInfo.value.id}`
      });
    };
    const previewImage = (images, current) => {
      common_vendor.index.previewImage({
        urls: images,
        current: images[current]
      });
    };
    const shareStore = () => {
      common_vendor.index.share({
        provider: "weixin",
        scene: "WXSceneSession",
        type: 0,
        title: storeInfo.value.name,
        summary: `欢迎光临${storeInfo.value.name}`,
        imageUrl: storeInfo.value.images[0],
        success: function(res) {
          console.log("分享成功：", res);
        }
      });
    };
    const placeOrder = () => {
      if (storeInfo.value.status === "closed")
        return;
      common_vendor.index.navigateTo({
        url: `/pages/shop/order/create?storeId=${storeInfo.value.id}`
      });
    };
    common_vendor.onMounted(() => {
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(storeInfo.value.images, (image, index, i0) => {
          return {
            a: image,
            b: index
          };
        }),
        b: common_vendor.t(storeInfo.value.name),
        c: common_vendor.t(storeInfo.value.rating),
        d: common_vendor.t(storeInfo.value.reviewCount),
        e: common_vendor.t(storeInfo.value.statusText),
        f: common_vendor.n(storeInfo.value.status),
        g: common_vendor.t(storeInfo.value.address),
        h: common_vendor.t(storeInfo.value.distance),
        i: common_vendor.o(navigate),
        j: common_vendor.t(storeInfo.value.businessHours),
        k: common_vendor.t(storeInfo.value.phone),
        l: common_vendor.o(makeCall),
        m: common_vendor.f(storeInfo.value.features, (feature, k0, i0) => {
          return {
            a: common_vendor.t(feature.icon),
            b: common_vendor.t(feature.name),
            c: feature.name
          };
        }),
        n: storeInfo.value.notice
      }, storeInfo.value.notice ? {
        o: common_vendor.t(storeInfo.value.notice)
      } : {}, {
        p: common_vendor.f(storeInfo.value.hotProducts, (product, k0, i0) => {
          return {
            a: product.image,
            b: common_vendor.t(product.name),
            c: common_vendor.t(product.price),
            d: product.id,
            e: common_vendor.o(($event) => goToProduct(product), product.id)
          };
        }),
        q: common_vendor.o(viewAllReviews),
        r: common_vendor.f(storeInfo.value.reviews, (review, k0, i0) => {
          var _a, _b;
          return common_vendor.e({
            a: review.avatar,
            b: common_vendor.t(review.name),
            c: common_vendor.t(review.time),
            d: common_vendor.t("⭐️".repeat(review.rating)),
            e: common_vendor.t(review.ratingText),
            f: common_vendor.t(review.content),
            g: (_a = review.images) == null ? void 0 : _a.length
          }, ((_b = review.images) == null ? void 0 : _b.length) ? {
            h: common_vendor.f(review.images, (image, index, i1) => {
              return {
                a: index,
                b: image,
                c: common_vendor.o(($event) => previewImage(review.images, index), index)
              };
            })
          } : {}, {
            i: review.id
          });
        }),
        s: common_vendor.o(shareStore),
        t: common_vendor.t(storeInfo.value.status === "closed" ? "已打烊" : "去下单"),
        v: common_vendor.o(placeOrder)
      });
    };
  }
};
qq.createPage(_sfc_main);
