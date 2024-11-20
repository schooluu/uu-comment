<template>
  <view class="container">
    <view class="header">
      <text class="title">通知</text>
      <text class="clear" @tap="clearAll">清空</text>
    </view>
    
    <!-- 通知类型切换 -->
    <view class="tab-bar">
      <view 
        class="tab-item" 
        v-for="(tab, index) in tabs" 
        :key="index"
        :class="{ active: currentTab === index }"
        @tap="switchTab(index)"
      >
        <text>{{ tab }}</text>
      </view>
    </view>
    
    <!-- 通知列表 -->
    <view class="notification-list">
      <view 
        class="notification-item" 
        v-for="item in notifications" 
        :key="item.id"
        :class="{ unread: !item.read }"
      >
        <view class="dot" v-if="!item.read"></view>
        <view class="content">
          <text class="title">{{ item.title }}</text>
          <text class="message">{{ item.message }}</text>
          <text class="time">{{ item.time }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const tabs = ['全部', '课程', '活动', '系统']
const currentTab = ref(0)

const notifications = ref([
  {
    id: 1,
    title: '课程提醒',
    message: '您预约的JAZZ基础课程将在明天19:00开始，请准时参加。',
    time: '10分钟前',
    type: 'course',
    read: false
  },
  {
    id: 2,
    title: '活动通知',
    message: '2024年度舞蹈展演报名开始啦！',
    time: '2小时前',
    type: 'activity',
    read: true
  },
  {
    id: 3,
    title: '系统通知',
    message: '您的会员卡将在7天后到期，请及时续费。',
    time: '1天前',
    type: 'system',
    read: true
  }
])

const switchTab = (index) => {
  currentTab.value = index
  // 根据tab筛选不同类型的通知
}

const clearAll = () => {
  uni.showModal({
    title: '清空通知',
    content: '确定要清空所有通知吗？',
    success: (res) => {
      if (res.confirm) {
        notifications.value = []
        uni.showToast({
          title: '已清空',
          icon: 'success'
        })
      }
    }
  })
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  background-color: #1C1B21;
  padding: 30rpx;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40rpx;
  
  .title {
    color: #fff;
    font-size: 36rpx;
    font-weight: 600;
  }
  
  .clear {
    color: rgba(255,255,255,0.6);
    font-size: 28rpx;
  }
}

.tab-bar {
  display: flex;
  background: rgba(255,255,255,0.1);
  border-radius: 100rpx;
  padding: 6rpx;
  margin-bottom: 40rpx;
  
  .tab-item {
    flex: 1;
    height: 60rpx;
    line-height: 60rpx;
    text-align: center;
    color: #fff;
    font-size: 28rpx;
    border-radius: 100rpx;
    
    &.active {
      background: #FF4D8F;
    }
  }
}

.notification-list {
  .notification-item {
    position: relative;
    background: rgba(255,255,255,0.1);
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
    
    &.unread {
      background: rgba(255,77,143,0.1);
    }
    
    .dot {
      position: absolute;
      top: 30rpx;
      right: 30rpx;
      width: 16rpx;
      height: 16rpx;
      background: #FF4D8F;
      border-radius: 50%;
    }
    
    .content {
      .title {
        color: #fff;
        font-size: 32rpx;
        font-weight: 600;
        margin-bottom: 12rpx;
        display: block;
      }
      
      .message {
        color: rgba(255,255,255,0.8);
        font-size: 28rpx;
        line-height: 1.6;
        margin-bottom: 16rpx;
        display: block;
      }
      
      .time {
        color: rgba(255,255,255,0.4);
        font-size: 24rpx;
      }
    }
  }
}
</style> 