<template>
  <view class="home-page">
    <!-- 顶部定位和搜索 -->
    <view class="header">
      <view class="location" @tap="selectLocation">
        <text class="icon">📍</text>
        <text class="location-name">{{ currentLocation }}</text>
        <text class="arrow">></text>
      </view>
      <view class="search-box" @tap="goToSearch">
        <text class="icon">🔍</text>
        <text class="placeholder">搜索</text>
      </view>
    </view>

    <!-- 优惠券banner -->
    <view class="banner" @tap="getCoupon">
      <image 
        class="banner-image" 
        src="/static/images/banner/coupon.png" 
        mode="aspectFill"
      />
    </view>

    <!-- 美食分类 -->
    <view class="food-categories">
      <view 
        class="category-item"
        v-for="category in categories"
        :key="category.id"
        @tap="selectCategory(category)"
      >
        <image 
          class="category-icon" 
          :src="category.icon" 
          mode="aspectFit"
        />
        <text class="category-name">{{ category.name }}</text>
      </view>
    </view>

    <!-- 每日特价 -->
    <view class="daily-specials">
      <view class="section-header">
        <text class="title">天天特价</text>
        <text class="subtitle">这里买更优惠</text>
        <text class="more" @tap="viewMore">更多 ></text>
      </view>
      <scroll-view 
        class="specials-list"
        scroll-x
        :show-scrollbar="false"
        enhanced
      >
        <view 
          class="special-item"
          v-for="item in specialItems"
          :key="item.id"
          @tap="viewProduct(item)"
        >
          <image 
            class="product-image" 
            :src="item.image" 
            mode="aspectFill"
          />
          <text class="product-name">{{ item.name }}</text>
          <view class="price-info">
            <text class="current-price">¥{{ item.currentPrice }}</text>
            <text class="original-price">¥{{ item.originalPrice }}</text>
          </view>
          <text class="tag" v-if="item.tag">{{ item.tag }}</text>
        </view>
      </scroll-view>
    </view>

    <!-- 广告卡片区域 -->
    <view class="ad-cards">
      <view class="card" @tap="handleCard('coupon')">
        <view class="card-content">
          <view class="card-title">送6张5元券</view>
          <view class="card-subtitle">超级会员专享</view>
          <view class="card-tag">9.9元得</view>
        </view>
        <image class="card-image" src="/static/images/coupon.png" mode="aspectFit"/>
      </view>
      <view class="card" @tap="handleCard('runner')">
        <view class="card-content">
          <view class="card-title">万能帮帮</view>
          <view class="card-subtitle">下单跑腿更方便</view>
          <view class="card-btn">立即查看</view>
        </view>
        <image class="card-image" src="/static/images/runner.png" mode="aspectFit"/>
      </view>
    </view>

    <!-- 配送员招募 -->
    <view class="recruit-banner" @tap="handleRecruit">
      <image class="banner-bg" src="/static/images/recruit-bg.png" mode="aspectFill"/>
      <view class="banner-content">
        <text class="title">来，一起送餐赚钱</text>
        <text class="subtitle">校园外卖 配送服务</text>
        <view class="action-btn">立即报名</view>
      </view>
    </view>

    <!-- 附近商家 -->
    <view class="nearby-shops">
      <view class="section-header">
        <text class="title">附近商家</text>
        <view class="filter-tags">
          <text 
            class="tag"
            v-for="tag in filterTags"
            :key="tag.id"
            :class="{ active: tag.active }"
            @tap="toggleFilter(tag)"
          >{{ tag.name }}</text>
        </view>
      </view>
      
      <view class="shop-list">
        <view 
          class="shop-item"
          v-for="shop in shops"
          :key="shop.id"
          @tap="viewShop(shop)"
        >
          <image class="shop-image" :src="shop.image" mode="aspectFill"/>
          <view class="shop-info">
            <view class="shop-name">{{ shop.name }}</view>
            <view class="shop-rating">
              <text class="rating">{{ shop.rating }}</text>
              <text class="monthly-sales">月销 {{ shop.monthlySales }}</text>
              <text class="distance">{{ shop.distance }}km</text>
            </view>
            <view class="delivery-info">
              <text class="delivery-fee">{{ shop.deliveryFee }}起送</text>
              <text class="delivery-time">{{ shop.deliveryTime }}分钟</text>
            </view>
            <view class="shop-tags">
              <text 
                class="tag"
                v-for="tag in shop.tags"
                :key="tag"
              >{{ tag }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <tab-bar :current="currentPath" />
  </view>
</template>

<script setup>
import { ref,computed} from 'vue'
import TabBar from '@/components/school/tab-bar.vue'
// 当前位置
const currentLocation = ref('成都理工大学(二仙桥校区)')

// 美食分类
const categories = ref([
  { id: 1, name: '好吃的饭', icon: '/static/icons/rice.png' },
  { id: 2, name: '火锅冒菜', icon: '/static/icons/hotpot.png' },
  { id: 3, name: '米饭好吃', icon: '/static/icons/bento.png' },
  { id: 4, name: '串串小吃', icon: '/static/icons/skewer.png' },
  { id: 5, name: '热卤汤锅', icon: '/static/icons/soup.png' },
  { id: 6, name: '奶茶饮品', icon: '/static/icons/drink.png' },
  { id: 7, name: '蛋糕烘培', icon: '/static/icons/cake.png' },
  { id: 8, name: '美食快餐', icon: '/static/icons/fastfood.png' },
  { id: 9, name: '米粉面条', icon: '/static/icons/noodle.png' },
  { id: 10, name: '蛋糕甜品', icon: '/static/icons/dessert.png' }
])

const currentPath = computed(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  return `/${currentPage.route}`
})

