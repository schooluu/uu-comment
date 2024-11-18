<template>
  <view class="container">
    <!-- 自定义导航栏 -->
    <view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="nav-content">
        <view class="nav-left">
          <text class="app-title">人人点评</text>
          <text class="app-subtitle">匿名化点评，避雷指南</text>
        </view>
        <view class="nav-right">
          <view class="nav-btn" @tap="goToComplaint">
            <text class="icon">📢</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 搜索区域 -->
    <view class="search-section" :style="{ marginTop: statusBarHeight + 88 + 'rpx' }">
      <view class="search-wrapper glass-effect">
        <view class="search-input-box">
          <text class="icon">🔍</text>
          <input class="input" v-model="searchKeyword" placeholder="搜索点评标题" placeholder-class="placeholder"
            confirm-type="search" @confirm="handleSearch" />
          <text v-if="searchKeyword" class="clear-icon" @tap="handleClear">✕</text>
        </view>
        <view class="divider"></view>
        <view class="location-picker" @tap="showCityPicker">
          <text class="icon">📍</text>
          <text class="location-text">{{ selectedCity || '选择城市' }}</text>
          <text class="icon-arrow">▼</text>
        </view>
      </view>
    </view>
    <template v-if="loading">
      <CompanySkeleton v-for="i in 5" :key="i" />
    </template>
    <view class="company-list" :class="{ 'fade-in': !loading }">
      <!-- 加载状态 -->
      <template v-if="loading">

      </template>

      <!-- 空状态 -->
      <view class="empty-state" v-else-if="companies.length === 0">
        <image class="empty-image" src="/static/images/empty.png" mode="aspectFit"></image>
        <text class="empty-text">暂无数据</text>
        <text class="empty-tips">快来添加第一条评价吧</text>
        <view class="empty-btn" @tap="goToAdd">
          <text class="icon">✏️</text>
          <text class="text">写点评</text>
        </view>
      </view>

      <!-- 列表内容 -->
      <template v-else>
        <view v-for="(company, index) in companies" :key="company._id" class="company-card glass-effect"
          :style="{ '--index': index }" hover-class="company-card-hover" @tap="goToDetail(company._id)">
          <view class="card-header">
            <text class="company-name">{{ company.companyName }}</text>
            <view class="rating-wrapper">
              <uni-rate :value="company.rating" size="18" color="#FFB800" />
              <text class="rating-text">{{ company.rating || 0 }}</text>
            </view>
          </view>

          <view class="card-content">
            <view class="cons-box" v-if="company.cons">
              <text class="cons-text">{{ company.cons }}</text>
            </view>
          </view>

          <view class="card-footer">
            <view class="stats">
              <view class="stat-item">
                <text class="icon">👁️</text>
                <text class="count">{{ company.viewCount || 0 }}</text>
              </view>
              <view class="stat-item">
                <text class="icon">💬</text>
                <text class="count">{{ company.reviewCount || 0 }}</text>
              </view>
              <text class="date">{{ formatTime(company.createTime) }}</text>
            </view>
            <text class="city-tag">{{ company.city }}</text>
          </view>
        </view>
      </template>
    </view>
    <view class="float-btns">
      <view class="float-btn glass-effect complaint-btn" @tap="goToComplaint">
        <text class="icon">📢</text>
      </view>
      <view class="float-btn glass-effect" @tap="goToAdd">
        <text class="icon">✏️</text>
      </view>
    </view>
    <!-- 免责声明弹窗 -->
    <uni-popup ref="disclaimerPopup" type="center">
      <view class="disclaimer-popup">
        <view class="popup-header">
          <text class="title">免责声明</text>
        </view>
        <view class="popup-content">
          <text class="text">1. 本平台仅提供信息分享服务，所有内容均来自用户发布。</text>
          <text class="text">2. 用户发布的内容仅代表个人观点，请理性对待。</text>
          <text class="text">3. 如发现违规内容，请及时联系我们处理。</text>
          <text class="text">4. 平台保留对违规内容的处理权利。</text>
        </view>
        <view class="popup-footer">
          <button class="confirm-btn" @tap="closeDisclaimer">我已了解</button>
        </view>
      </view>
    </uni-popup>
    <view class="load-more" v-if="companies.length > 0">
      <view v-if="loading" class="loading">
        <view class="loading-icon"></view>
        <text class="loading-text">加载中...</text>
      </view>
      <text v-else-if="!hasMore" class="no-more">没有更多了</text>
    </view>
    <!-- 添加投诉弹窗组件 -->
    <uni-popup ref="complaintPopup" type="center">
      <view class="complaint-popup glass-effect">
        <view class="popup-header">
          <text class="title">投诉建议</text>
          <text class="close-icon" @tap="closeComplaintPopup">✕</text>
        </view>
        <view class="popup-content">
          <view class="content-item">
            <text class="icon">📧</text>
            <view class="item-info">
              <text class="label">邮箱联系</text>
              <text class="value">962723968@qq.com</text>
            </view>
            <button class="copy-btn" @tap="copyEmail">复制</button>
          </view>
          <view class="content-item">
            <text class="icon">⚠️</text>
            <view class="item-info">
              <text class="label">温馨提示</text>
              <text class="desc">如发现任何违规或不当内容，请及时联系我们处理，我们会在24小时内给予回复。</text>
            </view>
          </view>
        </view>
        <view class="popup-footer">
          <button class="confirm-btn" @tap="closeComplaintPopup">我知道了</button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  onShow,
  onReachBottom,
  onPullDownRefresh,
  onPageScroll
} from '@dcloudio/uni-app';
import CompanySkeleton from '@/components/CompanySkeleton.vue'
const companies = ref([])
const searchKeyword = ref('')
const disclaimerPopup = ref(null)
const pageSize = 10
const currentPage = ref(1)
const hasMore = ref(true)
const loading = ref(false)
const selectedCity = ref('')
const provinces = ref([])
const cities = ref([])
const selectedProvince = ref('')
const statusBarHeight = uni.getSystemInfoSync().statusBarHeight

