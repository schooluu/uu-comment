<template>
  <view class="success-container">
    <!-- 支付结果 -->
    <view class="result-section glass-effect">
      <view class="success-icon">✓</view>
      <text class="success-title">支付成功</text>
      <text class="success-amount">¥{{ orderInfo.amount }}</text>
      <view class="order-info">
        <text class="info-item">订单编号：{{ orderInfo.orderNo }}</text>
        <text class="info-item">支付方式：{{ orderInfo.paymentMethod }}</text>
        <text class="info-item">支付时间：{{ orderInfo.payTime }}</text>
      </view>
    </view>
    
    <!-- 配送信息 -->
    <view class="delivery-info glass-effect" v-if="orderInfo.delivery">
      <view class="section-title">配送信息</view>
      <view class="info-content">
        <view class="address-info">
          <text class="name">{{ orderInfo.delivery.name }}</text>
          <text class="phone">{{ orderInfo.delivery.phone }}</text>
        </view>
        <text class="address">{{ orderInfo.delivery.address }}</text>
        <text class="delivery-time">预计送达时间：{{ orderInfo.delivery.estimatedTime }}</text>
      </view>
    </view>
    
    <!-- 商品信息 -->
    <view class="goods-info glass-effect">
      <view class="section-title">商品信息</view>
      <view 
        class="goods-item"
        v-for="item in orderInfo.goods"
        :key="item.id"
      >
        <image :src="item.image" mode="aspectFill" class="goods-image"/>
        <view class="goods-detail">
          <text class="goods-name">{{ item.name }}</text>
          <text class="goods-spec">{{ item.spec }}</text>
          <view class="price-qty">
            <text class="price">¥{{ item.price }}</text>
            <text class="quantity">x{{ item.quantity }}</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 操作按钮 -->
    <view class="action-buttons">
      <view class="action-row">
        <button class="action-btn outline" @tap="viewOrder">查看订单</button>
        <button class="action-btn primary" @tap="backToHome">返回首页</button>
      </view>
      <button class="action-btn full" @tap="continueShopping">继续购物</button>
    </view>
    
    <!-- 推荐商品 -->
    <view class="recommend-section">
      <view class="section-title">猜你喜欢</view>
      <scroll-view 
        class="recommend-scroll" 
        scroll-x 
        :show-scrollbar="false"
        enhanced
      >
        <view class="recommend-list">
          <view 
            class="recommend-item"
            v-for="item in recommendGoods"
            :key="item.id"
            @tap="goToDetail(item.id)"
          >
            <image :src="item.image" mode="aspectFill" class="item-image"/>
            <text class="item-name">{{ item.name }}</text>
            <text class="item-price">¥{{ item.price }}</text>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 订单信息
const orderInfo = ref({
  amount: '139.00',
  orderNo: 'DD20240120001',
  paymentMethod: '微信支付',
  payTime: '2024-01-20 14:30:00',
  delivery: {
    name: '张三',
    phone: '138****8888',
    address: '北京市朝阳区三里屯太古里',
    estimatedTime: '今天 16:30-17:30'
  },
  goods: [
    {
      id: 1,
      name: '喜茶保温杯',
      spec: '500ml',
      price: '139.00',
      quantity: 1,
      image: 'https://example.com/product1.jpg'
    }
  ]
})

// 推荐商品
const recommendGoods = ref([
  {
    id: 1,
    name: '喜茶玻璃杯',
    price: '89.00',
    image: 'https://example.com/product2.jpg'
  },
  // ... 更多推荐商品
])

// 查看订单
const viewOrder = () => {
  uni.navigateTo({
    url: `/pages/shop/orders/detail?id=${orderInfo.value.orderNo}`
  })
}

// 返回首页
const backToHome = () => {
  uni.switchTab({
    url: '/pages/shop/index'
  })
}

// 继续购物
const continueShopping = () => {
  uni.switchTab({
    url: '/pages/shop/mall/index'
  })
}

// 跳转商品详情
const goToDetail = (id) => {
  uni.navigateTo({
    url: `/pages/shop/goods/detail?id=${id}`
  })
}
</script>

