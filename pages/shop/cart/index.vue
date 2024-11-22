<template>
  <view class="cart-page">
    <!-- 空购物车状态 -->
    <view class="empty-cart" v-if="!cartList.length">
      <image class="empty-image" src="/static/images/empty-cart.png" />
      <text class="empty-text">购物车还是空的</text>
      <view class="go-shopping" @tap="goShopping">去逛逛</view>
    </view>

    <!-- 购物车列表 -->
    <view class="cart-list" v-else>
      <view class="cart-item" v-for="item in cartList" :key="item.id">
        <view class="checkbox" @tap="toggleSelect(item)">
          <text class="icon" :class="{ selected: item.selected }">✓</text>
        </view>

        <image class="goods-image" :src="item.image" mode="aspectFill" />

        <view class="goods-info">
          <view class="goods-name">{{ item.name }}</view>
          <view class="goods-spec" v-if="item.spec">{{ item.spec }}</view>
          <view class="goods-price-wrap">
            <text class="goods-price">¥{{ item.price }}</text>
            <view class="quantity-control">
              <text class="minus" :class="{ disabled: item.quantity <= 1 }" @tap="updateQuantity(item, -1)">-</text>
              <text class="quantity">{{ item.quantity }}</text>
              <text class="plus" @tap="updateQuantity(item, 1)">+</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 推荐商品 -->
    <view class="recommend" v-if="recommendList.length">
      <view class="recommend-title">猜你喜欢</view>
      <view class="recommend-list">
        <view class="recommend-item" v-for="item in recommendList" :key="item.id" @tap="goToDetail(item)">
          <image class="recommend-image" :src="item.image" mode="aspectFill" />
          <view class="recommend-name">{{ item.name }}</view>
          <view class="recommend-price">¥{{ item.price }}</view>
        </view>
      </view>
    </view>

    <!-- 底部结算栏 -->
    <view class="checkout-bar">
      <view class="left">
        <view class="select-all" @tap="toggleSelectAll">
          <view class="checkbox" :class="{ selected: isAllSelected }">
            <text class="icon">✓</text>
          </view>
          <text class="text">全选</text>
        </view>
      </view>

      <view class="right">
        <view class="total-info">
          <text class="label">合计：</text>
          <text class="total-price">¥{{ totalPrice }}</text>
        </view>
        <view 
          class="checkout-btn" 
          :class="{ disabled: !selectedCount }" 
          @tap="goToCheckout"
        >
          结算<text v-if="selectedCount">({{ selectedCount }})</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 购物车列表数据
const cartList = ref([
  {
    id: 1,
    name: '测试商品1',
    spec: '规格：默认',
    price: 99.00,
    quantity: 1,
    image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
    selected: true
  },{
    id: 1,
    name: '测试商品1',
    spec: '规格：默认',
    price: 99.00,
    quantity: 1,
    image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
    selected: true
  },{
    id: 1,
    name: '测试商品1',
    spec: '规格：默认',
    price: 99.00,
    quantity: 1,
    image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
    selected: true
  },{
    id: 1,
    name: '测试商品1',
    spec: '规格：默认',
    price: 99.00,
    quantity: 1,
    image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
    selected: true
  },{
    id: 1,
    name: '测试商品1',
    spec: '规格：默认',
    price: 99.00,
    quantity: 1,
    image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
    selected: true
  },{
    id: 1,
    name: '测试商品1',
    spec: '规格：默认',
    price: 99.00,
    quantity: 1,
    image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
    selected: true
  },{
    id: 1,
    name: '测试商品1',
    spec: '规格：默认',
    price: 99.00,
    quantity: 1,
    image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
    selected: true
  },{
    id: 1,
    name: '测试商品1',
    spec: '规格：默认',
    price: 99.00,
    quantity: 1,
    image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
    selected: true
  },
  // 更多商品...
])

// 推荐商品列表
const recommendList = ref([
  {
    id: 101,
    name: '推荐商品1',
    price: 199.00,
    image: '/static/images/recommend-1.png'
  },
  // 更多推荐商品...
])

// 计算属性：是否全选
const isAllSelected = computed(() => {
  return cartList.value.length > 0 && cartList.value.every(item => item.selected)
})

// 计算属性：选中商品数量
const selectedCount = computed(() => {
  return cartList.value.filter(item => item.selected).length
})

// 计算属性：总价
const totalPrice = computed(() => {
  return cartList.value
    .filter(item => item.selected)
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2)
})

// 切换商品选中状态
const toggleSelect = (item) => {
  item.selected = !item.selected
}

// 切换全选状态
const toggleSelectAll = () => {
  const newStatus = !isAllSelected.value
  cartList.value.forEach(item => {
    item.selected = newStatus
  })
}

// 更新商品数量
const updateQuantity = (item, delta) => {
  const newQuantity = item.quantity + delta
  if (newQuantity < 1) return

  item.quantity = newQuantity
}

// 去购物
const goShopping = () => {
  uni.switchTab({
    url: '/pages/shop/index'
  })
}

