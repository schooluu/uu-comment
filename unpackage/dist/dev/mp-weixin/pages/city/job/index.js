"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const jobs = [
      {
        name: "销售经理",
        company: "富邦商贸",
        salary: "6-8k",
        tags: ["五险一金", "双休", "有提成"]
      }
      // ... 更多职位数据
    ];
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(jobs, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.company),
            c: common_vendor.t(item.salary),
            d: common_vendor.f(item.tags, (tag, idx, i1) => {
              return {
                a: common_vendor.t(tag),
                b: idx
              };
            }),
            e: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-92092279"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/city/job/index.js.map
