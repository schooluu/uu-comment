<template>
    <view class="order-detail">
      <!-- 订单状态 -->
      <view class="status-card">
        <view class="status-header">
          <text class="status-text">{{ orderStatus.text }}</text>
          <text class="status-desc">{{ orderStatus.desc }}</text>
        </view>
        <view class="pickup-info">
          <view class="qrcode-wrap" @tap="showQrcode">
            <image class="qrcode" :src="order.qrcode" mode="aspectFit"/>
            <text class="qrcode-tip">点击查看取餐码</text>
          </view>
          <view class="pickup-detail">
            <text class="pickup-code">取餐码：{{ order.pickupCode }}</text>
            <text class="pickup-time">取餐时间：{{ order.pickupTime }}</text>
          </view>
        </view>
      </view>
  
      <!-- 门店信息 -->
      <view class="store-card">
        <view class="store-info">
          <image class="store-logo" :src="order.store.logo" mode="aspectFill"/>
          <view class="store-detail">
            <text class="store-name">{{ order.store.name }}</text>
            <text class="store-address">{{ order.store.address }}</text>
          </view>
        </view>
        <button 
          class="contact-btn" 
          @tap="contactStore"
          hover-class="contact-btn-hover"
        >
          <text class="icon iconfont icon-phone"></text>
          <text class="btn-text">联系门店</text>
        </button>
      </view>
  
      <!-- 订单信息 -->
      <view class="order-card">
        <view class="card-title">订单详情</view>
        <view class="goods-list">
          <view 
            class="goods-item"
            v-for="item in order.goods"
            :key="item.id"
          >
            <image :src="item.image" class="goods-image" mode="aspectFill"/>
            <view class="goods-info">
              <text class="goods-name">{{ item.name }}</text>
              <text class="goods-desc" v-if="item.description">{{ item.description }}</text>
              <view class="price-wrap">
                <text class="price">¥{{ item.price }}</text>
                <text class="count">x{{ item.count }}</text>
              </view>
            </view>
          </view>
        </view>
        <view class="order-total">
          <text>共{{ totalCount }}件商品，实付</text>
          <text class="total-price">¥{{ order.totalAmount }}</text>
        </view>
      </view>
  
      <!-- 订单信息 -->
      <view class="info-card">
        <view class="info-item">
          <text class="label">订单编号</text>
          <text class="value">{{ order.orderNo }}</text>
        </view>
        <view class="info-item">
          <text class="label">下单时间</text>
          <text class="value">{{ order.createTime }}</text>
        </view>
        <view class="info-item">
          <text class="label">取餐人</text>
          <text class="value">{{ order.customerName }}</text>
        </view>
        <view class="info-item">
          <text class="label">手机号</text>
          <text class="value">{{ order.customerPhone }}</text>
        </view>
        <view class="info-item" v-if="order.remark">
          <text class="label">备注</text>
          <text class="value">{{ order.remark }}</text>
        </view>
      </view>
  
      <!-- 底部按钮 -->
      <view class="bottom-bar">
        <button class="action-btn outline" @tap="goHome">返回首页</button>
        <button class="action-btn primary" @tap="goToStore">继续点餐</button>
      </view>
    </view>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  // 模拟订单数据
  const order = ref({
    id: '123',
    orderNo: 'DD20240101123456',
    status: 'waiting',
    pickupCode: 'A123',
    pickupTime: '2024-01-01 12:30',
    createTime: '2024-01-01 12:00',
    customerName: '张三',
    customerPhone: '138****8000',
    remark: '不要太甜',
    totalAmount: 52,
    store: {
      id: 1,
      logo: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
      name: '奶茶店大学城店',
      address: '大学城环街1号楼108号',
      phone: '020-88888888'
    },
    goods: [
      {
        id: 1,
        name: '珍珠奶茶',
        price: 12,
        count: 2,
        image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
        description: '珍珠 + 奶茶'
      },
      {
        id: 2,
        name: '芋圆奶茶',
        price: 15,
        count: 1,
        image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
        description: '芋圆 + 奶茶'
      },
      {
        id: 3,
        name: '椰果奶茶',
        price: 13,
        count: 1,
        image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
        description: '椰果 + 奶茶'
      }
    ],
    qrcode: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
  })
  
  // 订单状态
  const orderStatus = computed(() => {
    const statusMap = {
      waiting: {
        text: '等待取餐',
        desc: '请按时到店取餐，超时订单可能会被取消'
      },
      finished: {
        text: '已完成',
        desc: '订单已完成，欢迎再次光临'
      },
      cancelled: {
        text: '已取消',
        desc: '订单已取消'
      }
    }
    return statusMap[order.value.status]
  })
  
  // 计算总数量
  const totalCount = computed(() => {
    return order.value.goods.reduce((sum, item) => sum + item.count, 0)
  })
  
  // 联系门店
  const contactStore = () => {
    uni.makePhoneCall({
      phoneNumber: order.value.store.phone
    })
  }
  
  // 返回首页
  const goHome = () => {
    uni.navigateTo({
      url: '/pages/shop/home/index'
    })
  }
  
  // 继续点餐
  const goToStore = () => {
    uni.redirectTo({
      url: `/pages/shop/store/goodsList?id=${order.value.store.id}`
    })
  }
  
  // 查看二维码
  const showQrcode = () => {
    uni.previewImage({
      urls: [order.value.qrcode],
      current: 0
    })
  }
  </script>
  
  <style lang="scss">

