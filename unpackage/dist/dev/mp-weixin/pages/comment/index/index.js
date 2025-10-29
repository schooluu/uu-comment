"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Array) {
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_rate2 + _easycom_uni_popup2)();
}
const _easycom_uni_rate = () => "../../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (CompanySkeleton + _easycom_uni_rate + _easycom_uni_popup)();
}
const CompanySkeleton = () => "../../../components/comment/CompanySkeleton.js";
const pageSize = 10;
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const companies = common_vendor.ref([]);
    const searchKeyword = common_vendor.ref("");
    const disclaimerPopup = common_vendor.ref(null);
    const currentPage = common_vendor.ref(1);
    const hasMore = common_vendor.ref(true);
    const loading = common_vendor.ref(false);
    const selectedCity = common_vendor.ref("");
    const provinces = common_vendor.ref([]);
    const cities = common_vendor.ref([]);
    const selectedProvince = common_vendor.ref("");
    const statusBarHeight = common_vendor.index.getSystemInfoSync().statusBarHeight;
    const formatTime = (timestamp) => {
      const date = new Date(timestamp);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    };
    const getCompanyList = async (page = 1, isLoadMore = false) => {
      if (!isLoadMore) {
        loading.value = true;
      }
      try {
        const { result } = await common_vendor.tr.callFunction({
          name: "getCompanyList",
          data: {
            page,
            pageSize,
            keyword: searchKeyword.value,
            city: selectedCity.value
          }
        });
        if (result.code === 0) {
          const processedData = result.data.map((item) => ({
            ...item,
            isExpanded: false
          }));
          if (isLoadMore) {
            companies.value = [...companies.value, ...processedData];
          } else {
            setTimeout(() => {
              companies.value = processedData;
              loading.value = false;
            }, 500);
          }
          hasMore.value = result.data.length === pageSize;
          currentPage.value = page;
        }
      } catch (error) {
        common_vendor.index.showToast({
          title: "获取数据失败",
          icon: "none"
        });
        loading.value = false;
      }
    };
    const loadMore = async () => {
      if (!hasMore.value || loading.value)
        return;
      await getCompanyList(currentPage.value + 1, true);
    };
    const resetList = () => {
      companies.value = [];
      currentPage.value = 1;
      hasMore.value = true;
      getCompanyList(1);
    };
    const handleSearch = () => {
      resetList();
    };
    const handleClear = () => {
      searchKeyword.value = "";
      resetList();
    };
    const goToAdd = () => {
      common_vendor.index.navigateTo({
        url: "/pages/comment/add/add-review"
      });
    };
    const goToDetail = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/comment/detail/detail?id=${id}`
      });
    };
    common_vendor.onMounted(() => {
      const hasShownDisclaimer = common_vendor.index.getStorageSync("hasShownDisclaimer");
      if (!hasShownDisclaimer) {
        disclaimerPopup.value.open();
      }
      getCompanyList();
    });
    const closeDisclaimer = () => {
      common_vendor.index.setStorageSync("hasShownDisclaimer", true);
      disclaimerPopup.value.close();
    };
    const complaintPopup = common_vendor.ref(null);
    const goToComplaint = () => {
      complaintPopup.value.open();
    };
    const closeComplaintPopup = () => {
      complaintPopup.value.close();
    };
    const copyEmail = () => {
      common_vendor.index.setClipboardData({
        data: "962723968@qq.com",
        success: () => {
          common_vendor.index.showToast({
            title: "邮箱已复制",
            icon: "success"
          });
        }
      });
    };
    common_vendor.onReachBottom(() => {
      loadMore();
    });
    common_vendor.onMounted(() => {
      getCompanyList();
    });
    const getProvinces = async () => {
      try {
        const { result } = await common_vendor.tr.callFunction({
          name: "getCityList"
        });
        if (result.code === 0) {
          provinces.value = result.data;
        }
      } catch (error) {
        common_vendor.index.showToast({
          title: "获取省份失败",
          icon: "none"
        });
      }
    };
    const getCities = async (provinceCode) => {
      try {
        const { result } = await common_vendor.tr.callFunction({
          name: "getCityList",
          data: { province: provinceCode }
        });
        if (result.code === 0) {
          cities.value = result.data;
        }
      } catch (error) {
        common_vendor.index.showToast({
          title: "获取城市失败",
          icon: "none"
        });
      }
    };
    const showCityPicker = () => {
      common_vendor.index.showActionSheet({
        itemList: provinces.value.map((p) => p.name),
        success: async (res) => {
          const province = provinces.value[res.tapIndex];
          selectedProvince.value = province.name;
          await getCities(province.code);
          common_vendor.index.showActionSheet({
            itemList: cities.value.map((c) => c.name),
            success: (res2) => {
              selectedCity.value = cities.value[res2.tapIndex].name;
              resetList();
            }
          });
        }
      });
    };
    common_vendor.onMounted(async () => {
      await getProvinces();
      getCompanyList();
    });
    const isTextOverflow = (text) => {
      return text.length > 100;
    };
    const toggleExpand = (company) => {
      company.isExpanded = !company.isExpanded;
    };
    const totalReviews = common_vendor.ref(0);
    const totalCompanies = common_vendor.ref(0);
    const todayReviews = common_vendor.ref(0);
    const showTotalReviews = () => {
      common_vendor.index.showToast({
        title: `总计 ${totalReviews.value} 条点评`,
        icon: "none"
      });
    };
    const showTotalCompanies = () => {
      common_vendor.index.showToast({
        title: `已收录 ${totalCompanies.value} 家企业`,
        icon: "none"
      });
    };
    const showTodayReviews = () => {
      common_vendor.index.showToast({
        title: `今日新增 ${todayReviews.value} 条点评`,
        icon: "none"
      });
    };
    const getStatistics = async () => {
      try {
        const { result } = await common_vendor.tr.callFunction({
          name: "getStatistics"
        });
        if (result.code === 0) {
          totalReviews.value = result.data.totalReviews;
          totalCompanies.value = result.data.totalCompanies;
          todayReviews.value = result.data.todayReviews;
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/comment/index/index.vue:447", "获取统计数据失败:", error);
      }
    };
    common_vendor.onMounted(async () => {
      await getStatistics();
    });
    const currentTheme = common_vendor.ref("default");
    const themes = [
      { name: "default", label: "默认紫" },
      { name: "blue", label: "深邃蓝" },
      { name: "green", label: "自然绿" },
      { name: "red", label: "热情红" }
    ];
    const changeTheme = (theme) => {
      currentTheme.value = theme;
      common_vendor.index.setStorageSync("theme", theme);
    };
    const showThemePicker = () => {
      common_vendor.index.showActionSheet({
        itemList: themes.map((t) => t.label),
        success: (res) => {
          changeTheme(themes[res.tapIndex].name);
        }
      });
    };
    common_vendor.onMounted(() => {
      const savedTheme = common_vendor.index.getStorageSync("theme");
      if (savedTheme) {
        currentTheme.value = savedTheme;
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(showThemePicker),
        b: common_vendor.unref(statusBarHeight) + "px",
        c: common_vendor.t(totalReviews.value || "0"),
        d: common_vendor.o(showTotalReviews),
        e: common_vendor.t(totalCompanies.value || "0"),
        f: common_vendor.o(showTotalCompanies),
        g: common_vendor.t(todayReviews.value || "0"),
        h: common_vendor.o(showTodayReviews),
        i: common_vendor.unref(statusBarHeight) + 88 + "rpx",
        j: common_vendor.o(handleSearch),
        k: searchKeyword.value,
        l: common_vendor.o(($event) => searchKeyword.value = $event.detail.value),
        m: searchKeyword.value
      }, searchKeyword.value ? {
        n: common_vendor.o(handleClear)
      } : {}, {
        o: common_vendor.t(selectedCity.value || "选择城市"),
        p: common_vendor.o(showCityPicker),
        q: common_vendor.unref(statusBarHeight) + "rpx",
        r: loading.value
      }, loading.value ? {
        s: common_vendor.f(5, (i, k0, i0) => {
          return {
            a: i,
            b: "15f5966f-0-" + i0
          };
        })
      } : {}, {
        t: loading.value
      }, loading.value ? {} : companies.value.length === 0 ? {
        w: common_assets._imports_0,
        x: common_vendor.o(goToAdd)
      } : {
        y: common_vendor.f(companies.value, (company, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(company.companyName),
            b: "15f5966f-1-" + i0,
            c: common_vendor.p({
              value: company.rating,
              size: "15"
            }),
            d: common_vendor.t(company.rating || 0),
            e: company.cons
          }, company.cons ? common_vendor.e({
            f: common_vendor.t(company.cons),
            g: !company.isExpanded ? 1 : "",
            h: isTextOverflow(company.cons)
          }, isTextOverflow(company.cons) ? {
            i: common_vendor.t(company.isExpanded ? "收起" : "查看更多"),
            j: common_vendor.o(($event) => toggleExpand(company), company._id)
          } : {}) : {}, {
            k: common_vendor.t(company.viewCount || 0),
            l: common_vendor.t(company.reviewCount || 0),
            m: common_vendor.t(formatTime(company.createTime)),
            n: common_vendor.t(company.city),
            o: company._id,
            p: index,
            q: common_vendor.o(($event) => goToDetail(company._id), company._id)
          });
        })
      }, {
        v: companies.value.length === 0,
        z: !loading.value ? 1 : "",
        A: common_vendor.o(goToComplaint),
        B: common_vendor.o(goToAdd),
        C: common_vendor.o(closeDisclaimer),
        D: common_vendor.sr(disclaimerPopup, "15f5966f-2", {
          "k": "disclaimerPopup"
        }),
        E: common_vendor.p({
          type: "center"
        }),
        F: companies.value.length > 0
      }, companies.value.length > 0 ? common_vendor.e({
        G: loading.value
      }, loading.value ? {} : !hasMore.value ? {} : {}, {
        H: !hasMore.value
      }) : {}, {
        I: common_vendor.o(closeComplaintPopup),
        J: common_vendor.o(copyEmail),
        K: common_vendor.o(closeComplaintPopup),
        L: common_vendor.sr(complaintPopup, "15f5966f-3", {
          "k": "complaintPopup"
        }),
        M: common_vendor.p({
          type: "center"
        }),
        N: common_vendor.n(`theme-${currentTheme.value}`)
      });
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/comment/index/index.js.map
