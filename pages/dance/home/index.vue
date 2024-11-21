<template>
  <view class="container">
    <view class="content">
      <!-- Logo轮播区域 -->
      <view class="swiper-section">
        <swiper 
          class="swiper" 
          circular 
          autoplay 
          interval="3000" 
          duration="500"
          @change="handleSwiperChange"
          :indicator-dots="false"
        >
          <swiper-item 
            v-for="(item, index) in banners" 
            :key="index"
            class="swiper-item"
          >
            <image 
              class="banner-image" 
              :src="item" 
              mode="aspectFill"
              :class="{ 'active': currentSwiper === index }"
            ></image>
            <view class="gradient-overlay"></view>
          </swiper-item>
        </swiper>
        
        <view class="swiper-dots">
          <view 
            v-for="(item, index) in banners" 
            :key="index" 
            class="dot" 
            :class="{ active: currentSwiper === index }"
            @tap="handleDotClick(index)"
          >
            <view class="dot-progress" v-if="currentSwiper === index"></view>
          </view>
        </view>
      </view>

      <!-- 导航菜单 -->
      <view class="nav-menu">
        <view 
          class="nav-item" 
          v-for="(item, index) in navItems" 
          :key="index" 
          @tap="navigateTo(item.path)"
        >
          <view class="nav-text">
            <text class="name">{{ item.name }}</text>
            <text class="en-name">{{ item.enName }}</text>
          </view>
          <view class="hover-effect"></view>
        </view>
      </view>

      <!-- 热门视频区域 -->
      <view class="section-title">
        <text>热门视频</text>
        <text class="more-btn" @tap="goToVideoList">更多视频</text>
      </view>
      <view class="video-card">
        <image class="video-cover" src="https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/微信图片_20241120114522.png" mode="aspectFill"></image>
        <view class="play-icon"></view>
      </view>

      <!-- 推荐课程区域 -->
      <view class="section-title">
        <text>推荐课程</text>
        <text class="more-btn" @tap="goToCourseList">更多课程</text>
      </view>
      <view class="course-list recommended">
        <view class="course-image-wrapper">
          <image 
            class="course-image" 
            src="https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/微信图片_20241120114537.png" 
            mode="aspectFill"
          ></image>
          <view class="overlay">
            <view class="course-info">
              <text class="course-title">精品推荐课程</text>
              <text class="course-desc">专业教师一对一指导</text>
              <view class="course-tag">HOT</view>
            </view>
          </view>
        </view>
      </view>

      <!-- 日期选择 -->
      <scroll-view 
        class="date-scroll" 
        scroll-x 
        show-scrollbar="false"
        enhanced
        :scroll-with-animation="true"
        :scroll-left="scrollLeft"
        @scroll="onScroll"
        @touchstart="hideScrollHint"
      >
        <view class="date-list">
          <view 
            class="date-item" 
            v-for="(item, index) in dates" 
            :key="index" 
            :class="{ active: currentIndex === index }"
            @tap="handleDateTap(index)"
          >
            <text class="day">{{ item.day }}</text>
            <text class="date">{{ item.date }}</text>
          </view>
        </view>
        
        <view class="scroll-hint" :class="{ 'hide': hideHint }">
          <text class="hint-text">左右滑动查看更多</text>
          <text class="hint-arrow">›</text>
        </view>
      </scroll-view>

      <!-- 课程列表 -->
      <view class="course-list">
        <view class="course-item" v-for="(course, index) in courses" :key="index">
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

      <!-- 推荐场馆 -->
      <view class="section-title">
        <text>推荐场馆</text>
        <text class="more-btn" @tap="goToVenueList">更多场馆</text>
      </view>
      <view class="venue-list">
        <view class="venue-item" v-for="(venue, index) in venues" @tap="goToVenueDetail(venue.id)" :key="index">
          <image class="venue-image" :src="venue.image" mode="aspectFill"></image>
          <view class="venue-info">
            <text class="venue-name">{{ venue.name }}</text>
            <text class="venue-address">{{ venue.address }}</text>
          </view>
          <view class="favorite-btn">
            <icon type="heart-o" size="40"></icon>
          </view>
        </view>
      </view>

      <!-- 热门导师 -->
      <view class="section-title">
        <text>热门导师</text>
        <text class="more-btn" @tap="goToTeacherList">更多导师</text>
      </view>
      <view class="teacher-grid">
        <view class="teacher-item" 
          v-for="(teacher, index) in teachers" 
          :key="index"
          @tap="goToTeacherDetail(teacher)"
          :style="{ animationDelay: index * 0.05 + 's' }"
        >
          <image class="teacher-avatar" :src="teacher.avatar" mode="aspectFill"></image>
          <text class="teacher-name">{{ teacher.name }}</text>
          <text class="teacher-style">{{ teacher.style }}</text>
        </view>
      </view>
    </view>

    <tab-bar :current="currentPath" />
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import NavBar from '@/components/dance/nav-bar.vue'
import TabBar from '@/components/dance/tab-bar.vue'

