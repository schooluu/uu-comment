"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const agreed = common_vendor.ref(false);
    const systemInfo = common_vendor.ref({});
    const loading = common_vendor.ref(false);
    common_vendor.onMounted(() => {
      common_vendor.index.getSystemInfo({
        success: (res) => {
          systemInfo.value = {
            brand: res.brand,
            // 手机品牌
            model: res.model,
            // 手机型号
            system: res.system,
            // 操作系统版本
            platform: res.platform
            // 客户端平台
          };
          common_vendor.index.__f__("log", "at pages/wx/login/login.vue:71", "设备信息：", systemInfo.value);
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/wx/login/login.vue:74", "获取系统信息失败：", err);
        }
      });
    });
    const handlePhoneLogin = () => {
      if (!agreed.value) {
        common_vendor.index.showToast({
          title: "请先同意服务协议和隐私政策",
          icon: "none"
        });
        return;
      }
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
        common_vendor.index.navigateBack();
      }, 1200);
    };
    const handleViewTerms = () => {
      common_vendor.index.navigateTo({
        url: "/pages/wx/agreement/terms"
      });
    };
    const handleViewPrivacy = () => {
      common_vendor.index.navigateTo({
        url: "/pages/wx/agreement/privacy"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(handlePhoneLogin),
        b: systemInfo.value.model
      }, systemInfo.value.model ? {
        c: common_vendor.t(systemInfo.value.brand),
        d: common_vendor.t(systemInfo.value.model)
      } : {}, {
        e: agreed.value
      }, agreed.value ? {} : {}, {
        f: agreed.value ? 1 : "",
        g: common_vendor.o(($event) => agreed.value = !agreed.value),
        h: common_vendor.o(handleViewTerms),
        i: common_vendor.o(handleViewPrivacy),
        j: loading.value
      }, loading.value ? {
        k: common_vendor.f(4, (i, k0, i0) => {
          return {
            a: i
          };
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8d62ae90"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/wx/login/login.js.map
