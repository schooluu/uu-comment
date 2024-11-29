"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const banners = [
      { id: 1, image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg" },
      { id: 2, image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg" }
    ];
    const categories = [
      { id: 1, name: "新品上市", icon: "🆕" },
      { id: 2, name: "限定周边", icon: "⭐" },
      { id: 3, name: "潮流服饰", icon: "👕" },
      { id: 4, name: "生活用品", icon: "🏠" },
      { id: 5, name: "礼品卡", icon: "🎁" },
      { id: 6, name: "联名系列", icon: "🤝" },
      { id: 7, name: "茶具", icon: "🫖" },
      { id: 8, name: "更多", icon: "📦" }
    ];
    const products = [
      {
        id: 1,
        name: "喜茶保温杯",
        desc: "316不锈钢内胆",
        price: "139",
        image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg"
      },
      {
        id: 1,
        name: "喜茶保温杯",
        desc: "316不锈钢内胆",
        price: "139",
        image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg"
      },
      {
        id: 1,
        name: "喜茶保温杯",
        desc: "316不锈钢内胆",
        price: "139",
        image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg"
      },
      {
        id: 1,
        name: "喜茶保温杯",
        desc: "316不锈钢内胆",
        price: "139",
        image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg"
      },
      {
        id: 1,
        name: "喜茶保温杯",
        desc: "316不锈钢内胆",
        price: "139",
        image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg"
      },
      {
        id: 1,
        name: "喜茶保温杯",
        desc: "316不锈钢内胆",
        price: "139",
        image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg"
      },
      {
        id: 1,
        name: "喜茶保温杯",
        desc: "316不锈钢内胆",
        price: "139",
        image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg"
      },
      {
        id: 1,
        name: "喜茶保温杯",
        desc: "316不锈钢内胆",
        price: "139",
        image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg"
      },
      {
        id: 1,
        name: "喜茶保温杯",
        desc: "316不锈钢内胆",
        price: "139",
        image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg"
      },
      {
        id: 1,
        name: "喜茶保温杯",
        desc: "316不锈钢内胆",
        price: "139",
        image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg"
      },
      {
        id: 1,
        name: "喜茶保温杯",
        desc: "316不锈钢内胆",
        price: "139",
        image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg"
      }
      // ... 更多商品
    ];
    const goToCategory = (category) => {
      common_vendor.index.showToast({
        title: `进入${category.name}分类`,
        icon: "none"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(banners, (banner, k0, i0) => {
          return {
            a: banner.image,
            b: banner.id
          };
        }),
        b: common_vendor.f(categories, (category, k0, i0) => {
          return {
            a: common_vendor.t(category.icon),
            b: common_vendor.t(category.name),
            c: category.id,
            d: common_vendor.o(($event) => goToCategory(category), category.id)
          };
        }),
        c: common_vendor.o((...args) => _ctx.goToMore && _ctx.goToMore(...args)),
        d: common_vendor.f(products, (product, k0, i0) => {
          return common_vendor.e({
            a: product.image,
            b: common_vendor.t(product.name),
            c: common_vendor.t(product.desc),
            d: common_vendor.t(product.price),
            e: product.originalPrice
          }, product.originalPrice ? {
            f: common_vendor.t(product.originalPrice)
          } : {}, {
            g: product.id,
            h: common_vendor.o(($event) => _ctx.goToDetail(product), product.id)
          });
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-16fef13b"]]);
qq.createPage(MiniProgramPage);
