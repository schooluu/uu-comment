<template>
  <view class="moments-container">
    <!-- 顶部背景图和宣言区域 -->
    <view class="header">
      <image class="bg-image" :src="headerBg" mode="aspectFill"></image>
      <view class="header-gradient"></view>
      <view class="header-blur"></view>
      <view class="header-glow"></view>
      <view class="slogan-area">
        <text class="slogan-typing">
          <span v-html="typedSlogan"></span><span class="cursor" :class="{ blink: showCursor }">|</span>
        </text>
        <text class="signature">{{ todayMood }}</text>
      </view>
    </view>
    <!-- 朋友圈内容列表 -->
    <view class="moments-list">
      <view class="moment-item" v-for="(item, index) in moments" :key="index">
        <!-- 用户信息 -->
        <image class="user-avatar avatar-glow" :src="item.avatar" mode="aspectFill"></image>
        <view class="content-area">
          <view class="username">{{ item.username }}</view>
          <!-- 文本内容 -->
          <text class="text-content">{{ item.content }}</text>
          <!-- 图片/视频内容 -->
          <view class="media-content" v-if="item.mediaType">
            <video v-if="item.mediaType === 'video'" :src="item.mediaUrl" :poster="item.poster"
              class="video-content video-radius" controls show-center-play-btn enable-play-gesture show-fullscreen-btn
              show-play-btn object-fit="contain" @error="handleVideoError"></video>
            <view v-else-if="item.mediaType === 'image'" :class="['image-gallery', `columns-${item.mediaUrls.length}`]">
              <image v-for="(url, imgIndex) in item.mediaUrls" :key="imgIndex" :src="url" mode="aspectFill"
                class="image-content image-radius" @tap="previewImage(item.mediaUrls, url)"></image>
            </view>
          </view>
          <!-- 底部信息 -->
          <view class="bottom-info">
            <text class="time">{{ item.time }}</text>
            <view class="actions">
              <view class="action-btn like-btn" :class="{ 'liked': item.isLiked, 'animating': isLikeAnimating[index] }"
                @tap="handleLike(index)">
                <text class="icon iconfont">{{ item.isLiked ? '❤️' : '🤍' }}</text>
                <text class="action-text">{{ item.isLiked ? '已赞' : '点赞' }}</text>
                <view v-if="isLikeAnimating[index]" class="like-burst-particles">
                  <view v-for="n in 8" :key="n" :class="['particle', 'p' + n]"></view>
                </view>
              </view>
              <view class="action-btn comment-btn" @tap="handleComment(index)">
                <text class="icon iconfont">💬</text>
                <text class="action-text">评论</text>
              </view>
            </view>
          </view>
          <!-- 点赞列表 -->
          <view class="likes-section" v-if="item.likes && item.likes.length">
            <text class="like-users">{{ item.likes.join('、') }}</text>
          </view>
          <!-- 评论列表 -->
          <view class="comments-section" v-if="item.comments && item.comments.length !== 0">
            <view class="comment-item" v-for="(comment, cIndex) in item.comments" :key="cIndex">
              <image class="comment-anon-icon" :src="anonymousAvatar" />
              <text class="comment-user">{{ comment.username }}：</text>
              <text class="comment-content">{{ comment.content }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 评论弹窗 -->
    <view class="comment-popup" v-if="showCommentPopup" @tap="closeCommentPopup">
      <view class="comment-box animated-popup" @tap.stop>
        <!-- 评论输入区域 -->
        <view class="comment-input-area">
          <input class="comment-input" v-model="commentText" placeholder="@匿名用户 说点什么..." :focus="showCommentPopup"
            @confirm="submitComment" />
          <view class="toolbar">
            <text class="emoji-btn" @tap="toggleEmojiPanel">😊</text>
            <button class="submit-btn" :class="{ active: commentText.trim() }" @tap="submitComment">发送</button>
          </view>
        </view>
        <!-- 表情面板 -->
        <view class="emoji-panel" v-if="showEmojiPanel">
          <scroll-view scroll-y class="emoji-list">
            <view class="emoji-group">
              <text v-for="(emoji, index) in emojiList" :key="index" class="emoji-item" @tap="insertEmoji(emoji)">{{
                emoji }}</text>
            </view>
          </scroll-view>
        </view>
      </view>
    </view>
    <!-- 发布按钮 -->
    <view class="publish-btn" @tap="handleCamera">
      <view class="icon-wrapper">
        <text class="iconfont">+</text>
      </view>
    </view>
    <!-- 科技感加载动画 -->
    <view class="tech-loading" v-if="loading">
      <view class="dot" v-for="i in 4" :key="i"></view>
      <text class="loading-text">加载中...</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { nextTick } from 'vue'
import {
  onShow,
  onReachBottom,
  onPullDownRefresh,
  onPageScroll
} from '@dcloudio/uni-app';
// 匿名昵称池
const anonymousNames = [
  '星河旅人', '夏日微风', '蓝莓汽水', '橙子汽球', '夜空守望', '晨曦微光', '云端漫步', '月下独行',
  '白茶清欢', '青柠时光', '温柔星球', '晴空万里', '风中诗人', '海盐冰沙', '山野听风', '橘子海岸',
  '银河信使', '微光拾梦', '晚风邮差', '雾里看花', '森林之心', '雨后初晴', '云朵收集者', '夏夜萤火'
]
function getRandomName() {
  return anonymousNames[Math.floor(Math.random() * anonymousNames.length)]
}
// 匿名头像
const anonymousAvatar = 'https://qcloud.dpfile.com/pc/pawK4KeJSDNVINhfwh9CoLJPFluB-tnHSd3heJ_jybtNIYslSlGEPeQVyA4hZRCP.jpg';
const headerBg = 'https://img1.imgtp.com/2023/07/10/0Qv6Qw4w.png'; // 新科技感头像/背景
const defaultAvatar = anonymousAvatar
// 今日心情文案
const moodList = [
  '今天也要元气满满！',
  '匿名分享，轻松自在~',
  '每一天都值得记录。',
  '用心感受生活的美好。',
  '科技让匿名更温暖。',
  '世界很大，心情很美。',
  '做自己的小太阳 ☀️',
  '匿名不孤单，温暖在身边。',
  '记录此刻，遇见更好的自己。',
  '保持好奇，保持热爱！'
]
const todayMood = moodList[Math.floor(Math.random() * moodList.length)]
// 动态宣言文案池
const sloganList = [
  '匿名树洞 · 美好生活',
  '用温柔治愈世界',
  '每一天都值得记录',
  '让心情自由流动',
  '科技让温暖发生',
  '在这里遇见美好',
  '分享你的故事',
  '做自己的小太阳',
  '世界很大，温暖很近',
  '用匿名守护真心'
]
const currentSlogan = ref(sloganList[0])
let sloganIndex = 0
// 顶部宣言打字机动画
const typedSlogan = ref('')
const showCursor = ref(true)
let typingTimer = null
let sloganTypingIndex = 0
let charIndex = 0
function startTypingSlogan() {
  clearTimeout(typingTimer)
  const slogan = sloganList[sloganTypingIndex]
  typedSlogan.value = ''
  charIndex = 0
  function typeChar() {
    if (charIndex <= slogan.length) {
      typedSlogan.value = slogan.slice(0, charIndex)
      charIndex++
      typingTimer = setTimeout(typeChar, 60)
    } else {
      // 停留一段时间后切换下一个
      setTimeout(() => {
        sloganTypingIndex = (sloganTypingIndex + 1) % sloganList.length
        startTypingSlogan()
      }, 1800)
    }
  }
  typeChar()
}
onMounted(() => {
  startTypingSlogan()
  setInterval(() => { showCursor.value = !showCursor.value }, 500)
})
// 评论相关的响应式变量
const showCommentPopup = ref(false)
const showEmojiPanel = ref(false)
const commentText = ref('')
const currentMomentIndex = ref(-1)
const isLikeAnimating = ref({})
// 分页相关变量
const page = ref(1)
const pageSize = ref(10)
const loading = ref(false)
const hasMore = ref(true)
const moments = ref([])
const handleLogin = () => {
  uni.navigateTo({
    url: '/pages/wx/login/login'
  })
}
// 获取朋友圈列表
const getMomentsList = async (isRefresh = false) => {
  if (loading.value || (!hasMore.value && !isRefresh)) return

  try {
    loading.value = true

    // 添加最小加载时间，确保动画效果显示
    const minLoadTime = new Promise(resolve => setTimeout(resolve, 800))

    const [{ result }] = await Promise.all([
      uniCloud.callFunction({
        name: 'wx_get_list',
        data: {
          page: isRefresh ? 1 : page.value,
          pageSize: pageSize.value
        }
      }),
      minLoadTime
    ])

    if (result.code === 0) {
      // 匿名处理：每条动态分配一个随机昵称
      const list = result.data.list.map(item => ({
        ...item,
        username: getRandomName(),
        avatar: anonymousAvatar,
        comments: (item.comments || []).map(c => ({ ...c, username: getRandomName() })),
        likes: (item.likes || []).map(() => getRandomName())
      }))
      if (isRefresh) {
        moments.value = list
        page.value = 1
      } else {
        moments.value = [...moments.value, ...list]
        page.value++
      }
      hasMore.value = result.data.hasMore
    } else {
      throw new Error(result.msg)
    }
  } catch (error) {
    uni.showToast({
      title: error.message || '获取朋友圈失败',
      icon: 'none'
    })
  } finally {
    loading.value = false
    if (isRefresh) {
      uni.stopPullDownRefresh()
    }
  }
}

onShow(() => {
  getMomentsList(true)
})
// 触底加载
onReachBottom(() => {
  getMomentsList()
})

// 点赞/取消点赞
const handleLike = async (index) => {
  try {
    const moment = moments.value[index]
    isLikeAnimating.value[index] = true

    const { result } = await uniCloud.callFunction({
      name: 'wx_add_toggle_like',
      data: {
        momentId: moment._id
      }
    })

    if (result.code === 0) {
      moment.isLiked = result.data.isLiked
      // 更新点赞状态
      if (moment.isLiked) {
        if (!moment.likes) moment.likes = []
        moment.likes.push(getRandomName())
      } else {
        moment.likes.pop()
      }
    } else {
      throw new Error(result.msg)
    }

    setTimeout(() => {
      isLikeAnimating.value[index] = false
    }, 1000)

  } catch (error) {
    uni.showToast({
      title: error.message || '操作失败',
      icon: 'none'
    })
  }
}

// 发表评论
const submitComment = async () => {
  if (!commentText.value.trim()) return
  // 重置状态

  showCommentPopup.value = false
  showEmojiPanel.value = false

  uni.showToast({
    title: '评论成功',
    icon: 'none'
  })
  try {
    const { result } = await uniCloud.callFunction({
      name: 'wx_add_comment',
      data: {
        momentId: moments.value[currentMomentIndex.value]._id,
        content: commentText.value
      }
    })

    if (result.code === 0) {
      // 更新评论列表
      const moment = moments.value[currentMomentIndex.value]
      if (!moment.comments) moment.comments = []
      moment.comments.push({
        username: getRandomName(),
        content: commentText.value,
        create_time: Date.now()
      })

      commentText.value = ''


    } else {
      throw new Error(result.msg)
    }
  } catch (error) {
    uni.showToast({
      title: error.message || '评论失败',
      icon: 'none'
    })
  }
}

// 跳转发布页面
const handleCamera = async () => {
  uni.navigateTo({
    url: '/pages/wx/home/add'
  })
}

// 评论相关方法
const handleComment = (index) => {
  currentMomentIndex.value = index
  showCommentPopup.value = true
}

const closeCommentPopup = () => {
  showCommentPopup.value = false
  showEmojiPanel.value = false
  commentText.value = ''
  currentMomentIndex.value = -1
}

const toggleEmojiPanel = () => {
  showEmojiPanel.value = !showEmojiPanel.value
}

const insertEmoji = (emoji) => {
  commentText.value += emoji
}

// 图片点击预览
const previewImage = (urls, current) => {
  if (!urls || !urls.length) return
  uni.previewImage({
    urls,
    current
  })
}

// 视频错误处理
const handleVideoError = () => {
  uni.showToast({
    title: '视频加载失败',
    icon: 'none'
  })
}


// 表情列表
const emojiList = [
  '😊', '😂', '🤣', '❤️', '😍', '🤔', '😒', '👍', '👎',
  '😳', '🥺', '😭', '😘', '🤗', '🙄', '😴', '🤮', '🤧',
  '😷', '🤒', '🤕', '😈', '👻', '👽', '🤖', '💩', '😺',
  '💪', '👊', '✌️', '🤞', '🙏', '👏', '🙌', '👐', '🤲'
]
</script>

<style lang="scss" scoped>
$primary-gradient: linear-gradient(90deg, #5A8FFF 0%, #7F5AFF 100%);
$card-radius: 20rpx;
$shadow: 0 8rpx 32rpx rgba(90, 143, 255, 0.08);
$font-color-dark: #222;
$font-color-light: #666;
$background-color: #f7f9fb;
$action-color: #5A8FFF;

.moments-container {
  min-height: 100vh;
  background: $background-color;
}

.header {
  position: relative;
  height: 400rpx;

  .bg-image {
    width: 100%;
    height: 100%;
    filter: blur(2px) brightness(0.9);
  }

  .header-gradient {
    position: absolute;
    inset: 0;
    background: $primary-gradient;
    opacity: 0.45;
    z-index: 1;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .header-blur {
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.12);
    filter: blur(8px);
    z-index: 1;
    pointer-events: none;
  }

  .header-glow {
    position: absolute;
    left: 60rpx;
    top: 60rpx;
    width: 120rpx;
    height: 120rpx;
    background: radial-gradient(circle, #7F5AFF 0%, #5A8FFF 60%, transparent 100%);
    opacity: 0.18;
    border-radius: 50%;
    z-index: 2;
    pointer-events: none;
  }

  .slogan-area {
    position: absolute;
    left: 0;
    right: 0;
    top: 120rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 3;
    .slogan-typing {
      color: #fff;
      font-size: 44rpx;
      font-weight: 700;
      text-shadow: 0 2rpx 8rpx rgba(90,143,255,0.3);
      letter-spacing: 4rpx;
      margin-bottom: 18rpx;
      min-height: 60rpx;
      transition: color 0.3s;
      display: flex;
      align-items: center;
      .cursor {
        display: inline-block;
        width: 18rpx;
        margin-left: 2rpx;
        color: #7F5AFF;
        font-weight: 900;
        font-size: 44rpx;
        opacity: 0.8;
        transition: opacity 0.2s;
        &.blink {
          opacity: 0.2;
        }
      }
      span {
        background: linear-gradient(90deg, #5A8FFF 0%, #7F5AFF 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: sloganFadeIn 0.7s cubic-bezier(0.23, 1.2, 0.32, 1);
      }
    }
    .signature {
      color: #e0e6f6;
      font-size: 28rpx;
      font-style: italic;
      opacity: 0.85;
    }
  }
  // 顶部宣言渐变切换动画
  .slogan-fade-enter-active, .slogan-fade-leave-active {
    transition: opacity 0.7s cubic-bezier(0.23, 1.2, 0.32, 1);
  }
  .slogan-fade-enter-from, .slogan-fade-leave-to {
    opacity: 0;
    filter: blur(8rpx);
    transform: translateY(-20rpx) scale(0.96);
  }
  .slogan-fade-enter-to, .slogan-fade-leave-from {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0) scale(1);
  }

  .avatar-area {
    display: none;
  }
}

.moments-list {
  padding: 40rpx 20rpx 0 20rpx;

  .moment-item {
    display: flex;
    margin-bottom: 32rpx;
    padding: 32rpx 24rpx;
    background: #fff;
    border-radius: $card-radius;
    box-shadow: $shadow;

    .user-avatar {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
      margin-right: 24rpx;
      border: 2rpx solid #5A8FFF;
      box-shadow: 0 0 12rpx #7F5AFF;
      background: #fff;
    }

    .content-area {
      flex: 1;

      .username {
        font-size: 30rpx;
        font-weight: 600;
        color: $font-color-dark;
        margin-bottom: 10rpx;
      }

      .text-content {
        font-size: 28rpx;
        color: $font-color-light;
        margin-bottom: 24rpx;
        line-height: 1.5;
      }

      .media-content {
        margin-bottom: 16rpx;
        margin-top: 20rpx;

        .video-content {
          width: 100%;
          height: 400rpx;
          border-radius: 16rpx;
          object-fit: cover;
        }

        .image-gallery {
          display: grid;
          gap: 12rpx;
        }

        .image-radius {
          border-radius: 12rpx;
        }
      }

      .bottom-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20rpx 0;

        .time {
          font-size: 24rpx;
          color: #999;
        }

        .actions {
          display: flex;
          align-items: center;
          gap: 30rpx;

          .action-btn {
            display: flex;
            align-items: center;
            padding: 12rpx 20rpx;
            border-radius: 30rpx;
            background: rgba(90, 143, 255, 0.06);
            transition: all 0.3s;

            .icon {
              font-size: 32rpx;
              margin-right: 8rpx;
              color: $action-color;
              transition: transform 0.2s, color 0.2s;
            }

            .action-text {
              font-size: 24rpx;
              color: #666;
            }

            &:active {
              transform: scale(0.95);
              background: rgba(127, 90, 255, 0.12);
            }
          }

          .like-btn {
            &.liked {
              background: rgba(90, 143, 255, 0.13);

              .action-text {
                color: #5A8FFF;
              }

              .icon {
                color: #7F5AFF;
              }
            }

            &.animating .icon {
              animation: likeBounce 0.4s;
            }

            .like-burst {
              position: absolute;
              left: 50%;
              top: 50%;
              width: 40rpx;
              height: 40rpx;
              pointer-events: none;
              transform: translate(-50%, -50%);
              background: radial-gradient(circle, #7F5AFF 0%, #5A8FFF 60%, transparent 100%);
              opacity: 0.5;
              animation: burst 0.5s;
              border-radius: 50%;
            }
          }
        }
      }

      .likes-section,
      .comments-section {
        background: #f4f7ff;
        padding: 16rpx;
        border-radius: 12rpx;
        margin-top: 16rpx;

        .like-users {
          font-size: 26rpx;
          color: $action-color;
        }
      }

      .comments-section {
        .comment-item {
          display: flex;
          align-items: center;
          font-size: 26rpx;
          margin-bottom: 8rpx;

          .comment-dot {
            width: 10rpx;
            height: 10rpx;
            background: $action-color;
            border-radius: 50%;
            margin-right: 10rpx;
          }

          .comment-user {
            color: $action-color;
            margin-right: 4rpx;
          }

          .comment-content {
            color: $font-color-dark;
          }
        }
      }
    }
  }
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
  object-fit: cover;
}

.video-radius {
  border-radius: 16rpx;
}

// 点赞动画
@keyframes likeBounce {
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

@keyframes burst {
  0% {
    opacity: 0.5;
    transform: scale(0.8);
  }

  80% {
    opacity: 0.8;
    transform: scale(1.3);
  }

  100% {
    opacity: 0;
    transform: scale(1.8);
  }
}

// 评论弹窗动画
.animated-popup {
  animation: popupIn 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}

@keyframes popupIn {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
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

  .comment-box {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    border-top-left-radius: 24rpx;
    border-top-right-radius: 24rpx;
    box-shadow: 0 -4rpx 24rpx rgba(90, 143, 255, 0.08);

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
          background: #e0e6f6;
          color: #999;
          border-radius: 36rpx;
          font-size: 28rpx;
          border: none;

          &.active {
            background: $primary-gradient;
            color: #fff;
            font-weight: 600;
            box-shadow: 0 2rpx 8rpx #5A8FFF33;
          }
        }
      }
    }

    .emoji-panel {
      height: 400rpx;
      background: #fff;
      border-top: 1rpx solid #eee;

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

.publish-btn {
  position: fixed;
  right: 30rpx;
  bottom: 120rpx;
  z-index: 99;
  width: 100rpx;
  height: 100rpx;
  background: $primary-gradient;
  border-radius: 50%;
  box-shadow: 0 6rpx 16rpx #5A8FFF33;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;

    .iconfont {
      color: #fff;
      font-size: 60rpx;
      font-weight: 300;
      line-height: 1;
    }
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: inherit;
    border-radius: inherit;
    opacity: 0.4;
    transform: scale(1);
    animation: breathe 2s ease-in-out infinite;
  }
}

@keyframes breathe {
  0% {
    transform: scale(1);
    opacity: 0.4;
  }

  50% {
    transform: scale(1.6);
    opacity: 0;
  }

  100% {
    transform: scale(1);
    opacity: 0.4;
  }
}

// 科技感加载动画
.tech-loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 999;
  background: rgba(255, 255, 255, 0.96);
  padding: 40rpx;
  border-radius: 20rpx;
  backdrop-filter: blur(10px);

  .dot {
    width: 20rpx;
    height: 20rpx;
    background: $primary-gradient;
    border-radius: 50%;
    margin: 0 8rpx;
    animation: techDot 1s infinite alternate;
    display: inline-block;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }

    &:nth-child(4) {
      animation-delay: 0.6s;
    }
  }

  .loading-text {
    margin-top: 30rpx;
    font-size: 28rpx;
    color: #666;
    letter-spacing: 2rpx;
    animation: textPulse 1.5s ease-in-out infinite;
  }
}

@keyframes techDot {
  0% {
    opacity: 0.5;
    transform: scale(1);
  }

  100% {
    opacity: 1;
    transform: scale(1.5);
  }
}

@keyframes textPulse {

  0%,
  100% {
    opacity: 0.6;
  }

  50% {
    opacity: 1;
  }
}

// 优化列表加载动画
.moment-item {
  opacity: 0;
  transform: translateY(30rpx);
  animation: fadeInUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;

  @for $i from 1 through 10 {
    &:nth-child(#{$i}) {
      animation-delay: #{$i * 0.08}s;
    }
  }

  &:hover {
    transform: translateY(-2rpx);
    box-shadow: 0 6rpx 24rpx rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30rpx);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 添加骨架屏动画
.skeleton {
  background: linear-gradient(90deg,
      rgba(190, 190, 190, 0.2) 25%,
      rgba(129, 129, 129, 0.24) 37%,
      rgba(190, 190, 190, 0.2) 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
}

@keyframes shimmer {
  0% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}

// 添加下拉刷新动画
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.interaction-area {
  margin-top: 16rpx;
  background: #f8f8f8;
  border-radius: 12rpx;
  overflow: hidden;

  .likes-section {
    padding: 16rpx;
    display: flex;
    align-items: center;

    .heart-icon {
      font-size: 24rpx;
      margin-right: 10rpx;
    }

    .like-users {
      font-size: 26rpx;
      color: $action-color;
      line-height: 1.4;
    }
  }

  .divider {
    height: 1rpx;
    background: rgba(0, 0, 0, 0.06);
    margin: 0 16rpx;
  }

  .comments-section {
    padding: 16rpx;

    .comment-item {
      display: flex;
      margin-bottom: 12rpx;
      font-size: 26rpx;
      line-height: 1.4;

      &:last-child {
        margin-bottom: 0;
      }

      &.new-comment {
        animation: commentFadeIn 0.3s ease;
      }

      .comment-user {
        color: $action-color;
        font-weight: 500;
      }

      .comment-separator {
        color: #999;
        margin: 0 4rpx;
      }

      .comment-content {
        color: $font-color-dark;
        flex: 1;
        word-break: break-all;
      }
    }
  }
}

@keyframes likePopup {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.4) rotate(15deg);
  }

  100% {
    transform: scale(1) rotate(0);
  }
}

@keyframes commentFadeIn {
  from {
    opacity: 0;
    transform: translateY(10rpx);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 评论区匿名icon
.comment-anon-icon {
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
  margin-right: 8rpx;
  background: #f4f7ff;
  border: 1rpx solid #e0e6f6;
}

// 点赞粒子爆炸动画
.like-burst-particles {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 40rpx;
  height: 40rpx;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 2;

  .particle {
    position: absolute;
    width: 8rpx;
    height: 8rpx;
    border-radius: 50%;
    background: $primary-gradient;
    opacity: 0.7;
    animation: particleBurst 0.5s linear;
  }

  .p1 {
    left: 50%;
    top: 0%;
    animation-delay: 0s;
  }

  .p2 {
    left: 85%;
    top: 15%;
    animation-delay: 0.05s;
  }

  .p3 {
    left: 100%;
    top: 50%;
    animation-delay: 0.1s;
  }

  .p4 {
    left: 85%;
    top: 85%;
    animation-delay: 0.15s;
  }

  .p5 {
    left: 50%;
    top: 100%;
    animation-delay: 0.2s;
  }

  .p6 {
    left: 15%;
    top: 85%;
    animation-delay: 0.25s;
  }

  .p7 {
    left: 0%;
    top: 50%;
    animation-delay: 0.3s;
  }

  .p8 {
    left: 15%;
    top: 15%;
    animation-delay: 0.35s;
  }
}

@keyframes particleBurst {
  0% {
    transform: scale(0.5);
    opacity: 0.7;
  }

  80% {
    transform: scale(1.2);
    opacity: 1;
  }

  100% {
    transform: scale(1.8);
    opacity: 0;
  }
}

// 顶部宣言循环弹跳动画
.slogan-bounce-animate {
  animation: sloganBounceLoop 2.2s cubic-bezier(0.23, 1.2, 0.32, 1) infinite;
}
@keyframes sloganBounceLoop {
  0% { transform: translateY(0) scale(1); }
  10% { transform: translateY(-18rpx) scale(1.08); }
  18% { transform: translateY(6rpx) scale(0.98); }
  24% { transform: translateY(-4rpx) scale(1.03); }
  30% { transform: translateY(0) scale(1); }
  100% { transform: translateY(0) scale(1); }
}
@keyframes sloganFadeIn {
  0% { opacity: 0; filter: blur(8rpx); }
  100% { opacity: 1; filter: blur(0); }
}
</style>
