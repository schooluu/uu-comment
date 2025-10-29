"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const searchKeyword = common_vendor.ref("");
    const currentTab = common_vendor.ref(0);
    const isRefreshing = common_vendor.ref(false);
    const tabs = [
      "全部",
      "轿车",
      "SUV",
      "新能源",
      "面包车",
      "货车"
    ];
    const cars = common_vendor.ref([
      {
        id: 1,
        title: "丰田 凯美瑞 2020款 2.5L 豪华版",
        year: "2020",
        mileage: "3.5",
        location: "富邦小区",
        price: "16.8",
        originalPrice: "22.8",
        image: "https://example.com/car1.jpg",
        tags: ["准新车", "一手车", "可分期"]
      },
      {
        id: 2,
        title: "特斯拉 Model 3 2021款 标准续航版",
        year: "2021",
        mileage: "2.1",
        location: "科技园",
        price: "23.5",
        image: "https://example.com/car2.jpg",
        tags: ["电动车", "无事故", "原厂保修"]
      }
      // ... 更多车辆数据
    ]);
    const switchTab = (index) => {
      currentTab.value = index;
    };
    const showPriceFilter = () => {
      common_vendor.index.showActionSheet({
        itemList: ["10万以下", "10-20万", "20-30万", "30万以上"],
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/city/car/index.vue:142", "选择价格区间:", res.tapIndex);
        }
      });
    };
    const showYearFilter = () => {
      common_vendor.index.showActionSheet({
        itemList: ["1年以内", "1-3年", "3-5年", "5年以上"],
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/city/car/index.vue:152", "选择车龄:", res.tapIndex);
        }
      });
    };
    const showSortFilter = () => {
      common_vendor.index.showActionSheet({
        itemList: ["最新发布", "价格最低", "价格最高", "里程最少"],
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/city/car/index.vue:162", "选择排序方式:", res.tapIndex);
        }
      });
    };
    const handleSearch = () => {
      common_vendor.index.__f__("log", "at pages/city/car/index.vue:169", "搜索关键词:", searchKeyword.value);
    };
    const loadMore = () => {
      common_vendor.index.__f__("log", "at pages/city/car/index.vue:174", "加载更多数据");
    };
    const onRefresh = () => {
      isRefreshing.value = true;
      setTimeout(() => {
        isRefreshing.value = false;
      }, 1e3);
    };
    const goToDetail = (car) => {
      common_vendor.index.navigateTo({
        url: `/pages/city/car/detail?id=${car.id}`
      });
    };
    const goToPublish = () => {
      common_vendor.index.navigateTo({
        url: "/pages/city/car/publish"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleSearch),
        b: searchKeyword.value,
        c: common_vendor.o(($event) => searchKeyword.value = $event.detail.value),
        d: common_vendor.f(tabs, (tab, index, i0) => {
          return {
            a: common_vendor.t(tab),
            b: index,
            c: common_vendor.n({
              active: currentTab.value === index
            }),
            d: common_vendor.o(($event) => switchTab(index), index)
          };
        }),
        e: common_vendor.o(showPriceFilter),
        f: common_vendor.o(showYearFilter),
        g: common_vendor.o(showSortFilter),
        h: common_vendor.f(cars.value, (car, index, i0) => {
          return common_vendor.e({
            a: car.image,
            b: common_vendor.t(car.title),
            c: common_vendor.t(car.year),
            d: common_vendor.t(car.mileage),
            e: common_vendor.t(car.location),
            f: common_vendor.f(car.tags, (tag, tagIndex, i1) => {
              return {
                a: common_vendor.t(tag),
                b: tagIndex
              };
            }),
            g: common_vendor.t(car.price),
            h: car.originalPrice
          }, car.originalPrice ? {
            i: common_vendor.t(car.originalPrice)
          } : {}, {
            j: index,
            k: common_vendor.o(($event) => goToDetail(car), index)
          });
        }),
        i: common_vendor.o(loadMore),
        j: isRefreshing.value,
        k: common_vendor.o(onRefresh),
        l: common_vendor.o(goToPublish)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8c6a9a37"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/city/car/index.js.map