// 格式化时间
const formatTime = (timestamp: number) => {
  const date = new Date(timestamp)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

// 获取公司列表
const getCompanyList = async (page = 1, isLoadMore = false) => {
  if (!isLoadMore) {
    loading.value = true
  }

  try {
    const { result } = await uniCloud.callFunction({
      name: 'getCompanyList',
      data: {
        page,
        pageSize,
        keyword: searchKeyword.value,
        city: selectedCity.value
      }
    })

    if (result.code === 0) {
      if (isLoadMore) {
        companies.value = [...companies.value, ...result.data]
      } else {
        // 添加一���小延迟,让骨架屏效果更明显
        setTimeout(() => {
          companies.value = result.data
          loading.value = false
        }, 500)
      }
      hasMore.value = result.data.length === pageSize
      currentPage.value = page
    }
  } catch (error) {
    uni.showToast({
      title: '获取数据失败',
      icon: 'none'
    })
    loading.value = false
  }
}

// 加载更多
const loadMore = async () => {
  if (!hasMore.value || loading.value) return
  await getCompanyList(currentPage.value + 1, true)
}

// 重置列表
const resetList = () => {
  companies.value = []
  currentPage.value = 1
  hasMore.value = true
  getCompanyList(1)
}

// 搜索处理
const handleSearch = () => {
  resetList()
}

// 清除搜索
const handleClear = () => {
  searchKeyword.value = ''
  resetList()
}

// 跳转到新增页面
const goToAdd = () => {
  uni.navigateTo({
    url: '/pages/add/add-review'
  })
}

const goToDetail = (id: string) => {
  uni.navigateTo({
    url: `/pages/detail/detail?id=${id}`
  })
}

// 检查是否首次访问
onMounted(() => {
  // disclaimerPopup.value.open()
  getCompanyList()
})

// 关闭免责声明
const closeDisclaimer = () => {
  uni.setStorageSync('hasShownDisclaimer', true)
  disclaimerPopup.value.close()
}

const complaintPopup = ref(null)

const goToComplaint = () => {
  complaintPopup.value.open()
}

const closeComplaintPopup = () => {
  complaintPopup.value.close()
}

const copyEmail = () => {
  uni.setClipboardData({
    data: '962723968@qq.com',
    success: () => {
      uni.showToast({
        title: '邮箱已复制',
        icon: 'success'
      })
    }
  })
}

onReachBottom(() => {
  loadMore()
})

onMounted(() => {
  getCompanyList()
})

// 获取省份列表
const getProvinces = async () => {
  try {
    const { result } = await uniCloud.callFunction({
      name: 'getCityList'
    })
    if (result.code === 0) {
      provinces.value = result.data
    }
  } catch (error) {
    uni.showToast({
      title: '获取省份失败',
      icon: 'none'
    })
  }
}

// 获取城市列表
const getCities = async (provinceCode: string) => {
  try {
    const { result } = await uniCloud.callFunction({
      name: 'getCityList',
      data: { province: provinceCode }
    })
    if (result.code === 0) {
      cities.value = result.data
    }
  } catch (error) {
    uni.showToast({
      title: '获取城市失败',
      icon: 'none'
    })
  }
}

// 显示城市选择器
const showCityPicker = () => {
  uni.showActionSheet({
    itemList: provinces.value.map(p => p.name),
    success: async (res) => {
      const province = provinces.value[res.tapIndex]
      selectedProvince.value = province.name
      await getCities(province.code)

      // 选择城市
      uni.showActionSheet({
        itemList: cities.value.map(c => c.name),
        success: (res) => {
          selectedCity.value = cities.value[res.tapIndex].name
          resetList()
        }
      })
    }
  })
}

onMounted(async () => {
  await getProvinces()
  getCompanyList()
})

</script>

<style lang="scss">
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background: linear-gradient(135deg, #4A90E2, #5C6BC0);

  .nav-content {
    height: 88rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30rpx;

    .nav-left {
      .app-title {
        font-size: 36rpx;
        font-weight: 600;
        color: #fff;
        margin-right: 16rpx;
      }

      .app-subtitle {
        font-size: 24rpx;
        color: rgba(255, 255, 255, 0.8);
      }
    }

    .nav-right {
      .nav-btn {
        width: 72rpx;
        height: 72rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        transition: all 0.3s;

        .icon {
          font-size: 32rpx;
        }

        &:active {
          transform: scale(0.9);
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
  }
}

.search-section {
  padding: 0 30rpx;
  margin-bottom: 30rpx;

  .search-wrapper {
    display: flex;
    align-items: center;
    padding: 20rpx 30rpx;
    border-radius: 16rpx;

    .search-input-box {
      flex: 1;
      display: flex;
      align-items: center;

      .icon {
        font-size: 32rpx;
        margin-right: 16rpx;
        color: #666;
      }

      .input {
        flex: 1;
        height: 72rpx;
        font-size: 28rpx;
        color: #333;
      }

      .placeholder {
        color: #999;
      }

      .clear-icon {
        padding: 10rpx;
        color: #999;
        font-size: 24rpx;
      }
    }

    .divider {
      width: 2rpx;
      height: 40rpx;
      background: rgba(0, 0, 0, 0.1);
      margin: 0 24rpx;
    }

    .location-picker {
      display: flex;
      align-items: center;
      padding: 12rpx 20rpx;

      .icon {
        font-size: 28rpx;
        margin-right: 8rpx;
      }

      .location-text {
        font-size: 26rpx;
        color: #333;
      }

      .icon-arrow {
        font-size: 20rpx;
        color: #999;
        margin-left: 8rpx;
      }
    }
  }
}


.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f6f9fc 0%, #edf1f7 100%);
  padding: 30rpx;
}

.glass-effect {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8rpx 32rpx rgba(31, 38, 135, 0.1);
}

.header {
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 20rpx 0;

  .search-box {
    border-radius: 16rpx;
    margin-bottom: 20rpx;
  }

  .location-picker {
    display: inline-flex;
    align-items: center;
    padding: 12rpx 24rpx;
    border-radius: 30rpx;

    .icon {
      margin-right: 8rpx;
      font-size: 28rpx;
    }

    .location-text {
      font-size: 28rpx;
      color: #333;
    }
  }
}

.company-card {
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  transition: all 0.3s ease;

  &-hover {
    transform: translateY(-2rpx);
    box-shadow: 0 12rpx 48rpx rgba(31, 38, 135, 0.15);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;

    .company-name {
      font-size: 32rpx;
      font-weight: 600;
      color: #1a1a1a;
    }

    .rating-wrapper {
      display: flex;
      align-items: center;

      .rating-text {
        margin-left: 12rpx;
        font-size: 28rpx;
        color: #FFB800;
        font-weight: 500;
      }
    }
  }

  .card-content {
    .cons-box {
      background: rgba(255, 184, 0, 0.1);
      padding: 20rpx;
      border-radius: 12rpx;
      border-left: 4rpx solid #FFB800;

      .cons-text {
        font-size: 28rpx;
        color: #666;
        line-height: 1.6;
      }
    }
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20rpx;

    .stats {
      display: flex;
      align-items: center;
      gap: 20rpx;

      .stat-item {
        display: flex;
        align-items: center;

        .icon {
          margin-right: 6rpx;
          font-size: 24rpx;
        }

        .count {
          font-size: 24rpx;
          color: #666;
        }
      }

      .date {
        font-size: 24rpx;
        color: #999;
        margin-left: 20rpx;
      }
    }

    .city-tag {
      font-size: 24rpx;
      color: #666;
      background: rgba(0, 122, 255, 0.1);
      padding: 6rpx 16rpx;
      border-radius: 4rpx;
    }
  }
}

.float-btns {
  position: fixed;
  right: 40rpx;
  bottom: 120rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;

  .float-btn {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40rpx;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);

    &.complaint-btn {
      background: rgba(255, 59, 48, 0.1);

      .icon {
        font-size: 36rpx;
      }
    }

    &:active {
      transform: scale(0.95);
    }
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120rpx 60rpx;

  .empty-image {
    width: 240rpx;
    height: 240rpx;
    margin-bottom: 40rpx;
  }

  .empty-text {
    font-size: 32rpx;
    color: #333;
    font-weight: 500;
    margin-bottom: 16rpx;
  }

  .empty-tips {
    font-size: 26rpx;
    color: #999;
    margin-bottom: 40rpx;
  }

  .empty-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20rpx 40rpx;
    background: linear-gradient(135deg, #3B7FFF, #007AFF);
    border-radius: 40rpx;
    box-shadow: 0 8rpx 16rpx rgba(0, 122, 255, 0.1);
    font-size: 28rpx;
    color: #fff;
  }
}

.disclaimer-popup {
  background: #fff;
  width: 600rpx;
  border-radius: 20rpx;
  overflow: hidden;

  .popup-header {
    padding: 30rpx;
    text-align: center;
    border-bottom: 1rpx solid #eee;

    .title {
      font-size: 32rpx;
      font-weight: 500;
      color: #333;
    }
  }

  .popup-content {
    padding: 40rpx 30rpx;

    .text {
      font-size: 28rpx;
      color: #666;
      line-height: 1.8;
      display: block;
      margin-bottom: 20rpx;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .popup-footer {
    padding: 30rpx;
    border-top: 1rpx solid #eee;

    .confirm-btn {
      background: linear-gradient(135deg, #3B7FFF, #007AFF);
      color: #fff;
      border-radius: 100rpx;
      font-size: 28rpx;
      height: 80rpx;
      line-height: 80rpx;

      &:active {
        transform: scale(0.98);
      }
    }
  }
}

.load-more {
  padding: 30rpx;
  text-align: center;

  .loading {
    display: inline-flex;
    align-items: center;

    .loading-icon {
      width: 36rpx;
      height: 36rpx;
      margin-right: 12rpx;
      border: 3rpx solid #e5e5e5;
      border-top-color: #3B7FFF;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    .loading-text {
      font-size: 26rpx;
      color: #999;
    }
  }

  .no-more {
    font-size: 26rpx;
    color: #999;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.company-list {
  opacity: 0;
  transform: translateY(20rpx);

  &.fade-in {
    animation: fadeInUp 0.6s ease forwards;
  }
}

.company-card {
  transform: translateY(20rpx);
  opacity: 0;
  animation: slideUp 0.5s ease forwards;
  animation-delay: calc(var(--index) * 0.1s);
}

.float-btns {
  .float-btn {
    animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20rpx);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20rpx);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceIn {
  from {
    transform: scale(0);
  }

  50% {
    transform: scale(1.1);
  }

  to {
    transform: scale(1);
  }
}

.complaint-popup {
  width: 600rpx;
  border-radius: 24rpx;
  overflow: hidden;
  
  .popup-header {
    padding: 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1rpx solid rgba(0, 0, 0, 0.05);
    
    .title {
      font-size: 32rpx;
      font-weight: 600;
      color: #333;
    }
    
    .close-icon {
      padding: 10rpx;
      color: #999;
      font-size: 32rpx;
      line-height: 1;
    }
  }
  
  .popup-content {
    padding: 30rpx;
    
    .content-item {
      display: flex;
      align-items: flex-start;
      padding: 20rpx;
      background: rgba(0, 0, 0, 0.02);
      border-radius: 16rpx;
      margin-bottom: 20rpx;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .icon {
        font-size: 40rpx;
        margin-right: 20rpx;
      }
      
      .item-info {
        flex: 1;
        
        .label {
          font-size: 28rpx;
          font-weight: 500;
          color: #333;
          margin-bottom: 8rpx;
          display: block;
        }
        
        .value {
          font-size: 26rpx;
          color: #666;
          display: block;
        }
        
        .desc {
          font-size: 26rpx;
          color: #666;
          line-height: 1.6;
        }
      }
      
      .copy-btn {
        margin-left: 20rpx;
        padding: 8rpx 24rpx;
        background: rgba(59, 127, 255, 0.1);
        border-radius: 100rpx;
        font-size: 24rpx;
        color: #3B7FFF;
        border: none;
        line-height: 1.5;
        
        &:active {
          transform: scale(0.95);
        }
      }
    }
  }
  
  .popup-footer {
    padding: 20rpx 30rpx 30rpx;
    
    .confirm-btn {
      background: linear-gradient(135deg, #3B7FFF, #007AFF);
      color: #fff;
      border-radius: 100rpx;
      font-size: 28rpx;
      height: 80rpx;
      line-height: 80rpx;
      border: none;
      
      &:active {
        transform: scale(0.98);
      }
    }
  }
}
</style>