"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const userPoints = common_vendor.ref(2580);
    const availableGifts = common_vendor.ref(15);
    const categories = common_vendor.ref([
      {
        name: "全部",
        badge: ""
      },
      {
        name: "新品",
        badge: "NEW"
      },
      {
        name: "热销",
        badge: "🔥"
      },
      {
        name: "折扣",
        badge: "折扣"
      }
    ]);
    const currentCategory = common_vendor.ref(0);
    const giftList = common_vendor.ref([
      {
        id: 1,
        name: "限量版保温杯",
        description: "316不锈钢内胆，24小时保温",
        points: 1999,
        image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
        stock: 8,
        category: 1
      },
      {
        id: 2,
        name: "双层玻璃杯",
        description: "耐高温玻璃，简约时尚",
        points: 999,
        image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
        stock: 25,
        category: 1
      },
      {
        id: 2,
        name: "双层玻璃杯",
        description: "耐高温玻璃，简约时尚",
        points: 999,
        image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
        stock: 25,
        category: 1
      },
      {
        id: 2,
        name: "双层玻璃杯",
        description: "耐高温玻璃，简约时尚",
        points: 999,
        image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
        stock: 25,
        category: 1
      },
      {
        id: 2,
        name: "双层玻璃杯",
        description: "耐高温玻璃，简约时尚",
        points: 999,
        image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
        stock: 25,
        category: 1
      },
      {
        id: 2,
        name: "双层玻璃杯",
        description: "耐高温玻璃，简约时尚",
        points: 999,
        image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
        stock: 25,
        category: 1
      },
      {
        id: 2,
        name: "双层玻璃杯",
        description: "耐高温玻璃，简约时尚",
        points: 999,
        image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
        stock: 25,
        category: 1
      }
      // ... 更多礼品数据
    ]);
    common_vendor.ref(null);
    common_vendor.ref(null);
    common_vendor.ref(null);
    const switchCategory = (index) => {
      currentCategory.value = index;
    };
    const goToRecords = () => {
      common_vendor.index.navigateTo({
        url: "/pages/shop/gift/records"
      });
    };
    const showGiftDetail = (gift) => {
      common_vendor.index.navigateTo({
        url: `/pages/shop/gift/detail?id=${gift.id}`
      });
    };
    const exchangeGift = (gift) => {
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(userPoints.value),
        b: common_vendor.t(availableGifts.value),
        c: common_vendor.o(goToRecords),
        d: common_vendor.f(categories.value, (category, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(category.name),
            b: category.badge
          }, category.badge ? {
            c: common_vendor.t(category.badge)
          } : {}, {
            d: currentCategory.value === index
          }, currentCategory.value === index ? {} : {}, {
            e: index,
            f: "category-" + index,
            g: currentCategory.value === index ? 1 : "",
            h: common_vendor.o(($event) => switchCategory(index), index)
          });
        }),
        e: "category-" + currentCategory.value,
        f: common_vendor.f(giftList.value, (gift, k0, i0) => {
          return common_vendor.e({
            a: gift.image,
            b: common_vendor.t(gift.name),
            c: common_vendor.t(gift.description),
            d: common_vendor.t(gift.points),
            e: userPoints.value < gift.points ? 1 : "",
            f: common_vendor.o(($event) => exchangeGift(), gift.id),
            g: gift.stock <= 10
          }, gift.stock <= 10 ? {
            h: common_vendor.t(gift.stock)
          } : {}, {
            i: gift.id,
            j: common_vendor.o(($event) => showGiftDetail(gift), gift.id)
          });
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1492ca1f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/shop/gift/index.js.map
