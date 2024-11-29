"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const currentTab = common_vendor.ref(0);
    const switchTab = (index) => {
      currentTab.value = index;
      switch (index) {
        case 0:
          common_vendor.index.switchTab({
            url: "/pages/shop/home/index"
          });
          break;
        case 1:
          common_vendor.index.navigateTo({
            url: "/pages/shop/store/list"
          });
          break;
        case 2:
          common_vendor.index.navigateTo({
            url: "/pages/shop/cart/index"
          });
          break;
        case 3:
          common_vendor.index.navigateTo({
            url: "/pages/shop/gift/index"
          });
          break;
        case 4:
          common_vendor.index.navigateTo({
            url: "/pages/shop/user/index"
          });
          break;
      }
    };
    const handleFeatureClick = (index) => {
      switch (index) {
        case 0:
          common_vendor.index.navigateTo({
            url: "/pages/shop/store/list"
          });
          break;
        case 1:
          common_vendor.index.navigateTo({
            url: "/pages/shop/store/list"
          });
          break;
        case 2:
          common_vendor.index.navigateTo({
            url: "/pages/shop/mall/index"
          });
          break;
        case 3:
          common_vendor.index.navigateTo({
            url: "/pages/shop/group/index"
          });
          break;
      }
    };
    const handlePointsClick = () => {
      common_vendor.index.navigateTo({
        url: "/pages/shop/points/index"
      });
    };
    const features = [
      {
        icon: "🏪",
        text: "门店自取",
        desc: "下单免排队"
      },
      {
        icon: "🛵",
        text: "外卖",
        desc: "无需接触 送至到家"
      },
      {
        icon: "🎁",
        text: "喜茶百货",
        desc: "甄选好物 正品保障"
      },
      {
        icon: "🏢",
        text: "企业团餐",
        desc: "50份起送"
      }
    ];
    const tabs = [
      { icon: "🏠", text: "首页" },
      { icon: "📋", text: "点单" },
      { icon: "🛒", text: "购物车" },
      { icon: "🎁", text: "礼品" },
      { icon: "👤", text: "我的" }
    ];
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(features, (item, index, i0) => {
          return {
            a: common_vendor.t(item.icon),
            b: common_vendor.t(item.text),
            c: common_vendor.t(item.desc),
            d: index,
            e: common_vendor.o(($event) => handleFeatureClick(index), index)
          };
        }),
        b: common_vendor.o(handlePointsClick),
        c: common_vendor.f(tabs, (tab, index, i0) => {
          return {
            a: common_vendor.t(tab.icon),
            b: common_vendor.t(tab.text),
            c: index,
            d: currentTab.value === index ? 1 : "",
            e: common_vendor.o(($event) => switchTab(index), index)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d597d7ac"]]);
qq.createPage(MiniProgramPage);
