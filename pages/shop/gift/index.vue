<template>
  <view class="gift-container">
    <!-- 顶部banner -->
    <view class="banner glass-effect">
      <view class="user-points">
        <text class="label">我的积分</text>
        <text class="value">{{ userPoints }}</text>
      </view>
      <view class="points-tips">
        <text class="tip">可兑换{{ availableGifts }}件礼品</text>
        <text class="records" @tap="goToRecords">兑换记录 →</text>
      </view>
    </view>
    
    <!-- 分类标签 -->
    <scroll-view 
      class="category-scroll" 
      scroll-x 
      :show-scrollbar="false"
      :scroll-into-view="'category-' + currentCategory"
      enhanced
      :scroll-with-animation="true"
    >
      <view class="category-list">
        <view 
          class="category-item"
          v-for="(category, index) in categories"
          :key="index"
          :id="'category-' + index"
          :class="{ active: currentCategory === index }"
          @tap="switchCategory(index)"
        >
          <text class="category-name">{{ category.name }}</text>
          <text class="badge" v-if="category.badge">{{ category.badge }}</text>
          <view class="active-line" v-if="currentCategory === index"></view>
        </view>
      </view>
    </scroll-view>
    
    <!-- 礼品列表 -->
    <view class="gift-list">
      <view 
        class="gift-card glass-effect"
        v-for="gift in giftList"
        :key="gift.id"
        @tap="showGiftDetail(gift)"
      >
        <image :src="gift.image" mode="aspectFill" class="gift-image"/>
        <view class="gift-info">
          <text class="gift-name">{{ gift.name }}</text>
          <text class="gift-desc">{{ gift.description }}</text>
          <view class="gift-bottom">
            <view class="points-required">
              <text class="points">{{ gift.points }}</text>
              <text class="unit">积分</text>
            </view>
            <button 
              class="exchange-btn"
              :class="{ disabled: userPoints < gift.points }"
              @tap.stop="exchangeGift(gift)"
            >
              立即兑换
            </button>
          </view>
        </view>
        <text class="stock-tag" v-if="gift.stock <= 10">库存{{ gift.stock }}件</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 用户积分
const userPoints = ref(2580)
const availableGifts = ref(15)

// 分类数据
const categories = ref([
  {
    name: '全部',
    badge: ''
  },
  {
    name: '新品',
    badge: 'NEW'
  },
  {
    name: '热销',
    badge: '🔥'
  },
  {
    name: '折扣',
    badge: '折扣'
  }
])
const currentCategory = ref(0)

// 礼品列表
const giftList = ref([
  {
    id: 1,
    name: '限量版保温杯',
    description: '316不锈钢内胆，24小时保温',
    points: 1999,
    image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
    stock: 8,
    category: 1
  },
  {
    id: 2,
    name: '双层玻璃杯',
    description: '耐高温玻璃，简约时尚',
    points: 999,
    image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
    stock: 25,
    category: 1
  }, {
    id: 2,
    name: '双层玻璃杯',
    description: '耐高温玻璃，简约时尚',
    points: 999,
    image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
    stock: 25,
    category: 1
  }, {
    id: 2,
    name: '双层玻璃杯',
    description: '耐高温玻璃，简约时尚',
    points: 999,
    image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
    stock: 25,
    category: 1
  }, {
    id: 2,
    name: '双层玻璃杯',
    description: '耐高温玻璃，简约时尚',
    points: 999,
    image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
    stock: 25,
    category: 1
  }, {
    id: 2,
    name: '双层玻璃杯',
    description: '耐高温玻璃，简约时尚',
    points: 999,
    image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
    stock: 25,
    category: 1
  }, {
    id: 2,
    name: '双层玻璃杯',
    description: '耐高温玻璃，简约时尚',
    points: 999,
    image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
    stock: 25,
    category: 1
  },
  // ... 更多礼品数据
])

// 选中的礼品和地址
const selectedGift = ref(null)
const selectedAddress = ref(null)
const exchangePopup = ref(null)

