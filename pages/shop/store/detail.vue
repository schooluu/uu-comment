<template>
  <view class="store-detail">
    <!-- 门店图片轮播 -->
    <swiper 
      class="store-swiper" 
      :indicator-dots="true"
      :autoplay="true"
      interval="5000"
      circular
    >
      <swiper-item v-for="(image, index) in storeInfo.images" :key="index">
        <image :src="image" mode="aspectFill" class="swiper-image"/>
      </swiper-item>
    </swiper>
    
    <!-- 门店基本信息 -->
    <view class="store-info glass-effect">
      <view class="store-header">
        <view class="left">
          <text class="store-name">{{ storeInfo.name }}</text>
          <view class="rating">
            <text class="stars">⭐️⭐️⭐️⭐️⭐️</text>
            <text class="score">{{ storeInfo.rating }}</text>
            <text class="reviews">({{ storeInfo.reviewCount }}条评价)</text>
          </view>
        </view>
        <view class="status-tag" :class="storeInfo.status">
          {{ storeInfo.statusText }}
        </view>
      </view>
      
      <view class="info-row" @tap="navigate">
        <text class="label">门店地址</text>
        <view class="value address">
          <text>{{ storeInfo.address }}</text>
          <text class="distance">{{ storeInfo.distance }}km</text>
          <text class="nav-icon">📍</text>
        </view>
      </view>
      
      <view class="info-row">
        <text class="label">营业时间</text>
        <text class="value">{{ storeInfo.businessHours }}</text>
      </view>
      
      <view class="info-row">
        <text class="label">联系电话</text>
        <text class="value phone" @tap="makeCall">{{ storeInfo.phone }}</text>
      </view>
    </view>
    
    <!-- 门店特色 -->
    <view class="features glass-effect">
      <view class="section-title">门店特色</view>
      <view class="feature-grid">
        <view 
          class="feature-item"
          v-for="feature in storeInfo.features"
          :key="feature.name"
        >
          <text class="feature-icon">{{ feature.icon }}</text>
          <text class="feature-name">{{ feature.name }}</text>
        </view>
      </view>
    </view>
    
    <!-- 门店公告 -->
    <view class="notice glass-effect" v-if="storeInfo.notice">
      <view class="section-title">门店公告</view>
      <text class="notice-content">{{ storeInfo.notice }}</text>
    </view>
    
    <!-- 热门商品 -->
    <view class="hot-products glass-effect">
      <view class="section-title">热门商品</view>
      <scroll-view 
        class="products-scroll" 
        scroll-x 
        :show-scrollbar="false"
        enhanced
      >
        <view class="product-list">
          <view 
            class="product-card"
            v-for="product in storeInfo.hotProducts"
            :key="product.id"
            @tap="goToProduct(product)"
          >
            <image :src="product.image" mode="aspectFill" class="product-image"/>
            <text class="product-name">{{ product.name }}</text>
            <text class="product-price">¥{{ product.price }}</text>
          </view>
        </view>
      </scroll-view>
    </view>
    
    <!-- 用户评价 -->
    <view class="reviews glass-effect">
      <view class="section-header">
        <text class="section-title">用户评价</text>
        <text class="view-all" @tap="viewAllReviews">查看全部 →</text>
      </view>
      <view 
        class="review-item"
        v-for="review in storeInfo.reviews"
        :key="review.id"
      >
        <view class="reviewer-info">
          <image :src="review.avatar" class="avatar"/>
          <text class="name">{{ review.name }}</text>
          <text class="time">{{ review.time }}</text>
        </view>
        <view class="review-rating">
          <text class="stars">{{ '⭐️'.repeat(review.rating) }}</text>
          <text class="rating-text">{{ review.ratingText }}</text>
        </view>
        <text class="review-content">{{ review.content }}</text>
        <view class="review-images" v-if="review.images?.length">
          <image 
            v-for="(image, index) in review.images"
            :key="index"
            :src="image"
            mode="aspectFill"
            class="review-image"
            @tap="previewImage(review.images, index)"
          />
        </view>
      </view>
    </view>
    
    <!-- 底部操作栏 -->
    <view class="action-bar glass-effect">
      <button class="share-btn" @tap="shareStore">
        <text class="icon">📤</text>
        <text>分享</text>
      </button>
      <button class="primary-btn" @tap="placeOrder">
        {{ storeInfo.status === 'closed' ? '已打烊' : '去下单' }}
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 门店详情数据
const storeInfo = ref({
  id: 1,
  name: '喜茶北京三里屯店',
  images: [
    'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
    'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
    'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg'
  ],
  rating: 4.8,
  reviewCount: 2580,
  status: 'open',
  statusText: '营业中',
  address: '北京市朝阳区三里屯太古里北区N8-B1-3',
  distance: 0.8,
  businessHours: '10:00-22:00',
  phone: '010-12345678',
  features: [
    { icon: '🚗', name: '停车场' },
    { icon: '🔋', name: '充电宝' },
    { icon: '📶', name: 'WIFI' },
    { icon: '🎫', name: '礼品卡' },
    { icon: '🧊', name: '店内取餐' },
    { icon: '🛵', name: '外卖配送' }
  ],
  notice: '本店新推出夏日特饮系列，欢迎品尝！',
  hotProducts: [
    {
      id: 1,
      name: '多肉葡萄',
      price: '32',
      image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg'
    },
    // ... 更多商品
  ],
  reviews: [
    {
      id: 1,
      avatar: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
      name: '张三',
      time: '2024-01-20',
      rating: 5,
      ratingText: '非常满意',
      content: '店员服务很好，饮品口感一如既往的赞！',
      images: [
        'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
        'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg'
      ]
    },
    // ... 更多评价
  ],
  latitude: 39.934,
  longitude: 116.455
})

