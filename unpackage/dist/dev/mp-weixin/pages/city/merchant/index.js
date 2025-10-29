"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const merchant = {
      name: "富邦超市",
      image: "https://example.com/merchant.jpg",
      address: "富邦广场1楼",
      tags: ["超市", "生鲜"],
      products: [
        {
          image: "https://example.com/product1.jpg",
          name: "苹果",
          price: "5"
        },
        {
          image: "https://example.com/product2.jpg",
          name: "香蕉",
          price: "3"
        }
        // ... 更多商品数据
      ]
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(merchant.name),
        b: merchant.image,
        c: common_vendor.t(merchant.address),
        d: common_vendor.f(merchant.tags, (tag, index, i0) => {
          return {
            a: common_vendor.t(tag),
            b: index
          };
        }),
        e: common_vendor.f(merchant.products, (product, index, i0) => {
          return {
            a: product.image,
            b: common_vendor.t(product.name),
            c: common_vendor.t(product.price),
            d: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1d861fa7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/city/merchant/index.js.map
