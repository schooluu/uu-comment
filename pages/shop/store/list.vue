<template>
  <view class="store-container">
    <!-- 搜索栏 -->
    <view class="search-bar glass-effect">
      <view class="search-input">
        <text class="search-icon">🔍</text>
        <input 
          v-model="searchKeyword"
          placeholder="搜索门店名称或地址"
          @input="handleSearch"
        />
      </view>
      <view class="location" @tap="refreshLocation">
        <text class="location-icon">📍</text>
        <text class="location-text">{{ currentLocation }}</text>
      </view>
    </view>
    
    <!-- 筛选标签 -->
    <scroll-view 
      class="filter-scroll glass-effect" 
      scroll-x 
      :show-scrollbar="false"
      enhanced
    >
      <view class="filter-list">
        <view 
          class="filter-item"
          v-for="(filter, index) in filters"
          :key="index"
          :class="{ active: currentFilter === index }"
          @tap="switchFilter(index)"
        >
          <text class="filter-icon">{{ filterIcons[index] }}</text>
          <text class="filter-text">{{ filter }}</text>
        </view>
      </view>
    </scroll-view>
    
    <!-- 门店列表 -->
    <scroll-view 
      class="store-list"
      scroll-y
      @scrolltolower="loadMore"
      refresher-enabled
      :refresher-triggered="refreshing"
      @refresherrefresh="onRefresh"
    >
      <view 
        class="store-card glass-effect"
        v-for="store in storeList"
        :key="store.id"
        @tap="goToStore(store)"
      >
        <image :src="store.image" mode="aspectFill" class="store-image"/>
        <view class="store-info">
          <view class="store-header">
            <text class="store-name">{{ store.name }}</text>
            <view class="distance-tag">
              <text class="distance">{{ store.distance }}km</text>
            </view>
          </view>
          
          <view class="store-address">
            <text class="address-text">{{ store.address }}</text>
            <text class="navigation-btn" @tap.stop="navigate(store)">导航</text>
          </view>
          
          <view class="store-features">
            <text 
              class="feature-tag"
              v-for="(tag, index) in store.features"
              :key="index"
            >{{ tag }}</text>
          </view>
          
          <view class="store-status">
            <view class="status-info">
              <view class="status-badge" :class="store.status">
                <text class="status-icon">
                  {{ 
                    store.status === 'open' ? '🟢' : 
                    store.status === 'busy' ? '🟡' : '⚪️' 
                  }}
                </text>
                <text class="status-text">{{ store.statusText }}</text>
              </view>
              <view class="hours-info">
                <text class="hours-icon">🕐</text>
                <text class="business-hours">{{ store.businessHours }}</text>
              </view>
            </view>
            <button 
              class="order-btn"
              :class="{ disabled: store.status === 'closed' }"
              @tap.stop="placeOrder(store)"
            >
              <text class="btn-icon">
                {{ store.status === 'closed' ? '🌙' : '🛍️' }}
              </text>
              <text class="btn-text">
                {{ store.status === 'closed' ? '已打烊' : '去下单' }}
              </text>
            </button>
          </view>
        </view>
      </view>
      
      <!-- 加载状态 -->
      <view class="loading-state" v-if="loading">
        <text class="loading-text">加载中...</text>
      </view>
      
      <!-- 空状态 -->
      <view class="empty-state" v-if="storeList.length === 0 && !loading">
        <text class="empty-icon">🏪</text>
        <text class="empty-text">暂无门店</text>
        <text class="empty-desc">换个地址试试吧</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 搜索关键词
const searchKeyword = ref('')
// 当前位置
const currentLocation = ref('正在定位...')
// 筛选条件
const filters = ['全部门店', '距离最近', '评分最高', '新开门店']
const currentFilter = ref(0)
// 刷新加载状态
const refreshing = ref(false)
const loading = ref(false)

