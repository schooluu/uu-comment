<template>
  <view class="container">
    <view class="header">
      <text class="title">我的收藏</text>
    </view>
    
    <!-- 收藏类型切换 -->
    <view class="tab-bar">
      <view 
        class="tab-item" 
        v-for="(tab, index) in tabs" 
        :key="index"
        :class="{ active: currentTab === index }"
        @tap="switchTab(index)"
      >
        <text>{{ tab }}</text>
      </view>
    </view>
    
    <!-- 收藏列表 -->
    <view class="favorite-list">
      <view class="favorite-item" v-for="item in favorites" :key="item.id">
        <image class="cover" :src="item.cover" mode="aspectFill"></image>
        <view class="content">
          <view class="info">
            <text class="name">{{ item.name }}</text>
            <text class="teacher">{{ item.teacher }}</text>
            <text class="desc">{{ item.description }}</text>
          </view>
          <view class="action-bar">
            <button class="action-btn" @tap="cancelFavorite(item)">取消收藏</button>
            <button class="action-btn primary" @tap="viewDetail(item)">查看详情</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const tabs = ['课程', '视频', '老师']
const currentTab = ref(0)

const favorites = ref([
  {
    id: 1,
    name: 'JAZZ基础课程',
    teacher: 'APHRODITE',
    description: '适合零基础学员，循序渐进学习爵士舞基本功',
    cover: '/static/images/courses/jazz1.jpg',
    type: 'course'
  },
  {
    id: 2,
    name: '现代舞编舞展示',
    teacher: 'CHERRY',
    description: '2024春季新作品展示',
    cover: '/static/images/videos/modern1.jpg',
    type: 'video'
  }
])

const switchTab = (index) => {
  currentTab.value = index
  // 根据tab加载不同类型的收藏
}

const cancelFavorite = (item) => {
  uni.showModal({
    title: '取消收藏',
    content: '确定要取消收藏吗？',
    success: (res) => {
      if (res.confirm) {
        // 处理取消收藏逻辑
        uni.showToast({
          title: '已取消收藏',
          icon: 'success'
        })
      }
    }
  })
}

const viewDetail = (item) => {
  const routes = {
    course: '/pages/dance/course/detail',
    video: '/pages/dance/video/detail',
    teacher: '/pages/dance/teacher/detail'
  }
  uni.navigateTo({
    url: `${routes[item.type]}?id=${item.id}`
  })
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

.tab-bar {
  display: flex;
  background: rgba(255,255,255,0.1);
  border-radius: 100rpx;
  padding: 6rpx;
  margin-bottom: 40rpx;
  
  .tab-item {
    flex: 1;
    height: 60rpx;
    line-height: 60rpx;
    text-align: center;
    color: #fff;
    font-size: 28rpx;
    border-radius: 100rpx;
    
    &.active {
      background: #FF4D8F;
    }
  }
}

.favorite-list {
  .favorite-item {
    background: rgba(255,255,255,0.1);
    border-radius: 20rpx;
    overflow: hidden;
    margin-bottom: 30rpx;
    
    .cover {
      width: 100%;
      height: 300rpx;
    }
    
    .content {
      padding: 30rpx;
      
      .info {
        margin-bottom: 20rpx;
        
        .name {
          color: #fff;
          font-size: 32rpx;
          font-weight: 600;
          margin-bottom: 12rpx;
          display: block;
        }
        
        .teacher {
          color: #FF4D8F;
          font-size: 28rpx;
          margin-bottom: 12rpx;
          display: block;
        }
        
        .desc {
          color: rgba(255,255,255,0.6);
          font-size: 26rpx;
          display: block;
        }
      }
      
      .action-bar {
        display: flex;
        justify-content: flex-end;
        gap: 20rpx;
        
        .action-btn {
          width: 160rpx;
          height: 60rpx;
          line-height: 60rpx;
          font-size: 26rpx;
          border-radius: 100rpx;
          background: rgba(255,255,255,0.1);
          color: #fff;
          
          &.primary {
            background: #FF4D8F;
          }
        }
      }
    }
  }
}
</style> 