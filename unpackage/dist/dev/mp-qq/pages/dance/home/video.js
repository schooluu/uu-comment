"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  __name: "video",
  setup(__props) {
    const videos = common_vendor.ref([
      {
        id: 1,
        title: "饭团 - 舞娘",
        url: "/static/videos/dance1.mp4",
        poster: "/static/images/video-poster1.jpg",
        tags: ["JAZZ", "FancyFancy舞室金鹰店", "KIER饭团"]
      },
      {
        id: 2,
        title: "金金 - Mirrors",
        url: "/static/videos/dance2.mp4",
        poster: "/static/images/video-poster2.jpg",
        tags: ["现代舞", "FancyFancy舞室金鹰店"]
      },
      {
        id: 1,
        title: "饭团 - 舞娘",
        url: "/static/videos/dance1.mp4",
        poster: "/static/images/video-poster1.jpg",
        tags: ["JAZZ", "FancyFancy舞室金鹰店", "KIER饭团"]
      },
      {
        id: 2,
        title: "金金 - Mirrors",
        url: "/static/videos/dance2.mp4",
        poster: "/static/images/video-poster2.jpg",
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
        b: common_assets._imports_0$2,
        c: common_vendor.t(isExpanded.value ? "收起" : "展开"),
        d: isExpanded.value ? 1 : "",
        e: common_vendor.o(toggleExpand),
        f: isExpanded.value ? 1 : "",
        g: common_vendor.o(handleClear),
        h: isFilterActive.value ? 1 : "",
        i: common_vendor.o(toggleFilter),
        j: common_vendor.f(videos.value, (video, index, i0) => {
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
qq.createPage(MiniProgramPage);
