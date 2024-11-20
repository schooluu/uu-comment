<template>
  <view class="container">
    <view class="header">
      <text class="title">申请开票</text>
    </view>
    
    <!-- 订单选择 -->
    <view class="order-section">
      <text class="section-title">选择订单</text>
      <view class="order-list">
        <view 
          class="order-item" 
          v-for="order in orders" 
          :key="order.id"
          :class="{ selected: selectedOrders.includes(order.id) }"
          @tap="toggleOrder(order)"
        >
          <view class="info">
            <text class="name">{{ order.name }}</text>
            <text class="time">{{ order.time }}</text>
          </view>
          <text class="amount">¥{{ order.amount }}</text>
        </view>
      </view>
    </view>
    
    <!-- 发票信息 -->
    <view class="form-section">
      <text class="section-title">发票信息</text>
      <view class="form-item">
        <text class="label">发票类型</text>
        <radio-group class="radio-group" @change="handleTypeChange">
          <label class="radio" v-for="type in invoiceTypes" :key="type.value">
            <radio :value="type.value" :checked="type.value === invoiceType" color="#FF4D8F" />
            <text>{{ type.label }}</text>
          </label>
        </radio-group>
      </view>
      
      <view class="form-item">
        <text class="label">发票抬头</text>
        <input 
          class="input" 
          v-model="title" 
          placeholder="请输入发票抬头"
          placeholder-class="placeholder"
        />
      </view>
      
      <view class="form-item" v-if="invoiceType === 'company'">
        <text class="label">税号</text>
        <input 
          class="input" 
          v-model="taxNumber" 
          placeholder="请输入纳税人识别号"
          placeholder-class="placeholder"
        />
      </view>
      
      <view class="form-item">
        <text class="label">接收邮箱</text>
        <input 
          class="input" 
          v-model="email" 
          placeholder="请输入接收发票的邮箱"
          placeholder-class="placeholder"
        />
      </view>
    </view>
    
    <!-- 提交按钮 -->
    <button class="submit-btn" @tap="submit">
      提交申请
    </button>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const orders = ref([
  {
    id: 1,
    name: 'JAZZ基础课程 30次卡',
    time: '2024-03-15',
    amount: '2999'
  },
  {
    id: 2,
    name: '现代舞私教课程',
    time: '2024-03-10',
    amount: '399'
  }
])

const selectedOrders = ref([])
const invoiceType = ref('personal')
const title = ref('')
const taxNumber = ref('')
const email = ref('')

const invoiceTypes = [
  { label: '个人', value: 'personal' },
  { label: '单位', value: 'company' }
]

const toggleOrder = (order) => {
  const index = selectedOrders.value.indexOf(order.id)
  if (index > -1) {
    selectedOrders.value.splice(index, 1)
  } else {
    selectedOrders.value.push(order.id)
  }
}

const handleTypeChange = (e) => {
  invoiceType.value = e.detail.value
}

const submit = () => {
  if (selectedOrders.value.length === 0) {
    uni.showToast({
      title: '请选择需要开票的订单',
      icon: 'none'
    })
    return
  }
  
  if (!title.value) {
    uni.showToast({
      title: '请输入发票抬头',
      icon: 'none'
    })
    return
  }
  
  if (invoiceType.value === 'company' && !taxNumber.value) {
    uni.showToast({
      title: '请输入税号',
      icon: 'none'
    })
    return
  }
  
  if (!email.value) {
    uni.showToast({
      title: '请输入接收邮箱',
      icon: 'none'
    })
    return
  }
  
  // 提交开票申请
  uni.showLoading({
    title: '提交中'
  })
  
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({
      title: '申请提交成功',
      icon: 'success'
    })
    // 返回上一页
    uni.navigateBack()
  }, 1500)
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  background-color: #1C1B21;
  padding: 30rpx;
}

.header {
  margin-bottom: 40rpx;
  
  .title {
    color: #fff;
    font-size: 36rpx;
    font-weight: 600;
  }
}

.section-title {
  color: rgba(255,255,255,0.6);
  font-size: 28rpx;
  margin-bottom: 20rpx;
  display: block;
}

.order-section {
  margin-bottom: 40rpx;
  
  .order-list {
    .order-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255,255,255,0.1);
      border-radius: 20rpx;
      padding: 30rpx;
      margin-bottom: 20rpx;
      
      &.selected {
        background: rgba(255,77,143,0.1);
        border: 2rpx solid #FF4D8F;
      }
      
      .info {
        .name {
          color: #fff;
          font-size: 28rpx;
          margin-bottom: 8rpx;
          display: block;
        }
        
        .time {
          color: rgba(255,255,255,0.4);
          font-size: 24rpx;
        }
      }
      
      .amount {
        color: #FF4D8F;
        font-size: 32rpx;
        font-weight: 600;
      }
    }
  }
}

.form-section {
  margin-bottom: 60rpx;
  
  .form-item {
    margin-bottom: 30rpx;
    
    .label {
      color: #fff;
      font-size: 28rpx;
      margin-bottom: 16rpx;
      display: block;
    }
    
    .radio-group {
      display: flex;
      gap: 40rpx;
      
      .radio {
        color: #fff;
        font-size: 28rpx;
      }
    }
    
    .input {
      background: rgba(255,255,255,0.1);
      border-radius: 12rpx;
      height: 80rpx;
      padding: 0 30rpx;
      color: #fff;
      font-size: 28rpx;
    }
    
    .placeholder {
      color: rgba(255,255,255,0.3);
    }
  }
}

.submit-btn {
  position: fixed;
  bottom: 40rpx;
  left: 40rpx;
  right: 40rpx;
  height: 88rpx;
  line-height: 88rpx;
  background: #FF4D8F;
  color: #fff;
  font-size: 32rpx;
  border-radius: 100rpx;
}
</style> 