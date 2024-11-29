<template>
  <view class="privacy-container">
    <!-- 顶部导航 -->
    <view class="nav-header">
      <view class="back-btn" @tap="handleBack">
        <text class="icon">←</text>
      </view>
      <text class="title">隐私政策</text>
    </view>
    
    <!-- 隐私政策内容 -->
    <scroll-view class="content-scroll" scroll-y>
      <view class="content-wrapper">
        <!-- 前言 -->
        <view class="preface">
          <text>我们非常重视您的隐私保护，并严格遵守相关法律法规。本政策将帮助您了解我们如何收集、使用和保护您的个人信息。</text>
        </view>
        
        <!-- 主要内容 -->
        <view class="section">
          <view class="section-title">1. 信息收集</view>
          <view class="section-content">
            <text class="subtitle">1.1 主动提供的信息</text>
            <view class="list-item">• 账号信息（用户名、密码）</view>
            <view class="list-item">• 个人资料（昵称、头像）</view>
            <view class="list-item">• 联系方式（手机号、邮箱）</view>
            
            <text class="subtitle">1.2 自动收集的信息</text>
            <view class="list-item">• 设备信息</view>
            <view class="list-item">• 位置信息</view>
            <view class="list-item">• 使用记录</view>
          </view>
        </view>
        
        <view class="section">
          <view class="section-title">2. 信息使用</view>
          <view class="section-content">
            <text>我们可能将收集的信息用于：</text>
            <view class="list-item">• 提供和改进服务</view>
            <view class="list-item">• 安全防护</view>
            <view class="list-item">• 个性化推荐</view>
          </view>
        </view>
        
        <view class="section">
          <view class="section-title">3. 信息保护</view>
          <view class="section-content">
            <text>我们采取以下措施保护您的信息：</text>
            <view class="list-item">• 数据加密存储</view>
            <view class="list-item">• 访问权限控制</view>
            <view class="list-item">• 安全审计机制</view>
          </view>
        </view>
        
        <view class="section">
          <view class="section-title">4. 信息共享</view>
          <view class="section-content">
            <text>除以下情况外，我们不会与第三方共享您的信息：</text>
            <view class="list-item">• 获得您的明确授权</view>
            <view class="list-item">• 法律法规要求</view>
            <view class="list-item">• 维护公共安全</view>
          </view>
        </view>
        
        <view class="section">
          <view class="section-title">5. 您的权利</view>
          <view class="section-content">
            <text>您对个人信息享有以下权利：</text>
            <view class="list-item">• 访问和更正</view>
            <view class="list-item">• 删除</view>
            <view class="list-item">• 撤回授权</view>
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
.privacy-container {
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
      transition: transform 0.3s ease;
      
      &:active {
        transform: translateX(-6rpx);
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
  
  .preface {
    font-size: 28rpx;
    color: #666;
    line-height: 1.6;
    padding: 30rpx;
    background: rgba(7, 193, 96, 0.05);
    border-radius: 16rpx;
    margin-bottom: 40rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.02);
    transform: translateY(20rpx);
    opacity: 0;
    animation: slideUp 0.4s ease-out 0.3s forwards;
  }
  
  .section {
    margin-bottom: 40rpx;
    opacity: 0;
    transform: translateY(20rpx);
    animation: slideUp 0.4s ease-out forwards;
    
    @for $i from 1 through 5 {
      &:nth-child(#{$i + 1}) {
        animation-delay: #{0.3 + $i * 0.1}s;
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
      }
    }
    
    .section-content {
      font-size: 28rpx;
      color: #666;
      line-height: 1.6;
      padding: 0 20rpx;
      
      .subtitle {
        display: block;
        color: #333;
        margin: 24rpx 0 16rpx;
        font-weight: 500;
      }
      
      .list-item {
        margin: 16rpx 0 16rpx 30rpx;
        position: relative;
        transition: transform 0.3s ease;
        
        &:hover {
          transform: translateX(10rpx);
        }
        
        &::before {
          content: '';
          position: absolute;
          left: -16rpx;
          top: 16rpx;
          width: 6rpx;
          height: 6rpx;
          border-radius: 50%;
          background: #07c160;
          transition: all 0.3s ease;
        }
        
        &:hover::before {
          transform: scale(1.5);
          box-shadow: 0 0 10rpx rgba(7, 193, 96, 0.3);
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
    }
  }
}

// 动画关键帧
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

// 优化滚动条
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
