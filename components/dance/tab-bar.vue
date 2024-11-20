<template>
  <view class="tab-bar">
    <view 
      v-for="item in tabBarItems" 
      :key="item.id"
      class="tab-item"
      :class="{ active: current === item.path }"
      @tap="switchTab(item.path)"
    >
      <text class="text">{{ item.name }}</text>
      <view class="indicator" v-if="current === item.path"></view>
    </view>
  </view>
</template>

<script setup>
import { ref, defineProps } from 'vue'

// 定义 props
const props = defineProps({
  current: {
    type: String,
    required: true
  }
})

// 导航项数据
const tabBarItems = ref([
  { id: 1, name: '首页', path: '/pages/dance/home/index' },
  { id: 2, name: '课程', path: '/pages/dance/course/index' },
  { id: 4, name: '我的', path: '/pages/dance/my/index' }
])

// 切换导航方法
const switchTab = (path) => {
  uni.navigateTo({
    url: path
  })
}
</script>

<style lang="scss">
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;

  backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 2rpx solid rgba(255, 255, 255, 0.1);
  z-index: 100;
  
  .tab-item {
    position: relative;
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
    
    .text {
      font-size: 28rpx;
      color: rgba(255, 255, 255, 0.6);
      transition: all 0.3s ease;
      transform: translateY(0);
    }
    
    .indicator {
      position: absolute;
      bottom: 12rpx;
      width: 40rpx;
      height: 4rpx;
      background: #FF4D8F;
      border-radius: 4rpx;
      transform-origin: center;
      animation: indicatorIn 0.3s ease-out forwards;
    }
    
    &.active {
      .text {
        color: #FF4D8F;
        font-weight: 500;
        transform: translateY(-6rpx);
      }
    }
    
    &:active {
      transform: scale(0.95);
    }
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      background: rgba(255, 77, 143, 0.1);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.3s ease;
      opacity: 0;
    }
    
    &:hover {
      &::after {
        width: 80rpx;
        height: 80rpx;
        opacity: 1;
      }
      
      .text {
        color: rgba(255, 255, 255, 0.8);
      }
      
      &.active .text {
        color: #FF4D8F;
      }
    }
  }
}

@keyframes indicatorIn {
  from {
    transform: scaleX(0);
    opacity: 0;
  }
  to {
    transform: scaleX(1);
    opacity: 1;
  }
}

// 适配底部安全区
@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .tab-bar {
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style> 