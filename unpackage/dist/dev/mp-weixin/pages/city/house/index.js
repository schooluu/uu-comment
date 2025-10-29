"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const houses = [
      {
        title: "富邦花园小区",
        desc: "3室2厅 | 120㎡ | 南北通透",
        price: "2300元/月",
        tags: ["拎包入住", "家电齐全"],
        image: "https://example.com/house1.jpg"
      }
      // ... 更多房产数据
    ];
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(houses, (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.title),
            c: common_vendor.t(item.desc),
            d: common_vendor.t(item.price),
            e: common_vendor.f(item.tags, (tag, idx, i1) => {
              return {
                a: common_vendor.t(tag),
                b: idx
              };
            }),
            f: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-958dfcc9"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/city/house/index.js.map
