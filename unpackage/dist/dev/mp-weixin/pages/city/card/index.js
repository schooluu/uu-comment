"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const userInfo = common_vendor.ref({
      avatar: "https://example.com/avatar.jpg",
      name: "张三",
      title: "销售经理",
      company: "富邦房产",
      tags: ["房产顾问", "3年经验", "优质服务"],
      phone: "13800138000",
      wechat: "zhangsan888",
      email: "zhangsan@example.com",
      introduction: "专注房产销售10年，熟悉本地房产市场，为您提供专业的购房建议和贴心服务。",
      business: ["新房销售", "二手房交易", "房屋租赁", "投资咨询"]
    });
    const handleEdit = () => {
      common_vendor.index.navigateTo({
        url: "/pages/city/card/edit"
      });
    };
    const handleContact = (type) => {
      let content = "";
      switch (type) {
        case "phone":
          content = userInfo.value.phone;
          break;
        case "wechat":
          content = userInfo.value.wechat;
          break;
        case "email":
          content = userInfo.value.email;
          break;
      }
      common_vendor.index.setClipboardData({
        data: content,
        success: () => {
          common_vendor.index.showToast({
            title: "已复制到剪贴板",
            icon: "success"
          });
        }
      });
    };
    const handleShare = () => {
      common_vendor.index.showShareMenu({
        withShareTicket: true,
        menus: ["shareAppMessage", "shareTimeline"]
      });
    };
    const handleSave = () => {
      common_vendor.index.showLoading({
        title: "生成图片中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "保存成功",
          icon: "success"
        });
      }, 1500);
    };
    return (_ctx, _cache) => {
      return {
        a: userInfo.value.avatar,
        b: common_vendor.t(userInfo.value.name),
        c: common_vendor.t(userInfo.value.title),
        d: common_vendor.t(userInfo.value.company),
        e: common_vendor.f(userInfo.value.tags, (tag, index, i0) => {
          return {
            a: common_vendor.t(tag),
            b: index
          };
        }),
        f: common_vendor.o(handleEdit),
        g: common_vendor.t(userInfo.value.phone),
        h: common_vendor.o(($event) => handleContact("phone")),
        i: common_vendor.t(userInfo.value.wechat),
        j: common_vendor.o(($event) => handleContact("wechat")),
        k: common_vendor.t(userInfo.value.email),
        l: common_vendor.o(($event) => handleContact("email")),
        m: common_vendor.t(userInfo.value.introduction),
        n: common_vendor.f(userInfo.value.business, (business, index, i0) => {
          return {
            a: common_vendor.t(business),
            b: index
          };
        }),
        o: common_vendor.o(handleShare),
        p: common_vendor.o(handleSave)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a34abe2f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/city/card/index.js.map
