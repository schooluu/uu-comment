<template>
  <view class="container">
    <!-- 顶部轮播 -->
    <swiper class="banner-swiper" circular autoplay interval="3000" duration="500">
      <swiper-item v-for="(item, index) in banners" :key="index">
        <view class="banner-item">
          <text class="title">DOPAMINE</text>
          <text class="subtitle">/万圣开篇，酷炫装扮等你来COS</text>
          <text class="date">'November 2024</text>
          <text class="theme">Passionate Freedom /AFRO.</text>
        </view>
      </swiper-item>
    </swiper>

    <!-- 标签切换 -->
    <view class="tab-header">
      <text class="tab-item active">常规课</text>
      <text class="tab-item">活动赛事</text>
    </view>

    <!-- 筛选条件 -->
    <view class="filter-section">
      <view class="filter-item">
        门店 <text class="icon">∨</text>
      </view>
      <view class="filter-item">
        时段 <text class="icon">∨</text>
      </view>
      <view class="filter-item">
        风格 <text class="icon">∨</text>
      </view>
      <view class="filter-item">
        导师 <text class="icon">∨</text>
      </view>
      <view class="filter-item active">0基础</view>
      <view class="filter-item search">
        <text class="icon">🔍</text>
      </view>
    </view>

    <!-- 日期选择 -->
    <scroll-view class="date-scroll" scroll-x>
      <view class="date-list">
        <view class="date-item" v-for="(item, index) in dates" :key="index"
              :class="{ active: index === 0 }">
          <text class="day">{{ item.day }}</text>
          <text class="date">{{ item.date }}</text>
        </view>
      </view>
    </scroll-view>

    <!-- 课程列表 -->
    <view class="course-list">
      <view class="course-item" v-for="(item, index) in courses" :key="index">
        <image class="teacher-avatar" :src="item.avatar"></image>
        <view class="course-info">
          <view class="course-title">
            {{ item.title }}
            <text class="stars">⭐️".repeat(item.level)</text>
          </view>
          <view class="course-detail">{{ item.count }}课次</view>
          <view class="course-time">{{ item.time }}</view>
          <view class="course-location">{{ item.location }}</view>
        </view>
        <view class="action-btn" :class="{ 'btn-primary': item.canBook }">
          {{ item.canBook ? '预约' : '停课' }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

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
    avatar: '/static/images/teacher1.jpg',
    title: 'MV DANCE',
    level: 1,
    count: '1',
    time: '2024.11.19 周二 12:15~13:15',
    location: 'FancyFancy舞室大悦城店 A教室',
    canBook: false
  },
  {
    avatar: '/static/images/teacher2.jpg',
    title: 'JAZZ',
    level: 3,
    count: '1',
    time: '2024.11.19 周二 18:00~19:00',
    location: 'FancyFancy舞室大悦城店 上空',
    canBook: true
  }
])
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  background-color: #1C1B21;
}

.banner-swiper {
  height: 300rpx;
  background: linear-gradient(to right, #8A2BE2, #9370DB);
  
  .banner-item {
    padding: 40rpx;
    color: #fff;
    
    .title {
      font-size: 48rpx;
      font-weight: bold;
    }
    
    .subtitle {
      font-size: 28rpx;
      opacity: 0.8;
    }
    
    .date, .theme {
      display: block;
      margin-top: 20rpx;
      font-size: 32rpx;
    }
  }
}

.tab-header {
  display: flex;
  padding: 20rpx 30rpx;
  border-bottom: 1rpx solid rgba(255,255,255,0.1);
  
  .tab-item {
    color: #fff;
    margin-right: 40rpx;
    padding-bottom: 10rpx;
    
    &.active {
      color: #FF4D8F;
      border-bottom: 4rpx solid #FF4D8F;
    }
  }
}

.filter-section {
  display: flex;
  padding: 20rpx;
  gap: 20rpx;
  
  .filter-item {
    padding: 10rpx 20rpx;
    background: rgba(255,255,255,0.1);
    border-radius: 100rpx;
    color: #fff;
    font-size: 26rpx;
    
    &.active {
      background: #FF4D8F;
    }
    
    .icon {
      margin-left: 4rpx;
    }
  }
}

.date-scroll {
  white-space: nowrap;
  padding: 20rpx;
  
  .date-list {
    display: inline-flex;
    gap: 30rpx;
    
    .date-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: rgba(255,255,255,0.6);
      
      &.active {
        color: #FF4D8F;
      }
      
      .day {
        font-size: 28rpx;
      }
      
      .date {
        font-size: 24rpx;
        margin-top: 4rpx;
      }
    }
  }
}

.course-list {
  padding: 20rpx;
  
  .course-item {
    display: flex;
    align-items: center;
    padding: 20rpx;
    background: rgba(255,255,255,0.05);
    border-radius: 16rpx;
    margin-bottom: 20rpx;
    
    .teacher-avatar {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
      margin-right: 20rpx;
    }
    
    .course-info {
      flex: 1;
      color: #fff;
      
      .course-title {
        font-size: 32rpx;
        margin-bottom: 8rpx;
      }
      
      .course-detail, .course-time, .course-location {
        font-size: 24rpx;
        color: rgba(255,255,255,0.6);
        margin-top: 4rpx;
      }
    }
    
    .action-btn {
      padding: 10rpx 30rpx;
      border-radius: 100rpx;
      font-size: 26rpx;
      background: rgba(255,255,255,0.1);
      color: #fff;
      
      &.btn-primary {
        background: #FF4D8F;
      }
    }
  }
}
</style> 