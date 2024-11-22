<template>
  <view class="shop-container">
    <!-- 顶部banner -->
    <view class="banner">
      <image 
        src="https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg"
        mode="aspectFill"
        class="banner-image"
      />
      <!-- 添加渐变遮罩 -->
      <view class="banner-overlay"></view>
    </view>
    
    <!-- 功能区 -->
    <view class="feature-grid glass-effect">
      <view class="feature-item" v-for="(item, index) in features" :key="index" @tap="handleFeatureClick(index)">
        <view class="icon-wrapper">
          <text class="emoji">{{ item.icon }}</text>
        </view>
        <text class="feature-text">{{ item.text }}</text>
        <text class="feature-desc">{{ item.desc }}</text>
      </view>
    </view>
    
    <!-- 积分区域 -->
    <view class="points-card glass-effect" @tap="handlePointsClick">
      <view class="points-info">
        <text class="points-label">我的积分</text>
        <text class="points-value">63</text>
      </view>
      <text class="points-desc">可兑换奖券和丰富奖励功能</text>
      <view class="points-btn">立即查看 →</view>
    </view>
    
    <!-- 底部导航 -->
    <view class="tab-bar glass-effect">
      <view class="tab-item" 
        v-for="(tab, index) in tabs" 
        :key="index"
        :class="{ active: currentTab === index }"
        @tap="switchTab(index)"
      >
        <text class="emoji">{{ tab.icon }}</text>
        <text class="tab-text">{{ tab.text }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const currentTab = ref(0)

// 处理底部标签栏切换
const switchTab = (index) => {
  currentTab.value = index
  
  // 根据不同的标签跳转到对应页面
  switch(index) {
    case 0: // 首页
      uni.switchTab({
        url: '/pages/shop/home/index'
      })
      break
    case 1: // 点单
      uni.navigateTo({
        url: '/pages/shop/store/list'
      })
      break
    case 2: // 购物车
      uni.navigateTo({
        url: '/pages/shop/cart/index'
      })
      break
    case 3: // 礼品
      uni.navigateTo({
        url: '/pages/shop/gift/index'
      })
      break
    case 4: // 我的
      uni.navigateTo({
        url: '/pages/shop/user/index'
      })
      break
  }
}

// 处理功能区点击
const handleFeatureClick = (index) => {
  switch(index) {
    case 0: // 门店自取
      uni.navigateTo({
        url: '/pages/shop/store/list'
      })
      break
    case 1: // 外卖
      uni.navigateTo({
        url: '/pages/shop/store/list'
      })
      break
    case 2: // 喜茶百货
      uni.navigateTo({
        url: '/pages/shop/mall/index'
      })
      break
    case 3: // 企业团餐
      uni.navigateTo({
        url: '/pages/shop/group/index'
      })
      break
  }
}

// 处理积分卡片点击
const handlePointsClick = () => {
  uni.navigateTo({
    url: '/pages/shop/points/index'
  })
}

const features = [
  { 
    icon: '🏪',
    text: '门店自取',
    desc: '下单免排队'
  },
  {
    icon: '🛵',
    text: '外卖',
    desc: '无需接触 送至到家'
  },
  {
    icon: '🎁',
    text: '喜茶百货',
    desc: '甄选好物 正品保障'
  },
  {
    icon: '🏢',
    text: '企业团餐',
    desc: '50份起送'
  }
]

const tabs = [
  { icon: '🏠', text: '首页' },
  { icon: '📋', text: '点单' },
  { icon: '🛒', text: '购物车' },
  { icon: '🎁', text: '礼品' },
  { icon: '👤', text: '我的' }
]
</script>

<style lang="scss" scoped>
.shop-container {
  min-height: 100vh;
  background: #f8f9fa;
  
  .banner {
    width: 100%;
    height: 400rpx;
    position: relative;
    overflow: hidden;
    
    .banner-image {
      width: 100%;
      height: 100%;
      transform: scale(1.05);
      transition: transform 0.3s ease;
    }
    
    .banner-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 160rpx;
      background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.2));
    }
  }
  
  // 玻璃拟态效果
  .glass-effect {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  
  .feature-grid {
    margin: -60rpx 30rpx 0;
    padding: 30rpx;
    border-radius: 24rpx;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30rpx;
    box-shadow: 0 8rpx 32rpx rgba(0,0,0,0.08);
    position: relative;
    
    .feature-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 30rpx;
      border-radius: 16rpx;
      transition: all 0.3s ease;
      
      &:active {
        transform: scale(0.98);
        background: rgba(0,0,0,0.02);
      }
      
      .icon-wrapper {
        width: 100rpx;
        height: 100rpx;
        background: rgba(var(--theme-rgb, 0,0,0), 0.05);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20rpx;
        
        .emoji {
          font-size: 48rpx;
        }
      }
      
      .feature-text {
        font-size: 30rpx;
        font-weight: 500;
        color: #333;
        margin-bottom: 8rpx;
      }
      
      .feature-desc {
        font-size: 24rpx;
        color: #666;
        text-align: center;
      }
    }
  }
  
  .points-card {
    margin: 30rpx;
    padding: 40rpx;
    border-radius: 24rpx;
    box-shadow: 0 8rpx 32rpx rgba(0,0,0,0.08);
    
    .points-info {
      display: flex;
      align-items: baseline;
      margin-bottom: 12rpx;
      
      .points-label {
        font-size: 30rpx;
        color: #333;
        margin-right: 20rpx;
      }
      
      .points-value {
        font-size: 48rpx;
        color: var(--theme-color, #e4393c);
        font-weight: bold;
      }
    }
    
    .points-desc {
      font-size: 26rpx;
      color: #666;
      margin-bottom: 20rpx;
    }
    
    .points-btn {
      display: inline-block;
      padding: 12rpx 30rpx;
      border-radius: 100rpx;
      background: var(--theme-color, #e4393c);
      color: #fff;
      font-size: 26rpx;
      transition: all 0.3s ease;
      
      &:active {
        transform: scale(0.98);
        opacity: 0.9;
      }
    }
  }
  
  .tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 120rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0 -4rpx 16rpx rgba(0,0,0,0.05);
    
    .tab-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10rpx 0;
      transition: all 0.3s ease;
      
      .emoji {
        font-size: 44rpx;
        color: #666;
        margin-bottom: 6rpx;
      }
      
      .tab-text {
        font-size: 22rpx;
        color: #666;
      }
      
      &.active {
        .emoji, .tab-text {
          color: var(--theme-color, #e4393c);
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>
