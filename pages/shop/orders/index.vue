<template>
  <view class="orders-page">
    <!-- 订单状态标签栏 -->
    <scroll-view 
      class="status-tabs glass-effect" 
      scroll-x 
      :show-scrollbar="false"
      :scroll-into-view="'tab-' + currentTab"
      :scroll-with-animation="true"
      enhanced
    >
      <view class="tabs-content">
        <view 
          class="tab-item" 
          v-for="tab in orderTabs" 
          :key="tab.type"
          :id="'tab-' + tab.type"
          :class="{ active: currentTab === tab.type }"
          @tap="switchTab(tab.type)"
        >
          <view class="tab-content">
            <text class="icon">{{ getTabIcon(tab.type) }}</text>
            <text class="tab-text text-ellipsis">{{ tab.name }}</text>
            <text 
              class="badge" 
              v-if="tab.count"
            >{{ tab.count > 99 ? '99+' : tab.count }}</text>
          </view>
          <view class="active-line" v-if="currentTab === tab.type"></view>
        </view>
      </view>
    </scroll-view>

    <!-- 订单列表 -->
    <scroll-view 
      class="order-list"
      scroll-y
      @scrolltolower="loadMore"
      refresher-enabled
      :refresher-triggered="isRefreshing"
      @refresherrefresh="onRefresh"
    >
      <view 
        class="order-item"
        v-for="order in orderList"
        :key="order.id"
        @tap="goToOrderDetail(order)"
      >
        <view class="order-header">
          <view class="shop-info">
            <text class="shop-name">{{ order.shopName }}</text>
            <text class="order-time">{{ order.createTime }}</text>
          </view>
          <text class="order-status">{{ order.statusText }}</text>
        </view>

        <view class="goods-list">
          <view 
            class="goods-item"
            v-for="goods in order.goodsList"
            :key="goods.id"
          >
            <image 
              :src="goods.image" 
              class="goods-image"
              mode="aspectFill"
            />
            <view class="goods-info">
              <text class="goods-name">{{ goods.name }}</text>
              <text class="goods-spec">{{ goods.spec }}</text>
              <view class="goods-price">
                <text class="price">¥{{ goods.price }}</text>
                <text class="quantity">x{{ goods.quantity }}</text>
              </view>
            </view>
          </view>
        </view>

        <view class="order-footer">
          <view class="total-info">
            共{{ order.totalQuantity }}件商品
            合计：<text class="total-price">¥{{ order.totalAmount }}</text>
          </view>
          <view class="action-buttons">
            <button 
              class="btn"
              v-for="btn in getOrderButtons(order.status)"
              :key="btn.type"
              :class="btn.type"
              @tap.stop="handleOrderAction(btn.type, order)"
            >
              {{ btn.text }}
            </button>
          </view>
        </view>
      </view>

      <!-- 空状态 -->
      <view class="empty-state" v-if="!orderList.length">
        <image 
          src="/static/images/empty-orders.png" 
          class="empty-image"
        />
        <text class="empty-text">暂无相关订单</text>
      </view>

      <!-- 加载更多 -->
      <view class="loading-more" v-if="orderList.length">
        {{ hasMore ? '加载中...' : '没有更多了' }}
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 订单状态标签
const orderTabs = [
  { type: 'all', name: '全部订单', count: 0 },
  { type: 'unpaid', name: '待付款', count: 2 },
  { type: 'unshipped', name: '待发货', count: 1 },
  { type: 'shipped', name: '待收货', count: 0 },
  { type: 'review', name: '待评价', count: 3 },
  { type: 'refund', name: '退款/售后', count: 0 }
]

// 当前选中的标签
const currentTab = ref('all')

// 获取标签图标
const getTabIcon = (type) => {
  const iconMap = {
    all: '📋',
    unpaid: '💰',
    unshipped: '📦',
    shipped: '🚚',
    completed: '✅',
    cancelled: '❌'
  }
  return iconMap[type] || '📋'
}

