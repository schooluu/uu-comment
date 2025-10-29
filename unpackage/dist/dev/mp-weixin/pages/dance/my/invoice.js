"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "invoice",
  setup(__props) {
    const orders = common_vendor.ref([
      {
        id: 1,
        name: "JAZZ基础课程 30次卡",
        time: "2024-03-15",
        amount: "2999"
      },
      {
        id: 2,
        name: "现代舞私教课程",
        time: "2024-03-10",
        amount: "399"
      }
    ]);
    const selectedOrders = common_vendor.ref([]);
    const invoiceType = common_vendor.ref("personal");
    const title = common_vendor.ref("");
    const taxNumber = common_vendor.ref("");
    const email = common_vendor.ref("");
    const invoiceTypes = [
      { label: "个人", value: "personal" },
      { label: "单位", value: "company" }
    ];
    const toggleOrder = (order) => {
      const index = selectedOrders.value.indexOf(order.id);
      if (index > -1) {
        selectedOrders.value.splice(index, 1);
      } else {
        selectedOrders.value.push(order.id);
      }
    };
    const handleTypeChange = (e) => {
      invoiceType.value = e.detail.value;
    };
    const submit = () => {
      if (selectedOrders.value.length === 0) {
        common_vendor.index.showToast({
          title: "请选择需要开票的订单",
          icon: "none"
        });
        return;
      }
      if (!title.value) {
        common_vendor.index.showToast({
          title: "请输入发票抬头",
          icon: "none"
        });
        return;
      }
      if (invoiceType.value === "company" && !taxNumber.value) {
        common_vendor.index.showToast({
          title: "请输入税号",
          icon: "none"
        });
        return;
      }
      if (!email.value) {
        common_vendor.index.showToast({
          title: "请输入接收邮箱",
          icon: "none"
        });
        return;
      }
      common_vendor.index.showLoading({
        title: "提交中"
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "申请提交成功",
          icon: "success"
        });
        common_vendor.index.navigateBack();
      }, 1500);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(orders.value, (order, k0, i0) => {
          return {
            a: common_vendor.t(order.name),
            b: common_vendor.t(order.time),
            c: common_vendor.t(order.amount),
            d: order.id,
            e: selectedOrders.value.includes(order.id) ? 1 : "",
            f: common_vendor.o(($event) => toggleOrder(order), order.id)
          };
        }),
        b: common_vendor.f(invoiceTypes, (type, k0, i0) => {
          return {
            a: type.value,
            b: type.value === invoiceType.value,
            c: common_vendor.t(type.label),
            d: type.value
          };
        }),
        c: common_vendor.o(handleTypeChange),
        d: title.value,
        e: common_vendor.o(($event) => title.value = $event.detail.value),
        f: invoiceType.value === "company"
      }, invoiceType.value === "company" ? {
        g: taxNumber.value,
        h: common_vendor.o(($event) => taxNumber.value = $event.detail.value)
      } : {}, {
        i: email.value,
        j: common_vendor.o(($event) => email.value = $event.detail.value),
        k: common_vendor.o(submit)
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/dance/my/invoice.js.map
