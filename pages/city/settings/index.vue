<template>
  <view class="settings-container">
    <!-- 顶部导航 -->
    <view class="header">
      <text class="title">设置</text>
    </view>
    
    <!-- 设置列表 -->
    <view class="settings-list">
      <!-- 账号设置 -->
      <view class="settings-group">
        <view class="group-title">账号设置</view>
        <view class="settings-item" @tap="navigateTo('/pages/city/settings/profile')">
          <text class="item-label">个人资料</text>
          <view class="item-right">
            <text class="item-value">{{ userInfo.name }}</text>
            <text class="arrow">></text>
          </view>
        </view>
        <view class="settings-item" @tap="navigateTo('/pages/city/settings/security')">
          <text class="item-label">账号安全</text>
          <view class="item-right">
            <text class="item-value">已设置</text>
            <text class="arrow">></text>
          </view>
        </view>
        <view class="settings-item" @tap="navigateTo('/pages/city/settings/privacy')">
          <text class="item-label">隐私设置</text>
          <view class="item-right">
            <text class="arrow">></text>
          </view>
        </view>
      </view>
      
      <!-- 消息通知 -->
      <view class="settings-group">
        <view class="group-title">消息通知</view>
        <view class="settings-item">
          <text class="item-label">新消息通知</text>
          <switch :checked="settings.newMessageNotify" @change="toggleSetting('newMessageNotify')" color="#07c160"/>
        </view>
        <view class="settings-item">
          <text class="item-label">声音提醒</text>
          <switch :checked="settings.soundNotify" @change="toggleSetting('soundNotify')" color="#07c160"/>
        </view>
        <view class="settings-item">
          <text class="item-label">振动提醒</text>
          <switch :checked="settings.vibrateNotify" @change="toggleSetting('vibrateNotify')" color="#07c160"/>
        </view>
      </view>
      
      <!-- 通用设置 -->
      <view class="settings-group">
        <view class="group-title">通用设置</view>
        <view class="settings-item" @tap="clearCache">
          <text class="item-label">清除缓存</text>
          <view class="item-right">
            <text class="item-value">{{ cacheSize }}</text>
            <text class="arrow">></text>
          </view>
        </view>
        <view class="settings-item">
          <text class="item-label">字体大小</text>
          <view class="item-right">
            <picker 
              mode="selector" 
              :range="fontSizes" 
              @change="handleFontSizeChange"
              :value="fontSizeIndex"
            >
              <text class="picker-text">{{ fontSizes[fontSizeIndex] }}</text>
            </picker>
            <text class="arrow">></text>
          </view>
        </view>
        <view class="settings-item">
          <text class="item-label">深色模式</text>
          <switch :checked="settings.darkMode" @change="toggleSetting('darkMode')" color="#07c160"/>
        </view>
      </view>
      
      <!-- 关于 -->
      <view class="settings-group">
        <view class="group-title">关于</view>
        <view class="settings-item" @tap="navigateTo('/pages/city/about/index')">
          <text class="item-label">关于我们</text>
          <view class="item-right">
            <text class="arrow">></text>
          </view>
        </view>
        <view class="settings-item" @tap="checkUpdate">
          <text class="item-label">检查更新</text>
          <view class="item-right">
            <text class="item-value">当前版本 {{ version }}</text>
            <text class="arrow">></text>
          </view>
        </view>
        <view class="settings-item" @tap="navigateTo('/pages/city/help/index')">
          <text class="item-label">帮助与反馈</text>
          <view class="item-right">
            <text class="arrow">></text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 退出登录按钮 -->
    <view class="logout-section">
      <button class="logout-btn" @tap="handleLogout">退出登录</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const userInfo = ref({
  name: '张三',
  phone: '138****8888'
})

const settings = ref({
  newMessageNotify: true,
  soundNotify: true,
  vibrateNotify: false,
  darkMode: false
})

const version = ref('1.0.0')
const cacheSize = ref('23.5MB')
const fontSizes = ['小', '标准', '大', '特大']
const fontSizeIndex = ref(1)

// 切换设置开关
const toggleSetting = (key) => {
  settings.value[key] = !settings.value[key]
  // 保存设置
  uni.setStorageSync('settings', settings.value)
}

// 页面跳转
const navigateTo = (url) => {
  uni.navigateTo({ url })
}

// 清除缓存
const clearCache = () => {
  uni.showModal({
    title: '提示',
    content: '确定要清除缓存吗？',
    success: (res) => {
      if (res.confirm) {
        uni.showLoading({
          title: '清理中...'
        })
        
        setTimeout(() => {
          uni.hideLoading()
          cacheSize.value = '0B'
          uni.showToast({
            title: '清理完成',
            icon: 'success'
          })
        }, 1500)
      }
    }
  })
}

// 检查更新
const checkUpdate = () => {
  uni.showLoading({
    title: '检查中...'
  })
  
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({
      title: '已是最新版本',
      icon: 'success'
    })
  }, 1500)
}

// 字体大小改变
const handleFontSizeChange = (e) => {
  fontSizeIndex.value = e.detail.value
  // 保存字体大小设置
  uni.setStorageSync('fontSize', fontSizeIndex.value)
}

// 退出登录
const handleLogout = () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        // 清除登录状态
        uni.clearStorageSync()
        // 跳转到登录页
        uni.reLaunch({
          url: '/pages/login/index'
        })
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.settings-container {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 40rpx;
  
  .header {
    height: 88rpx;
    background: #fff;
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    box-shadow: 0 2rpx 4rpx rgba(0,0,0,0.1);
    
    .title {
      font-size: 32rpx;
      font-weight: 500;
      color: #333;
    }
  }
  
  .settings-list {
    margin-top: 20rpx;
    
    .settings-group {
      margin-bottom: 20rpx;
      background: #fff;
      
      .group-title {
        padding: 20rpx 30rpx;
        font-size: 28rpx;
        color: #999;
      }
      
      .settings-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30rpx;
        background: #fff;
        border-bottom: 1rpx solid #f5f5f5;
        
        .item-label {
          font-size: 30rpx;
          color: #333;
        }
        
        .item-right {
          display: flex;
          align-items: center;
          
          .item-value {
            font-size: 28rpx;
            color: #999;
            margin-right: 10rpx;
          }
          
          .picker-text {
            font-size: 28rpx;
            color: #999;
          }
          
          .arrow {
            font-size: 28rpx;
            color: #999;
            margin-left: 10rpx;
          }
        }
        
        &:active {
          background: #f9f9f9;
        }
      }
    }
  }
  
  .logout-section {
    margin: 60rpx 30rpx;
    
    .logout-btn {
      width: 100%;
      height: 88rpx;
      background: #fff;
      color: #ff5a5f;
      font-size: 32rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 44rpx;
      
      &:active {
        opacity: 0.8;
      }
    }
  }
}
</style> 