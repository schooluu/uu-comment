<template>
  <view class="container">
    <view class="header">
      <text class="title">私教课程</text>
    </view>
    
    <view class="teacher-list">
      <view class="teacher-item" v-for="teacher in teachers" :key="teacher.id">
        <image class="avatar" :src="teacher.avatar" mode="aspectFill"></image>
        <view class="info">
          <text class="name">{{ teacher.name }}</text>
          <text class="style">{{ teacher.style }}</text>
          <text class="price">¥{{ teacher.price }}/节</text>
        </view>
        <button class="book-btn" @tap="bookTeacher(teacher)">预约</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const teachers = ref([
  {
    id: 1,
    name: 'APHRODITE',
    style: 'JAZZ/现代舞',
    price: 399,
    avatar: '/static/images/teachers/aphrodite.jpg'
  },
  // ... 更多老师数据
])

const bookTeacher = (teacher) => {
  uni.navigateTo({
    url: `/pages/dance/course/private-detail?id=${teacher.id}`
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

.teacher-list {
  .teacher-item {
    display: flex;
    align-items: center;
    background: rgba(255,255,255,0.1);
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;
    
    .avatar {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      margin-right: 20rpx;
    }
    
    .info {
      flex: 1;
      
      .name {
        color: #fff;
        font-size: 32rpx;
        font-weight: 600;
        display: block;
        margin-bottom: 8rpx;
      }
      
      .style {
        color: rgba(255,255,255,0.6);
        font-size: 26rpx;
        display: block;
        margin-bottom: 8rpx;
      }
      
      .price {
        color: #FF4D8F;
        font-size: 28rpx;
        font-weight: 600;
      }
    }
    
    .book-btn {
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