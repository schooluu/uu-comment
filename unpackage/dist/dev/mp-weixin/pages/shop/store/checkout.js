"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "checkout",
  setup(__props) {
    const store = common_vendor.ref({
      id: 1,
      logo: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
      name: "奶茶店大学城店",
      address: "大学城环街1号楼108号"
    });
    const cartList = common_vendor.ref([
      {
        id: 1,
        name: "珍珠奶茶",
        price: 12,
        count: 2,
        image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
        description: "珍珠 + 奶茶",
        originalPrice: 15
      },
      {
        id: 2,
        name: "芋圆奶茶",
        price: 15,
        count: 1,
        image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
        description: "芋圆 + 奶茶",
        originalPrice: 18
      },
      {
        id: 3,
        name: "椰果奶茶",
        price: 13,
        count: 1,
        image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
        description: "椰果 + 奶茶"
      }
    ]);
    const pickupTime = common_vendor.ref("");
    const remark = common_vendor.ref("");
    const customerName = common_vendor.ref("张三");
    const customerPhone = common_vendor.ref("13800138000");
    const deliveryType = common_vendor.ref("pickup");
    const deliveryTime = common_vendor.ref("");
    const address = common_vendor.ref(null);
    const totalCount = common_vendor.computed(() => {
      return cartList.value.reduce((sum, item) => sum + item.count, 0);
    });
    const totalPrice = common_vendor.computed(() => {
      var _a;
      if (!((_a = cartList.value) == null ? void 0 : _a.length))
        return 0;
      return cartList.value.reduce((sum, item) => {
        const price = Number(item.price) || 0;
        const count = Number(item.count) || 0;
        return sum + price * count;
      }, 0);
    });
    common_vendor.computed(() => {
      const baseConditions = customerName.value && customerPhone.value && /^1[3-9]\d{9}$/.test(customerPhone.value) && cartList.value.length > 0;
      if (deliveryType.value === "pickup") {
        return baseConditions && pickupTime.value;
      } else {
        return baseConditions && deliveryTime.value && address.value;
      }
    });
    const onTimeChange = (e) => {
      pickupTime.value = e.detail.value;
    };
    const onDeliveryTimeChange = (e) => {
      deliveryTime.value = e.detail.value;
    };
    const chooseAddress = () => {
      common_vendor.index.navigateTo({
        url: "/pages/shop/user/address"
      });
    };
    const submitOrder = async () => {
      try {
        common_vendor.index.showLoading({ title: "提交中..." });
        await new Promise((resolve) => setTimeout(resolve, 1500));
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "下单成功",
          icon: "success"
        });
        common_vendor.index.removeStorageSync("cartItems");
        setTimeout(() => {
          common_vendor.index.redirectTo({
            url: "/pages/shop/store/orderDetail?id=123"
          });
        }, 1500);
      } catch (error) {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "下单失败",
          icon: "none"
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: deliveryType.value === "pickup" ? 1 : "",
        b: common_vendor.o(($event) => deliveryType.value = "pickup"),
        c: deliveryType.value === "delivery" ? 1 : "",
        d: common_vendor.o(($event) => deliveryType.value = "delivery"),
        e: store.value.logo,
        f: common_vendor.t(store.value.name),
        g: common_vendor.t(store.value.address),
        h: deliveryType.value === "pickup"
      }, deliveryType.value === "pickup" ? {
        i: common_vendor.t(pickupTime.value || "请选择取餐时间"),
        j: pickupTime.value,
        k: common_vendor.o(onTimeChange)
      } : {}, {
        l: deliveryType.value === "delivery"
      }, deliveryType.value === "delivery" ? {
        m: common_vendor.t(deliveryTime.value || "请选择配送时间"),
        n: deliveryTime.value,
        o: common_vendor.o(onDeliveryTimeChange)
      } : {}, {
        p: deliveryType.value === "delivery"
      }, deliveryType.value === "delivery" ? common_vendor.e({
        q: address.value
      }, address.value ? {
        r: common_vendor.t(address.value.name),
        s: common_vendor.t(address.value.phone),
        t: common_vendor.t(address.value.fullAddress)
      } : {}, {
        v: common_vendor.o(chooseAddress)
      }) : {}, {
        w: common_vendor.t(totalCount.value),
        x: common_vendor.f(cartList.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.image,
            b: common_vendor.t(item.name),
            c: item.description
          }, item.description ? {
            d: common_vendor.t(item.description)
          } : {}, {
            e: common_vendor.t(item.price),
            f: item.originalPrice
          }, item.originalPrice ? {
            g: common_vendor.t(item.originalPrice)
          } : {}, {
            h: common_vendor.t(item.count),
            i: item.id
          });
        }),
        y: remark.value,
        z: common_vendor.o(($event) => remark.value = $event.detail.value),
        A: customerName.value,
        B: common_vendor.o(($event) => customerName.value = $event.detail.value),
        C: customerPhone.value,
        D: common_vendor.o(($event) => customerPhone.value = $event.detail.value),
        E: common_vendor.t(totalPrice.value),
        F: common_vendor.o(submitOrder)
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/shop/store/checkout.js.map