<style lang="scss" scoped>
.success-container {
  min-height: 100vh;
  background: #f8f9fa;
  padding: 20rpx;
  
  .result-section {
    padding: 60rpx 40rpx;
    border-radius: 24rpx;
    text-align: center;
    margin-bottom: 20rpx;
    
    .success-icon {
      width: 120rpx;
      height: 120rpx;
      line-height: 120rpx;
      border-radius: 50%;
      background: var(--theme-color, #e4393c);
      color: #fff;
      font-size: 60rpx;
      margin: 0 auto 30rpx;
    }
    
    .success-title {
      font-size: 36rpx;
      font-weight: bold;
      margin-bottom: 20rpx;
      display: block;
    }
    
    .success-amount {
      font-size: 48rpx;
      font-weight: bold;
      color: var(--theme-color, #e4393c);
      margin-bottom: 40rpx;
      display: block;
    }
    
    .order-info {
      .info-item {
        font-size: 26rpx;
        color: #666;
        margin-bottom: 10rpx;
        display: block;
        
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  
  .delivery-info,
  .goods-info {
    padding: 30rpx;
    border-radius: 24rpx;
    margin-bottom: 20rpx;
    
    .section-title {
      font-size: 30rpx;
      font-weight: 500;
      margin-bottom: 20rpx;
    }
  }
  
  .delivery-info {
    .info-content {
      .address-info {
        margin-bottom: 10rpx;
        
        .name {
          font-size: 28rpx;
          margin-right: 20rpx;
        }
        
        .phone {
          font-size: 28rpx;
          color: #666;
        }
      }
      
      .address {
        font-size: 28rpx;
        color: #333;
        margin-bottom: 16rpx;
        display: block;
      }
      
      .delivery-time {
        font-size: 26rpx;
        color: var(--theme-color, #e4393c);
      }
    }
  }
  
  .goods-info {
    .goods-item {
      display: flex;
      padding: 20rpx 0;
      
      .goods-image {
        width: 120rpx;
        height: 120rpx;
        border-radius: 12rpx;
        margin-right: 20rpx;
      }
      
      .goods-detail {
        flex: 1;
        
        .goods-name {
          font-size: 28rpx;
          margin-bottom: 8rpx;
          display: block;
        }
        
        .goods-spec {
          font-size: 24rpx;
          color: #999;
          margin-bottom: 16rpx;
          display: block;
        }
        
        .price-qty {
          display: flex;
          justify-content: space-between;
          
          .price {
            font-size: 28rpx;
            font-weight: 500;
          }
          
          .quantity {
            font-size: 26rpx;
            color: #999;
          }
        }
      }
    }
  }
  
  .action-buttons {
    margin: 40rpx 0;
    
    .action-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20rpx;
      
      .action-btn {
        width: 48%;
      }
    }
    
    .action-btn {
      height: 88rpx;
      line-height: 88rpx;
      border-radius: 44rpx;
      font-size: 30rpx;
      
      &.outline {
        background: #fff;
        color: var(--theme-color, #e4393c);
        border: 2rpx solid currentColor;
      }
      
      &.primary {
        background: var(--theme-color, #e4393c);
        color: #fff;
      }
      
      &.full {
        width: 100%;
        background: #fff;
        color: #333;
        border: 2rpx solid #ddd;
      }
    }
  }
  
  .recommend-section {
    margin-bottom: 40rpx;
    
    .section-title {
      font-size: 30rpx;
      font-weight: 500;
      margin-bottom: 20rpx;
      padding: 0 20rpx;
    }
    
    .recommend-scroll {
      width: 100%;
      white-space: nowrap;
      
      .recommend-list {
        padding: 20rpx;
        display: inline-flex;
        
        .recommend-item {
          width: 240rpx;
          margin-right: 20rpx;
          
          &:last-child {
            margin-right: 0;
          }
          
          .item-image {
            width: 240rpx;
            height: 240rpx;
            border-radius: 12rpx;
            margin-bottom: 16rpx;
          }
          
          .item-name {
            font-size: 26rpx;
            color: #333;
            margin-bottom: 8rpx;
            display: block;
            @include text-ellipsis;
          }
          
          .item-price {
            font-size: 28rpx;
            color: var(--theme-color, #e4393c);
            font-weight: 500;
          }
        }
      }
    }
  }
}
</style> 