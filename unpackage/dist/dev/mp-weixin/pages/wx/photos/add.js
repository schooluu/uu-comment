"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "add",
  setup(__props) {
    const photos = common_vendor.ref([]);
    const canSubmit = common_vendor.computed(() => photos.value.length > 0);
    const loadedMap = common_vendor.ref({});
    const enableCompress = common_vendor.ref(true);
    const quality = common_vendor.ref(80);
    const overallCaption = common_vendor.ref("");
    const goBack = () => common_vendor.index.navigateBack({ delta: 1 });
    const choose = () => {
      common_vendor.index.chooseImage({
        count: 9 - photos.value.length,
        success: async (res) => {
          const paths = res.tempFiles && res.tempFiles.length ? res.tempFiles.map((f) => f.path || f.tempFilePath || f) : res.tempFilePaths || [];
          if (!paths.length)
            return;
          common_vendor.index.showLoading({ title: "上传中..." });
          try {
            const tasks = paths.map((path) => new Promise((resolve, reject) => {
              const doUpload = (finalPath) => {
                common_vendor.tr.uploadFile({
                  filePath: finalPath,
                  cloudPath: `wx-photos/${Date.now()}-${Math.random().toString(36).slice(-6)}${String(finalPath).match(/\.[^.]+$/)}`,
                  success: (r) => resolve({ url: r.fileID, caption: "" }),
                  fail: reject
                });
              };
              if (enableCompress.value) {
                common_vendor.index.compressImage({
                  src: path,
                  quality: quality.value,
                  success: (cr) => {
                    var _a, _b;
                    return doUpload(cr.tempFilePath || ((_b = (_a = cr.tempFiles) == null ? void 0 : _a[0]) == null ? void 0 : _b.tempFilePath) || path);
                  },
                  fail: () => doUpload(path)
                });
              } else {
                doUpload(path);
              }
            }));
            const list = await Promise.all(tasks);
            photos.value.push(...list);
          } catch (e) {
            common_vendor.index.showToast({ title: e.message || "上传失败", icon: "none" });
          } finally {
            common_vendor.index.hideLoading();
          }
        }
      });
    };
    const chooseFromAlbum = () => choose();
    const takePhoto = () => {
      common_vendor.index.chooseImage({
        count: 1,
        sourceType: ["camera"],
        success: (r) => {
          const res = { tempFilePaths: r.tempFilePaths, tempFiles: r.tempFiles };
          choose.call(null, res);
        }
      });
    };
    const clearAll = () => {
      photos.value = [];
    };
    const onToggleCompress = (e) => {
      var _a;
      enableCompress.value = !!((_a = e == null ? void 0 : e.detail) == null ? void 0 : _a.value);
    };
    const onQualityChange = (e) => {
      var _a;
      quality.value = Number(((_a = e == null ? void 0 : e.detail) == null ? void 0 : _a.value) || quality.value);
    };
    const preview = (idx) => {
      const urls = photos.value.map((p) => p.url);
      common_vendor.index.previewImage({ urls, current: urls[idx] });
    };
    const remove = (idx) => {
      photos.value.splice(idx, 1);
    };
    const onImgLoad = (i) => {
      loadedMap.value[i] = true;
    };
    const handleSubmit = async () => {
      if (!canSubmit.value)
        return;
      common_vendor.index.showLoading({ title: "提交中..." });
      try {
        const payload = {
          content: overallCaption.value || "",
          mediaList: photos.value.map((p) => ({ type: "image", url: p.url, caption: p.caption || "" })),
          location: "",
          privacy: "public"
        };
        const { result } = await common_vendor.tr.callFunction({ name: "wx_add_moment", data: payload });
        if (!result || result.code !== 0) {
          throw new Error((result == null ? void 0 : result.msg) || "提交失败");
        }
        try {
          common_vendor.index.$emit("photosAdded", photos.value);
        } catch (_) {
        }
        common_vendor.index.showToast({ title: "已添加", icon: "success" });
        setTimeout(() => {
          goBack();
        }, 600);
      } catch (e) {
        common_vendor.index.showToast({ title: e.message || "提交失败", icon: "none" });
      } finally {
        common_vendor.index.hideLoading();
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(goBack),
        b: common_vendor.t(photos.value.length),
        c: canSubmit.value ? 1 : "",
        d: common_vendor.o(handleSubmit),
        e: overallCaption.value,
        f: common_vendor.o(($event) => overallCaption.value = $event.detail.value),
        g: common_vendor.o(chooseFromAlbum),
        h: common_vendor.o(takePhoto),
        i: photos.value.length
      }, photos.value.length ? {
        j: common_vendor.o(clearAll)
      } : {}, {
        k: enableCompress.value,
        l: common_vendor.o(onToggleCompress),
        m: enableCompress.value
      }, enableCompress.value ? {
        n: quality.value,
        o: common_vendor.o(onQualityChange),
        p: common_vendor.t(quality.value)
      } : {}, {
        q: common_vendor.f(photos.value, (p, i, i0) => {
          return {
            a: common_vendor.n({
              loaded: loadedMap.value[i]
            }),
            b: p.url,
            c: common_vendor.o(($event) => preview(i), i),
            d: common_vendor.o(($event) => onImgLoad(i), i),
            e: common_vendor.o(($event) => remove(i), i),
            f: p.caption,
            g: common_vendor.o(($event) => p.caption = $event.detail.value, i),
            h: i
          };
        }),
        r: photos.value.length < 9
      }, photos.value.length < 9 ? {
        s: common_vendor.o(choose)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a1548ea5"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/wx/photos/add.js.map
