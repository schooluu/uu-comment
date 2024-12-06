<template>
  <view class="messages-container">
    <view class="header">
      <text class="title">消息</text>
    </view>
    
    <scroll-view scroll-y class="message-list">
      <view class="message-item" v-for="(message, index) in messages" :key="index">
        <image class="avatar" :src="message.avatar"></image>
        <view class="message-info">
          <text class="name">{{ message.name }}</text>
          <text class="content">{{ message.content }}</text>
        </view>
        <text class="time">{{ message.time }}</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
const messages = [
  {
    avatar: 'https://example.com/avatar1.jpg',
    name: '张三',
    content: '你好，请问这个商品还在吗？',
    time: '10:30'
  },
  {
    avatar: 'https://example.com/avatar2.jpg',
    name: '李四',
    content: '我对你的房子很感兴趣。',
    time: '昨天'
  }
  // ... 更多消息数据
]
</script>

<style lang="scss" scoped>
.messages-container {
  min-height: 100vh;
  background: #f5f5f5;
  
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
  
  .message-list {
    padding: 20rpx;
    
    .message-item {
      background: #fff;
      border-radius: 12rpx;
      padding: 20rpx;
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;
      
      .avatar {
        width: 80rpx;
        height: 80rpx;
        border-radius: 40rpx;
        margin-right: 20rpx;
      }
      
      .message-info {
        flex: 1;
        
        .name {
          font-size: 30rpx;
          color: #333;
          margin-bottom: 8rpx;
        }
        
        .content {
          font-size: 26rpx;
          color: #666;
        }
      }
      
      .time {
        font-size: 24rpx;
        color: #999;
      }
    }
  }
}
</style> 