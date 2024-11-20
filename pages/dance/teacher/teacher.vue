<template>
  <view class="container">
    <view class="header">
      <view class="back-btn" @tap="handleBack">
        <text class="icon-back">←</text>
      </view>
      <text class="title">明星导师</text>
    </view>
    
    <view class="teacher-grid">
      <view class="teacher-item" v-for="teacher in teachers" :key="teacher.id" @tap="goToDetail(teacher)">
        <image class="avatar" :src="teacher.avatar" mode="aspectFill"></image>
        <text class="name">{{ teacher.name }}</text>
        <text class="en-name">{{ teacher.enName }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const teachers = ref([
  { id: 1, name: 'APHRODITE', enName: 'APHRODITE', avatar: '/static/images/teachers/aphrodite.jpg' },
  { id: 2, name: 'CHERRY', enName: 'CHERRY', avatar: '/static/images/teachers/cherry.jpg' },
  { id: 3, name: 'DEVIN PORNEL', enName: 'DEVIN PORNEL', avatar: '/static/images/teachers/devin.jpg' },
  { id: 4, name: 'DOYUN', enName: 'DOYUN', avatar: '/static/images/teachers/doyun.jpg' },
  { id: 5, name: 'JUNHO LEE', enName: 'JUNHO LEE', avatar: '/static/images/teachers/junho.jpg' },
  { id: 6, name: 'MAAIN', enName: 'MAAIN', avatar: '/static/images/teachers/maain.jpg' },
  { id: 7, name: 'MARLEE HIGHTOWER', enName: 'MARLEE HIGHTOWER', avatar: '/static/images/teachers/marlee.jpg' },
  { id: 8, name: 'MONROE', enName: 'MONROE', avatar: '/static/images/teachers/monroe.jpg' },
  { id: 9, name: 'NANACO', enName: 'NANACO', avatar: '/static/images/teachers/nanaco.jpg' },
  { id: 10, name: 'NEMA', enName: 'NEMA', avatar: '/static/images/teachers/nema.jpg' },
  { id: 11, name: 'ONELOVE', enName: 'ONELOVE', avatar: '/static/images/teachers/onelove.jpg' },
  { id: 12, name: 'semi', enName: 'semi', avatar: '/static/images/teachers/semi.jpg' },
  { id: 13, name: 'SHOHEI', enName: 'SHOHEI', avatar: '/static/images/teachers/shohei.jpg' },
  { id: 14, name: 'WOOTAE', enName: 'WOOTAE', avatar: '/static/images/teachers/wootae.jpg' },
  { id: 15, name: 'YECHAN', enName: 'YECHAN', avatar: '/static/images/teachers/yechan.jpg' },
  { id: 16, name: 'YEJUN', enName: 'YEJUN', avatar: '/static/images/teachers/yejun.jpg' },
  { id: 17, name: '绵羊', enName: '', avatar: '/static/images/teachers/mianyang.jpg' }
])

const goToDetail = (teacher) => {
  uni.navigateTo({
    url: `/pages/dance/teacher/detail?id=${teacher.id}`
  })
}

const handleBack = () => {
  uni.navigateBack({
    delta: 1
  })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #1C1B21;
  padding: 30rpx;
}

.header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20rpx 40rpx;
  
  .back-btn {
    position: absolute;
    left: 30rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64rpx;
    height: 64rpx;
    
    .icon-back {
      font-size: 40rpx;
      color: #fff;
    }
  }
  
  .title {
    font-size: 36rpx;
    font-weight: 600;
    color: #fff;
  }
}

.teacher-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr); // 每行5个
  gap: 30rpx;
  padding: 20rpx 0;
  
  .teacher-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .avatar {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      margin-bottom: 16rpx;
    }
    
    .name {
      color: #fff;
      font-size: 24rpx;
      text-align: center;
      margin-bottom: 4rpx;
    }
    
    .en-name {
      color: rgba(255, 255, 255, 0.5);
      font-size: 20rpx;
      text-align: center;
    }
  }
}

// 响应式布局
@media screen and (max-width: 768px) {
  .teacher-grid {
    grid-template-columns: repeat(3, 1fr); // 较小屏幕每行3个
  }
}
</style>
