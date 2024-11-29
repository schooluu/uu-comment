"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "private",
  setup(__props) {
    const teachers = common_vendor.ref([
      {
        id: 1,
        name: "APHRODITE",
        style: "JAZZ/现代舞",
        price: 399,
        avatar: "/static/images/teachers/aphrodite.jpg"
      }
      // ... 更多老师数据
    ]);
    const bookTeacher = (teacher) => {
      common_vendor.index.navigateTo({
        url: `/pages/dance/course/private-detail?id=${teacher.id}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(teachers.value, (teacher, k0, i0) => {
          return {
            a: teacher.avatar,
            b: common_vendor.t(teacher.name),
            c: common_vendor.t(teacher.style),
            d: common_vendor.t(teacher.price),
            e: common_vendor.o(($event) => bookTeacher(teacher), teacher.id),
            f: teacher.id
          };
        })
      };
    };
  }
};
qq.createPage(_sfc_main);
