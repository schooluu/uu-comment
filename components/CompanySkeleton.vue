<template>
  <view class="skeleton-card glass-effect">
    <view class="card-header">
      <view class="company-name skeleton-bg"></view>
      <view class="rating-wrapper">
        <view class="rating skeleton-bg"></view>
      </view>
    </view>

    <view class="card-content">
      <view class="cons-box skeleton-bg"></view>
    </view>

    <view class="card-footer">
      <view class="stats">
        <view class="stat-item skeleton-bg"></view>
        <view class="stat-item skeleton-bg"></view>
        <view class="date skeleton-bg"></view>
      </view>
      <view class="city-tag skeleton-bg"></view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.skeleton-card {
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;

    .company-name {
      width: 200rpx;
      height: 32rpx;
    }

    .rating {
      width: 120rpx;
      height: 28rpx;
    }
  }

  .cons-box {
    height: 120rpx;
    border-radius: 12rpx;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20rpx;

    .stats {
      display: flex;
      align-items: center;
      gap: 20rpx;

      .stat-item {
        width: 80rpx;
        height: 24rpx;
      }

      .date {
        width: 120rpx;
        height: 24rpx;
        margin-left: 20rpx;
      }
    }

    .city-tag {
      width: 100rpx;
      height: 36rpx;
      border-radius: 4rpx;
    }
  }
}

.skeleton-bg {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
}

@keyframes shimmer {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style> 