const currentSwiper = ref(0)
const banners = ref([
  'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/微信图片_20241120114522.png',
  'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/微信图片_20241120114522.png',
  'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/微信图片_20241120114537.png'
])

const navItems = ref([
  {
    name: '门店',
    enName: 'STORE',
    path: ''
  },
  {
    name: '导师',
    enName: 'PRIVATE',
    path: '/pages/dance/teacher/teacher'
  },
  {
    name: '视频',
    enName: 'ACTIVITY',
    path: '/pages/dance/home/video'
  },
  {
    name: '新人',
    enName: 'ACTIVITY',
    path: '/pages/dance/home/ad'
  }
])

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
    teacherName: 'XX',
    avatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/aa57670d0d25d0c6f02772495e6cd5d3.png',
    title: 'JAZZ',
    level: 3,
    count: '1',
    time: '2024.11.19 周二 18:00~19:00',
    location: 'XXXX舞室大悦城店 上空',
    status: 'book'
  },
  {
    teacherName: 'XX',
    avatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/aa57670d0d25d0c6f02772495e6cd5d3.png',
    title: 'JAZZ 身体开发',
    level: 1,
    count: '1',
    time: '2024.11.19 周二 18:00~19:00',
    location: 'XXXX舞室大悦城店 B教室',
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
    location: 'XXXX舞室大悦城店 A教室',
    status: 'full'
  },
  {
    teacherName: 'Lynn',
    avatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png',
    title: 'JAZZ',
    level: 3,
    count: '1',
    time: '2024.11.19 周二 19:10~20:10',
    location: 'XXXX舞室大悦店 上空',
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
    location: 'XXXX舞室大悦城店 B教室',
    status: 'tight',
    remaining: 2
  }
])

// 添加场馆数据
const venues = ref([
  {
    name: 'XXXX舞室大悦城店',
    address: 'XXXXXXXXXXXXX',
    image: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/aa57670d0d25d0c6f02772495e6cd5d3.png'
  },
  {
    name: 'XXXX舞室嘉里合集店',
    address: 'XXXXXXXX室',
    image: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/aa57670d0d25d0c6f02772495e6cd5d3.png'
  }
])

// 添加导师数据
const teachers = ref([
  { 
    id: 1,
    name: 'Joho', 
    avatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png',
    style: 'Jazz'
  },
  { 
    id: 2,
    name: 'FEI', 
    avatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png',
    style: 'Hip-hop'
  },
  { 
    id: 3,
    name: 'XX', 
    avatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png',
    style: 'Urban'
  },
  { 
    id: 4,
    name: 'XX', 
    avatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png',
    style: 'Popping'
  },
  { 
    id: 5,
    name: 'XX', 
    avatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png',
    style: 'Swing'
  },
  { 
    id: 6,
    name: 'XX', 
    avatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png',
    style: 'Ballet'
  },
  { 
    id: 7,
    name: 'XX', 
    avatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png',
    style: 'Contemporary'
  },
  { 
    id: 8,
    name: 'XX', 
    avatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png',
    style: 'K-pop'
  },
  { 
    id: 9,
    name: 'XX', 
    avatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png',
    style: 'Latin'
  },
  { 
    id: 10,
    name: 'BADA', 
    avatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png',
    style: 'Street'
  }
])

const currentIndex = ref(0)
const scrollLeft = ref(0)
const hideHint = ref(false)
const itemWidth = 140 // 每个日期项的宽度（包含margin）
const scrollViewWidth = ref(0)

// 处理日期点击
const handleDateTap = (index) => {
  hideHint.value = true // 点击时隐藏提示
  selectDate(index)
}

// 隐藏滑动提示
const hideScrollHint = () => {
  hideHint.value = true
}

// 监听滚动
const onScroll = (e) => {
  // 滚动时隐藏提示
  if (!hideHint.value && e.detail.scrollLeft > 0) {
    hideHint.value = true
  }
}

// 选择日期
const selectDate = (index) => {
  currentIndex.value = index
  const newScrollLeft = calculateScrollPosition(index)
  scrollLeft.value = newScrollLeft
}

// 计算滚动位置
const calculateScrollPosition = (index) => {
  const scrollWidth = scrollViewWidth.value || uni.getSystemInfoSync().windowWidth
  const itemPosition = index * itemWidth
  const centerPosition = itemPosition - (scrollWidth - itemWidth) / 2
  return Math.max(0, centerPosition)
}

// 初始化滚动容器宽度
onMounted(() => {
  const query = uni.createSelectorQuery()
  query.select('.date-scroll').boundingClientRect(data => {
    scrollViewWidth.value = data.width
  }).exec()
})

