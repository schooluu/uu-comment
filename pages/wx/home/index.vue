<template>
  <view class="moments-container">
    <!-- 顶部背景图和头像区域 -->
    <view class="header">
      <image class="bg-image" :src="defaultAvatar" mode="aspectFill"></image>
      <view class="camera-icon" @tap="handleCamera">
        <text class="iconfont icon-camera">📸</text>
      </view>
      <view class="avatar-area">
        <view class="user-info">
          <text class="nickname">用户昵称</text>
          <image class="avatar" :src="defaultAvatar" mode="aspectFill"></image>
        </view>
      </view>
    </view>

    <!-- 朋友圈内容列表 -->
    <view class="moments-list">
      <view class="moment-item" v-for="(item, index) in moments" :key="index">
        <!-- 用户信息 -->
        <image class="user-avatar" :src="item.avatar" mode="aspectFill"></image>
        <view class="content-area">
          <view class="username">{{ item.username }}</view>
          
          <!-- 文本内容 -->
          <text class="text-content">{{ item.content }}</text>
          
          <!-- 图片/视频内容 -->
          <view class="media-content" v-if="item.mediaType">
            <video 
              v-if="item.mediaType === 'video'" 
              :src="item.mediaUrl" 
              :poster="item.poster"
              class="video-content"
              controls
              show-center-play-btn
              enable-play-gesture
              show-fullscreen-btn
              show-play-btn
              object-fit="contain"
              @error="handleVideoError"
            ></video>
            <view v-else-if="item.mediaType === 'image'" 
                  :class="['image-gallery', `columns-${item.mediaUrls.length}`]">
              <image v-for="(url, imgIndex) in item.mediaUrls" 
                :key="imgIndex"
                :src="url" 
                mode="aspectFill" 
                class="image-content"
              ></image>
            </view>
          </view>

          <!-- 底部信息 -->
          <view class="bottom-info">
            <text class="time">{{ item.time }}</text>
            <view class="actions">
              <text 
                class="like-btn" 
                :class="{ 'liked': item.isLiked, 'animating': isLikeAnimating[index] }"
                @tap="handleLike(index)"
              >
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

    <!-- 评论弹窗 -->
    <view class="comment-popup" v-if="showCommentPopup" @tap="closeCommentPopup">
      <view class="comment-box" @tap.stop>
        <!-- 评论输入区域 -->
        <view class="comment-input-area">
          <input 
            class="comment-input"
            v-model="commentText"
            placeholder="评论"
            :focus="showCommentPopup"
            @confirm="submitComment"
          />
          <view class="toolbar">
            <text class="emoji-btn" @tap="toggleEmojiPanel">😊</text>
            <button 
              class="submit-btn" 
              :class="{ active: commentText.trim() }"
              @tap="submitComment"
            >发送</button>
          </view>
        </view>
        
        <!-- 表情面板 -->
        <view class="emoji-panel" v-if="showEmojiPanel">
          <scroll-view scroll-y class="emoji-list">
            <view class="emoji-group">
              <text 
                v-for="(emoji, index) in emojiList" 
                :key="index"
                class="emoji-item"
                @tap="insertEmoji(emoji)"
              >{{ emoji }}</text>
            </view>
          </scroll-view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 提取重复使用的图片链接为常量
const defaultAvatar = 'https://img0.baidu.com/it/u=1415523915,841919565&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1713286800&t=a9e21a0e5650a672fa2cbd3b133ed7e0'

