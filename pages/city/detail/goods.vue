<template>
  <view class="goods-detail">
    <!-- 轮播图 -->
    <swiper class="swiper" :indicator-dots="true" :autoplay="true">
      <swiper-item v-for="(img, index) in goods.images" :key="index">
        <image :src="img" mode="aspectFill" class="slide-image"></image>
      </swiper-item>
    </swiper>
    
    <!-- 商品信息 -->
    <view class="info-section">
      <view class="price-row">
        <text class="price">¥{{ goods.price }}</text>
        <text class="original-price">¥{{ goods.originalPrice }}</text>
      </view>
      <view class="title">{{ goods.title }}</view>
      <view class="desc">{{ goods.description }}</view>
    </view>
    
    <!-- 卖家信息 -->
    <view class="seller-section">
      <image class="avatar" :src="goods.sellerAvatar"></image>
      <view class="seller-info">
        <text class="name">{{ goods.sellerName }}</text>
        <text class="time">发布于 {{ goods.publishTime }}</text>
      </view>
      <button class="contact-btn">联系卖家</button>
    </view>
    
    <!-- 商品详情 -->
    <view class="detail-section">
      <view class="section-title">商品详情</view>
      <view class="detail-content">
        <text>{{ goods.detail }}</text>
        <view class="detail-images">
          <image v-for="(img, index) in goods.detailImages" 
                 :key="index" 
                 :src="img" 
                 mode="widthFix"></image>
        </view>
      </view>
    </view>
    
    <!-- 底部操作栏 -->
    <view class="bottom-bar">
      <view class="action-btn collect">
        <text class="icon">⭐</text>
        <text>收藏</text>
      </view>
      <view class="action-btn share">
        <text class="icon">📤</text>
        <text>分享</text>
      </view>
      <button class="buy-btn">立即购买</button>
    </view>
  </view>
</template>

<script setup>
const goods = {
  images: [
    'https://example.com/img1.jpg',
    'https://example.com/img2.jpg'
  ],
  price: '3999',
  originalPrice: '4999',
  title: 'iPhone 13 128G 午夜色',
  description: '95新 无维修 全原装 在保修期',
  sellerAvatar: 'https://example.com/avatar.jpg',
  sellerName: '诚信二手商家',
  publishTime: '2024-01-20',
  detail: '商品详细描述...',
  detailImages: [
    'https://example.com/detail1.jpg',
    'https://example.com/detail2.jpg'
  ]
}
</script>

<style lang="scss" scoped>
.goods-detail {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 100rpx;
  
  .swiper {
    height: 750rpx;
    
    .slide-image {
      width: 100%;
      height: 100%;
    }
  }
  
  .info-section {
    background: #fff;
    padding: 30rpx;
    margin-bottom: 20rpx;
    
    .price-row {
      margin-bottom: 20rpx;
      
      .price {
        font-size: 40rpx;
        color: #ff5a5f;
        font-weight: bold;
        margin-right: 20rpx;
      }
      
      .original-price {
        font-size: 28rpx;
        color: #999;
        text-decoration: line-through;
      }
    }
    
    .title {
      font-size: 32rpx;
      color: #333;
      font-weight: 500;
      margin-bottom: 16rpx;
    }
    
    .desc {
      font-size: 28rpx;
      color: #666;
    }
  }
  
  .seller-section {
    background: #fff;
    padding: 30rpx;
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
    
    .avatar {
      width: 80rpx;
      height: 80rpx;
      border-radius: 40rpx;
      margin-right: 20rpx;
    }
    
    .seller-info {
      flex: 1;
      
      .name {
        font-size: 30rpx;
        color: #333;
        margin-bottom: 8rpx;
      }
      
      .time {
        font-size: 24rpx;
        color: #999;
      }
    }
    
    .contact-btn {
      padding: 12rpx 30rpx;
      background: #07c160;
      color: #fff;
      border-radius: 30rpx;
      font-size: 28rpx;
    }
  }
  
  .detail-section {
    background: #fff;
    padding: 30rpx;
    
    .section-title {
      font-size: 32rpx;
      color: #333;
      font-weight: 500;
      margin-bottom: 20rpx;
    }
    
    .detail-content {
      font-size: 28rpx;
      color: #666;
      line-height: 1.6;
      
      .detail-images {
        margin-top: 20rpx;
        
        image {
          width: 100%;
          margin-bottom: 20rpx;
        }
      }
    }
  }
  
  .bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100rpx;
    background: #fff;
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.05);
    
    .action-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 40rpx;
      
      .icon {
        font-size: 40rpx;
        margin-bottom: 4rpx;
      }
      
      text {
        font-size: 24rpx;
        color: #666;
      }
    }
    
    .buy-btn {
      flex: 1;
      height: 72rpx;
      background: #ff5a5f;
      color: #fff;
      border-radius: 36rpx;
      font-size: 32rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style> 