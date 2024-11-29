"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Math) {
  TabBar();
}
const TabBar = () => "../../../components/dance/tab-bar.js";
const defaultAvatar = "default-avatar-url";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const classMenu = common_vendor.ref([
      { id: 1, name: "常规课程", icon: "📅", path: "/pages/dance/course/regular" },
      { id: 2, name: "私教", icon: "👤", path: "/pages/dance/course/private" },
      { id: 3, name: "赠送", icon: "🎁", path: "/pages/dance/course/gift" }
    ]);
    const otherMenu = common_vendor.ref([
      { id: 1, name: "券包", icon: "🎫", path: "/pages/dance/my/coupon" },
      { id: 2, name: "活动报名", icon: "🎯", path: "/pages/dance/my/activity" },
      { id: 3, name: "消费记录", icon: "📝", path: "/pages/dance/my/record" },
      { id: 4, name: "积分兑换", icon: "💎", path: "/pages/dance/my/points" },
      { id: 5, name: "我的邀请", icon: "👥", path: "/pages/dance/my/invite" },
      { id: 6, name: "我的收藏", icon: "❤️", path: "/pages/dance/my/favorite" },
      { id: 7, name: "分享", icon: "📤", path: "/pages/dance/my/share" },
      { id: 8, name: "通知", icon: "🔔", path: "/pages/dance/my/notification" },
      { id: 9, name: "申请开票", icon: "📄", path: "/pages/dance/my/invoice" },
      { id: 10, name: "意见反���", icon: "💭", path: "/pages/dance/my/feedback" }
    ]);
    common_vendor.ref([
      { id: 1, name: "首页", icon: "🏠", path: "/pages/dance/home/index" },
      { id: 2, name: "课程", icon: "🎵", path: "/pages/dance/course/index" },
      { id: 3, name: "我的", icon: "👤", path: "/pages/dance/my/index" }
    ]);
    const handleLogin = () => {
      common_vendor.index.navigateTo({
        url: "/pages/dance/login/index"
      });
    };
    const navigateTo = (path) => {
      if (path.includes("/pages/dance/course/")) {
        common_vendor.index.switchTab({
          url: path
        });
      } else {
        common_vendor.index.navigateTo({
          url: path
        });
      }
    };
    const currentPath = common_vendor.computed(() => {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      return `/${currentPage.route}`;
    });
    const isLoggedIn = common_vendor.ref(false);
    const userInfo = common_vendor.ref({
      avatar: "",
      nickname: "",
      phone: ""
    });
    const stats = common_vendor.ref({
      reserved: 0,
      attended: 0,
      cancelled: 0
    });
    const editProfile = () => {
      common_vendor.index.navigateTo({
        url: "/pages/dance/my/profile"
      });
    };
    common_vendor.onMounted(() => {
      checkLoginStatus();
    });
    const checkLoginStatus = () => {
      const token = common_vendor.index.getStorageSync("token");
      if (token) {
        isLoggedIn.value = true;
        getUserInfo();
        getStats();
      }
    };
    const getUserInfo = () => {
      userInfo.value = {
        avatar: "user-avatar-url",
        nickname: "张三",
        phone: "133****3856"
      };
    };
    const getStats = () => {
      stats.value = {
        reserved: 5,
        attended: 12,
        cancelled: 1
      };
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isLoggedIn.value
      }, isLoggedIn.value ? {
        b: userInfo.value.avatar || defaultAvatar,
        c: common_vendor.t(userInfo.value.nickname || "用户"),
        d: common_vendor.t(userInfo.value.phone || ""),
        e: common_vendor.o(editProfile)
      } : {
        f: common_vendor.o(handleLogin)
      }, {
        g: isLoggedIn.value
      }, isLoggedIn.value ? {
        h: common_vendor.t(stats.value.reserved || 0),
        i: common_vendor.t(stats.value.attended || 0),
        j: common_vendor.t(stats.value.cancelled || 0)
      } : {}, {
        k: common_vendor.f(classMenu.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.icon),
            b: common_vendor.t(item.name),
            c: item.id,
            d: common_vendor.o(($event) => navigateTo(item.path), item.id)
          };
        }),
        l: common_vendor.f(otherMenu.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.icon),
            b: common_vendor.t(item.name),
            c: item.id,
            d: common_vendor.o(($event) => navigateTo(item.path), item.id)
          };
        }),
        m: common_vendor.p({
          current: currentPath.value
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a7526a8c"]]);
qq.createPage(MiniProgramPage);