const getCourseStatusText = (status) => {
  const statusMap = {
    'book': '预约',
    'full': '爆满',
    'tight': '紧张'
  }
  return statusMap[status] || status
}

const handleCourse = (course) => {
  if (course.status === 'book') {
    uni.showToast({
      title: '预约成功',
      icon: 'success'
    })
  }
}

const toggleFavorite = (course) => {
  course.isFavorite = !course.isFavorite
}

const navigateTo = (path) => {
  if (path) {
    uni.navigateTo({
      url: path
    })
  }
}

// 视频区域点击
const goToTeacherList = () => {
  uni.navigateTo({
    url: '/pages/dance/teacher/teacher'
  })
}

// 课程区域点击
const goToVenueList = () => {
  uni.navigateTo({
   url: `/pages/dance/home/venueList`
  })
}

// 场馆点击
const goToVenueDetail = (venueId) => {
  uni.navigateTo({
    url: `/pages/dance/home/venueDetail?id=${venueId}`
  })
}
const currentPath = computed(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  return `/${currentPage.route}`
})

// 跳转到视频列表页面
const goToVideoList = () => {
  uni.navigateTo({
    url: '/pages/dance/home/video',
    success: () => {
      console.log('跳转成功')
    },
    fail: (error) => {
      console.error('跳转失败:', error)
      uni.showToast({
        title: '页面跳转失败',
        icon: 'none'
      })
    }
  })
}

// 跳转到课程列表页面
const goToCourseList = () => {
  uni.navigateTo({
    url: '/pages/dance/course/index',
    success: () => {
      console.log('跳转成功')
    },
    fail: (error) => {
      console.error('跳转失败:', error)
      uni.showToast({
        title: '页面跳转失败',
        icon: 'none'
      })
    }
  })
}

// 添加滚动显示逻辑
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show')
      }
    })
  }, {
    threshold: 0.1
  })

  const teacherGrid = document.querySelector('.teacher-grid')
  if (teacherGrid) {
    observer.observe(teacherGrid)
  }
})

const handleSwiperChange = (e) => {
  currentSwiper.value = e.detail.current
}

const handleDotClick = (index) => {
  currentSwiper.value = index
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  background-color: #141123f5;
  padding-bottom: 100rpx;

  .share-icon {
    color: #fff;
    font-size: 32rpx;
  }
}

.swiper-section {
  position: relative;
  height: 500rpx;
  overflow: hidden;
  border-radius: 0 0 30rpx 30rpx;
  animation: fadeInDown 0.8s ease-out;
  
  .swiper {
    height: 100%;
    
    .swiper-item {
      position: relative;
      overflow: hidden;
      
      .banner-image {
        width: 100%;
        height: 100%;
        transition: all 0.6s ease;
        transform: scale(1.1);
        
        &.active {
          transform: scale(1);
        }
      }
      
      .gradient-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 150rpx;
        background: linear-gradient(to bottom, transparent, rgba(20, 17, 35, 0.6));
        pointer-events: none;
      }
    }
  }
  
  .swiper-dots {
    position: absolute;
    bottom: 30rpx;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 16rpx;
    z-index: 1;
    
    .dot {
      width: 40rpx;
      height: 6rpx;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 4rpx;
      transition: all 0.3s ease;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      
      &.active {
        width: 60rpx;
        background: #FF4D8F;
        
        .dot-progress {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background: rgba(255, 255, 255, 0.3);
          animation: progressAnimation 3s linear;
        }
      }
      
      &:hover {
        background: rgba(255, 255, 255, 0.5);
      }
    }
  }
}

@keyframes progressAnimation {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.nav-menu {
  display: flex;
  justify-content: space-around;
  padding: 40rpx 20rpx;
  position: relative;
  z-index: 1;
  
  .nav-item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24rpx 36rpx;
    border-radius: 16rpx;
    background: rgba(255, 255, 255, 0.05);
    animation: slideInRight 0.5s ease-out;
    animation-fill-mode: both;
    transition: all 0.3s ease;
    
    @for $i from 1 through 4 {
      &:nth-child(#{$i}) {
        animation-delay: #{$i * 0.1}s;
      }
    }
    
    &:active {
      transform: scale(0.95);
    }
    
    .nav-text {
      display: flex;
      flex-direction: column;
      align-items: center;
      
      .name {
        font-size: 32rpx;
        color: #fff;
        font-weight: 500;
        margin-bottom: 8rpx;
        transition: all 0.3s ease;
      }
      
      .en-name {
        font-size: 22rpx;
        color: rgba(255, 255, 255, 0.6);
        text-transform: uppercase;
        letter-spacing: 1rpx;
        transition: all 0.3s ease;
      }
    }
    
    .hover-effect {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%) scaleX(0);
      width: 60%;
      height: 4rpx;
      background: #FF4D8F;
      border-radius: 2rpx;
      transition: transform 0.3s ease;
    }
    &:nth-child(1){
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-2rpx);
      
      .nav-text {
        .name {
          color: #FF4D8F;
          transform: translateY(-2rpx);
        }
        
        .en-name {
          color: rgba(255, 77, 143, 0.8);
        }
      }
      
      .hover-effect {
        transform: translateX(-50%) scaleX(1);
      }
    }

    &:nth-child(1)::after{
      opacity: 1;
    }
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 16rpx;
      background: radial-gradient(circle at center, rgba(255, 77, 143, 0.1) 0%, transparent 70%);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30rpx);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  color: #fff;



  .more-btn {
    font-size: 26rpx;
    color: rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.1);
    padding: 8rpx 20rpx;
    border-radius: 100rpx;
    // 添加点击效果
    &:active {
      opacity: 0.8;
    }
  }
}

