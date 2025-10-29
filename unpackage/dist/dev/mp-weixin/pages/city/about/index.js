"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const version = common_vendor.ref("1.0.0");
    const features = common_vendor.ref([
      {
        icon: "🏠",
        name: "房产交易",
        desc: "为用户提供安全、便捷的房产交易服务"
      },
      {
        icon: "🚗",
        name: "顺风拼车",
        desc: "绿色出行，共享便利"
      },
      {
        icon: "💼",
        name: "求职招聘",
        desc: "连接企业与人才的桥梁"
      },
      {
        icon: "🛍️",
        name: "二手交易",
        desc: "闲置换钱，循环利用"
      }
    ]);
    const companyInfo = common_vendor.ref({
      desc: '富邦之家是一家专注于本地生活服务的互联网平台，致力于为用户提供便捷、高效、安全的生活服务。我们始终秉持"用心服务，创造价值"的理念，不断创新和优化服务体验。',
      address: "浙江省杭州市西湖区xxxxx大厦",
      phone: "400-888-8888",
      email: "service@example.com"
    });
    const navigateTo = (url) => {
      common_vendor.index.navigateTo({ url });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$5,
        b: common_vendor.t(version.value),
        c: common_vendor.f(features.value, (feature, index, i0) => {
          return {
            a: common_vendor.t(feature.icon),
            b: common_vendor.t(feature.name),
            c: common_vendor.t(feature.desc),
            d: index
          };
        }),
        d: common_vendor.t(companyInfo.value.desc),
        e: common_vendor.t(companyInfo.value.address),
        f: common_vendor.t(companyInfo.value.phone),
        g: common_vendor.t(companyInfo.value.email),
        h: common_vendor.o(($event) => navigateTo("/pages/city/agreement/privacy")),
        i: common_vendor.o(($event) => navigateTo("/pages/city/agreement/service")),
        j: common_vendor.o(($event) => navigateTo("/pages/city/agreement/copyright"))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c1f53452"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/city/about/index.js.map