// 订单列表
const orderList = ref([
  {
    id: '1',
    shopName: '喜茶商城',
    createTime: '2024-01-20 14:30',
    status: 'unpaid',
    statusText: '待付款',
    countdown: 1800, // 剩余支付时间（秒）
    goodsList: [
      {
        id: '1',
        image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
        name: '喜茶经典杯套装',
        spec: '经典款 / 2个装',
        price: '99.00',
        quantity: 1
      }
    ],
    totalQuantity: 1,
    totalAmount: '99.00'
  },
  {
    id: '2',
    shopName: '喜茶商城',
    createTime: '2024-01-19 15:20',
    status: 'unshipped',
    statusText: '待发货',
    goodsList: [
      {
        id: '2',
        image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
        name: '喜茶联名保温杯',
        spec: '樱花粉 / 473ml',
        price: '199.00',
        quantity: 1
      },
      {
        id: '3',
        image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
        name: '喜茶经典帆布包',
        spec: '米白色',
        price: '129.00',
        quantity: 2
      }
    ],
    totalQuantity: 3,
    totalAmount: '457.00'
  },
  {
    id: '3',
    shopName: '喜茶商城',
    createTime: '2024-01-18 10:15',
    status: 'shipped',
    statusText: '待收货',
    expressInfo: {
      company: '顺丰速运',
      number: 'SF1234567890',
      status: '运输中',
      updateTime: '2024-01-19 09:30'
    },
    goodsList: [
      {
        id: '4',
        image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
        name: '喜茶甜品礼盒',
        spec: '综合口味 / 12枚装',
        price: '168.00',
        quantity: 1
      }
    ],
    totalQuantity: 1,
    totalAmount: '168.00'
  },
  {
    id: '4',
    shopName: '喜茶商城',
    createTime: '2024-01-17 16:40',
    status: 'completed',
    statusText: '已完成',
    goodsList: [
      {
        id: '5',
        image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
        name: '喜茶联名T恤',
        spec: '白色 / M码',
        price: '199.00',
        quantity: 1
      }
    ],
    totalQuantity: 1,
    totalAmount: '199.00',
    isReviewed: false
  },
  {
    id: '5',
    shopName: '喜茶商城',
    createTime: '2024-01-16 11:25',
    status: 'refunding',
    statusText: '退款中',
    refundInfo: {
      reason: '商品质量问题',
      amount: '299.00',
      status: '商家处理中',
      submitTime: '2024-01-17 09:15'
    },
    goodsList: [
      {
        id: '6',
        image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
        name: '喜茶复古马克杯',
        spec: '蓝色 / 350ml',
        price: '299.00',
        quantity: 1
      }
    ],
    totalQuantity: 1,
    totalAmount: '299.00'
  },
  {
    id: '6',
    shopName: '喜茶商城',
    createTime: '2024-01-15 14:50',
    status: 'cancelled',
    statusText: '已取消',
    cancelReason: '超时未支付',
    goodsList: [
      {
        id: '7',
        image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
        name: '喜茶联名手机壳',
        spec: 'iPhone 14 Pro',
        price: '129.00',
        quantity: 1
      },
      {
        id: '8',
        image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
        name: '喜茶钥匙扣',
        spec: '银色',
        price: '39.00',
        quantity: 2
      }
    ],
    totalQuantity: 3,
    totalAmount: '207.00'
  },
  {
    id: '7',
    shopName: '喜茶商城',
    createTime: '2024-01-14 09:30',
    status: 'completed',
    statusText: '已完成',
    goodsList: [
      {
        id: '9',
        image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
        name: '喜茶联名帽子',
        spec: '黑色',
        price: '159.00',
        quantity: 1
      }
    ],
    totalQuantity: 1,
    totalAmount: '159.00',
    isReviewed: true,
    reviewInfo: {
      rating: 5,
      content: '帽子质量很好，做工精致，很喜欢！',
      images: ['https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg', 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg'],
      createTime: '2024-01-16 15:20'
    }
  }
])

// 获取订单按钮
const getOrderButtons = (status) => {
  const buttons = {
    unpaid: [
      { type: 'cancel', text: '取消订单' },
      { type: 'pay', text: '立即付款' }
    ],
    unshipped: [
      { type: 'remind', text: '提醒发货' }
    ],
    shipped: [
      { type: 'logistics', text: '查看物流' },
      { type: 'confirm', text: '确认收货' }
    ],
    completed: [
      { type: 'review', text: '评价' },
      { type: 'rebuy', text: '再次购买' }
    ]
  }
  return buttons[status] || []
}

// 处理订单操作
const handleOrderAction = (type, order) => {
  switch (type) {
    case 'pay':
      uni.navigateTo({
        url: `/pages/shop/payment/index?orderId=${order.id}`
      })
      break
    case 'cancel':
      uni.showModal({
        title: '提示',
        content: '确定要取消该订单吗？',
        success: (res) => {
          if (res.confirm) {
            // 取消订单逻辑
          }
        }
      })
      break
    // ... 其他操作处理
  }
}

// 切换标签
const switchTab = (type) => {
  currentTab.value = type
  // 重新加载订单列表
  loadOrderList()
}

// 加载订单列表
const loadOrderList = () => {
  // 调用接口加载订单数据
}

onMounted(() => {
  loadOrderList()
})
</script>

<style lang="scss">
.orders-page {
  min-height: 100vh;
  background: #f8f8f8;
  
  .status-tabs {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 20rpx 0;
    box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
    
    .tabs-content {
      display: flex;
      padding: 0 20rpx;
      
      .tab-item {
        position: relative;
        min-width: 160rpx;
        padding: 0 20rpx;
        flex-shrink: 0;
        
        .tab-content {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 92rpx;
          
          .icon {
            flex-shrink: 0;
            font-size: 32rpx;
            margin-right: 8rpx;
            transition: all 0.3s;
          }
          
          .tab-text {
            font-size: 28rpx;
            color: #666;
            transition: all 0.3s;
            max-width: 120rpx;
            
            &.text-ellipsis {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          
          .badge {
            position: absolute;
            top: 10rpx;
            right: 10rpx;
            min-width: 32rpx;
            height: 32rpx;
            line-height: 32rpx;
            text-align: center;
            background: var(--theme-color, #ff6b6b);
            color: #fff;
            font-size: 20rpx;
            border-radius: 16rpx;
            padding: 0 8rpx;
            transform: scale(0.8) translateY(-50%);
            flex-shrink: 0;
          }
        }
        
        .active-line {
          position: absolute;
          bottom: -4rpx;
          left: 50%;
          transform: translateX(-50%);
          width: 48rpx;
          height: 4rpx;
          background: var(--theme-color, #ff6b6b);
          border-radius: 2rpx;
          transition: all 0.3s;
        }
        
        &.active {
          .tab-content {
            .icon {
              transform: scale(1.1);
              color: var(--theme-color, #ff6b6b);
            }
            
            .tab-text {
              color: #333;
              font-weight: 500;
            }
          }
        }
        
        &:active {
          opacity: 0.7;
        }
      }
    }
  }
  
  .order-list {
    height: calc(100vh - 88rpx);
    
    .order-item {
      margin: 20rpx;
      background: #fff;
      border-radius: 16rpx;
      overflow: hidden;
      
      .order-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20rpx;
        border-bottom: 1rpx solid #f5f5f5;
        
        .shop-info {
          .shop-name {
            font-size: 28rpx;
            font-weight: 500;
            margin-right: 20rpx;
          }
          
          .order-time {
            font-size: 24rpx;
            color: #999;
          }
        }
        
        .order-status {
          font-size: 26rpx;
          color: #ff6b6b;
        }
      }
      
      .goods-list {
        padding: 20rpx;
        
        .goods-item {
          display: flex;
          margin-bottom: 20rpx;
          
          &:last-child {
            margin-bottom: 0;
          }
          
          .goods-image {
            width: 140rpx;
            height: 140rpx;
            border-radius: 8rpx;
            margin-right: 20rpx;
          }
          
          .goods-info {
            flex: 1;
            
            .goods-name {
              font-size: 28rpx;
              color: #333;
              margin-bottom: 8rpx;
            }
            
            .goods-spec {
              font-size: 24rpx;
              color: #999;
              margin-bottom: 8rpx;
            }
            
            .goods-price {
              display: flex;
              justify-content: space-between;
              align-items: center;
              
              .price {
                font-size: 28rpx;
                color: #ff6b6b;
                font-weight: 500;
              }
              
              .quantity {
                font-size: 24rpx;
                color: #999;
              }
            }
          }
        }
      }
      
      .order-footer {
        padding: 20rpx;
        border-top: 1rpx solid #f5f5f5;
        
        .total-info {
          text-align: right;
          font-size: 26rpx;
          color: #666;
          margin-bottom: 20rpx;
          
          .total-price {
            font-size: 32rpx;
            color: #ff6b6b;
            font-weight: 500;
          }
        }
        
        .action-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 20rpx;
          
          .btn {
            min-width: 160rpx;
            height: 60rpx;
            line-height: 60rpx;
            text-align: center;
            border-radius: 30rpx;
            font-size: 26rpx;
            padding: 0 30rpx;
            
            &.cancel {
              background: #f5f5f5;
              color: #666;
            }
            
            &.pay {
              background: #ff6b6b;
              color: #fff;
            }
            
            &:active {
              opacity: 0.8;
            }
          }
        }
      }
    }
    
    .empty-state {
      padding: 100rpx 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      
      .empty-image {
        width: 240rpx;
        height: 240rpx;
        margin-bottom: 20rpx;
      }
      
      .empty-text {
        font-size: 28rpx;
        color: #999;
      }
    }
    
    .loading-more {
      text-align: center;
      padding: 30rpx;
      font-size: 26rpx;
      color: #999;
    }
  }
}
</style> 