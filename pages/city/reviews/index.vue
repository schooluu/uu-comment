<template>
  <view class="reviews-container">
    <view class="header">
      <text class="title">评价列表</text>
    </view>
    
    <view class="stats-section">
      <view class="rating">
        <text class="score">4.8</text>
        <text class="total">共 126 条评价</text>
      </view>
      <view class="tags">
        <text 
          v-for="(tag, index) in tags" 
          :key="index"
          :class="['tag', { active: tag.active }]"
          @tap="selectTag(index)">
          {{ tag.name }}({{ tag.count }})
        </text>
      </view>
    </view>
    
    <scroll-view scroll-y class="review-list">
      <view 
        class="review-item" 
        v-for="(review, index) in reviews" 
        :key="index">
        <view class="user-info">
          <image class="avatar" :src="review.avatar"></image>
          <text class="name">{{ review.name }}</text>
          <view class="stars">
            <text 
              v-for="n in 5" 
              :key="n"
              :class="['star', { filled: n <= review.rating }]">
              ⭐
            </text>
          </view>
        </view>
        <view class="review-content">
          <text class="text">{{ review.content }}</text>
          <view class="images" v-if="review.images?.length">
            <image 
              v-for="(img, imgIndex) in review.images"
              :key="imgIndex"
              :src="img"
              mode="aspectFill"
              @tap="previewImage(review.images, imgIndex)">
            </image>
          </view>
          <text class="time">{{ review.time }}</text>
        </view>
        <view class="merchant-reply" v-if="review.reply">
          <text class="reply-title">商家回复：</text>
          <text class="reply-content">{{ review.reply }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
const tags = [
  { name: '全部', count: 126, active: true },
  { name: '好评', count: 108, active: false },
  { name: '中评', count: 12, active: false },
  { name: '差评', count: 6, active: false },
  { name: '有图', count: 45, active: false }
]

const reviews = [
  {
    avatar: 'https://example.com/avatar1.jpg',
    name: '用户123',
    rating: 5,
    content: '商品质量很好，服务态度也不错！',
    images: [
      'https://example.com/review1.jpg',
      'https://example.com/review2.jpg'
    ],
    time: '2024-01-20',
    reply: '感谢您的支持，欢迎下次光临！'
  }
  // ... 更多评价数据
]

const selectTag = (index) => {
  tags.forEach((tag, i) => {
    tag.active = i === index
  })
  // 这里可以添加筛选评价的逻辑
}

const previewImage = (images, current) => {
  uni.previewImage({
    urls: images,
    current: images[current]
  })
}
</script>

<style lang="scss" scoped>
.reviews-container {
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
  
  .stats-section {
    background: #fff;
    padding: 30rpx;
    margin-bottom: 20rpx;
    
    .rating {
      text-align: center;
      margin-bottom: 20rpx;
      
      .score {
        font-size: 48rpx;
        font-weight: bold;
        color: #ff5a5f;
        margin-right: 20rpx;
      }
      
      .total {
        font-size: 26rpx;
        color: #999;
      }
    }
    
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 20rpx;
      
      .tag {
        padding: 8rpx 20rpx;
        background: #f5f5f5;
        color: #666;
        font-size: 26rpx;
        border-radius: 24rpx;
        
        &.active {
          background: #07c160;
          color: #fff;
        }
      }
    }
  }
  
  .review-list {
    padding: 20rpx;
    
    .review-item {
      background: #fff;
      border-radius: 12rpx;
      padding: 20rpx;
      margin-bottom: 20rpx;
      
      .user-info {
        display: flex;
        align-items: center;
        margin-bottom: 16rpx;
        
        .avatar {
          width: 60rpx;
          height: 60rpx;
          border-radius: 30rpx;
          margin-right: 16rpx;
        }
        
        .name {
          font-size: 28rpx;
          color: #333;
          margin-right: 20rpx;
        }
        
        .stars {
          .star {
            font-size: 24rpx;
            color: #ddd;
            
            &.filled {
              color: #ffd700;
            }
          }
        }
      }
      
      .review-content {
        .text {
          font-size: 28rpx;
          color: #333;
          line-height: 1.6;
        }
        
        .images {
          display: flex;
          flex-wrap: wrap;
          gap: 12rpx;
          margin: 16rpx 0;
          
          image {
            width: 180rpx;
            height: 180rpx;
            border-radius: 8rpx;
          }
        }
        
        .time {
          font-size: 24rpx;
          color: #999;
        }
      }
      
      .merchant-reply {
        margin-top: 16rpx;
        background: #f9f9f9;
        padding: 16rpx;
        border-radius: 8rpx;
        
        .reply-title {
          font-size: 26rpx;
          color: #666;
          margin-right: 8rpx;
        }
        
        .reply-content {
          font-size: 26rpx;
          color: #333;
        }
      }
    }
  }
}
</style> 