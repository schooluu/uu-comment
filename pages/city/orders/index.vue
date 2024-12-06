<template>
  <view class="orders-container">
    <view class="header">
      <text class="title">我的订单</text>
    </view>
    
    <scroll-view scroll-y class="order-list">
      <view class="order-item" v-for="(order, index) in orders" :key="index">
        <image class="order-image" :src="order.image"></image>
        <view class="order-info">
          <text class="name">{{ order.name }}</text>
          <text class="status">{{ order.status }}</text>
          <text class="price">¥{{ order.price }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
const orders = [
  {
    image: 'https://example.com/order1.jpg',
    name: '商品1',
    status: '已发货',
    price: '100'
  },
  {
    image: 'https://example.com/order2.jpg',
    name: '商品2',
    status: '待付款',
    price: '200'
  }
  // ... 更多订单数据
]
</script>

<style lang="scss" scoped>
.orders-container {
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
  
  .order-list {
    padding: 20rpx;
    
    .order-item {
      background: #fff;
      border-radius: 12rpx;
      padding: 20rpx;
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;
      
      .order-image {
        width: 100rpx;
        height: 100rpx;
        border-radius: 8rpx;
        margin-right: 20rpx;
      }
      
      .order-info {
        flex: 1;
        
        .name {
          font-size: 30rpx;
          color: #333;
          margin-bottom: 8rpx;
        }
        
        .status {
          font-size: 26rpx;
          color: #666;
          margin-bottom: 8rpx;
        }
        
        .price {
          font-size: 28rpx;
          color: #ff5a5f;
        }
      }
    }
  }
}
</style> 