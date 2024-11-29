"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "favorite",
  setup(__props) {
    const tabs = ["课程", "视频", "老师"];
    const currentTab = common_vendor.ref(0);
    const favorites = common_vendor.ref([
      {
        id: 1,
        name: "JAZZ基础课程",
        teacher: "APHRODITE",
        description: "适合零基础学员，循序渐进学习爵士舞基本功",
        cover: "/static/images/courses/jazz1.jpg",
        type: "course"
      },
      {
        id: 2,
        name: "现代舞编舞展示",
        teacher: "CHERRY",
        description: "2024春季新作品展示",
        cover: "/static/images/videos/modern1.jpg",
        type: "video"
      }
    ]);
    const switchTab = (index) => {
      currentTab.value = index;
    };
    const cancelFavorite = (item) => {
      common_vendor.index.showModal({
        title: "取消收藏",
        content: "确定要取消收藏吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "已取消收藏",
              icon: "success"
            });
          }
        }
      });
    };
    const viewDetail = (item) => {
      const routes = {
        course: "/pages/dance/course/detail",
        video: "/pages/dance/video/detail",
        teacher: "/pages/dance/teacher/detail"
      };
      common_vendor.index.navigateTo({
        url: `${routes[item.type]}?id=${item.id}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(tabs, (tab, index, i0) => {
          return {
            a: common_vendor.t(tab),
            b: index,
            c: currentTab.value === index ? 1 : "",
            d: common_vendor.o(($event) => switchTab(index), index)
          };
        }),
        b: common_vendor.f(favorites.value, (item, k0, i0) => {
          return {
            a: item.cover,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.teacher),
            d: common_vendor.t(item.description),
            e: common_vendor.o(($event) => cancelFavorite(), item.id),
            f: common_vendor.o(($event) => viewDetail(item), item.id),
            g: item.id
          };
        })
      };
    };
  }
};
qq.createPage(_sfc_main);
