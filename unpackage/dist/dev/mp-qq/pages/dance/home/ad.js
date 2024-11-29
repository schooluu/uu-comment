"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  __name: "ad",
  setup(__props) {
    const rules = common_vendor.ref([
      "本课卡适用在XXXX未有过任何消费记录的用户，消费记录包括充值记录，上课记录，体验课记录，私教及其它特殊课程上课记录。",
      '点击"领取课卡"后，请根据您的需求，从"XXXX上海单次体验卡""XXXX南京单次体验卡""XXXX成都单次体验卡"中选择其一进行领取，领取后可进行约课。',
      'XXXX南京单次体验卡"XXXX成都单次体验卡"分别适用于XXXX门店不通用。可点击小程序"XXXX"进入约课界面，点击筛选按钮选择对应门店后，进行约课。',
      '免费课程课卡没有使用有效期，请在课卡有效期内使用，可点击"我的"查看课卡详情。',
      "体验当天办理会员享受85折优惠，优惠范围包括：次卡单店/全市通30次、60次、90次、200次；时效卡单店/全市通季卡、半年卡、年卡。"
    ]);
    const handleBack = () => {
      common_vendor.index.navigateBack({
        delta: 1
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleBack),
        b: common_assets._imports_0$1,
        c: common_vendor.f(rules.value, (rule, index, i0) => {
          return {
            a: common_vendor.t(index + 1),
            b: common_vendor.t(rule),
            c: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-583f0b98"]]);
qq.createPage(MiniProgramPage);
