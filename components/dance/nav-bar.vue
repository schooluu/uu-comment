<template>
  <view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
    <!-- 左侧返回按钮 -->
    <view class="left" v-if="showBack" @tap="goBack">
      <text class="back-icon">←</text>
    </view>
    
    <!-- 中间标题 -->
    <text class="title">{{ title }}</text>
    
    <!-- 右侧按钮 -->
    <view class="right">
      <slot name="right"></slot>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  showBack: {
    type: Boolean,
    default: true
  }
})

const statusBarHeight = ref(uni.getSystemInfoSync().statusBarHeight)

const goBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss">
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 88rpx;
  background: #1C1B21;
  display: flex;
  align-items: center;
  padding: 0 30rpx;
  
  .left {
    width: 88rpx;
    
    .back-icon {
      color: #fff;
      font-size: 40rpx;
    }
  }
  
  .title {
    flex: 1;
    text-align: center;
    color: #fff;
    font-size: 32rpx;
    font-weight: 600;
  }
  
  .right {
    width: 88rpx;
    display: flex;
    justify-content: flex-end;
  }
}
</style> 