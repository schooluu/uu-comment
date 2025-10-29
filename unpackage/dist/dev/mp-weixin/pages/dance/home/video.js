"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "video",
  setup(__props) {
    const videos = common_vendor.ref([
      {
        id: 1,
        title: "饭团 - 舞娘",
        url: "https://www.bilibili.com/video/BV1SvSEYvE7U?t=11.9",
        poster: "https://qcloud.dpfile.com/pc/mhn9S5lPNsMBwyDy4IQ0iv5qiyqequ3mZ67rh4ZcdkCWuNpRCk5lQzhHOkJFKAf8.jpg",
        tags: ["JAZZ", "FancyFancy舞室金鹰店", "KIER饭团"]
      },
      {
        id: 2,
        title: "金金 - Mirrors",
        url: "/static/videos/dance2.mp4",
        poster: "https://qcloud.dpfile.com/pc/Tc9Vqj9bruQKwORJcL7_EeTjh35o2640h8Sqls9HUkruTEUwe6AXdZIGa6qWVvsc.jpg",
        tags: ["现代舞", "FancyFancy舞室金鹰店"]
      },
      {
        id: 1,
        title: "饭团 - 舞娘",
        url: "/static/videos/dance1.mp4",
        poster: "https://qcloud.dpfile.com/pc/hW3D6Eg1UIB7fz8kvtNVTo1iqxT4LNEIjzkpB-wW6RD1JqNcWwFU-9phykgJcvQC.jpg",
        tags: ["JAZZ", "FancyFancy舞室金鹰店", "KIER饭团"]
      },
      {
        id: 2,
        title: "金金 - Mirrors",
        url: "/static/videos/dance2.mp4",
        poster: "https://qcloud.dpfile.com/pc/s6tJIKnf46riziVlB5nHBCjJfAWAGJWDO90BTJVXbK5uNATpsHqI-QSz8IMrusCh.jpg",
        tags: ["现代舞", "FancyFancy舞室金鹰店"]
      }
    ]);
    const handleBack = () => {
      common_vendor.index.navigateBack({
        delta: 1
      });
    };
    const isFilterActive = common_vendor.ref(false);
    const handleClear = () => {
      emit("clear");
    };
    const toggleFilter = () => {
      isFilterActive.value = !isFilterActive.value;
      emit("filter", isFilterActive.value);
    };
    const formatDuration = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };
    const handleVideoTap = (video) => {
    };
    const handleTagTap = (tag) => {
    };
    const isExpanded = common_vendor.ref(false);
    const toggleExpand = () => {
      isExpanded.value = !isExpanded.value;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleBack),
        b: common_vendor.t(isExpanded.value ? "收起" : "展开"),
        c: isExpanded.value ? 1 : "",
        d: common_vendor.o(toggleExpand),
        e: isExpanded.value ? 1 : "",
        f: common_vendor.o(handleClear),
        g: isFilterActive.value ? 1 : "",
        h: common_vendor.o(toggleFilter),
        i: common_vendor.f(videos.value, (video, index, i0) => {
          return {
            a: video.url,
            b: video.poster,
            c: common_vendor.o(($event) => handleVideoTap(), video.id),
            d: common_vendor.t(video.views),
            e: common_vendor.t(video.likes),
            f: common_vendor.t(formatDuration(video.duration)),
            g: common_vendor.t(video.title),
            h: common_vendor.f(video.tags, (tag, k1, i1) => {
              return {
                a: common_vendor.t(tag),
                b: tag,
                c: common_vendor.o(($event) => handleTagTap(), tag)
              };
            }),
            i: video.id,
            j: `${index * 0.1}s`
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bc12b35e"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/dance/home/video.js.map
