<template>
  <view class="container">
    <view class="header">
      <text class="title">消费记录</text>
    </view>
    
    <!-- 时间筛选 -->
    <view class="filter">
      <picker mode="date" fields="month" @change="handleDateChange">
        <view class="date-picker">
          <text>{{ currentDate }}</text>
          <text class="icon">▼</text>
        </view>
      </picker>
    </view>
    
    <!-- 记录列表 -->
    <view class="record-list">
      <view class="record-item" v-for="record in records" :key="record.id">
        <view class="left">
          <text class="type">{{ record.type }}</text>
          <text class="time">{{ record.time }}</text>
        </view>
        <view class="right">
          <text class="amount" :class="record.amountType">
            {{ record.amountType === 'minus' ? '-' : '+' }}¥{{ record.amount }}
          </text>
          <text class="status">{{ record.status }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const currentDate = ref('2024年3月')

const records = ref([
  {
    id: 1,
    type: '购买课程',
    time: '2024-03-15 14:30',
    amount: '399',
    amountType: 'minus',
    status: '交易成功'
  },
  {
    id: 2,
    type: '课程退款',
    time: '2024-03-10 16:20',
    amount: '199',
    amountType: 'plus',
    status: '退款成功'
  }
])

const handleDateChange = (e) => {
  // 处理日期选择
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

.filter {
  margin-bottom: 30rpx;
  
  .date-picker {
    display: inline-flex;
    align-items: center;
    background: rgba(255,255,255,0.1);
    padding: 16rpx 30rpx;
    border-radius: 100rpx;
    color: #fff;
    font-size: 28rpx;
    
    .icon {
      margin-left: 10rpx;
      font-size: 24rpx;
      color: rgba(255,255,255,0.6);
    }
  }
}

.record-list {
  .record-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(255,255,255,0.1);
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
    
    .left {
      .type {
        color: #fff;
        font-size: 30rpx;
        display: block;
        margin-bottom: 8rpx;
      }
      
      .time {
        color: rgba(255,255,255,0.6);
        font-size: 24rpx;
      }
    }
    
    .right {
      text-align: right;
      
      .amount {
        display: block;
        font-size: 32rpx;
        font-weight: 600;
        margin-bottom: 8rpx;
        
        &.minus {
          color: #FF4D8F;
        }
        
        &.plus {
          color: #2DD4BF;
        }
      }
      
      .status {
        color: rgba(255,255,255,0.6);
        font-size: 24rpx;
      }
    }
  }
}
</style> 