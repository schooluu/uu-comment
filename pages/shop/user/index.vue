<template>
  <view class="user-container">
    <!-- 用户信息卡片 -->
    <view class="user-card glass-effect">
      <view class="user-info">
        <image :src="userInfo.avatar" class="avatar" mode="aspectFill"/>
        <view class="info-content">
          <text class="nickname">{{ userInfo.nickname }}</text>
          <view class="member-tag">
            <text class="tag-text">{{ userInfo.memberLevel }}</text>
            <text class="exp">{{ userInfo.exp }}/1000</text>
          </view>
        </view>
      </view>
      <view class="user-stats">
        <view 
          class="stat-item" 
          v-for="stat in stats" 
          :key="stat.label"
          @tap="handleStat(stat)"
        >
          <text class="value">{{ stat.value }}</text>
          <text class="label">{{ stat.label }}</text>
        </view>
      </view>
    </view>
    
    <!-- 会员码 -->
    <view class="member-card glass-effect" @tap="showQRCode">
      <view class="card-left">
        <text class="card-title">会员码</text>
        <text class="card-desc">点击出示会员码</text>
      </view>
      <text class="card-icon">🎫</text>
    </view>
    
    <!-- 订单管理 -->
    <view class="order-section glass-effect">
      <view class="section-header">
        <text class="title">我的订单</text>
        <view class="more" @tap="goToOrders">
          <text>全部订单</text>
          <text class="arrow">→</text>
        </view>
      </view>
      <view class="order-types">
        <view class="type-item" v-for="type in orderTypes" :key="type.id" @tap="goToOrders(type.id)">
          <text class="icon">{{ type.icon }}</text>
          <text class="label">{{ type.label }}</text>
          <text class="badge" v-if="type.count">{{ type.count }}</text>
        </view>
      </view>
    </view>
    
    <!-- 功能列表 -->
    <view class="feature-list glass-effect">
      <view class="feature-group" v-for="(group, index) in features" :key="index">
        <text class="group-title">{{ group.title }}</text>
        <view class="group-content">
          <view 
            class="feature-item" 
            v-for="item in group.items" 
            :key="item.id"
            @tap="handleFeature(item)"
          >
            <view class="feature-left">
              <text class="icon">{{ item.icon }}</text>
              <text class="label">{{ item.label }}</text>
            </view>
            <view class="feature-right">
              <text class="value" v-if="item.value">{{ item.value }}</text>
              <text class="arrow">→</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 退出登录 -->
    <view class="logout-btn" @tap="handleLogout">退出登录</view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const userInfo = ref({
  avatar: 'https://example.com/avatar.jpg',
  nickname: '喜茶用户',
  memberLevel: '黑金会员',
  exp: 850
})

const stats = [
  { label: '积分', value: '1,280' },
  { label: '优惠券', value: '3' },
  { label: '收藏', value: '12' }
]

const orderTypes = [
  { id: 1, icon: '🛍️', label: '待付款', count: 0 },
  { id: 2, icon: '📦', label: '待发货', count: 1 },
  { id: 3, icon: '🚚', label: '待收货', count: 0 },
  { id: 4, icon: '⭐', label: '待评价', count: 2 },
  { id: 5, icon: '🔄', label: '退换/售后', count: 0 }
]

const features = [
  {
    title: '我的服务',
    items: [
      { id: 1, icon: '📋', label: '收货地址', value: '' },
      { id: 2, icon: '💳', label: '支付管理', value: '' },
      { id: 3, icon: '🎁', label: '邀请有礼', value: '得30元券' },
      { id: 4, icon: '🏆', label: '会员等级', value: '' }
    ]
  },
  {
    title: '更多服务',
    items: [
      { id: 5, icon: '⚙️', label: '设置', value: '' },
      { id: 6, icon: '📞', label: '联系客服', value: '' },
      { id: 7, icon: '❓', label: '帮助中心', value: '' },
      { id: 8, icon: '📢', label: '关于我们', value: '' }
    ]
  }
]

const showQRCode = () => {
  uni.navigateTo({
    url: '/pages/shop/member/qrcode'
  })
}

const goToOrders = (type = 'all') => {
  const typeMap = {
    1: 'unpaid',     // 待付款
    2: 'unshipped',  // 待发货
    3: 'shipped',    // 待收货
    4: 'review',     // 待评价
    5: 'refund'      // 退换/售后
  }
  
  uni.navigateTo({
    url: `/pages/shop/orders/index?type=${typeMap[type] || 'all'}`
  })
}

const handleFeature = (item) => {
  switch (item.id) {
    case 1: // 收货地址
      uni.navigateTo({
        url: '/pages/shop/user/address'
      })
      break
      
    case 2: // 支付管理
      uni.navigateTo({
        url: '/pages/shop/payment/manage'
      })
      break
      
    case 3: // 邀请有礼
      uni.navigateTo({
        url: '/pages/shop/user/invite'
      })
      break
      
    case 4: // 会员等级
      uni.navigateTo({
        url: '/pages/shop/user/level'
      })
      break
      
    case 5: // 设置
      uni.navigateTo({
        url: '/pages/shop/user/settings'
      })
      break
      
    case 6: // 联系客服
      uni.makePhoneCall({
        phoneNumber: '400-100-5555' // 客服电话
      })
      break
      
    case 7: // 帮助中心
      uni.navigateTo({
        url: '/pages/shop/user/help'
      })
      break
      
    case 8: // 关于我们
      uni.navigateTo({
        url: '/pages/shop/user/about'
      })
      break
  }
}

