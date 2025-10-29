"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "tab-bar",
  props: {
    current: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const tabBarItems = common_vendor.ref([
      { id: 1, name: "首页", path: "/pages/dance/home/index" },
      { id: 2, name: "课程", path: "/pages/dance/course/index" },
      { id: 4, name: "我的", path: "/pages/dance/my/index" }
    ]);
    const switchTab = (path) => {
      common_vendor.index.navigateTo({
        url: path
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(tabBarItems.value, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: __props.current === item.path
          }, __props.current === item.path ? {} : {}, {
            c: item.id,
            d: __props.current === item.path ? 1 : "",
            e: common_vendor.o(($event) => switchTab(item.path), item.id)
          });
        })
      };
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/dance/tab-bar.js.map
