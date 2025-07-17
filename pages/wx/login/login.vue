<template>
  <view class="login-container">
    <!-- 背景图层 -->
    <view class="background gradient-bg">
      <view class="wave-wrapper">
        <view class="wave wave1"></view>
        <view class="wave wave2"></view>
        <view class="wave wave3"></view>
      </view>
      <view class="circle circle1"></view>
      <view class="circle circle2"></view>
      <view class="circle circle3"></view>
      <view class="glow-circle"></view>
    </view>
    <!-- 登录内容 -->
    <view class="content">
      <!-- 头部Logo区域 -->
      <view class="header">
        <image class="logo" src="https://img1.imgtp.com/2023/07/10/0Qv6Qw4w.png" />
        <view class="title">欢迎来到美好生活</view>
      </view>
      <!-- 登录区域 -->
      <view class="login-box">
        <view class="phone-login gradient-btn" @tap="handlePhoneLogin">
          <text class="text">微信登录</text>
          <view class="btn-glow"></view>
        </view>
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
      <view class="warm-tip">温馨提示：我们不会以任何形式泄露您的信息</view>
    </view>
    <!-- 科技感加载动画 -->
    <view class="tech-loading" v-if="loading">
      <view class="dot" v-for="i in 4" :key="i"></view>
      <text class="loading-text">登录中...</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const agreed = ref(false)
const systemInfo = ref({})
const loading = ref(false)

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
  if (!agreed.value) {
    uni.showToast({
      title: '请先同意服务协议和隐私政策',
      icon: 'none'
    })
    return
  }
  loading.value = true
  setTimeout(() => {
    loading.value = false
    uni.navigateBack()
  }, 1200)
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
$primary-gradient: linear-gradient(90deg, #5A8FFF 0%, #7F5AFF 100%);
$card-radius: 20rpx;
$shadow: 0 8rpx 32rpx rgba(90, 143, 255, 0.08);
$background-color: #f7f9fb;
$action-color: #5A8FFF;
.login-container {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: $background-color;
}
.gradient-bg {
  background: $primary-gradient;
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
  .glow-circle {
    position: absolute;
    left: 50%; top: 20%;
    width: 320rpx; height: 320rpx;
    background: radial-gradient(circle, #7F5AFF 0%, #5A8FFF 60%, transparent 100%);
    opacity: 0.18;
    border-radius: 50%;
    z-index: 2;
    pointer-events: none;
  }
}
.content {
  position: relative;
  z-index: 2;
  padding: 40rpx;
  display: flex;
  flex-direction: column;
  height: 100vh;
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
      border-radius: 50%;
      box-shadow: 0 0 24rpx #5A8FFF, 0 0 48rpx #7F5AFF;
      background: #fff;
      border: 2rpx solid #fff;
    }
    .title {
      font-size: 44rpx;
      color: #fff;
      font-weight: 600;
      text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
      letter-spacing: 2rpx;
    }
  }
  .login-box {
    padding: 40rpx;
    margin-bottom: 200rpx;
    margin-top: auto;
    .gradient-btn {
      height: 88rpx;
      background: $primary-gradient;
      border-radius: 44rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4rpx 12rpx #5A8FFF33;
      animation: buttonFadeIn 0.5s ease;
      position: relative;
      overflow: hidden;
      color: #fff;
      font-size: 32rpx;
      font-weight: 600;
      .btn-glow {
        position: absolute;
        left: 50%; top: 50%;
        width: 180rpx; height: 88rpx;
        background: $primary-gradient;
        border-radius: 44rpx;
        opacity: 0.18;
        transform: translate(-50%, -50%);
        animation: breathe 2s infinite;
        z-index: -1;
      }
      &:active {
        transform: scale(0.97);
        box-shadow: 0 2rpx 8rpx #7F5AFF44;
      }
    }
    .device-info {
      margin-top: 24rpx;
      text-align: center;
      color: #e0e6f6;
      font-size: 24rpx;
    }
  }
  .agreement {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40rpx;
    .checkbox {
      width: 36rpx; height: 36rpx;
      border-radius: 8rpx;
      border: 2rpx solid #fff;
      background: #fff2;
      margin-right: 16rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      &.checked {
        background: $primary-gradient;
        border-color: #7F5AFF;
        .check-icon {
          color: #fff;
          font-size: 28rpx;
        }
      }
    }
    .agreement-text {
      color: #fff;
      font-size: 24rpx;
      .link {
        color: #e0e6f6;
        text-decoration: underline;
        margin: 0 4rpx;
        cursor: pointer;
        &:active { color: #7F5AFF; }
      }
    }
  }
  .warm-tip {
    margin-top: 32rpx;
    color: #e0e6f6;
    font-size: 24rpx;
    text-align: center;
    letter-spacing: 2rpx;
  }
}
.tech-loading {
  position: fixed;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 999;
  background: rgba(255,255,255,0.96);
  padding: 40rpx;
  border-radius: 20rpx;
  backdrop-filter: blur(10px);
  .dot {
    width: 20rpx; height: 20rpx;
    background: $primary-gradient;
    border-radius: 50%;
    margin: 0 8rpx;
    animation: techDot 1s infinite alternate;
    display: inline-block;
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
    &:nth-child(4) { animation-delay: 0.6s; }
  }
  .loading-text {
    margin-top: 30rpx;
    font-size: 28rpx;
    color: #666;
    letter-spacing: 2rpx;
    animation: textPulse 1.5s ease-in-out infinite;
  }
}
@keyframes techDot {
  0% { opacity: 0.5; transform: scale(1); }
  100% { opacity: 1; transform: scale(1.5); }
}
@keyframes textPulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
@keyframes wave {
  0% { left: -100%; }
  100% { left: 0; }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20rpx); }
}
@keyframes logoFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12rpx); }
}
@keyframes buttonFadeIn {
  from { opacity: 0; transform: translateY(30rpx); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
