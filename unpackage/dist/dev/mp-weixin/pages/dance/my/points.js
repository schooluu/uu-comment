"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "points",
  setup(__props) {
    const userPoints = common_vendor.ref(1500);
    const goods = common_vendor.ref([
      {
        id: 1,
        name: "单节课程体验券",
        description: "可用于任意常规课程",
        points: 1e3,
        image: "/static/images/points/course.jpg"
      },
      {
        id: 2,
        name: "FancyFancy限定T恤",
        description: "2024春季新款",
        points: 2e3,
        image: "/static/images/points/tshirt.jpg"
      }
    ]);
    const exchange = (item) => {
      if (userPoints.value < item.points) {
        common_vendor.index.showToast({
          title: "积分不足",
          icon: "none"
        });
        return;
      }
      common_vendor.index.showModal({
        title: "兑换确认",
        content: `确定使用${item.points}积分兑换${item.name}吗？`,
        success: (res) => {
          if (res.confirm) {
            userPoints.value -= item.points;
            common_vendor.index.showToast({
              title: "兑换成功",
              icon: "success"
            });
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(userPoints.value),
        b: common_vendor.f(goods.value, (item, k0, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.description),
            d: common_vendor.t(item.points),
            e: userPoints.value < item.points ? 1 : "",
            f: common_vendor.o(($event) => exchange(item), item.id),
            g: item.id
          };
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/dance/my/points.js.map
