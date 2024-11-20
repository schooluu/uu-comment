<template>
  <view class="venue-detail">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @tap="handleBack">
        <text class="iconfont">←</text>
      </view>
      <text class="title">场馆详情</text>
    </view>

    <swiper class="gallery" circular :indicator-dots="true" :autoplay="true" interval="3000">
      <swiper-item v-for="(image, index) in venueInfo.images" :key="index">
        <image :src="image" mode="aspectFill"></image>
      </swiper-item>
    </swiper>

    <view class="info-section">
      <view class="header">
        <view class="title-area">
          <text class="name">{{ venueInfo.name }}</text>
          <view class="rating">
            <text class="score">{{ venueInfo.rating }}</text>
            <text class="stars">{{ '⭐'.repeat(Math.floor(venueInfo.rating)) }}</text>
          </view>
        </view>
        <button class="book-btn" @tap="handleBook">预约课程</button>
      </view>

      <view class="address-info">
        <text class="label">场馆地址</text>
        <view class="address-row">
          <text class="address">{{ venueInfo.address }}</text>
          <text class="copy-btn" @tap="copyAddress">复制</text>
        </view>
        <text class="distance">距离您{{ venueInfo.distance }}km</text>
      </view>

      <view class="facility-info">
        <text class="label">场馆设施</text>
        <view class="facility-list">
          <view class="facility-item" v-for="(item, index) in venueInfo.facilities" :key="index">
            <text class="icon">{{ item.icon }}</text>
            <text class="name">{{ item.name }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="course-section">
      <view class="section-header">
        <text class="title">近期课程</text>
        <text class="more" @tap="viewAllCourses">查看全部</text>
      </view>
      <scroll-view scroll-x class="course-list">
        <view class="course-item" v-for="(course, index) in courses" :key="index">
          <image class="teacher-avatar" :src="course.teacherAvatar"></image>
          <text class="course-name">{{ course.name }}</text>
          <text class="teacher-name">{{ course.teacherName }}</text>
          <text class="time">{{ course.time }}</text>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const venueInfo = ref({
  name: 'FancyFancy舞室大悦城店',
  rating: 4.8,
  address: '上海市静安区西藏北路166号大悦城L6',
  distance: '2.5',
  images: [
    'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/venue1.jpg',
    'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/venue2.jpg'
  ],
  facilities: [
    { icon: '🚗', name: '停车场' },
    { icon: '🚿', name: '淋浴间' },
    { icon: '🔒', name: '储物柜' },
    { icon: '💨', name: '空调' }
  ]
})

const courses = ref([
  {
    teacherAvatar: 'https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/teacher1.jpg',
    name: 'JAZZ基础',
    teacherName: 'FAFA',
    time: '今天 18:00'
  },
  // ... 更多课程数据
])

const handleBook = () => {
  uni.switchTab({
    url: '/pages/dance/course/index'
  })
}

const copyAddress = () => {
  uni.setClipboardData({
    data: venueInfo.value.address,
    success: () => {
      uni.showToast({
        title: '地址已复制',
        icon: 'success'
      })
    }
  })
}

const viewAllCourses = () => {
  uni.switchTab({
    url: '/pages/dance/course/index'
  })
}

const handleBack = () => {
  uni.navigateBack()
}

onMounted(() => {
  const query = uni.createSelectorQuery()
  query.select('.venue-detail').boundingClientRect(data => {
    console.log(data)
  }).exec()
})
</script>

<style lang="scss">

.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 88rpx;
  background-color: #141123f5;
  backdrop-filter: blur(10px);
  
  .back-btn {
    position: absolute;
    left: 30rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64rpx;
    height: 64rpx;
    padding: 10rpx;
    
    .iconfont {
      font-size: 40rpx;
      color: #fff;
    }
    
    &:active {
      opacity: 0.8; // 点击反馈
    }
  }
  
  .title {
    font-size: 32rpx;
    color: #fff;
    font-weight: 500;
  }
}
.venue-detail {
  min-height: 100vh;
  background-color: #141123f5;

  
  .gallery {
    margin-top: calc(var(--status-bar-height) + 88rpx);
    height: 400rpx;
    
    image {
      width: 100%;
      height: 100%;
    }
  }

  .info-section {
    padding: 30rpx;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 30rpx;

      .title-area {
        .name {
          font-size: 36rpx;
          color: #fff;
          font-weight: 600;
          margin-bottom: 10rpx;
        }

        .rating {
          display: flex;
          align-items: center;
          gap: 10rpx;

          .score {
            color: #FF4D8F;
            font-size: 28rpx;
          }

          .stars {
            color: #FFD700;
            font-size: 24rpx;
          }
        }
      }

      .book-btn {
        background: #FF4D8F;
        color: #fff;
        font-size: 28rpx;
        padding: 12rpx 30rpx;
        border-radius: 100rpx;
      }
    }

    .address-info {
      margin-bottom: 30rpx;

      .label {
        color: rgba(255, 255, 255, 0.6);
        font-size: 28rpx;
        margin-bottom: 16rpx;
      }

      .address-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10rpx;

        .address {
          color: #fff;
          font-size: 28rpx;
          flex: 1;
        }

        .copy-btn {
          color: #FF4D8F;
          font-size: 26rpx;
          padding: 4rpx 20rpx;
          border: 2rpx solid #FF4D8F;
          border-radius: 100rpx;
        }
      }

      .distance {
        color: rgba(255, 255, 255, 0.6);
        font-size: 24rpx;
      }
    }

    .facility-info {
      .label {
        color: rgba(255, 255, 255, 0.6);
        font-size: 28rpx;
        margin-bottom: 16rpx;
      }

      .facility-list {
        display: flex;
        flex-wrap: wrap;
        gap: 20rpx;

        .facility-item {
          display: flex;
          align-items: center;
          gap: 8rpx;
          
          .icon {
            font-size: 32rpx;
          }

          .name {
            color: #fff;
            font-size: 26rpx;
          }
        }
      }
    }
  }

  .course-section {
    padding: 30rpx;

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20rpx;

      .title {
        color: #fff;
        font-size: 32rpx;
        font-weight: 600;
      }

      .more {
        color: rgba(255, 255, 255, 0.6);
        font-size: 26rpx;
      }
    }

    .course-list {
      white-space: nowrap;

      .course-item {
        display: inline-block;
        width: 200rpx;
        margin-right: 20rpx;
        text-align: center;

        .teacher-avatar {
          width: 120rpx;
          height: 120rpx;
          border-radius: 50%;
          margin-bottom: 10rpx;
        }

        .course-name {
          display: block;
          color: #fff;
          font-size: 28rpx;
          margin-bottom: 6rpx;
        }

        .teacher-name {
          display: block;
          color: rgba(255, 255, 255, 0.6);
          font-size: 24rpx;
          margin-bottom: 6rpx;
        }

        .time {
          display: block;
          color: #FF4D8F;
          font-size: 24rpx;
        }
      }
    }
  }
}
</style> 