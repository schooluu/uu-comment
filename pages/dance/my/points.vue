<template>
  <view class="container">
    <view class="header">
      <view class="points-info">
        <text class="label">我的积分</text>
        <text class="value">{{ userPoints }}</text>
      </view>
      <navigator url="/pages/dance/my/points-rule" class="rule-link">
        积分规则
      </navigator>
    </view>
    
    <!-- 兑换商品列表 -->
    <view class="goods-list">
      <view class="goods-item" v-for="item in goods" :key="item.id">
        <image class="image" :src="item.image" mode="aspectFill"></image>
        <view class="info">
          <text class="name">{{ item.name }}</text>
          <text class="desc">{{ item.description }}</text>
          <view class="bottom">
            <text class="points">{{ item.points }}积分</text>
            <button 
              class="exchange-btn" 
              :class="{ disabled: userPoints < item.points }"
              @tap="exchange(item)"
            >
              立即兑换
            </button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const userPoints = ref(1500)

const goods = ref([
  {
    id: 1,
    name: '单节课程体验券',
    description: '可用于任意常规课程',
    points: 1000,
    image: '/static/images/points/course.jpg'
  },
  {
    id: 2,
    name: 'FancyFancy限定T恤',
    description: '2024春季新款',
    points: 2000,
    image: '/static/images/points/tshirt.jpg'
  }
])

const exchange = (item) => {
  if (userPoints.value < item.points) {
    uni.showToast({
      title: '积分不足',
      icon: 'none'
    })
    return
  }
  
  uni.showModal({
    title: '兑换确认',
    content: `确定使用${item.points}积分兑换${item.name}吗？`,
    success: (res) => {
      if (res.confirm) {
        // 处理兑换逻辑
        userPoints.value -= item.points
        uni.showToast({
          title: '兑换成功',
          icon: 'success'
        })
      }
    }
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40rpx;
  
  .points-info {
    .label {
      color: rgba(255,255,255,0.6);
      font-size: 28rpx;
      margin-right: 20rpx;
    }
    
    .value {
      color: #FF4D8F;
      font-size: 48rpx;
      font-weight: 600;
    }
  }
  
  .rule-link {
    color: #fff;
    font-size: 28rpx;
    padding: 10rpx 30rpx;
    background: rgba(255,255,255,0.1);
    border-radius: 100rpx;
  }
}

.goods-list {
  .goods-item {
    background: rgba(255,255,255,0.1);
    border-radius: 20rpx;
    overflow: hidden;
    margin-bottom: 30rpx;
    
    .image {
      width: 100%;
      height: 300rpx;
    }
    
    .info {
      padding: 30rpx;
      
      .name {
        color: #fff;
        font-size: 32rpx;
        font-weight: 600;
        margin-bottom: 12rpx;
        display: block;
      }
      
      .desc {
        color: rgba(255,255,255,0.6);
        font-size: 26rpx;
        margin-bottom: 20rpx;
        display: block;
      }
      
      .bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .points {
          color: #FF4D8F;
          font-size: 32rpx;
          font-weight: 600;
        }
        
        .exchange-btn {
          width: 160rpx;
          height: 60rpx;
          line-height: 60rpx;
          background: #FF4D8F;
          color: #fff;
          font-size: 26rpx;
          border-radius: 100rpx;
          
          &.disabled {
            background: rgba(255,255,255,0.2);
            color: rgba(255,255,255,0.6);
          }
        }
      }
    }
  }
}
</style> 