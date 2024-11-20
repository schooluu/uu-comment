<template>
  <view class="container">
    <!-- 顶部轮播 -->
    <swiper class="banner-swiper animate-fade-in" circular autoplay interval="3000" duration="500">
      <swiper-item v-for="(item, index) in banners" :key="index">
        <view class="banner-item">
          <image class="banner-image" :src="item.image" mode="aspectFill"></image>
          <view class="banner-content">
            <text class="title">{{ item.title }}</text>
            <text class="subtitle">/{{ item.subtitle }}</text>
            <text class="date">'{{ item.date }}</text>
            <text class="theme">{{ item.theme }}</text>
          </view>
        </view>
      </swiper-item>
    </swiper>

    <!-- 标签切换 -->
    <view class="tab-header animate-slide-down">
      <text class="tab-item active">常规课</text>
      <text class="tab-item">活动赛事</text>
    </view>

    <!-- 筛选条件 -->
    <view class="filter-section animate-slide-right">
      <view class="filter-item" @tap="handleFilterClick('store')">
        门店 <text class="icon">∨</text>
      </view>
      <view class="filter-item" @tap="handleFilterClick('time')">
        时段 <text class="icon">∨</text>
      </view>
      <view class="filter-item" @tap="handleFilterClick('style')">
        风格 <text class="icon">∨</text>
      </view>
      <view class="filter-item" @tap="handleFilterClick('teacher')">
        导师 <text class="icon">∨</text>
      </view>
      <view class="filter-item" :class="{ active: isBasicLevel }" @tap="toggleBasicLevel">
        0基础
      </view>
      <view class="filter-item search" @tap="handleSearch">
        <text class="icon">🔍</text>
      </view>
    </view>

    <!-- 日期选择 -->
    <scroll-view class="date-scroll animate-fade-in" scroll-x show-scrollbar="false" enhanced :scroll-with-animation="true"
      :scroll-left="scrollLeft" @scroll="onScroll">
      <view class="date-list">
        <view class="date-item" v-for="(item, index) in dates" :key="index" :class="{ active: currentIndex === index }"
          @tap="selectDate(index)">
          <text class="day">{{ item.day }}</text>
          <text class="date">{{ item.date }}</text>
        </view>
      </view>
      <!-- 添加滑动提示 -->
      <view class="scroll-hint" :class="{ 'hide': hideHint }">
        <text class="hint-text">左右滑动查看更多</text>
        <text class="hint-arrow">›</text>
      </view>
    </scroll-view>

   <!-- 课程列表 -->
   <view class="course-list">
        <view 
          class="course-item animate-slide-up" 
          v-for="(course, index) in courses" 
          :key="index"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <view class="course-header">
            <image class="teacher-avatar" :src="course.avatar" mode="aspectFill"></image>
            <text class="teacher-name">{{ course.teacherName }}</text>
          </view>

          <view class="course-info">
            <view class="title-row">
              <text class="course-title">{{ course.title }}</text>
              <text class="stars">{{ '⭐'.repeat(course.level) }}</text>
            </view>
            <text class="course-count">{{ course.count }}课次</text>
            <text class="course-time">{{ course.time }}</text>
            <text class="course-location">{{ course.location }}</text>
          </view>

          <view class="course-status">
            <view class="remaining" v-if="course.remaining">
              <text class="text">剩余{{ course.remaining }}位</text>
            </view>
            <button class="action-btn" :class="{
              'btn-book': course.status === 'book',
              'btn-full': course.status === 'full',
              'btn-tight': course.status === 'tight'
            }" @tap="handleCourse(course)">
              {{ getCourseStatusText(course.status) }}
            </button>
          </view>

          <view class="favorite-btn" @tap="toggleFavorite(course)">
            <view class="icon">
              <icon v-if="!course.isFavorite" type="heart-o" size="40"></icon>
              <icon v-else type="heart" size="40" color="#FF4D8F"></icon>
            </view>
          </view>
        </view>
      </view>
    <tab-bar :current="currentPath" />
    <filter-popup v-model:show="showFilter" @confirm="handleFilterConfirm" />
  </view>