.video-card {
  position: relative;
  margin: 0 30rpx;
  border-radius: 20rpx;
  overflow: hidden;
  animation: slideInLeft 0.8s ease-out;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);

    .play-icon {
      transform: translate(-50%, -50%) scale(1.1);
      background: rgba(255, 77, 143, 0.7);
    }
  }

  .video-cover {
    width: 100%;
    height: 400rpx;
  }

  .play-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80rpx;
    height: 80rpx;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    transition: all 0.3s ease;
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 55%;
      transform: translate(-50%, -50%);
      border-left: 20rpx solid #fff;
      border-top: 15rpx solid transparent;
      border-bottom: 15rpx solid transparent;
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

.date-scroll {
  position: relative;
  width: 100%;
  white-space: nowrap;
  padding: 20rpx 0;
  background-color: #141123f5;
  
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
      position: relative; // 为了定位可能的小圆点
      
      &.active {
        background: #FF4D8F;
        transform: scale(1.05);
        box-shadow: 0 4rpx 16rpx rgba(255, 77, 143, 0.3);
        
        .day, .date {
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
      
      // 如果需要保留小圆点
      .dot {
        position: absolute;
        bottom: 10rpx;
        width: 8rpx;
        height: 8rpx;
        background: #FF4D8F;
        border-radius: 50%;
      }
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
    transition: all 0.3s ease;
    z-index: 10;
    
    &.hide {
      opacity: 0;
      pointer-events: none;
      transform: translateY(-50%) translateX(20rpx);
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
.venue-list {
  padding: 0 30rpx;

  .venue-item {
    position: relative;
    margin-bottom: 30rpx;
    border-radius: 20rpx;
    overflow: hidden;

    .venue-image {
      width: 100%;
      height: 300rpx;
      filter: brightness(0.7);
    }

    .venue-info {
      position: absolute;
      bottom: 30rpx;
      left: 30rpx;
      right: 30rpx;

      .venue-name {
        display: block;
        color: #fff;
        font-size: 36rpx;
        font-weight: 600;
        margin-bottom: 8rpx;
      }

      .venue-address {
        color: rgba(255, 255, 255, 0.8);
        font-size: 24rpx;
      }
    }

    .favorite-btn {
      position: absolute;
      top: 30rpx;
      right: 30rpx;
      color: #fff;
    }
  }
}

@keyframes arrowMove {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(6rpx);
  }
}

@keyframes fadeInUp {
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

.teacher-grid {
  width: 710rpx;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: auto;
  .teacher-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10rpx;
    border-radius: 12rpx;
    animation: fadeInUp 0.5s ease forwards;
    opacity: 0;
    
    &:active {
      .teacher-avatar {
        transform: scale(0.95);
      }
    }

    .teacher-avatar {
      width: 140rpx;
      height: 140rpx;
      border-radius: 50%;
      margin-bottom: 12rpx;
      border: 2rpx solid rgba(255, 77, 143, 0.3);
      transition: transform 0.2s ease;
      animation: pulse 2s ease-out infinite;
    }

    .teacher-name {
      color: #fff;
      font-size: 26rpx;
      margin-bottom: 4rpx;
      width: 100%;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: color 0.3s ease;
      
      &:hover {
        color: #FF4D8F;
      }
    }
    
    .teacher-style {
      color: rgba(255, 255, 255, 0.6);
      font-size: 22rpx;
      width: 100%;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: opacity 0.3s ease;
    }
    
    &:hover {
      .teacher-style {
        opacity: 1;
      }
    }
  }
}

// 添加滚动显示动画
.teacher-grid {
  &.show {
    .teacher-item {
      animation: fadeInUp 0.5s ease forwards;
    }
  }
}

// 添加新的动画关键帧
@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fadeInDown {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
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

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>