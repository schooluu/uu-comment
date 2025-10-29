"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const userInfo = common_vendor.ref({
      name: "张三",
      phone: "138****8888"
    });
    const settings = common_vendor.ref({
      newMessageNotify: true,
      soundNotify: true,
      vibrateNotify: false,
      darkMode: false
    });
    const version = common_vendor.ref("1.0.0");
    const cacheSize = common_vendor.ref("23.5MB");
    const fontSizes = ["小", "标准", "大", "特大"];
    const fontSizeIndex = common_vendor.ref(1);
    const toggleSetting = (key) => {
      settings.value[key] = !settings.value[key];
      common_vendor.index.setStorageSync("settings", settings.value);
    };
    const navigateTo = (url) => {
      common_vendor.index.navigateTo({ url });
    };
    const clearCache = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要清除缓存吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showLoading({
              title: "清理中..."
            });
            setTimeout(() => {
              common_vendor.index.hideLoading();
              cacheSize.value = "0B";
              common_vendor.index.showToast({
                title: "清理完成",
                icon: "success"
              });
            }, 1500);
          }
        }
      });
    };
    const checkUpdate = () => {
      common_vendor.index.showLoading({
        title: "检查中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "已是最新版本",
          icon: "success"
        });
      }, 1500);
    };
    const handleFontSizeChange = (e) => {
      fontSizeIndex.value = e.detail.value;
      common_vendor.index.setStorageSync("fontSize", fontSizeIndex.value);
    };
    const handleLogout = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.clearStorageSync();
            common_vendor.index.reLaunch({
              url: "/pages/login/index"
            });
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(userInfo.value.name),
        b: common_vendor.o(($event) => navigateTo("/pages/city/settings/profile")),
        c: common_vendor.o(($event) => navigateTo("/pages/city/settings/security")),
        d: common_vendor.o(($event) => navigateTo("/pages/city/settings/privacy")),
        e: settings.value.newMessageNotify,
        f: common_vendor.o(($event) => toggleSetting("newMessageNotify")),
        g: settings.value.soundNotify,
        h: common_vendor.o(($event) => toggleSetting("soundNotify")),
        i: settings.value.vibrateNotify,
        j: common_vendor.o(($event) => toggleSetting("vibrateNotify")),
        k: common_vendor.t(cacheSize.value),
        l: common_vendor.o(clearCache),
        m: common_vendor.t(fontSizes[fontSizeIndex.value]),
        n: fontSizes,
        o: common_vendor.o(handleFontSizeChange),
        p: fontSizeIndex.value,
        q: settings.value.darkMode,
        r: common_vendor.o(($event) => toggleSetting("darkMode")),
        s: common_vendor.o(($event) => navigateTo("/pages/city/about/index")),
        t: common_vendor.t(version.value),
        v: common_vendor.o(checkUpdate),
        w: common_vendor.o(($event) => navigateTo("/pages/city/help/index")),
        x: common_vendor.o(handleLogout)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-83399493"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/city/settings/index.js.map
