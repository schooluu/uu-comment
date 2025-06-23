<template>
  <view class="container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar animate-fade-in">
      <view class="back-btn ripple" @tap="handleBack">
        <text class="iconfont">←</text>
      </view>
      <text class="title">视频详情</text>
    </view>

    <!-- 关于我们 -->
    <view class="about-card animate-slide-down">
      <view class="header">
        <image class="logo pulse" src="https://iknow-pic.cdn.bcebos.com/2fdda3cc7cd98d10322c0cb1333fb80e7aec90b1" mode="aspectFit"></image>
        <text class="title">关于FancyFancy</text>
        <text class="expand-btn" @tap="toggleExpand">
          {{ isExpanded ? '收起' : '展开' }}
          <text class="arrow" :class="{ 'is-expanded': isExpanded }">›</text>
        </text>
      </view>
      <text class="description" :class="{ 'is-expanded': isExpanded }">
        勿忙焦虑的工作，单调无趣的生活，让我们活得像傀儡一般。在这个充满个性，追求自我的大时代里，我们更需要找到属于自己的节奏，在舞蹈中释放压力，在音乐中找寻自我。FancyFancy，不仅是一个舞蹈工作室，更是一个让你找到归属感的温暖港湾。
      </text>
    </view>

    <!-- 筛选器 -->
    <view class="filter-section animate-slide-right">
      <view class="filter-clear" @tap="handleClear">
        <text class="clear-text">清空</text>
      </view>
      
      <view class="filter-btn" @tap="toggleFilter">
        <text class="filter-text">筛选</text>
        <view class="filter-icon" :class="{ 'is-active': isFilterActive }">
          <text class="icon">⚟</text>
        </view>
      </view>
    </view>

    <!-- 视频列表 -->
    <view class="video-list animate-fade-up">
      <view 
        class="video-item animate-fade-up" 
        v-for="(video, index) in videos" 
        :key="video.id"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <view class="video-wrapper">
          <view class="video-card">
            <video 
              class="video-player"
              :src="video.url"
              :poster="video.poster"
              object-fit="cover"
              :show-play-btn="true"
              :enable-progress-gesture="true"
              :show-center-play-btn="true"
              @tap="handleVideoTap(video)"
            ></video>
            <view class="video-overlay">
              <view class="video-stats">
                <view class="stat-item">
                  <text class="icon">👁️</text>
                  <text class="count">{{ video.views }}</text>
                </view>
                <view class="stat-item">
                  <text class="icon">❤️</text>
                  <text class="count">{{ video.likes }}</text>
                </view>
              </view>
              <view class="video-duration">{{ formatDuration(video.duration) }}</view>
            </view>
          </view>
          
          <view class="video-info">
            <text class="title">{{ video.title }}</text>
            <view class="tags">
              <text 
                class="tag" 
                v-for="tag in video.tags" 
                :key="tag"
                @tap="handleTagTap(tag)"
              ># {{ tag }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const videos = ref([
  {
    id: 1,
    title: '饭团 - 舞娘',
    url: 'https://www.bilibili.com/video/BV1SvSEYvE7U?t=11.9',
    poster: 'https://qcloud.dpfile.com/pc/mhn9S5lPNsMBwyDy4IQ0iv5qiyqequ3mZ67rh4ZcdkCWuNpRCk5lQzhHOkJFKAf8.jpg',
    tags: ['JAZZ', 'FancyFancy舞室金鹰店', 'KIER饭团']
  },
  {
    id: 2,
    title: '金金 - Mirrors',
    url: '/static/videos/dance2.mp4',
    poster: 'https://qcloud.dpfile.com/pc/Tc9Vqj9bruQKwORJcL7_EeTjh35o2640h8Sqls9HUkruTEUwe6AXdZIGa6qWVvsc.jpg',
    tags: ['现代舞', 'FancyFancy舞室金鹰店']
  },
  {
    id: 1,
    title: '饭团 - 舞娘',
    url: '/static/videos/dance1.mp4',
    poster: 'https://qcloud.dpfile.com/pc/hW3D6Eg1UIB7fz8kvtNVTo1iqxT4LNEIjzkpB-wW6RD1JqNcWwFU-9phykgJcvQC.jpg',
    tags: ['JAZZ', 'FancyFancy舞室金鹰店', 'KIER饭团']
  },
  {
    id: 2,
    title: '金金 - Mirrors',
    url: '/static/videos/dance2.mp4',
    poster: 'https://qcloud.dpfile.com/pc/s6tJIKnf46riziVlB5nHBCjJfAWAGJWDO90BTJVXbK5uNATpsHqI-QSz8IMrusCh.jpg',
    tags: ['现代舞', 'FancyFancy舞室金鹰店']
  }
])

const handleBack = () => {
  uni.navigateBack({
    delta: 1
  })
}

const isFilterActive = ref(false)

const handleClear = () => {
  // 触发清空事件
  emit('clear')
}

const toggleFilter = () => {
  isFilterActive.value = !isFilterActive.value
  // 触发筛选事件
  emit('filter', isFilterActive.value)
}

// 格式化视频时长
const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

// 视频点击处理
const handleVideoTap = (video) => {
  // 处理视频点击
}

// 标签点击处理
const handleTagTap = (tag) => {
  // 处理标签点击
}

const isExpanded = ref(false)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 88rpx;
  min-height: 100vh;
  background: linear-gradient(135deg, #141123 0%, #1A1630 100%);
}

