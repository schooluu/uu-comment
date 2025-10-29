"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "teacher",
  setup(__props) {
    const teachers = common_vendor.ref([
      { id: 1, name: "XXX", enName: "XXX", avatar: "https://img0.baidu.com/it/u=212230986,3555547834&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" },
      { id: 2, name: "XX", enName: "X", avatar: "https://img0.baidu.com/it/u=212230986,3555547834&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" },
      { id: 3, name: "XX PORNEL", enName: "DEVIN XXX", avatar: "https://img0.baidu.com/it/u=212230986,3555547834&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" },
      { id: 4, name: "XX", enName: "XX", avatar: "https://img0.baidu.com/it/u=212230986,3555547834&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" },
      { id: 5, name: "XX LEE", enName: "XX LEE", avatar: "https://img0.baidu.com/it/u=212230986,3555547834&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" },
      { id: 6, name: "XX", enName: "MAAIN", avatar: "https://img0.baidu.com/it/u=212230986,3555547834&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" },
      { id: 7, name: "XX HIGHTOWER", enName: "MARLEE HIGHTOWER", avatar: "https://img0.baidu.com/it/u=212230986,3555547834&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" },
      { id: 8, name: "XX", enName: "MONROE", avatar: "https://img0.baidu.com/it/u=212230986,3555547834&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" },
      { id: 9, name: "XXX", enName: "XX", avatar: "https://img0.baidu.com/it/u=212230986,3555547834&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" },
      { id: 10, name: "XX", enName: "NEMA", avatar: "https://img0.baidu.com/it/u=212230986,3555547834&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" },
      { id: 11, name: "OXXNELOVE", enName: "XX", avatar: "https://img0.baidu.com/it/u=212230986,3555547834&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" },
      { id: 12, name: "sXXemi", enName: "XXX", avatar: "https://img0.baidu.com/it/u=212230986,3555547834&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" },
      { id: 13, name: "X", enName: "XXXX", avatar: "https://img0.baidu.com/it/u=212230986,3555547834&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" },
      { id: 14, name: "WXXOOTAE", enName: "XX", avatar: "https://img0.baidu.com/it/u=212230986,3555547834&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" },
      { id: 15, name: "YXXECHAN", enName: "XX", avatar: "https://img0.baidu.com/it/u=212230986,3555547834&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" },
      { id: 16, name: "XX", enName: "X", avatar: "https://img0.baidu.com/it/u=212230986,3555547834&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" },
      { id: 17, name: "X", enName: "", avatar: "https://img0.baidu.com/it/u=212230986,3555547834&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" }
    ]);
    const goToDetail = (teacher) => {
      common_vendor.index.navigateTo({
        url: `/pages/dance/teacher/detail?id=${teacher.id}`
      });
    };
    const handleBack = () => {
      common_vendor.index.navigateBack({
        delta: 1
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleBack),
        b: common_vendor.f(teachers.value, (teacher, k0, i0) => {
          return {
            a: teacher.avatar,
            b: common_vendor.t(teacher.name),
            c: common_vendor.t(teacher.enName),
            d: teacher.id,
            e: common_vendor.o(($event) => goToDetail(teacher), teacher.id)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d99a0dbb"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/dance/teacher/teacher.js.map
