<template>
  <view class="payment-container">
    <!-- 支付金额 -->
    <view class="amount-card glass-effect">
      <text class="label">支付金额</text>
      <view class="amount">
        <text class="currency">¥</text>
        <text class="value">{{ orderInfo.amount }}</text>
      </view>
    </view>
    
    <!-- 订单信息 -->
    <view class="order-info glass-effect">
      <view class="info-item">
        <text class="label">订单编号</text>
        <view class="value-wrap">
          <text class="value">{{ orderInfo.orderNo }}</text>
          <text class="copy-btn" @tap="copyOrderNo">复制</text>
        </view>
      </view>
      <view class="info-item">
        <text class="label">商品名称</text>
        <text class="value">{{ orderInfo.goodsName }}</text>
      </view>
      <view class="info-item">
        <text class="label">下单时间</text>
        <text class="value">{{ orderInfo.createTime }}</text>
      </view>
    </view>
    
    <!-- 支付方式 -->
    <view class="payment-methods glass-effect">
      <view class="section-title">支付方式</view>
      <radio-group @change="handlePaymentChange">
        <label 
          class="method-item"
          v-for="method in paymentMethods"
          :key="method.value"
        >
          <view class="method-info">
            <image :src="method.icon" class="method-icon"/>
            <view class="method-detail">
              <text class="method-name">{{ method.name }}</text>
              <text class="method-desc" v-if="method.desc">{{ method.desc }}</text>
            </view>
          </view>
          <radio 
            :value="method.value"
            :checked="method.value === selectedMethod"
            color="var(--theme-color, #e4393c)"
          />
        </label>
      </radio-group>
    </view>
    
    <!-- 优惠券 -->
    <view class="coupon-section glass-effect" @tap="showCouponList">
      <text class="label">优惠券</text>
      <view class="value-wrap">
        <text class="value" :class="{ 'has-coupon': selectedCoupon }">
          {{ selectedCoupon ? `省${selectedCoupon.amount}元` : '暂无可用优惠券' }}
        </text>
        <text class="arrow">→</text>
      </view>
    </view>
    
    <!-- 实付金额 -->
    <view class="actual-amount glass-effect">
      <view class="amount-item">
        <text class="label">商品金额</text>
        <text class="value">¥{{ orderInfo.amount }}</text>
      </view>
      <view class="amount-item" v-if="selectedCoupon">
        <text class="label">优惠券</text>
        <text class="value discount">-¥{{ selectedCoupon.amount }}</text>
      </view>
      <view class="amount-item total">
        <text class="label">实付金额</text>
        <text class="value">¥{{ actualAmount }}</text>
      </view>
    </view>
    
    <!-- 支付按钮 -->
    <view class="payment-bar">
      <view class="total-wrap">
        <text class="label">实付金额：</text>
        <text class="currency">¥</text>
        <text class="value">{{ actualAmount }}</text>
      </view>
      <button class="pay-btn" @tap="handlePay">立即支付</button>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 订单信息
const orderInfo = ref({
  orderNo: 'DD20240120001',
  amount: '139.00',
  goodsName: '喜茶保温杯等2件商品',
  createTime: '2024-01-20 14:30:00'
})

// 支付方式
const paymentMethods = [
  {
    value: 'wxpay',
    name: '微信支付',
    icon: '/static/payment/wxpay.png',
    desc: '推荐使用微信支付'
  },
  {
    value: 'alipay',
    name: '支付宝',
    icon: '/static/payment/alipay.png'
  },
  {
    value: 'balance',
    name: '余额支付',
    icon: '/static/payment/balance.png',
    desc: '可用余额 ¥99.99'
  }
]

const selectedMethod = ref('wxpay')
const selectedCoupon = ref(null)

// 实付金额
const actualAmount = computed(() => {
  const amount = Number(orderInfo.value.amount)
  const discount = selectedCoupon.value ? Number(selectedCoupon.value.amount) : 0
  return (amount - discount).toFixed(2)
})

// 复制订单号
const copyOrderNo = () => {
  uni.setClipboardData({
    data: orderInfo.value.orderNo,
    success: () => {
      uni.showToast({
        title: '复制成功',
        icon: 'success'
      })
    }
  })
}

// 选择支付方式
const handlePaymentChange = (e) => {
  selectedMethod.value = e.detail.value
}

// 显示优惠券列表
const showCouponList = () => {
  uni.showActionSheet({
    itemList: ['满100减10券', '满200减20券', '不使用优惠券'],
    success: (res) => {
      if (res.tapIndex === 0) {
        selectedCoupon.value = { amount: '10.00' }
      } else if (res.tapIndex === 1) {
        selectedCoupon.value = { amount: '20.00' }
      } else {
        selectedCoupon.value = null
      }
    }
  })
}