.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 88rpx;
  background: rgba(20, 17, 35, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2rpx 20rpx rgba(0, 0, 0, 0.1);
  
  .back-btn {
    position: absolute;
    left: 30rpx;
    width: 64rpx;
    height: 64rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease;
    
    &:active {
      transform: scale(0.9);
      background: rgba(255, 255, 255, 0.1);
    }
    
    .iconfont {
      font-size: 40rpx;
      color: #fff;
    }
  }
  
  .title {
    font-size: 32rpx;
    color: #fff;
    font-weight: 600;
    letter-spacing: 2rpx;
  }
}

.about-card {
  margin: 30rpx;
  padding: 30rpx;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20rpx;
  backdrop-filter: blur(10px);
  box-shadow: 0 4rpx 30rpx rgba(0, 0, 0, 0.1);
  
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
    
    .logo {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
      margin-right: 20rpx;
      border: 2rpx solid rgba(255, 77, 143, 0.3);
      
      &.pulse {
        animation: pulse 2s infinite;
      }
    }
    
    .title {
      flex: 1;
      color: #fff;
      font-size: 32rpx;
      font-weight: 600;
    }
    
    .expand-btn {
      display: flex;
      align-items: center;
      color: rgba(255, 77, 143, 0.8);
      font-size: 28rpx;
      transition: all 0.3s ease;
      
      .arrow {
        margin-left: 8rpx;
        transition: transform 0.3s ease;
        
        &.is-expanded {
          transform: rotate(90deg);
        }
      }
      
      &:active {
        transform: scale(0.95);
      }
    }
  }
  
  .description {
    color: rgba(255, 255, 255, 0.6);
    font-size: 28rpx;
    line-height: 1.6;
    max-height: 80rpx;
    overflow: hidden;
    transition: all 0.3s ease;
    
    &.is-expanded {
      max-height: 400rpx;
    }
  }
}

.filter-section {
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20rpx 30rpx;
  gap: 30rpx;
  
  .filter-clear {
    padding: 12rpx 24rpx;
    border-radius: 100rpx;
    background: rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;
    
    .clear-text {
      font-size: 26rpx;
      color: rgba(255, 255, 255, 0.6);
      transition: color 0.3s ease;
    }
    
    &:active {
      transform: scale(0.95);
    }
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      
      .clear-text {
        color: rgba(255, 255, 255, 0.9);
      }
    }
  }
  
  .filter-btn {
    display: flex;
    align-items: center;
    gap: 8rpx;
    padding: 12rpx 24rpx;
    border-radius: 100rpx;
    background: rgba(255, 77, 143, 0.1);
    transition: all 0.3s ease;
    
    .filter-text {
      font-size: 26rpx;
      color: #FF4D8F;
      transition: color 0.3s ease;
    }
    
    .filter-icon {
      display: flex;
      align-items: center;
      transition: transform 0.3s ease;
      
      .icon {
        font-size: 28rpx;
        color: #FF4D8F;
      }
      
      &.is-active {
        transform: rotate(180deg);
      }
    }
    
    &:active {
      transform: scale(0.95);
    }
    
    &:hover {
      background: rgba(255, 77, 143, 0.2);
      
      .filter-text {
        color: #FF6D9F;
      }
      
      .filter-icon .icon {
        color: #FF6D9F;
      }
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    left: 30rpx;
    right: 30rpx;
    bottom: 0;
    height: 2rpx;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
  }
}

.video-list {
  width: 700rpx;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
  box-sizing: border-box;
  
  .video-item {
    opacity: 0;
    animation: fadeUp 0.6s ease-out forwards;
    
    .video-wrapper {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 16rpx;
      overflow: hidden;
      
      .video-card {
        position: relative;
        width: 100%;
        padding-bottom: 133.33%; // 3:4 比例
        
        .video-player {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .video-overlay {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 20rpx;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.6),
            transparent
          );
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          opacity: 0;
          transition: opacity 0.3s ease;
          
          .video-stats {
            display: flex;
            gap: 16rpx;
            
            .stat-item {
              display: flex;
              align-items: center;
              gap: 4rpx;
              
              .icon {
                font-size: 24rpx;
              }
              
              .count {
                font-size: 24rpx;
                color: #fff;
              }
            }
          }
          
          .video-duration {
            font-size: 24rpx;
            color: #fff;
            padding: 4rpx 12rpx;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 100rpx;
          }
        }
        
        &:hover .video-overlay {
          opacity: 1;
        }
      }
      
      .video-info {
        padding: 20rpx;
        
        .title {
          font-size: 28rpx;
          color: #fff;
          font-weight: 500;
          margin-bottom: 12rpx;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 12rpx;
          
          .tag {
            font-size: 24rpx;
            color: #FF4D8F;
            padding: 4rpx 12rpx;
            background: rgba(255, 77, 143, 0.1);
            border-radius: 100rpx;
            transition: all 0.3s ease;
            
            &:hover {
              background: rgba(255, 77, 143, 0.2);
              transform: translateY(-2rpx);
            }
            
            &:active {
              transform: scale(0.95);
            }
          }
        }
      }
    }
  }
}

@keyframes fadeUp {
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
    box-shadow: 0 0 0 0 rgba(255, 77, 143, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10rpx rgba(255, 77, 143, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 77, 143, 0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

.animate-slide-down {
  animation: slideDown 0.6s ease-out;
}

.animate-slide-right {
  animation: slideRight 0.6s ease-out;
}

.ripple {
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.4s ease;
  }
  
  &:active::after {
    width: 200%;
    height: 200%;
    opacity: 0;
  }
}

// 优化滚动条
::-webkit-scrollbar {
  width: 6rpx;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 77, 143, 0.3);
  border-radius: 3rpx;
}
</style>
