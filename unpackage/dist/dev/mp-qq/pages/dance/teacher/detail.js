"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const teacherInfo = common_vendor.ref({
      name: "APHRODITE",
      title: "明星导师",
      avatar: "/static/images/teachers/aphrodite.jpg",
      videoUrl: "/static/videos/dance-demo.mp4"
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
        c: common_assets._imports_0$3,
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
qq.createPage(_sfc_main);
