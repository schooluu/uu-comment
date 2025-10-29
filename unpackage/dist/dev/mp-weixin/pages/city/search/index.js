"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const results = [
      {
        image: "https://example.com/item1.jpg",
        name: "商品1",
        price: "100"
      },
      {
        image: "https://example.com/item2.jpg",
        name: "商品2",
        price: "200"
      }
      // ... 更多搜索结果数据
    ];
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(results, (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.price),
            d: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-008e17c2"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/city/search/index.js.map
