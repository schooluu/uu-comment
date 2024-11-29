"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "add",
  setup(__props) {
    const content = common_vendor.ref("");
    const mediaList = common_vendor.ref([]);
    const location = common_vendor.ref("");
    const privacyMode = common_vendor.ref("public");
    const mentionList = common_vendor.ref([]);
    const privacyText = common_vendor.computed(() => {
      const modes = {
        public: "公开",
        friends: "仅好友可见",
        private: "仅自己可见"
      };
      return modes[privacyMode.value];
    });
    const canPublish = common_vendor.computed(() => {
      return content.value.trim() || mediaList.value.length > 0;
    });
    const handleCancel = () => {
      common_vendor.index.navigateBack();
    };
    const handlePublish = async () => {
      if (!canPublish.value)
        return;
      try {
        common_vendor.index.showLoading({
          title: "发布中..."
        });
        const { result } = await common_vendor.Ys.callFunction({
          name: "wx_add_moment",
          data: {
            content: content.value,
            mediaList: mediaList.value,
            location: location.value,
            privacy: privacyMode.value
          }
        });
        if (result.code === 0) {
          common_vendor.index.showToast({
            title: "发布成功",
            icon: "success"
          });
          common_vendor.index.$emit("refreshMoments");
          setTimeout(() => {
            common_vendor.index.navigateBack();
          }, 1500);
        } else {
          throw new Error(result.msg);
        }
      } catch (error) {
        common_vendor.index.showToast({
          title: error.message || "发布失败",
          icon: "none"
        });
      } finally {
        common_vendor.index.hideLoading();
      }
    };
    const uploadImages = async (tempFilePaths) => {
      console.log("uploadImages", tempFilePaths[0]);
      try {
        const tasks = tempFilePaths.map((path) => {
          return new Promise((resolve, reject) => {
            common_vendor.Ys.uploadFile({
              filePath: path,
              cloudPath: `wx-moments/${Date.now()}-${Math.random().toString(36).slice(-6)}${path.match(/\.[^.]+$/)}`,
              success: (res) => {
                resolve({
                  type: "image",
                  url: res.fileID
                });
              },
              fail: reject
            });
          });
        });
        const results = await Promise.all(tasks);
        return results;
      } catch (error) {
        console.error(error);
        common_vendor.index.showToast({
          title: error.message || "图片上传失败",
          icon: "none"
        });
        return [];
      }
    };
    const chooseMedia = () => {
      common_vendor.index.showActionSheet({
        itemList: ["拍摄", "从相册选择"],
        success: (res) => {
          if (res.tapIndex === 0)
            ;
          else {
            common_vendor.index.chooseImage({
              count: 9 - mediaList.value.length,
              success: async (res2) => {
                common_vendor.index.showLoading({
                  title: "上传中..."
                });
                try {
                  const newMedia = await uploadImages(res2.tempFilePaths);
                  mediaList.value.push(...newMedia);
                } finally {
                  common_vendor.index.hideLoading();
                }
              }
            });
          }
        }
      });
    };
    const deleteMedia = (index) => {
      mediaList.value.splice(index, 1);
    };
    const previewImage = (index) => {
      const urls = mediaList.value.filter((item) => item.type === "image").map((item) => item.url);
      common_vendor.index.previewImage({
        urls,
        current: urls[index]
      });
    };
    const togglePrivacy = () => {
      common_vendor.index.showActionSheet({
        itemList: ["公开", "仅好友可见", "仅自己可见"],
        success: (res) => {
          const modes = ["public", "friends", "private"];
          privacyMode.value = modes[res.tapIndex];
        }
      });
    };
    const toggleLocation = () => {
      common_vendor.index.chooseLocation({
        success: (res) => {
          location.value = res.name;
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(handleCancel),
        b: canPublish.value ? 1 : "",
        c: common_vendor.o(handlePublish),
        d: content.value,
        e: common_vendor.o(($event) => content.value = $event.detail.value),
        f: common_vendor.f(mediaList.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.type === "image"
          }, item.type === "image" ? {
            b: item.url,
            c: common_vendor.o(($event) => previewImage(index), index)
          } : item.type === "video" ? {
            e: item.url
          } : {}, {
            d: item.type === "video",
            f: common_vendor.o(($event) => deleteMedia(index), index),
            g: index
          });
        }),
        g: mediaList.value.length < 9
      }, mediaList.value.length < 9 ? {
        h: common_vendor.o(chooseMedia)
      } : {}, {
        i: common_vendor.t(privacyText.value),
        j: common_vendor.o(togglePrivacy),
        k: common_vendor.t(location.value || "添加位置"),
        l: common_vendor.o(toggleLocation),
        m: common_vendor.t(mentionList.value.length ? `已选${mentionList.value.length}人` : "添加")
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2d2c1f5b"]]);
qq.createPage(MiniProgramPage);
