"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const categories = [
      { name: "房产出租", icon: "🏠" },
      { name: "二手交易", icon: "🛍️" },
      { name: "招聘求职", icon: "💼" },
      { name: "顺风车", icon: "🚗" },
      { name: "生活服务", icon: "🔧" },
      { name: "商家推广", icon: "📢" }
    ];
    const handleSelect = (item) => {
      common_vendor.index.__f__("log", "at pages/city/publish/index.vue:30", "选择发布类型:", item.name);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(categories, (item, index, i0) => {
          return {
            a: common_vendor.t(item.icon),
            b: common_vendor.t(item.name),
            c: index,
            d: common_vendor.o(($event) => handleSelect(item), index)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c947bfad"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/city/publish/index.js.map
