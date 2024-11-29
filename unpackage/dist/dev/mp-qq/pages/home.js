"use strict";
const common_vendor = require("../common/vendor.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "home",
  setup(__props) {
    const themePopup = common_vendor.ref(null);
    const currentTheme = common_vendor.ref("default");
    const statusBarHeight = common_vendor.index.getSystemInfoSync().statusBarHeight;
    const getCompanyDetail = async () => {
      try {
        const { result } = await common_vendor.Ys.callFunction({
          name: "getHome",
          data: {}
        });
        if (result.code === 0) {
          projects.value = result.data.projects;
          wechatQr.value = result.data.wechatQr;
          wechatQunQr.value = result.data.wechatQunQr;
        }
      } catch (error) {
        common_vendor.index.showToast({
          title: error.message,
          icon: "none"
        });
      }
    };
    const wechatQr = common_vendor.ref("");
    const wechatQunQr = common_vendor.ref("");
    const projects = common_vendor.ref([
      {
        id: 1,
        title: "人人点评模板",
        description: "匿名化点评平台，为用户提供真实可靠的评价信息",
        image: "/static/images/project1.png",
        tags: ["Vue3", "uniapp"]
      },
      {
        id: 2,
        title: "舞蹈店预约模板",
        description: "AI驱动的舞蹈店预约模板，提供全方位的智能服务",
        image: "/static/images/project2.png",
        tags: ["Vue3", "uniapp"]
      }
      // 更多项目...
    ]);
    const goToProject = (project) => {
      common_vendor.index.navigateTo({
        url: project.path
      });
    };
    const themes = [
      { label: "默认紫", value: "default", gradient: "linear-gradient(135deg, #7C3AED, #4F46E5)" },
      { label: "清新蓝", value: "blue", gradient: "linear-gradient(135deg, #0EA5E9, #2563EB)" },
      { label: "自然绿", value: "green", gradient: "linear-gradient(135deg, #10B981, #059669)" },
      { label: "活力红", value: "red", gradient: "linear-gradient(135deg, #EF4444, #DC2626)" }
    ];
    const showThemePicker = () => {
      themePopup.value.open();
    };
    const selectTheme = (theme) => {
      currentTheme.value = theme;
      common_vendor.index.setStorageSync("theme", theme);
      themePopup.value.close();
    };
    common_vendor.onMounted(() => {
      const savedTheme = common_vendor.index.getStorageSync("theme");
      if (savedTheme) {
        currentTheme.value = savedTheme;
      }
    });
    const previewQRCode = () => {
      common_vendor.index.previewImage({
        urls: [wechatQunQr.value]
      });
    };
    getCompanyDetail();
    const wechatPopup = common_vendor.ref(null);
    const showWechatQR = () => {
      wechatPopup.value.open();
    };
    const openLink = () => {
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(showThemePicker),
        b: common_vendor.unref(statusBarHeight) + "px",
        c: common_vendor.unref(statusBarHeight) + 88 + "px",
        d: common_vendor.f(projects.value, (project, index, i0) => {
          return {
            a: project.image,
            b: common_vendor.t(project.title),
            c: common_vendor.t(project.description),
            d: common_vendor.f(project.tags, (tag, k1, i1) => {
              return {
                a: common_vendor.t(tag),
                b: tag
              };
            }),
            e: project.id,
            f: `${index * 0.1}s`,
            g: common_vendor.o(($event) => goToProject(project), project.id)
          };
        }),
        e: common_vendor.o(openLink),
        f: common_vendor.o(showWechatQR),
        g: common_vendor.f(themes, (theme, k0, i0) => {
          return {
            a: theme.gradient,
            b: common_vendor.t(theme.label),
            c: theme.value,
            d: currentTheme.value === theme.value ? 1 : "",
            e: common_vendor.o(($event) => selectTheme(theme.value), theme.value)
          };
        }),
        h: common_vendor.sr(themePopup, "0aba3985-0", {
          "k": "themePopup"
        }),
        i: common_vendor.p({
          type: "bottom"
        }),
        j: wechatQunQr.value,
        k: common_vendor.o(previewQRCode),
        l: wechatQr.value,
        m: common_vendor.sr(wechatPopup, "0aba3985-1", {
          "k": "wechatPopup"
        }),
        n: common_vendor.p({
          type: "center"
        }),
        o: common_vendor.n(`theme-${currentTheme.value}`)
      };
    };
  }
});
qq.createPage(_sfc_main);
