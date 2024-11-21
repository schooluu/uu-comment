<template>
  <view class="moments-container">
    <!-- 顶部背景图和头像区域 -->
    <view class="header">
      <image class="bg-image" src="https://example.com/sunset.jpg" mode="aspectFill"></image>
      <view class="avatar-area">
        <image class="avatar" src="https://example.com/avatar.jpg" mode="aspectFill"></image>
        <text class="nickname">用户昵称</text>
      </view>
    </view>

    <!-- 朋友圈内容列表 -->
    <view class="moments-list">
      <view class="moment-item" v-for="(item, index) in moments" :key="index">
        <!-- 用户信息 -->
        <image class="user-avatar" :src="item.avatar" mode="aspectFill"></image>
        <view class="content-area">
          <text class="username">{{ item.username }}</text>
          
          <!-- 文本内容 -->
          <text class="text-content">{{ item.content }}</text>
          
          <!-- 图片/视频内容 -->
          <view class="media-content" v-if="item.mediaType">
            <template v-if="item.mediaType === 'video'">
              <video 
                :src="item.mediaUrl" 
                class="video-content"
                :poster="item.poster"
              ></video>
            </template>
            <template v-else>
              <image 
                :src="item.mediaUrl" 
                mode="aspectFill" 
                class="image-content"
              ></image>
            </template>
          </view>

          <!-- 底部信息 -->
          <view class="bottom-info">
            <text class="time">{{ item.time }}</text>
            <view class="actions">
              <text class="like-btn" @tap="handleLike(index)">
                {{ item.isLiked ? '❤️' : '🤍' }}
              </text>
              <text class="comment-btn" @tap="handleComment(index)">💬</text>
            </view>
          </view>

          <!-- 点赞列表 -->
          <view class="likes-section" v-if="item.likes && item.likes.length">
            <text class="like-users">{{ item.likes.join('、') }}</text>
          </view>

          <!-- 评论列表 -->
          <view class="comments-section" v-if="item.comments && item.comments.length">
            <view class="comment-item" v-for="(comment, cIndex) in item.comments" :key="cIndex">
              <text class="comment-user">{{ comment.username }}：</text>
              <text class="comment-content">{{ comment.content }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const moments = ref([
  {
    username: 'UNIAPP X',
    avatar: 'https://example.com/avatar1.jpg',
    content: 'uni-app x, 是下一代 uni-app, 是一个跨平台应用开发引擎。uts是一门类ts的、跨平台的、新语言。uts在iOS端编译为swift、在Android端编译为kotlin、在Web端编译为js。',
    mediaType: 'video',
    mediaUrl: 'https://example.com/video.mp4',
    poster: 'https://example.com/poster.jpg',
    time: '3分钟前',
    isLiked: false,
    likes: ['张三', '查理斯', '王二麻', '切尔西'],
    comments: [
      { username: '查理斯', content: '这是什么地方？真好看啊' },
      { username: '张三', content: '从视频上看，我感觉应该是网上随便截的图，包括文案！' }
    ]
  }
])

const handleLike = (index) => {
  moments.value[index].isLiked = !moments.value[index].isLiked
}

const handleComment = (index) => {
  // 实现评论功能
}
</script>

<style lang="scss" scoped>
.moments-container {
  min-height: 100vh;
  background-color: #f7f7f7;
}

.header {
  position: relative;
  height: 400rpx;
  
  .bg-image {
    width: 100%;
    height: 100%;
  }
  
  .avatar-area {
    position: absolute;
    right: 30rpx;
    bottom: -60rpx;
    display: flex;
    align-items: flex-end;
    
    .avatar {
      width: 120rpx;
      height: 120rpx;
      border-radius: 12rpx;
      border: 4rpx solid #fff;
    }
    
    .nickname {
      margin-right: 20rpx;
      color: #fff;
      font-size: 32rpx;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }
  }
}

.moments-list {
  padding: 20rpx;
  
  .moment-item {
    display: flex;
    margin-bottom: 30rpx;
    padding: 20rpx;
    background: #fff;
    border-radius: 12rpx;
    
    .user-avatar {
      width: 80rpx;
      height: 80rpx;
      border-radius: 8rpx;
      margin-right: 20rpx;
    }
    
    .content-area {
      flex: 1;
      
      .username {
        font-size: 30rpx;
        font-weight: 500;
        color: #333;
        margin-bottom: 10rpx;
      }
      
      .text-content {
        font-size: 28rpx;
        color: #666;
        margin-bottom: 16rpx;
        line-height: 1.5;
      }
      
      .media-content {
        margin-bottom: 16rpx;
        
        .video-content,
        .image-content {
          width: 100%;
          height: 400rpx;
          border-radius: 8rpx;
        }
      }
      
      .bottom-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16rpx;
        
        .time {
          font-size: 24rpx;
          color: #999;
        }
        
        .actions {
          display: flex;
          gap: 20rpx;
          
          .like-btn,
          .comment-btn {
            font-size: 32rpx;
          }
        }
      }
      
      .likes-section,
      .comments-section {
        background: #f8f8f8;
        padding: 16rpx;
        border-radius: 8rpx;
        margin-top: 16rpx;
        
        .like-users {
          font-size: 26rpx;
          color: #576b95;
        }
      }
      
      .comment-item {
        font-size: 26rpx;
        margin-bottom: 8rpx;
        
        .comment-user {
          color: #576b95;
        }
        
        .comment-content {
          color: #333;
        }
      }
    }
  }
}
</style> 