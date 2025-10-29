"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "record",
  setup(__props) {
    const currentDate = common_vendor.ref("2024年3月");
    const records = common_vendor.ref([
      {
        id: 1,
        type: "购买课程",
        time: "2024-03-15 14:30",
        amount: "399",
        amountType: "minus",
        status: "交易成功"
      },
      {
        id: 2,
        type: "课程退款",
        time: "2024-03-10 16:20",
        amount: "199",
        amountType: "plus",
        status: "退款成功"
      }
    ]);
    const handleDateChange = (e) => {
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(currentDate.value),
        b: common_vendor.o(handleDateChange),
        c: common_vendor.f(records.value, (record, k0, i0) => {
          return {
            a: common_vendor.t(record.type),
            b: common_vendor.t(record.time),
            c: common_vendor.t(record.amountType === "minus" ? "-" : "+"),
            d: common_vendor.t(record.amount),
            e: common_vendor.n(record.amountType),
            f: common_vendor.t(record.status),
            g: record.id
          };
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/dance/my/record.js.map
