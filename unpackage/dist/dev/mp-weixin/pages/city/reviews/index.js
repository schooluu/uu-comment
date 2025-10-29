"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const tags = [
      { name: "全部", count: 126, active: true },
      { name: "好评", count: 108, active: false },
      { name: "中评", count: 12, active: false },
      { name: "差评", count: 6, active: false },
      { name: "有图", count: 45, active: false }
    ];
    const reviews = [
      {
        avatar: "https://example.com/avatar1.jpg",
        name: "用户123",
        rating: 5,
        content: "商品质量很好，服务态度也不错！",
        images: [
          "https://example.com/review1.jpg",
          "https://example.com/review2.jpg"
        ],
        time: "2024-01-20",
        reply: "感谢您的支持，欢迎下次光临！"
      }
      // ... 更多评价数据
    ];
    const selectTag = (index) => {
      tags.forEach((tag, i) => {
        tag.active = i === index;
      });
    };
    const previewImage = (images, current) => {
      common_vendor.index.previewImage({
        urls: images,
        current: images[current]
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(tags, (tag, index, i0) => {
          return {
            a: common_vendor.t(tag.name),
            b: common_vendor.t(tag.count),
            c: index,
            d: common_vendor.n({
              active: tag.active
            }),
            e: common_vendor.o(($event) => selectTag(index), index)
          };
        }),
        b: common_vendor.f(reviews, (review, index, i0) => {
          var _a, _b;
          return common_vendor.e({
            a: review.avatar,
            b: common_vendor.t(review.name),
            c: common_vendor.f(5, (n, k1, i1) => {
              return {
                a: n,
                b: common_vendor.n({
                  filled: n <= review.rating
                })
              };
            }),
            d: common_vendor.t(review.content),
            e: (_a = review.images) == null ? void 0 : _a.length
          }, ((_b = review.images) == null ? void 0 : _b.length) ? {
            f: common_vendor.f(review.images, (img, imgIndex, i1) => {
              return {
                a: imgIndex,
                b: img,
                c: common_vendor.o(($event) => previewImage(review.images, imgIndex), imgIndex)
              };
            })
          } : {}, {
            g: common_vendor.t(review.time),
            h: review.reply
          }, review.reply ? {
            i: common_vendor.t(review.reply)
          } : {}, {
            j: index
          });
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ee4b1270"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/city/reviews/index.js.map
