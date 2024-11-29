"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const cartList = common_vendor.ref([
      {
        id: 1,
        name: "测试商品1",
        spec: "规格：默认",
        price: 99,
        quantity: 1,
        image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
        selected: true
      },
      {
        id: 1,
        name: "测试商品1",
        spec: "规格：默认",
        price: 99,
        quantity: 1,
        image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
        selected: true
      },
      {
        id: 1,
        name: "测试商品1",
        spec: "规格：默认",
        price: 99,
        quantity: 1,
        image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
        selected: true
      },
      {
        id: 1,
        name: "测试商品1",
        spec: "规格：默认",
        price: 99,
        quantity: 1,
        image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
        selected: true
      },
      {
        id: 1,
        name: "测试商品1",
        spec: "规格：默认",
        price: 99,
        quantity: 1,
        image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
        selected: true
      },
      {
        id: 1,
        name: "测试商品1",
        spec: "规格：默认",
        price: 99,
        quantity: 1,
        image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
        selected: true
      },
      {
        id: 1,
        name: "测试商品1",
        spec: "规格：默认",
        price: 99,
        quantity: 1,
        image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
        selected: true
      },
      {
        id: 1,
        name: "测试商品1",
        spec: "规格：默认",
        price: 99,
        quantity: 1,
        image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
        selected: true
      }
      // 更多商品...
    ]);
    const recommendList = common_vendor.ref([
      {
        id: 101,
        name: "推荐商品1",
        price: 199,
        image: "/static/images/recommend-1.png"
      }
      // 更多推荐商品...
    ]);
    const isAllSelected = common_vendor.computed(() => {
      return cartList.value.length > 0 && cartList.value.every((item) => item.selected);
    });
    const selectedCount = common_vendor.computed(() => {
      return cartList.value.filter((item) => item.selected).length;
    });
    const totalPrice = common_vendor.computed(() => {
      return cartList.value.filter((item) => item.selected).reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    });
    const toggleSelect = (item) => {
      item.selected = !item.selected;
    };
    const toggleSelectAll = () => {
      const newStatus = !isAllSelected.value;
      cartList.value.forEach((item) => {
        item.selected = newStatus;
      });
    };
    const updateQuantity = (item, delta) => {
      const newQuantity = item.quantity + delta;
      if (newQuantity < 1)
        return;
      item.quantity = newQuantity;
    };
    const goShopping = () => {
      common_vendor.index.switchTab({
        url: "/pages/shop/index"
      });
    };
    const goToDetail = (item) => {
      common_vendor.index.navigateTo({
        url: `/pages/shop/goods/detail?id=${item.id}`
      });
    };
    const goToCheckout = () => {
      if (!selectedCount.value)
        return;
      common_vendor.index.navigateTo({
        url: "/pages/shop/store/checkout"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !cartList.value.length
      }, !cartList.value.length ? {
        b: common_assets._imports_0$4,
        c: common_vendor.o(goShopping)
      } : {
        d: common_vendor.f(cartList.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.selected ? 1 : "",
            b: common_vendor.o(($event) => toggleSelect(item), item.id),
            c: item.image,
            d: common_vendor.t(item.name),
            e: item.spec
          }, item.spec ? {
            f: common_vendor.t(item.spec)
          } : {}, {
            g: common_vendor.t(item.price),
            h: item.quantity <= 1 ? 1 : "",
            i: common_vendor.o(($event) => updateQuantity(item, -1), item.id),
            j: common_vendor.t(item.quantity),
            k: common_vendor.o(($event) => updateQuantity(item, 1), item.id),
            l: item.id
          });
        })
      }, {
        e: recommendList.value.length
      }, recommendList.value.length ? {
        f: common_vendor.f(recommendList.value, (item, k0, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.price),
            d: item.id,
            e: common_vendor.o(($event) => goToDetail(item), item.id)
          };
        })
      } : {}, {
        g: isAllSelected.value ? 1 : "",
        h: common_vendor.o(toggleSelectAll),
        i: common_vendor.t(totalPrice.value),
        j: selectedCount.value
      }, selectedCount.value ? {
        k: common_vendor.t(selectedCount.value)
      } : {}, {
        l: !selectedCount.value ? 1 : "",
        m: common_vendor.o(goToCheckout)
      });
    };
  }
};
qq.createPage(_sfc_main);
