<template>
  <view class="car-container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <text class="title">车辆买卖</text>
    </view>
    
    <!-- 搜索栏 -->
    <view class="search-bar">
      <view class="search-input">
        <text class="search-icon">🔍</text>
        <input 
          type="text" 
          placeholder="搜索品牌、车型"
          v-model="searchKeyword"
          @confirm="handleSearch"
        />
      </view>
    </view>
    
    <!-- 分类标签 -->
    <scroll-view scroll-x class="category-tabs">
      <view 
        v-for="(tab, index) in tabs" 
        :key="index"
        :class="['tab-item', { active: currentTab === index }]"
        @tap="switchTab(index)"
      >
        {{ tab }}
      </view>
    </scroll-view>
    
    <!-- 筛选条件 -->
    <view class="filter-bar">
      <view class="filter-item" @tap="showPriceFilter">
        <text>价格</text>
        <text class="arrow">▼</text>
      </view>
      <view class="filter-item" @tap="showYearFilter">
        <text>车龄</text>
        <text class="arrow">▼</text>
      </view>
      <view class="filter-item" @tap="showSortFilter">
        <text>排序</text>
        <text class="arrow">▼</text>
      </view>
    </view>
    
    <!-- 车辆列表 -->
    <scroll-view 
      scroll-y 
      class="car-list"
      @scrolltolower="loadMore"
      refresher-enabled
      :refresher-triggered="isRefreshing"
      @refresherrefresh="onRefresh"
    >
      <view 
        class="car-item" 
        v-for="(car, index) in cars" 
        :key="index"
        @tap="goToDetail(car)"
      >
        <image class="car-image" :src="car.image" mode="aspectFill"></image>
        <view class="car-info">
          <view class="car-title">{{ car.title }}</view>
          <view class="car-desc">
            <text>{{ car.year }}年</text>
            <text>{{ car.mileage }}万公里</text>
            <text>{{ car.location }}</text>
          </view>
          <view class="car-tags">
            <text class="tag" v-for="(tag, tagIndex) in car.tags" :key="tagIndex">
              {{ tag }}
            </text>
          </view>
          <view class="car-price">
            <text class="price">{{ car.price }}万</text>
            <text class="original-price" v-if="car.originalPrice">
              原价{{ car.originalPrice }}万
            </text>
          </view>
        </view>
      </view>
    </scroll-view>
    
    <!-- 发布按钮 -->
    <view class="publish-btn" @tap="goToPublish">
      <text class="icon">+</text>
      <text>发布车源</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const searchKeyword = ref('')
const currentTab = ref(0)
const isRefreshing = ref(false)

const tabs = [
  '全部', '轿车', 'SUV', '新能源', '面包车', '货车'
]

const cars = ref([
  {
    id: 1,
    title: '丰田 凯美瑞 2020款 2.5L 豪华版',
    year: '2020',
    mileage: '3.5',
    location: '富邦小区',
    price: '16.8',
    originalPrice: '22.8',
    image: 'https://example.com/car1.jpg',
    tags: ['准新车', '一手车', '可分期']
  },
  {
    id: 2,
    title: '特斯拉 Model 3 2021款 标准续航版',
    year: '2021',
    mileage: '2.1',
    location: '科技园',
    price: '23.5',
    image: 'https://example.com/car2.jpg',
    tags: ['电动车', '无事故', '原厂保修']
  }
  // ... 更多车辆数据
])

// 切换分类标签
const switchTab = (index) => {
  currentTab.value = index
  // 重新加载数据
}

// 显示价格筛选
const showPriceFilter = () => {
  uni.showActionSheet({
    itemList: ['10万以下', '10-20万', '20-30万', '30万以上'],
    success: (res) => {
      console.log('选择价格区间:', res.tapIndex)
    }
  })
}

// 显示车龄筛选
const showYearFilter = () => {
  uni.showActionSheet({
    itemList: ['1年以内', '1-3年', '3-5年', '5年以上'],
    success: (res) => {
      console.log('选择车龄:', res.tapIndex)
    }
  })
}

