"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "filter-popup",
  props: {
    show: Boolean,
    filterType: String
  },
  emits: ["update:show", "confirm"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const tabs = ["门店", "1个时段", "风格", "导师"];
    const currentTab = common_vendor.ref(0);
    const selectedOption = common_vendor.ref("全部");
    const selectedCategory = common_vendor.ref("明星导师");
    common_vendor.ref("");
    const storeList = [
      "FancyFancy舞室金鹰店",
      "FancyFancy舞室南京店",
      "FancyFancy舞室博荟店",
      "FancyFancy成都晶融汇店",
      "FancyFancy舞室大悦城店",
      "FancyFancy舞室梅奔店",
      "FancyFancy舞室嘉里合集店",
      "FancyFancy舞室华润店",
      "FancyFancy舞室杭州中心店",
      "FancyFancy舞室人广来福士店",
      "FancyFancy舞室徐汇传媒港店",
      "FancyFancy舞室长宁来福士店"
    ];
    const timeList = [
      { time: "全部", value: "all" },
      { time: "08:00 ~ 10:00", value: "08-10" },
      { time: "10:00 ~ 12:00", value: "10-12" },
      { time: "12:00 ~ 14:00", value: "12-14" },
      { time: "14:00 ~ 16:00", value: "14-16" },
      { time: "16:00 ~ 18:00", value: "16-18" },
      { time: "18:00 ~ 20:00", value: "18-20" },
      { time: "20:00 ~ 22:00", value: "20-22" }
    ];
    const teacherList = {
      "明星导师": [
        { name: "APHRODITE", avatar: "/static/teachers/aphrodite.jpg" },
        { name: "CHERRY", avatar: "/static/teachers/cherry.jpg" },
        { name: "DEVIN PORNEL", avatar: "/static/teachers/devin.jpg" },
        { name: "DOYUN", avatar: "/static/teachers/doyun.jpg" },
        { name: "JUNHO LEE", avatar: "/static/teachers/junho.jpg" },
        { name: "MAAIN", avatar: "/static/teachers/maain.jpg" },
        { name: "MARLEE HIGHTOWER", avatar: "/static/teachers/marlee.jpg" }
      ]
      // ... 其他分类的导师列表
    };
    const cities = ["上海", "杭州", "南京", "成都"];
    const currentOptions = common_vendor.computed(() => {
      switch (currentTab.value) {
        case 0:
          return storeList;
        case 1:
          return timeList;
        case 2:
          return styleList;
        case 3:
          return teacherList;
        default:
          return [];
      }
    });
    const currentTeachers = common_vendor.computed(() => {
      return teacherList[selectedCategory.value] || [];
    });
    const switchTab = (index) => {
      currentTab.value = index;
    };
    const selectOption = (option) => {
      selectedOption.value = option;
    };
    const clearSelection = () => {
      selectedOption.value = "全部";
    };
    const close = () => {
      emit("update:show", false);
    };
    const confirm = () => {
      emit("confirm", {
        type: tabs[currentTab.value],
        value: selectedOption.value
      });
      close();
    };
    const selectCategory = (category) => {
      selectedCategory.value = category;
      selectedOption.value = "全部";
    };
    const getOptionsByType = (type) => {
      switch (type) {
        case "store":
          return [
            "全部",
            "已收藏的门店",
            "FancyFancy舞室金鹰店",
            "FancyFancy舞室南京店"
            // ... 其他门店
          ];
        case "time":
          return [
            "全部时段",
            "上午(10:00-12:00)",
            "中午(12:00-14:00)",
            "下午(14:00-18:00)",
            "晚上(18:00-22:00)"
          ];
        case "style":
          return [
            "全部风格",
            "Jazz",
            "Hip-hop",
            "Urban",
            "Contemporary",
            "Kpop"
          ];
        case "teacher":
          return [
            "全部导师",
            "推荐导师",
            "收藏导师"
          ];
        default:
          return [];
      }
    };
    common_vendor.watch(() => props.filterType, (newType) => {
      if (newType) {
        currentOptions.value = getOptionsByType(newType);
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.show
      }, __props.show ? common_vendor.e({
        b: __props.show ? 1 : "",
        c: common_vendor.o(close),
        d: common_vendor.f(tabs, (tab, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(tab),
            b: currentTab.value === index
          }, currentTab.value === index ? {} : {}, {
            c: index,
            d: currentTab.value === index ? 1 : "",
            e: common_vendor.o(($event) => switchTab(index), index)
          });
        }),
        e: currentTab.value === 1
      }, currentTab.value === 1 ? {
        f: selectedOption.value === "全部" ? 1 : "",
        g: common_vendor.o(($event) => selectOption("全部")),
        h: common_vendor.f(timeList.slice(1), (item, index, i0) => {
          return {
            a: common_vendor.t(item.time),
            b: index,
            c: selectedOption.value === item.time ? 1 : "",
            d: common_vendor.o(($event) => selectOption(item.time), index)
          };
        })
      } : currentTab.value === 3 ? {
        j: selectedCategory.value === "明星导师" ? 1 : "",
        k: common_vendor.o(($event) => selectCategory("明星导师")),
        l: common_vendor.f(cities, (city, index, i0) => {
          return {
            a: common_vendor.t(city),
            b: index,
            c: selectedCategory.value === `人气导师-${city}` ? 1 : "",
            d: common_vendor.o(($event) => selectCategory(`人气导师-${city}`), index)
          };
        }),
        m: selectedCategory.value === "新晋导师" ? 1 : "",
        n: common_vendor.o(($event) => selectCategory("新晋导师")),
        o: selectedCategory.value === "零基础" ? 1 : "",
        p: common_vendor.o(($event) => selectCategory("零基础")),
        q: selectedCategory.value === "已收藏的导师" ? 1 : "",
        r: common_vendor.o(($event) => selectCategory("已收藏的导师")),
        s: common_vendor.f(currentTeachers.value, (teacher, index, i0) => {
          return {
            a: teacher.avatar,
            b: common_vendor.t(teacher.name),
            c: index,
            d: selectedOption.value === teacher.name ? 1 : "",
            e: common_vendor.o(($event) => selectOption(teacher.name), index)
          };
        })
      } : common_vendor.e({
        t: selectedOption.value === "全部" ? 1 : "",
        v: common_vendor.o(($event) => selectOption("全部")),
        w: currentTab.value === 0
      }, currentTab.value === 0 ? {
        x: selectedOption.value === "已收藏的门店" ? 1 : "",
        y: common_vendor.o(($event) => selectOption("已收藏的门店"))
      } : {}, {
        z: common_vendor.f(currentOptions.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: selectedOption.value === item ? 1 : "",
            d: common_vendor.o(($event) => selectOption(item), index)
          };
        })
      }), {
        i: currentTab.value === 3,
        A: common_vendor.o(clearSelection),
        B: common_vendor.o(confirm)
      }) : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-84b9eabf"]]);
qq.createComponent(Component);