const moments = ref([
  {
    username: 'UNIAPP X',
    avatar: defaultAvatar,
    content: 'uni-app x, 是下一代 uni-app, 是一个跨平台应用开发引擎。uts是一门类ts的、跨平台的、新语言。uts在iOS端编译为swift、在Android端编译为kotlin、在Web端编译为js。',
    mediaType: 'video',
    mediaUrl: 'https://qiniu-web-assets.dcloud.net.cn/video/sample/2minute-demo.mp4',
    poster: defaultAvatar,
    time: '3分钟前',
    isLiked: false,
    likes: ['张三', '查理斯', '王二麻', '切尔西'],
    comments: [
      { username: '查理斯', content: '这是什么地方？真好看啊' },
      { username: '张三', content: '从视频上看，我感觉应该是网上随便截的图，包括文案！' }
    ]
  },
  // 新增的多张图片类型数据
  {
    username: 'Alice',
    avatar: defaultAvatar,
    content: '这是我最近拍的一些照片，感觉很不错！',
    mediaType: 'image',
    mediaUrls: [
      'https://img0.baidu.com/it/u=1415523915,841919565&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1713286800&t=a9e21a0e5650a672fa2cbd3b133ed7e0',
      'https://img0.baidu.com/it/u=1415523915,841919565&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1713286800&t=a9e21a0e5650a672fa2cbd3b133ed7e0',
      'https://img0.baidu.com/it/u=1415523915,841919565&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1713286800&t=a9e21a0e5650a672fa2cbd3b133ed7e0',
      'https://img0.baidu.com/it/u=1415523915,841919565&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1713286800&t=a9e21a0e5650a672fa2cbd3b133ed7e0',
      'https://img0.baidu.com/it/u=1415523915,841919565&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1713286800&t=a9e21a0e5650a672fa2cbd3b133ed7e0',
      'https://img0.baidu.com/it/u=1415523915,841919565&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1713286800&t=a9e21a0e5650a672fa2cbd3b133ed7e0',
    ],
    time: '5分钟前',
    isLiked: true,
    likes: ['李四', '王五'],
    comments: [
      { username: '李四', content: '这张照片拍得真好！' }
    ]
  },
  // 新增的多张图片类型数据
  {
    username: 'Alice',
    avatar: defaultAvatar,
    content: '这是我最近拍的一些照片，感觉很不错！',
    mediaType: 'image',
    mediaUrls: [
      'https://img0.baidu.com/it/u=1415523915,841919565&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1713286800&t=a9e21a0e5650a672fa2cbd3b133ed7e0',
    ],
    time: '5分钟前',
    isLiked: true,
    likes: ['李四', '王五'],
    comments: [
      { username: '李四', content: '这张照片拍得真好！' }
    ]
  },
  // 新增的多张图片类型数据
  {
    username: 'Alice',
    avatar: defaultAvatar,
    content: '这是我最近拍的一些照片，感觉很不错！',
    mediaType: 'image',
    mediaUrls: [
      'https://img0.baidu.com/it/u=1415523915,841919565&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1713286800&t=a9e21a0e5650a672fa2cbd3b133ed7e0',
      'https://img0.baidu.com/it/u=1415523915,841919565&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1713286800&t=a9e21a0e5650a672fa2cbd3b133ed7e0',
      'https://img0.baidu.com/it/u=1415523915,841919565&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1713286800&t=a9e21a0e5650a672fa2cbd3b133ed7e0',
      'https://img0.baidu.com/it/u=1415523915,841919565&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1713286800&t=a9e21a0e5650a672fa2cbd3b133ed7e0',
    ],
    time: '5分钟前',
    isLiked: true,
    likes: ['李四', '王五'],
    comments: [
      { username: '李四', content: '这张照片拍得真好！' }
    ]
  },
  // 新增的多张图片类型数据
  {
    username: 'Alice',
    avatar: defaultAvatar,
    content: '这是我最近拍的一些照片，感觉很不错！',
    mediaType: 'image',
    mediaUrls: [
      'https://img0.baidu.com/it/u=1415523915,841919565&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1713286800&t=a9e21a0e5650a672fa2cbd3b133ed7e0',
      'https://img0.baidu.com/it/u=1415523915,841919565&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1713286800&t=a9e21a0e5650a672fa2cbd3b133ed7e0',
    ],
    time: '5分钟前',
    isLiked: true,
    likes: ['李四', '王五'],
    comments: [
      { username: '李四', content: '这张照片拍得真好！' }
    ]
  },
  // 新增的多张图片类型数据
  {
    username: 'Alice',
    avatar: defaultAvatar,
    content: '这是我最近拍的一些照片，感觉很不错！',
    mediaType: 'image',
    mediaUrls: [
      'https://img0.baidu.com/it/u=1415523915,841919565&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1713286800&t=a9e21a0e5650a672fa2cbd3b133ed7e0',
      'https://img0.baidu.com/it/u=1415523915,841919565&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1713286800&t=a9e21a0e5650a672fa2cbd3b133ed7e0',
      'https://img0.baidu.com/it/u=1415523915,841919565&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1713286800&t=a9e21a0e5650a672fa2cbd3b133ed7e0'
    ],
    time: '5分钟前',
    isLiked: true,
    likes: ['李四', '王五'],
    comments: [
      { username: '李四', content: '这张照片拍得真好！' }
    ]
  }
])

