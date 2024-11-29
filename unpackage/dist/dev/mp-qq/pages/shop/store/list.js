"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "list",
  setup(__props) {
    const searchKeyword = common_vendor.ref("");
    const currentLocation = common_vendor.ref("正在定位...");
    const filters = ["全部门店", "距离最近", "评分最高", "新开门店"];
    const currentFilter = common_vendor.ref(0);
    const refreshing = common_vendor.ref(false);
    const loading = common_vendor.ref(false);
    const storeList = common_vendor.ref([
      {
        id: 1,
        name: "喜茶北京三里屯店",
        image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
        distance: 0.8,
        address: "北京市朝阳区三里屯太古里北区N8-B1-3",
        features: ["可预约", "WIFI", "礼品卡", "室内停车"],
        status: "open",
        // open, busy, closed
        statusText: "营业中",
        businessHours: "10:00-22:00",
        latitude: 39.934,
        longitude: 116.455
      },
      {
        id: 1,
        name: "喜茶北京三里屯店",
        image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
        distance: 0.8,
        address: "北京市朝阳区三里屯太古里北区N8-B1-3",
        features: ["可预约", "WIFI", "礼品卡", "室内停车"],
        status: "open",
        // open, busy, closed
        statusText: "营业中",
        businessHours: "10:00-22:00",
        latitude: 39.934,
        longitude: 116.455
      },
      {
        id: 1,
        name: "喜茶北京三里屯店",
        image: "https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg",
        distance: 0.8,
        address: "北京市朝阳区三里屯太古里北区N8-B1-3",
        features: ["可预约", "WIFI", "礼品卡", "室内停车"],
        status: "open",
        // open, busy, closed
        statusText: "营业中",
        businessHours: "10:00-22:00",
        latitude: 39.934,
        longitude: 116.455
      }
      // ... 更多门店数据
    ]);
    const getLocation = () => {
      common_vendor.index.getLocation({
        type: "gcj02",
        success: (res) => {
          common_vendor.index.request({
            url: `https://api.map.baidu.com/reverse_geocoding/v3/?ak=YOUR_KEY&location=${res.latitude},${res.longitude}`,
            success: (addressRes) => {
              currentLocation.value = addressRes.data.result.address_component.street;
            }
          });
        },
        fail: () => {
          currentLocation.value = "定位失败";
        }
      });
    };
    const refreshLocation = () => {
      currentLocation.value = "定位中...";
      getLocation();
      loadNearbyStores();
    };
    const switchFilter = (index) => {
      if (currentFilter.value === index)
        return;
      currentFilter.value = index;
      switch (index) {
        case 0:
          loadAllStores();
          break;
        case 1:
          sortStoresByDistance();
          break;
        case 2:
          sortStoresByRating();
          break;
        case 3:
          loadNewStores();
          break;
      }
    };
    const handleSearch = () => {
      if (!searchKeyword.value.trim()) {
        loadAllStores();
        return;
      }
      const keyword = searchKeyword.value.toLowerCase();
      storeList.value = storeList.value.filter(
        (store) => store.name.toLowerCase().includes(keyword) || store.address.toLowerCase().includes(keyword)
      );
    };
    const goToStore = (store) => {
      common_vendor.index.navigateTo({
        url: `/pages/shop/store/detail?id=${store.id}`
      });
    };
    const goToGoodsList = (store) => {
      common_vendor.index.navigateTo({
        url: `/pages/shop/store/goodsList?id=${store.id}`
      });
    };
    const navigate = (store) => {
      event.stopPropagation();
      common_vendor.index.openLocation({
        latitude: store.latitude,
        longitude: store.longitude,
        name: store.name,
        address: store.address,
        scale: 18
      });
    };
    const placeOrder = (store) => {
      event.stopPropagation();
      if (store.status === "closed") {
        common_vendor.index.showToast({
          title: "门店已打烊，请明天再来",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      if (store.status === "busy") {
        common_vendor.index.showModal({
          title: "门店忙碌提醒",
          content: "当前门店较为繁忙，可能需要较长等待时间，是否继续下单？",
          confirmText: "继续下单",
          cancelText: "换个门店",
          success: (res) => {
            if (res.confirm)
              ;
          }
        });
        return;
      }
      goToGoodsList(store);
    };
    const onRefresh = async () => {
      refreshing.value = true;
      setTimeout(() => {
        refreshing.value = false;
      }, 1e3);
    };
    const loadMore = () => {
      if (loading.value)
        return;
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
      }, 1e3);
    };
    const loadAllStores = () => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
      }, 500);
    };
    const sortStoresByDistance = () => {
      storeList.value.sort((a, b) => a.distance - b.distance);
    };
    const sortStoresByRating = () => {
      storeList.value.sort((a, b) => b.rating - a.rating);
    };
    const loadNewStores = () => {
      loading.value = true;
      setTimeout(() => {
        storeList.value = [
          /* ... 新开门店数据 ... */
        ];
        loading.value = false;
      }, 500);
    };
    const loadNearbyStores = () => {
      loading.value = true;
      setTimeout(() => {
        storeList.value = [
          /* ... 附近门店数据 ... */
        ];
        loading.value = false;
      }, 500);
    };
    common_vendor.onMounted(() => {
      getLocation();
      loadAllStores();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o([($event) => searchKeyword.value = $event.detail.value, handleSearch]),
        b: searchKeyword.value,
        c: common_vendor.t(currentLocation.value),
        d: common_vendor.o(refreshLocation),
        e: common_vendor.f(filters, (filter, index, i0) => {
          return {
            a: common_vendor.t(_ctx.filterIcons[index]),
            b: common_vendor.t(filter),
            c: index,
            d: currentFilter.value === index ? 1 : "",
            e: common_vendor.o(($event) => switchFilter(index), index)
          };
        }),
        f: common_vendor.f(storeList.value, (store, k0, i0) => {
          return {
            a: store.image,
            b: common_vendor.t(store.name),
            c: common_vendor.t(store.distance),
            d: common_vendor.t(store.address),
            e: common_vendor.o(($event) => navigate(store), store.id),
            f: common_vendor.f(store.features, (tag, index, i1) => {
              return {
                a: common_vendor.t(tag),
                b: index
              };
            }),
            g: common_vendor.t(store.status === "open" ? "🟢" : store.status === "busy" ? "🟡" : "⚪️"),
            h: common_vendor.t(store.statusText),
            i: common_vendor.n(store.status),
            j: common_vendor.t(store.businessHours),
            k: common_vendor.t(store.status === "closed" ? "🌙" : "🛍️"),
            l: common_vendor.t(store.status === "closed" ? "已打烊" : "去下单"),
            m: store.status === "closed" ? 1 : "",
            n: common_vendor.o(($event) => placeOrder(store), store.id),
            o: store.id,
            p: common_vendor.o(($event) => goToStore(store), store.id)
          };
        }),
        g: loading.value
      }, loading.value ? {} : {}, {
        h: storeList.value.length === 0 && !loading.value
      }, storeList.value.length === 0 && !loading.value ? {} : {}, {
        i: common_vendor.o(loadMore),
        j: refreshing.value,
        k: common_vendor.o(onRefresh)
      });
    };
  }
};
qq.createPage(_sfc_main);
