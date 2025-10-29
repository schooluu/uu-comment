"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const advantages = [
      { id: 1, icon: "🎯", text: "专属定制" },
      { id: 2, icon: "🚚", text: "准时配送" },
      { id: 3, icon: "💰", text: "优惠价格" },
      { id: 4, icon: "👨‍👩‍👦‍👦", text: "专业服务" }
    ];
    const packages = [
      {
        id: 1,
        name: "商务简餐",
        desc: "经典茶饮+精选小食",
        price: "25",
        image: "https://example.com/package1.jpg"
      }
      // ... 更多套餐
    ];
    const steps = [
      "在线咨询",
      "需求确认",
      "方案制定",
      "签订合同",
      "开始供餐"
    ];
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(advantages, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.icon),
            b: common_vendor.t(item.text),
            c: item.id
          };
        }),
        b: common_vendor.f(packages, (pkg, k0, i0) => {
          return {
            a: pkg.image,
            b: common_vendor.t(pkg.name),
            c: common_vendor.t(pkg.desc),
            d: common_vendor.t(pkg.price),
            e: pkg.id
          };
        }),
        c: common_vendor.f(steps, (step, index, i0) => {
          return {
            a: common_vendor.t(index + 1),
            b: common_vendor.t(step),
            c: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-719aadc1"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/shop/group/index.js.map
