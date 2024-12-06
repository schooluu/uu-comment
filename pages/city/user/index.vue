<template>
  <view class="user-container">
    <view class="user-header">
      <image class="avatar" :src="userInfo.avatar"></image>
      <view class="user-info">
        <text class="nickname">{{ userInfo.nickname }}</text>
        <text class="id">ID: {{ userInfo.id }}</text>
      </view>
    </view>

    <view class="menu-list">
      <view class="menu-item" v-for="(item, index) in menuItems" :key="index">
        <text class="icon">{{ item.icon }}</text>
        <text class="name">{{ item.name }}</text>
        <text class="arrow">></text>
      </view>
    </view>
  </view>
</template>

<script setup>
const userInfo = {
  avatar: 'https://example.com/avatar.jpg',
  nickname: '用户昵称',
  id: '888888'
}

const menuItems = [
  { name: '我的发布', icon: '📋' },
  { name: '我的收藏', icon: '⭐' },
  { name: '联系客服', icon: '💬' },
  { name: '设置', icon: '⚙️' }
]
</script>

<style lang="scss" scoped>
.user-container {
  min-height: 100vh;
  background: #f5f5f5;
  
  .user-header {
    height: 300rpx;
    background: linear-gradient(135deg, #07c160, #10ad7a);
    padding: 40rpx 30rpx;
    display: flex;
    align-items: center;
    
    .avatar {
      width: 120rpx;
      height: 120rpx;
      border-radius: 60rpx;
      border: 4rpx solid rgba(255,255,255,0.3);
    }
    
    .user-info {
      margin-left: 24rpx;
      color: #fff;
      
      .nickname {
        font-size: 36rpx;
        font-weight: 500;
        margin-bottom: 12rpx;
      }
      
      .id {
        font-size: 26rpx;
        opacity: 0.8;
      }
    }
  }
  
  .menu-list {
    margin-top: 20rpx;
    background: #fff;
    padding: 0 30rpx;
    
    .menu-item {
      display: flex;
      align-items: center;
      height: 100rpx;
      border-bottom: 1rpx solid #f5f5f5;
      
      &:last-child {
        border-bottom: none;
      }
      
      .icon {
        font-size: 40rpx;
        margin-right: 20rpx;
      }
      
      .name {
        flex: 1;
        font-size: 30rpx;
        color: #333;
      }
      
      .arrow {
        color: #ccc;
        font-size: 32rpx;
      }
    }
  }
  
  .version {
    text-align: center;
    font-size: 24rpx;
    color: #999;
    margin-top: 60rpx;
  }
  
  .logout-btn {
    margin: 40rpx 30rpx;
    height: 88rpx;
    background: #fff;
    border-radius: 44rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32rpx;
    color: #ff5a5f;
    
    &:active {
      opacity: 0.8;
    }
  }
}
</style> 