"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "teacher",
  setup(__props) {
    const teachers = common_vendor.ref([
      { id: 1, name: "XXX", enName: "XXX", avatar: "https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png" },
      { id: 2, name: "XX", enName: "X", avatar: "https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png" },
      { id: 3, name: "XX PORNEL", enName: "DEVIN XXX", avatar: "https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png" },
      { id: 4, name: "XX", enName: "XX", avatar: "https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png" },
      { id: 5, name: "XX LEE", enName: "XX LEE", avatar: "https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png" },
      { id: 6, name: "XX", enName: "MAAIN", avatar: "https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png" },
      { id: 7, name: "XX HIGHTOWER", enName: "MARLEE HIGHTOWER", avatar: "https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png" },
      { id: 8, name: "XX", enName: "MONROE", avatar: "https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png" },
      { id: 9, name: "XXX", enName: "XX", avatar: "https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png" },
      { id: 10, name: "XX", enName: "NEMA", avatar: "https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png" },
      { id: 11, name: "OXXNELOVE", enName: "XX", avatar: "https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png" },
      { id: 12, name: "sXXemi", enName: "XXX", avatar: "https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png" },
      { id: 13, name: "X", enName: "XXXX", avatar: "https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png" },
      { id: 14, name: "WXXOOTAE", enName: "XX", avatar: "https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png" },
      { id: 15, name: "YXXECHAN", enName: "XX", avatar: "https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png" },
      { id: 16, name: "XX", enName: "X", avatar: "https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png" },
      { id: 17, name: "X", enName: "", avatar: "https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png" }
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
qq.createPage(MiniProgramPage);
