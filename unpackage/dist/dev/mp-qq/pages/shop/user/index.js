"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const userInfo = common_vendor.ref({
      avatar: "https://example.com/avatar.jpg",
      nickname: "喜茶用户",
      memberLevel: "黑金会员",
      exp: 850
    });
    const stats = [
      { label: "积分", value: "1,280" },
      { label: "优惠券", value: "3" },
      { label: "收藏", value: "12" }
    ];
    const orderTypes = [
      { id: 1, icon: "🛍️", label: "待付款", count: 0 },
      { id: 2, icon: "📦", label: "待发货", count: 1 },
      { id: 3, icon: "🚚", label: "待收货", count: 0 },
      { id: 4, icon: "⭐", label: "待评价", count: 2 },
      { id: 5, icon: "🔄", label: "退换/售后", count: 0 }
    ];
    const features = [
      {
        title: "我的服务",
        items: [
          { id: 1, icon: "📋", label: "收货地址", value: "" },
          { id: 2, icon: "💳", label: "支付管理", value: "" },
          { id: 3, icon: "🎁", label: "邀请有礼", value: "得30元券" },
          { id: 4, icon: "🏆", label: "会员等级", value: "" }
        ]
      },
      {
        title: "更多服务",
        items: [
          { id: 5, icon: "⚙️", label: "设置", value: "" },
          { id: 6, icon: "📞", label: "联系客服", value: "" },
          { id: 7, icon: "❓", label: "帮助中心", value: "" },
          { id: 8, icon: "📢", label: "关于我们", value: "" }
        ]
      }
    ];
    const showQRCode = () => {
      common_vendor.index.navigateTo({
        url: "/pages/shop/member/qrcode"
      });
    };
    const goToOrders = (type = "all") => {
      const typeMap = {
        1: "unpaid",
        // 待付款
        2: "unshipped",
        // 待发货
        3: "shipped",
        // 待收货
        4: "review",
        // 待评价
        5: "refund"
        // 退换/售后
      };
      common_vendor.index.navigateTo({
        url: `/pages/shop/orders/index?type=${typeMap[type] || "all"}`
      });
    };
    const handleFeature = (item) => {
      switch (item.id) {
        case 1:
          common_vendor.index.navigateTo({
            url: "/pages/shop/user/address"
          });
          break;
        case 2:
          common_vendor.index.navigateTo({
            url: "/pages/shop/payment/manage"
          });
          break;
        case 3:
          common_vendor.index.navigateTo({
            url: "/pages/shop/user/invite"
          });
          break;
        case 4:
          common_vendor.index.navigateTo({
            url: "/pages/shop/user/level"
          });
          break;
        case 5:
          common_vendor.index.navigateTo({
            url: "/pages/shop/user/settings"
          });
          break;
        case 6:
          common_vendor.index.makePhoneCall({
            phoneNumber: "400-100-5555"
            // 客服电话
          });
          break;
        case 7:
          common_vendor.index.navigateTo({
            url: "/pages/shop/user/help"
          });
          break;
        case 8:
          common_vendor.index.navigateTo({
            url: "/pages/shop/user/about"
          });
          break;
      }
    };
    const handleStat = (stat) => {
      switch (stat.label) {
        case "积分":
          common_vendor.index.navigateTo({
            url: "/pages/shop/points/index"
          });
          break;
        case "优惠券":
          common_vendor.index.navigateTo({
            url: "/pages/shop/coupon/index"
          });
          break;
        case "收藏":
          common_vendor.index.navigateTo({
            url: "/pages/shop/favorite/index"
          });
          break;
      }
    };
    const handleLogout = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.removeStorageSync("token");
            common_vendor.index.removeStorageSync("userInfo");
            common_vendor.index.reLaunch({
              url: "/pages/shop/login/index"
            });
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: userInfo.value.avatar,
        b: common_vendor.t(userInfo.value.nickname),
        c: common_vendor.t(userInfo.value.memberLevel),
        d: common_vendor.t(userInfo.value.exp),
        e: common_vendor.f(stats, (stat, k0, i0) => {
          return {
            a: common_vendor.t(stat.value),
            b: common_vendor.t(stat.label),
            c: stat.label,
            d: common_vendor.o(($event) => handleStat(stat), stat.label)
          };
        }),
        f: common_vendor.o(showQRCode),
        g: common_vendor.o(goToOrders),
        h: common_vendor.f(orderTypes, (type, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(type.icon),
            b: common_vendor.t(type.label),
            c: type.count
          }, type.count ? {
            d: common_vendor.t(type.count)
          } : {}, {
            e: type.id,
            f: common_vendor.o(($event) => goToOrders(type.id), type.id)
          });
        }),
        i: common_vendor.f(features, (group, index, i0) => {
          return {
            a: common_vendor.t(group.title),
            b: common_vendor.f(group.items, (item, k1, i1) => {
              return common_vendor.e({
                a: common_vendor.t(item.icon),
                b: common_vendor.t(item.label),
                c: item.value
              }, item.value ? {
                d: common_vendor.t(item.value)
              } : {}, {
                e: item.id,
                f: common_vendor.o(($event) => handleFeature(item), item.id)
              });
            }),
            c: index
          };
        }),
        j: common_vendor.o(handleLogout)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7e078e90"]]);
qq.createPage(MiniProgramPage);
