<template>
  <view class="login-container">
    <!-- Logo -->
    <image class="logo" src="https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/微信图片_20241119193419.png" mode="aspectFit"></image>
    
    <!-- 登录表单 -->
    <view class="login-form">
      <!-- 手机号输入 -->
      <view class="input-group">
        <view class="country-code">中国 +86</view>
        <input 
          type="number" 
          v-model="phone" 
          placeholder="手机号"
          placeholder-class="placeholder"
          maxlength="11"
        />
      </view>

      <!-- 验证码输入 -->
      <view class="input-group">
        <input 
          type="number" 
          v-model="code" 
          placeholder="验证码"
          placeholder-class="placeholder"
          maxlength="6"
        />
        <button 
          class="code-btn" 
          :class="{ 'counting': counting }"
          @click="getVerifyCode"
        >
          {{ counting ? `${counter}s后重试` : '获取验证码' }}
        </button>
      </view>

      <!-- 登录按钮 -->
      <button class="login-btn" @click="handleLogin" :disabled="!isFormValid">登录</button>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'

const phone = ref('')
const code = ref('')
const counting = ref(false)
const counter = ref(60)
let timer = null

// 获取验证码
const getVerifyCode = async () => {
  if (!isPhoneValid.value) {
    uni.showToast({
      title: '请输入正确的手机号',
      icon: 'none'
    })
    return
  }
  
  try {
    // 开始倒计时
    startCountDown()
    
    // 调用验证码接口
    const res = await uni.request({
      url: 'YOUR_API_URL/sendCode', // 替换为实际的接口地址
      method: 'POST',
      data: {
        phone: phone.value
      }
    })
    
    // 根据接口返回处理结果
    if (res.data.code === 200) { // 假设200是成功状态码
      uni.showToast({
        title: '验证码已发送',
        icon: 'success'
      })
    } else {
      throw new Error(res.data.message || '发送失败')
    }
  } catch (error) {
    // 发送失败时停止倒计时
    stopCountDown()
    uni.showToast({
      title: error.message || '发送验证码失败，请重试',
      icon: 'none'
    })
  }
}

// 开始倒计时
const startCountDown = () => {
  counting.value = true
  counter.value = 60
  
  timer = setInterval(() => {
    counter.value--
    if (counter.value <= 0) {
      stopCountDown()
    }
  }, 1000)
}

// 停止倒计时
const stopCountDown = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  counting.value = false
  counter.value = 60
}

// 手机号验证
const isPhoneValid = computed(() => {
  return phone.value && /^1[3-9]\d{9}$/.test(phone.value)
})

// 表单验证
const isFormValid = computed(() => {
  return isPhoneValid.value && code.value.length === 6
})

// 组件卸载时清理定时器
onUnmounted(() => {
  stopCountDown()
})

// 登录处理
const handleLogin = () => {
  if (!phone.value || phone.value.length !== 11) {
    uni.showToast({
      title: '请输入正确的手机号',
      icon: 'none'
    })
    return
  }
  
  if (!code.value || code.value.length !== 6) {
    uni.showToast({
      title: '请输入正确的验证码',
      icon: 'none'
    })
    return
  }
  
  // TODO: 调用登录接口
}
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  background-color: #141123f5;
  padding: 0 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .logo {
    width: 400rpx;
    height: 400rpx;
    margin-top: 160rpx;
    margin-bottom: 100rpx;
  }
  
  .login-form {
    width: 100%;
    
    .input-group {
      position: relative;
      margin-bottom: 30rpx;
      display: flex;
      align-items: center;
      border-bottom: 2rpx solid rgba(255,255,255,0.1);
      padding: 20rpx 0;
      
      .country-code {
        color: rgba(255,255,255,0.8);
        margin-right: 20rpx;
        font-size: 28rpx;
      }
      
      input {
        flex: 1;
        color: #fff;
        font-size: 28rpx;
      }
      
      .placeholder {
        color: rgba(255,255,255,0.3);
      }
      
      .code-btn {
        min-width: 180rpx;
        line-height: 64rpx;
        padding: 0 24rpx;
        background: transparent;
        color: #FF4D8F;
        font-size: 28rpx;
        border: 2rpx solid #FF4D8F;
        border-radius: 32rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        white-space: nowrap;
        
        &::after {
          border: none;
        }
        
        &:active:not([disabled]) {
          background: rgba(255, 77, 143, 0.1);
          transform: scale(0.98);
        }
        
        &.counting {
          background: #F5F5F5;
          border-color: #CCCCCC;
          color: #999999;
        }
        
        &:disabled {
          background: #F5F5F5;
          border-color: #CCCCCC;
          color: #999999;
          
          &:active {
            transform: none;
          }
        }
      }
    }
    
    .login-btn {
      width: 85%;  // 设置按钮宽度
      height: 90rpx;
      margin: 60rpx auto;
      background: linear-gradient(to right, #FF4D8F, #FF6B6B);  // 渐变背景
      color: #FFFFFF;
      font-size: 32rpx;
      font-weight: 500;
      border-radius: 45rpx;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 6rpx 16rpx rgba(255, 77, 143, 0.3);  // 添加阴影效果
      transition: all 0.3s ease;  // 添加过渡效果
      
      &::after {
        border: none;  // 移除默认边框
      }
      
      &:active {
        transform: scale(0.98);  // 点击时的缩放效果
        box-shadow: 0 2rpx 8rpx rgba(255, 77, 143, 0.2);
      }
      
      &:disabled {
        background: #CCCCCC;
        box-shadow: none;
        color: #FFFFFF;
        opacity: 0.7;
      }
    }
  }
}
</style> 