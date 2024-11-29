"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  __name: "address",
  setup(__props) {
    const addressList = common_vendor.ref([
      {
        id: 1,
        name: "张三",
        phone: "13800138000",
        tag: "家",
        fullAddress: "广东省深圳市南山区科技园南区科兴科学园C座",
        isDefault: true
      }
      // ... 其他地址数据
    ]);
    const selectAddress = (address) => {
      const pages = getCurrentPages();
      if (pages.length > 1) {
        common_vendor.index.navigateBack({
          success: () => {
            const prevPage = pages[pages.length - 2];
            prevPage.$vm.address = address;
          }
        });
      }
    };
    const setDefault = (address) => {
      addressList.value.forEach((item) => {
        item.isDefault = item.id === address.id;
      });
    };
    const editAddress = (address) => {
      common_vendor.index.navigateTo({
        url: `/pages/shop/user/address-edit?id=${address.id}`
      });
    };
    const addAddress = () => {
      common_vendor.index.navigateTo({
        url: "/pages/shop/user/address-edit"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: addressList.value.length
      }, addressList.value.length ? {
        b: common_vendor.f(addressList.value, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.phone),
            c: item.tag
          }, item.tag ? {
            d: common_vendor.t(item.tag)
          } : {}, {
            e: common_vendor.t(item.fullAddress),
            f: item.isDefault ? 1 : "",
            g: common_vendor.o(($event) => setDefault(item), item.id),
            h: common_vendor.o(($event) => editAddress(item), item.id),
            i: common_vendor.o(($event) => selectAddress(item), item.id),
            j: item.id
          });
        })
      } : {
        c: common_assets._imports_0$5
      }, {
        d: common_vendor.o(addAddress)
      });
    };
  }
};
qq.createPage(_sfc_main);