// 处理支付
const handlePay = async () => {
  uni.showLoading({
    title: '支付中...'
  })
  
  try {
    // 模拟支付过程
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    uni.hideLoading()
    uni.showToast({
      title: '支付成功',
      icon: 'success'
    })
    
    // 跳转到支付成功页
    setTimeout(() => {
      uni.redirectTo({
        url: '/pages/shop/payment/success'
      })
    }, 1500)
  } catch (e) {
    uni.hideLoading()
    uni.showToast({
      title: '支付失败',
      icon: 'error'
    })
  }
}
</script>

<style lang="scss" scoped>
.payment-container {
  min-height: 100vh;
  background: #f8f9fa;
  padding: 20rpx 20rpx 120rpx;
  
  .amount-card {
    padding: 40rpx;
    border-radius: 24rpx;
    margin-bottom: 20rpx;
    text-align: center;
    
    .label {
      font-size: 28rpx;
      color: #666;
      margin-bottom: 20rpx;
      display: block;
    }
    
    .amount {
      .currency {
        font-size: 40rpx;
        font-weight: bold;
      }
      
      .value {
        font-size: 60rpx;
        font-weight: bold;
      }
    }
  }
  
  .order-info {
    padding: 30rpx;
    border-radius: 24rpx;
    margin-bottom: 20rpx;
    
    .info-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20rpx;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .label {
        font-size: 26rpx;
        color: #666;
      }
      
      .value-wrap {
        display: flex;
        align-items: center;
        
        .value {
          font-size: 26rpx;
          color: #333;
          margin-right: 20rpx;
        }
        
        .copy-btn {
          font-size: 24rpx;
          color: var(--theme-color, #e4393c);
          padding: 4rpx 16rpx;
          border: 1rpx solid currentColor;
          border-radius: 100rpx;
        }
      }
    }
  }
  
  .payment-methods {
    padding: 30rpx;
    border-radius: 24rpx;
    margin-bottom: 20rpx;
    
    .section-title {
      font-size: 30rpx;
      font-weight: 500;
      margin-bottom: 20rpx;
    }
    
    .method-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx 0;
      
      .method-info {
        display: flex;
        align-items: center;
        
        .method-icon {
          width: 48rpx;
          height: 48rpx;
          margin-right: 20rpx;
        }
        
        .method-detail {
          .method-name {
            font-size: 28rpx;
            font-weight: 500;
            margin-bottom: 4rpx;
            display: block;
          }
          
          .method-desc {
            font-size: 24rpx;
            color: #999;
          }
        }
      }
    }
  }
  
  .coupon-section {
    padding: 30rpx;
    border-radius: 24rpx;
    margin-bottom: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .label {
      font-size: 28rpx;
    }
    
    .value-wrap {
      display: flex;
      align-items: center;
      
      .value {
        font-size: 26rpx;
        color: #999;
        margin-right: 10rpx;
        
        &.has-coupon {
          color: var(--theme-color, #e4393c);
        }
      }
      
      .arrow {
        font-size: 24rpx;
        color: #999;
      }
    }
  }
  
  .actual-amount {
    padding: 30rpx;
    border-radius: 24rpx;
    margin-bottom: 20rpx;
    
    .amount-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16rpx;
      
      .label {
        font-size: 26rpx;
        color: #666;
      }
      
      .value {
        font-size: 26rpx;
        
        &.discount {
          color: var(--theme-color, #e4393c);
        }
      }
      
      &.total {
        margin-top: 20rpx;
        padding-top: 20rpx;
        border-top: 1rpx solid rgba(0,0,0,0.05);
        
        .label {
          font-size: 28rpx;
          color: #333;
        }
        
        .value {
          font-size: 32rpx;
          font-weight: bold;
          color: var(--theme-color, #e4393c);
        }
      }
    }
  }
  
  .payment-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30rpx;
    background: #fff;
    
    .total-wrap {
      display: flex;
      align-items: baseline;
      
      .label {
        font-size: 26rpx;
        color: #666;
      }
      
      .currency {
        font-size: 28rpx;
        color: var(--theme-color, #e4393c);
        font-weight: bold;
      }
      
      .value {
        font-size: 36rpx;
        color: var(--theme-color, #e4393c);
        font-weight: bold;
      }
    }
    
    .pay-btn {
      width: 240rpx;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      background: var(--theme-color, #e4393c);
      color: #fff;
      border-radius: 40rpx;
      font-size: 30rpx;
    }
  }
}
</style> 