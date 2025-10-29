"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "terms",
  setup(__props) {
    const handleBack = () => {
      common_vendor.index.navigateBack();
    };
    const handleAgree = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleBack),
        b: common_vendor.o(handleAgree)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bbe1ed68"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/wx/agreement/terms.js.map
