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
const deliveryFee = 3;
const minOrderAmount = 20;
const _sfc_main = {
  __name: "goodsList",
  setup(__props) {
    const banners = common_vendor.ref([
      { image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg" },
      { image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg" },
      { image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg" }
    ]);
    const categories = common_vendor.ref([
      { id: 1, name: "推荐", icon: "🔥" },
      { id: 2, name: "新品", icon: "🆕" },
      { id: 3, name: "奶茶", icon: "🧋" },
      { id: 4, name: "果茶", icon: "🍊" },
      { id: 5, name: "咖啡", icon: "☕️" },
      { id: 6, name: "小吃", icon: "🍪" },
      { id: 7, name: "加料", icon: "🧇" }
    ]);
    const goodsList = common_vendor.ref([]);
    const currentCategory = common_vendor.ref(0);
    const loading = common_vendor.ref(false);
    const refreshing = common_vendor.ref(false);
    const cartItems = common_vendor.ref({});
    const cartPopup = common_vendor.ref(null);
    const cartTotal = common_vendor.computed(() => {
      return Object.values(cartItems.value).reduce((sum, count) => sum + count, 0);
    });
    const totalPrice = common_vendor.computed(() => {
      return goodsList.value.reduce((sum, goods) => {
        const count = cartItems.value[goods.id] || 0;
        return sum + goods.price * count;
      }, 0);
    });
    const cartList = common_vendor.computed(() => {
      return goodsList.value.filter((goods) => cartItems.value[goods.id]).map((goods) => ({
        ...goods,
        count: cartItems.value[goods.id]
      }));
    });
    const updateCart = (goods, delta) => {
      const currentCount = cartItems.value[goods.id] || 0;
      const newCount = currentCount + delta;
      if (newCount < 0)
        return;
      if (newCount === 0) {
        delete cartItems.value[goods.id];
      } else {
        if (newCount > goods.stock) {
          common_vendor.index.showToast({
            title: "库存不足",
            icon: "none"
          });
          return;
        }
        cartItems.value[goods.id] = newCount;
      }
      saveCartToStorage();
    };
    const addToCart = (goods) => {
      if (!goods.stock) {
        common_vendor.index.showToast({
          title: "商品已售罄",
          icon: "none"
        });
        return;
      }
      updateCart(goods, 1);
    };
    const goToDetail = (goods) => {
      common_vendor.index.navigateTo({
        url: `/pages/shop/goods/detail?id=${goods.id}`
      });
    };
    const goToCheckout = () => {
      if (totalPrice.value < minOrderAmount) {
        common_vendor.index.showToast({
          title: `还差${(minOrderAmount - totalPrice.value).toFixed(2)}元起送`,
          icon: "none"
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/shop/store/checkout"
      });
    };
    const clearCart = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定清空购物车吗？",
        success: (res) => {
          if (res.confirm) {
            cartItems.value = {};
            saveCartToStorage();
            cartPopup.value.close();
          }
        }
      });
    };
    const saveCartToStorage = () => {
      common_vendor.index.setStorageSync("cartItems", cartItems.value);
    };
    const restoreCartFromStorage = () => {
      const savedCart = common_vendor.index.getStorageSync("cartItems");
      if (savedCart) {
        cartItems.value = savedCart;
      }
    };
    const viewCart = () => {
      cartPopup.value.open();
    };
    const loadMore = () => {
      if (loading.value)
        return;
      loadCategoryGoods(categories.value[currentCategory.value].id);
    };
    const onRefresh = async () => {
      refreshing.value = true;
      await loadCategoryGoods(categories.value[currentCategory.value].id);
      refreshing.value = false;
    };
    const switchCategory = async (index) => {
      if (currentCategory.value === index)
        return;
      currentCategory.value = index;
      await loadCategoryGoods(categories.value[index].id);
    };
    const loadCategoryGoods = async (categoryId) => {
      loading.value = true;
      try {
        setTimeout(() => {
          goodsList.value = Array(10).fill().map((_, index) => ({
            id: index + 1,
            name: "商品名称",
            description: "商品描述信息",
            price: Math.floor(Math.random() * 50 + 10),
            image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
            stock: Math.floor(Math.random() * 100),
            sold: Math.floor(Math.random() * 1e3)
          }));
          loading.value = false;
        }, 500);
      } catch (error) {
        console.error(error);
        common_vendor.index.showToast({
          title: "加载失败",
          icon: "none"
        });
        loading.value = false;
      }
    };
    common_vendor.onMounted(() => {
      restoreCartFromStorage();
      loadCategoryGoods(categories.value[0].id);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(banners.value, (banner, index, i0) => {
          return {
            a: banner.image,
            b: index
          };
        }),
        b: common_vendor.f(categories.value, (category, index, i0) => {
          return {
            a: common_vendor.t(category.icon),
            b: common_vendor.t(category.name),
            c: category.id,
            d: currentCategory.value === index ? 1 : "",
            e: common_vendor.o(($event) => switchCategory(index), category.id)
          };
        }),
        c: common_vendor.f(goodsList.value, (goods, k0, i0) => {
          return common_vendor.e({
            a: goods.image,
            b: common_vendor.t(goods.name),
            c: common_vendor.t(goods.description),
            d: common_vendor.t(goods.price),
            e: goods.originalPrice
          }, goods.originalPrice ? {
            f: common_vendor.t(goods.originalPrice)
          } : {}, {
            g: common_vendor.t(goods.sold),
            h: !goods.stock ? 1 : "",
            i: common_vendor.o(($event) => addToCart(goods), goods.id),
            j: goods.id,
            k: common_vendor.o(($event) => goToDetail(goods), goods.id)
          });
        }),
        d: loading.value
      }, loading.value ? {} : {}, {
        e: common_vendor.o(loadMore),
        f: refreshing.value,
        g: common_vendor.o(onRefresh),
        h: cartTotal.value > 0
      }, cartTotal.value > 0 ? {
        i: common_vendor.t(cartTotal.value),
        j: common_vendor.t(totalPrice.value.toFixed(2)),
        k: common_vendor.t(deliveryFee),
        l: common_vendor.t(totalPrice.value < minOrderAmount ? `¥${minOrderAmount}起送` : "去结算"),
        m: totalPrice.value < minOrderAmount ? 1 : "",
        n: common_vendor.o(goToCheckout),
        o: common_vendor.o(viewCart)
      } : {}, {
        p: common_vendor.o(clearCart),
        q: common_vendor.f(cartList.value, (item, k0, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.price),
            d: common_vendor.o(($event) => updateCart(item, -1), item.id),
            e: common_vendor.t(item.count),
            f: common_vendor.o(($event) => updateCart(item, 1), item.id),
            g: item.id
          };
        }),
        r: common_vendor.sr(cartPopup, "27fc341a-0", {
          "k": "cartPopup"
        }),
        s: common_vendor.p({
          type: "bottom"
        })
      });
    };
  }
};
qq.createPage(_sfc_main);
