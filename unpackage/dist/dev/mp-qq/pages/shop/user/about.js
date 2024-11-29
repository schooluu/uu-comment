"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  __name: "about",
  setup(__props) {
    const appVersion = common_vendor.ref("2.5.0");
    const featureList = common_vendor.ref([
      { id: 1, icon: "📋", label: "用户协议", type: "agreement" },
      { id: 2, icon: "🔒", label: "隐私政策", type: "privacy" },
      { id: 3, icon: "⭐", label: "给我们评分", type: "rate" },
      { id: 4, icon: "🔄", label: "检查更新", type: "update", value: "已是最新版本" }
    ]);
    const contactList = common_vendor.ref([
      { id: 1, icon: "📞", label: "客服电话", value: "400-100-5555", type: "phone" },
      { id: 2, icon: "📧", label: "商务合作", value: "business@heytea.com", type: "email" },
      { id: 3, icon: "📍", label: "公司地址", value: "深圳市南山区深圳湾科技生态园", type: "address" }
    ]);
    const socialList = common_vendor.ref([
      { id: 1, name: "微信", icon: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg", type: "wechat" },
      { id: 2, name: "微博", icon: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg", type: "weibo" },
      { id: 3, name: "抖音", icon: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg", type: "douyin" },
      { id: 4, name: "小红书", icon: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg", type: "xiaohongshu" }
    ]);
    const handleFeature = (item) => {
      switch (item.type) {
        case "agreement":
          common_vendor.index.navigateTo({ url: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg" });
          break;
        case "privacy":
          common_vendor.index.navigateTo({ url: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg" });
          break;
        case "rate":
          break;
        case "update":
          checkUpdate();
          break;
      }
    };
    const handleContact = (contact) => {
      switch (contact.type) {
        case "phone":
          common_vendor.index.makePhoneCall({
            phoneNumber: contact.value
          });
          break;
        case "email":
          common_vendor.index.setClipboardData({
            data: contact.value,
            success: () => {
              common_vendor.index.showToast({
                title: "邮箱已复制",
                icon: "success"
              });
            }
          });
          break;
        case "address":
          common_vendor.index.setClipboardData({
            data: contact.value,
            success: () => {
              common_vendor.index.showToast({
                title: "地址已复制",
                icon: "success"
              });
            }
          });
          break;
      }
    };
    const handleSocial = (social) => {
      common_vendor.index.previewImage({
        urls: [`/static/images/qrcode/${social.type}.png`]
      });
    };
    const checkUpdate = () => {
      common_vendor.index.showLoading({
        title: "检查更新中"
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "已是最新版本",
          icon: "success"
        });
      }, 1500);
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$2,
        b: common_vendor.t(appVersion.value),
        c: common_vendor.f(featureList.value, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.icon),
            b: common_vendor.t(item.label),
            c: item.value
          }, item.value ? {
            d: common_vendor.t(item.value)
          } : {}, {
            e: item.id,
            f: common_vendor.o(($event) => handleFeature(item), item.id)
          });
        }),
        d: common_vendor.f(contactList.value, (contact, k0, i0) => {
          return {
            a: common_vendor.t(contact.icon),
            b: common_vendor.t(contact.label),
            c: common_vendor.t(contact.value),
            d: contact.id,
            e: common_vendor.o(($event) => handleContact(contact), contact.id)
          };
        }),
        e: common_vendor.f(socialList.value, (social, k0, i0) => {
          return {
            a: social.icon,
            b: common_vendor.t(social.name),
            c: social.id,
            d: common_vendor.o(($event) => handleSocial(social), social.id)
          };
        })
      };
    };
  }
};
qq.createPage(_sfc_main);