// 门店列表数据
const storeList = ref([
  {
    id: 1,
    name: '喜茶北京三里屯店',
    image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
    distance: 0.8,
    address: '北京市朝阳区三里屯太古里北区N8-B1-3',
    features: ['可预约', 'WIFI', '礼品卡', '室内停车'],
    status: 'open', // open, busy, closed
    statusText: '营业中',
    businessHours: '10:00-22:00',
    latitude: 39.934,
    longitude: 116.455
  }, {
    id: 1,
    name: '喜茶北京三里屯店',
    image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
    distance: 0.8,
    address: '北京市朝阳区三里屯太古里北区N8-B1-3',
    features: ['可预约', 'WIFI', '礼品卡', '室内停车'],
    status: 'open', // open, busy, closed
    statusText: '营业中',
    businessHours: '10:00-22:00',
    latitude: 39.934,
    longitude: 116.455
  }, {
    id: 1,
    name: '喜茶北京三里屯店',
    image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
    distance: 0.8,
    address: '北京市朝阳区三里屯太古里北区N8-B1-3',
    features: ['可预约', 'WIFI', '礼品卡', '室内停车'],
    status: 'open', // open, busy, closed
    statusText: '营业中',
    businessHours: '10:00-22:00',
    latitude: 39.934,
    longitude: 116.455
  },
  // ... 更多门店数据
])

// 获取当前位置
const getLocation = () => {
  uni.getLocation({
    type: 'gcj02',
    success: (res) => {
      // 根据经纬度获取地址信息
      uni.request({
        url: `https://api.map.baidu.com/reverse_geocoding/v3/?ak=YOUR_KEY&location=${res.latitude},${res.longitude}`,
        success: (addressRes) => {
          currentLocation.value = addressRes.data.result.address_component.street
        }
      })
    },
    fail: () => {
      currentLocation.value = '定位失败'
    }
  })
}

// 刷新位置
const refreshLocation = () => {
  currentLocation.value = '定位中...'
  getLocation()
  // 刷新完位置后重新获取附近门店
  loadNearbyStores()
}

// 切换筛选条件
const switchFilter = (index) => {
  if (currentFilter.value === index) return
  currentFilter.value = index
  
  // 根据不同筛选条件处理门店列表
  switch(index) {
    case 0: // 全部门店
      loadAllStores()
      break
    case 1: // 距离最近
      sortStoresByDistance()
      break
    case 2: // 评分最高
      sortStoresByRating()
      break
    case 3: // 新开门店
      loadNewStores()
      break
  }
}

// 搜索门店
const handleSearch = () => {
  if (!searchKeyword.value.trim()) {
    loadAllStores()
    return
  }
  
  // 根据关键词过滤门店列表
  const keyword = searchKeyword.value.toLowerCase()
  storeList.value = storeList.value.filter(store => 
    store.name.toLowerCase().includes(keyword) || 
    store.address.toLowerCase().includes(keyword)
  )
}

// 前往门店详情
const goToStore = (store) => {
  uni.navigateTo({
    url: `/pages/shop/store/detail?id=${store.id}`
  })
}

const goToGoodsList = (store) => {
  uni.navigateTo({
    url: `/pages/shop/store/goodsList?id=${store.id}`
  })
}

// 导航到门店
const navigate = (store) => {
  // 防止事件冒泡
  event.stopPropagation()
  uni.openLocation({
    latitude: store.latitude,
    longitude: store.longitude,
    name: store.name,
    address: store.address,
    scale: 18
  })
}

// 去下单
const placeOrder = (store) => {
  // 防止事件冒泡，避免触发整个卡片的点击事件
  event.stopPropagation()
  
  // 判断门店状态
  if (store.status === 'closed') {
    uni.showToast({
      title: '门店已打烊，请明天再来',
      icon: 'none',
      duration: 2000
    })
    return
  }
  
  if (store.status === 'busy') {
    uni.showModal({
      title: '门店忙碌提醒',
      content: '当前门店较为繁忙，可能需要较长等待时间，是否继续下单？',
      confirmText: '继续下单',
      cancelText: '换个门店',
      success: (res) => {
        if (res.confirm) {
           
        }
      }
    })
    return
  }
  
  goToGoodsList(store)
}

