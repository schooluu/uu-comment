"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "FlvPlayer",
  props: {
    src: {
      type: String,
      required: true
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    muted: {
      type: Boolean,
      default: false
    },
    controls: {
      type: Boolean,
      default: true
    }
  },
  emits: ["error", "play"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    common_vendor.ref(null);
    const error = common_vendor.ref("");
    common_vendor.ref(false);
    const useNativePlayer = common_vendor.ref(false);
    const handleError = (e) => {
      error.value = "播放失败";
      emit("error", e);
    };
    const handlePlay = () => {
      emit("play");
    };
    common_vendor.watch(() => props.src, (newSrc, oldSrc) => {
      if (newSrc !== oldSrc) {
        error.value = "";
        useNativePlayer.value = true;
      }
    });
    common_vendor.onMounted(() => {
      useNativePlayer.value = true;
    });
    common_vendor.onBeforeUnmount(() => {
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: useNativePlayer.value
      }, useNativePlayer.value ? {
        b: __props.src,
        c: __props.autoplay,
        d: __props.muted,
        e: __props.controls,
        f: common_vendor.o(handleError),
        g: common_vendor.o(handlePlay)
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-480bef9f"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/common/FlvPlayer.js.map