// 添加点赞动画状态数组
const isLikeAnimating = ref({})

// 优化点赞处理方法
const handleLike = (index) => {
  // 设置动画状态
  isLikeAnimating.value[index] = true
  
  // 切换点赞状态
  moments.value[index].isLiked = !moments.value[index].isLiked
  
  // 更新点赞列表
  if (moments.value[index].isLiked) {
    moments.value[index].likes.push('当前用户')
  } else {
    const userIndex = moments.value[index].likes.indexOf('当前用户')
    if (userIndex > -1) {
      moments.value[index].likes.splice(userIndex, 1)
    }
  }
  
  // 动画结束后重置状态
  setTimeout(() => {
    isLikeAnimating.value[index] = false
  }, 1000)
}

// 评论相关的响应式变量
const showCommentPopup = ref(false)
const showEmojiPanel = ref(false)
const commentText = ref('')
const currentMomentIndex = ref(-1)

// 表情列表
const emojiList = [
  '😊', '😂', '🤣', '❤️', '😍', '🤔', '😒', '👍', '👎', 
  '😳', '🥺', '😭', '😘', '🤗', '🙄', '😴', '🤮', '🤧',
  '😷', '🤒', '🤕', '😈', '👻', '👽', '🤖', '💩', '😺',
  '💪', '👊', '✌️', '🤞', '🙏', '👏', '🙌', '👐', '🤲'
]

// 打开评论弹窗
const handleComment = (index) => {
  currentMomentIndex.value = index
  showCommentPopup.value = true
  showEmojiPanel.value = false
}

// 切换表情面板
const toggleEmojiPanel = () => {
  showEmojiPanel.value = !showEmojiPanel.value
}

// 插入表情
const insertEmoji = (emoji) => {
  commentText.value += emoji
}

// 关闭评论弹窗
const closeCommentPopup = () => {
  showCommentPopup.value = false
  showEmojiPanel.value = false
  commentText.value = ''
  currentMomentIndex.value = -1
}

// 提交评论
const submitComment = () => {
  if (!commentText.value.trim()) return
  
  const newComment = {
    username: '当前用户',
    content: commentText.value.trim()
  }
  
  moments.value[currentMomentIndex.value].comments.push(newComment)
  closeCommentPopup()
}

const handleCamera = () => {
  uni.navigateTo({
    url: '/pages/wx/home/add'
  })
}

const handleVideoError = (err) => {
  console.error('视频加载错误：', err)
}
</script>

<style lang="scss" scoped>
$margins: 20rpx;
$border-radius: 8rpx;
$font-color-dark: #333;
$font-color-light: #666;
$background-color: #ffff;
$action-color: #576b95;

.moments-container {
  min-height: 100vh;
  background-color: $background-color;
}

.header {
  position: relative;
  height: 400rpx;

  .bg-image {
    width: 100%;
    height: 100%;
  }

  .camera-icon {
    position: absolute;
    top: 40rpx;
    right: 40rpx;
    width: 60rpx;
    height: 60rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    
    .icon-camera {
      color: #fff;
      font-size: 36rpx;
    }
  }

  .avatar-area {
    position: absolute;
    right: 30rpx;
    bottom: -60rpx;
    
    .user-info {
      position: relative;
      
      .nickname {
        position: absolute;
        right: 140rpx;  // 头像宽度 + 间距
        bottom: 80rpx;  // 根据需要调整垂直位置
        color: #fff;
        font-size: 32rpx;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        white-space: nowrap;  // 防止文字换行
      }

      .avatar {
        width: 120rpx;
        height: 120rpx;
        border-radius: 12rpx;
        border: 4rpx solid #fff;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
      }
    }
  }
}

