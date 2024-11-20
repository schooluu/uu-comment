<template>
  <view class="container">
    <view class="header">
      <text class="title">邀请好友</text>
      <text class="subtitle">邀请好友注册即可获得积分奖励</text>
    </view>
    
    <!-- 邀请码 -->
    <view class="invite-code">
      <text class="label">我的邀请码</text>
      <view class="code-box">
        <text class="code">{{ inviteCode }}</text>
        <button class="copy-btn" @tap="copyCode">复制</button>
      </view>
    </view>
    
    <!-- 邀请记录 -->
    <view class="record-section">
      <view class="section-header">
        <text class="title">邀请记录</text>
        <text class="count">已邀请 {{ inviteRecords.length }} 人</text>
      </view>
      
      <view class="record-list">
        <view class="record-item" v-for="record in inviteRecords" :key="record.id">
          <image class="avatar" :src="record.avatar" mode="aspectFill"></image>
          <view class="info">
            <text class="name">{{ record.name }}</text>
            <text class="time">{{ record.time }}</text>
          </view>
          <text class="reward">+{{ record.points }}积分</text>
        </view>
      </view>
    </view>
    
    <!-- 分享按钮 -->
    <button class="share-btn" @tap="share">
      立即邀请
    </button>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const inviteCode = ref('FANCY888')

const inviteRecords = ref([
  {
    id: 1,
    name: '小明',
    avatar: '/static/images/avatar1.jpg',
    time: '2024-03-15',
    points: 100
  },
  {
    id: 2,
    name: '小红',
    avatar: '/static/images/avatar2.jpg',
    time: '2024-03-10',
    points: 100
  }
])

const copyCode = () => {
  uni.setClipboardData({
    data: inviteCode.value,
    success: () => {
      uni.showToast({
        title: '复制成功',
        icon: 'success'
      })
    }
  })
}

const share = () => {
  // 调用分享API
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  background-color: #1C1B21;
  padding: 30rpx;
}

.header {
  text-align: center;
  margin-bottom: 60rpx;
  
  .title {
    color: #fff;
    font-size: 36rpx;
    font-weight: 600;
    margin-bottom: 12rpx;
    display: block;
  }
  
  .subtitle {
    color: rgba(255,255,255,0.6);
    font-size: 28rpx;
  }
}

.invite-code {
  background: rgba(255,255,255,0.1);
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 40rpx;
  
  .label {
    color: rgba(255,255,255,0.6);
    font-size: 28rpx;
    margin-bottom: 20rpx;
    display: block;
  }
  
  .code-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    .code {
      color: #FF4D8F;
      font-size: 48rpx;
      font-weight: 600;
    }
    
    .copy-btn {
      width: 120rpx;
      height: 60rpx;
      line-height: 60rpx;
      background: #FF4D8F;
      color: #fff;
      font-size: 26rpx;
      border-radius: 100rpx;
    }
  }
}

.record-section {
  margin-bottom: 60rpx;
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30rpx;
    
    .title {
      color: #fff;
      font-size: 32rpx;
      font-weight: 600;
    }
    
    .count {
      color: rgba(255,255,255,0.6);
      font-size: 26rpx;
    }
  }
}

.record-list {
  .record-item {
    display: flex;
    align-items: center;
    background: rgba(255,255,255,0.1);
    border-radius: 20rpx;
    padding: 20rpx 30rpx;
    margin-bottom: 20rpx;
    
    .avatar {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
      margin-right: 20rpx;
    }
    
    .info {
      flex: 1;
      
      .name {
        color: #fff;
        font-size: 28rpx;
        margin-bottom: 8rpx;
        display: block;
      }
      
      .time {
        color: rgba(255,255,255,0.6);
        font-size: 24rpx;
      }
    }
    
    .reward {
      color: #FF4D8F;
      font-size: 28rpx;
      font-weight: 600;
    }
  }
}

.share-btn {
  position: fixed;
  bottom: 40rpx;
  left: 40rpx;
  right: 40rpx;
  height: 88rpx;
  line-height: 88rpx;
  background: #FF4D8F;
  color: #fff;
  font-size: 32rpx;
  border-radius: 100rpx;
}
</style> 