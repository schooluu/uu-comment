"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const orders = [
      {
        image: "https://example.com/order1.jpg",
        name: "商品1",
        status: "已发货",
        price: "100"
      },
      {
        image: "https://example.com/order2.jpg",
        name: "商品2",
        status: "待付款",
        price: "200"
      }
      // ... 更多订单数据
    ];
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(orders, (order, index, i0) => {
          return {
            a: order.image,
            b: common_vendor.t(order.name),
            c: common_vendor.t(order.status),
            d: common_vendor.t(order.price),
            e: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-75abcf2d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/city/orders/index.js.map