// 显示排序方式
const showSortFilter = () => {
  uni.showActionSheet({
    itemList: ['最新发布', '价格最低', '价格最高', '里程最少'],
    success: (res) => {
      console.log('选择排序方式:', res.tapIndex)
    }
  })
}

// 搜索处理
const handleSearch = () => {
  console.log('搜索关键词:', searchKeyword.value)
}

// 加载更多
const loadMore = () => {
  console.log('加载更多数据')
}

// 下拉刷新
const onRefresh = () => {
  isRefreshing.value = true
  setTimeout(() => {
    isRefreshing.value = false
  }, 1000)
}

// 跳转到详情页
const goToDetail = (car) => {
  uni.navigateTo({
    url: `/pages/city/car/detail?id=${car.id}`
  })
}

// 跳转到发布页
const goToPublish = () => {
  uni.navigateTo({
    url: '/pages/city/car/publish'
  })
}
</script>

<style lang="scss" scoped>
.car-container {
  min-height: 100vh;
  background: #f5f5f5;
  
  .header {
    height: 88rpx;
    background: #fff;
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    box-shadow: 0 2rpx 4rpx rgba(0,0,0,0.1);
    
    .title {
      font-size: 32rpx;
      font-weight: 500;
      color: #333;
    }
  }
  
  .search-bar {
    padding: 20rpx;
    background: #fff;
    
    .search-input {
      display: flex;
      align-items: center;
      background: #f5f5f5;
      border-radius: 8rpx;
      padding: 0 20rpx;
      
      .search-icon {
        font-size: 32rpx;
        margin-right: 10rpx;
      }
      
      input {
        flex: 1;
        height: 72rpx;
        font-size: 28rpx;
      }
    }
  }
  
  .category-tabs {
    white-space: nowrap;
    background: #fff;
    padding: 20rpx 0;
    
    .tab-item {
      display: inline-block;
      padding: 12rpx 30rpx;
      font-size: 28rpx;
      color: #666;
      
      &.active {
        color: #ff5a5f;
        position: relative;
        
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 40rpx;
          height: 4rpx;
          background: #ff5a5f;
          border-radius: 2rpx;
        }
      }
    }
  }
  
  .filter-bar {
    display: flex;
    background: #fff;
    padding: 20rpx 0;
    margin-bottom: 20rpx;
    
    .filter-item {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28rpx;
      color: #666;
      
      .arrow {
        margin-left: 8rpx;
      }
    }
  }
  
  .car-list {
    padding: 20rpx;
    
    .car-item {
      background: #fff;
      border-radius: 12rpx;
      margin-bottom: 20rpx;
      overflow: hidden;
      
      .car-image {
        width: 100%;
        height: 400rpx;
      }
      
      .car-info {
        padding: 20rpx;
        
        .car-title {
          font-size: 32rpx;
          font-weight: 500;
          color: #333;
          margin-bottom: 12rpx;
        }
        
        .car-desc {
          display: flex;
          gap: 20rpx;
          font-size: 26rpx;
          color: #666;
          margin-bottom: 12rpx;
        }
        
        .car-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 12rpx;
          margin-bottom: 12rpx;
          
          .tag {
            padding: 4rpx 12rpx;
            background: #f5f5f5;
            color: #666;
            font-size: 24rpx;
            border-radius: 4rpx;
          }
        }
        
        .car-price {
          display: flex;
          align-items: baseline;
          gap: 12rpx;
          
          .price {
            font-size: 36rpx;
            color: #ff5a5f;
            font-weight: 500;
          }
          
          .original-price {
            font-size: 26rpx;
            color: #999;
            text-decoration: line-through;
          }
        }
      }
    }
  }
  
  .publish-btn {
    position: fixed;
    right: 30rpx;
    bottom: 60rpx;
    background: #ff5a5f;
    color: #fff;
    display: flex;
    align-items: center;
    padding: 20rpx 30rpx;
    border-radius: 36rpx;
    box-shadow: 0 4rpx 12rpx rgba(255,90,95,0.3);
    
    .icon {
      font-size: 36rpx;
      margin-right: 8rpx;
    }
  }
}
</style> 