// 导航到店
const navigate = () => {
  uni.openLocation({
    latitude: storeInfo.value.latitude,
    longitude: storeInfo.value.longitude,
    name: storeInfo.value.name,
    address: storeInfo.value.address
  })
}

// 拨打电话
const makeCall = () => {
  uni.makePhoneCall({
    phoneNumber: storeInfo.value.phone
  })
}

// 查看商品详情
const goToProduct = (product) => {
  uni.navigateTo({
    url: `/pages/shop/product/detail?id=${product.id}`
  })
}

// 查看所有评价
const viewAllReviews = () => {
  uni.navigateTo({
    url: `/pages/shop/store/reviews?id=${storeInfo.value.id}`
  })
}

// 预览图片
const previewImage = (images, current) => {
  uni.previewImage({
    urls: images,
    current: images[current]
  })
}

// 分享门店
const shareStore = () => {
  uni.share({
    provider: 'weixin',
    scene: 'WXSceneSession',
    type: 0,
    title: storeInfo.value.name,
    summary: `欢迎光临${storeInfo.value.name}`,
    imageUrl: storeInfo.value.images[0],
    success: function (res) {
      console.log('分享成功：', res)
    }
  })
}

// 去下单
const placeOrder = () => {
  if (storeInfo.value.status === 'closed') return
  uni.navigateTo({
    url: `/pages/shop/order/create?storeId=${storeInfo.value.id}`
  })
}

onMounted(() => {
  // TODO: 根据路由参数获取门店详情
})
</script>

<style lang="scss">
// Mixins
@mixin text-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

@mixin glass-effect {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.05);
}

