"use strict";
const common_vendor = require("../../../common/vendor.js");
const defaultAvatar = "https://img0.baidu.com/it/u=1415523915,841919565&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1713286800&t=a9e21a0e5650a672fa2cbd3b133ed7e0";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const showCommentPopup = common_vendor.ref(false);
    const showEmojiPanel = common_vendor.ref(false);
    const commentText = common_vendor.ref("");
    const currentMomentIndex = common_vendor.ref(-1);
    const isLikeAnimating = common_vendor.ref({});
    const page = common_vendor.ref(1);
    const pageSize = common_vendor.ref(10);
    const loading = common_vendor.ref(false);
    const hasMore = common_vendor.ref(true);
    const moments = common_vendor.ref([]);
    const getMomentsList = async (isRefresh = false) => {
      if (loading.value || !hasMore.value && !isRefresh)
        return;
      try {
        loading.value = true;
        const { result } = await common_vendor.Ys.callFunction({
          name: "wx_get_list",
          data: {
            page: isRefresh ? 1 : page.value,
            pageSize: pageSize.value
          }
        });
        if (result.code === 0) {
          if (isRefresh) {
            moments.value = result.data.list;
            page.value = 1;
          } else {
            moments.value = [...moments.value, ...result.data.list];
            page.value++;
          }
          hasMore.value = result.data.hasMore;
        } else {
          throw new Error(result.msg);
        }
      } catch (error) {
        common_vendor.index.showToast({
          title: error.message || "获取朋友圈失败",
          icon: "none"
        });
      } finally {
        loading.value = false;
        if (isRefresh) {
          common_vendor.index.stopPullDownRefresh();
        }
      }
    };
    common_vendor.onShow(() => {
      getMomentsList(true);
    });
    common_vendor.onReachBottom(() => {
      getMomentsList();
    });
    const handleLike = async (index) => {
      try {
        const moment = moments.value[index];
        isLikeAnimating.value[index] = true;
        const { result } = await common_vendor.Ys.callFunction({
          name: "wx_add_toggle_like",
          data: {
            momentId: moment._id
          }
        });
        if (result.code === 0) {
          moment.isLiked = result.data.isLiked;
          if (moment.isLiked) {
            if (!moment.likes)
              moment.likes = [];
            moment.likes.push("我");
          } else {
            const idx = moment.likes.indexOf("我");
            if (idx > -1)
              moment.likes.splice(idx, 1);
          }
        } else {
          throw new Error(result.msg);
        }
        setTimeout(() => {
          isLikeAnimating.value[index] = false;
        }, 1e3);
      } catch (error) {
        common_vendor.index.showToast({
          title: error.message || "操作失败",
          icon: "none"
        });
      }
    };
    const submitComment = async () => {
      if (!commentText.value.trim())
        return;
      try {
        const { result } = await common_vendor.Ys.callFunction({
          name: "wx_add_comment",
          data: {
            momentId: moments.value[currentMomentIndex.value]._id,
            content: commentText.value
          }
        });
        if (result.code === 0) {
          const moment = moments.value[currentMomentIndex.value];
          if (!moment.comments)
            moment.comments = [];
          moment.comments.push({
            username: "我",
            content: commentText.value,
            create_time: Date.now()
          });
          commentText.value = "";
          showCommentPopup.value = false;
          showEmojiPanel.value = false;
          common_vendor.index.showToast({
            title: "评论成功",
            icon: "success"
          });
        } else {
          throw new Error(result.msg);
        }
      } catch (error) {
        common_vendor.index.showToast({
          title: error.message || "评论失败",
          icon: "none"
        });
      }
    };
    const handleCamera = async () => {
      common_vendor.index.navigateTo({
        url: "/pages/wx/home/add"
      });
    };
    const handleComment = (index) => {
      currentMomentIndex.value = index;
      showCommentPopup.value = true;
    };
    const closeCommentPopup = () => {
      showCommentPopup.value = false;
      showEmojiPanel.value = false;
      commentText.value = "";
      currentMomentIndex.value = -1;
    };
    const toggleEmojiPanel = () => {
      showEmojiPanel.value = !showEmojiPanel.value;
    };
    const insertEmoji = (emoji) => {
      commentText.value += emoji;
    };
    const handleVideoError = () => {
      common_vendor.index.showToast({
        title: "视频加载失败",
        icon: "none"
      });
    };
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
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: defaultAvatar,
        b: defaultAvatar,
        c: common_vendor.f(moments.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.avatar,
            b: common_vendor.t(item.username),
            c: common_vendor.t(item.content),
            d: item.mediaType
          }, item.mediaType ? common_vendor.e({
            e: item.mediaType === "video"
          }, item.mediaType === "video" ? {
            f: item.mediaUrl,
            g: item.poster,
            h: common_vendor.o(handleVideoError, index)
          } : item.mediaType === "image" ? {
            j: common_vendor.f(item.mediaUrls, (url, imgIndex, i1) => {
              return {
                a: imgIndex,
                b: url
              };
            }),
            k: common_vendor.n(`columns-${item.mediaUrls.length}`)
          } : {}, {
            i: item.mediaType === "image"
          }) : {}, {
            l: common_vendor.t(item.time),
            m: common_vendor.t(item.isLiked ? "❤️" : "🤍"),
            n: item.isLiked ? 1 : "",
            o: isLikeAnimating.value[index] ? 1 : "",
            p: common_vendor.o(($event) => handleLike(index), index),
            q: common_vendor.o(($event) => handleComment(index), index),
            r: item.likes && item.likes.length
          }, item.likes && item.likes.length ? {
            s: common_vendor.t(item.likes.join("、"))
          } : {}, {
            t: item.comments && item.comments.length !== 0
          }, item.comments && item.comments.length !== 0 ? {
            v: common_vendor.f(item.comments, (comment, cIndex, i1) => {
              return {
                a: common_vendor.t(comment.username),
                b: common_vendor.t(comment.content),
                c: cIndex
              };
            })
          } : {}, {
            w: index
          });
        }),
        d: showCommentPopup.value
      }, showCommentPopup.value ? common_vendor.e({
        e: showCommentPopup.value,
        f: common_vendor.o(submitComment),
        g: commentText.value,
        h: common_vendor.o(($event) => commentText.value = $event.detail.value),
        i: common_vendor.o(toggleEmojiPanel),
        j: commentText.value.trim() ? 1 : "",
        k: common_vendor.o(submitComment),
        l: showEmojiPanel.value
      }, showEmojiPanel.value ? {
        m: common_vendor.f(emojiList, (emoji, index, i0) => {
          return {
            a: common_vendor.t(emoji),
            b: index,
            c: common_vendor.o(($event) => insertEmoji(emoji), index)
          };
        })
      } : {}, {
        n: common_vendor.o(() => {
        }),
        o: common_vendor.o(closeCommentPopup)
      }) : {}, {
        p: common_vendor.o(handleCamera)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ca836512"]]);
_sfc_main.__runtimeHooks = 1;
qq.createPage(MiniProgramPage);