</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import TabBar from '@/components/dance/tab-bar.vue'
import FilterPopup from '@/components/dance/filter-popup.vue'
const dates = ref([
  { day: 'Tue', date: '今天' },
  { day: 'Wed', date: '20' },
  { day: 'Thur', date: '21' },
  { day: 'Fri', date: '22' },
  { day: 'Sat', date: '23' },
  { day: 'Sun', date: '24' },
  { day: 'Mon', date: '25' },
  { day: 'Week', date: '一周' }
])

const courses = ref([
  {
    teacherName: 'FAFA',
    avatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/aa57670d0d25d0c6f02772495e6cd5d3.png',
    title: 'JAZZ',
    level: 3,
    count: '1',
    time: '2024.11.19 周二 18:00~19:00',
    location: 'FancyFancy舞室大悦城店 上空',
    status: 'book'
  },
  {
    teacherName: '宝宝babo',
    avatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/aa57670d0d25d0c6f02772495e6cd5d3.png',
    title: 'JAZZ 身体开发',
    level: 1,
    count: '1',
    time: '2024.11.19 周二 18:00~19:00',
    location: 'FancyFancy舞室大悦城店 B教室',
    status: 'tight',
    remaining: 2
  },
  {
    teacherName: '大圆',
    avatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png',
    title: 'MV DANCE',
    level: 2,
    count: '1',
    time: '2024.11.19 周二 18:20~19:20',
    location: 'FancyFancy舞室大悦城店 A教室',
    status: 'full'
  },
  {
    teacherName: 'Lynn',
    avatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png',
    title: 'JAZZ',
    level: 3,
    count: '1',
    time: '2024.11.19 周二 19:10~20:10',
    location: 'FancyFancy舞室大悦店 上空',
    status: 'tight',
    remaining: 8
  },
  {
    teacherName: 'Wantina',
    avatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png',
    title: 'JAZZ 基础',
    level: 1,
    count: '1',
    time: '2024.11.19 周二 19:10~20:10',
    location: 'FancyFancy舞室大悦城店 B教室',
    status: 'tight',
    remaining: 2
  }
])

const showFilter = ref(false)
const currentFilterType = ref('')
const isBasicLevel = ref(false)
const currentIndex = ref(0)
const scrollLeft = ref(0)
const hideHint = ref(false)
const itemWidth = 140 // 每个日期项的宽度（包含margin）
const scrollViewWidth = ref(0)

const currentPath = computed(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  return `/${currentPage.route}`
})

// 课程预约
const bookCourse = (course) => {
  if (!course.canBook) {
    uni.showToast({
      title: '该课程已停课',
      icon: 'none'
    })
    return
  }

  uni.navigateTo({
    url: `/pages/dance/course/book?id=${course.id}`
  })
}

// 处理筛选项点击
const handleFilterClick = (type) => {
  currentFilterType.value = type
  showFilter.value = true
}

// 处理筛选确认
const handleFilterConfirm = (data) => {
  console.log('选中的筛选条件:', data)
  switch (data.type) {
    case '门店':
      // 处理门店筛选
      break
    case '时段':
      // 处理时段筛选
      break
    case '风格':
      // 处理风格筛选
      break
    case '导师':
      // 处理导师筛选
      break
  }
}

// 切换0基础筛选
const toggleBasicLevel = () => {
  isBasicLevel.value = !isBasicLevel.value
  // 这里可以直接触发筛选
  filterCourses()
}

// 处理搜索
const handleSearch = () => {
  uni.navigateTo({
    url: '/pages/dance/course/search'
  })
}

// 筛选课程
const filterCourses = () => {
  // 实现课程筛选逻辑
  const filteredCourses = courses.value.filter(course => {
    if (isBasicLevel.value && course.level > 1) {
      return false
    }
    // 添加其他筛选条件
    return true
  })
  // 更新显示的课程列表
  courses.value = filteredCourses
}

// 选择日期
const selectDate = (index) => {
  currentIndex.value = index

  // 计算新的滚动位置
  const newScrollLeft = calculateScrollPosition(index)
  scrollLeft.value = newScrollLeft
}