// 去商品详情
const goToDetail = (item) => {
  uni.navigateTo({
    url: `/pages/shop/goods/detail?id=${item.id}`
  })
}

// 去结算
const goToCheckout = () => {
  if (!selectedCount.value) return

  uni.navigateTo({
    url: '/pages/shop/store/checkout'
  })
}
</script>

<style lang="scss">
@mixin text-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.cart-page {
  min-height: 100vh;
  background: #f8f8f8;
  padding-bottom: calc(120rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(120rpx + env(safe-area-inset-bottom));
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 200rpx;

  .empty-image {
    width: 240rpx;
    height: 240rpx;
    margin-bottom: 30rpx;
  }

  .empty-text {
    font-size: 28rpx;
    color: #999;
    margin-bottom: 40rpx;
  }

  .go-shopping {
    width: 240rpx;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    background: var(--theme-color, #ff6b6b);
    color: #fff;
    border-radius: 40rpx;
    font-size: 28rpx;
  }
}

.cart-list {
  padding: 20rpx;

  .cart-item {
    display: flex;
    align-items: center;
    padding: 20rpx;
    background: #fff;
    border-radius: 16rpx;
    margin-bottom: 20rpx;

    .checkbox {
      width: 40rpx;
      height: 40rpx;
      border-radius: 50%;
      border: 2rpx solid #ddd;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20rpx;

      .icon {
        color: transparent;
        font-size: 24rpx;

        &.selected {
          color: var(--theme-color, #ff6b6b);
        }
      }
    }

    .goods-image {
      width: 160rpx;
      height: 160rpx;
      border-radius: 8rpx;
      margin-right: 20rpx;
    }

    .goods-info {
      flex: 1;

      .goods-name {
        font-size: 28rpx;
        color: #333;
        margin-bottom: 10rpx;
      }

      .goods-spec {
        font-size: 24rpx;
        color: #999;
        margin-bottom: 20rpx;
      }

      .goods-price-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .goods-price {
          font-size: 32rpx;
          color: var(--theme-color, #ff6b6b);
          font-weight: bold;
        }

        .quantity-control {
          display: flex;
          align-items: center;

          .minus,
          .plus {
            width: 48rpx;
            height: 48rpx;
            border: 2rpx solid #eee;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28rpx;
            color: #333;

            &.disabled {
              color: #ccc;
              background: #f5f5f5;
            }
          }

          .quantity {
            min-width: 60rpx;
            text-align: center;
            font-size: 28rpx;
            margin: 0 16rpx;
          }
        }
      }
    }
  }
}

.recommend {
  padding: 20rpx;
  margin-bottom: 100rpx;

  .recommend-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 20rpx;
  }

  .recommend-list {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -10rpx;

    .recommend-item {
      width: calc(50% - 20rpx);
      margin: 10rpx;
      background: #fff;
      border-radius: 12rpx;
      overflow: hidden;

      .recommend-image {
        width: 100%;
        height: 300rpx;
      }

      .recommend-name {
        font-size: 28rpx;
        color: #333;
        padding: 16rpx;
        @include text-ellipsis;
      }

      .recommend-price {
        font-size: 32rpx;
        color: var(--theme-color, #ff6b6b);
        font-weight: bold;
        padding: 0 16rpx 16rpx;
      }
    }
  }
}

.checkout-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100rpx;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24rpx;
  box-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.05);
  z-index: 99;
  
  .left {
    .select-all {
      display: flex;
      align-items: center;
      
      .checkbox {
        width: 40rpx;
        height: 40rpx;
        border: 2rpx solid #DDDDDD;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 12rpx;
        transition: all 0.2s;
        
        &.selected {
          background: var(--theme-color, #ff6b6b);
          border-color: var(--theme-color, #ff6b6b);
          
          .icon {
            color: #fff;
          }
        }
        
        .icon {
          font-size: 24rpx;
          color: transparent;
        }
      }
      
      .text {
        font-size: 28rpx;
        color: #333;
      }
    }
  }
  
  .right {
    display: flex;
    align-items: center;
    
    .total-info {
      margin-right: 24rpx;
      
      .label {
        font-size: 28rpx;
        color: #333;
      }
      
      .total-price {
        font-size: 36rpx;
        font-weight: 600;
        color: var(--theme-color, #ff6b6b);
      }
    }
    
    .checkout-btn {
      min-width: 200rpx;
      height: 72rpx;
      line-height: 72rpx;
      text-align: center;
      background: var(--theme-color, #ff6b6b);
      color: #ffffff;
      font-size: 28rpx;
      font-weight: 500;
      border-radius: 36rpx;
      padding: 0 32rpx;
      
      &.disabled {
        background: #cccccc;
        pointer-events: none;
      }
      
      &:active {
        opacity: 0.9;
      }
    }
  }
}

// 适配底部安全区
.cart-page {
  padding-bottom: calc(120rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(120rpx + env(safe-area-inset-bottom));
}

.checkout-bar {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