@mixin text-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
  .order-detail {
    min-height: 100vh;
    background: #f8f8f8;
    padding-bottom: 120rpx;
    
    .status-card {
      background: #e4393c;
      color: #fff;
      padding: 40rpx 24rpx;
      
      .status-header {
        margin-bottom: 24rpx;
        
        .status-text {
          font-size: 36rpx;
          font-weight: 500;
        }
        
        .status-desc {
          font-size: 26rpx;
          margin-top: 8rpx;
          opacity: 0.9;
        }
      }
      
      .pickup-info {
        background: rgba(255,255,255,0.1);
        border-radius: 12rpx;
        padding: 20rpx;
        display: flex;
        align-items: center;
        
        .qrcode-wrap {
          width: 120rpx;
          margin-right: 24rpx;
          text-align: center;
          
          .qrcode {
            width: 120rpx;
            height: 120rpx;
            background: #fff;
            padding: 8rpx;
            border-radius: 12rpx;
          }
          
          .qrcode-tip {
            font-size: 20rpx;
            margin-top: 8rpx;
            opacity: 0.8;
          }
        }
        
        .pickup-detail {
          flex: 1;
          
          .pickup-code {
            font-size: 32rpx;
            font-weight: 500;
            margin-bottom: 8rpx;
            display: block;
          }
          
          .pickup-time {
            font-size: 28rpx;
            opacity: 0.9;
          }
        }
      }
    }
    
    .store-card,
    .order-card,
    .info-card {
      background: #fff;
      margin: 20rpx;
      border-radius: 16rpx;
      padding: 24rpx;
    }
    
    .store-card {
      background: #fff;
      margin: 20rpx;
      border-radius: 16rpx;
      padding: 24rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      
      .store-info {
        display: flex;
        align-items: center;
        flex: 1;
        margin-right: 24rpx;
        
        .store-logo {
          width: 80rpx;
          height: 80rpx;
          border-radius: 8rpx;
          margin-right: 16rpx;
          background: #f8f8f8;
        }
        
        .store-detail {
          flex: 1;
          min-width: 0; // 解决文字溢出问题
          
          .store-name {
            font-size: 28rpx;
            font-weight: 500;
            color: #333;
            @include text-ellipsis;
          }
          
          .store-address {
            font-size: 24rpx;
            color: #666;
            margin-top: 4rpx;
            @include text-ellipsis;
          }
        }
      }
      
      .contact-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0 24rpx;
        height: 64rpx;
        border: none;
        border-radius: 32rpx;
        background: #f8f8f8;
        font-size: 26rpx;
        color: #333;
        
        &::after {
          display: none;
        }
        
        .icon {
          font-size: 32rpx;
          margin-right: 8rpx;
          color: #666;
        }
        
        .btn-text {
          line-height: 1;
        }
        
        &-hover {
          background: #f0f0f0;
          transform: scale(0.98);
        }
      }
    }
    
    .order-card {
      .card-title {
        font-size: 32rpx;
        font-weight: 500;
        margin-bottom: 24rpx;
      }
      
      .goods-list {
        .goods-item {
          display: flex;
          padding: 20rpx 0;
          border-bottom: 1rpx solid #f5f5f5;
          
          &:last-child {
            border-bottom: none;
          }
          
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
              font-weight: 500;
            }
            
            .goods-desc {
              font-size: 24rpx;
              color: #999;
              margin-top: 8rpx;
            }
            
            .price-wrap {
              margin-top: 12rpx;
              display: flex;
              align-items: center;
              justify-content: space-between;
              
              .price {
                font-size: 32rpx;
                color: #e4393c;
                font-weight: 500;
              }
              
              .count {
                font-size: 26rpx;
                color: #666;
              }
            }
          }
        }
      }
      
      .order-total {
        margin-top: 24rpx;
        text-align: right;
        font-size: 28rpx;
        color: #666;
        
        .total-price {
          font-size: 36rpx;
          font-weight: 500;
          color: #e4393c;
          margin-left: 12rpx;
        }
      }
    }
    
    .info-card {
      .info-item {
        display: flex;
        align-items: center;
        padding: 16rpx 0;
        font-size: 28rpx;
        
        .label {
          color: #666;
          width: 140rpx;
        }
        
        .value {
          flex: 1;
          color: #333;
        }
      }
    }
    
    .bottom-bar {
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
      
      .action-btn {
        flex: 1;
        height: 72rpx;
        line-height: 72rpx;
        margin: 0 12rpx;
        border-radius: 36rpx;
        font-size: 28rpx;
        
        &.outline {
          background: #fff;
          border: 1rpx solid #ddd;
          color: #666;
        }
        
        &.primary {
          background: #e4393c;
          color: #fff;
        }
      }
    }
  }
  </style>