// 计算滚动位置，��选中项居中
const calculateScrollPosition = (index) => {
  // 获取当前滚动容器的宽度
  const scrollWidth = scrollViewWidth.value || uni.getSystemInfoSync().windowWidth

  // 计算目标项的位置
  const itemPosition = index * itemWidth

  // 计算使目标项居中需要滚动的距离
  const centerPosition = itemPosition - (scrollWidth - itemWidth) / 2

  // 确保不会滚动到负值
  return Math.max(0, centerPosition)
}

// 监听滚动
const onScroll = (e) => {

}

const getCourseStatusText = (status) => {
  const statusMap = {
    'book': '预约',
    'full': '爆满',
    'tight': '紧张'
  }
  return statusMap[status] || status
}

// 初始化滚动容器宽度
onMounted(() => {
  const query = uni.createSelectorQuery()
  query.select('.date-scroll').boundingClientRect(data => {
    scrollViewWidth.value = data.width
  }).exec()
})

// 3秒后隐藏提示
onMounted(() => {
  setTimeout(() => {
    hideHint.value = true
  }, 3000)
})

// 轮播图数据
const banners = ref([
  {
    image: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/微信图片_20241120131438.png',
    title: 'DOPAMINE',
    subtitle: '万圣开篇，酷炫装扮等你来COS',
    date: 'November 2024',
    theme: 'Passionate Freedom /AFRO.'
  },
  {
    image: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/微信图片_20241120131438.png',
    title: 'JAZZ NIGHT',
    subtitle: '爵士之夜，感受律动的魅力',
    date: 'December 2024',
    theme: 'Rhythm & Soul /JAZZ.'
  },
  {
    image: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/微信图片_20241120131438.png',
    title: 'STREET DANCE',
    subtitle: '街舞派对，展现你的态度',
    date: 'January 2025',
    theme: 'Urban Style /HIP-HOP.'
  }
])
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  background-color: #141123f5;
  padding-bottom: 120rpx;
}

.banner-swiper {
  height: 460rpx;
  
  .banner-item {
    position: relative;
    height: 100%;
    
    .banner-image {
      width: 100%;
      height: 100%;
      transition: transform 0.6s ease;
    }
    
    .banner-content {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 40rpx;
      background: linear-gradient(
        to right,
        rgba(20, 17, 35, 0.8) 0%,
        rgba(20, 17, 35, 0.6) 50%,
        rgba(20, 17, 35, 0.4) 100%
      );
      display: flex;
      flex-direction: column;
      justify-content: center;
      
      .title {
        font-size: 48rpx;
        color: #fff;
        font-weight: 600;
        margin-bottom: 16rpx;
        animation: slideRight 0.8s ease-out;
        text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.3);
      }
      
      .subtitle {
        font-size: 28rpx;
        color: rgba(255, 255, 255, 0.9);
        margin-bottom: 30rpx;
        animation: slideRight 0.8s ease-out 0.2s both;
      }
      
      .date {
        font-size: 24rpx;
        color: rgba(255, 255, 255, 0.7);
        font-style: italic;
        margin-bottom: 16rpx;
        animation: fadeIn 0.8s ease-out 0.4s both;
      }
      
      .theme {
        font-size: 32rpx;
        color: #FF4D8F;
        font-weight: 500;
        animation: slideUp 0.8s ease-out 0.6s both;
        text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.2);
      }
    }
    
    &:hover {
      .banner-image {
        transform: scale(1.05);
      }
      
      .banner-content {
        background: linear-gradient(
          to right,
          rgba(20, 17, 35, 0.9) 0%,
          rgba(20, 17, 35, 0.7) 50%,
          rgba(20, 17, 35, 0.5) 100%
        );
      }
    }
  }
}

.tab-header {
  display: flex;
  padding: 30rpx 40rpx;
  border-bottom: 1rpx solid rgba(255, 255, 255, 0.08);
  margin-bottom: 20rpx;

  .tab-item {
    color: rgba(255, 255, 255, 0.6);
    font-size: 32rpx;
    margin-right: 60rpx;
    padding-bottom: 16rpx;
    position: relative;
    transition: all 0.3s ease;

    &.active {
      color: #FF4D8F;
      font-weight: 600;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4rpx;
        background: #FF4D8F;
        border-radius: 4rpx;
        animation: slideIn 0.3s ease;
      }
    }
  }
}

