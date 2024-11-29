<template>
  <view class="login-container">
    <!-- 背景图层 -->
    <view class="background">
      <view class="wave-wrapper">
        <view class="wave wave1"></view>
        <view class="wave wave2"></view>
        <view class="wave wave3"></view>
      </view>
      <view class="circle circle1"></view>
      <view class="circle circle2"></view>
      <view class="circle circle3"></view>
    </view>

    <!-- 现有的登录内容 -->
    <view class="content">
      
      <!-- 登录区域 -->
      <view class="login-box">
        <view class="phone-login" @tap="handlePhoneLogin">
          <text class="text">微信登录</text>
        </view>
        
        <!-- 可选：显示设备信息 -->
        <view class="device-info" v-if="systemInfo.model">
          <text class="info-text">{{ systemInfo.brand }} {{ systemInfo.model }}</text>
        </view>
      </view>
      
      <!-- 底部协议 -->
      <view class="agreement">
        <view class="checkbox" :class="{ checked: agreed }" @tap="agreed = !agreed">
          <text v-if="agreed" class="check-icon">✓</text>
        </view>
        <view class="agreement-text">
          <text>已阅读并同意</text>
          <text class="link" @tap="handleViewTerms">服务协议</text>
          <text>和</text>
          <text class="link" @tap="handleViewPrivacy">隐私政策</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const agreed = ref(false)
const systemInfo = ref({})

onMounted(() => {
  // 获取系统信息
  uni.getSystemInfo({
    success: (res) => {
      systemInfo.value = {
        brand: res.brand, // 手机品牌
        model: res.model, // 手机型号
        system: res.system, // 操作系统版本
        platform: res.platform // 客户端平台
      }
      console.log('设备信息：', systemInfo.value)
    },
    fail: (err) => {
      console.error('获取系统信息失败：', err)
    }
  })
})

const handlePhoneLogin = () => {
  console.log(`当前设备: ${systemInfo.value.brand} ${systemInfo.value.model}`)
  if (!agreed.value) {
    uni.showToast({
      title: '请先同意服务协议和隐私政策',
      icon: 'none'
    })
    return
  }
  uni.navigateBack()
}

const handleWechatLogin = () => {
  if (!agreed.value) {
    uni.showToast({
      title: '请先同意服务协议和隐私政策',
      icon: 'none'
    })
    return
  }
  // 实现微信登录逻辑
}

const handlePasswordLogin = () => {
  if (!agreed.value) {
    uni.showToast({
      title: '请先同意服务协议和隐私政策',
      icon: 'none'
    })
    return
  }
  uni.navigateTo({
    url: '/pages/wx/login/password'
  })
}

const handleViewTerms = () => {
  uni.navigateTo({
    url: '/pages/wx/agreement/terms'
  })
}

const handleViewPrivacy = () => {
  uni.navigateTo({
    url: '/pages/wx/agreement/privacy'
  })
}
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #07c160, #10ad7a);
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  
  .wave-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    
    .wave {
      position: absolute;
      left: -100%;
      width: 300%;
      height: 100%;
      background-repeat: repeat-x;
      transform-origin: center bottom;
      
      &.wave1 {
        bottom: 0;
        height: 60%;
        background: linear-gradient(transparent, rgba(255, 255, 255, 0.1));
        animation: wave 12s linear infinite;
      }
      
      &.wave2 {
        bottom: 0;
        height: 50%;
        background: linear-gradient(transparent, rgba(255, 255, 255, 0.08));
        animation: wave 8s linear infinite;
      }
      
      &.wave3 {
        bottom: 0;
        height: 40%;
        background: linear-gradient(transparent, rgba(255, 255, 255, 0.05));
        animation: wave 6s linear infinite;
      }
    }
  }
  
  .circle {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    
    &.circle1 {
      width: 300rpx;
      height: 300rpx;
      top: -100rpx;
      right: -100rpx;
      animation: float 6s ease-in-out infinite;
    }
    
    &.circle2 {
      width: 200rpx;
      height: 200rpx;
      bottom: 100rpx;
      left: -50rpx;
      animation: float 8s ease-in-out infinite;
    }
    
    &.circle3 {
      width: 150rpx;
      height: 150rpx;
      top: 40%;
      right: 60rpx;
      animation: float 7s ease-in-out infinite;
    }
  }
}

