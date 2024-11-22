<template>
  <view class="address-page">
    <!-- 地址列表 -->
    <view class="address-list" v-if="addressList.length">
      <view class="address-item" v-for="item in addressList" :key="item.id">
        <view class="content" @tap="selectAddress(item)">
          <view class="info">
            <view class="user-info">
              <text class="name">{{ item.name }}</text>
              <text class="phone">{{ item.phone }}</text>
              <text class="tag" v-if="item.tag">{{ item.tag }}</text>
            </view>
            <view class="address-info">
              <text class="location-icon">📍</text>
              <text class="text">{{ item.fullAddress }}</text>
            </view>
          </view>
          <view class="actions">
            <view class="default" @tap.stop="setDefault(item)">
              <text class="checkbox" :class="{ active: item.isDefault }"></text>
              <text class="label">默认地址</text>
            </view>
            <view class="edit" @tap.stop="editAddress(item)">
              <text class="icon">✎</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 空状态 -->
    <view class="empty" v-else>
      <image class="empty-icon" src="/static/images/empty-address.png" />
      <text class="empty-text">暂无收货地址</text>
    </view>

    <!-- 底部按钮 -->
    <view class="footer">
      <button class="add-btn" @tap="addAddress">+ 新增收货地址</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const addressList = ref([
  {
    id: 1,
    name: '张三',
    phone: '13800138000',
    tag: '家',
    fullAddress: '广东省深圳市南山区科技园南区科兴科学园C座',
    isDefault: true
  },
  // ... 其他地址数据
])

// 选择地址
const selectAddress = (address) => {
  // 如果是从订单页面跳转来的，选择后返回
  const pages = getCurrentPages()
  if (pages.length > 1) {
    uni.navigateBack({
      success: () => {
        // 向上一页传递选中的地址
        const prevPage = pages[pages.length - 2]
        prevPage.$vm.address = address
      }
    })
  }
}

// 设置默认地址
const setDefault = (address) => {
  addressList.value.forEach(item => {
    item.isDefault = item.id === address.id
  })
}

// 编辑地址
const editAddress = (address) => {
  uni.navigateTo({
    url: `/pages/shop/user/address-edit?id=${address.id}`
  })
}

// 新增地址
const addAddress = () => {
  uni.navigateTo({
    url: '/pages/shop/user/address-edit'
  })
}
</script>

<style lang="scss">
.address-page {
  min-height: 100vh;
  background: #f8f8f8;
  padding-bottom: 140rpx;
}

.address-list {
  padding: 20rpx;
  
  .address-item {
    background: #fff;
    border-radius: 16rpx;
    margin-bottom: 20rpx;
    padding: 30rpx 24rpx;
    box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.03);
    
    .content {
      .info {
        margin-bottom: 20rpx;
        
        .user-info {
          margin-bottom: 16rpx;
          display: flex;
          align-items: center;
          
          .name {
            font-size: 32rpx;
            font-weight: 600;
            margin-right: 20rpx;
            color: #333;
          }
          
          .phone {
            font-size: 28rpx;
            color: #666;
            margin-right: 20rpx;
          }
          
          .tag {
            font-size: 24rpx;
            color: #ff6b6b;
            background: rgba(255, 107, 107, 0.1);
            padding: 4rpx 12rpx;
            border-radius: 8rpx;
          }
        }
        
        .address-info {
          display: flex;
          align-items: flex-start;
          
          .location-icon {
            font-size: 28rpx;
            margin-right: 8rpx;
          }
          
          .text {
            flex: 1;
            font-size: 28rpx;
            color: #333;
            line-height: 1.4;
          }
        }
      }
      
      .actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 20rpx;
        border-top: 2rpx solid #f5f5f5;
        
        .default {
          display: flex;
          align-items: center;
          
          .checkbox {
            width: 32rpx;
            height: 32rpx;
            border: 2rpx solid #ddd;
            border-radius: 50%;
            margin-right: 12rpx;
            position: relative;
            
            &.active {
              background: #ff6b6b;
              border-color: #ff6b6b;
              
              &::after {
                content: '';
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 16rpx;
                height: 16rpx;
                background: #fff;
                border-radius: 50%;
              }
            }
          }
          
          .label {
            font-size: 26rpx;
            color: #666;
          }
        }
        
        .edit {
          padding: 10rpx;
          
          .icon {
            font-size: 36rpx;
            color: #999;
          }
        }
      }
    }
  }
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 200rpx;
  
  .empty-icon {
    width: 200rpx;
    height: 200rpx;
    margin-bottom: 20rpx;
  }
  
  .empty-text {
    font-size: 28rpx;
    color: #999;
  }
}

.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  padding: 20rpx;
  box-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.03);
  
  .add-btn {
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
    background: #ff6b6b;
    color: #fff;
    border-radius: 44rpx;
    font-size: 30rpx;
    font-weight: 500;
    
    &:active {
      background: darken(#ff6b6b, 5%);
    }
  }
}
</style>
