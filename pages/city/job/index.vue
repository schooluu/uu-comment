<template>
  <view class="job-container">
    <view class="header">
      <text class="title">求职招聘</text>
    </view>

    <view class="filter-tabs">
      <text class="tab active">全职</text>
      <text class="tab">兼职</text>
      <text class="tab">实习</text>
    </view>

    <scroll-view scroll-y class="job-list">
      <view class="job-item" v-for="(item, index) in jobs" :key="index">
        <view class="job-main">
          <view class="left">
            <text class="job-name">{{ item.name }}</text>
            <text class="company">{{ item.company }}</text>
          </view>
          <text class="salary">{{ item.salary }}</text>
        </view>
        <view class="job-tags">
          <text class="tag" v-for="(tag, idx) in item.tags" :key="idx">{{ tag }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
const jobs = [
  {
    name: '销售经理',
    company: '富邦商贸',
    salary: '6-8k',
    tags: ['五险一金', '双休', '有提成']
  }
  // ... 更多职位数据
]
</script> 

<style lang="scss" scoped>
.job-container {
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
  
  .filter-tabs {
    display: flex;
    background: #fff;
    padding: 20rpx 30rpx;
    gap: 30rpx;
    margin-bottom: 20rpx;
    
    .tab {
      font-size: 28rpx;
      color: #666;
      position: relative;
      
      &.active {
        color: #07c160;
        font-weight: 500;
        
        &::after {
          content: '';
          position: absolute;
          bottom: -8rpx;
          left: 50%;
          transform: translateX(-50%);
          width: 40rpx;
          height: 4rpx;
          background: #07c160;
          border-radius: 2rpx;
        }
      }
    }
  }
  
  .job-list {
    padding: 0 20rpx;
    
    .job-item {
      background: #fff;
      border-radius: 12rpx;
      padding: 24rpx;
      margin-bottom: 20rpx;
      
      .job-main {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 16rpx;
        
        .left {
          .job-name {
            font-size: 32rpx;
            font-weight: 500;
            color: #333;
            margin-bottom: 8rpx;
          }
          
          .company {
            font-size: 26rpx;
            color: #666;
          }
        }
      }
    }
  }
}
</style> 