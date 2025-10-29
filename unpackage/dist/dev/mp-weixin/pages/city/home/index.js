"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      currentTab: 0,
      features: [
        { name: "土地房产", emoji: "🏘️", badge: "热" },
        { name: "求职招聘", emoji: "💼", badge: "急" },
        { name: "闲置买卖", emoji: "🛍️" },
        { name: "车辆买卖", emoji: "🚗" },
        { name: "商户信息", emoji: "📢" },
        { name: "帮忙求助", emoji: "🆘" },
        { name: "同城活动", emoji: "🎉" },
        { name: "家有宠物", emoji: "🐱" },
        { name: "寻人找物", emoji: "🔍" },
        { name: "顺风拼车", emoji: "🚙" }
      ],
      tabs: [
        { name: "首页", emoji: "🏠" },
        { name: "商圈", emoji: "🏪" },
        { name: "发布", emoji: "➕" },
        { name: "名片", emoji: "👤" },
        { name: "我的", emoji: "😊" }
      ],
      merchants: [
        {
          name: "富邦超市",
          image: "https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/微信图片_20241123192816.png",
          tags: ["超市", "生鲜"],
          address: "富邦广场1楼"
        },
        {
          name: "富邦餐厅",
          image: "https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/微信图片_20241123192816.png",
          tags: ["美食", "特色"],
          address: "富邦广场2楼"
        }
      ],
      searchKeyword: ""
    };
  },
  methods: {
    handleFeatureClick(item) {
      switch (item.name) {
        case "土地房产":
          common_vendor.index.navigateTo({ url: "/pages/city/house/index" });
          break;
        case "求职招聘":
          common_vendor.index.navigateTo({ url: "/pages/city/job/index" });
          break;
        case "闲置买卖":
          common_vendor.index.navigateTo({ url: "/pages/city/market/index" });
          break;
        case "车辆买卖":
          common_vendor.index.navigateTo({ url: "/pages/city/car/index" });
          break;
        case "商户信息":
          common_vendor.index.navigateTo({ url: "/pages/city/business/index" });
          break;
        case "顺风拼车":
          common_vendor.index.navigateTo({ url: "/pages/city/carpool/index" });
          break;
        default:
          common_vendor.index.showToast({
            title: "功能开发中...",
            icon: "none"
          });
      }
    },
    handleTabClick(tab, index) {
      switch (tab.name) {
        case "首页":
          this.currentTab = index;
          common_vendor.index.reLaunch({ url: "/pages/city/home/index" });
          break;
        case "商圈":
          this.currentTab = index;
          common_vendor.index.navigateTo({ url: "/pages/city/business/index" });
          break;
        case "发布":
          common_vendor.index.navigateTo({ url: "/pages/city/publish/index" });
          break;
        case "名片":
          this.currentTab = index;
          common_vendor.index.navigateTo({ url: "/pages/city/card/index" });
          break;
        case "我的":
          this.currentTab = index;
          common_vendor.index.navigateTo({ url: "/pages/city/user/index" });
          break;
      }
    },
    handleMenuClick(type) {
      switch (type) {
        case "market":
          common_vendor.index.navigateTo({ url: "/pages/city/market/index" });
          break;
        case "carpool":
          common_vendor.index.navigateTo({ url: "/pages/city/carpool/index" });
          break;
        case "job":
          common_vendor.index.navigateTo({ url: "/pages/city/job/index" });
          break;
        case "house":
          common_vendor.index.navigateTo({ url: "/pages/city/house/index" });
          break;
      }
    },
    handleMerchantClick(merchant) {
      common_vendor.index.navigateTo({
        url: `/pages/city/merchant/index?id=${merchant.id}`
      });
    },
    showCategoryPicker() {
      common_vendor.index.showActionSheet({
        itemList: ["全部", "房产", "招聘", "二手", "拼车"],
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/city/home/index.vue:262", "选择分类:", res.tapIndex);
        }
      });
    },
    handleSearch(e) {
      common_vendor.index.navigateTo({
        url: `/pages/city/search/index?keyword=${this.searchKeyword}`
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.showCategoryPicker && $options.showCategoryPicker(...args)),
    b: common_vendor.o((...args) => $options.handleSearch && $options.handleSearch(...args)),
    c: $data.searchKeyword,
    d: common_vendor.o(($event) => $data.searchKeyword = $event.detail.value),
    e: common_vendor.f($data.features, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.emoji),
        b: item.badge
      }, item.badge ? {
        c: common_vendor.t(item.badge)
      } : {}, {
        d: common_vendor.t(item.name),
        e: index,
        f: common_vendor.o(($event) => $options.handleFeatureClick(item), index)
      });
    }),
    f: common_vendor.f($data.tabs, (tab, index, i0) => {
      return {
        a: common_vendor.t(tab.emoji),
        b: common_vendor.t(tab.name),
        c: index,
        d: common_vendor.n({
          active: $data.currentTab === index
        }),
        e: common_vendor.o(($event) => $options.handleTabClick(tab, index), index)
      };
    }),
    g: common_vendor.o(($event) => $options.handleMenuClick("market")),
    h: common_vendor.o(($event) => $options.handleMenuClick("carpool")),
    i: common_vendor.o(($event) => $options.handleMenuClick("job")),
    j: common_vendor.o(($event) => $options.handleMenuClick("house")),
    k: common_vendor.f($data.merchants, (merchant, index, i0) => {
      return {
        a: merchant.image,
        b: merchant.name,
        c: common_vendor.t(merchant.name),
        d: common_vendor.f(merchant.tags, (tag, tagIndex, i1) => {
          return {
            a: common_vendor.t(tag),
            b: tagIndex
          };
        }),
        e: common_vendor.t(merchant.address),
        f: index,
        g: common_vendor.o(($event) => $options.handleMerchantClick(merchant), index)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-922cee37"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/city/home/index.js.map
