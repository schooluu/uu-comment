<template>
  <view class="business-container">
    <view class="header">
      <text class="title">商圈</text>
    </view>

    <scroll-view scroll-y class="merchant-list">
      <view class="merchant-item" v-for="(item, index) in merchants" :key="index">
        <image class="merchant-image" :src="item.image" mode="aspectFill"></image>
        <view class="merchant-info">
          <text class="name">{{ item.name }}</text>
          <view class="tags">
            <text class="tag" v-for="(tag, idx) in item.tags" :key="idx">{{ tag }}</text>
          </view>
          <text class="address">{{ item.address }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
const merchants = [
  {
    name: "富邦超市",
    image: "https://example.com/shop.jpg",
    tags: ["超市", "生鲜"],
    address: "富邦广场1楼"
  }
  // ... 更多商家数据
]
</script>

<style lang="scss" scoped>
.business-container {
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
  
  .merchant-list {
    padding: 20rpx;
    
    .merchant-item {
      background: #fff;
      border-radius: 12rpx;
      margin-bottom: 20rpx;
      display: flex;
      padding: 20rpx;
      
      .merchant-image {
        width: 160rpx;
        height: 160rpx;
        border-radius: 8rpx;
        margin-right: 20rpx;
      }
      
      .merchant-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
        .name {
          font-size: 32rpx;
          font-weight: 500;
          color: #333;
        }
        
        .tags {
          display: flex;
          gap: 12rpx;
          margin: 12rpx 0;
          
          .tag {
            padding: 4rpx 12rpx;
            background: rgba(7, 193, 96, 0.1);
            color: #07c160;
            font-size: 24rpx;
            border-radius: 4rpx;
          }
        }
        
        .address {
          font-size: 26rpx;
          color: #999;
          display: flex;
          align-items: center;
          
          &::before {
            content: '📍';
            margin-right: 6rpx;
          }
        }
      }
    }
  }
}
</style> 