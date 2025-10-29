"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "venueDetail",
  setup(__props) {
    const venueInfo = common_vendor.ref({
      name: "FancyFancy舞室大悦城店",
      rating: 4.8,
      address: "上海市静安区西藏北路166号大悦城L6",
      distance: "2.5",
      images: [
        "https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/venue1.jpg",
        "https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/venue2.jpg"
      ],
      facilities: [
        { icon: "🚗", name: "停车场" },
        { icon: "🚿", name: "淋浴间" },
        { icon: "🔒", name: "储物柜" },
        { icon: "💨", name: "空调" }
      ]
    });
    const courses = common_vendor.ref([
      {
        teacherAvatar: "https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/teacher1.jpg",
        name: "JAZZ基础",
        teacherName: "FAFA",
        time: "今天 18:00"
      }
      // ... 更多课程数据
    ]);
    const handleBook = () => {
      common_vendor.index.switchTab({
        url: "/pages/dance/course/index"
      });
    };
    const copyAddress = () => {
      common_vendor.index.setClipboardData({
        data: venueInfo.value.address,
        success: () => {
          common_vendor.index.showToast({
            title: "地址已复制",
            icon: "success"
          });
        }
      });
    };
    const viewAllCourses = () => {
      common_vendor.index.switchTab({
        url: "/pages/dance/course/index"
      });
    };
    const handleBack = () => {
      common_vendor.index.navigateBack();
    };
    common_vendor.onMounted(() => {
      const query = common_vendor.index.createSelectorQuery();
      query.select(".venue-detail").boundingClientRect((data) => {
        common_vendor.index.__f__("log", "at pages/dance/home/venueDetail.vue:127", data);
      }).exec();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleBack),
        b: common_vendor.f(venueInfo.value.images, (image, index, i0) => {
          return {
            a: image,
            b: index
          };
        }),
        c: common_vendor.t(venueInfo.value.name),
        d: common_vendor.t(venueInfo.value.rating),
        e: common_vendor.t("⭐".repeat(Math.floor(venueInfo.value.rating))),
        f: common_vendor.o(handleBook),
        g: common_vendor.t(venueInfo.value.address),
        h: common_vendor.o(copyAddress),
        i: common_vendor.t(venueInfo.value.distance),
        j: common_vendor.f(venueInfo.value.facilities, (item, index, i0) => {
          return {
            a: common_vendor.t(item.icon),
            b: common_vendor.t(item.name),
            c: index
          };
        }),
        k: common_vendor.o(viewAllCourses),
        l: common_vendor.f(courses.value, (course, index, i0) => {
          return {
            a: course.teacherAvatar,
            b: common_vendor.t(course.name),
            c: common_vendor.t(course.teacherName),
            d: common_vendor.t(course.time),
            e: index
          };
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/dance/home/venueDetail.js.map
