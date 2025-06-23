<template>
  <view class="container">
    <!-- 返回按钮 -->
    <view class="back-btn" @tap="goBack">
      <text class="icon">←</text>
    </view>
    
    <!-- 视频展示区 -->
    <view class="video-section">
      <video 
        class="video-player"
        :src="teacherInfo.videoUrl"
        poster="/static/images/video-poster.jpg"
        object-fit="cover"
      ></video>
    </view>
    
    <!-- 导师信息 -->
    <view class="teacher-info">
      <view class="avatar-row">
        <image class="avatar" :src="teacherInfo.avatar" mode="aspectFill"></image>
        <view class="info-right">
          <text class="name">{{ teacherInfo.name }}</text>
          <text class="title">{{ teacherInfo.title }}</text>
        </view>
        <view class="favorite-btn" @tap="toggleFavorite">
          <text class="icon" :class="{ active: isFavorite }">♥</text>
        </view>
      </view>
    </view>
    
    <!-- 底部按钮 -->
    <view class="bottom-btn" @tap="goToCourse">
      <text>去上Ta的课</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const teacherInfo = ref({
  name: 'APHRODITE',
  title: '明星导师',
  avatar: 'https://iknow-pic.cdn.bcebos.com/2fdda3cc7cd98d10322c0cb1333fb80e7aec90b1',
  videoUrl: 'https://iknow-pic.cdn.bcebos.com/2fdda3cc7cd98d10322c0cb1333fb80e7aec90b1'
})

const isFavorite = ref(false)

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}

const goBack = () => {
  uni.navigateBack()
}

const goToCourse = () => {
  uni.navigateTo({
    url: '/pages/dance/course/index'
  })
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  background-color: #1C1B21;
  position: relative;
}

.back-btn {
  position: fixed;
  top: 60rpx;
  left: 30rpx;
  z-index: 100;
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .icon {
    color: #fff;
    font-size: 40rpx;
  }
}

.video-section {
  width: 100%;
  height: 80vh;
  
  .video-player {
    width: 100%;
    height: 100%;
    background: #000;
  }
}

.teacher-info {
  padding: 30rpx;
  
  .avatar-row {
    display: flex;
    align-items: center;
    position: relative;
    
    .avatar {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      margin-right: 20rpx;
    }
    
    .info-right {
      flex: 1;
      
      .name {
        color: #fff;
        font-size: 36rpx;
        font-weight: 600;
        display: block;
      }
      
      .title {
        color: rgba(255,255,255,0.6);
        font-size: 28rpx;
        margin-top: 8rpx;
      }
    }
    
    .favorite-btn {
      padding: 20rpx;
      
      .icon {
        color: rgba(255,255,255,0.6);
        font-size: 40rpx;
        
        &.active {
          color: #FF4D8F;
        }
      }
    }
  }
}

.bottom-btn {
  position: fixed;
  bottom: 40rpx;
  left: 40rpx;
  right: 40rpx;
  height: 88rpx;
  background: #FF4D8F;
  border-radius: 100rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 32rpx;
}
</style>
