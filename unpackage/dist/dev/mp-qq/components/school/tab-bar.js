"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "tab-bar",
  props: {
    current: {
      type: String,
      default: "/pages/school/home/index"
    }
  },
  setup(__props) {
    const props = __props;
    const tabs = common_vendor.ref([
      { text: "首页", path: "/pages/school/home/index" },
      { text: "论坛", path: "/pages/school/forum/index" },
      { text: "订单", path: "/pages/school/order/index" },
      { text: "我的", path: "/pages/school/my/index" }
    ]);
    const switchTab = (path) => {
      if (props.current === path)
        return;
      common_vendor.index.switchTab({ url: path });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(tabs.value, (tab, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(tab.text),
            b: __props.current === tab.path
          }, __props.current === tab.path ? {} : {}, {
            c: index,
            d: __props.current === tab.path ? 1 : "",
            e: common_vendor.o(($event) => switchTab(tab.path), index)
          });
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-33179174"]]);
qq.createComponent(Component);
