<template>
  <view class="checkout-page">
    <!-- 配送方式选择 -->
    <view class="delivery-type">
      <view class="type-item" :class="{ active: deliveryType === 'pickup' }" @tap="deliveryType = 'pickup'">
        到店自取
      </view>
      <view class="type-item" :class="{ active: deliveryType === 'delivery' }" @tap="deliveryType = 'delivery'">
        外卖配送
      </view>
    </view>

    <!-- 门店信息 -->
    <view class="store-card">
      <view class="store-info">
        <image class="store-logo" :src="store.logo" mode="aspectFill" />
        <view class="store-detail">
          <text class="store-name">{{ store.name }}</text>
          <text class="store-address">{{ store.address }}</text>
        </view>
      </view>
      <view class="pickup-time" v-if="deliveryType === 'pickup'">
        <text class="label">自取时间</text>
        <picker mode="time" :value="pickupTime" start="09:00" end="21:00" @change="onTimeChange">
          <text class="value">{{ pickupTime || '请选择取餐时间' }} ></text>
        </picker>
      </view>
      <view class="pickup-time" v-if="deliveryType === 'delivery'">
        <text class="label">配送时间</text>
        <picker mode="time" :value="deliveryTime" start="09:00" end="21:00" @change="onDeliveryTimeChange">
          <text class="value">{{ deliveryTime || '请选择配送时间' }} ></text>
        </picker>
      </view>
    </view>

    <!-- 配送地址 (仅外卖时显示) -->
    <view class="address-card" v-if="deliveryType === 'delivery'">
      <view class="address-info" @tap="chooseAddress">
        <view v-if="address">
          <view class="user-info">
            <text class="name">{{ address.name }}</text>
            <text class="phone">{{ address.phone }}</text>
          </view>
          <view class="address-wrap">
            <text class="location-icon">📍</text>
            <text class="address">{{ address.fullAddress }}</text>
          </view>
        </view>
        <view v-else class="no-address">
          <text class="icon">+</text>
          <text class="text">请选择收货地址</text>
          <text class="arrow">></text>
        </view>
      </view>
    </view>

    <!-- 商品列表 -->
    <view class="goods-list">
      <view class="list-header">
        <text class="title">订单详情</text>
        <text class="count">共{{ totalCount }}件</text>
      </view>
      <view class="goods-item" v-for="item in cartList" :key="item.id">
        <image :src="item.image" class="goods-image" mode="aspectFill" />
        <view class="goods-info">
          <text class="goods-name">{{ item.name }}</text>
          <text class="goods-desc" v-if="item.description">{{ item.description }}</text>
          <view class="price-wrap">
            <view class="price-info">
              <text class="price">¥{{ item.price }}</text>
              <text class="original-price" v-if="item.originalPrice">¥{{ item.originalPrice }}</text>
            </view>
            <text class="count">x{{ item.count }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 备注 -->
    <view class="remark-box">
      <text class="label">备注</text>
      <input class="remark-input" v-model="remark" placeholder="如需备注请输入" placeholder-class="placeholder" />
    </view>

    <!-- 取餐人信息 -->
    <view class="customer-info">
      <view class="info-item">
        <text class="label">取餐人</text>
        <input class="input" v-model="customerName" placeholder="请输入取餐人姓名" placeholder-class="placeholder" />
      </view>
      <view class="info-item">
        <text class="label">手机号</text>
        <input class="input" type="number" maxlength="11" v-model="customerPhone" placeholder="请输入手机号"
          placeholder-class="placeholder" />
      </view>
    </view>

    <!-- 底部结算栏 -->
    <view class="bottom-bar">
      <view class="price-info">
        <text class="total-label">合计</text>
        <text class="total-price">¥{{ totalPrice }}</text>
      </view>
      <button class="submit-btn"  @tap="submitOrder">
        提交订单
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 门店信息
const store = ref({
  id: 1,
  logo: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
  name: '奶茶店大学城店',
  address: '大学城环街1号楼108号'
})

// 模拟购物车商品数据
const cartList = ref([
  {
    id: 1,
    name: '珍珠奶茶',
    price: 12,
    count: 2,
    image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
    description: '珍珠 + 奶茶',
    originalPrice: 15
  },
  {
    id: 2,
    name: '芋圆奶茶',
    price: 15,
    count: 1,
    image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
    description: '芋圆 + 奶茶',
    originalPrice: 18
  },
  {
    id: 3,
    name: '椰果奶茶',
    price: 13,
    count: 1,
    image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
    description: '椰果 + 奶茶'
  }
])

const pickupTime = ref('')
const remark = ref('')
const customerName = ref('张三')
const customerPhone = ref('13800138000')

// 新增配送相关数据
const deliveryType = ref('pickup') // pickup: 自取, delivery: 外卖
const deliveryTime = ref('')
const address = ref(null)

// 计算总数量
const totalCount = computed(() => {
  return cartList.value.reduce((sum, item) => sum + item.count, 0)
})

// 计算总价
const totalPrice = computed(() => {
  if (!cartList.value?.length) return 0
  return cartList.value.reduce((sum, item) => {
    const price = Number(item.price) || 0
    const count = Number(item.count) || 0
    return sum + (price * count)
  }, 0)
})

// 修改提交条件计算
const canSubmit = computed(() => {
  const baseConditions = customerName.value &&
    customerPhone.value &&
    /^1[3-9]\d{9}$/.test(customerPhone.value) &&
    cartList.value.length > 0

  if (deliveryType.value === 'pickup') {
    return baseConditions && pickupTime.value
  } else {
    return baseConditions && deliveryTime.value && address.value
  }
})

// 选择取餐时间
const onTimeChange = (e) => {
  pickupTime.value = e.detail.value
}

// 选择配送时间
const onDeliveryTimeChange = (e) => {
  deliveryTime.value = e.detail.value
}

// 选择收货地址
const chooseAddress = () => {
  // 这里添加选择地址的逻辑
  uni.navigateTo({
    url: '/pages/shop/user/address'
  })
}

// 提交订单
const submitOrder = async () => {
  // if (!canSubmit.value) {
  //   if (deliveryType.value === 'delivery' && !address.value) {
  //     uni.showToast({
  //       title: '请选择收货地址',
  //       icon: 'none'
  //     })
  //     return
  //   }
  //   if (deliveryType.value === 'delivery' && !deliveryTime.value) {
  //     uni.showToast({
  //       title: '请选择配送时间',
  //       icon: 'none'
  //     })
  //     return
  //   }
  //   if (!pickupTime.value) {
  //     uni.showToast({
  //       title: '请选择取餐时间',
  //       icon: 'none'
  //     })
  //     return
  //   }
  //   if (!customerName.value) {
  //     uni.showToast({
  //       title: '请输入取餐人姓名',
  //       icon: 'none'
  //     })
  //     return
  //   }
  //   if (!customerPhone.value) {
  //     uni.showToast({
  //       title: '请输入手机号',
  //       icon: 'none'
  //     })
  //     return
  //   }
  //   if (!/^1[3-9]\d{9}$/.test(customerPhone.value)) {
  //     uni.showToast({
  //       title: '手机号格式不正确',
  //       icon: 'none'
  //     })
  //     return
  //   }
  //   return
  // }

  try {
    uni.showLoading({ title: '提交中...' })

    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1500))

    uni.hideLoading()
    uni.showToast({
      title: '下单成功',
      icon: 'success'
    })

    // 清空购物车
    uni.removeStorageSync('cartItems')

    // 跳转到订单详情
    setTimeout(() => {
      uni.redirectTo({
        url: '/pages/shop/store/orderDetail?id=123'
      })
    }, 1500)

  } catch (error) {
    uni.hideLoading()
    uni.showToast({
      title: '下单失败',
      icon: 'none'
    })
  }
}
</script>

