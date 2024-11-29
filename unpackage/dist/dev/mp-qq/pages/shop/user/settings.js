"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "settings",
  setup(__props) {
    const userInfo = common_vendor.ref({
      phone: "138****8888",
      email: "ex***@example.com"
    });
    const privacy = common_vendor.ref({
      profilePublic: true,
      notifications: true
    });
    const settings = common_vendor.ref({
      language: "简体中文"
    });
    const appVersion = common_vendor.ref("1.0.0");
    const cacheSize = common_vendor.ref("23.5MB");
    const handleSetting = (type) => {
      switch (type) {
        case "password":
          common_vendor.index.navigateTo({ url: "/pages/shop/user/password" });
          break;
        case "phone":
          common_vendor.index.navigateTo({ url: "/pages/shop/user/phone" });
          break;
        case "email":
          common_vendor.index.navigateTo({ url: "/pages/shop/user/email" });
          break;
        case "language":
          common_vendor.index.showActionSheet({
            itemList: ["简体中文", "English", "日本語"],
            success: (res) => {
              settings.value.language = ["简体中文", "English", "日本語"][res.tapIndex];
            }
          });
          break;
        case "clearCache":
          common_vendor.index.showModal({
            title: "提示",
            content: "确定要清除缓存吗？",
            success: (res) => {
              if (res.confirm) {
                common_vendor.index.showToast({
                  title: "清除成功",
                  icon: "success"
                });
                cacheSize.value = "0B";
              }
            }
          });
          break;
        case "about":
          common_vendor.index.navigateTo({ url: "/pages/shop/about/index" });
          break;
      }
    };
    const handlePrivacyChange = (type) => {
      privacy.value[type] = !privacy.value[type];
    };
    const handleLogout = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.clearStorageSync();
            common_vendor.index.reLaunch({
              url: "/pages/shop/login/index"
            });
          }
        }
      });
    };
    const handleDeleteAccount = () => {
      common_vendor.index.showModal({
        title: "警告",
        content: "账号注销后将无法恢复，确定要继续吗？",
        confirmColor: "#ff4444",
        success: (res) => {
          if (res.confirm)
            ;
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => handleSetting("password")),
        b: common_vendor.t(userInfo.value.phone || "未绑定"),
        c: common_vendor.o(($event) => handleSetting("phone")),
        d: common_vendor.t(userInfo.value.email || "未绑定"),
        e: common_vendor.o(($event) => handleSetting("email")),
        f: privacy.value.profilePublic,
        g: common_vendor.o(($event) => handlePrivacyChange("profilePublic")),
        h: privacy.value.notifications,
        i: common_vendor.o(($event) => handlePrivacyChange("notifications")),
        j: common_vendor.t(settings.value.language),
        k: common_vendor.o(($event) => handleSetting("language")),
        l: common_vendor.t(cacheSize.value),
        m: common_vendor.o(($event) => handleSetting("clearCache")),
        n: common_vendor.t(appVersion.value),
        o: common_vendor.o(($event) => handleSetting("about")),
        p: common_vendor.o(handleLogout),
        q: common_vendor.o(handleDeleteAccount)
      };
    };
  }
};
qq.createPage(_sfc_main);
