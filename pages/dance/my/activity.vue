<template>
  <view class="container">
    <view class="header">
      <text class="title">活动报名</text>
    </view>
    
    <!-- 活动列表 -->
    <view class="activity-list">
      <view class="activity-item" v-for="activity in activities" :key="activity.id">
        <image class="cover" :src="activity.cover" mode="aspectFill"></image>
        <view class="content">
          <text class="name">{{ activity.name }}</text>
          <view class="info">
            <text class="time">{{ activity.time }}</text>
            <text class="location">{{ activity.location }}</text>
          </view>
          <view class="status-bar">
            <text class="price">¥{{ activity.price }}</text>
            <button 
              class="join-btn" 
              :class="activity.status"
              @tap="joinActivity(activity)"
            >
              {{ getStatusText(activity.status) }}
            </button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const activities = ref([
  {
    id: 1,
    name: '2024年度舞蹈展演',
    time: '2024.12.31 19:00',
    location: '上海大剧院',
    price: 199,
    cover: '/static/images/activities/show1.jpg',
    status: 'available'
  },
  {
    id: 2,
    name: 'JAZZ大师课',
    time: '2024.11.20 14:00',
    location: 'FancyFancy舞室大悦城店',
    price: 299,
    cover: '/static/images/activities/master1.jpg',
    status: 'full'
  }
])

const getStatusText = (status) => {
  const statusMap = {
    'available': '立即报名',
    'full': '已满员',
    'joined': '已报名'
  }
  return statusMap[status]
}

const joinActivity = (activity) => {
  switch(activity.status) {
    case 'available':
      uni.navigateTo({
        url: `/pages/dance/activity/join?id=${activity.id}`
      })
      break
    case 'full':
      uni.showToast({
        title: '活动已满',
        icon: 'none'
      })
      break
    case 'joined':
      uni.navigateTo({
        url: `/pages/dance/activity/detail?id=${activity.id}`
      })
      break
  }
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

.activity-list {
  .activity-item {
    background: rgba(255,255,255,0.1);
    border-radius: 20rpx;
    overflow: hidden;
    margin-bottom: 30rpx;
    
    .cover {
      width: 100%;
      height: 300rpx;
    }
    
    .content {
      padding: 30rpx;
      
      .name {
        color: #fff;
        font-size: 32rpx;
        font-weight: 600;
        margin-bottom: 16rpx;
        display: block;
      }
      
      .info {
        margin-bottom: 20rpx;
        
        .time, .location {
          color: rgba(255,255,255,0.6);
          font-size: 26rpx;
          margin-right: 20rpx;
        }
      }
      
      .status-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .price {
          color: #FF4D8F;
          font-size: 36rpx;
          font-weight: 600;
        }
        
        .join-btn {
          width: 160rpx;
          height: 60rpx;
          line-height: 60rpx;
          border-radius: 100rpx;
          font-size: 26rpx;
          
          &.available {
            background: #FF4D8F;
            color: #fff;
          }
          
          &.full {
            background: rgba(255,255,255,0.2);
            color: rgba(255,255,255,0.6);
          }
          
          &.joined {
            background: #2DD4BF;
            color: #fff;
          }
        }
      }
    }
  }
}
</style> 