// 下拉刷新
const onRefresh = async () => {
  refreshing.value = true
  // TODO: 刷新门店列表数据
  setTimeout(() => {
    refreshing.value = false
  }, 1000)
}

// 加载更多
const loadMore = () => {
  if (loading.value) return
  loading.value = true
  // TODO: 加载更多门店数据
  setTimeout(() => {
    loading.value = false
  }, 1000)
}

// 加载所有门店
const loadAllStores = () => {
  loading.value = true
  // TODO: 调用接口获取所有门店
  setTimeout(() => {
    // 模拟数据
    // storeList.value = [/* ... 门店数据 ... */]
    loading.value = false
  }, 500)
}

// 按距离排序
const sortStoresByDistance = () => {
  storeList.value.sort((a, b) => a.distance - b.distance)
}

// 按评分排序
const sortStoresByRating = () => {
  storeList.value.sort((a, b) => b.rating - a.rating)
}

// 加载新开门店
const loadNewStores = () => {
  loading.value = true
  // TODO: 调用接口获取新开门店
  setTimeout(() => {
    // 模拟数据
    storeList.value = [/* ... 新开门店数据 ... */]
    loading.value = false
  }, 500)
}

// 加载附近门店
const loadNearbyStores = () => {
  loading.value = true
  // TODO: 根据当前位置获取附近门店
  setTimeout(() => {
    // 模拟数据
    storeList.value = [/* ... 附近门店数据 ... */]
    loading.value = false
  }, 500)
}

onMounted(() => {
  // 初始化时获取位置并加载附近门店
  getLocation()
  loadAllStores()
})
</script>

