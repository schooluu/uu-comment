"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_rate2 + _easycom_uni_popup2)();
}
const _easycom_uni_rate = () => "../../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_rate + _easycom_uni_popup)();
}
const SECRET_KEY = "your-secret-key-here";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "add-review",
  setup(__props) {
    const cityPopup = common_vendor.ref(null);
    const tempCity = common_vendor.ref("");
    const formData = common_vendor.reactive({
      companyName: "",
      rating: 0,
      cons: "",
      city: "",
      address: ""
    });
    const loading = common_vendor.ref(false);
    const encryptData = (data) => {
      const jsonStr = JSON.stringify(data);
      return common_vendor.CryptoJS.AES.encrypt(jsonStr, SECRET_KEY).toString();
    };
    const validateForm = () => {
      if (!formData.companyName) {
        common_vendor.index.showToast({
          title: "请输入标题",
          icon: "none"
        });
        return false;
      }
      if (formData.rating === 0) {
        common_vendor.index.showToast({
          title: "请选择评分",
          icon: "none"
        });
        return false;
      }
      if (!formData.cons) {
        common_vendor.index.showToast({
          title: "请填写评价",
          icon: "none"
        });
        return false;
      }
      if (!formData.city) {
        common_vendor.index.showToast({
          title: "请选城市",
          icon: "none"
        });
        return false;
      }
      return true;
    };
    const handleSubmit = async () => {
      if (!validateForm())
        return;
      try {
        loading.value = true;
        await submitReview(formData);
        common_vendor.index.showToast({
          title: "提交成功",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1e3);
      } catch (error) {
        common_vendor.index.showToast({
          title: "提交失败",
          icon: "error"
        });
      } finally {
        loading.value = false;
      }
    };
    const submitReview = async (data) => {
      const encryptedData = encryptData(data);
      const result = await common_vendor.Ys.callFunction({
        name: "addCompanyReview",
        data: {
          encryptedData
        }
      });
      if (result.result.code !== 0) {
        throw new Error(result.result.message);
      }
      return result.result;
    };
    const provinces = common_vendor.ref([]);
    const cities = common_vendor.ref([]);
    const selectedProvince = common_vendor.ref("");
    const getProvinces = async () => {
      try {
        const { result } = await common_vendor.Ys.callFunction({
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
        const { result } = await common_vendor.Ys.callFunction({
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
    const showCityPicker = async () => {
      try {
        if (provinces.value.length === 0) {
          await getProvinces();
        }
        cityPopup.value.open();
      } catch (error) {
        console.error("城市选择错误:", error);
        common_vendor.index.showToast({
          title: "获取城市列表失败",
          icon: "none"
        });
      }
    };
    const selectProvince = async (province) => {
      selectedProvince.value = province.name;
      await getCities(province.code);
    };
    const selectCity = (city) => {
      tempCity.value = city.name;
    };
    const confirmCitySelect = () => {
      if (tempCity.value) {
        formData.city = tempCity.value;
        closeCityPopup();
      } else {
        common_vendor.index.showToast({
          title: "请选择城市",
          icon: "none"
        });
      }
    };
    const closeCityPopup = () => {
      cityPopup.value.close();
      tempCity.value = "";
    };
    common_vendor.onMounted(async () => {
      await getProvinces();
    });
    const statusBarHeight = common_vendor.index.getSystemInfoSync().statusBarHeight;
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const saveDraft = () => {
      common_vendor.index.showToast({
        title: "已保存草稿",
        icon: "success"
      });
    };
    const currentTheme = common_vendor.ref("default");
    const getCurrentTheme = () => {
      try {
        const theme = common_vendor.index.getStorageSync("theme");
        if (theme) {
          currentTheme.value = theme;
        }
      } catch (e) {
        console.error("获取主题失败:", e);
      }
    };
    common_vendor.onMounted(() => {
      getCurrentTheme();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(goBack),
        b: common_vendor.o(saveDraft),
        c: common_vendor.unref(statusBarHeight) + "px",
        d: formData.companyName,
        e: common_vendor.o(($event) => formData.companyName = $event.detail.value),
        f: common_vendor.o(($event) => formData.rating = $event),
        g: common_vendor.p({
          size: 30,
          value: formData.rating,
          modelValue: formData.rating
        }),
        h: formData.cons,
        i: common_vendor.o(($event) => formData.cons = $event.detail.value),
        j: common_vendor.t(formData.city || "请选择城市"),
        k: common_vendor.o(showCityPicker),
        l: formData.address,
        m: common_vendor.o(($event) => formData.address = $event.detail.value),
        n: loading.value,
        o: common_vendor.o(handleSubmit),
        p: common_vendor.unref(statusBarHeight) + 88 + "rpx",
        q: common_vendor.n(`theme-${currentTheme.value}`),
        r: common_vendor.o(closeCityPopup),
        s: common_vendor.o(confirmCitySelect),
        t: common_vendor.f(provinces.value, (province, index, i0) => {
          return {
            a: common_vendor.t(province.name),
            b: province.code,
            c: selectedProvince.value === province.name ? 1 : "",
            d: common_vendor.o(($event) => selectProvince(province), province.code)
          };
        }),
        v: common_vendor.f(cities.value, (city, k0, i0) => {
          return {
            a: common_vendor.t(city.name),
            b: city.code,
            c: tempCity.value === city.name ? 1 : "",
            d: common_vendor.o(($event) => selectCity(city), city.code)
          };
        }),
        w: common_vendor.sr(cityPopup, "1e5eacf0-1", {
          "k": "cityPopup"
        }),
        x: common_vendor.p({
          type: "bottom"
        })
      };
    };
  }
});
qq.createPage(_sfc_main);