<style lang="scss">
@mixin text-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.checkout-page {
  min-height: 100vh;
  background: #f8f8f8;
  padding-bottom: 120rpx;

  .delivery-type {
    display: flex;
    background: #fff;
    margin: 20rpx;
    border-radius: 16rpx;
    overflow: hidden;

    .type-item {
      flex: 1;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      font-size: 28rpx;
      color: #666;

      &.active {
        color: #e4393c;
        background: rgba(228, 57, 60, 0.1);
      }
    }
  }

  .store-card {
    background: #fff;
    margin: 20rpx;
    border-radius: 16rpx;
    padding: 24rpx;

    .store-info {
      display: flex;
      align-items: center;
      padding-bottom: 24rpx;
      border-bottom: 1rpx solid #f5f5f5;

      .store-logo {
        width: 80rpx;
        height: 80rpx;
        border-radius: 12rpx;
        margin-right: 16rpx;
      }

      .store-detail {
        flex: 1;

        .store-name {
          font-size: 32rpx;
          font-weight: 500;
        }

        .store-address {
          font-size: 26rpx;
          color: #666;
          margin-top: 8rpx;
        }
      }
    }

    .pickup-time {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 24rpx;

      .label {
        font-size: 28rpx;
        color: #333;
      }

      .value {
        font-size: 28rpx;
        color: #666;
      }
    }
  }

  .goods-list {
    background: #fff;
    margin: 20rpx;
    border-radius: 16rpx;
    padding: 24rpx;

    .list-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24rpx;

      .title {
        font-size: 32rpx;
        font-weight: 500;
      }

      .count {
        font-size: 26rpx;
        color: #666;
      }
    }

    .goods-item {
      display: flex;
      padding: 20rpx 0;
      border-bottom: 1rpx solid #f5f5f5;

      &:last-child {
        border-bottom: none;
        padding-bottom: 0;
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
          @include text-ellipsis;
        }

        .goods-desc {
          font-size: 24rpx;
          color: #999;
          margin-top: 8rpx;
          @include text-ellipsis;
        }

        .price-wrap {
          margin-top: 12rpx;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .price-info {
            .price {
              font-size: 32rpx;
              color: #e4393c;
              font-weight: 500;
            }

            .original-price {
              font-size: 24rpx;
              color: #999;
              text-decoration: line-through;
              margin-left: 12rpx;
            }
          }

          .count {
            font-size: 26rpx;
            color: #666;
          }
        }
      }
    }
  }

  .customer-info {
    background: #fff;
    margin: 20rpx;
    border-radius: 16rpx;
    padding: 0 24rpx;

    .info-item {
      display: flex;
      align-items: center;
      height: 88rpx;
      border-bottom: 1rpx solid #f5f5f5;

      &:last-child {
        border-bottom: none;
      }

      .label {
        width: 140rpx;
        font-size: 28rpx;
        color: #333;
      }

      .input {
        flex: 1;
        font-size: 28rpx;
      }

      .placeholder {
        color: #999;
      }
    }
  }

  .remark-box {
    background: #fff;
    margin: 20rpx;
    border-radius: 16rpx;
    padding: 24rpx;

    .label {
      font-size: 28rpx;
      color: #333;
      margin-bottom: 16rpx;
      display: block;
    }

    .remark-input {
      width: 100%;
      height: 80rpx;
      background: #f8f8f8;
      border-radius: 8rpx;
      padding: 0 24rpx;
      font-size: 28rpx;
    }

    .placeholder {
      color: #999;
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
    box-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.05);

    .price-info {
      flex: 1;

      .total-label {
        font-size: 28rpx;
        color: #333;
      }

      .total-price {
        font-size: 36rpx;
        font-weight: 500;
        color: #e4393c;
        margin-left: 12rpx;
      }
    }

    .submit-btn {
      width: 240rpx;
      height: 72rpx;
      line-height: 72rpx;
      background: #e4393c;
      color: #fff;
      font-size: 28rpx;
      border-radius: 36rpx;

      &[disabled] {
        background: #ccc;
      }
    }
  }

  .address-card {
    background: #fff;
    margin: 20rpx;
    border-radius: 16rpx;
    padding: 30rpx 24rpx;
    box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.03);

    .address-info {
      position: relative;

      &::after {
        content: '>';
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        color: #999;
        font-family: sans-serif;
      }

      .user-info {
        margin-bottom: 16rpx;

        .name {
          font-size: 32rpx;
          font-weight: 600;
          margin-right: 24rpx;
          color: #333;
        }

        .phone {
          font-size: 28rpx;
          color: #666;
        }
      }

      .address-wrap {
        display: flex;
        align-items: flex-start;

        .location-icon {
          font-size: 28rpx;
          margin-right: 8rpx;
          line-height: 1.4;
        }

        .address {
          flex: 1;
          font-size: 28rpx;
          color: #333;
          line-height: 1.4;
        }
      }

      .no-address {
        display: flex;
        align-items: center;
        height: 88rpx;
        color: #666;

        .icon {
          font-size: 40rpx;
          margin-right: 16rpx;
          color: #999;
          font-weight: 300;
        }

        .text {
          flex: 1;
          font-size: 30rpx;
        }

        .arrow {
          font-size: 28rpx;
          color: #999;
          margin-left: 8rpx;
        }
      }
    }

    &:active {
      background: #fafafa;
    }
  }
}
</style>