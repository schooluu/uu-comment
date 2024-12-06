<template>
  <view class="search-results">
    <view class="header">
      <text class="title">搜索结果</text>
    </view>
    
    <scroll-view scroll-y class="results-list">
      <view class="result-item" v-for="(item, index) in results" :key="index">
        <image class="result-image" :src="item.image"></image>
        <view class="result-info">
          <text class="name">{{ item.name }}</text>
          <text class="price">¥{{ item.price }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
const results = [
  {
    image: 'https://example.com/item1.jpg',
    name: '商品1',
    price: '100'
  },
  {
    image: 'https://example.com/item2.jpg',
    name: '商品2',
    price: '200'
  }
  // ... 更多搜索结果数据
]
</script>

<style lang="scss" scoped>
.search-results {
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
  
  .results-list {
    padding: 20rpx;
    
    .result-item {
      background: #fff;
      border-radius: 12rpx;
      padding: 20rpx;
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;
      
      .result-image {
        width: 100rpx;
        height: 100rpx;
        border-radius: 8rpx;
        margin-right: 20rpx;
      }
      
      .result-info {
        flex: 1;
        
        .name {
          font-size: 30rpx;
          color: #333;
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