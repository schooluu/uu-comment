"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const categories = ["全部", "数码", "家具", "服装", "图书", "其他"];
    const goods = [
      {
        title: "iPhone 13",
        price: "3999",
        location: "富邦小区",
        image: "https://example.com/iphone.jpg"
      }
      // ... 更多商品数据
    ];
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(categories, (cat, index, i0) => {
          return {
            a: common_vendor.t(cat),
            b: index
          };
        }),
        b: common_vendor.f(goods, (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.title),
            c: common_vendor.t(item.price),
            d: common_vendor.t(item.location),
            e: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3f58caa7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/city/market/index.js.map
