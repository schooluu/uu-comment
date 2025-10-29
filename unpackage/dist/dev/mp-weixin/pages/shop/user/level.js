"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "level",
  setup(__props) {
    const currentLevel = common_vendor.ref({
      id: 2,
      name: "白银会员",
      icon: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
      description: "尊贵白银会员",
      privileges: [
        { id: 1, icon: "🎁", name: "生日礼券", desc: "生日当月获赠100元礼券" },
        { id: 2, icon: "🏷️", name: "专属折扣", desc: "全场商品9.5折" },
        { id: 3, icon: "🎯", name: "积分加速", desc: "消费积分1.2倍" },
        { id: 4, icon: "🎫", name: "专属券包", desc: "每月专享优惠券" }
      ]
    });
    const currentExp = common_vendor.ref(2800);
    const nextLevelExp = common_vendor.ref(5e3);
    const remainExp = common_vendor.computed(() => nextLevelExp.value - currentExp.value);
    const nextLevel = common_vendor.ref({
      name: "黄金会员",
      icon: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg"
    });
    const levelList = common_vendor.ref([
      { id: 1, name: "青铜会员", icon: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg", requiredExp: 0, discount: 9.8 },
      { id: 2, name: "白银会员", icon: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg", requiredExp: 1e3, discount: 9.5 },
      { id: 3, name: "黄金会员", icon: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg", requiredExp: 5e3, discount: 9 },
      { id: 4, name: "铂金会员", icon: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg", requiredExp: 1e4, discount: 8.5 },
      { id: 5, name: "钻石会员", icon: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg", requiredExp: 2e4, discount: 8 }
    ]);
    const expRules = common_vendor.ref([
      { id: 1, icon: "🛍️", name: "消费奖励", desc: "每消费1元获得", exp: 1 },
      { id: 2, icon: "📝", name: "评价奖励", desc: "发布评价可获得", exp: 10 },
      { id: 3, icon: "🎯", name: "签到奖励", desc: "每日签到可获得", exp: 5 },
      { id: 4, icon: "👥", name: "邀请奖励", desc: "邀请好友注册可获得", exp: 50 }
    ]);
    const showQRCode = () => {
      common_vendor.index.navigateTo({
        url: "/pages/shop/member/qrcode"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: currentLevel.value.icon,
        b: common_vendor.t(currentLevel.value.name),
        c: common_vendor.t(currentLevel.value.description),
        d: common_vendor.o(showQRCode),
        e: common_vendor.t(currentExp.value),
        f: common_vendor.t(nextLevelExp.value),
        g: common_vendor.t(nextLevel.value.name),
        h: common_vendor.t(remainExp.value),
        i: `${currentExp.value / nextLevelExp.value * 100}%`,
        j: common_vendor.f(currentLevel.value.privileges, (privilege, k0, i0) => {
          return {
            a: common_vendor.t(privilege.icon),
            b: common_vendor.t(privilege.name),
            c: common_vendor.t(privilege.desc),
            d: privilege.id
          };
        }),
        k: common_vendor.f(levelList.value, (level, index, i0) => {
          return {
            a: level.icon,
            b: common_vendor.t(level.name),
            c: common_vendor.t(level.requiredExp),
            d: common_vendor.t(level.discount),
            e: level.id,
            f: level.id === currentLevel.value.id ? 1 : ""
          };
        }),
        l: common_vendor.f(expRules.value, (rule, k0, i0) => {
          return {
            a: common_vendor.t(rule.icon),
            b: common_vendor.t(rule.name),
            c: common_vendor.t(rule.desc),
            d: common_vendor.t(rule.exp),
            e: rule.id
          };
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/shop/user/level.js.map
