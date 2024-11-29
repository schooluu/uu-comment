"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  _easycom_uni_rate2();
}
const _easycom_uni_rate = () => "../../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
if (!Math) {
  _easycom_uni_rate();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "detail",
  setup(__props) {
    const company = common_vendor.ref(null);
    const comments = common_vendor.ref([]);
    const newRating = common_vendor.ref(0);
    const newComment = common_vendor.ref("");
    const statusBarHeight = common_vendor.index.getSystemInfoSync().statusBarHeight;
    const currentTheme = common_vendor.ref("default");
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const handleShare = () => {
      common_vendor.index.showShareMenu({
        withShareTicket: true,
        menus: ["shareAppMessage", "shareTimeline"]
      });
    };
    const getCompanyDetail = async (id) => {
      common_vendor.index.showLoading({ title: "加载中..." });
      try {
        const { result } = await common_vendor.Ys.callFunction({
          name: "getCompanyDetail",
          data: { id }
        });
        if (result.code === 0) {
          company.value = result.data;
        }
      } catch (error) {
        common_vendor.index.showToast({
          title: "获取详情失败",
          icon: "none"
        });
      } finally {
        common_vendor.index.hideLoading();
      }
    };
    const getComments = async (companyId) => {
      try {
        const { result } = await common_vendor.Ys.callFunction({
          name: "getCompanyComments",
          data: { companyId }
        });
        if (result.code === 0) {
          comments.value = result.data;
        }
      } catch (error) {
        common_vendor.index.showToast({
          title: "获取评论失败",
          icon: "none"
        });
      }
    };
    const submitComment = async () => {
      try {
        common_vendor.index.showLoading({ title: "发表中..." });
        const { result } = await common_vendor.Ys.callFunction({
          name: "addCompanyComment",
          data: {
            companyId: company.value._id,
            content: newComment.value,
            rating: newRating.value
          }
        });
        if (result.code === 0) {
          common_vendor.index.showToast({ title: "评论成功" });
          newComment.value = "";
          newRating.value = 0;
          await getComments(company.value._id);
        }
        common_vendor.index.hideLoading();
      } catch (error) {
        common_vendor.index.showToast({
          title: "评论失败",
          icon: "none"
        });
      }
    };
    const formatTime = (timestamp) => {
      const date = new Date(timestamp);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    };
    common_vendor.onMounted(() => {
      const savedTheme = common_vendor.index.getStorageSync("theme");
      if (savedTheme) {
        currentTheme.value = savedTheme;
      }
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      const id = currentPage.options.id;
      if (id) {
        getCompanyDetail(id);
        getComments(id);
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(goBack),
        b: common_vendor.o(handleShare),
        c: common_vendor.unref(statusBarHeight) + "px",
        d: company.value
      }, company.value ? {
        e: common_vendor.t(company.value.companyName),
        f: common_vendor.p({
          value: company.value.rating,
          size: "15"
        }),
        g: common_vendor.t(company.value.reviewCount || 0),
        h: common_vendor.t(company.value.viewCount || 0),
        i: common_vendor.t(company.value.address)
      } : {}, {
        j: company.value
      }, company.value ? {
        k: common_vendor.t(company.value.cons)
      } : {}, {
        l: common_vendor.t(comments.value.length),
        m: common_vendor.f(comments.value, (comment, k0, i0) => {
          return {
            a: common_vendor.t(comment.userName || "匿名用户"),
            b: "3312192e-1-" + i0,
            c: common_vendor.p({
              value: comment.rating,
              size: "15"
            }),
            d: common_vendor.t(formatTime(comment.createdAt)),
            e: common_vendor.t(comment.content),
            f: comment._id
          };
        }),
        n: common_vendor.o(($event) => newRating.value = $event),
        o: common_vendor.p({
          size: "20",
          modelValue: newRating.value
        }),
        p: common_vendor.o(submitComment),
        q: newComment.value,
        r: common_vendor.o(($event) => newComment.value = $event.detail.value),
        s: common_vendor.o(submitComment),
        t: common_vendor.unref(statusBarHeight) + 88 + "rpx",
        v: common_vendor.n(`theme-${currentTheme.value}`)
      });
    };
  }
});
qq.createPage(_sfc_main);
