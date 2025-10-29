"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "coupon",
  setup(__props) {
    const tabs = ["未使用", "已使用", "已过期"];
    const currentTab = common_vendor.ref(0);
    const coupons = common_vendor.ref([
      {
        id: 1,
        amount: 100,
        condition: 500,
        name: "新人专享券",
        validity: "2024.12.31",
        description: "仅限常规课程使用"
      },
      {
        id: 2,
        amount: 50,
        condition: 300,
        name: "生日特惠券",
        validity: "2024.12.31",
        description: "全场通用"
      }
    ]);
    const switchTab = (index) => {
      currentTab.value = index;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(tabs, (tab, index, i0) => {
          return {
            a: common_vendor.t(tab),
            b: index,
            c: currentTab.value === index ? 1 : "",
            d: common_vendor.o(($event) => switchTab(index), index)
          };
        }),
        b: common_vendor.f(coupons.value, (coupon, k0, i0) => {
          return {
            a: common_vendor.t(coupon.amount),
            b: common_vendor.t(coupon.condition),
            c: common_vendor.t(coupon.name),
            d: common_vendor.t(coupon.validity),
            e: common_vendor.t(coupon.description),
            f: coupon.id
          };
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/dance/my/coupon.js.map
