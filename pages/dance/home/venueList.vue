<template>
  <view class="venue-container">
      <!-- 顶部导航栏 -->
      <view class="nav-bar">
      <view class="back-btn" @tap="handleBack">
        <text class="iconfont">←</text>
      </view>
      <text class="title">场馆列表</text>
    </view>

    <view class="venue-list">
      <view class="venue-item" v-for="(venue, index) in venues" :key="index" @tap="goToDetail(venue)">
        <image class="venue-image" :src="venue.image" mode="aspectFill"></image>
        <view class="venue-info">
          <text class="venue-name">{{ venue.name }}</text>
          <text class="venue-address">{{ venue.address }}</text>
          <view class="venue-tags">
            <text class="tag" v-for="(tag, idx) in venue.tags" :key="idx">{{ tag }}</text>
          </view>
        </view>
        <view class="favorite-btn" @tap.stop="toggleFavorite(venue)">
          <icon :type="venue.isFavorite ? 'heart' : 'heart-o'" size="40" :color="venue.isFavorite ? '#FF4D8F' : '#fff'"></icon>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const venues = ref([
  {
    id: 1,
    name: 'xxxxxxx舞室大悦城店',
    address: '上海市静安区天xxxxx室',
    image: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/venue1.jpg',
    tags: ['停车方便', '地铁直达', '设施齐全'],
    isFavorite: false
  },
  {
    id: 2,
    name: 'XXXX舞室嘉里合集店',
    address: '上海市静安区天xxxxx室',
    image: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/venue2.jpg',
    tags: ['新店开业', '环境优雅', '交通便利'],
    isFavorite: false
  }
])

const goToDetail = (venue) => {
  uni.navigateTo({
    url: `/pages/dance/home/venueDetail?id=${venue.id}`
  })
}

const toggleFavorite = (venue) => {
  venue.isFavorite = !venue.isFavorite
}
const handleBack = () => {
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
  display: flex;
  align-items: center;
  justify-content: center;
  height: 88rpx;
  background-color: #141123f5;
  backdrop-filter: blur(10px);
  
  .back-btn {
    position: absolute;
    left: 30rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64rpx;
    height: 64rpx;
    padding: 10rpx;
    
    .iconfont {
      font-size: 40rpx;
      color: #fff;
    }
    
    &:active {
      opacity: 0.8; // 点击反馈
    }
  }
  
  .title {
    font-size: 32rpx;
    color: #fff;
    font-weight: 500;
  }
}
.venue-container {
  min-height: 100vh;
  background-color: #141123f5;
  padding: 30rpx;
  padding-top: 118rpx;
}

.venue-list {
  .venue-item {
    position: relative;
    margin-bottom: 30rpx;
    border-radius: 20rpx;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .venue-image {
      width: 100%;
      height: 300rpx;
      opacity: 0;
      animation: fadeIn 0.5s forwards;
    }

    .venue-info {
      padding: 20rpx;

      .venue-name {
        color: #fff;
        font-size: 32rpx;
        font-weight: 600;
        margin-bottom: 10rpx;
      }

      .venue-address {
        color: rgba(255, 255, 255, 0.6);
        font-size: 24rpx;
        margin-bottom: 16rpx;
      }

      .venue-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 10rpx;

        .tag {
          font-size: 22rpx;
          color: #FF4D8F;
          background: rgba(255, 77, 143, 0.1);
          padding: 4rpx 16rpx;
          border-radius: 100rpx;
        }
      }
    }

    .favorite-btn {
      position: absolute;
      top: 20rpx;
      right: 20rpx;
      width: 80rpx;
      height: 80rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 50%;
    }
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
</style> 