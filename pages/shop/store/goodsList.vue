<template>
  <view class="page-container">
    <!-- 顶部banner -->
    <swiper 
      class="banner"
      :indicator-dots="true"
      :autoplay="true"
      interval="3000"
      circular
    >
      <swiper-item v-for="(banner, index) in banners" :key="index">
        <image :src="banner.image" mode="aspectFill" class="banner-image"/>
      </swiper-item>
    </swiper>

    <!-- 主体内容区 -->
    <view class="main-content">
      <!-- 左侧分类 -->
      <scroll-view 
        class="category-sidebar"
        scroll-y
      >
        <view 
          class="category-item"
          v-for="(category, index) in categories"
          :key="category.id"
          :class="{ active: currentCategory === index }"
          @tap="switchCategory(index)"
        >
          <text class="category-icon">{{ category.icon }}</text>
          <text class="category-name">{{ category.name }}</text>
        </view>
      </scroll-view>

      <!-- 右侧商品列表 -->
      <scroll-view 
        class="goods-content"
        scroll-y
        @scrolltolower="loadMore"
        refresher-enabled
        :refresher-triggered="refreshing"
        @refresherrefresh="onRefresh"
      >
        <!-- 商品网格 -->
        <view class="goods-grid">
          <view 
            class="goods-item"
            v-for="goods in goodsList"
            :key="goods.id"
            @tap="goToDetail(goods)"
          >
            <image 
              :src="goods.image" 
              mode="aspectFill" 
              class="goods-image"
              lazy-load
            />
            <view class="goods-info">
              <text class="goods-name">{{ goods.name }}</text>
              <text class="goods-desc">{{ goods.description }}</text>
              <view class="goods-bottom">
                <view class="price-wrap">
                  <text class="price">¥{{ goods.price }}</text>
                  <text class="original-price" v-if="goods.originalPrice">¥{{ goods.originalPrice }}</text>
                  <text class="sold">已售{{ goods.sold }}+</text>
                </view>
                <button 
                  class="add-cart-btn"
                  :class="{ disabled: !goods.stock }"
                  @tap.stop="addToCart(goods)"
                >
                  <text class="btn-icon">+</text>
                </button>
              </view>
            </view>
          </view>
        </view>

        <!-- 加载状态 -->
        <view class="loading-state" v-if="loading">
          <text class="loading-text">加载中...</text>
        </view>
      </scroll-view>
    </view>

    <!-- 底部购物车栏 -->
    <view class="cart-bar" v-if="cartTotal > 0" @tap="viewCart">
      <view class="cart-info">
        <view class="cart-icon-wrap">
          <text class="cart-icon">🛒</text>
          <text class="cart-badge">{{ cartTotal }}</text>
        </view>
        <view class="price-info">
          <text class="total-price">¥{{ totalPrice.toFixed(2) }}</text>
          <text class="delivery-fee">配送费 ¥{{ deliveryFee }}</text>
        </view>
      </view>
      <button 
        class="checkout-btn"
        :class="{ disabled: totalPrice < minOrderAmount }"
        @tap.stop="goToCheckout"
      >
        {{ totalPrice < minOrderAmount ? 
          `¥${minOrderAmount}起送` : 
          '去结算' }}
      </button>
    </view>

    <!-- 购物车列表弹窗 -->
    <uni-popup ref="cartPopup" type="bottom">
      <view class="cart-popup">
        <view class="popup-header">
          <text class="title">购物车</text>
          <button class="clear-btn" @tap="clearCart">
            <text class="icon">🗑️</text>
            <text>清空</text>
          </button>
        </view>
        <scroll-view class="cart-list" scroll-y>
          <view 
            class="cart-item"
            v-for="item in cartList"
            :key="item.id"
          >
            <image :src="item.image" class="goods-image" mode="aspectFill"/>
            <view class="goods-info">
              <text class="goods-name">{{ item.name }}</text>
              <text class="goods-price">¥{{ item.price }}</text>
            </view>
            <view class="quantity-control">
              <button class="minus-btn" @tap="updateCart(item, -1)">-</button>
              <text class="count">{{ item.count }}</text>
              <button class="plus-btn" @tap="updateCart(item, 1)">+</button>
            </view>
          </view>
        </scroll-view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

