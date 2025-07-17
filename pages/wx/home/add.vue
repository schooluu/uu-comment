<template>
  <view class="publish-container">
    <!-- 顶部渐变导航栏 -->
    <view class="nav-bar gradient-bar">
      <text class="cancel" @tap="handleCancel">取消</text>
      <view class="publish-btn-wrap">
        <text class="publish" :class="{ active: canPublish }" @tap="handlePublish">
          <view class="publish-btn-glow"></view>
          发表
        </text>
      </view>
    </view>
    <!-- 内容输入区 -->
    <view class="content-area">
      <textarea
        class="content-input"
        v-model="content"
        placeholder="这一刻的想法...支持表情😊"
        placeholder-style="color: #999;"
        maxlength="1000"
        auto-height
      />
      <view class="emoji-toolbar">
        <text class="emoji-btn" @tap="toggleEmojiPanel">😊</text>
      </view>
      <view class="emoji-panel" v-if="showEmojiPanel">
        <scroll-view scroll-x class="emoji-list">
          <text v-for="(emoji, i) in emojiList" :key="i" class="emoji-item" @tap="insertEmoji(emoji)">{{ emoji }}</text>
        </scroll-view>
      </view>
    </view>
    <!-- 图片/视频展示区 -->
    <view class="media-area">
      <view class="media-grid">
        <view v-for="(item, index) in mediaList" :key="index" class="media-item">
          <image 
            v-if="item.type === 'image'"
            :src="item.url" 
            mode="aspectFill"
            class="media-img"
            @tap="previewImage(index)"
          />
          <view v-else-if="item.type === 'video'" class="video-preview-wrap">
            <video 
              :src="item.url"
              class="video-preview video-radius"
            />
            <view class="video-play-icon">▶</view>
          </view>
          <view class="delete-btn" @tap="deleteMedia(index)">×</view>
        </view>
        <!-- 添加按钮 -->
        <view class="add-btn" @tap="chooseMedia" v-if="mediaList.length < 9">
          <text class="iconfont">+</text>
        </view>
      </view>
    </view>
    <!-- 底部选项区 -->
    <view class="bottom-options">
      <view class="option-item" @tap="togglePrivacy">
        <text>谁可以看</text>
        <text class="value">{{ privacyText }}</text>
      </view>
      <view class="option-item" @tap="toggleLocation">
        <text>所在位置</text>
        <text class="value">{{ location || '添加位置' }}</text>
      </view>
      <view class="option-item">
        <text>提醒谁看</text>
        <text class="value">{{ mentionList.length ? `已选${mentionList.length}人` : '添加' }}</text>
      </view>
    </view>
    <!-- 科技感加载动画 -->
    <view class="tech-loading" v-if="loading">
      <view class="dot" v-for="i in 4" :key="i"></view>
      <text class="loading-text">发布中...</text>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 表单数据
const content = ref('')
const mediaList = ref([])
const location = ref('')
const privacyMode = ref('public')
const mentionList = ref([])
const loading = ref(false)

// 计算属性
const privacyText = computed(() => {
  const modes = {
    public: '公开',
    friends: '仅好友可见',
    private: '仅自己可见'
  }
  return modes[privacyMode.value]
})

const canPublish = computed(() => {
  return content.value.trim() || mediaList.value.length > 0
})

// 匿名头像
const anonymousAvatar = 'https://img1.imgtp.com/2023/07/10/0Qv6Qw4w.png'
// 表情列表
const emojiList = [
  '😊', '😂', '🤣', '❤️', '😍', '🤔', '😒', '👍', '👎', 
  '😳', '🥺', '😭', '😘', '🤗', '🙄', '😴', '🤮', '🤧',
  '😷', '🤒', '🤕', '😈', '👻', '👽', '🤖', '💩', '😺',
  '💪', '👊', '✌️', '🤞', '🙏', '👏', '🙌', '👐', '🤲'
]
const showEmojiPanel = ref(false)
const insertEmoji = (emoji) => {
  content.value += emoji
}
const toggleEmojiPanel = () => {
  showEmojiPanel.value = !showEmojiPanel.value
}

// 方法
const handleCancel = () => {
  uni.navigateBack()
}