const handleStat = (stat) => {
  switch (stat.label) {
    case '积分':
      uni.navigateTo({
        url: '/pages/shop/points/index'
      })
      break
      
    case '优惠券':
      uni.navigateTo({
        url: '/pages/shop/coupon/index'
      })
      break
      
    case '收藏':
      uni.navigateTo({
        url: '/pages/shop/favorite/index'
      })
      break
  }
}

const handleLogout = () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        // 清除登录状态
        uni.removeStorageSync('token')
        uni.removeStorageSync('userInfo')
        
        // 重定向到登录页
        uni.reLaunch({
          url: '/pages/shop/login/index'
        })
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.user-container {
  min-height: 100vh;
  background: #f8f9fa;
  padding: 20rpx;
  
  .user-card {
    padding: 30rpx;
    border-radius: 24rpx;
    margin-bottom: 20rpx;
    
    .user-info {
      display: flex;
      align-items: center;
      margin-bottom: 30rpx;
      
      .avatar {
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
        margin-right: 20rpx;
      }
      
      .info-content {
        flex: 1;
        
        .nickname {
          font-size: 36rpx;
          font-weight: bold;
          margin-bottom: 12rpx;
        }
        
        .member-tag {
          display: inline-flex;
          align-items: center;
          background: linear-gradient(45deg, #FFD700, #FFA500);
          border-radius: 100rpx;
          padding: 6rpx 16rpx;
          
          .tag-text {
            font-size: 24rpx;
            color: #fff;
            margin-right: 8rpx;
          }
          
          .exp {
            font-size: 22rpx;
            color: rgba(255,255,255,0.9);
          }
        }
      }
    }
    
    .user-stats {
      display: flex;
      justify-content: space-around;
      
      .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        
        .value {
          font-size: 32rpx;
          font-weight: bold;
          margin-bottom: 8rpx;
        }
        
        .label {
          font-size: 24rpx;
          color: #666;
        }
      }
    }
  }
  
  .member-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;
    border-radius: 24rpx;
    margin-bottom: 20rpx;
    
    .card-left {
      .card-title {
        font-size: 32rpx;
        font-weight: 500;
        margin-bottom: 8rpx;
      }
      
      .card-desc {
        font-size: 24rpx;
        color: #666;
      }
    }
    
    .card-icon {
      font-size: 48rpx;
    }
  }
  
  .order-section {
    padding: 30rpx;
    border-radius: 24rpx;
    margin-bottom: 20rpx;
    
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30rpx;
      
      .title {
        font-size: 32rpx;
        font-weight: 500;
      }
      
      .more {
        font-size: 26rpx;
        color: #666;
        display: flex;
        align-items: center;
        
        .arrow {
          margin-left: 8rpx;
        }
      }
    }
    
    .order-types {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 20rpx;
      
      .type-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        
        .icon {
          font-size: 48rpx;
          margin-bottom: 12rpx;
        }
        
        .label {
          font-size: 24rpx;
          color: #333;
        }
        
        .badge {
          position: absolute;
          top: -8rpx;
          right: 20rpx;
          background: var(--theme-color, #e4393c);
          color: #fff;
          font-size: 20rpx;
          padding: 2rpx 10rpx;
          border-radius: 100rpx;
        }
      }
    }
  }
  
  .feature-list {
    border-radius: 24rpx;
    overflow: hidden;
    margin-bottom: 40rpx;
    
    .feature-group {
      .group-title {
        font-size: 28rpx;
        color: #999;
        padding: 20rpx 30rpx;
        background: rgba(0,0,0,0.02);
      }
      
      .group-content {
        .feature-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 30rpx;
          border-bottom: 1rpx solid rgba(0,0,0,0.05);
          
          &:last-child {
            border-bottom: none;
          }
          
          .feature-left {
            display: flex;
            align-items: center;
            
            .icon {
              font-size: 36rpx;
              margin-right: 10rpx;
            }
            
            .label {
              font-size: 28rpx;
            }
          }
          
          .feature-right {
            display: flex;
            align-items: center;
            
            .value {
              font-size: 26rpx;
              color: #666;
              margin-right: 10rpx;
            }
            
            .arrow {
              font-size: 26rpx;
              color: #666;
            }
          }
        }
      }
    }
  }
  
  .logout-btn {
    padding: 30rpx;
    border-radius: 24rpx;
    background: #fff;
    color: #333;
    font-size: 32rpx;
    font-weight: 500;
    text-align: center;
    margin-top: 40rpx;
  }
}
</style> 