.store-detail {
  min-height: 100vh;
  background: #f8f9fa;
  padding-bottom: 120rpx;
  
  .store-swiper {
    height: 500rpx;
    
    .swiper-image {
      width: 100%;
      height: 100%;
    }
  }
  
  .glass-effect {
    @include glass-effect;
    padding: 30rpx;
    margin: 20rpx;
  }
  
  .store-info {
    margin-top: -60rpx;
    position: relative;
    z-index: 1;
    
    .store-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 30rpx;
      
      .store-name {
        font-size: 36rpx;
        font-weight: 600;
        margin-bottom: 12rpx;
      }
      
      .rating {
        display: flex;
        align-items: center;
        gap: 8rpx;
        
        .stars {
          font-size: 24rpx;
        }
        
        .score {
          font-size: 24rpx;
          color: #ff9800;
        }
        
        .reviews {
          font-size: 24rpx;
          color: #999;
        }
      }
      
      .status-tag {
        padding: 8rpx 20rpx;
        border-radius: 100rpx;
        font-size: 24rpx;
        
        &.open {
          background: #e8f5e9;
          color: #4caf50;
        }
        
        &.busy {
          background: #fff3e0;
          color: #ff9800;
        }
        
        &.closed {
          background: #f5f5f5;
          color: #999;
        }
      }
    }
    
    .info-row {
      display: flex;
      margin-bottom: 20rpx;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .label {
        width: 140rpx;
        font-size: 28rpx;
        color: #666;
      }
      
      .value {
        flex: 1;
        font-size: 28rpx;
        
        &.address {
          display: flex;
          align-items: center;
          gap: 12rpx;
          
          .distance {
            color: #999;
          }
          
          .nav-icon {
            font-size: 32rpx;
          }
        }
        
        &.phone {
          color: var(--theme-color, #e4393c);
        }
      }
    }
  }
  
  .features {
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 30rpx;
      
      .feature-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        
        .feature-icon {
          font-size: 48rpx;
          margin-bottom: 12rpx;
        }
        
        .feature-name {
          font-size: 26rpx;
          color: #666;
        }
      }
    }
  }
  
  .section-title {
    font-size: 32rpx;
    font-weight: 500;
    margin-bottom: 24rpx;
  }
  
  .notice {
    .notice-content {
      font-size: 28rpx;
      color: #666;
      line-height: 1.6;
    }
  }
  
  .hot-products {
    .products-scroll {
      .product-list {
        display: flex;
        padding: 10rpx 0;
        
        .product-card {
          margin-right: 24rpx;
          width: 240rpx;
          
          &:last-child {
            margin-right: 0;
          }
          
          .product-image {
            width: 240rpx;
            height: 240rpx;
            border-radius: 12rpx;
            margin-bottom: 16rpx;
          }
          
          .product-name {
            font-size: 28rpx;
            margin-bottom: 8rpx;
            @include text-ellipsis;
          }
          
          .product-price {
            font-size: 32rpx;
            color: var(--theme-color, #e4393c);
            font-weight: 500;
          }
        }
      }
    }
  }
  
  .reviews {
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24rpx;
      
      .view-all {
        font-size: 26rpx;
        color: #666;
      }
    }
    
    .review-item {
      padding: 24rpx 0;
      border-bottom: 1rpx solid rgba(0,0,0,0.05);
      
      &:last-child {
        border-bottom: none;
        padding-bottom: 0;
      }
      
      .reviewer-info {
        display: flex;
        align-items: center;
        margin-bottom: 16rpx;
        
        .avatar {
          width: 64rpx;
          height: 64rpx;
          border-radius: 50%;
          margin-right: 16rpx;
        }
        
        .name {
          font-size: 28rpx;
          margin-right: 16rpx;
        }
        
        .time {
          font-size: 24rpx;
          color: #999;
        }
      }
      
      .review-rating {
        display: flex;
        align-items: center;
        gap: 12rpx;
        margin-bottom: 16rpx;
        
        .stars {
          font-size: 24rpx;
        }
        
        .rating-text {
          font-size: 24rpx;
          color: #ff9800;
        }
      }
      
      .review-content {
        font-size: 28rpx;
        color: #333;
        line-height: 1.6;
        margin-bottom: 16rpx;
      }
      
      .review-images {
        display: flex;
        gap: 12rpx;
        
        .review-image {
          width: 160rpx;
          height: 160rpx;
          border-radius: 8rpx;
        }
      }
    }
  }
  
  .action-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30rpx;
    
    .share-btn {
      display: flex;
      align-items: center;
      gap: 8rpx;
      padding: 16rpx 30rpx;
      background: #f5f5f5;
      border-radius: 100rpx;
      font-size: 28rpx;
      color: #666;
      
      .icon {
        font-size: 32rpx;
      }
    }
    
    .primary-btn {
      width: 400rpx;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      background: var(--theme-color, #e4393c);
      color: #fff;
      border-radius: 40rpx;
      font-size: 30rpx;
      
      &:disabled {
        opacity: 0.6;
      }
    }
  }
}
</style> 