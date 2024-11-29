"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const orderTabs = [
      { type: "all", name: "全部订单", count: 0 },
      { type: "unpaid", name: "待付款", count: 2 },
      { type: "unshipped", name: "待发货", count: 1 },
      { type: "shipped", name: "待收货", count: 0 },
      { type: "review", name: "待评价", count: 3 },
      { type: "refund", name: "退款/售后", count: 0 }
    ];
    const currentTab = common_vendor.ref("all");
    const getTabIcon = (type) => {
      const iconMap = {
        all: "📋",
        unpaid: "💰",
        unshipped: "📦",
        shipped: "🚚",
        completed: "✅",
        cancelled: "❌"
      };
      return iconMap[type] || "📋";
    };
    const orderList = common_vendor.ref([
      {
        id: "1",
        shopName: "喜茶商城",
        createTime: "2024-01-20 14:30",
        status: "unpaid",
        statusText: "待付款",
        countdown: 1800,
        // 剩余支付时间（秒）
        goodsList: [
          {
            id: "1",
            image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
            name: "喜茶经典杯套装",
            spec: "经典款 / 2个装",
            price: "99.00",
            quantity: 1
          }
        ],
        totalQuantity: 1,
        totalAmount: "99.00"
      },
      {
        id: "2",
        shopName: "喜茶商城",
        createTime: "2024-01-19 15:20",
        status: "unshipped",
        statusText: "待发货",
        goodsList: [
          {
            id: "2",
            image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
            name: "喜茶联名保温杯",
            spec: "樱花粉 / 473ml",
            price: "199.00",
            quantity: 1
          },
          {
            id: "3",
            image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
            name: "喜茶经典帆布包",
            spec: "米白色",
            price: "129.00",
            quantity: 2
          }
        ],
        totalQuantity: 3,
        totalAmount: "457.00"
      },
      {
        id: "3",
        shopName: "喜茶商城",
        createTime: "2024-01-18 10:15",
        status: "shipped",
        statusText: "待收货",
        expressInfo: {
          company: "顺丰速运",
          number: "SF1234567890",
          status: "运输中",
          updateTime: "2024-01-19 09:30"
        },
        goodsList: [
          {
            id: "4",
            image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
            name: "喜茶甜品礼盒",
            spec: "综合口味 / 12枚装",
            price: "168.00",
            quantity: 1
          }
        ],
        totalQuantity: 1,
        totalAmount: "168.00"
      },
      {
        id: "4",
        shopName: "喜茶商城",
        createTime: "2024-01-17 16:40",
        status: "completed",
        statusText: "已完成",
        goodsList: [
          {
            id: "5",
            image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
            name: "喜茶联名T恤",
            spec: "白色 / M码",
            price: "199.00",
            quantity: 1
          }
        ],
        totalQuantity: 1,
        totalAmount: "199.00",
        isReviewed: false
      },
      {
        id: "5",
        shopName: "喜茶商城",
        createTime: "2024-01-16 11:25",
        status: "refunding",
        statusText: "退款中",
        refundInfo: {
          reason: "商品质量问题",
          amount: "299.00",
          status: "商家处理中",
          submitTime: "2024-01-17 09:15"
        },
        goodsList: [
          {
            id: "6",
            image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
            name: "喜茶复古马克杯",
            spec: "蓝色 / 350ml",
            price: "299.00",
            quantity: 1
          }
        ],
        totalQuantity: 1,
        totalAmount: "299.00"
      },
      {
        id: "6",
        shopName: "喜茶商城",
        createTime: "2024-01-15 14:50",
        status: "cancelled",
        statusText: "已取消",
        cancelReason: "超时未支付",
        goodsList: [
          {
            id: "7",
            image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
            name: "喜茶联名手机壳",
            spec: "iPhone 14 Pro",
            price: "129.00",
            quantity: 1
          },
          {
            id: "8",
            image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
            name: "喜茶钥匙扣",
            spec: "银色",
            price: "39.00",
            quantity: 2
          }
        ],
        totalQuantity: 3,
        totalAmount: "207.00"
      },
      {
        id: "7",
        shopName: "喜茶商城",
        createTime: "2024-01-14 09:30",
        status: "completed",
        statusText: "已完成",
        goodsList: [
          {
            id: "9",
            image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
            name: "喜茶联名帽子",
            spec: "黑色",
            price: "159.00",
            quantity: 1
          }
        ],
        totalQuantity: 1,
        totalAmount: "159.00",
        isReviewed: true,
        reviewInfo: {
          rating: 5,
          content: "帽子质量很好，做工精致，很喜欢！",
          images: ["https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg", "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg"],
          createTime: "2024-01-16 15:20"
        }
      }
    ]);
    const getOrderButtons = (status) => {
      const buttons = {
        unpaid: [
          { type: "cancel", text: "取消订单" },
          { type: "pay", text: "立即付款" }
        ],
        unshipped: [
          { type: "remind", text: "提醒发货" }
        ],
        shipped: [
          { type: "logistics", text: "查看物流" },
          { type: "confirm", text: "确认收货" }
        ],
        completed: [
          { type: "review", text: "评价" },
          { type: "rebuy", text: "再次购买" }
        ]
      };
      return buttons[status] || [];
    };
    const handleOrderAction = (type, order) => {
      switch (type) {
        case "pay":
          common_vendor.index.navigateTo({
            url: `/pages/shop/payment/index?orderId=${order.id}`
          });
          break;
        case "cancel":
          common_vendor.index.showModal({
            title: "提示",
            content: "确定要取消该订单吗？",
            success: (res) => {
              if (res.confirm)
                ;
            }
          });
          break;
      }
    };
    const switchTab = (type) => {
      currentTab.value = type;
    };
    common_vendor.onMounted(() => {
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(orderTabs, (tab, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(getTabIcon(tab.type)),
            b: common_vendor.t(tab.name),
            c: tab.count
          }, tab.count ? {
            d: common_vendor.t(tab.count > 99 ? "99+" : tab.count)
          } : {}, {
            e: currentTab.value === tab.type
          }, currentTab.value === tab.type ? {} : {}, {
            f: tab.type,
            g: "tab-" + tab.type,
            h: currentTab.value === tab.type ? 1 : "",
            i: common_vendor.o(($event) => switchTab(tab.type), tab.type)
          });
        }),
        b: "tab-" + currentTab.value,
        c: common_vendor.f(orderList.value, (order, k0, i0) => {
          return {
            a: common_vendor.t(order.shopName),
            b: common_vendor.t(order.createTime),
            c: common_vendor.t(order.statusText),
            d: common_vendor.f(order.goodsList, (goods, k1, i1) => {
              return {
                a: goods.image,
                b: common_vendor.t(goods.name),
                c: common_vendor.t(goods.spec),
                d: common_vendor.t(goods.price),
                e: common_vendor.t(goods.quantity),
                f: goods.id
              };
            }),
            e: common_vendor.t(order.totalQuantity),
            f: common_vendor.t(order.totalAmount),
            g: common_vendor.f(getOrderButtons(order.status), (btn, k1, i1) => {
              return {
                a: common_vendor.t(btn.text),
                b: btn.type,
                c: common_vendor.n(btn.type),
                d: common_vendor.o(($event) => handleOrderAction(btn.type, order), btn.type)
              };
            }),
            h: order.id,
            i: common_vendor.o(($event) => _ctx.goToOrderDetail(order), order.id)
          };
        }),
        d: !orderList.value.length
      }, !orderList.value.length ? {
        e: common_assets._imports_0$6
      } : {}, {
        f: orderList.value.length
      }, orderList.value.length ? {
        g: common_vendor.t(_ctx.hasMore ? "加载中..." : "没有更多了")
      } : {}, {
        h: common_vendor.o((...args) => _ctx.loadMore && _ctx.loadMore(...args)),
        i: _ctx.isRefreshing,
        j: common_vendor.o((...args) => _ctx.onRefresh && _ctx.onRefresh(...args))
      });
    };
  }
};
qq.createPage(_sfc_main);
