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
  { id: 1, name: 'XXX', enName: 'XXX', avatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png' },
  { id: 2, name: 'XX', enName: 'X', avatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png' },
  { id: 3, name: 'XX PORNEL', enName: 'DEVIN XXX', avatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png' },
  { id: 4, name: 'XX', enName: 'XX', avatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png' },
  { id: 5, name: 'XX LEE', enName: 'XX LEE', avatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png' },
  { id: 6, name: 'XX', enName: 'MAAIN', avatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png' },
  { id: 7, name: 'XX HIGHTOWER', enName: 'MARLEE HIGHTOWER', avatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png' },
  { id: 8, name: 'XX', enName: 'MONROE', avatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png' },
  { id: 9, name: 'XXX', enName: 'XX', avatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png' },
  { id: 10, name: 'XX', enName: 'NEMA', avatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png' },
  { id: 11, name: 'OXXNELOVE', enName: 'XX', avatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png' },
  { id: 12, name: 'sXXemi', enName: 'XXX', avatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png' },
  { id: 13, name: 'X', enName: 'XXXX', avatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png' },
  { id: 14, name: 'WXXOOTAE', enName: 'XX', avatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png' },
  { id: 15, name: 'YXXECHAN', enName: 'XX', avatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png' },
  { id: 16, name: 'XX', enName: 'X', avatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png' },
  { id: 17, name: 'X', enName: '', avatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/rain.png' }
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
  background-color: #141123f5;
  padding: 30rpx;
  opacity: 0;
  animation: fadeIn 1s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
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
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }

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
