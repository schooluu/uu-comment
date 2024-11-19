<template>
  <view class="container">
    <!-- Logo轮播区域 -->
    <view class="swiper-section">
      <swiper class="swiper" circular autoplay interval="3000" duration="500">
        <swiper-item v-for="(item, index) in banners" :key="index">
          <image class="banner-image" :src="item" mode="aspectFill"></image>
        </swiper-item>
      </swiper>
      <view class="swiper-dots">
        <view v-for="(item, index) in banners" :key="index" 
              class="dot" :class="{ active: currentSwiper === index }"></view>
      </view>
    </view>

    <!-- 导航菜单 -->
    <view class="nav-menu">
      <view class="nav-item" v-for="(item, index) in navItems" :key="index">
        <text>{{ item.name }}</text>
        <text class="en-text">{{ item.enName }}</text>
      </view>
    </view>

    <!-- 热门视频区域 -->
    <view class="section-title">
      <text>热门视频</text>
      <text class="more-btn">更多视频</text>
    </view>
    <view class="video-card">
      <image class="video-cover" src="/static/images/video-cover.jpg" mode="aspectFill"></image>
      <view class="play-icon"></view>
    </view>

    <!-- 推荐课程区域 -->
    <view class="section-title">
      <text>推荐课程</text>
      <text class="more-btn">更多课程</text>
    </view>
    <view class="course-list">
      <image class="course-image" src="/static/images/course-cover.jpg" mode="aspectFill"></image>
    </view>

    <!-- 底部导航栏 -->
    <view class="tab-bar">
      <view class="tab-item active">
        <text class="icon">首页</text>
        <text class="label">首页</text>
      </view>
      <view class="tab-item">
        <text class="icon">课程</text>
        <text class="label">课程</text>
      </view>
      <view class="tab-item">
        <text class="icon">我的</text>
        <text class="label">我的</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const currentSwiper = ref(0)
const banners = ref([
  '/static/images/banner1.jpg',
  '/static/images/banner2.jpg',
  '/static/images/banner3.jpg'
])

const navItems = ref([
  { name: '门店', enName: 'STORE' },
  { name: '导师', enName: 'DANCER' },
  { name: '视频', enName: 'VIDEO' },
  { name: '新人', enName: 'FRESHMEN' }
])
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  background-color: #1C1B21;
  padding-bottom: 100rpx;
}

.swiper-section {
  position: relative;
  height: 400rpx;
  
  .swiper {
    height: 100%;
    
    .banner-image {
      width: 100%;
      height: 100%;
    }
  }
  
  .swiper-dots {
    position: absolute;
    bottom: 20rpx;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    gap: 12rpx;
    
    .dot {
      width: 12rpx;
      height: 12rpx;
      border-radius: 50%;
      background: rgba(255,255,255,0.5);
      
      &.active {
        background: #FF4D8F;
      }
    }
  }
}

.nav-menu {
  display: flex;
  justify-content: space-around;
  padding: 30rpx;
  
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    
    text {
      font-size: 28rpx;
    }
    
    .en-text {
      font-size: 24rpx;
      color: rgba(255,255,255,0.6);
      margin-top: 4rpx;
    }
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
    color: rgba(255,255,255,0.6);
    background: rgba(255,255,255,0.1);
    padding: 8rpx 20rpx;
    border-radius: 100rpx;
  }
}

.video-card {
  position: relative;
  margin: 0 30rpx;
  border-radius: 20rpx;
  overflow: hidden;
  
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
    background: rgba(0,0,0,0.5);
    border-radius: 50%;
  }
}

.course-list {
  margin: 0 30rpx;
  
  .course-image {
    width: 100%;
    height: 300rpx;
    border-radius: 20rpx;
  }
}

.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  background: #272630;
  display: flex;
  justify-content: space-around;
  align-items: center;
  
  .tab-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: rgba(255,255,255,0.5);
    
    &.active {
      color: #FF4D8F;
    }
    
    .icon {
      font-size: 40rpx;
      margin-bottom: 4rpx;
    }
    
    .label {
      font-size: 20rpx;
    }
  }
}
</style> 