<style lang="scss">
// Mixins
@mixin text-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.store-container {
  min-height: 100vh;
  background: #f8f9fa;
  padding: 20rpx;
  
  .search-bar {
    display: flex;
    align-items: center;
    padding: 20rpx;
    margin-bottom: 20rpx;
    border-radius: 16rpx;
    
    .search-input {
      flex: 1;
      display: flex;
      align-items: center;
      background: #f5f5f5;
      padding: 12rpx 20rpx;
      border-radius: 100rpx;
      margin-right: 20rpx;
      
      .search-icon {
        font-size: 28rpx;
        margin-right: 10rpx;
        color: #999;
      }
      
      input {
        flex: 1;
        font-size: 28rpx;
      }
    }
    
    .location {
      display: flex;
      align-items: center;
      
      .location-icon {
        font-size: 28rpx;
        margin-right: 6rpx;
      }
      
      .location-text {
        font-size: 26rpx;
        color: #666;
        max-width: 200rpx;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  
  .filter-scroll {
    margin-bottom: 20rpx;
    padding: 20rpx;
    border-radius: 16rpx;
    white-space: nowrap;
    
    .filter-list {
      display: inline-flex;
      padding: 0 10rpx;
      
      .filter-item {
        display: flex;
        align-items: center;
        padding: 12rpx 24rpx;
        margin-right: 16rpx;
        background: rgba(255,255,255,0.6);
        border-radius: 100rpx;
        transition: all 0.3s ease;
        
        &:last-child {
          margin-right: 0;
        }
        
        .filter-icon {
          font-size: 28rpx;
          margin-right: 8rpx;
        }
        
        .filter-text {
          font-size: 26rpx;
          color: #666;
        }
        
        &.active {
          background: var(--theme-color, #e4393c);
          
          .filter-icon,
          .filter-text {
            color: #fff;
          }
        }
        
        &:active {
          transform: scale(0.95);
          opacity: 0.9;
        }
      }
    }
  }
  
  .store-list {
    height: calc(100vh - 200rpx);
    
    .store-card {
      margin-bottom: 20rpx;
      border-radius: 16rpx;
      overflow: hidden;
      
      .store-image {
        width: 100%;
        height: 300rpx;
      }
      
      .store-info {
        padding: 20rpx;
        
        .store-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16rpx;
          
          .store-name {
            font-size: 32rpx;
            font-weight: 500;
          }
          
          .distance-tag {
            padding: 6rpx 16rpx;
            background: #f5f5f5;
            border-radius: 100rpx;
            
            .distance {
              font-size: 24rpx;
              color: #666;
            }
          }
        }
        
        .store-address {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16rpx;
          
          .address-text {
            flex: 1;
            font-size: 26rpx;
            color: #666;
            margin-right: 20rpx;
          }
          
          .navigation-btn {
            font-size: 26rpx;
            color: var(--theme-color, #e4393c);
            padding: 6rpx 20rpx;
            border: 1rpx solid currentColor;
            border-radius: 100rpx;
          }
        }
        
        .store-features {
          display: flex;
          flex-wrap: wrap;
          gap: 12rpx;
          margin-bottom: 16rpx;
          
          .feature-tag {
            padding: 6rpx 16rpx;
            background: #f5f5f5;
            border-radius: 6rpx;
            font-size: 24rpx;
            color: #666;
          }
        }
        
        .store-status {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20rpx;
          padding-top: 20rpx;
          border-top: 1px solid rgba(0,0,0,0.05);
          
          .status-info {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 16rpx;
            margin-right: 16rpx;
            min-width: 0;
            
            .status-badge {
              display: flex;
              align-items: center;
              padding: 6rpx 16rpx;
              border-radius: 100rpx;
              background: rgba(0,0,0,0.05);
              flex-shrink: 0;
              
              .status-icon {
                font-size: 24rpx;
                margin-right: 6rpx;
              }
              
              .status-text {
                font-size: 24rpx;
                font-weight: 500;
              }
              
              &.open {
                background: rgba(76,175,80,0.1);
                color: #4caf50;
              }
              
              &.busy {
                background: rgba(255,152,0,0.1);
                color: #ff9800;
              }
              
              &.closed {
                background: rgba(0,0,0,0.05);
                color: #999;
              }
            }
            
            .hours-info {
              display: flex;
              align-items: center;
              flex: 1;
              min-width: 0;
              
              .hours-icon {
                font-size: 24rpx;
                margin-right: 6rpx;
                color: #999;
                flex-shrink: 0;
              }
              
              .business-hours {
                font-size: 24rpx;
                color: #666;
                @include text-ellipsis;
              }
            }
          }
          
          .order-btn {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            padding: 16rpx 32rpx;
            border-radius: 100rpx;
            background: linear-gradient(135deg, var(--theme-color, #e4393c), #ff6b6b);
            box-shadow: 0 4rpx 12rpx rgba(228,57,60,0.2);
            transition: all 0.3s ease;
            
            .btn-icon {
              font-size: 28rpx;
              margin-right: 8rpx;
            }
            
            .btn-text {
              font-size: 26rpx;
              color: #fff;
              font-weight: 500;
            }
            
            &:active {
              transform: translateY(2rpx);
              box-shadow: 0 2rpx 8rpx rgba(228,57,60,0.1);
            }
            
            &.disabled {
              background: linear-gradient(135deg, #ccc, #999);
              box-shadow: none;
              opacity: 0.8;
            }
          }
        }
      }
    }
    
    .loading-state,
    .empty-state {
      padding: 40rpx 0;
      text-align: center;
      
      .loading-text {
        font-size: 26rpx;
        color: #999;
      }
    }
    
    .empty-state {
      padding-top: 200rpx;
      
      .empty-icon {
        font-size: 120rpx;
        margin-bottom: 30rpx;
        display: block;
      }
      
      .empty-text {
        font-size: 30rpx;
        color: #333;
        margin-bottom: 16rpx;
        display: block;
      }
      
      .empty-desc {
        font-size: 26rpx;
        color: #999;
      }
    }
  }
}
</style> 