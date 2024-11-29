<template>
  <view class="tab-bar">
    <view 
      v-for="(tab, index) in tabs" 
      :key="index"
      class="tab-item"
      :class="{ active: current === tab.path }"
      @tap="switchTab(tab.path)"
    >
      <text class="text">{{ tab.text }}</text>
      <view class="indicator" v-if="current === tab.path"></view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  current: {
    type: String,
    default: '/pages/school/home/index'
  }
})

const tabs = ref([
  { text: '首页', path: '/pages/school/home/index' },
  { text: '论坛', path: '/pages/school/forum/index' },
  { text: '订单', path: '/pages/school/order/index' },
  { text: '我的', path: '/pages/school/my/index' }
])

const switchTab = (path) => {
  if (props.current === path) return
  uni.switchTab({ url: path })
}
</script>

<style lang="scss" scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 2rpx solid rgba(0, 0, 0, 0.05);
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
      color: rgba(0, 0, 0, 0.6);
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
        color: rgba(0, 0, 0, 0.8);
      }
      
      &.active .text {
        color: #FF4D8F;
      }
    }
  }
}

@keyframes indicatorIn {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 40rpx;
    opacity: 1;
  }
}
</style> 