.filter-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 30rpx;
  gap: 12rpx;

  .filter-item {
    flex: 1;
    min-width: 0;
    height: 64rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 16rpx;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 32rpx;
    color: rgba(255, 255, 255, 0.8);
    font-size: 24rpx;
    white-space: nowrap;
    transition: all 0.3s ease;

    &.active {
      background: #FF4D8F;
      color: #fff;
      box-shadow: 0 4rpx 12rpx rgba(255, 77, 143, 0.3);
    }

    &.search {
      flex: 0 0 64rpx;
      padding: 0;

      .icon {
        font-size: 32rpx;
      }
    }

    .icon {
      margin-left: 4rpx;
      font-size: 20rpx;
    }

    &:active {
      transform: scale(0.95);
      opacity: 0.9;
    }
  }
}

.date-scroll {
  position: relative;
  width: 100%;
  white-space: nowrap;
  padding: 20rpx 0;

  .date-list {
    display: inline-flex;
    padding: 0 30rpx;

    .date-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 120rpx;
      height: 120rpx;
      margin-right: 20rpx;
      border-radius: 16rpx;
      background: rgba(255, 255, 255, 0.05);
      transition: all 0.3s ease;

      &.active {
        background: #FF4D8F;
        transform: scale(1.05);
        box-shadow: 0 4rpx 16rpx rgba(255, 77, 143, 0.3);

        .day,
        .date {
          color: #fff;
          font-weight: 600;
        }
      }

      &:active {
        transform: scale(0.95);
      }

      .day {
        font-size: 28rpx;
        color: rgba(255, 255, 255, 0.6);
        margin-bottom: 8rpx;
        transition: all 0.3s ease;
      }

      .date {
        font-size: 32rpx;
        color: rgba(255, 255, 255, 0.8);
        font-weight: 500;
        transition: all 0.3s ease;
      }
    }
  }

  .scroll-hint {
    position: absolute;
    right: 20rpx;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.6);
    border-radius: 30rpx;
    padding: 10rpx 20rpx;
    display: flex;
    align-items: center;
    opacity: 0.8;
    transition: opacity 0.3s ease;

    &.hide {
      opacity: 0;
      pointer-events: none;
    }

    .hint-text {
      font-size: 24rpx;
      color: #fff;
      margin-right: 10rpx;
    }

    .hint-arrow {
      font-size: 28rpx;
      color: #fff;
      animation: arrowMove 1.5s infinite;
    }
  }
}

@keyframes arrowMove {

  0%,
  100% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(6rpx);
  }
}

// 隐藏滚动条
::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  color: transparent;
}
.course-list.recommended {
  padding: 0 30rpx;
  margin-bottom: 40rpx;
  
  .course-image-wrapper {
    position: relative;
    border-radius: 20rpx;
    overflow: hidden;
    animation: fadeInUp 0.6s ease-out;
    
    &:hover {
      .course-image {
        transform: scale(1.05);
      }
      
      .overlay {
        background: rgba(20, 17, 35, 0.5);
      }
      
      .course-info {
        transform: translateY(0);
      }
    }
    
    .course-image {
      width: 100%;
      height: 360rpx;
      transition: transform 0.6s ease;
    }
    
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(20, 17, 35, 0.3);
      transition: background 0.3s ease;
      display: flex;
      align-items: flex-end;
      padding: 30rpx;
    }
    
    .course-info {
      transform: translateY(20rpx);
      transition: transform 0.3s ease;
      
      .course-title {
        display: block;
        color: #fff;
        font-size: 36rpx;
        font-weight: 600;
        margin-bottom: 12rpx;
        text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.3);
      }
      
      .course-desc {
        display: block;
        color: rgba(255, 255, 255, 0.9);
        font-size: 26rpx;
        margin-bottom: 16rpx;
      }
      
      .course-tag {
        display: inline-block;
        background: #FF4D8F;
        color: #fff;
        font-size: 24rpx;
        padding: 6rpx 20rpx;
        border-radius: 100rpx;
        opacity: 0.9;
      }
    }
  }
}

