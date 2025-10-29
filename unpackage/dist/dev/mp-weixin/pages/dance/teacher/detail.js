"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const teacherInfo = common_vendor.ref({
      name: "APHRODITE",
      title: "明星导师",
      avatar: "https://iknow-pic.cdn.bcebos.com/2fdda3cc7cd98d10322c0cb1333fb80e7aec90b1",
      videoUrl: "https://iknow-pic.cdn.bcebos.com/2fdda3cc7cd98d10322c0cb1333fb80e7aec90b1"
    });
    const isFavorite = common_vendor.ref(false);
    const toggleFavorite = () => {
      isFavorite.value = !isFavorite.value;
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const goToCourse = () => {
      common_vendor.index.navigateTo({
        url: "/pages/dance/course/index"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(goBack),
        b: teacherInfo.value.videoUrl,
        c: common_assets._imports_0$2,
        d: teacherInfo.value.avatar,
        e: common_vendor.t(teacherInfo.value.name),
        f: common_vendor.t(teacherInfo.value.title),
        g: isFavorite.value ? 1 : "",
        h: common_vendor.o(toggleFavorite),
        i: common_vendor.o(goToCourse)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/dance/teacher/detail.js.map
