<template>
  <view class="terms-container">
    <!-- 顶部导航 -->
    <view class="nav-header">
      <view class="back-btn" @tap="handleBack">
        <text class="icon">←</text>
      </view>
      <text class="title">服务协议</text>
    </view>
    
    <!-- 协议内容 -->
    <scroll-view class="content-scroll" scroll-y>
      <view class="content-wrapper">
        <view class="section">
          <view class="section-title">1. 服务协议的范围</view>
          <view class="section-content">
            <text>欢迎您使用我们的服务。本协议是您与我们之间关于使用本服务所订立的协议。</text>
          </view>
        </view>
        
        <view class="section">
          <view class="section-title">2. 服务内容</view>
          <view class="section-content">
            <text>2.1 我们会通过网络为您提供以下服务：</text>
            <view class="list-item">• 信息发布与分享服务</view>
            <view class="list-item">• 社交互动服务</view>
            <view class="list-item">• 其他相关服务</view>
          </view>
        </view>
        
        <view class="section">
          <view class="section-title">3. 用户行为规范</view>
          <view class="section-content">
            <text>3.1 您在使用本服务时应遵守以下规定：</text>
            <view class="list-item">• 遵守法律法规</view>
            <view class="list-item">• 尊重他人权益</view>
            <view class="list-item">• 维护网络秩序</view>
          </view>
        </view>
        
        <view class="section">
          <view class="section-title">4. 隐私保护</view>
          <view class="section-content">
            <text>我们重视用户的隐私保护，具体隐私政策请参见《隐私政策》。</text>
          </view>
        </view>
        
        <view class="section">
          <view class="section-title">5. 知识产权</view>
          <view class="section-content">
            <text>本服务中的所有内容，包括但不限于文字、图片、音频、视频、软件、程序、代码等的所有权利均归我们所有。</text>
          </view>
        </view>
        
        <view class="section">
          <view class="section-title">6. 免责声明</view>
          <view class="section-content">
            <text>在法律允许的范围内，我们对以下情况不承担责任：</text>
            <view class="list-item">• 因不可抗力导致的服务中断</view>
            <view class="list-item">• 用户自身原因导致的损失</view>
            <view class="list-item">• 第三方造成的损失</view>
          </view>
        </view>
      </view>
    </scroll-view>
    
    <!-- 底部按钮 -->
    <view class="bottom-bar">
      <button class="agree-btn" @tap="handleAgree">同意并继续</button>
    </view>
  </view>
</template>

<script setup>
const handleBack = () => {
  uni.navigateBack()
}

const handleAgree = () => {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.terms-container {
  min-height: 100vh;
  background: linear-gradient(to bottom, #f8f8f8, #fff);
  display: flex;
  flex-direction: column;
}

.nav-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 88rpx;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 30rpx;
  border-bottom: 1rpx solid rgba(0, 0, 0, 0.05);
  z-index: 100;
  animation: slideDown 0.3s ease-out;
  
  .back-btn {
    position: absolute;
    left: 30rpx;
    padding: 20rpx;
    
    .icon {
      font-size: 36rpx;
      color: #333;
      transition: all 0.3s ease;
      
      &:active {
        transform: translateX(-6rpx) scale(0.95);
        opacity: 0.8;
      }
    }
  }
  
  .title {
    font-size: 34rpx;
    font-weight: 500;
    color: #333;
    opacity: 0;
    animation: fadeIn 0.3s ease-out 0.2s forwards;
  }
}

.content-scroll {
  flex: 1;
  margin-top: 88rpx;
  margin-bottom: 120rpx;
}

.content-wrapper {
  padding: 30rpx;
  
  .section {
    margin-bottom: 40rpx;
    opacity: 0;
    transform: translateY(20rpx);
    animation: slideUp 0.4s ease-out forwards;
    
    @for $i from 0 through 5 {
      &:nth-child(#{$i + 1}) {
        animation-delay: #{0.2 + $i * 0.1}s;
      }
    }
    
    .section-title {
      font-size: 32rpx;
      font-weight: 500;
      color: #333;
      margin-bottom: 20rpx;
      padding: 16rpx 20rpx;
      background: #f8f8f8;
      border-radius: 12rpx;
      border-left: 4rpx solid #07c160;
      transition: all 0.3s ease;
      
      &:hover {
        background: #f0f0f0;
        transform: translateX(6rpx);
        box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
      }
    }
    
    .section-content {
      font-size: 28rpx;
      color: #666;
      line-height: 1.6;
      padding: 0 20rpx;
      
      text {
        display: block;
        margin-bottom: 16rpx;
        transition: all 0.3s ease;
        
        &:hover {
          color: #333;
          transform: translateX(6rpx);
        }
      }
      
      .list-item {
        margin: 16rpx 0 16rpx 30rpx;
        position: relative;
        transition: all 0.3s ease;
        padding: 8rpx 0;
        
        &:hover {
          transform: translateX(10rpx);
          color: #333;
          
          &::before {
            transform: scale(1.5);
            background: #07c160;
            box-shadow: 0 0 10rpx rgba(7, 193, 96, 0.3);
          }
        }
        
        &::before {
          content: '';
          position: absolute;
          left: -16rpx;
          top: 18rpx;
          width: 6rpx;
          height: 6rpx;
          border-radius: 50%;
          background: #999;
          transition: all 0.3s ease;
        }
      }
    }
  }
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20rpx 30rpx;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  border-top: 1rpx solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 -4rpx 16rpx rgba(0, 0, 0, 0.05);
  transform: translateY(100%);
  animation: slideUp 0.4s ease-out 0.6s forwards;
  
  .agree-btn {
    height: 88rpx;
    background: linear-gradient(135deg, #07c160, #10ad7a);
    color: #fff;
    font-size: 30rpx;
    font-weight: 500;
    border-radius: 44rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4rpx 12rpx rgba(7, 193, 96, 0.2);
    transition: all 0.3s ease;
    
    &:active {
      transform: scale(0.98);
      box-shadow: 0 2rpx 6rpx rgba(7, 193, 96, 0.1);
      opacity: 0.9;
    }
  }
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20rpx);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

::-webkit-scrollbar {
  width: 4px;
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(7, 193, 96, 0.2);
  border-radius: 2px;
  
  &:hover {
    background: rgba(7, 193, 96, 0.3);
  }
}
</style>
