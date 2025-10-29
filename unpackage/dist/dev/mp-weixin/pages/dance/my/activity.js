"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "activity",
  setup(__props) {
    const activities = common_vendor.ref([
      {
        id: 1,
        name: "2024年度舞蹈展演",
        time: "2024.12.31 19:00",
        location: "上海大剧院",
        price: 199,
        cover: "/static/images/activities/show1.jpg",
        status: "available"
      },
      {
        id: 2,
        name: "JAZZ大师课",
        time: "2024.11.20 14:00",
        location: "FancyFancy舞室大悦城店",
        price: 299,
        cover: "/static/images/activities/master1.jpg",
        status: "full"
      }
    ]);
    const getStatusText = (status) => {
      const statusMap = {
        "available": "立即报名",
        "full": "已满员",
        "joined": "已报名"
      };
      return statusMap[status];
    };
    const joinActivity = (activity) => {
      switch (activity.status) {
        case "available":
          common_vendor.index.navigateTo({
            url: `/pages/dance/activity/join?id=${activity.id}`
          });
          break;
        case "full":
          common_vendor.index.showToast({
            title: "活动已满",
            icon: "none"
          });
          break;
        case "joined":
          common_vendor.index.navigateTo({
            url: `/pages/dance/activity/detail?id=${activity.id}`
          });
          break;
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(activities.value, (activity, k0, i0) => {
          return {
            a: activity.cover,
            b: common_vendor.t(activity.name),
            c: common_vendor.t(activity.time),
            d: common_vendor.t(activity.location),
            e: common_vendor.t(activity.price),
            f: common_vendor.t(getStatusText(activity.status)),
            g: common_vendor.n(activity.status),
            h: common_vendor.o(($event) => joinActivity(activity), activity.id),
            i: activity.id
          };
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/dance/my/activity.js.map
