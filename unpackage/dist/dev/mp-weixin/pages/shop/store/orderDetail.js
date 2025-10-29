"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "orderDetail",
  setup(__props) {
    const order = common_vendor.ref({
      id: "123",
      orderNo: "DD20240101123456",
      status: "waiting",
      pickupCode: "A123",
      pickupTime: "2024-01-01 12:30",
      createTime: "2024-01-01 12:00",
      customerName: "张三",
      customerPhone: "138****8000",
      remark: "不要太甜",
      totalAmount: 52,
      store: {
        id: 1,
        logo: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
        name: "奶茶店大学城店",
        address: "大学城环街1号楼108号",
        phone: "020-88888888"
      },
      goods: [
        {
          id: 1,
          name: "珍珠奶茶",
          price: 12,
          count: 2,
          image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
          description: "珍珠 + 奶茶"
        },
        {
          id: 2,
          name: "芋圆奶茶",
          price: 15,
          count: 1,
          image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
          description: "芋圆 + 奶茶"
        },
        {
          id: 3,
          name: "椰果奶茶",
          price: 13,
          count: 1,
          image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
          description: "椰果 + 奶茶"
        }
      ],
      qrcode: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg"
    });
    const orderStatus = common_vendor.computed(() => {
      const statusMap = {
        waiting: {
          text: "等待取餐",
          desc: "请按时到店取餐，超时订单可能会被取消"
        },
        finished: {
          text: "已完成",
          desc: "订单已完成，欢迎再次光临"
        },
        cancelled: {
          text: "已取消",
          desc: "订单已取消"
        }
      };
      return statusMap[order.value.status];
    });
    const totalCount = common_vendor.computed(() => {
      return order.value.goods.reduce((sum, item) => sum + item.count, 0);
    });
    const contactStore = () => {
      common_vendor.index.makePhoneCall({
        phoneNumber: order.value.store.phone
      });
    };
    const goHome = () => {
      common_vendor.index.navigateTo({
        url: "/pages/shop/home/index"
      });
    };
    const goToStore = () => {
      common_vendor.index.redirectTo({
        url: `/pages/shop/store/goodsList?id=${order.value.store.id}`
      });
    };
    const showQrcode = () => {
      common_vendor.index.previewImage({
        urls: [order.value.qrcode],
        current: 0
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(orderStatus.value.text),
        b: common_vendor.t(orderStatus.value.desc),
        c: order.value.qrcode,
        d: common_vendor.o(showQrcode),
        e: common_vendor.t(order.value.pickupCode),
        f: common_vendor.t(order.value.pickupTime),
        g: order.value.store.logo,
        h: common_vendor.t(order.value.store.name),
        i: common_vendor.t(order.value.store.address),
        j: common_vendor.o(contactStore),
        k: common_vendor.f(order.value.goods, (item, k0, i0) => {
          return common_vendor.e({
            a: item.image,
            b: common_vendor.t(item.name),
            c: item.description
          }, item.description ? {
            d: common_vendor.t(item.description)
          } : {}, {
            e: common_vendor.t(item.price),
            f: common_vendor.t(item.count),
            g: item.id
          });
        }),
        l: common_vendor.t(totalCount.value),
        m: common_vendor.t(order.value.totalAmount),
        n: common_vendor.t(order.value.orderNo),
        o: common_vendor.t(order.value.createTime),
        p: common_vendor.t(order.value.customerName),
        q: common_vendor.t(order.value.customerPhone),
        r: order.value.remark
      }, order.value.remark ? {
        s: common_vendor.t(order.value.remark)
      } : {}, {
        t: common_vendor.o(goHome),
        v: common_vendor.o(goToStore)
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/shop/store/orderDetail.js.map
