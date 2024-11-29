"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
const _sfc_main = {
  __name: "invite",
  setup(__props) {
    const inviteReward = common_vendor.ref("50.00");
    const newUserReward = common_vendor.ref("30.00");
    const inviteCode = common_vendor.ref("HT888888");
    const shareMethods = common_vendor.ref([
      { id: 1, name: "微信", icon: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg", type: "wechat" },
      { id: 2, name: "朋友圈", icon: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg", type: "moments" },
      { id: 3, name: "微博", icon: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg", type: "weibo" },
      { id: 4, name: "复制链接", icon: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg", type: "link" }
    ]);
    const rules = common_vendor.ref([
      "新用户通过您的邀请码注册后，双方可获得相应奖励",
      "新用户首次下单后，邀请奖励将自动发放到账户余额",
      "每位用户最多可邀请50位好友",
      "对于恶意刷奖励的行为，平台有权取消奖励资格",
      "活动最终解释权归喜茶所有"
    ]);
    const records = common_vendor.ref([
      {
        id: 1,
        nickname: "小明",
        avatar: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
        time: "2024-01-20 14:30",
        status: "completed",
        reward: "50.00"
      },
      {
        id: 2,
        nickname: "小红",
        avatar: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
        time: "2024-01-19 15:20",
        status: "pending"
      },
      {
        id: 3,
        nickname: "小张",
        avatar: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
        time: "2024-01-18 10:15",
        status: "completed",
        reward: "50.00"
      }
    ]);
    const getStatusText = (status) => {
      const statusMap = {
        completed: "已完成",
        pending: "待完成首单"
      };
      return statusMap[status];
    };
    const copyInviteCode = () => {
      common_vendor.index.setClipboardData({
        data: inviteCode.value,
        success: () => {
          common_vendor.index.showToast({
            title: "邀请码已复制",
            icon: "success"
          });
        }
      });
    };
    const handleShare = (method) => {
      switch (method.type) {
        case "wechat":
          break;
        case "moments":
          break;
        case "weibo":
          break;
        case "link":
          common_vendor.index.setClipboardData({
            data: `https://heytea.com/invite?code=${inviteCode.value}`,
            success: () => {
              common_vendor.index.showToast({
                title: "链接已复制",
                icon: "success"
              });
            }
          });
          break;
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(inviteReward.value),
        b: common_vendor.t(newUserReward.value),
        c: common_vendor.t(inviteCode.value),
        d: common_vendor.o(copyInviteCode),
        e: common_vendor.f(shareMethods.value, (method, k0, i0) => {
          return {
            a: method.icon,
            b: common_vendor.t(method.name),
            c: method.id,
            d: common_vendor.o(($event) => handleShare(method), method.id)
          };
        }),
        f: common_vendor.f(rules.value, (rule, index, i0) => {
          return {
            a: common_vendor.t(index + 1),
            b: common_vendor.t(rule),
            c: index
          };
        }),
        g: common_vendor.t(records.value.length),
        h: common_vendor.f(records.value, (record, k0, i0) => {
          return common_vendor.e({
            a: record.avatar,
            b: common_vendor.t(record.nickname),
            c: common_vendor.t(record.time),
            d: common_vendor.t(getStatusText(record.status)),
            e: record.status === "completed"
          }, record.status === "completed" ? {
            f: common_vendor.t(record.reward)
          } : {}, {
            g: common_vendor.n(record.status),
            h: record.id
          });
        }),
        i: common_vendor.o((...args) => _ctx.closeShare && _ctx.closeShare(...args)),
        j: _ctx.qrCodeUrl,
        k: _ctx.posterUrl,
        l: common_vendor.o((...args) => _ctx.savePoster && _ctx.savePoster(...args)),
        m: common_vendor.sr("sharePopup", "0533054c-0"),
        n: common_vendor.p({
          type: "bottom"
        })
      };
    };
  }
};
qq.createPage(_sfc_main);
