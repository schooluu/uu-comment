"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const carpools = common_vendor.ref([
      {
        from: "富邦小区",
        to: "市中心",
        date: "2024-01-25",
        price: "20",
        driverAvatar: "https://example.com/driver1.jpg",
        driverName: "张三"
      },
      {
        from: "科技园",
        to: "火车站",
        date: "2024-01-26",
        price: "15",
        driverAvatar: "https://example.com/driver2.jpg",
        driverName: "李四"
      }
      // ... 更多拼车信息
    ]);
    const showDatePicker = () => {
    };
    const showLocationPicker = () => {
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(showDatePicker),
        b: common_vendor.o(showLocationPicker),
        c: common_vendor.o(showLocationPicker),
        d: common_vendor.f(carpools.value, (carpool, index, i0) => {
          return {
            a: common_vendor.t(carpool.from),
            b: common_vendor.t(carpool.to),
            c: common_vendor.t(carpool.date),
            d: common_vendor.t(carpool.price),
            e: carpool.driverAvatar,
            f: common_vendor.t(carpool.driverName),
            g: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-124c8f6e"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/city/carpool/index.js.map
