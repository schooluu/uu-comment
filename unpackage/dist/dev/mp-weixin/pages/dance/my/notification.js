"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "notification",
  setup(__props) {
    const tabs = ["全部", "课程", "活动", "系统"];
    const currentTab = common_vendor.ref(0);
    const notifications = common_vendor.ref([
      {
        id: 1,
        title: "课程提醒",
        message: "您预约的JAZZ基础课程将在明天19:00开始，请准时参加。",
        time: "10分钟前",
        type: "course",
        read: false
      },
      {
        id: 2,
        title: "活动通知",
        message: "2024年度舞蹈展演报名开始啦！",
        time: "2小时前",
        type: "activity",
        read: true
      },
      {
        id: 3,
        title: "系统通知",
        message: "您的会员卡将在7天后到期，请及时续费。",
        time: "1天前",
        type: "system",
        read: true
      }
    ]);
    const switchTab = (index) => {
      currentTab.value = index;
    };
    const clearAll = () => {
      common_vendor.index.showModal({
        title: "清空通知",
        content: "确定要清空所有通知吗？",
        success: (res) => {
          if (res.confirm) {
            notifications.value = [];
            common_vendor.index.showToast({
              title: "已清空",
              icon: "success"
            });
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(clearAll),
        b: common_vendor.f(tabs, (tab, index, i0) => {
          return {
            a: common_vendor.t(tab),
            b: index,
            c: currentTab.value === index ? 1 : "",
            d: common_vendor.o(($event) => switchTab(index), index)
          };
        }),
        c: common_vendor.f(notifications.value, (item, k0, i0) => {
          return common_vendor.e({
            a: !item.read
          }, !item.read ? {} : {}, {
            b: common_vendor.t(item.title),
            c: common_vendor.t(item.message),
            d: common_vendor.t(item.time),
            e: item.id,
            f: !item.read ? 1 : ""
          });
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/dance/my/notification.js.map
