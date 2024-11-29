"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const phone = common_vendor.ref("");
    const code = common_vendor.ref("");
    const counting = common_vendor.ref(false);
    const counter = common_vendor.ref(60);
    let timer = null;
    const getVerifyCode = async () => {
      if (!isPhoneValid.value) {
        common_vendor.index.showToast({
          title: "请输入正确的手机号",
          icon: "none"
        });
        return;
      }
      try {
        startCountDown();
        const res = await common_vendor.index.request({
          url: "YOUR_API_URL/sendCode",
          // 替换为实际的接口地址
          method: "POST",
          data: {
            phone: phone.value
          }
        });
        if (res.data.code === 200) {
          common_vendor.index.showToast({
            title: "验证码已发送",
            icon: "success"
          });
        } else {
          throw new Error(res.data.message || "发送失败");
        }
      } catch (error) {
        stopCountDown();
        common_vendor.index.showToast({
          title: error.message || "发送验证码失败，请重试",
          icon: "none"
        });
      }
    };
    const startCountDown = () => {
      counting.value = true;
      counter.value = 60;
      timer = setInterval(() => {
        counter.value--;
        if (counter.value <= 0) {
          stopCountDown();
        }
      }, 1e3);
    };
    const stopCountDown = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      counting.value = false;
      counter.value = 60;
    };
    const isPhoneValid = common_vendor.computed(() => {
      return phone.value && /^1[3-9]\d{9}$/.test(phone.value);
    });
    const isFormValid = common_vendor.computed(() => {
      return isPhoneValid.value && code.value.length === 6;
    });
    common_vendor.onUnmounted(() => {
      stopCountDown();
    });
    const handleLogin = () => {
      if (!phone.value || phone.value.length !== 11) {
        common_vendor.index.showToast({
          title: "请输入正确的手机号",
          icon: "none"
        });
        return;
      }
      if (!code.value || code.value.length !== 6) {
        common_vendor.index.showToast({
          title: "请输入正确的验证码",
          icon: "none"
        });
        return;
      }
    };
    return (_ctx, _cache) => {
      return {
        a: phone.value,
        b: common_vendor.o(($event) => phone.value = $event.detail.value),
        c: code.value,
        d: common_vendor.o(($event) => code.value = $event.detail.value),
        e: common_vendor.t(counting.value ? `${counter.value}s后重试` : "获取验证码"),
        f: counting.value ? 1 : "",
        g: common_vendor.o(getVerifyCode),
        h: common_vendor.o(handleLogin),
        i: !isFormValid.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0a7b00bf"]]);
qq.createPage(MiniProgramPage);
