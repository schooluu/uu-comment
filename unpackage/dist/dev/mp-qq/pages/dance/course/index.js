"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Math) {
  (TabBar + FilterPopup)();
}
const TabBar = () => "../../../components/dance/tab-bar.js";
const FilterPopup = () => "../../../components/dance/filter-popup.js";
const itemWidth = 140;
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const dates = common_vendor.ref([
      { day: "Tue", date: "今天" },
      { day: "Wed", date: "20" },
      { day: "Thur", date: "21" },
      { day: "Fri", date: "22" },
      { day: "Sat", date: "23" },
      { day: "Sun", date: "24" },
      { day: "Mon", date: "25" },
      { day: "Week", date: "一周" }
    ]);
    const courses = common_vendor.ref([
      {
        teacherName: "FAFA",
        avatar: "https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/aa57670d0d25d0c6f02772495e6cd5d3.png",
        title: "JAZZ",
        level: 3,
        count: "1",
        time: "2024.11.19 周二 18:00~19:00",
        location: "FancyFancy舞室大悦城店 上空",
        status: "book"
      },
      {
        teacherName: "宝宝babo",
        avatar: "https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/aa57670d0d25d0c6f02772495e6cd5d3.png",
        title: "JAZZ 身体开发",
        level: 1,
        count: "1",
        time: "2024.11.19 周二 18:00~19:00",
        location: "FancyFancy舞室大悦城店 B教室",
        status: "tight",
        remaining: 2
      },
      {
        teacherName: "大圆",
        avatar: "https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png",
        title: "MV DANCE",
        level: 2,
        count: "1",
        time: "2024.11.19 周二 18:20~19:20",
        location: "FancyFancy舞室大悦城店 A教室",
        status: "full"
      },
      {
        teacherName: "Lynn",
        avatar: "https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png",
        title: "JAZZ",
        level: 3,
        count: "1",
        time: "2024.11.19 周二 19:10~20:10",
        location: "FancyFancy舞室大悦店 上空",
        status: "tight",
        remaining: 8
      },
      {
        teacherName: "Wantina",
        avatar: "https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png",
        title: "JAZZ 基础",
        level: 1,
        count: "1",
        time: "2024.11.19 周二 19:10~20:10",
        location: "FancyFancy舞室大悦城店 B教室",
        status: "tight",
        remaining: 2
      }
    ]);
    const showFilter = common_vendor.ref(false);
    const currentFilterType = common_vendor.ref("");
    const isBasicLevel = common_vendor.ref(false);
    const currentIndex = common_vendor.ref(0);
    const scrollLeft = common_vendor.ref(0);
    const hideHint = common_vendor.ref(false);
    const scrollViewWidth = common_vendor.ref(0);
    const currentPath = common_vendor.computed(() => {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      return `/${currentPage.route}`;
    });
    const handleFilterClick = (type) => {
      currentFilterType.value = type;
      showFilter.value = true;
    };
    const handleFilterConfirm = (data) => {
      console.log("选中的筛选条件:", data);
      switch (data.type) {
      }
    };
    const toggleBasicLevel = () => {
      isBasicLevel.value = !isBasicLevel.value;
      filterCourses();
    };
    const handleSearch = () => {
      common_vendor.index.navigateTo({
        url: "/pages/dance/course/search"
      });
    };
    const filterCourses = () => {
      const filteredCourses = courses.value.filter((course) => {
        if (isBasicLevel.value && course.level > 1) {
          return false;
        }
        return true;
      });
      courses.value = filteredCourses;
    };
    const selectDate = (index) => {
      currentIndex.value = index;
      const newScrollLeft = calculateScrollPosition(index);
      scrollLeft.value = newScrollLeft;
    };
    const calculateScrollPosition = (index) => {
      const scrollWidth = scrollViewWidth.value || common_vendor.index.getSystemInfoSync().windowWidth;
      const itemPosition = index * itemWidth;
      const centerPosition = itemPosition - (scrollWidth - itemWidth) / 2;
      return Math.max(0, centerPosition);
    };
    const onScroll = (e) => {
    };
    const getCourseStatusText = (status) => {
      const statusMap = {
        "book": "预约",
        "full": "爆满",
        "tight": "紧张"
      };
      return statusMap[status] || status;
    };
    common_vendor.onMounted(() => {
      const query = common_vendor.index.createSelectorQuery();
      query.select(".date-scroll").boundingClientRect((data) => {
        scrollViewWidth.value = data.width;
      }).exec();
    });
    common_vendor.onMounted(() => {
      setTimeout(() => {
        hideHint.value = true;
      }, 3e3);
    });
    const banners = common_vendor.ref([
      {
        image: "https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/微信图片_20241120131438.png",
        title: "DOPAMINE",
        subtitle: "万圣开篇，酷炫装扮等你来COS",
        date: "November 2024",
        theme: "Passionate Freedom /AFRO."
      },
      {
        image: "https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/微信图片_20241120131438.png",
        title: "JAZZ NIGHT",
        subtitle: "爵士之夜，感受律动的魅力",
        date: "December 2024",
        theme: "Rhythm & Soul /JAZZ."
      },
      {
        image: "https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/微信图片_20241120131438.png",
        title: "STREET DANCE",
        subtitle: "街舞派对，展现你的态度",
        date: "January 2025",
        theme: "Urban Style /HIP-HOP."
      }
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(banners.value, (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.title),
            c: common_vendor.t(item.subtitle),
            d: common_vendor.t(item.date),
            e: common_vendor.t(item.theme),
            f: index
          };
        }),
        b: common_vendor.o(($event) => handleFilterClick("store")),
        c: common_vendor.o(($event) => handleFilterClick("time")),
        d: common_vendor.o(($event) => handleFilterClick("style")),
        e: common_vendor.o(($event) => handleFilterClick("teacher")),
        f: isBasicLevel.value ? 1 : "",
        g: common_vendor.o(toggleBasicLevel),
        h: common_vendor.o(handleSearch),
        i: common_vendor.f(dates.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.day),
            b: common_vendor.t(item.date),
            c: index,
            d: currentIndex.value === index ? 1 : "",
            e: common_vendor.o(($event) => selectDate(index), index)
          };
        }),
        j: hideHint.value ? 1 : "",
        k: scrollLeft.value,
        l: common_vendor.o(onScroll),
        m: common_vendor.f(courses.value, (course, index, i0) => {
          return common_vendor.e({
            a: course.avatar,
            b: common_vendor.t(course.teacherName),
            c: common_vendor.t(course.title),
            d: common_vendor.t("⭐".repeat(course.level)),
            e: common_vendor.t(course.count),
            f: common_vendor.t(course.time),
            g: common_vendor.t(course.location),
            h: course.remaining
          }, course.remaining ? {
            i: common_vendor.t(course.remaining)
          } : {}, {
            j: common_vendor.t(getCourseStatusText(course.status)),
            k: course.status === "book" ? 1 : "",
            l: course.status === "full" ? 1 : "",
            m: course.status === "tight" ? 1 : "",
            n: common_vendor.o(($event) => _ctx.handleCourse(course), index),
            o: !course.isFavorite
          }, !course.isFavorite ? {} : {}, {
            p: common_vendor.o(($event) => _ctx.toggleFavorite(course), index),
            q: index,
            r: `${index * 0.1}s`
          });
        }),
        n: common_vendor.p({
          current: currentPath.value
        }),
        o: common_vendor.o(handleFilterConfirm),
        p: common_vendor.o(($event) => showFilter.value = $event),
        q: common_vendor.p({
          show: showFilter.value
        })
      };
    };
  }
};
qq.createPage(_sfc_main);
