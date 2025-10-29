"use strict";
const common_vendor = require("../../../common/vendor.js");
const CLOUD_FUNCTION_URL = "http://117.72.208.124:40027/api/v1/upload";
const _sfc_main = {
  __name: "add",
  setup(__props) {
    const content = common_vendor.ref("");
    const mediaList = common_vendor.ref([]);
    const location = common_vendor.ref("");
    const privacyMode = common_vendor.ref("public");
    common_vendor.ref([]);
    const loading = common_vendor.ref(false);
    common_vendor.computed(() => {
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
    const emojiList = [
      "😊",
      "😂",
      "🤣",
      "❤️",
      "😍",
      "🤔",
      "😒",
      "👍",
      "👎",
      "😳",
      "🥺",
      "😭",
      "😘",
      "🤗",
      "🙄",
      "😴",
      "🤮",
      "🤧",
      "😷",
      "🤒",
      "🤕",
      "😈",
      "👻",
      "👽",
      "🤖",
      "💩",
      "😺",
      "💪",
      "👊",
      "✌️",
      "🤞",
      "🙏",
      "👏",
      "🙌",
      "👐",
      "🤲"
    ];
    const showEmojiPanel = common_vendor.ref(false);
    const insertEmoji = (emoji) => {
      content.value += emoji;
    };
    const toggleEmojiPanel = () => {
      showEmojiPanel.value = !showEmojiPanel.value;
    };
    const handleCancel = () => {
      common_vendor.index.navigateBack();
    };
    const handlePublish = async () => {
      if (!canPublish.value)
        return;
      loading.value = true;
      try {
        common_vendor.index.showLoading({
          title: "发布中..."
        });
        const { result } = await common_vendor.tr.callFunction({
          name: "wx_add_moment",
          data: {
            content: content.value,
            mediaList: mediaList.value,
            location: location.value,
            privacy: privacyMode.value,
            contactType: contactType.value,
            contactValue: contactValue.value
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
        loading.value = false;
      }
    };
    const uploadImages = async (tempFilePaths) => {
      common_vendor.index.__f__("log", "at pages/wx/home/add.vue:242", "uploadImages", tempFilePaths[0]);
      try {
        const tasks = tempFilePaths.map((path) => {
          return new Promise((resolve, reject) => {
            common_vendor.index.uploadFile({
              url: CLOUD_FUNCTION_URL,
              filePath: path,
              name: "file",
              formData: {
                // 可以添加额外参数
              },
              success: (uploadRes) => {
                try {
                  const data = JSON.parse(uploadRes.data);
                  if (data.status) {
                    resolve({
                      type: "image",
                      url: data.data.links.url,
                      key: data.data.key,
                      thumbnail_url: data.data.links.thumbnail_url
                    });
                  } else {
                    reject(new Error(data.message || "上传失败"));
                  }
                } catch (e) {
                  reject(new Error("解析上传结果失败"));
                }
              },
              fail: (err) => {
                common_vendor.index.__f__("error", "at pages/wx/home/add.vue:272", "上传失败:", err);
                reject(err);
              }
            });
          });
        });
        const results = await Promise.all(tasks);
        return results;
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/wx/home/add.vue:282", error);
        common_vendor.index.showToast({
          title: error.message || "图片上传失败",
          icon: "none"
        });
        return [];
      }
    };
    const chooseMedia = () => {
      common_vendor.index.chooseImage({
        count: 9 - mediaList.value.length,
        success: async (res) => {
          common_vendor.index.showLoading({
            title: "上传中..."
          });
          try {
            const newMedia = await uploadImages(res.tempFilePaths);
            mediaList.value.push(...newMedia);
          } finally {
            common_vendor.index.hideLoading();
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
    const showContactPanel = common_vendor.ref(false);
    const contactType = common_vendor.ref("wechat");
    const contactValue = common_vendor.ref("");
    const contactMap = {
      wechat: "请输入微信号",
      phone: "请输入手机号",
      qq: "请输入QQ号",
      email: "请输入邮箱"
    };
    const contactPlaceholder = common_vendor.computed(() => contactMap[contactType.value]);
    common_vendor.computed(() => {
      if (!contactValue.value)
        return "未填写";
      const label = { wechat: "微信", phone: "手机", qq: "QQ", email: "邮箱" }[contactType.value];
      return `${label}: ${contactValue.value}`;
    });
    const setContactType = (t) => {
      contactType.value = t;
    };
    const saveContact = () => {
      showContactPanel.value = false;
    };
    const clearContact = () => {
      contactValue.value = "";
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(handleCancel),
        b: canPublish.value ? 1 : "",
        c: common_vendor.o(handlePublish),
        d: common_vendor.t(content.value.length),
        e: content.value,
        f: common_vendor.o(($event) => content.value = $event.detail.value),
        g: common_vendor.o(toggleEmojiPanel),
        h: common_vendor.t(content.value.length),
        i: content.value.length > 800 ? 1 : "",
        j: showEmojiPanel.value
      }, showEmojiPanel.value ? {
        k: common_vendor.o(toggleEmojiPanel),
        l: common_vendor.f(emojiList, (emoji, i, i0) => {
          return {
            a: common_vendor.t(emoji),
            b: i,
            c: common_vendor.o(($event) => insertEmoji(emoji), i)
          };
        })
      } : {}, {
        m: mediaList.value.length > 0 || true
      }, mediaList.value.length > 0 || true ? common_vendor.e({
        n: common_vendor.t(mediaList.value.length),
        o: common_vendor.f(mediaList.value, (item, index, i0) => {
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
        p: mediaList.value.length < 9
      }, mediaList.value.length < 9 ? {
        q: common_vendor.o(chooseMedia)
      } : {}) : {}, {
        r: showContactPanel.value
      }, showContactPanel.value ? {
        s: common_vendor.n(contactType.value === "wechat" ? "active" : ""),
        t: common_vendor.o(($event) => setContactType("wechat")),
        v: common_vendor.n(contactType.value === "phone" ? "active" : ""),
        w: common_vendor.o(($event) => setContactType("phone")),
        x: common_vendor.n(contactType.value === "qq" ? "active" : ""),
        y: common_vendor.o(($event) => setContactType("qq")),
        z: common_vendor.n(contactType.value === "email" ? "active" : ""),
        A: common_vendor.o(($event) => setContactType("email")),
        B: contactPlaceholder.value,
        C: contactValue.value,
        D: common_vendor.o(($event) => contactValue.value = $event.detail.value),
        E: common_vendor.o(clearContact),
        F: common_vendor.o(saveContact)
      } : {}, {
        G: loading.value
      }, loading.value ? {
        H: common_vendor.f(4, (i, k0, i0) => {
          return {
            a: i
          };
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2d2c1f5b"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/wx/home/add.js.map