// 切换分类
const switchCategory = (index) => {
  currentCategory.value = index
  // TODO: 根据分类筛选礼品列表
}

// 查看兑换记录
const goToRecords = () => {
  uni.navigateTo({
    url: '/pages/shop/gift/records'
  })
}

// 显示礼品详情
const showGiftDetail = (gift) => {
  uni.navigateTo({
    url: `/pages/shop/gift/detail?id=${gift.id}`
  })
}

// 兑换礼品
const exchangeGift = (gift) => {

}

// 选择地址
const selectAddress = () => {
  uni.navigateTo({
    url: '/pages/shop/address/list?select=true'
  })
}

// 确认兑换
const confirmExchange = () => {
  if (!selectedAddress.value) {
    uni.showToast({
      title: '请选择收货地址',
      icon: 'none'
    })
    return
  }
  
  // TODO: 调用兑换接口
  uni.showLoading({
    title: '兑换中'
  })
  
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({
      title: '兑换成功',
      icon: 'success'
    })
    exchangePopup.value.close()
    // 刷新积分和礼品列表
  }, 1500)
}

// 关闭弹窗
const closeExchangePopup = () => {
  exchangePopup.value.close()
}
</script>

<style lang="scss" scoped>
.gift-container {
  min-height: 100vh;
  background: #f8f9fa;
  padding: 30rpx;
  
  .banner {
    padding: 40rpx;
    border-radius: 24rpx;
    margin-bottom: 30rpx;
    
    .user-points {
      margin-bottom: 20rpx;
      
      .label {
        font-size: 28rpx;
        color: #666;
        margin-right: 16rpx;
      }
      
      .value {
        font-size: 48rpx;
        color: var(--theme-color, #e4393c);
        font-weight: bold;
      }
    }
    
    .points-tips {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .tip {
        font-size: 26rpx;
        color: #666;
      }
      
      .records {
        font-size: 26rpx;
        color: var(--theme-color, #e4393c);
      }
    }
  }
  
  .category-scroll {
    background: #ffffff;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
    margin: 0 -30rpx 30rpx;
    
    .category-list {
      display: flex;
      padding: 0 20rpx;
      height: 88rpx;
      white-space: nowrap;
      
      .category-item {
        position: relative;
        display: flex;
        align-items: center;
        padding: 0 32rpx;
        transition: all 0.3s;
        
        .category-name {
          font-size: 28rpx;
          color: #666;
          transition: all 0.3s;
        }
        
        .badge {
          position: absolute;
          top: 10rpx;
          right: 10rpx;
          background: var(--theme-color, #ff6b6b);
          color: #fff;
          font-size: 20rpx;
          padding: 2rpx 8rpx;
          border-radius: 20rpx;
          transform: scale(0.8);
        }
        
        .active-line {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 40rpx;
          height: 4rpx;
          background: var(--theme-color, #ff6b6b);
          border-radius: 2rpx;
        }
        
        &.active {
          .category-name {
            color: #333;
            font-weight: 600;
            transform: scale(1.05);
          }
        }
        
        &:active {
          opacity: 0.7;
        }
      }
    }
  }
  
  .gift-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30rpx;
    
    .gift-card {
      position: relative;
      border-radius: 20rpx;
      overflow: hidden;
      
      .gift-image {
        width: 100%;
        height: 320rpx;
      }
      
      .gift-info {
        padding: 20rpx;
        
        .gift-name {
          font-size: 28rpx;
          font-weight: 500;
          margin-bottom: 8rpx;
        }
        
        .gift-desc {
          font-size: 24rpx;
          color: #666;
          margin-bottom: 16rpx;
        }
        
        .gift-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          
          .points-required {
            .points {
              font-size: 32rpx;
              color: var(--theme-color, #e4393c);
              font-weight: bold;
            }
            
            .unit {
              font-size: 24rpx;
              color: #999;
              margin-left: 4rpx;
            }
          }
          
          .exchange-btn {
            padding: 12rpx 24rpx;
            font-size: 24rpx;
            color: #fff;
            background: var(--theme-color, #e4393c);
            border-radius: 100rpx;
            
            &.disabled {
              background: #ccc;
            }
          }
        }
      }
      
      .stock-tag {
        position: absolute;
        top: 20rpx;
        right: 20rpx;
        padding: 8rpx 16rpx;
        font-size: 22rpx;
        color: #fff;
        background: rgba(0,0,0,0.5);
        border-radius: 100rpx;
      }
    }
  }
  
  .exchange-popup {
    width: 600rpx;
    background: #ffffff;
    border-radius: 24rpx;
    overflow: hidden;
    
    .popup-header {
      position: relative;
      height: 100rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1rpx solid #f5f5f5;
      
      .title {
        font-size: 32rpx;
        font-weight: 600;
        color: #333;
      }
      
      .close {
        position: absolute;
        right: 24rpx;
        top: 50%;
        transform: translateY(-50%);
        font-size: 40rpx;
        color: #999;
        padding: 10rpx;
        
        &:active {
          opacity: 0.7;
        }
      }
    }
    
    .popup-content {
      padding: 30rpx;
      
      .gift-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 30rpx;
        border-bottom: 1rpx solid #f5f5f5;
        
        .gift-preview {
          width: 200rpx;
          height: 200rpx;
          border-radius: 12rpx;
          margin-bottom: 16rpx;
        }
        
        .gift-name {
          font-size: 28rpx;
          color: #333;
          margin-bottom: 12rpx;
        }
        
        .points-info {
          display: flex;
          align-items: center;
          
          .label {
            font-size: 26rpx;
            color: #666;
            margin-right: 8rpx;
          }
          
          .value {
            font-size: 32rpx;
            font-weight: bold;
            color: var(--theme-color, #ff6b6b);
            
            &::before {
              content: '✨';
              font-size: 24rpx;
              margin-right: 4rpx;
            }
          }
        }
      }
      
      .address-info {
        margin-top: 30rpx;
        
        .address-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16rpx;
          
          .label {
            font-size: 28rpx;
            color: #333;
            font-weight: 500;
          }
          
          .arrow {
            font-size: 24rpx;
            color: #999;
          }
        }
        
        .address-content {
          background: #f8f8f8;
          padding: 20rpx;
          border-radius: 12rpx;
          
          .user-info {
            margin-bottom: 8rpx;
            
            .name {
              font-size: 28rpx;
              color: #333;
              margin-right: 20rpx;
            }
            
            .phone {
              font-size: 28rpx;
              color: #666;
            }
          }
          
          .address-text {
            font-size: 26rpx;
            color: #666;
            line-height: 1.4;
          }
        }
        
        .no-address {
          background: #f8f8f8;
          height: 88rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12rpx;
          
          .placeholder {
            font-size: 28rpx;
            color: #999;
          }
        }
      }
    }
    
    .popup-footer {
      padding: 24rpx 30rpx;
      border-top: 1rpx solid #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: space-between;
      
      .points-total {
        .label {
          font-size: 26rpx;
          color: #666;
          margin-right: 8rpx;
        }
        
        .value {
          font-size: 36rpx;
          font-weight: bold;
          color: var(--theme-color, #ff6b6b);
        }
      }
      
      .confirm-btn {
        width: 240rpx;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        background: linear-gradient(135deg, #ff8f8f 0%, #ff6b6b 100%);
        border-radius: 40rpx;
        color: #ffffff;
        font-size: 28rpx;
        font-weight: 500;
        border: none;
        padding: 0;
        
        &.disabled {
          background: #cccccc;
          color: rgba(255, 255, 255, 0.8);
        }
        
        &:active:not(.disabled) {
          transform: scale(0.98);
        }
      }
    }
  }
}

// 适配顶部安全区
.category-scroll {
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
}

// 添加按钮动画
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.98);
  }
  100% {
    transform: scale(1);
  }
}

.confirm-btn:not(.disabled) {
  animation: pulse 2s infinite;
  
  &:active {
    animation: none;
    transform: scale(0.98);
  }
}
</style> 