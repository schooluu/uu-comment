"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "venueList",
  setup(__props) {
    const venues = common_vendor.ref([
      {
        id: 1,
        name: "xxxxxxx舞室大悦城店",
        address: "上海市静安区天xxxxx室",
        image: "https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/venue1.jpg",
        tags: ["停车方便", "地铁直达", "设施齐全"],
        isFavorite: false
      },
      {
        id: 2,
        name: "XXXX舞室嘉里合集店",
        address: "上海市静安区天xxxxx室",
        image: "https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/venue2.jpg",
        tags: ["新店开业", "环境优雅", "交通便利"],
        isFavorite: false
      }
    ]);
    const goToDetail = (venue) => {
      common_vendor.index.navigateTo({
        url: `/pages/dance/home/venueDetail?id=${venue.id}`
      });
    };
    const toggleFavorite = (venue) => {
      venue.isFavorite = !venue.isFavorite;
    };
    const handleBack = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleBack),
        b: common_vendor.f(venues.value, (venue, index, i0) => {
          return {
            a: venue.image,
            b: common_vendor.t(venue.name),
            c: common_vendor.t(venue.address),
            d: common_vendor.f(venue.tags, (tag, idx, i1) => {
              return {
                a: common_vendor.t(tag),
                b: idx
              };
            }),
            e: venue.isFavorite ? "heart" : "heart-o",
            f: venue.isFavorite ? "#FF4D8F" : "#fff",
            g: common_vendor.o(($event) => toggleFavorite(venue), index),
            h: index,
            i: common_vendor.o(($event) => goToDetail(venue), index)
          };
        })
      };
    };
  }
};
qq.createPage(_sfc_main);
