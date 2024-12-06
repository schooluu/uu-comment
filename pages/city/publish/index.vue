<template>
  <view class="publish-container">
    <view class="header">
      <text class="title">发布信息</text>
    </view>
    
    <view class="category-list">
      <view class="category-item" 
            v-for="(item, index) in categories" 
            :key="index"
            @tap="handleSelect(item)">
        <view class="icon">{{ item.icon }}</view>
        <text class="name">{{ item.name }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
const categories = [
  { name: '房产出租', icon: '🏠' },
  { name: '二手交易', icon: '🛍️' },
  { name: '招聘求职', icon: '💼' },
  { name: '顺风车', icon: '🚗' },
  { name: '生活服务', icon: '🔧' },
  { name: '商家推广', icon: '📢' }
]

const handleSelect = (item) => {
  console.log('选择发布类型:', item.name)
}
</script>

<style lang="scss" scoped>
.publish-container {
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
  
  .category-list {
    padding: 30rpx;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30rpx;
    
    .category-item {
      background: #fff;
      border-radius: 12rpx;
      height: 180rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      
      .icon {
        font-size: 48rpx;
        margin-bottom: 16rpx;
      }
      
      .name {
        font-size: 30rpx;
        color: #333;
      }
    }
  }
}
</style> 