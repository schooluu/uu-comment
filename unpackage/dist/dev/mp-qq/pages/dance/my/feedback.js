"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "feedback",
  setup(__props) {
    const feedbackTypes = [
      { id: 1, name: "课程相关" },
      { id: 2, name: "老师相关" },
      { id: 3, name: "系统问题" },
      { id: 4, name: "其他建议" }
    ];
    const selectedType = common_vendor.ref(0);
    const content = common_vendor.ref("");
    const images = common_vendor.ref([]);
    const contact = common_vendor.ref("");
    const isValid = common_vendor.computed(() => {
      return selectedType.value !== 0 && content.value.trim().length > 0;
    });
    const selectType = (typeId) => {
      selectedType.value = typeId;
    };
    const chooseImage = () => {
      common_vendor.index.chooseImage({
        count: 4 - images.value.length,
        success: (res) => {
          images.value = [...images.value, ...res.tempFilePaths];
        }
      });
    };
    const deleteImage = (index) => {
      images.value.splice(index, 1);
    };
    const submit = () => {
      if (!isValid.value) {
        common_vendor.index.showToast({
          title: "请选择反馈类型并填写反馈内容",
          icon: "none"
        });
        return;
      }
      common_vendor.index.showLoading({
        title: "提交中"
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "提交成功",
          icon: "success"
        });
        selectedType.value = 0;
        content.value = "";
        images.value = [];
        contact.value = "";
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1500);
      }, 1500);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(feedbackTypes, (type, k0, i0) => {
          return {
            a: common_vendor.t(type.name),
            b: type.id,
            c: selectedType.value === type.id ? 1 : "",
            d: common_vendor.o(($event) => selectType(type.id), type.id)
          };
        }),
        b: content.value,
        c: common_vendor.o(($event) => content.value = $event.detail.value),
        d: common_vendor.t(content.value.length),
        e: common_vendor.f(images.value, (image, index, i0) => {
          return {
            a: image,
            b: common_vendor.o(($event) => deleteImage(index), index),
            c: index
          };
        }),
        f: images.value.length < 4
      }, images.value.length < 4 ? {
        g: common_vendor.o(chooseImage)
      } : {}, {
        h: contact.value,
        i: common_vendor.o(($event) => contact.value = $event.detail.value),
        j: !isValid.value ? 1 : "",
        k: common_vendor.o(submit)
      });
    };
  }
};
qq.createPage(_sfc_main);
