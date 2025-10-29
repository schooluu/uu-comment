"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const merchants = [
      {
        name: "富邦超市",
        image: "https://example.com/shop.jpg",
        tags: ["超市", "生鲜"],
        address: "富邦广场1楼"
      }
      // ... 更多商家数据
    ];
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(merchants, (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.name),
            c: common_vendor.f(item.tags, (tag, idx, i1) => {
              return {
                a: common_vendor.t(tag),
                b: idx
              };
            }),
            d: common_vendor.t(item.address),
            e: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-28792d7d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/city/business/index.js.map