// 特价商品
const specialItems = ref([
  {
    id: 1,
    name: '水牛奶鸡蛋',
    image: '/static/products/1.jpg',
    currentPrice: '5.90',
    originalPrice: '7.00',
    tag: '新人价'
  },
  {
    id: 2,
    name: '超值特惠汉堡',
    image: '/static/products/2.jpg',
    currentPrice: '6.50',
    originalPrice: '9.90',
    tag: '今日价'
  },
  {
    id: 3,
    name: '墨西哥鸡肉卷',
    image: '/static/products/3.jpg',
    currentPrice: '9.90',
    originalPrice: '15.00',
    tag: '今日价'
  },
  {
    id: 4,
    name: '超嗲草莓奶茶',
    image: '/static/products/4.jpg',
    currentPrice: '9.90',
    originalPrice: '12.00',
    tag: '人气'
  }
])

// 底部导航
const tabs = ref([
  { id: 'home', name: '首页', icon: '🏠' },
  { id: 'forum', name: '论坛', icon: '💬' },
  { id: 'order', name: '订单', icon: '📋' },
  { id: 'my', name: '我的', icon: '👤' }
])
const currentTab = ref('home')

// 选择位置
const selectLocation = () => {
  uni.navigateTo({
    url: '/pages/school/location/index'
  })
}

// 跳转搜索
const goToSearch = () => {
  uni.navigateTo({
    url: '/pages/school/search/index'
  })
}

// 领取优惠券
const getCoupon = () => {
  uni.navigateTo({
    url: '/pages/school/coupon/index'
  })
}

// 选择分类
const selectCategory = (category) => {
  uni.navigateTo({
    url: `/pages/school/category/index?id=${category.id}`
  })
}

// 查看更多
const viewMore = () => {
  uni.navigateTo({
    url: '/pages/school/specials/index'
  })
}

// 查看商品
const viewProduct = (item) => {
  uni.navigateTo({
    url: `/pages/school/product/index?id=${item.id}`
  })
}

// 切换标签
const switchTab = (tabId) => {
  currentTab.value = tabId
  if (tabId !== 'home') {
    uni.switchTab({
      url: `/pages/school/${tabId}/index`
    })
  }
}

