"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "regular",
  setup(__props) {
    const courses = common_vendor.ref([
      {
        id: 1,
        name: "JAZZ基础班",
        time: "周一 19:00-20:30",
        location: "A教室",
        teacher: "APHRODITE",
        status: "available"
      }
      // ... 更多课程数据
    ]);
    const getStatusText = (status) => {
      const statusMap = {
        "available": "预约",
        "full": "已满",
        "booked": "已预约"
      };
      return statusMap[status];
    };
    const bookCourse = (course) => {
      if (course.status === "available") {
        common_vendor.index.showModal({
          title: "预约确认",
          content: `确定要预约${course.name}吗？`,
          success: (res) => {
            if (res.confirm) {
              common_vendor.index.showToast({
                title: "预约成功",
                icon: "success"
              });
            }
          }
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(courses.value, (course, k0, i0) => {
          return {
            a: common_vendor.t(course.name),
            b: common_vendor.t(course.time),
            c: common_vendor.t(course.location),
            d: common_vendor.t(course.teacher),
            e: common_vendor.t(getStatusText(course.status)),
            f: common_vendor.n(course.status),
            g: common_vendor.o(($event) => bookCourse(course), course.id),
            h: course.id
          };
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/dance/course/regular.js.map