const handlePublish = async () => {
  if (!canPublish.value) return
  
  loading.value = true
  try {
    uni.showLoading({
      title: '发布中...'
    })
    
    const { result } = await uniCloud.callFunction({
      name: 'wx_add_moment',
      data: {
        content: content.value,
        mediaList: mediaList.value,
        location: location.value,
        privacy: privacyMode.value
      }
    })
    
    if (result.code === 0) {
      uni.showToast({
        title: '发布成功',
        icon: 'success'
      })
      // 返回上一页并刷新列表
      uni.$emit('refreshMoments')
      setTimeout(() => {
        uni.navigateBack()
      }, 1500)
    } else {
      throw new Error(result.msg)
    }
  } catch (error) {
    uni.showToast({
      title: error.message || '发布失败',
      icon: 'none'
    })
  } finally {
    uni.hideLoading()
    loading.value = false
  }
}

const uploadImages = async (tempFilePaths) => {
  console.log('uploadImages', tempFilePaths[0])
  try {
    const tasks = tempFilePaths.map(path => {
      return new Promise((resolve, reject) => {
        // 将文件上传到云存储
        uniCloud.uploadFile({
          filePath: path,
          cloudPath: `wx-moments/${Date.now()}-${Math.random().toString(36).slice(-6)}${path.match(/\.[^.]+$/)}`,
          success: (res) => {
            resolve({
              type: 'image',
              url: res.fileID
            })
          },
          fail: reject
        })
      })
    })
    
    const results = await Promise.all(tasks)
    return results
  } catch (error) {
    console.error(error)
    uni.showToast({
      title: error.message || '图片上传失败',
      icon: 'none'
    })
    return []
  }
}

const chooseMedia = () => {
  uni.showActionSheet({
    itemList: ['拍摄', '从相册选择'],
    success: (res) => {
      if (res.tapIndex === 0) {
        // 拍摄
      } else {
        // 从相册选择
        uni.chooseImage({
          count: 9 - mediaList.value.length,
          success: async (res) => {
            uni.showLoading({
              title: '上传中...'
            })
            try {
              const newMedia = await uploadImages(res.tempFilePaths)
              mediaList.value.push(...newMedia)
            } finally {
              uni.hideLoading()
            }
          }
        })
      }
    }
  })
}

const deleteMedia = (index) => {
  mediaList.value.splice(index, 1)
}

const previewImage = (index) => {
  const urls = mediaList.value
    .filter(item => item.type === 'image')
    .map(item => item.url)
  uni.previewImage({
    urls,
    current: urls[index]
  })
}

const togglePrivacy = () => {
  uni.showActionSheet({
    itemList: ['公开', '仅好友可见', '仅自己可见'],
    success: (res) => {
      const modes = ['public', 'friends', 'private']
      privacyMode.value = modes[res.tapIndex]
    }
  })
}

const toggleLocation = () => {
  // 获取位置信息
  uni.chooseLocation({
    success: (res) => {
      location.value = res.name
    }
  })
}
</script>

