<template>
  <view class="mall-container">
    <!-- 搜索栏 -->
    <view class="search-bar glass-effect">
      <text class="icon">🔍</text>
      <input type="text" placeholder="搜索商品" class="search-input" />
    </view>

    <!-- 分类轮播 -->
    <swiper class="category-swiper" :indicator-dots="true" :autoplay="true">
      <swiper-item v-for="banner in banners" :key="banner.id">
        <image :src="banner.image" mode="aspectFill" class="banner-image" />
      </swiper-item>
    </swiper>

    <!-- 分类导航 -->
    <view class="category-grid">
      <view class="category-item" v-for="category in categories" :key="category.id" @tap="goToCategory(category)">
        <view class="icon-wrap">
          <text class="category-icon">{{ category.icon }}</text>
        </view>
        <text class="category-name">{{ category.name }}</text>
      </view>
    </view>

    <!-- 商品列表 -->
    <view class="product-section">
      <view class="section-header">
        <view class="left">
          <text class="icon">🔥</text>
          <text class="title">热销商品</text>
        </view>
        <view class="more" @tap="goToMore">
          查看更多<text class="arrow">></text>
        </view>
      </view>
      <view class="product-grid">
        <view 
          class="product-card" 
          v-for="product in products" 
          :key="product.id"
          @tap="goToDetail(product)"
        >
          <image 
            :src="product.image" 
            mode="aspectFill" 
            class="product-image"
          />
          <view class="product-info">
            <text class="product-name">{{ product.name }}</text>
            <text class="product-desc">{{ product.desc }}</text>
            <view class="product-bottom">
              <view class="price-wrap">
                <text class="symbol">¥</text>
                <text class="price">{{ product.price }}</text>
                <text class="original-price" v-if="product.originalPrice">¥{{ product.originalPrice }}</text>
              </view>
              <view class="buy-btn">
                <text class="icon">🛒</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
const banners = [
  { id: 1, image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg' },
  { id: 2, image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg' }
]

const categories = [
  { id: 1, name: '新品上市', icon: '🆕' },
  { id: 2, name: '限定周边', icon: '⭐' },
  { id: 3, name: '潮流服饰', icon: '👕' },
  { id: 4, name: '生活用品', icon: '🏠' },
  { id: 5, name: '礼品卡', icon: '🎁' },
  { id: 6, name: '联名系列', icon: '🤝' },
  { id: 7, name: '茶具', icon: '🫖' },
  { id: 8, name: '更多', icon: '📦' }
]

const products = [
  {
    id: 1,
    name: '喜茶保温杯',
    desc: '316不锈钢内胆',
    price: '139',
    image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg'
  }, {
    id: 1,
    name: '喜茶保温杯',
    desc: '316不锈钢内胆',
    price: '139',
    image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg'
  }, {
    id: 1,
    name: '喜茶保温杯',
    desc: '316不锈钢内胆',
    price: '139',
    image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg'
  }, {
    id: 1,
    name: '喜茶保温杯',
    desc: '316不锈钢内胆',
    price: '139',
    image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg'
  }, {
    id: 1,
    name: '喜茶保温杯',
    desc: '316不锈钢内胆',
    price: '139',
    image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg'
  }, {
    id: 1,
    name: '喜茶保温杯',
    desc: '316不锈钢内胆',
    price: '139',
    image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg'
  }, {
    id: 1,
    name: '喜茶保温杯',
    desc: '316不锈钢内胆',
    price: '139',
    image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg'
  }, {
    id: 1,
    name: '喜茶保温杯',
    desc: '316不锈钢内胆',
    price: '139',
    image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg'
  }, {
    id: 1,
    name: '喜茶保温杯',
    desc: '316不锈钢内胆',
    price: '139',
    image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg'
  }, {
    id: 1,
    name: '喜茶保温杯',
    desc: '316不锈钢内胆',
    price: '139',
    image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg'
  }, {
    id: 1,
    name: '喜茶保温杯',
    desc: '316不锈钢内胆',
    price: '139',
    image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg'
  },
  // ... 更多商品
]

const goToCategory = (category) => {
  uni.showToast({
    title: `进入${category.name}分类`,
    icon: 'none'
  })
}
</script>

<style lang="scss" scoped>

// 文本省略
@mixin text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mall-container {
  min-height: 100vh;
  background: #f8f9fa;
  padding: 20rpx;

  .search-bar {
    display: flex;
    align-items: center;
    padding: 20rpx;
    border-radius: 16rpx;
    margin-bottom: 20rpx;

    .icon {
      margin: 0 20rpx;
    }

    .search-input {
      flex: 1;
      font-size: 28rpx;
    }
  }

  .category-swiper {
    height: 300rpx;
    margin-bottom: 30rpx;
    border-radius: 16rpx;
    overflow: hidden;

    .banner-image {
      width: 100%;
      height: 100%;
    }
  }

  .category-grid {
    display: flex;
    flex-wrap: wrap;
    margin: 20rpx 0;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 24rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(10px);

    .category-item {
      width: 20%; // 每行5个
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20rpx 0;

      &:active {
        .icon-wrap {
          transform: scale(0.92);
        }
      }

      .icon-wrap {
        width: 96rpx;
        height: 96rpx;
        background: #f8f8f8;
        border-radius: 24rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 12rpx;
        transition: all 0.2s;

        .category-icon {
          font-size: 48rpx; // emoji 大小
          line-height: 1;
        }
      }

      .category-name {
        font-size: 24rpx;
        color: #333;
        line-height: 1.4;
        text-align: center;
      }
    }
  }

  .product-section {
    padding: 20rpx;
    
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20rpx;
      padding: 0 10rpx;
      
      .left {
        display: flex;
        align-items: center;
        
        .icon {
          font-size: 36rpx;
          margin-right: 12rpx;
        }
        
        .title {
          font-size: 32rpx;
          font-weight: 600;
          color: #333;
        }
      }
      
      .more {
        font-size: 26rpx;
        color: #999;
        display: flex;
        align-items: center;
        
        .arrow {
          margin-left: 4rpx;
        }
        
        &:active {
          opacity: 0.8;
        }
      }
    }
    
    .product-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20rpx;
      
      .product-card {
        background: #fff;
        border-radius: 16rpx;
        overflow: hidden;
        box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
        
        &:active {
          transform: scale(0.98);
        }
        
        .product-image {
          width: 100%;
          height: 300rpx;
          background: #f5f5f5;
        }
        
        .product-info {
          padding: 16rpx;
          
          .product-name {
            font-size: 28rpx;
            color: #333;
            font-weight: 500;
            @include text-ellipsis;
          }
          
          .product-desc {
            font-size: 24rpx;
            color: #999;
            margin-top: 8rpx;
            @include text-ellipsis;
          }
          
          .product-bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 16rpx;
            
            .price-wrap {
              display: flex;
              align-items: baseline;
              
              .symbol {
                font-size: 24rpx;
                color: var(--theme-color, #ff6b6b);
              }
              
              .price {
                font-size: 36rpx;
                font-weight: bold;
                color: var(--theme-color, #ff6b6b);
                margin-right: 8rpx;
              }
              
              .original-price {
                font-size: 24rpx;
                color: #999;
                text-decoration: line-through;
              }
            }
            
            .buy-btn {
              width: 64rpx;
              height: 64rpx;
              background: var(--theme-color, #ff6b6b);
              border-radius: 32rpx;
              display: flex;
              align-items: center;
              justify-content: center;
              
              .icon {
                font-size: 32rpx;
                color: #fff;
              }
              
              &:active {
                transform: scale(0.9);
              }
            }
          }
        }
      }
    }
  }
}


</style>