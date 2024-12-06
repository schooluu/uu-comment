<template>
  <view class="carpool-container">
    <view class="header">
      <text class="title">顺风拼车</text>
    </view>
    
    <view class="filter-bar">
      <view class="filter-item" @tap="showDatePicker">
        <text>日期</text>
        <text class="arrow">▼</text>
      </view>
      <view class="filter-item" @tap="showLocationPicker">
        <text>出发地</text>
        <text class="arrow">▼</text>
      </view>
      <view class="filter-item" @tap="showLocationPicker">
        <text>目的地</text>
        <text class="arrow">▼</text>
      </view>
    </view>
    
    <scroll-view scroll-y class="carpool-list">
      <view class="carpool-item" v-for="(carpool, index) in carpools" :key="index">
        <view class="carpool-info">
          <text class="route">{{ carpool.from }} → {{ carpool.to }}</text>
          <text class="date">{{ carpool.date }}</text>
          <text class="price">¥{{ carpool.price }}</text>
        </view>
        <view class="driver-info">
          <image class="avatar" :src="carpool.driverAvatar"></image>
          <text class="driver-name">{{ carpool.driverName }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const carpools = ref([
  {
    from: '富邦小区',
    to: '市中心',
    date: '2024-01-25',
    price: '20',
    driverAvatar: 'https://example.com/driver1.jpg',
    driverName: '张三'
  },
  {
    from: '科技园',
    to: '火车站',
    date: '2024-01-26',
    price: '15',
    driverAvatar: 'https://example.com/driver2.jpg',
    driverName: '李四'
  }
  // ... 更多拼车信息
])

const showDatePicker = () => {
  // 显示日期选择器逻辑
}

const showLocationPicker = () => {
  // 显示地点选择器逻辑
}
</script>

<style lang="scss" scoped>
.carpool-container {
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
  
  .filter-bar {
    display: flex;
    background: #fff;
    padding: 20rpx 0;
    margin-bottom: 20rpx;
    
    .filter-item {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28rpx;
      color: #666;
      position: relative;
      
      .arrow {
        margin-left: 8rpx;
      }
    }
  }
  
  .carpool-list {
    padding: 20rpx;
    
    .carpool-item {
      background: #fff;
      border-radius: 12rpx;
      padding: 20rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20rpx;
      
      .carpool-info {
        flex: 1;
        
        .route {
          font-size: 30rpx;
          color: #333;
          margin-bottom: 8rpx;
        }
        
        .date {
          font-size: 26rpx;
          color: #999;
          margin-bottom: 8rpx;
        }
        
        .price {
          font-size: 28rpx;
          color: #ff5a5f;
        }
      }
      
      .driver-info {
        display: flex;
        align-items: center;
        
        .avatar {
          width: 60rpx;
          height: 60rpx;
          border-radius: 30rpx;
          margin-right: 12rpx;
        }
        
        .driver-name {
          font-size: 28rpx;
          color: #333;
        }
      }
    }
  }
}
</style> 