<style lang="scss" scoped>
$primary-gradient: linear-gradient(90deg, #5A8FFF 0%, #7F5AFF 100%);
$card-radius: 20rpx;
$shadow: 0 8rpx 32rpx rgba(90, 143, 255, 0.08);
$background-color: #f7f9fb;
$action-color: #5A8FFF;
.publish-container {
  min-height: 100vh;
  background: $background-color;
  animation: slideUp 0.3s ease-out;
}
.gradient-bar {
  background: $primary-gradient;
  color: #fff;
  box-shadow: 0 2rpx 12rpx #5A8FFF22;
}
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 32rpx;
  border-bottom: 1rpx solid #eee;
  position: relative;
  .cancel {
    font-size: 32rpx;
    color: #fff;
    font-weight: 500;
    letter-spacing: 2rpx;
    padding: 0 12rpx;
    background: transparent;
    border-radius: 24rpx;
    transition: background 0.2s;
    &:active { background: #e0e6f6; color: #7F5AFF; }
  }
  .publish-btn-wrap {
    flex: none;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .publish {
      position: relative;
      font-size: 36rpx;
      font-weight: 700;
      color: #fff;
      background: $primary-gradient;
      border-radius: 40rpx;
      padding: 0 48rpx;
      height: 80rpx;
      line-height: 80rpx;
      box-shadow: 0 4rpx 16rpx #5A8FFF44;
      margin-left: 24rpx;
      letter-spacing: 4rpx;
      overflow: hidden;
      transition: all 0.2s;
      z-index: 2;
      .publish-btn-glow {
        position: absolute;
        left: 50%; top: 50%;
        width: 180rpx; height: 80rpx;
        background: $primary-gradient;
        border-radius: 40rpx;
        opacity: 0.18;
        transform: translate(-50%, -50%);
        animation: breathe 2s infinite;
        z-index: -1;
      }
      &.active {
        background: $primary-gradient;
        color: #fff;
        box-shadow: 0 6rpx 24rpx #7F5AFF55;
      }
      &:active {
        transform: scale(0.97);
        box-shadow: 0 2rpx 8rpx #7F5AFF44;
      }
    }
  }
}
@keyframes breathe {
  0% { transform: scale(1); opacity: 0.25; }
  50% { transform: scale(1.5); opacity: 0; }
  100% { transform: scale(1); opacity: 0.25; }
}
.anon-header {
  display: flex;
  align-items: center;
  margin: 32rpx 0 0 32rpx;
  .anon-avatar {
    width: 80rpx; height: 80rpx;
    border-radius: 50%;
    box-shadow: 0 0 16rpx #5A8FFF, 0 0 32rpx #7F5AFF;
    background: #fff;
    border: 2rpx solid #fff;
  }
  .anon-nickname {
    margin-left: 24rpx;
    font-size: 32rpx;
    color: #5A8FFF;
    font-weight: 600;
    letter-spacing: 2rpx;
  }
}
.content-area {
  margin: 32rpx 32rpx 0 32rpx;
  background: #fff;
  border-radius: $card-radius;
  box-shadow: $shadow;
  padding: 24rpx;
  position: relative;
  .content-input {
    width: 100%;
    min-height: 120rpx;
    font-size: 30rpx;
    color: #222;
    background: transparent;
    border: none;
    outline: none;
    resize: none;
    margin-bottom: 12rpx;
  }
  .emoji-toolbar {
    display: flex;
    align-items: center;
    margin-top: 8rpx;
    .emoji-btn {
      font-size: 40rpx;
      color: #7F5AFF;
      cursor: pointer;
      &:active { opacity: 0.7; }
    }
  }
  .emoji-panel {
    margin-top: 8rpx;
    background: #f4f7ff;
    border-radius: 12rpx;
    padding: 8rpx 0;
    .emoji-list {
      display: flex;
      flex-direction: row;
      gap: 8rpx;
      padding: 0 8rpx;
      .emoji-item {
        font-size: 36rpx;
        padding: 8rpx;
        border-radius: 8rpx;
        &:active { background: #e0e6f6; }
      }
    }
  }
}
.media-area {
  margin: 32rpx 32rpx 0 32rpx;
  .media-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16rpx;
    .media-item {
      position: relative;
      .media-img {
        width: 100%; height: 180rpx;
        border-radius: 16rpx;
        object-fit: cover;
        box-shadow: 0 2rpx 8rpx #5A8FFF22;
      }
      .video-preview-wrap {
        position: relative;
        .video-preview {
          width: 100%; height: 180rpx;
          border-radius: 16rpx;
          object-fit: cover;
        }
        .video-play-icon {
          position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          font-size: 48rpx;
          color: #fff;
          text-shadow: 0 2rpx 8rpx #5A8FFF;
          pointer-events: none;
        }
      }
      .delete-btn {
        position: absolute;
        top: 8rpx; right: 8rpx;
        width: 36rpx; height: 36rpx;
        background: #fff;
        color: #7F5AFF;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32rpx;
        box-shadow: 0 2rpx 8rpx #5A8FFF22;
        z-index: 2;
        &:active { background: #e0e6f6; }
      }
    }
    .add-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%; height: 180rpx;
      background: #f4f7ff;
      border-radius: 16rpx;
      color: #7F5AFF;
      font-size: 48rpx;
      cursor: pointer;
      box-shadow: 0 2rpx 8rpx #5A8FFF22;
      &:active { background: #e0e6f6; }
    }
  }
}
.bottom-options {
  margin: 32rpx 32rpx 0 32rpx;
  .option-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    border-radius: 16rpx;
    box-shadow: 0 2rpx 8rpx #5A8FFF11;
    padding: 24rpx 32rpx;
    font-size: 28rpx;
    color: #666;
    margin-bottom: 16rpx;
    .value {
      color: #5A8FFF;
      font-weight: 500;
    }
  }
}
.tech-loading {
  position: fixed;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 999;
  background: rgba(255,255,255,0.96);
  padding: 40rpx;
  border-radius: 20rpx;
  backdrop-filter: blur(10px);
  .dot {
    width: 20rpx; height: 20rpx;
    background: $primary-gradient;
    border-radius: 50%;
    margin: 0 8rpx;
    animation: techDot 1s infinite alternate;
    display: inline-block;
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
    &:nth-child(4) { animation-delay: 0.6s; }
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
  0% { opacity: 0.5; transform: scale(1); }
  100% { opacity: 1; transform: scale(1.5); }
}
@keyframes textPulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
@keyframes slideUp {
  from { transform: translateY(30rpx); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>