.moments-list {
  padding: $margins;

  .moment-item {
    display: flex;
    margin-bottom: 30rpx;
    padding: $margins;
    background: #fff;
    border-radius: 12rpx;

    .user-avatar {
      width: 80rpx;
      height: 80rpx;
      border-radius: $border-radius;
      margin-right: $margins;
    }

    .content-area {
      flex: 1;

      .username {
        font-size: 30rpx;
        font-weight: 500;
        color: $font-color-dark;
        margin-bottom: 10rpx;
      }

      .text-content {
        font-size: 28rpx;
        color: $font-color-light;
        margin-bottom: 16rpx;
        line-height: 1.5;
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
          gap: $margins;

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
        border-radius: $border-radius;
        margin-top: 16rpx;

        .like-users {
          font-size: 26rpx;
          color: $action-color;
        }
      }

      .comment-item {
        font-size: 26rpx;
        margin-bottom: 8rpx;

        .comment-user {
          color: $action-color;
        }

        .comment-content {
          color: $font-color-dark;
        }
      }
    }
  }
}

.image-gallery {
  display: grid;
  gap: 10rpx;
}

.columns-1 {
  grid-template-columns: repeat(1, 1fr);
}

.columns-2 {
  grid-template-columns: repeat(2, 1fr);
}

.columns-3 {
  grid-template-columns: repeat(3, 1fr);
}

.columns-4 {
  grid-template-columns: repeat(2, 1fr);
}

.columns-5,
.columns-6,
.columns-7,
.columns-8,
.columns-9 {
  grid-template-columns: repeat(3, 1fr);
}

.image-content {
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 8rpx;
  object-fit: cover;
}

.media-content {
  margin-bottom: 16rpx;
  
  .video-content {
    width: 100%;
    height: 100%;
    border-radius: 8rpx;
    object-fit: cover;
  }
}

// 如果是单个视频，可以设置更大的尺寸
.moment-item:has(.video-content) {
  .media-content {
    width: 100%;
    
    .video-content {
      width: 100%;
      height: 400rpx;
    }
  }
}

.comment-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  animation: fadeIn 0.2s ease-out;
  
  .comment-box {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    animation: slideUp 0.3s ease-out;
    
    .comment-input-area {
      display: flex;
      align-items: center;
      padding: 20rpx;
      border-top: 1rpx solid #eee;
      background: #f8f8f8;
      
      .comment-input {
        flex: 1;
        height: 72rpx;
        background: #fff;
        border-radius: 36rpx;
        padding: 0 30rpx;
        font-size: 28rpx;
        border: 1rpx solid #eee;
      }
      
      .toolbar {
        display: flex;
        align-items: center;
        margin-left: 20rpx;
        gap: 20rpx;
        
        .emoji-btn {
          font-size: 56rpx;
          line-height: 1;
          padding: 0 10rpx;
          
          &:active {
            opacity: 0.7;
          }
        }
        
        .submit-btn {
          min-width: 120rpx;
          height: 72rpx;
          line-height: 72rpx;
          text-align: center;
          background: #f0f0f0;
          color: #999;
          border-radius: 36rpx;
          font-size: 28rpx;
          
          &.active {
            background: #07c160;
            color: #fff;
          }
        }
      }
    }
    
    .emoji-panel {
      height: 400rpx;
      background: #fff;
      border-top: 1rpx solid #eee;
      animation: slideUp 0.2s ease-out;
      
      .emoji-list {
        height: 100%;
        padding: 20rpx;
        
        .emoji-group {
          display: flex;
          flex-wrap: wrap;
          gap: 10rpx;
          
          .emoji-item {
            width: 80rpx;
            height: 80rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 40rpx;
            
            &:active {
              background: #f5f5f5;
              border-radius: 8rpx;
            }
          }
        }
      }
    }
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

.like-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  padding: 10rpx;
  position: relative;
  transition: transform 0.2s ease;
  
  &:active {
    transform: scale(0.9);
  }
  
  &.liked {
    animation: likeScale 0.3s ease forwards;
  }
  
  &.animating {
    &::before {
      content: '❤️';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      animation: likeFloat 1s ease-out;
    }
    
   
  }
}

// 点赞缩放动画
@keyframes likeScale {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

// 点赞漂浮动画
@keyframes likeFloat {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, -100%) scale(1.2);
    opacity: 0.5;
  }
  100% {
    transform: translate(-50%, -150%) scale(0.8);
    opacity: 0;
  }
}

// 点赞波纹动画
@keyframes likeRipple {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}
</style>
