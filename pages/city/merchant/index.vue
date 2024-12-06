<template>
  <view class="merchant-detail">
    <view class="header">
      <text class="title">{{ merchant.name }}</text>
    </view>
    
    <view class="merchant-info">
      <image class="merchant-image" :src="merchant.image"></image>
      <view class="info">
        <text class="address">{{ merchant.address }}</text>
        <view class="tags">
          <text class="tag" v-for="(tag, index) in merchant.tags" :key="index">{{ tag }}</text>
        </view>
      </view>
    </view>
    
    <view class="products-section">
      <view class="section-title">商品列表</view>
      <scroll-view scroll-y class="product-list">
        <view class="product-item" v-for="(product, index) in merchant.products" :key="index">
          <image class="product-image" :src="product.image"></image>
          <view class="product-info">
            <text class="name">{{ product.name }}</text>
            <text class="price">¥{{ product.price }}</text>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup>
const merchant = {
  name: '富邦超市',
  image: 'https://example.com/merchant.jpg',
  address: '富邦广场1楼',
  tags: ['超市', '生鲜'],
  products: [
    {
      image: 'https://example.com/product1.jpg',
      name: '苹果',
      price: '5'
    },
    {
      image: 'https://example.com/product2.jpg',
      name: '香蕉',
      price: '3'
    }
    // ... 更多商品数据
  ]
}
</script>

<style lang="scss" scoped>
.merchant-detail {
  min-height: 100vh;
  background: #f5f5f5;
  
  .header {
    height: 88rpx;
    background: #fff;
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    box-shadow: 0 2rpx 4rpx rgba(0,0,0,0.1);
    
    .title {
      font-size: 32rpx;
      font-weight: 500;
      color: #333;
    }
  }
  
  .merchant-info {
    background: #fff;
    padding: 30rpx;
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
    
    .merchant-image {
      width: 120rpx;
      height: 120rpx;
      border-radius: 8rpx;
      margin-right: 20rpx;
    }
    
    .info {
      flex: 1;
      
      .address {
        font-size: 28rpx;
        color: #666;
        margin-bottom: 12rpx;
      }
      
      .tags {
        display: flex;
        gap: 12rpx;
        
        .tag {
          padding: 4rpx 12rpx;
          background: rgba(7, 193, 96, 0.1);
          color: #07c160;
          font-size: 24rpx;
          border-radius: 4rpx;
        }
      }
    }
  }
  
  .products-section {
    background: #fff;
    padding: 30rpx;
    
    .section-title {
      font-size: 32rpx;
      color: #333;
      font-weight: 500;
      margin-bottom: 20rpx;
    }
    
    .product-list {
      .product-item {
        display: flex;
        align-items: center;
        margin-bottom: 20rpx;
        
        .product-image {
          width: 100rpx;
          height: 100rpx;
          border-radius: 8rpx;
          margin-right: 20rpx;
        }
        
        .product-info {
          flex: 1;
          
          .name {
            font-size: 30rpx;
            color: #333;
            margin-bottom: 8rpx;
          }
          
          .price {
            font-size: 28rpx;
            color: #ff5a5f;
          }
        }
      }
    }
  }
}
</style> 