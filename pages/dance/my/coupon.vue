<template>
  <view class="container">
    <view class="header">
      <text class="title">我的券包</text>
    </view>
    
    <!-- 券包类型切换 -->
    <view class="tab-bar">
      <view 
        class="tab-item" 
        v-for="(tab, index) in tabs" 
        :key="index"
        :class="{ active: currentTab === index }"
        @tap="switchTab(index)"
      >
        <text>{{ tab }}</text>
      </view>
    </view>
    
    <!-- 优惠券列表 -->
    <view class="coupon-list">
      <view class="coupon-item" v-for="coupon in coupons" :key="coupon.id">
        <view class="left">
          <text class="amount">¥{{ coupon.amount }}</text>
          <text class="condition">满{{ coupon.condition }}可用</text>
        </view>
        <view class="right">
          <text class="name">{{ coupon.name }}</text>
          <text class="validity">有效期至：{{ coupon.validity }}</text>
          <text class="desc">{{ coupon.description }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const tabs = ['未使用', '已使用', '已过期']
const currentTab = ref(0)

const coupons = ref([
  {
    id: 1,
    amount: 100,
    condition: 500,
    name: '新人专享券',
    validity: '2024.12.31',
    description: '仅限常规课程使用'
  },
  {
    id: 2,
    amount: 50,
    condition: 300,
    name: '生日特惠券',
    validity: '2024.12.31',
    description: '全场通用'
  }
])

const switchTab = (index) => {
  currentTab.value = index
  // 根据tab加载不同状态的优惠券
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

.tab-bar {
  display: flex;
  background: rgba(255,255,255,0.1);
  border-radius: 100rpx;
  padding: 6rpx;
  margin-bottom: 40rpx;
  
  .tab-item {
    flex: 1;
    height: 60rpx;
    line-height: 60rpx;
    text-align: center;
    color: #fff;
    font-size: 28rpx;
    border-radius: 100rpx;
    
    &.active {
      background: #FF4D8F;
    }
  }
}

.coupon-list {
  .coupon-item {
    display: flex;
    background: rgba(255,255,255,0.1);
    border-radius: 20rpx;
    margin-bottom: 30rpx;
    overflow: hidden;
    
    .left {
      width: 200rpx;
      background: #FF4D8F;
      padding: 30rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      
      .amount {
        color: #fff;
        font-size: 48rpx;
        font-weight: 600;
      }
      
      .condition {
        color: rgba(255,255,255,0.8);
        font-size: 24rpx;
        margin-top: 8rpx;
      }
    }
    
    .right {
      flex: 1;
      padding: 30rpx;
      
      .name {
        color: #fff;
        font-size: 32rpx;
        font-weight: 600;
        margin-bottom: 12rpx;
        display: block;
      }
      
      .validity, .desc {
        color: rgba(255,255,255,0.6);
        font-size: 26rpx;
        display: block;
        margin-bottom: 8rpx;
      }
    }
  }
}
</style> 