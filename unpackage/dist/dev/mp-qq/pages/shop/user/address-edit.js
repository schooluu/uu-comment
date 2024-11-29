"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "address-edit",
  setup(__props) {
    const isEdit = common_vendor.ref(false);
    const showPicker = common_vendor.ref(false);
    const isCustomTag = common_vendor.ref(false);
    const tags = ["家", "公司", "学校"];
    const form = common_vendor.ref({
      name: "",
      phone: "",
      region: "",
      address: "",
      tag: "",
      isDefault: false
    });
    common_vendor.onMounted(() => {
      const id = getQueryString("id");
      if (id) {
        isEdit.value = true;
        loadAddressDetail(id);
      }
    });
    const loadAddressDetail = async (id) => {
      try {
        const detail = await getAddressDetail(id);
        form.value = detail;
      } catch (error) {
        common_vendor.index.showToast({
          title: "加载失败",
          icon: "none"
        });
      }
    };
    const showAreaPicker = () => {
      showPicker.value = true;
    };
    const selectTag = (tag) => {
      form.value.tag = tag;
      isCustomTag.value = false;
    };
    const showCustomTagInput = () => {
      isCustomTag.value = true;
      form.value.tag = "";
    };
    const onCustomTagBlur = () => {
      if (!form.value.tag) {
        isCustomTag.value = false;
      }
    };
    const onDefaultChange = (e) => {
      form.value.isDefault = e.detail.value;
    };
    const saveAddress = async () => {
      if (!form.value.name) {
        return common_vendor.index.showToast({
          title: "请输入联系人姓名",
          icon: "none"
        });
      }
      if (!form.value.phone) {
        return common_vendor.index.showToast({
          title: "请输入手机号",
          icon: "none"
        });
      }
      if (!/^1[3-9]\d{9}$/.test(form.value.phone)) {
        return common_vendor.index.showToast({
          title: "手机号格式不正确",
          icon: "none"
        });
      }
      if (!form.value.region) {
        return common_vendor.index.showToast({
          title: "请选择所在地区",
          icon: "none"
        });
      }
      if (!form.value.address) {
        return common_vendor.index.showToast({
          title: "请输入详细地址",
          icon: "none"
        });
      }
      try {
        await saveAddressApi(form.value);
        common_vendor.index.showToast({
          title: "保存成功",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1500);
      } catch (error) {
        common_vendor.index.showToast({
          title: "保存失败",
          icon: "none"
        });
      }
    };
    const confirmDelete = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要删除该地址吗？",
        success: async (res) => {
          if (res.confirm) {
            try {
              await deleteAddressApi(form.value.id);
              common_vendor.index.showToast({
                title: "删除成功",
                icon: "success"
              });
              setTimeout(() => {
                common_vendor.index.navigateBack();
              }, 1500);
            } catch (error) {
              common_vendor.index.showToast({
                title: "删除失败",
                icon: "none"
              });
            }
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: form.value.name,
        b: common_vendor.o(($event) => form.value.name = $event.detail.value),
        c: form.value.phone,
        d: common_vendor.o(($event) => form.value.phone = $event.detail.value),
        e: form.value.region
      }, form.value.region ? {
        f: common_vendor.t(form.value.region)
      } : {}, {
        g: common_vendor.o(showAreaPicker),
        h: form.value.address,
        i: common_vendor.o(($event) => form.value.address = $event.detail.value),
        j: common_vendor.f(tags, (tag, k0, i0) => {
          return {
            a: common_vendor.t(tag),
            b: tag,
            c: form.value.tag === tag ? 1 : "",
            d: common_vendor.o(($event) => selectTag(tag), tag)
          };
        }),
        k: !isCustomTag.value
      }, !isCustomTag.value ? {} : {
        l: common_vendor.o(onCustomTagBlur),
        m: form.value.tag,
        n: common_vendor.o(($event) => form.value.tag = $event.detail.value)
      }, {
        o: isCustomTag.value ? 1 : "",
        p: common_vendor.o(showCustomTagInput),
        q: form.value.isDefault,
        r: common_vendor.o(onDefaultChange),
        s: isEdit.value
      }, isEdit.value ? {
        t: common_vendor.o(confirmDelete)
      } : {}, {
        v: !isEdit.value ? 1 : "",
        w: common_vendor.o(saveAddress)
      });
    };
  }
};
qq.createPage(_sfc_main);