// 筛选标签
const filterTags = ref([
  { id: 1, name: '综合排序', active: true },
  { id: 2, name: '销量最高', active: false },
  { id: 3, name: '距离最近', active: false },
  { id: 4, name: '好评优先', active: false }
])

// 商家列表
const shops = ref([
  {
    id: 1,
    name: '珍珍新鸡排店',
    image: '/static/shops/1.jpg',
    rating: 4.8,
    monthlySales: 1,
    distance: 0.8,
    deliveryFee: '¥0起送',
    deliveryTime: '30',
    tags: ['24小时营业', '欢迎各位同学帮忙介绍生意']
  }
  // ... 更多商家数据
])
</script>

<style lang="scss" scoped>

// 工具类
@mixin text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.home-page {
  min-height: 100vh;
  background: #f8f8f8;
  padding-bottom: 100rpx;

  .header {
    display: flex;
    align-items: center;
    padding: 20rpx 30rpx;
    background: #fff;
    
    .location {
      display: flex;
      align-items: center;
      margin-right: 20rpx;
      
      .icon {
        font-size: 36rpx;
        margin-right: 8rpx;
      }
      
      .location-name {
        font-size: 28rpx;
        color: #333;
        max-width: 300rpx;
        @include text-ellipsis;
      }
      
      .arrow {
        font-size: 24rpx;
        color: #999;
        margin-left: 8rpx;
      }
    }
    
    .search-box {
      flex: 1;
      display: flex;
      align-items: center;
      height: 64rpx;
      background: #f5f5f5;
      border-radius: 32rpx;
      padding: 0 24rpx;
      
      .icon {
        font-size: 28rpx;
        color: #999;
        margin-right: 8rpx;
      }
      
      .placeholder {
        font-size: 26rpx;
        color: #999;
      }
    }
  }

  .banner {
    width: 100%;
    height: 200rpx;
    
    .banner-image {
      width: 100%;
      height: 100%;
    }
  }

  .food-categories {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20rpx;
    padding: 30rpx;
    background: #fff;
    
    .category-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      
      .category-icon {
        width: 80rpx;
        height: 80rpx;
        margin-bottom: 10rpx;
      }
      
      .category-name {
        font-size: 24rpx;
        color: #333;
      }
    }
  }

  .daily-specials {
    margin-top: 20rpx;
    padding: 30rpx;
    background: #fff;
    
    .section-header {
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;
      
      .title {
        font-size: 32rpx;
        font-weight: bold;
        color: #ff4444;
      }
      
      .subtitle {
        font-size: 24rpx;
        color: #999;
        margin-left: 16rpx;
      }
      
      .more {
        font-size: 24rpx;
        color: #999;
        margin-left: auto;
      }
    }
    
    .specials-list {
      white-space: nowrap;
      
      .special-item {
        display: inline-block;
        width: 200rpx;
        margin-right: 20rpx;
        position: relative;
        
        &:last-child {
          margin-right: 0;
        }
        
        .product-image {
          width: 200rpx;
          height: 200rpx;
          border-radius: 12rpx;
          margin-bottom: 10rpx;
        }
        
        .product-name {
          font-size: 26rpx;
          color: #333;
          @include text-ellipsis;
        }
        
        .price-info {
          margin-top: 8rpx;
          
          .current-price {
            font-size: 28rpx;
            color: #ff4444;
            font-weight: bold;
          }
          
          .original-price {
            font-size: 24rpx;
            color: #999;
            text-decoration: line-through;
            margin-left: 8rpx;
          }
        }
        
        .tag {
          position: absolute;
          top: 10rpx;
          left: 10rpx;
          font-size: 20rpx;
          color: #fff;
          background: #ff4444;
          padding: 4rpx 12rpx;
          border-radius: 20rpx;
        }
      }
    }
  }

  .ad-cards {
    display: flex;
    padding: 20rpx;
    gap: 20rpx;
    
    .card {
      flex: 1;
      height: 180rpx;
      background: #fff;
      border-radius: 16rpx;
      padding: 20rpx;
      display: flex;
      justify-content: space-between;
      
      .card-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
        .card-title {
          font-size: 32rpx;
          font-weight: bold;
          color: #333;
        }
        
        .card-subtitle {
          font-size: 24rpx;
          color: #999;
        }
        
        .card-tag {
          width: fit-content;
          padding: 4rpx 16rpx;
          border-radius: 20rpx;
          background: #FFE4E6;
          color: #FF4D4F;
          font-size: 24rpx;
        }
        
        .card-btn {
          width: fit-content;
          padding: 8rpx 24rpx;
          border-radius: 24rpx;
          background: #F5F5F5;
          color: #666;
          font-size: 24rpx;
        }
      }
      
      .card-image {
        width: 100rpx;
        height: 100rpx;
      }
    }
  }

  .recruit-banner {
    margin: 20rpx;
    height: 160rpx;
    border-radius: 16rpx;
    overflow: hidden;
    position: relative;
    
    .banner-bg {
      width: 100%;
      height: 100%;
    }
    
    .banner-content {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 30rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      
      .title {
        font-size: 32rpx;
        color: #333;
        font-weight: bold;
        margin-bottom: 8rpx;
      }
      
      .subtitle {
        font-size: 24rpx;
        color: #666;
      }
      
      .action-btn {
        position: absolute;
        right: 30rpx;
        top: 50%;
        transform: translateY(-50%);
        padding: 12rpx 32rpx;
        background: #1890FF;
        color: #fff;
        border-radius: 32rpx;
        font-size: 26rpx;
      }
    }
  }

  .nearby-shops {
    background: #fff;
    padding: 20rpx;
    
    .section-header {
      margin-bottom: 20rpx;
      
      .title {
        font-size: 32rpx;
        font-weight: bold;
        color: #333;
        margin-bottom: 16rpx;
      }
      
      .filter-tags {
        display: flex;
        gap: 20rpx;
        
        .tag {
          font-size: 26rpx;
          color: #666;
          padding: 8rpx 20rpx;
          border-radius: 24rpx;
          background: #F5F5F5;
          
          &.active {
            background: #FFE4E6;
            color: #FF4D4F;
          }
        }
      }
    }
    
    .shop-list {
      .shop-item {
        display: flex;
        padding: 20rpx 0;
        border-bottom: 1rpx solid #F5F5F5;
        
        .shop-image {
          width: 160rpx;
          height: 160rpx;
          border-radius: 8rpx;
          margin-right: 20rpx;
        }
        
        .shop-info {
          flex: 1;
          
          .shop-name {
            font-size: 30rpx;
            font-weight: 500;
            color: #333;
            margin-bottom: 12rpx;
          }
          
          .shop-rating {
            font-size: 24rpx;
            color: #666;
            margin-bottom: 8rpx;
            
            .rating {
              color: #FF4D4F;
              margin-right: 16rpx;
            }
            
            .monthly-sales {
              margin-right: 16rpx;
            }
          }
          
          .delivery-info {
            font-size: 24rpx;
            color: #999;
            margin-bottom: 8rpx;
            
            .delivery-time {
              margin-left: 16rpx;
            }
          }
          
          .shop-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8rpx;
            
            .tag {
              font-size: 22rpx;
              color: #666;
              padding: 4rpx 12rpx;
              background: #F5F5F5;
              border-radius: 4rpx;
            }
          }
        }
      }
    }
  }

  .tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100rpx;
    background: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 1rpx solid #f5f5f5;
    
    .tab-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      
      .icon {
        font-size: 40rpx;
        margin-bottom: 4rpx;
      }
      
      .name {
        font-size: 24rpx;
        color: #999;
      }
      
      &.active {
        .name {
          color: #ff4444;
        }
      }
    }
  }
}


</style>
