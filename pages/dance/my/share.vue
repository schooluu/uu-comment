<template>
  <view class="container">
    <view class="header">
      <text class="title">分享</text>
    </view>
    
    <!-- 分享卡片 -->
    <view class="share-card">
      <image class="qrcode" :src="qrcode" mode="aspectFit"></image>
      <text class="tips">扫描二维码，加入FancyFancy</text>
    </view>
    
    <!-- 分享方式 -->
    <view class="share-methods">
      <view class="method-item" v-for="method in shareMethods" :key="method.id" @tap="share(method)">
        <image class="icon" :src="method.icon" mode="aspectFit"></image>
        <text class="name">{{ method.name }}</text>
      </view>
    </view>
    
    <!-- 分享奖励说明 -->
    <view class="reward-info">
      <text class="title">分享奖励</text>
      <view class="reward-item" v-for="(reward, index) in rewards" :key="index">
        <text class="dot">•</text>
        <text class="text">{{ reward }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const qrcode = ref('/static/images/qrcode.jpg')

const shareMethods = ref([
  {
    id: 1,
    name: '微信好友',
    icon: '/static/icons/wechat.png'
  },
  {
    id: 2,
    name: '朋友圈',
    icon: '/static/icons/moments.png'
  },
  {
    id: 3,
    name: '保存图片',
    icon: '/static/icons/save.png'
  }
])

const rewards = ref([
  '每成功邀请1位好友注册，获得100积分奖励',
  '好友首次购课，您可获得课程金额5%的积分奖励',
  '积分可用于兑换课程、周边商品等'
])

const share = (method) => {
  // 处理不同的分享方式
  switch(method.id) {
    case 1:
      // 分享给微信好友
      break
    case 2:
      // 分享到朋友圈
      break
    case 3:
      // 保存图片
      uni.saveImageToPhotosAlbum({
        filePath: qrcode.value,
        success: () => {
          uni.showToast({
            title: '保存成功',
            icon: 'success'
          })
        }
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

.share-card {
  background: rgba(255,255,255,0.1);
  border-radius: 20rpx;
  padding: 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40rpx;
  
  .qrcode {
    width: 400rpx;
    height: 400rpx;
    margin-bottom: 20rpx;
  }
  
  .tips {
    color: rgba(255,255,255,0.6);
    font-size: 28rpx;
  }
}

.share-methods {
  display: flex;
  justify-content: space-around;
  margin-bottom: 60rpx;
  
  .method-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .icon {
      width: 100rpx;
      height: 100rpx;
      margin-bottom: 16rpx;
    }
    
    .name {
      color: #fff;
      font-size: 28rpx;
    }
  }
}

.reward-info {
  background: rgba(255,255,255,0.1);
  border-radius: 20rpx;
  padding: 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40rpx;
  
  .title {
    color: #fff;
    font-size: 32rpx;
    font-weight: 600;
    margin-bottom: 20rpx;
  }
  
  .reward-item {
    display: flex;
    align-items: center;
    margin-bottom: 16rpx;
    
    .dot {
      color: #FF4D8F;
      font-size: 28rpx;
      margin: 0 8rpx;
    }
    
    .text {
      color: rgba(255,255,255,0.6);
      font-size: 26rpx;
    }
  }
}
</style> 