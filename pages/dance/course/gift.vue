<template>
  <view class="container">
    <view class="header">
      <text class="title">赠送课程</text>
    </view>
    
    <view class="gift-list">
      <view class="gift-item" v-for="gift in gifts" :key="gift.id">
        <view class="gift-info">
          <text class="name">{{ gift.name }}</text>
          <text class="validity">有效期：{{ gift.validity }}</text>
          <text class="count">剩余次数：{{ gift.count }}次</text>
        </view>
        <button class="gift-btn" @tap="giftCourse(gift)">赠送</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const gifts = ref([
  {
    id: 1,
    name: 'JAZZ基础班体验课',
    validity: '2024.12.31',
    count: 2
  },
  {
    id: 2,
    name: '现代舞入门课程',
    validity: '2024.12.31',
    count: 1
  }
])

const giftCourse = (gift) => {
  uni.navigateTo({
    url: `/pages/dance/course/gift-friend?id=${gift.id}`
  })
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  background-color: #1C1B21;
  padding: 30rpx;
}

.header {
  margin-bottom: 40rpx;
  
  .title {
    color: #fff;
    font-size: 36rpx;
    font-weight: 600;
  }
}

.gift-list {
  .gift-item {
    background: rgba(255,255,255,0.1);
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;
    display: flex;
    align-items: center;
    
    .gift-info {
      flex: 1;
      
      .name {
        color: #fff;
        font-size: 32rpx;
        font-weight: 600;
        display: block;
        margin-bottom: 12rpx;
      }
      
      .validity, .count {
        color: rgba(255,255,255,0.6);
        font-size: 26rpx;
        display: block;
        margin-bottom: 8rpx;
      }
    }
    
    .gift-btn {
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
</style> 