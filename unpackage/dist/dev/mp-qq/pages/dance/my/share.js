"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "share",
  setup(__props) {
    const qrcode = common_vendor.ref("/static/images/qrcode.jpg");
    const shareMethods = common_vendor.ref([
      {
        id: 1,
        name: "微信好友",
        icon: "/static/icons/wechat.png"
      },
      {
        id: 2,
        name: "朋友圈",
        icon: "/static/icons/moments.png"
      },
      {
        id: 3,
        name: "保存图片",
        icon: "/static/icons/save.png"
      }
    ]);
    const rewards = common_vendor.ref([
      "每成功邀请1位好友注册，获得100积分奖励",
      "好友首次购课，您可获得课程金额5%的积分奖励",
      "积分可用于兑换课程、周边商品等"
    ]);
    const share = (method) => {
      switch (method.id) {
        case 1:
          break;
        case 2:
          break;
        case 3:
          common_vendor.index.saveImageToPhotosAlbum({
            filePath: qrcode.value,
            success: () => {
              common_vendor.index.showToast({
                title: "保存成功",
                icon: "success"
              });
            }
          });
          break;
      }
    };
    return (_ctx, _cache) => {
      return {
        a: qrcode.value,
        b: common_vendor.f(shareMethods.value, (method, k0, i0) => {
          return {
            a: method.icon,
            b: common_vendor.t(method.name),
            c: method.id,
            d: common_vendor.o(($event) => share(method), method.id)
          };
        }),
        c: common_vendor.f(rewards.value, (reward, index, i0) => {
          return {
            a: common_vendor.t(reward),
            b: index
          };
        })
      };
    };
  }
};
qq.createPage(_sfc_main);
