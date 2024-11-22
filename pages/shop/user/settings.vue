<template>
  <view class="settings-page">
    <!-- 账号安全 -->
    <view class="settings-group">
      <view class="group-title">账号安全</view>
      <view class="settings-list glass-effect">
        <view class="settings-item" @tap="handleSetting('password')">
          <view class="item-left">
            <text class="icon">🔒</text>
            <text class="label">修改密码</text>
          </view>
          <view class="item-right">
            <text class="arrow">></text>
          </view>
        </view>
        <view class="settings-item" @tap="handleSetting('phone')">
          <view class="item-left">
            <text class="icon">📱</text>
            <text class="label">绑定手机</text>
          </view>
          <view class="item-right">
            <text class="value">{{ userInfo.phone || '未绑定' }}</text>
            <text class="arrow">></text>
          </view>
        </view>
        <view class="settings-item" @tap="handleSetting('email')">
          <view class="item-left">
            <text class="icon">📧</text>
            <text class="label">绑定邮箱</text>
          </view>
          <view class="item-right">
            <text class="value">{{ userInfo.email || '未绑定' }}</text>
            <text class="arrow">></text>
          </view>
        </view>
      </view>
    </view>

    <!-- 隐私设置 -->
    <view class="settings-group">
      <view class="group-title">隐私设置</view>
      <view class="settings-list glass-effect">
        <view class="settings-item">
          <view class="item-left">
            <text class="icon">👤</text>
            <text class="label">个人资料公开</text>
          </view>
          <view class="item-right">
            <switch 
              :checked="privacy.profilePublic" 
              @change="handlePrivacyChange('profilePublic')"
              color="#ff6b6b"
            />
          </view>
        </view>
        <view class="settings-item">
          <view class="item-left">
            <text class="icon">🔔</text>
            <text class="label">消息通知</text>
          </view>
          <view class="item-right">
            <switch 
              :checked="privacy.notifications" 
              @change="handlePrivacyChange('notifications')"
              color="#ff6b6b"
            />
          </view>
        </view>
      </view>
    </view>

    <!-- 通用设置 -->
    <view class="settings-group">
      <view class="group-title">通用设置</view>
      <view class="settings-list glass-effect">
        <view class="settings-item" @tap="handleSetting('language')">
          <view class="item-left">
            <text class="icon">🌐</text>
            <text class="label">语言</text>
          </view>
          <view class="item-right">
            <text class="value">{{ settings.language }}</text>
            <text class="arrow">></text>
          </view>
        </view>
        <view class="settings-item" @tap="handleSetting('clearCache')">
          <view class="item-left">
            <text class="icon">🗑️</text>
            <text class="label">清除缓存</text>
          </view>
          <view class="item-right">
            <text class="value">{{ cacheSize }}</text>
            <text class="arrow">></text>
          </view>
        </view>
        <view class="settings-item" @tap="handleSetting('about')">
          <view class="item-left">
            <text class="icon">ℹ️</text>
            <text class="label">关于我们</text>
          </view>
          <view class="item-right">
            <text class="value">v{{ appVersion }}</text>
            <text class="arrow">></text>
          </view>
        </view>
      </view>
    </view>

    <!-- 账号操作 -->
    <view class="settings-group">
      <view class="danger-zone">
        <button class="danger-btn" @tap="handleLogout">退出登录</button>
        <button class="danger-btn delete" @tap="handleDeleteAccount">注销账号</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 用户信息
const userInfo = ref({
  phone: '138****8888',
  email: 'ex***@example.com'
})

// 隐私设置
const privacy = ref({
  profilePublic: true,
  notifications: true
})

// 通用设置
const settings = ref({
  language: '简体中文'
})

// App版本
const appVersion = ref('1.0.0')
// 缓存大小
const cacheSize = ref('23.5MB')

// 处理设置项点击
const handleSetting = (type) => {
  switch (type) {
    case 'password':
      uni.navigateTo({ url: '/pages/shop/user/password' })
      break
    case 'phone':
      uni.navigateTo({ url: '/pages/shop/user/phone' })
      break
    case 'email':
      uni.navigateTo({ url: '/pages/shop/user/email' })
      break
    case 'language':
      uni.showActionSheet({
        itemList: ['简体中文', 'English', '日本語'],
        success: (res) => {
          settings.value.language = ['简体中文', 'English', '日本語'][res.tapIndex]
        }
      })
      break
    case 'clearCache':
      uni.showModal({
        title: '提示',
        content: '确定要清除缓存吗？',
        success: (res) => {
          if (res.confirm) {
            uni.showToast({
              title: '清除成功',
              icon: 'success'
            })
            cacheSize.value = '0B'
          }
        }
      })
      break
    case 'about':
      uni.navigateTo({ url: '/pages/shop/about/index' })
      break
  }
}

// 处理隐私设置变更
const handlePrivacyChange = (type) => {
  privacy.value[type] = !privacy.value[type]
}

// 退出登录
const handleLogout = () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        uni.clearStorageSync()
        uni.reLaunch({
          url: '/pages/shop/login/index'
        })
      }
    }
  })
}

// 注销账号
const handleDeleteAccount = () => {
  uni.showModal({
    title: '警告',
    content: '账号注销后将无法恢复，确定要继续吗？',
    confirmColor: '#ff4444',
    success: (res) => {
      if (res.confirm) {
        // 执行注销逻辑
      }
    }
  })
}
</script>

<style lang="scss">
.settings-page {
  min-height: 100vh;
  padding: 20rpx;
  box-sizing: border-box;
  background: #f8f8f8;

  .settings-group {
    margin-bottom: 30rpx;

    .group-title {
      font-size: 28rpx;
      color: #999;
      padding: 20rpx 30rpx;
    }

    .settings-list {
      background: rgba(255, 255, 255, 0.9);
      border-radius: 20rpx;
      overflow: hidden;

      .settings-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30rpx;
        border-bottom: 1rpx solid rgba(0, 0, 0, 0.05);

        &:last-child {
          border-bottom: none;
        }

        .item-left {
          display: flex;
          align-items: center;

          .icon {
            font-size: 36rpx;
            margin-right: 20rpx;
          }

          .label {
            font-size: 28rpx;
            color: #333;
          }
        }

        .item-right {
          display: flex;
          align-items: center;

          .value {
            font-size: 26rpx;
            color: #999;
            margin-right: 10rpx;
          }

          .arrow {
            color: #ccc;
            font-size: 24rpx;
          }
        }

        &:active {
          background: rgba(0, 0, 0, 0.02);
        }
      }
    }

    .danger-zone {
      margin-top: 60rpx;
      padding: 0 30rpx;

      .danger-btn {
        width: 100%;
        height: 88rpx;
        line-height: 88rpx;
        text-align: center;
        border-radius: 44rpx;
        font-size: 30rpx;
        margin-bottom: 20rpx;
        background: #fff;
        color: #ff6b6b;
        border: none;

        &.delete {
          background: #ff4444;
          color: #fff;
        }

        &:active {
          opacity: 0.8;
        }
      }
    }
  }
}
</style>
