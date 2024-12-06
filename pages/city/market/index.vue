<template>
  <view class="market-container">
    <view class="header">
      <text class="title">闲置买卖</text>
    </view>

    <view class="category-tabs">
      <scroll-view scroll-x class="tabs">
        <text class="tab" v-for="(cat, index) in categories" :key="index">
          {{ cat }}
        </text>
      </scroll-view>
    </view>

    <view class="goods-grid">
      <view class="goods-item" v-for="(item, index) in goods" :key="index">
        <image class="goods-image" :src="item.image" mode="aspectFill"></image>
        <text class="title">{{ item.title }}</text>
        <text class="price">¥{{ item.price }}</text>
        <text class="location">{{ item.location }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
const categories = ['全部', '数码', '家具', '服装', '图书', '其他']
const goods = [
  {
    title: 'iPhone 13',
    price: '3999',
    location: '富邦小区',
    image: 'https://example.com/iphone.jpg'
  }
  // ... 更多商品数据
]
</script>

<style lang="scss" scoped>
.market-container {
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
  
  .category-tabs {
    background: #fff;
    padding: 20rpx 0;
    margin-bottom: 20rpx;
    
    .tabs {
      white-space: nowrap;
      padding: 0 20rpx;
      
      .tab {
        display: inline-block;
        padding: 8rpx 24rpx;
        font-size: 28rpx;
        color: #666;
        margin-right: 20rpx;
        
        &.active {
          color: #fff;
          background: #07c160;
          border-radius: 24rpx;
        }
      }
    }
  }
  
  .goods-grid {
    padding: 20rpx;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20rpx;
    
    .goods-item {
      background: #fff;
      border-radius: 12rpx;
      overflow: hidden;
      
      .goods-image {
        width: 100%;
        height: 360rpx;
      }
      
      .title {
        font-size: 32rpx;
        font-weight: 500;
        color: #333;
        margin-bottom: 12rpx;
      }
      
      .price {
        font-size: 36rpx;
        color: #ff5a5f;
        font-weight: 500;
        margin-bottom: 12rpx;
      }
      
      .location {
        font-size: 26rpx;
        color: #666;
        margin-bottom: 12rpx;
      }
    }
  }
}
</style> 