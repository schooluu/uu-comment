"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const userInfo = {
      avatar: "https://example.com/avatar.jpg",
      nickname: "用户昵称",
      id: "888888"
    };
    const menuItems = [
      { name: "我的发布", icon: "📋" },
      { name: "我的收藏", icon: "⭐" },
      { name: "联系客服", icon: "💬" },
      { name: "设置", icon: "⚙️" }
    ];
    return (_ctx, _cache) => {
      return {
        a: userInfo.avatar,
        b: common_vendor.t(userInfo.nickname),
        c: common_vendor.t(userInfo.id),
        d: common_vendor.f(menuItems, (item, index, i0) => {
          return {
            a: common_vendor.t(item.icon),
            b: common_vendor.t(item.name),
            c: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-72000094"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/city/user/index.js.map