.course-list {
  padding: 30rpx;

  .course-item {
    position: relative;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;
    display: flex;
    justify-content: space-between;

    .course-header {
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;
      flex-direction: column;
      justify-content: center;

      .teacher-avatar {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
      }

      .teacher-name {
        color: #fff;
        font-size: 22rpx;
        margin-top: 10rpx;
      }
    }

    .course-info {
      .title-row {
        display: flex;
        align-items: center;
        margin-bottom: 10rpx;

        .course-title {
          color: #fff;
          font-size: 32rpx;
          margin-right: 10rpx;
        }

        .stars {
          color: #FFD700;
        }
      }

      .course-count,
      .course-time,
      .course-location {
        display: block;
        color: rgba(255, 255, 255, 0.6);
        font-size: 24rpx;
        margin-top: 8rpx;
      }
    }

    .course-status {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-top: 20rpx;
      gap: 12rpx;

      .remaining {
        .text {
          display: inline-block;
          color: #2DD4BF;
          font-size: 24rpx;
          background: rgba(45, 212, 191, 0.1);
          padding: 8rpx 20rpx;
          border-radius: 100rpx;
        }
      }

      .action-btn {
        min-width: 120rpx;
        height: 56rpx;
        line-height: 56rpx;
        padding: 0 30rpx;
        border-radius: 100rpx;
        font-size: 26rpx;
        text-align: center;

        &.btn-book {
          background: #FF4D8F;
          color: #fff;
        }

        &.btn-full {
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.6);
        }

        &.btn-tight {
          background: #FF4D8F;
          color: #fff;
          opacity: 0.8;
        }
      }
    }

    .favorite-btn {
      position: absolute;
      top: 30rpx;
      right: 30rpx;
      width: 48rpx;
      height: 48rpx;
      display: flex;
      align-items: center;
      justify-content: center;

      .icon {
        font-size: 40rpx;
        color: rgba(255, 255, 255, 0.6);

        &.active {
          color: #FF4D8F;
        }
      }
    }
  }
}

// 添加动画关键帧
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideRight {
  from {
    opacity: 0;
    transform: translateX(-20rpx);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

// 应用动画类
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-slide-down {
  animation: slideDown 0.6s ease-out forwards;
}

.animate-slide-right {
  animation: slideRight 0.6s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.6s ease-out forwards;
  opacity: 0;
  animation-fill-mode: forwards;
}

// 修改现有样式
.course-list {
  .course-item {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
      transform: translateY(-2rpx);
      box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.1);
      
      .teacher-avatar {
        transform: scale(1.05);
      }
      
      .course-title {
        color: #FF4D8F;
      }
    }
    
    .course-header {
      .teacher-avatar {
        transition: transform 0.3s ease;
      }
      
      .teacher-name {
        transition: color 0.3s ease;
      }
    }
    
    .action-btn {
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-2rpx);
        filter: brightness(1.1);
      }
      
      &:active {
        transform: scale(0.95);
      }
    }
    
    .favorite-btn {
      .icon {
        transition: all 0.3s ease;
        
        &:hover {
          transform: scale(1.1);
          color: rgba(255, 77, 143, 0.8);
        }
        
        &:active {
          transform: scale(0.9);
        }
      }
    }
  }
}

.filter-item {
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  &.active {
    animation: pulse 1s ease infinite;
  }
}

.date-item {
  &:hover:not(.active) {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2rpx);
  }
  
  &.active {
    animation: pulse 2s ease infinite;
  }
}

.banner-swiper {
  .banner-item {
    .title {
      animation: slideRight 0.8s ease-out;
    }
    
    .subtitle {
      animation: slideRight 0.8s ease-out 0.2s both;
    }
    
    .date {
      animation: fadeIn 0.8s ease-out 0.4s both;
    }
    
    .theme {
      animation: slideUp 0.8s ease-out 0.6s both;
    }
  }
}

</style>