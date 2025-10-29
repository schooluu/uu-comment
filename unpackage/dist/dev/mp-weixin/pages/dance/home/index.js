"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Math) {
  TabBar();
}
const TabBar = () => "../../../components/dance/tab-bar.js";
const itemWidth = 140;
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const currentSwiper = common_vendor.ref(0);
    const banners = common_vendor.ref([
      "https://objectstorageapi.bja.sealos.run/ppny09lg-xr-im/dance/微信图片_20241120114522.png",
      "https://objectstorageapi.bja.sealos.run/ppny09lg-xr-im/dance/微信图片_20241120131438.png",
      "https://objectstorageapi.bja.sealos.run/ppny09lg-xr-im/dance/微信图片_20241120114537.png"
    ]);
    const navItems = common_vendor.ref([
      {
        name: "门店",
        enName: "STORE",
        path: ""
      },
      {
        name: "导师",
        enName: "PRIVATE",
        path: "/pages/dance/teacher/teacher"
      },
      {
        name: "视频",
        enName: "ACTIVITY",
        path: "/pages/dance/home/video"
      },
      {
        name: "新人",
        enName: "ACTIVITY",
        path: "/pages/dance/home/ad"
      }
    ]);
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
        teacherName: "XX",
        avatar: "https://img0.baidu.com/it/u=212230986,3555547834&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        title: "JAZZ",
        level: 3,
        count: "1",
        time: "2024.11.19 周二 18:00~19:00",
        location: "XXXX舞室大悦城店 上空",
        status: "book"
      },
      {
        teacherName: "XX",
        avatar: "https://img0.baidu.com/it/u=212230986,3555547834&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        title: "JAZZ 身体开发",
        level: 1,
        count: "1",
        time: "2024.11.19 周二 18:00~19:00",
        location: "XXXX舞室大悦城店 B教室",
        status: "tight",
        remaining: 2
      },
      {
        teacherName: "大圆",
        avatar: "https://img0.baidu.com/it/u=212230986,3555547834&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        title: "MV DANCE",
        level: 2,
        count: "1",
        time: "2024.11.19 周二 18:20~19:20",
        location: "XXXX舞室大悦城店 A教室",
        status: "full"
      },
      {
        teacherName: "Lynn",
        avatar: "https://img0.baidu.com/it/u=212230986,3555547834&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        title: "JAZZ",
        level: 3,
        count: "1",
        time: "2024.11.19 周二 19:10~20:10",
        location: "XXXX舞室大悦店 上空",
        status: "tight",
        remaining: 8
      },
      {
        teacherName: "Wantina",
        avatar: "https://img0.baidu.com/it/u=212230986,3555547834&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        title: "JAZZ 基础",
        level: 1,
        count: "1",
        time: "2024.11.19 周二 19:10~20:10",
        location: "XXXX舞室大悦城店 B教室",
        status: "tight",
        remaining: 2
      }
    ]);
    const venues = common_vendor.ref([
      {
        name: "XXXX舞室大悦城店",
        address: "XXXXXXXXXXXXX",
        image: "https://qcloud.dpfile.com/pc/Je_8tkOxYOAc4tEgnIaIF4JepryHR899dUp-8sZPSvRHcNdd0rKT_yP6s6vaki9A.jpg"
      },
      {
        name: "XXXX舞室嘉里合集店",
        address: "XXXXXXXX室",
        image: "https://qcloud.dpfile.com/pc/hW3D6Eg1UIB7fz8kvtNVTo1iqxT4LNEIjzkpB-wW6RD1JqNcWwFU-9phykgJcvQC.jpg"
      }
    ]);
    const teachers = common_vendor.ref([
      {
        id: 1,
        name: "Joho",
        avatar: "https://img0.baidu.com/it/u=212230986,3555547834&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        style: "Jazz"
      },
      {
        id: 2,
        name: "FEI",
        avatar: "https://img0.baidu.com/it/u=212230986,3555547834&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        style: "Hip-hop"
      },
      {
        id: 3,
        name: "XX",
        avatar: "https://img0.baidu.com/it/u=212230986,3555547834&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        style: "Urban"
      },
      {
        id: 4,
        name: "XX",
        avatar: "https://img0.baidu.com/it/u=212230986,3555547834&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        style: "Popping"
      },
      {
        id: 5,
        name: "XX",
        avatar: "https://img0.baidu.com/it/u=212230986,3555547834&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        style: "Swing"
      },
      {
        id: 6,
        name: "XX",
        avatar: "https://img0.baidu.com/it/u=212230986,3555547834&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        style: "Ballet"
      },
      {
        id: 7,
        name: "XX",
        avatar: "https://img0.baidu.com/it/u=212230986,3555547834&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        style: "Contemporary"
      },
      {
        id: 8,
        name: "XX",
        avatar: "https://img0.baidu.com/it/u=212230986,3555547834&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        style: "K-pop"
      },
      {
        id: 9,
        name: "XX",
        avatar: "https://img0.baidu.com/it/u=212230986,3555547834&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        style: "Latin"
      },
      {
        id: 10,
        name: "BADA",
        avatar: "https://img0.baidu.com/it/u=212230986,3555547834&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        style: "Street"
      }
    ]);
    const currentIndex = common_vendor.ref(0);
    const scrollLeft = common_vendor.ref(0);
    const hideHint = common_vendor.ref(false);
    const scrollViewWidth = common_vendor.ref(0);
    const handleDateTap = (index) => {
      hideHint.value = true;
      selectDate(index);
    };
    const hideScrollHint = () => {
      hideHint.value = true;
    };
    const onScroll = (e) => {
      if (!hideHint.value && e.detail.scrollLeft > 0) {
        hideHint.value = true;
      }
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
    common_vendor.onMounted(() => {
      const query = common_vendor.index.createSelectorQuery();
      query.select(".date-scroll").boundingClientRect((data) => {
        scrollViewWidth.value = data.width;
      }).exec();
    });
    const getCourseStatusText = (status) => {
      const statusMap = {
        "book": "预约",
        "full": "爆满",
        "tight": "紧张"
      };
      return statusMap[status] || status;
    };
    const handleCourse = (course) => {
      if (course.status === "book") {
        common_vendor.index.showToast({
          title: "预约成功",
          icon: "success"
        });
      }
    };
    const toggleFavorite = (course) => {
      course.isFavorite = !course.isFavorite;
    };
    const navigateTo = (path) => {
      if (path) {
        common_vendor.index.navigateTo({
          url: path
        });
      }
    };
    const goToTeacherList = () => {
      common_vendor.index.navigateTo({
        url: "/pages/dance/teacher/teacher"
      });
    };
    const goToVenueList = () => {
      common_vendor.index.navigateTo({
        url: `/pages/dance/home/venueList`
      });
    };
    const goToVenueDetail = (venueId) => {
      common_vendor.index.navigateTo({
        url: `/pages/dance/home/venueDetail?id=${venueId}`
      });
    };
    const currentPath = common_vendor.computed(() => {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      return `/${currentPage.route}`;
    });
    const goToVideoList = () => {
      common_vendor.index.navigateTo({
        url: "/pages/dance/home/video",
        success: () => {
          common_vendor.index.__f__("log", "at pages/dance/home/index.vue:491", "跳转成功");
        },
        fail: (error) => {
          common_vendor.index.__f__("error", "at pages/dance/home/index.vue:494", "跳转失败:", error);
          common_vendor.index.showToast({
            title: "页面跳转失败",
            icon: "none"
          });
        }
      });
    };
    const goToCourseList = () => {
      common_vendor.index.navigateTo({
        url: "/pages/dance/course/index",
        success: () => {
          common_vendor.index.__f__("log", "at pages/dance/home/index.vue:508", "跳转成功");
        },
        fail: (error) => {
          common_vendor.index.__f__("error", "at pages/dance/home/index.vue:511", "跳转失败:", error);
          common_vendor.index.showToast({
            title: "页面跳转失败",
            icon: "none"
          });
        }
      });
    };
    common_vendor.onMounted(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      }, {
        threshold: 0.1
      });
      const teacherGrid = document.querySelector(".teacher-grid");
      if (teacherGrid) {
        observer.observe(teacherGrid);
      }
    });
    const handleSwiperChange = (e) => {
      currentSwiper.value = e.detail.current;
    };
    const handleDotClick = (index) => {
      currentSwiper.value = index;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(banners.value, (item, index, i0) => {
          return {
            a: item,
            b: currentSwiper.value === index ? 1 : "",
            c: index
          };
        }),
        b: common_vendor.o(handleSwiperChange),
        c: common_vendor.f(banners.value, (item, index, i0) => {
          return common_vendor.e({
            a: currentSwiper.value === index
          }, currentSwiper.value === index ? {} : {}, {
            b: index,
            c: currentSwiper.value === index ? 1 : "",
            d: common_vendor.o(($event) => handleDotClick(index), index)
          });
        }),
        d: common_vendor.f(navItems.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.enName),
            c: index,
            d: common_vendor.o(($event) => navigateTo(item.path), index)
          };
        }),
        e: common_vendor.o(goToVideoList),
        f: common_vendor.o(goToCourseList),
        g: common_vendor.f(dates.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.day),
            b: common_vendor.t(item.date),
            c: index,
            d: currentIndex.value === index ? 1 : "",
            e: common_vendor.o(($event) => handleDateTap(index), index)
          };
        }),
        h: hideHint.value ? 1 : "",
        i: scrollLeft.value,
        j: common_vendor.o(onScroll),
        k: common_vendor.o(hideScrollHint),
        l: common_vendor.f(courses.value, (course, index, i0) => {
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
            n: common_vendor.o(($event) => handleCourse(course), index),
            o: !course.isFavorite
          }, !course.isFavorite ? {} : {}, {
            p: common_vendor.o(($event) => toggleFavorite(course), index),
            q: index
          });
        }),
        m: common_vendor.o(goToVenueList),
        n: common_vendor.f(venues.value, (venue, index, i0) => {
          return {
            a: venue.image,
            b: common_vendor.t(venue.name),
            c: common_vendor.t(venue.address),
            d: common_vendor.o(($event) => goToVenueDetail(venue.id), index),
            e: index
          };
        }),
        o: common_vendor.o(goToTeacherList),
        p: common_vendor.f(teachers.value, (teacher, index, i0) => {
          return {
            a: teacher.avatar,
            b: common_vendor.t(teacher.name),
            c: common_vendor.t(teacher.style),
            d: index,
            e: common_vendor.o(($event) => _ctx.goToTeacherDetail(teacher), index),
            f: index * 0.05 + "s"
          };
        }),
        q: common_vendor.p({
          current: currentPath.value
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/dance/home/index.js.map