// banner数据
const banners = ref([
  { image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg' },
  { image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg' },
  { image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg' }
])

// 分类数据
const categories = ref([
  { id: 1, name: '推荐', icon: '🔥' },
  { id: 2, name: '新品', icon: '🆕' },
  { id: 3, name: '奶茶', icon: '🧋' },
  { id: 4, name: '果茶', icon: '🍊' },
  { id: 5, name: '咖啡', icon: '☕️' },
  { id: 6, name: '小吃', icon: '🍪' },
  { id: 7, name: '加料', icon: '🧇' }
])

// 商品列表数据
const goodsList = ref([])
const currentCategory = ref(0)
const loading = ref(false)
const refreshing = ref(false)

// 购物车数据
const cartItems = ref({}) // 存储商品ID和数量的映射
const deliveryFee = 3 // 配送费
const minOrderAmount = 20 // 最低起送金额
const cartPopup = ref(null)

// 计算购物车总数量
const cartTotal = computed(() => {
  return Object.values(cartItems.value).reduce((sum, count) => sum + count, 0)
})

// 计算总价
const totalPrice = computed(() => {
  return goodsList.value.reduce((sum, goods) => {
    const count = cartItems.value[goods.id] || 0
    return sum + goods.price * count
  }, 0)
})

// 获取购物车列表
const cartList = computed(() => {
  return goodsList.value.filter(goods => cartItems.value[goods.id])
    .map(goods => ({
      ...goods,
      count: cartItems.value[goods.id]
    }))
})

// 更新购物车
const updateCart = (goods, delta) => {
  const currentCount = cartItems.value[goods.id] || 0
  const newCount = currentCount + delta
  
  if (newCount < 0) return
  
  if (newCount === 0) {
    delete cartItems.value[goods.id]
  } else {
    if (newCount > goods.stock) {
      uni.showToast({
        title: '库存不足',
        icon: 'none'
      })
      return
    }
    cartItems.value[goods.id] = newCount
  }
  
  saveCartToStorage()
}

// 加入购物车
const addToCart = (goods) => {
  if (!goods.stock) {
    uni.showToast({
      title: '商品已售罄',
      icon: 'none'
    })
    return
  }
  updateCart(goods, 1)
}

// 查看商品详情
const goToDetail = (goods) => {
  uni.navigateTo({
    url: `/pages/shop/goods/detail?id=${goods.id}`
  })
}

// 去结算
const goToCheckout = () => {
  if (totalPrice.value < minOrderAmount) {
    uni.showToast({
      title: `还差${(minOrderAmount - totalPrice.value).toFixed(2)}元起送`,
      icon: 'none'
    })
    return
  }
  uni.navigateTo({
    url: '/pages/shop/store/checkout'
  })
}

// 清空购物车
const clearCart = () => {
  uni.showModal({
    title: '提示',
    content: '确定清空购物车吗？',
    success: (res) => {
      if (res.confirm) {
        cartItems.value = {}
        saveCartToStorage()
        cartPopup.value.close()
      }
    }
  })
}

// 保存购物车数据到本地存储
const saveCartToStorage = () => {
  uni.setStorageSync('cartItems', cartItems.value)
}

// 从本地存储恢复购物车数据
const restoreCartFromStorage = () => {
  const savedCart = uni.getStorageSync('cartItems')
  if (savedCart) {
    cartItems.value = savedCart
  }
}

// 查看购物车
const viewCart = () => {
  cartPopup.value.open()
}

// 加载更多
const loadMore = () => {
  if (loading.value) return
  loadCategoryGoods(categories.value[currentCategory.value].id)
}

// 下拉刷新
const onRefresh = async () => {
  refreshing.value = true
  await loadCategoryGoods(categories.value[currentCategory.value].id)
  refreshing.value = false
}
// 切换分类
const switchCategory = async (index) => {
  if (currentCategory.value === index) return
  currentCategory.value = index
  await loadCategoryGoods(categories.value[index].id)
}
// 加载分类商品
const loadCategoryGoods = async (categoryId) => {
  loading.value = true
  try {
    // 模拟接口调用
    setTimeout(() => {
      goodsList.value = Array(10).fill().map((_, index) => ({
        id: index + 1,
        name: '商品名称',
        description: '商品描述信息',
        price: Math.floor(Math.random() * 50 + 10),
        image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
        stock: Math.floor(Math.random() * 100),
        sold: Math.floor(Math.random() * 1000)
      }))
      loading.value = false
    }, 500)
  } catch (error) {
    console.error(error)
    uni.showToast({
      title: '加载失败',
      icon: 'none'
    })
    loading.value = false
  }
}

onMounted(() => {
  restoreCartFromStorage()
  loadCategoryGoods(categories.value[0].id)
})
</script>

<style lang="scss">
@mixin text-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.page-container {
  height: 100vh;
  background: #f8f9fa;
  
  .banner {
    height: 300rpx;
    
    .banner-image {
      width: 100%;
      height: 100%;
    }
  }
  
  .main-content {
    display: flex;
    height: calc(100vh - 300rpx);
    
    .category-sidebar {
      width: 160rpx;
      background: #fff;
      border-right: 1rpx solid #f0f0f0;
      
      .category-item {
        height: 120rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8rpx;
        position: relative;
        
        .category-icon {
          font-size: 40rpx;
        }
        
        .category-name {
          font-size: 24rpx;
          color: #333;
        }
        
        &.active {
          background: #fff5f5;
          
          .category-icon,
          .category-name {
            color: #e4393c;
          }
          
          &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 6rpx;
            height: 36rpx;
            background: #e4393c;
            border-radius: 0 4rpx 4rpx 0;
          }
        }
      }
    }
    
    .goods-content {
      flex: 1;
      background: #fff;
      
      .goods-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20rpx;
        padding: 20rpx;
        
        .goods-item {
          background: #fff;
          border-radius: 12rpx;
          overflow: hidden;
          box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.05);
          
          .goods-image {
            width: 100%;
            height: 260rpx;
            background: #f5f5f5;
          }
          
          .goods-info {
            padding: 16rpx;
            position: relative;
            
            .goods-name {
              font-size: 28rpx;
              font-weight: 500;
              @include text-ellipsis;
            }
            
            .goods-desc {
              font-size: 24rpx;
              color: #999;
              margin: 8rpx 0;
              @include text-ellipsis;
            }
            
            .goods-bottom {
              margin-top: 16rpx;
              display: flex;
              align-items: center;
              justify-content: space-between;
              
              .price-wrap {
                flex: 1;
                padding-right: 60rpx; // 为按钮预留空间
                
                .price {
                  font-size: 32rpx;
                  color: #e4393c;
                  font-weight: 500;
                }
                
                .original-price {
                  font-size: 24rpx;
                  color: #999;
                  text-decoration: line-through;
                  margin-left: 8rpx;
                }
                
                .sold {
                  font-size: 22rpx;
                  color: #999;
                  margin-left: 12rpx;
                }
              }
              
              .add-cart-btn {
                width: 48rpx;
                height: 48rpx;
                padding: 0;
                border-radius: 50%;
                background: #e4393c;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                
                .btn-icon {
                  color: #fff;
                  font-size: 28rpx;
                  font-weight: bold;
                }
                
                &.disabled {
                  background: #ccc;
                }
                
                &:active {
                  transform: scale(0.95);
                }
              }
            }
          }
        }
      }
    }
  }
  
  .cart-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100rpx;
    background: #fff;
    display: flex;
    align-items: center;
    padding: 0 24rpx;
    box-shadow: 0 -2rpx 12rpx rgba(0,0,0,0.05);
    
    .cart-info {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 20rpx;
      
      .cart-icon-wrap {
        position: relative;
        
        .cart-icon {
          font-size: 48rpx;
        }
        
        .cart-badge {
          position: absolute;
          top: -8rpx;
          right: -8rpx;
          min-width: 36rpx;
          height: 36rpx;
          line-height: 36rpx;
          text-align: center;
          background: #ff5722;
          color: #fff;
          font-size: 24rpx;
          border-radius: 18rpx;
          padding: 0 8rpx;
        }
      }
      
      .price-info {
        .total-price {
          font-size: 36rpx;
          font-weight: 500;
          color: #e4393c;
        }
        
        .delivery-fee {
          font-size: 24rpx;
          color: #999;
          margin-left: 12rpx;
        }
      }
    }
    
    .checkout-btn {
      width: 200rpx;
      height: 72rpx;
      line-height: 72rpx;
      background: #e4393c;
      color: #fff;
      font-size: 28rpx;
      border-radius: 36rpx;
      
      &.disabled {
        background: #ccc;
      }
    }
  }
  
  .cart-popup {
    background: #fff;
    border-radius: 24rpx 24rpx 0 0;
    max-height: 60vh;
    
    .popup-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24rpx;
      border-bottom: 1rpx solid #f0f0f0;
      
      .title {
        font-size: 32rpx;
        font-weight: 500;
      }
      
      .clear-btn {
        display: flex;
        align-items: center;
        gap: 4rpx;
        font-size: 24rpx;
        color: #999;
        
        .icon {
          font-size: 28rpx;
        }
      }
    }
    
    .cart-list {
      max-height: calc(60vh - 100rpx);
      
      .cart-item {
        display: flex;
        align-items: center;
        padding: 24rpx;
        border-bottom: 1rpx solid #f0f0f0;
        
        .goods-image {
          width: 120rpx;
          height: 120rpx;
          border-radius: 12rpx;
          margin-right: 20rpx;
        }
        
        .goods-info {
          flex: 1;
          
          .goods-name {
            font-size: 28rpx;
            @include text-ellipsis;
          }
          
          .goods-price {
            font-size: 32rpx;
            color: #e4393c;
            margin-top: 8rpx;
          }
        }
        
        .quantity-control {
          display: flex;
          align-items: center;
          gap: 12rpx;
          
          button {
            width: 44rpx;
            height: 44rpx;
            padding: 0;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24rpx;
            
            &.minus-btn {
              background: #fff;
              border: 2rpx solid #e4393c;
              color: #e4393c;
            }
            
            &.plus-btn {
              background: #e4393c;
              color: #fff;
            }
          }
          
          .count {
            min-width: 40rpx;
            text-align: center;
            font-size: 28rpx;
          }
        }
      }
    }
  }
  
  .loading-state {
    text-align: center;
    padding: 30rpx;
    color: #999;
    font-size: 26rpx;
  }
}


</style>
