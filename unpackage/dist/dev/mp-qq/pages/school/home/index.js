"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Math) {
  TabBar();
}
const TabBar = () => "../../../components/school/tab-bar.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const currentLocation = common_vendor.ref("成都理工大学(二仙桥校区)");
    const categories = common_vendor.ref([
      { id: 1, name: "好吃的饭", icon: "/static/icons/rice.png" },
      { id: 2, name: "火锅冒菜", icon: "/static/icons/hotpot.png" },
      { id: 3, name: "米饭好吃", icon: "/static/icons/bento.png" },
      { id: 4, name: "串串小吃", icon: "/static/icons/skewer.png" },
      { id: 5, name: "热卤汤锅", icon: "/static/icons/soup.png" },
      { id: 6, name: "奶茶饮品", icon: "/static/icons/drink.png" },
      { id: 7, name: "蛋糕烘培", icon: "/static/icons/cake.png" },
      { id: 8, name: "美食快餐", icon: "/static/icons/fastfood.png" },
      { id: 9, name: "米粉面条", icon: "/static/icons/noodle.png" },
      { id: 10, name: "蛋糕甜品", icon: "/static/icons/dessert.png" }
    ]);
    const currentPath = common_vendor.computed(() => {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      return `/${currentPage.route}`;
    });
    const specialItems = common_vendor.ref([
      {
        id: 1,
        name: "水牛奶鸡蛋",
        image: "/static/products/1.jpg",
        currentPrice: "5.90",
        originalPrice: "7.00",
        tag: "新人价"
      },
      {
        id: 2,
        name: "超值特惠汉堡",
        image: "/static/products/2.jpg",
        currentPrice: "6.50",
        originalPrice: "9.90",
        tag: "今日价"
      },
      {
        id: 3,
        name: "墨西哥鸡肉卷",
        image: "/static/products/3.jpg",
        currentPrice: "9.90",
        originalPrice: "15.00",
        tag: "今日价"
      },
      {
        id: 4,
        name: "超嗲草莓奶茶",
        image: "/static/products/4.jpg",
        currentPrice: "9.90",
        originalPrice: "12.00",
        tag: "人气"
      }
    ]);
    common_vendor.ref([
      { id: "home", name: "首页", icon: "🏠" },
      { id: "forum", name: "论坛", icon: "💬" },
      { id: "order", name: "订单", icon: "📋" },
      { id: "my", name: "我的", icon: "👤" }
    ]);
    common_vendor.ref("home");
    const selectLocation = () => {
      common_vendor.index.navigateTo({
        url: "/pages/school/location/index"
      });
    };
    const goToSearch = () => {
      common_vendor.index.navigateTo({
        url: "/pages/school/search/index"
      });
    };
    const getCoupon = () => {
      common_vendor.index.navigateTo({
        url: "/pages/school/coupon/index"
      });
    };
    const selectCategory = (category) => {
      common_vendor.index.navigateTo({
        url: `/pages/school/category/index?id=${category.id}`
      });
    };
    const viewMore = () => {
      common_vendor.index.navigateTo({
        url: "/pages/school/specials/index"
      });
    };
    const viewProduct = (item) => {
      common_vendor.index.navigateTo({
        url: `/pages/school/product/index?id=${item.id}`
      });
    };
    const filterTags = common_vendor.ref([
      { id: 1, name: "综合排序", active: true },
      { id: 2, name: "销量最高", active: false },
      { id: 3, name: "距离最近", active: false },
      { id: 4, name: "好评优先", active: false }
    ]);
    const shops = common_vendor.ref([
      {
        id: 1,
        name: "珍珍新鸡排店",
        image: "/static/shops/1.jpg",
        rating: 4.8,
        monthlySales: 1,
        distance: 0.8,
        deliveryFee: "¥0起送",
        deliveryTime: "30",
        tags: ["24小时营业", "欢迎各位同学帮忙介绍生意"]
      }
      // ... 更多商家数据
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(currentLocation.value),
        b: common_vendor.o(selectLocation),
        c: common_vendor.o(goToSearch),
        d: common_assets._imports_0$7,
        e: common_vendor.o(getCoupon),
        f: common_vendor.f(categories.value, (category, k0, i0) => {
          return {
            a: category.icon,
            b: common_vendor.t(category.name),
            c: category.id,
            d: common_vendor.o(($event) => selectCategory(category), category.id)
          };
        }),
        g: common_vendor.o(viewMore),
        h: common_vendor.f(specialItems.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.image,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.currentPrice),
            d: common_vendor.t(item.originalPrice),
            e: item.tag
          }, item.tag ? {
            f: common_vendor.t(item.tag)
          } : {}, {
            g: item.id,
            h: common_vendor.o(($event) => viewProduct(item), item.id)
          });
        }),
        i: common_assets._imports_1,
        j: common_vendor.o(($event) => _ctx.handleCard("coupon")),
        k: common_assets._imports_2,
        l: common_vendor.o(($event) => _ctx.handleCard("runner")),
        m: common_assets._imports_3,
        n: common_vendor.o((...args) => _ctx.handleRecruit && _ctx.handleRecruit(...args)),
        o: common_vendor.f(filterTags.value, (tag, k0, i0) => {
          return {
            a: common_vendor.t(tag.name),
            b: tag.id,
            c: tag.active ? 1 : "",
            d: common_vendor.o(($event) => _ctx.toggleFilter(tag), tag.id)
          };
        }),
        p: common_vendor.f(shops.value, (shop, k0, i0) => {
          return {
            a: shop.image,
            b: common_vendor.t(shop.name),
            c: common_vendor.t(shop.rating),
            d: common_vendor.t(shop.monthlySales),
            e: common_vendor.t(shop.distance),
            f: common_vendor.t(shop.deliveryFee),
            g: common_vendor.t(shop.deliveryTime),
            h: common_vendor.f(shop.tags, (tag, k1, i1) => {
              return {
                a: common_vendor.t(tag),
                b: tag
              };
            }),
            i: shop.id,
            j: common_vendor.o(($event) => _ctx.viewShop(shop), shop.id)
          };
        }),
        q: common_vendor.p({
          current: currentPath.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e41e85d5"]]);
qq.createPage(MiniProgramPage);
