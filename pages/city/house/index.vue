<template>
  <view class="house-container">
    <view class="header">
      <text class="title">土地房产</text>
    </view>
    
    <view class="filter-bar">
      <view class="filter-item">
        <text>区域</text>
        <text class="arrow">▼</text>
      </view>
      <view class="filter-item">
        <text>价格</text>
        <text class="arrow">▼</text>
      </view>
      <view class="filter-item">
        <text>房型</text>
        <text class="arrow">▼</text>
      </view>
      <view class="filter-item">
        <text>筛选</text>
        <text class="arrow">▼</text>
      </view>
    </view>

    <scroll-view scroll-y class="house-list">
      <view class="house-item" v-for="(item, index) in houses" :key="index">
        <image class="house-image" :src="item.image" mode="aspectFill"></image>
        <view class="house-info">
          <text class="title">{{ item.title }}</text>
          <text class="desc">{{ item.desc }}</text>
          <text class="price">{{ item.price }}</text>
          <view class="tags">
            <text class="tag" v-for="(tag, idx) in item.tags" :key="idx">{{ tag }}</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
const houses = [
  {
    title: '富邦花园小区',
    desc: '3室2厅 | 120㎡ | 南北通透',
    price: '2300元/月',
    tags: ['拎包入住', '家电齐全'],
    image: 'https://example.com/house1.jpg'
  }
  // ... 更多房产数据
]
</script> 

<style lang="scss" scoped>
.house-container {
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
      
      .arrow {
        font-size: 24rpx;
        margin-left: 6rpx;
      }
    }
  }
  
  .house-list {
    padding: 0 20rpx;
    
    .house-item {
      background: #fff;
      border-radius: 12rpx;
      margin-bottom: 20rpx;
      overflow: hidden;
      
      .house-image {
        width: 100%;
        height: 360rpx;
      }
      
      .house-info {
        padding: 20rpx;
        
        .title {
          font-size: 32rpx;
          font-weight: 500;
          color: #333;
          margin-bottom: 12rpx;
        }
        
        .desc {
          font-size: 26rpx;
          color: #666;
          margin-bottom: 12rpx;
        }
        
        .price {
          font-size: 36rpx;
          color: #ff5a5f;
          font-weight: 500;
          margin-bottom: 12rpx;
        }
        
        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 12rpx;
          
          .tag {
            padding: 4rpx 12rpx;
            background: #f5f5f5;
            color: #666;
            font-size: 24rpx;
            border-radius: 4rpx;
          }
        }
      }
    }
  }
}
</style> 