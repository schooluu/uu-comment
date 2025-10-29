"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Math) {
  FlvPlayer();
}
const FlvPlayer = () => "../../../components/common/FlvPlayer.js";
const UPLOAD_URL = "http://117.72.208.124:40027/api/v1/upload";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const anonymousNames = [
      "星河旅人",
      "夏日微风",
      "蓝莓汽水",
      "橙子汽球",
      "夜空守望",
      "晨曦微光",
      "云端漫步",
      "月下独行",
      "白茶清欢",
      "青柠时光",
      "温柔星球",
      "晴空万里",
      "风中诗人",
      "海盐冰沙",
      "山野听风",
      "橘子海岸",
      "银河信使",
      "微光拾梦",
      "晚风邮差",
      "雾里看花",
      "森林之心",
      "雨后初晴",
      "云朵收集者",
      "夏夜萤火"
    ];
    function getRandomName() {
      return anonymousNames[Math.floor(Math.random() * anonymousNames.length)];
    }
    const anonymousAvatars = [
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1541271696563-3be2f555fc4e?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1516822003754-cca485356ecb?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1542202229-7d93c33f5d07?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1546961329-78bef0414d7c?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1558898479-33c0057a5d12?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1506919258185-6078bba55d2a?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1545996124-0501ebae84d0?auto=format&fit=crop&w=256&q=60",
      "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?auto=format&fit=crop&w=256&q=60"
    ];
    const anonymousAvatar = anonymousAvatars[Math.floor(Math.random() * anonymousAvatars.length)];
    const cnBeautyPool = [
      "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80"
    ];
    const headerBgList = cnBeautyPool;
    const headerBg = headerBgList[Math.floor(Math.random() * headerBgList.length)];
    const defaultAvatar = anonymousAvatar;
    const moodList = [
      "今天也要元气满满！",
      "匿名分享，轻松自在~",
      "每一天都值得记录。",
      "用心感受生活的美好。",
      "科技让匿名更温暖。",
      "世界很大，心情很美。",
      "做自己的小太阳 ☀️",
      "匿名不孤单，温暖在身边。",
      "记录此刻，遇见更好的自己。",
      "保持好奇，保持热爱！"
    ];
    const todayMood = moodList[Math.floor(Math.random() * moodList.length)];
    const sloganList = [
      "匿名树洞 · 美好生活",
      "用温柔治愈世界",
      "每一天都值得记录",
      "让心情自由流动",
      "科技让温暖发生",
      "在这里遇见美好",
      "分享你的故事",
      "做自己的小太阳",
      "世界很大，温暖很近",
      "用匿名守护真心"
    ];
    common_vendor.ref(sloganList[0]);
    const typedSlogan = common_vendor.ref("");
    const showCursor = common_vendor.ref(true);
    let typingTimer = null;
    let sloganTypingIndex = 0;
    let charIndex = 0;
    function startTypingSlogan() {
      clearTimeout(typingTimer);
      const slogan = sloganList[sloganTypingIndex];
      typedSlogan.value = "";
      charIndex = 0;
      function typeChar() {
        if (charIndex <= slogan.length) {
          typedSlogan.value = slogan.slice(0, charIndex);
          charIndex++;
          typingTimer = setTimeout(typeChar, 60);
        } else {
          setTimeout(() => {
            sloganTypingIndex = (sloganTypingIndex + 1) % sloganList.length;
            startTypingSlogan();
          }, 1800);
        }
      }
      typeChar();
    }
    common_vendor.onMounted(() => {
      startTypingSlogan();
      setInterval(() => {
        showCursor.value = !showCursor.value;
      }, 500);
      startCountdown();
    });
    common_vendor.onUnmounted(() => {
      if (typingTimer) {
        clearTimeout(typingTimer);
      }
    });
    const showCommentPopup = common_vendor.ref(false);
    const showEmojiPanel = common_vendor.ref(false);
    const commentText = common_vendor.ref("");
    const commentImages = common_vendor.ref([]);
    const currentMomentIndex = common_vendor.ref(-1);
    const isLikeAnimating = common_vendor.ref({});
    const page = common_vendor.ref(1);
    const pageSize = common_vendor.ref(10);
    const loading = common_vendor.ref(false);
    const hasMore = common_vendor.ref(true);
    const moments = common_vendor.ref([]);
    const liveStream = common_vendor.ref({
      isLive: true,
      // FLV 格式直播流地址（使用 flv.js 播放器支持）
      url: "https://f17aaf1317136366be2504096b9f92c6.v.smtcdns.net/pull-flv-f11.douyincdn.com/media/stream-118197556637860524_sd.flv?arch_hrchy=w1&exp_hrchy=w1&expire=1762265422&major_anchor_level=common&sign=f4175b289cb11110b19c622aa4c4f0a3&t_id=037-202510282210212F7A436DA68FDB24CF34-PXvUSV&unique_id=stream-118197556637860524_684_flv_sd&_session_id=874-202510282210226191716457F92E2E8546.1761660622619.61134&rsi=0&abr_pts=-800&tencent_test_client_ip=60.171.111.194&dispatch_from=OC_MGR220.180.244.116&utime=1761660658295&TxDispType=7&txTliveMsg=S5;TZ_EIC1LT;TZ_EIC1LT;",
      title: "抖音 FLV 直播",
      host: "抖音直播",
      viewerCount: 12580,
      muted: false,
      // 默认不静音，如果自动播放失败可以设为true
      // 备用直播源（支持 FLV 和 m3u8 格式）
      alternativeUrls: [
        "https://58a4c32cd699cb31aa5b89b77e020d6f.v.smtcdns.net/pull-flv-f11.douyincdn.com/media/stream-406441391741469356_sd.flv?arch_hrchy=w1&exp_hrchy=w1&expire=1762265553&major_anchor_level=common&sign=b2bc913a7598aa405bcf7267ba32746e&t_id=037-202510282212337F2D489521D1A425D011-eRzJth&unique_id=stream-406441391741469356_684_flv_sd&_session_id=764-20251028221234812965803771E56CB11.1761660754081.82275&rsi=0&abr_pts=-800&tencent_test_client_ip=60.171.111.194&dispatch_from=OC_MGR220.180.244.116&utime=1761660762208&TxDispType=7&txTliveMsg=S5;QZ_EIC5;QZ_EIC5;",
        "https://pull-flv-f26.douyincdn.com/media/stream-694555860336116396_sd.flv?arch_hrchy=w1&exp_hrchy=w1&expire=690a0a2e&major_anchor_level=common&sign=cd524f72dd5f86c4fceb3782bb6dc505&t_id=037-2025102822140673FAFEFD730E6D25EFDB-jaIZjj&unique_id=stream-694555860336116396_684_flv_sd&_session_id=504-202510282214068862868643E0D5709526.1761660846886.74324&rsi=0&abr_pts=-800"
      ]
    });
    let currentUrlIndex = 0;
    const handleLiveError = (e) => {
      if (liveStream.value.alternativeUrls && currentUrlIndex < liveStream.value.alternativeUrls.length - 1) {
        currentUrlIndex++;
        liveStream.value.url = liveStream.value.alternativeUrls[currentUrlIndex];
        common_vendor.index.showToast({
          title: `切换到备用源${currentUrlIndex + 1}`,
          icon: "none",
          duration: 1500
        });
      } else {
        common_vendor.index.showModal({
          title: "直播加载失败",
          content: "无法加载直播流，请检查网络连接或联系管理员。\n\n提示：blob:// 协议的URL无法在移动端使用，需要使用 http/https 的流媒体地址（如 .m3u8）",
          showCancel: false,
          confirmText: "知道了"
        });
      }
    };
    const handleLivePlay = () => {
      currentUrlIndex = liveStream.value.alternativeUrls.findIndex((url) => url === liveStream.value.url);
      if (currentUrlIndex === -1)
        currentUrlIndex = 0;
    };
    const toggleMute = () => {
      liveStream.value.muted = !liveStream.value.muted;
      common_vendor.index.showToast({
        title: liveStream.value.muted ? "已静音" : "已开启声音",
        icon: "none",
        duration: 1e3
      });
    };
    const switchLiveSource = () => {
      if (liveStream.value.alternativeUrls && liveStream.value.alternativeUrls.length > 0) {
        currentUrlIndex = (currentUrlIndex + 1) % liveStream.value.alternativeUrls.length;
        liveStream.value.url = liveStream.value.alternativeUrls[currentUrlIndex];
        liveStream.value.title = sourceNames[currentUrlIndex] || `直播源${currentUrlIndex + 1}`;
      }
    };
    const getMomentsList = async (isRefresh = false) => {
      if (loading.value || !hasMore.value && !isRefresh)
        return;
      try {
        loading.value = true;
        const minLoadTime = new Promise((resolve) => setTimeout(resolve, 800));
        const [{ result }] = await Promise.all([
          common_vendor.tr.callFunction({
            name: "wx_get_list",
            data: {
              page: isRefresh ? 1 : page.value,
              pageSize: pageSize.value
            }
          }),
          minLoadTime
        ]);
        if (result.code === 0) {
          const list = result.data.list.map((item) => {
            return {
              ...item,
              username: getRandomName(),
              avatar: anonymousAvatars[Math.floor(Math.random() * anonymousAvatars.length)],
              comments: (item.comments || []).map((c) => {
                return {
                  ...c,
                  images: c.images || [],
                  // 明确保留images字段
                  username: getRandomName(),
                  avatar: anonymousAvatars[Math.floor(Math.random() * anonymousAvatars.length)]
                };
              }),
              likes: (item.likes || []).map(() => getRandomName())
            };
          });
          if (isRefresh) {
            moments.value = list;
            page.value = 2;
          } else {
            const existingIds = new Set((moments.value || []).map((i) => i._id));
            const append = list.filter((i) => !existingIds.has(i._id));
            moments.value = [...moments.value || [], ...append];
            page.value++;
          }
          hasMore.value = result.data.hasMore;
          try {
            rebuildPhotoShowcase();
          } catch (_) {
          }
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
      setTimeout(() => {
        getMomentsList(true);
      }, 33e3);
      tryAutoPlay();
    });
    common_vendor.onHide(() => {
      pauseBgm();
    });
    common_vendor.onUnload(() => {
      pauseBgm();
    });
    common_vendor.onReachBottom(() => {
      if (!loading.value && hasMore.value) {
        getMomentsList();
      }
    });
    const handleLike = async (index) => {
      try {
        const moment = moments.value[index];
        isLikeAnimating.value[index] = true;
        const { result } = await common_vendor.tr.callFunction({
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
            moment.likes.push(getRandomName());
          } else {
            moment.likes.pop();
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
      if (!commentText.value.trim() && commentImages.value.length === 0)
        return;
      const tempContent = commentText.value;
      const tempImages = [...commentImages.value];
      showCommentPopup.value = false;
      showEmojiPanel.value = false;
      commentText.value = "";
      commentImages.value = [];
      common_vendor.index.showLoading({
        title: "发送中...",
        mask: true
      });
      try {
        const { result } = await common_vendor.tr.callFunction({
          name: "wx_add_comment",
          data: {
            momentId: moments.value[currentMomentIndex.value]._id,
            content: tempContent,
            images: tempImages
          }
        });
        if (result.code === 0) {
          const moment = moments.value[currentMomentIndex.value];
          if (!moment.comments) {
            moment.comments = [];
          }
          const randomAvatar = anonymousAvatars[Math.floor(Math.random() * anonymousAvatars.length)];
          moment.comments.push({
            username: getRandomName(),
            avatar: randomAvatar,
            content: tempContent,
            images: tempImages,
            create_time: Date.now(),
            isNew: true
            // 标记为新评论，用于动画
          });
          setTimeout(() => {
            const commentIndex = moment.comments.length - 1;
            if (moment.comments[commentIndex]) {
              delete moment.comments[commentIndex].isNew;
            }
          }, 500);
          common_vendor.index.hideLoading();
          const successMsg = result.msg || "评论成功";
          common_vendor.index.showToast({
            title: successMsg,
            icon: "success",
            duration: 1500
          });
        } else {
          throw new Error(result.msg || "评论失败");
        }
      } catch (error) {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: error.message || "评论失败",
          icon: "none",
          duration: 2e3
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
      commentImages.value = [];
      currentMomentIndex.value = -1;
    };
    const toggleEmojiPanel = () => {
      showEmojiPanel.value = !showEmojiPanel.value;
    };
    const insertEmoji = (emoji) => {
      commentText.value += emoji;
    };
    const chooseCommentImage = () => {
      if (commentImages.value.length >= 3) {
        common_vendor.index.showToast({
          title: "最多上传3张图片",
          icon: "none"
        });
        return;
      }
      common_vendor.index.chooseImage({
        count: 3 - commentImages.value.length,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: async (res) => {
          common_vendor.index.showLoading({
            title: "上传中..."
          });
          try {
            const uploadPromises = res.tempFilePaths.map((filePath) => {
              return new Promise((resolve, reject) => {
                common_vendor.index.uploadFile({
                  url: UPLOAD_URL,
                  filePath,
                  name: "file",
                  success: (uploadRes) => {
                    try {
                      const data = JSON.parse(uploadRes.data);
                      if (data.status) {
                        resolve(data.data.links.url);
                      } else {
                        reject(new Error(data.message || "上传失败"));
                      }
                    } catch (e) {
                      reject(new Error("解析上传结果失败"));
                    }
                  },
                  fail: (err) => {
                    reject(err);
                  }
                });
              });
            });
            const uploadedUrls = await Promise.all(uploadPromises);
            commentImages.value.push(...uploadedUrls);
            common_vendor.index.hideLoading();
            common_vendor.index.showToast({
              title: "上传成功",
              icon: "success"
            });
          } catch (error) {
            common_vendor.index.hideLoading();
            common_vendor.index.showToast({
              title: error.message || "上传失败",
              icon: "none"
            });
          }
        }
      });
    };
    const deleteCommentImage = (index) => {
      commentImages.value.splice(index, 1);
    };
    const previewImage = (urls, current) => {
      if (!urls || !urls.length)
        return;
      common_vendor.index.previewImage({
        urls,
        current
      });
    };
    const handleVideoError = () => {
      common_vendor.index.showToast({
        title: "视频加载失败",
        icon: "none"
      });
    };
    const handleSettings = () => {
      common_vendor.index.showActionSheet({
        itemList: ["切换主题", "内容偏好", "帮助与反馈"],
        success: (res) => {
          const t = res.tapIndex;
          if (t === 0)
            common_vendor.index.showToast({ title: "已切换主题", icon: "none" });
          if (t === 1)
            common_vendor.index.showToast({ title: "偏好设置暂未开放", icon: "none" });
          if (t === 2)
            common_vendor.index.showToast({ title: "感谢你的反馈", icon: "none" });
        }
      });
    };
    const parallaxY = common_vendor.ref(0);
    common_vendor.onPageScroll((e) => {
      const y = e.scrollTop || 0;
      parallaxY.value = Math.min(30, y * 0.2);
    });
    const themeClass = common_vendor.ref("theme-day");
    const updateThemeByTime = () => {
      const hour = (/* @__PURE__ */ new Date()).getHours();
      if (hour >= 6 && hour < 11)
        themeClass.value = "theme-morning";
      else if (hour >= 11 && hour < 18)
        themeClass.value = "theme-day";
      else
        themeClass.value = "theme-night";
    };
    common_vendor.onMounted(() => {
      updateThemeByTime();
      setInterval(updateThemeByTime, 10 * 60 * 1e3);
    });
    const formatCount = (n) => {
      if (!n && n !== 0)
        return "0";
      if (n >= 1e4)
        return (n / 1e4).toFixed(1).replace(/\.0$/, "") + "w";
      if (n >= 1e3)
        return (n / 1e3).toFixed(1).replace(/\.0$/, "") + "k";
      return String(n);
    };
    const getHeatScore = (item) => {
      const likes = item.likes && item.likes.length || 0;
      const comments = item.comments && item.comments.length || 0;
      const isVideo = item.mediaType === "video";
      return Math.floor(likes * 3 + comments * 5 + (isVideo ? 18 : 8));
    };
    common_vendor.ref("recommend");
    const isExpanded = common_vendor.ref({});
    const toggleExpand = (index) => {
      isExpanded.value[index] = !isExpanded.value[index];
    };
    common_vendor.ref([
      { tag: "# 精选", title: "今日热聊：匿名也要有态度", sub: "来一条走心的分享吧" },
      { tag: "# 新鲜", title: "你的小确幸，值得被看到", sub: "记录当下，温暖一整天" },
      { tag: "# 附近", title: "发现身边的美好瞬间", sub: "同城热点，马上加入" }
    ]);
    const handleMore = (index) => {
      common_vendor.index.showActionSheet({
        itemList: ["举报", "拉黑", "不感兴趣"],
        success: (res) => {
          const tap = res.tapIndex;
          if (tap === 0) {
            common_vendor.index.showToast({ title: "已收到举报", icon: "none" });
          } else if (tap === 1) {
            common_vendor.index.showToast({ title: "已拉黑该用户", icon: "none" });
          } else if (tap === 2) {
            common_vendor.index.showToast({ title: "将减少类似内容", icon: "none" });
          }
        }
      });
    };
    const showRatingModal = (index) => {
      currentRatingIndex.value = index;
      currentRatingItem.value = moments.value[index];
      currentRating.value = 0;
      ratingComment.value = "";
      showRatingPopup.value = true;
    };
    const viewRatingDetails = (index) => {
      var _a, _b, _c;
      const item = moments.value[index];
      common_vendor.index.showModal({
        title: `${ratingTypeLabel(item.ratingType)}详情`,
        content: `平均分：${((_b = (_a = item.ratingStats) == null ? void 0 : _a.average) == null ? void 0 : _b.toFixed(1)) || 0}分
评分人数：${((_c = item.ratingStats) == null ? void 0 : _c.count) || 0}人
评分范围：${item.ratingMin}-${item.ratingMax}分`,
        showCancel: false
      });
    };
    common_vendor.ref([
      { text: "# 今天你匿名表白了吗", views: "12.3w", posts: "2.1k", emoji: "💌", badge: "热议", badgeType: "badge-hot", cta: "参与" },
      { text: "# 城市树洞：你的小烦恼", views: "8.7w", posts: "1.2k", emoji: "🌆", badge: "同城", badgeType: "badge-near", cta: "去看看", mood: "氛围很暖" },
      { text: "# 三件让你快乐的小事", views: "6.5w", posts: "980", emoji: "✨", badge: "精选", badgeType: "badge-new", cta: "我也分享" }
    ]);
    const isBgmPlaying = common_vendor.ref(false);
    let bgmInstance = null;
    const bgmUrlList = [
      // 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      // 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      // 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
    ];
    let bgmIndex = Math.floor(Math.random() * bgmUrlList.length);
    const currentBgm = () => bgmUrlList[bgmIndex % bgmUrlList.length];
    const nextBgm = () => {
      bgmIndex = (bgmIndex + 1) % bgmUrlList.length;
      return currentBgm();
    };
    const ensureBgm = () => {
      if (typeof Audio === "undefined")
        return null;
      if (!bgmInstance) {
        bgmInstance = new Audio(currentBgm());
        bgmInstance.loop = true;
        bgmInstance.preload = "auto";
        bgmInstance.volume = 0.6;
        bgmInstance.onerror = () => {
          try {
            const src = nextBgm();
            bgmInstance.src = src;
            if (isBgmPlaying.value) {
              bgmInstance.play().catch(() => {
                isBgmPlaying.value = false;
                common_vendor.index.showToast({ title: "背景音乐需手动播放", icon: "none" });
              });
            }
          } catch (e) {
          }
        };
      }
      return bgmInstance;
    };
    const extractPhotoPool = () => {
      const pool = [];
      (moments.value || []).forEach((m) => {
        if (m.mediaType === "image" && Array.isArray(m.mediaUrls)) {
          m.mediaUrls.forEach((u) => {
            if (u)
              pool.push({ url: u });
          });
        }
        if (Array.isArray(m.mediaList)) {
          m.mediaList.filter((x) => x && x.type === "image" && x.url).forEach((x) => pool.push({ url: x.url }));
        }
      });
      return pool;
    };
    const insCaptions = [
      "today vibes",
      "mood on",
      "little joy",
      "city walk",
      "coffee o’clock",
      "soft light",
      "daily look",
      "slow life"
    ];
    const randomCaption = () => insCaptions[Math.floor(Math.random() * insCaptions.length)];
    const photoShowcase = common_vendor.ref([]);
    const rebuildPhotoShowcase = () => {
      const pool = extractPhotoPool();
      if (!pool.length) {
        photoShowcase.value = [];
        return;
      }
      const mixed = pool.sort(() => Math.random() - 0.5).slice(0, 8);
      photoShowcase.value = mixed.map((p) => ({
        ...p,
        likes: Math.floor(100 + Math.random() * 9e3),
        emoji: ["💖", "🌸", "📸", "😊", "☕", "👗", "🧋", "✨"][Math.floor(Math.random() * 8)],
        caption: randomCaption()
      }));
    };
    const shufflePhotos = () => {
      rebuildPhotoShowcase();
    };
    const previewPhoto = (idx) => {
      const urls = photoShowcase.value.map((p) => p.url);
      common_vendor.index.previewImage({ urls, current: urls[idx] });
    };
    const contactLabel = (t) => ({ wechat: "微信", phone: "手机", qq: "QQ", email: "邮箱" })[t] || "联系";
    const ratingTypeLabel = (t) => ({ beauty: "颜值评分", style: "穿搭评分", photo: "照片评分" })[t] || "评分";
    const showRatingPopup = common_vendor.ref(false);
    const currentRatingItem = common_vendor.ref(null);
    const currentRating = common_vendor.ref(0);
    const ratingComment = common_vendor.ref("");
    const currentRatingIndex = common_vendor.ref(-1);
    common_vendor.onShow(() => {
      setTimeout(() => rebuildPhotoShowcase(), 400);
      startPhotoRotation();
    });
    common_vendor.onHide(() => {
      stopPhotoRotation();
    });
    common_vendor.onUnload(() => {
      stopPhotoRotation();
    });
    let photoRotationTimer = null;
    const startPhotoRotation = () => {
      if (photoRotationTimer)
        return;
      photoRotationTimer = setInterval(() => {
        rebuildPhotoShowcase();
      }, 5e3);
    };
    const stopPhotoRotation = () => {
      if (photoRotationTimer) {
        clearInterval(photoRotationTimer);
        photoRotationTimer = null;
      }
    };
    const pauseBgm = () => {
      if (bgmInstance) {
        try {
          bgmInstance.pause();
        } catch (e) {
        }
      }
      isBgmPlaying.value = false;
    };
    const fadeVolume = (to = 0.6, durationMs = 1200) => {
      const el = bgmInstance;
      if (!el)
        return;
      const from = el.volume || 0;
      const steps = Math.max(1, Math.floor(durationMs / 80));
      let i = 0;
      const timer = setInterval(() => {
        i++;
        el.volume = from + (to - from) * (i / steps);
        if (i >= steps)
          clearInterval(timer);
      }, 80);
    };
    let autoPlayBound = false;
    const onFirstUserGesture = () => {
      tryAutoPlay();
    };
    const bindAutoPlayListeners = () => {
      if (typeof document === "undefined" || autoPlayBound)
        return;
      ["touchstart", "click", "wheel", "keydown"].forEach((evt) => {
        try {
          document.addEventListener(evt, onFirstUserGesture, { once: true, passive: true });
        } catch (_) {
        }
      });
      autoPlayBound = true;
    };
    const unbindAutoPlayListeners = () => {
      if (typeof document === "undefined")
        return;
      ["touchstart", "click", "wheel", "keydown"].forEach((evt) => {
        try {
          document.removeEventListener(evt, onFirstUserGesture);
        } catch (_) {
        }
      });
      autoPlayBound = false;
    };
    const tryAutoPlay = () => {
      const el = ensureBgm();
      if (!el)
        return;
      el.muted = true;
      el.volume = 0;
      el.play().then(() => {
        isBgmPlaying.value = true;
        el.muted = false;
        fadeVolume(0.6, 1200);
        unbindAutoPlayListeners();
      }).catch(() => {
        bindAutoPlayListeners();
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
    const showDisclaimer = common_vendor.ref(true);
    const countdown = common_vendor.ref(10);
    let disclaimerTimer = null;
    const closeDisclaimer = () => {
      showDisclaimer.value = false;
      if (disclaimerTimer) {
        clearInterval(disclaimerTimer);
        disclaimerTimer = null;
      }
    };
    const startCountdown = () => {
      disclaimerTimer = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
          closeDisclaimer();
        }
      }, 1e3);
    };
    const handleReport = (index) => {
      moments.value[index];
      common_vendor.index.showActionSheet({
        title: "举报内容",
        itemList: [
          "色情低俗",
          "暴力血腥",
          "政治敏感",
          "诈骗信息",
          "垃圾广告",
          "其他违规"
        ],
        success: (res) => {
          const reportTypes = [
            "色情低俗",
            "暴力血腥",
            "政治敏感",
            "诈骗信息",
            "垃圾广告",
            "其他违规"
          ];
          const reportType = reportTypes[res.tapIndex];
          common_vendor.index.showModal({
            title: "确认举报",
            content: `确定要举报此内容为"${reportType}"吗？`,
            success: (modalRes) => {
              if (modalRes.confirm) {
                submitReport(index);
              }
            }
          });
        }
      });
    };
    const submitReport = async (index, reportType) => {
      try {
        common_vendor.index.showLoading({ title: "处理中..." });
        const moment = moments.value[index];
        const { result } = await common_vendor.tr.callFunction({
          name: "wx_del",
          data: {
            momentId: moment._id
          }
        });
        if (result.code === 0) {
          moments.value.splice(index, 1);
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({
            title: "举报已成功",
            icon: "none",
            duration: 2e3
          });
        } else {
          throw new Error(result.msg || "删除失败");
        }
      } catch (error) {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: error.message || "操作失败，请重试",
          icon: "none"
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: showDisclaimer.value
      }, showDisclaimer.value ? {
        b: common_vendor.t(countdown.value),
        c: common_vendor.o(closeDisclaimer)
      } : {}, {
        d: common_vendor.unref(headerBg),
        e: `translateY(${parallaxY.value}px) scale(1.06)`,
        f: common_vendor.o(handleSettings),
        g: common_vendor.unref(defaultAvatar),
        h: common_vendor.t(common_vendor.unref(todayMood)),
        i: common_vendor.o(handleCamera),
        j: photoShowcase.value.length
      }, photoShowcase.value.length ? {
        k: common_vendor.o(shufflePhotos),
        l: common_vendor.f(photoShowcase.value, (p, i, i0) => {
          return {
            a: p.url,
            b: common_vendor.t(p.emoji),
            c: common_vendor.t(p.caption),
            d: common_vendor.t(formatCount(p.likes)),
            e: i,
            f: common_vendor.o(($event) => previewPhoto(i), i)
          };
        })
      } : {}, {
        m: liveStream.value.isLive
      }, liveStream.value.isLive ? common_vendor.e({
        n: common_vendor.o(handleLiveError),
        o: common_vendor.o(handleLivePlay),
        p: common_vendor.p({
          src: liveStream.value.url,
          autoplay: true,
          muted: liveStream.value.muted,
          controls: true
        }),
        q: liveStream.value.muted
      }, liveStream.value.muted ? {
        r: common_vendor.o(toggleMute)
      } : {}, {
        s: common_vendor.o(switchLiveSource)
      }) : {}, {
        t: common_vendor.f(moments.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.avatar,
            b: common_vendor.t(item.username),
            c: item.mediaType
          }, item.mediaType ? {} : {}, {
            d: common_vendor.t(item.content),
            e: !isExpanded.value[index] ? 1 : "",
            f: item.content && item.content.length > 60
          }, item.content && item.content.length > 60 ? {
            g: common_vendor.t(isExpanded.value[index] ? "收起" : "展开"),
            h: common_vendor.o(($event) => toggleExpand(index), index)
          } : {}, {
            i: item.mediaType
          }, item.mediaType ? common_vendor.e({
            j: item.mediaType === "video"
          }, item.mediaType === "video" ? {
            k: item.mediaUrl,
            l: item.poster,
            m: common_vendor.o(handleVideoError, index)
          } : item.mediaType === "image" ? {
            o: common_vendor.f(item.mediaUrls, (url, imgIndex, i1) => {
              return {
                a: imgIndex,
                b: url,
                c: common_vendor.o(($event) => previewImage(item.mediaUrls, url), imgIndex)
              };
            }),
            p: common_vendor.n(`columns-${item.mediaUrls.length}`)
          } : {}, {
            n: item.mediaType === "image",
            q: common_vendor.t(formatCount(getHeatScore(item)))
          }) : {}, {
            r: common_vendor.t(item.time),
            s: common_vendor.t(item.isLiked ? "❤️" : "🤍"),
            t: common_vendor.t(item.isLiked ? "已赞" : "点赞"),
            v: common_vendor.t(item.likes && item.likes.length || 0),
            w: isLikeAnimating.value[index]
          }, isLikeAnimating.value[index] ? {
            x: common_vendor.f(8, (n, k1, i1) => {
              return {
                a: n,
                b: common_vendor.n("p" + n)
              };
            })
          } : {}, {
            y: item.isLiked ? 1 : "",
            z: isLikeAnimating.value[index] ? 1 : "",
            A: common_vendor.o(($event) => handleLike(index), index),
            B: common_vendor.t(item.comments && item.comments.length || 0),
            C: common_vendor.o(($event) => handleComment(index), index),
            D: common_vendor.o(($event) => handleReport(index), index),
            E: item.likes && item.likes.length
          }, item.likes && item.likes.length ? {
            F: common_vendor.t(item.likes.join("、"))
          } : {}, {
            G: item.contactValue
          }, item.contactValue ? {
            H: common_vendor.t(contactLabel(item.contactType)),
            I: common_vendor.t(item.contactValue)
          } : {}, {
            J: item.ratingType
          }, item.ratingType ? common_vendor.e({
            K: common_vendor.t(ratingTypeLabel(item.ratingType)),
            L: common_vendor.t(item.ratingMin),
            M: common_vendor.t(item.ratingMax),
            N: item.ratingStats
          }, item.ratingStats ? {
            O: common_vendor.t(item.ratingStats.average.toFixed(1)),
            P: common_vendor.t(item.ratingStats.count)
          } : {}, {
            Q: common_vendor.o(($event) => showRatingModal(index), index),
            R: common_vendor.o(($event) => viewRatingDetails(index), index)
          }) : {}, {
            S: item.comments && item.comments.length !== 0
          }, item.comments && item.comments.length !== 0 ? {
            T: common_vendor.f(item.comments, (comment, cIndex, i1) => {
              return common_vendor.e({
                a: comment.avatar || common_vendor.unref(anonymousAvatar),
                b: common_vendor.t(comment.username),
                c: common_vendor.t(comment.content),
                d: comment.images && comment.images.length > 0
              }, comment.images && comment.images.length > 0 ? {
                e: common_vendor.f(comment.images, (img, imgIdx, i2) => {
                  return {
                    a: imgIdx,
                    b: img,
                    c: common_vendor.o(($event) => previewImage(comment.images, img), imgIdx)
                  };
                })
              } : {}, {
                f: comment.isNew ? 1 : "",
                g: cIndex
              });
            })
          } : {}, {
            U: common_vendor.o(($event) => handleMore(), index),
            V: index
          });
        }),
        v: showCommentPopup.value
      }, showCommentPopup.value ? common_vendor.e({
        w: showCommentPopup.value,
        x: common_vendor.o(submitComment),
        y: commentText.value,
        z: common_vendor.o(($event) => commentText.value = $event.detail.value),
        A: commentImages.value.length > 0
      }, commentImages.value.length > 0 ? {
        B: common_vendor.f(commentImages.value, (img, idx, i0) => {
          return {
            a: img,
            b: common_vendor.o(($event) => deleteCommentImage(idx), idx),
            c: idx
          };
        })
      } : {}, {
        C: common_vendor.o(toggleEmojiPanel),
        D: commentImages.value.length > 0
      }, commentImages.value.length > 0 ? {
        E: common_vendor.t(commentImages.value.length)
      } : {}, {
        F: common_vendor.o(chooseCommentImage),
        G: commentText.value.trim() || commentImages.value.length > 0 ? 1 : "",
        H: common_vendor.o(submitComment),
        I: showEmojiPanel.value
      }, showEmojiPanel.value ? {
        J: common_vendor.f(emojiList, (emoji, index, i0) => {
          return {
            a: common_vendor.t(emoji),
            b: index,
            c: common_vendor.o(($event) => insertEmoji(emoji), index)
          };
        })
      } : {}, {
        K: common_vendor.o(() => {
        }),
        L: common_vendor.o(closeCommentPopup)
      }) : {}, {
        M: common_vendor.n(themeClass.value),
        N: common_vendor.n({
          "disclaimer-hidden": !showDisclaimer.value
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ca836512"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/wx/home/index.js.map
