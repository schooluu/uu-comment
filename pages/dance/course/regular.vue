<template>
  <view class="container">
    <view class="header">
      <text class="title">常规课程</text>
    </view>
    
    <view class="course-list">
      <view class="course-item" v-for="course in courses" :key="course.id">
        <view class="course-info">
          <text class="name">{{ course.name }}</text>
          <text class="time">{{ course.time }}</text>
          <text class="location">{{ course.location }}</text>
          <text class="teacher">{{ course.teacher }}</text>
        </view>
        <button class="book-btn" :class="course.status" @tap="bookCourse(course)">
          {{ getStatusText(course.status) }}
        </button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const courses = ref([
  {
    id: 1,
    name: 'JAZZ基础班',
    time: '周一 19:00-20:30',
    location: 'A教室',
    teacher: 'APHRODITE',
    status: 'available'
  },
  // ... 更多课程数据
])

const getStatusText = (status) => {
  const statusMap = {
    'available': '预约',
    'full': '已满',
    'booked': '已预约'
  }
  return statusMap[status]
}

const bookCourse = (course) => {
  if (course.status === 'available') {
    uni.showModal({
      title: '预约确认',
      content: `确定要预约${course.name}吗？`,
      success: (res) => {
        if (res.confirm) {
          // 处理预约逻辑
          uni.showToast({
            title: '预约成功',
            icon: 'success'
          })
        }
      }
    })
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

.course-list {
  .course-item {
    background: rgba(255,255,255,0.1);
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;
    
    .course-info {
      margin-bottom: 20rpx;
      
      .name {
        color: #fff;
        font-size: 32rpx;
        font-weight: 600;
        display: block;
        margin-bottom: 10rpx;
      }
      
      .time, .location, .teacher {
        color: rgba(255,255,255,0.6);
        font-size: 26rpx;
        display: block;
        margin-bottom: 8rpx;
      }
    }
    
    .book-btn {
      width: 160rpx;
      height: 60rpx;
      line-height: 60rpx;
      border-radius: 100rpx;
      font-size: 26rpx;
      text-align: center;
      
      &.available {
        background: #FF4D8F;
        color: #fff;
      }
      
      &.full {
        background: rgba(255,255,255,0.2);
        color: rgba(255,255,255,0.6);
      }
      
      &.booked {
        background: #2DD4BF;
        color: #fff;
      }
    }
  }
}
</style> 