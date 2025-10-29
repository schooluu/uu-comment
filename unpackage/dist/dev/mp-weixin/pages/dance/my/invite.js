"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "invite",
  setup(__props) {
    const inviteCode = common_vendor.ref("FANCY888");
    const inviteRecords = common_vendor.ref([
      {
        id: 1,
        name: "小明",
        avatar: "/static/images/avatar1.jpg",
        time: "2024-03-15",
        points: 100
      },
      {
        id: 2,
        name: "小红",
        avatar: "/static/images/avatar2.jpg",
        time: "2024-03-10",
        points: 100
      }
    ]);
    const copyCode = () => {
      common_vendor.index.setClipboardData({
        data: inviteCode.value,
        success: () => {
          common_vendor.index.showToast({
            title: "复制成功",
            icon: "success"
          });
        }
      });
    };
    const share = () => {
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(inviteCode.value),
        b: common_vendor.o(copyCode),
        c: common_vendor.t(inviteRecords.value.length),
        d: common_vendor.f(inviteRecords.value, (record, k0, i0) => {
          return {
            a: record.avatar,
            b: common_vendor.t(record.name),
            c: common_vendor.t(record.time),
            d: common_vendor.t(record.points),
            e: record.id
          };
        }),
        e: common_vendor.o(share)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/dance/my/invite.js.map
