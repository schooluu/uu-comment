"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "gift",
  setup(__props) {
    const gifts = common_vendor.ref([
      {
        id: 1,
        name: "JAZZ基础班体验课",
        validity: "2024.12.31",
        count: 2
      },
      {
        id: 2,
        name: "现代舞入门课程",
        validity: "2024.12.31",
        count: 1
      }
    ]);
    const giftCourse = (gift) => {
      common_vendor.index.navigateTo({
        url: `/pages/dance/course/gift-friend?id=${gift.id}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(gifts.value, (gift, k0, i0) => {
          return {
            a: common_vendor.t(gift.name),
            b: common_vendor.t(gift.validity),
            c: common_vendor.t(gift.count),
            d: common_vendor.o(($event) => giftCourse(gift), gift.id),
            e: gift.id
          };
        })
      };
    };
  }
};
qq.createPage(_sfc_main);