.content {
  position: relative;
  z-index: 2;
  padding: 40rpx;
  display: flex;
  flex-direction: column;
  height: 100vh;
  
  // 头部Logo区域
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 60rpx 0;
    
    .logo {
      width: 140rpx;
      height: 140rpx;
      margin-bottom: 20rpx;
      animation: logoFloat 3s ease-in-out infinite;
    }
    
    .title {
      font-size: 44rpx;
      color: #fff;
      font-weight: 600;
      text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
    }
  }
  
  // 登录区域
  .login-box {
    padding: 40rpx;
    margin-bottom: 200rpx;
    margin-top: auto;
    
    .phone-login {
      height: 88rpx;
      background: #07c160;
      border-radius: 44rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4rpx 12rpx rgba(7, 193, 96, 0.2);
      animation: buttonFadeIn 0.5s ease;
      position: relative;
      overflow: hidden;
      
      // 添加微光效果
      &::after {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(
          to right,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 0.1) 50%,
          rgba(255, 255, 255, 0) 100%
        );
        transform: rotate(45deg);
        animation: shimmer 3s infinite;
      }
      
      .text {
        color: #fff;
        font-size: 32rpx;
        font-weight: 500;
        letter-spacing: 2rpx;
        text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.1);
      }
      
      &:active {
        transform: scale(0.98);
        box-shadow: 0 2rpx 8rpx rgba(7, 193, 96, 0.15);
        background: darken(#07c160, 5%);
      }
    }
    
    .other-login {
      .divider {
        display: flex;
        align-items: center;
        margin: 40rpx 0;
        
        .line {
          flex: 1;
          height: 1rpx;
          background: rgba(255, 255, 255, 0.2);
        }
        
        text {
          color: rgba(255, 255, 255, 0.8);
          font-size: 26rpx;
          margin: 0 20rpx;
        }
      }
      
      .login-methods {
        display: flex;
        justify-content: space-around;
        padding: 20rpx 40rpx;
        
        .method-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          
          .icon-wrapper {
            width: 100rpx;
            height: 100rpx;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 16rpx;
            transition: all 0.3s ease;
            box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
            
            .icon {
              font-size: 48rpx;
            }
            
            &:active {
              transform: scale(0.9);
              background: rgba(255, 255, 255, 0.8);
            }
          }
          
          text {
            font-size: 26rpx;
            color: rgba(255, 255, 255, 0.9);
          }
        }
      }
    }
    
    .device-info {
      margin-top: 30rpx;
      text-align: center;
      
      .info-text {
        font-size: 24rpx;
        color: rgba(0, 0, 0, 0.4);
      }
    }
  }
  
  // 底部协议
  .agreement {
    position: fixed;
    bottom: 40rpx;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 40rpx;
    
    .checkbox {
      width: 32rpx;
      height: 32rpx;
      border: 2rpx solid rgba(255, 255, 255, 0.6);
      border-radius: 6rpx;
      margin-right: 12rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      
      &.checked {
        background: #fff;
        border-color: #fff;
        
        .check-icon {
          color: #07c160;
          font-size: 24rpx;
          font-weight: bold;
        }
      }
    }
    
    .agreement-text {
      font-size: 24rpx;
      color: rgba(255, 255, 255, 0.9);
      
      .link {
        color: red;
        font-weight: 500;
        margin: 0 4rpx;
        
        &:active {
          opacity: 0.8;
        }
      }
    }
  }
}

@keyframes wave {
  0% {
    transform: translateX(0) translateZ(0) scaleY(1);
  }
  50% {
    transform: translateX(25%) translateZ(0) scaleY(0.95);
  }
  100% {
    transform: translateX(50%) translateZ(0) scaleY(1);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20rpx) rotate(5deg);
  }
}

@keyframes logoFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10rpx);
  }
}

// 添加毛玻璃效果的卡片样式
.glass-card {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 20rpx;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
  padding: 40rpx;
  
  .title {
    color: #fff;
    font-size: 36rpx;
    font-weight: 500;
    margin-bottom: 40rpx;
    text-align: center;
    text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
  }
}

// 优化按钮样式
.login-btn {
  background: #fff;
  color: #07c160;
  border-radius: 40rpx;
  height: 88rpx;
  font-size: 32rpx;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(0.98);
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
  }
}

@keyframes buttonFadeIn {
  from {
    opacity: 0;
    transform: translateY(20rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shimmer {
  0% {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  100% {
    transform: translate(150%, 150%) rotate(45deg);
  }
}
</style>
