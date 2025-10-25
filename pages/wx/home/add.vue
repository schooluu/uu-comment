<template>
  <view class="publish-container">
    <!-- 顶部渐变导航栏 -->
    <view class="nav-bar gradient-bar">
      <view class="nav-left">
        <text class="cancel" @tap="handleCancel">
          <text class="cancel-icon">✕</text>
          取消
        </text>
      </view>
      <view class="nav-center">
        <text class="nav-title">发布动态</text>
      </view>
      <view class="nav-right">
        <text class="publish" :class="{ active: canPublish }" @tap="handlePublish">
          发表
        </text>
      </view>
    </view>
    <!-- 内容输入区 -->
    <view class="content-area">
      <view class="input-header">
        <text class="input-label">分享你的想法</text>
        <text class="char-count">{{ content.length }}/1000</text>
      </view>
      <textarea
        class="content-input"
        v-model="content"
        placeholder="这一刻的想法...支持表情😊"
        placeholder-style="color: #a0aec0;"
        maxlength="1000"
        auto-height
      />
      <view class="input-footer">
        <view class="emoji-toolbar">
          <text class="emoji-btn" @tap="toggleEmojiPanel">
            <text class="emoji-icon">😊</text>
            表情
          </text>
        </view>
        <view class="input-actions">
          <text class="word-count" :class="{ warning: content.length > 800 }">
            {{ content.length }}
          </text>
        </view>
      </view>
      <view class="emoji-panel" v-if="showEmojiPanel">
        <view class="emoji-header">
          <text class="emoji-title">选择表情</text>
          <text class="emoji-close" @tap="toggleEmojiPanel">✕</text>
        </view>
        <scroll-view scroll-x class="emoji-list">
          <text v-for="(emoji, i) in emojiList" :key="i" class="emoji-item" @tap="insertEmoji(emoji)">{{ emoji }}</text>
        </scroll-view>
      </view>
    </view>
    <!-- 图片/视频展示区 -->
    <view class="media-area" v-if="mediaList.length > 0 || true">
      <view class="media-header">
        <text class="media-title">媒体内容</text>
        <text class="media-count">{{ mediaList.length }}/9</text>
      </view>
      <view class="media-grid">
        <view v-for="(item, index) in mediaList" :key="index" class="media-item">
          <view class="media-wrapper">
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
                class="video-preview"
              />
              <view class="video-overlay">
                <text class="video-play-icon">▶</text>
                <text class="video-duration">00:30</text>
              </view>
            </view>
            <view class="media-actions">
              <text class="delete-btn" @tap="deleteMedia(index)">✕</text>
            </view>
          </view>
        </view>
        <!-- 添加按钮 -->
        <view class="add-btn" @tap="chooseMedia" v-if="mediaList.length < 9">
          <view class="add-icon">+</view>
          <text class="add-text">添加</text>
        </view>
      </view>
    </view>
    <!-- 底部选项区 -->
    <view class="bottom-options">
      <view class="options-header">
        <text class="options-title">发布设置</text>
      </view>
      <view class="option-item" @tap="togglePrivacy">
        <view class="option-left">
          <text class="option-icon">👁️</text>
          <text class="option-label">谁可以看</text>
        </view>
        <view class="option-right">
          <text class="option-value">{{ privacyText }}</text>
          <text class="option-arrow">›</text>
        </view>
      </view>
      <view class="option-item" @tap="toggleLocation">
        <view class="option-left">
          <text class="option-icon">📍</text>
          <text class="option-label">所在位置</text>
        </view>
        <view class="option-right">
          <text class="option-value">{{ location || '添加位置' }}</text>
          <text class="option-arrow">›</text>
        </view>
      </view>
      <view class="option-item">
        <view class="option-left">
          <text class="option-icon">@</text>
          <text class="option-label">提醒谁看</text>
        </view>
        <view class="option-right">
          <text class="option-value">{{ mentionList.length ? `已选${mentionList.length}人` : '添加' }}</text>
          <text class="option-arrow">›</text>
        </view>
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
// 设计系统变量
$primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
$secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
$success-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
$card-radius: 24rpx;
$button-radius: 32rpx;
$shadow-light: 0 4rpx 20rpx rgba(102, 126, 234, 0.15);
$shadow-medium: 0 8rpx 32rpx rgba(102, 126, 234, 0.2);
$shadow-heavy: 0 12rpx 48rpx rgba(102, 126, 234, 0.25);
$background-color: #f8fafc;
$surface-color: #ffffff;
$text-primary: #1a202c;
$text-secondary: #4a5568;
$text-muted: #718096;
$border-color: #e2e8f0;
$action-color: #667eea;
$success-color: #48bb78;
$warning-color: #ed8936;
$error-color: #f56565;

// 间距系统
$space-xs: 8rpx;
$space-sm: 16rpx;
$space-md: 24rpx;
$space-lg: 32rpx;
$space-xl: 48rpx;
$space-2xl: 64rpx;

// 字体系统
$font-xs: 24rpx;
$font-sm: 28rpx;
$font-base: 32rpx;
$font-lg: 36rpx;
$font-xl: 40rpx;
$font-2xl: 48rpx;

// 动画系统
$transition-fast: 0.15s ease-out;
$transition-base: 0.2s ease-out;
$transition-slow: 0.3s ease-out;
$bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
$smooth: cubic-bezier(0.4, 0, 0.2, 1);
.publish-container {
  min-height: 100vh;
  background: $background-color;
  animation: slideUp $transition-slow $smooth;
  position: relative;
  
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 200rpx;
    background: $primary-gradient;
    opacity: 0.05;
    z-index: 0;
  }
}
.gradient-bar {
  background: $primary-gradient;
  color: #fff;
  box-shadow: $shadow-light;
  backdrop-filter: blur(20rpx);
  -webkit-backdrop-filter: blur(20rpx);
}
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $space-md $space-lg;
  position: relative;
  z-index: 10;
  
  .nav-left,
  .nav-center,
  .nav-right {
    flex: 1;
    display: flex;
    align-items: center;
  }
  
  .nav-center {
    justify-content: center;
  }
  
  .nav-right {
    justify-content: flex-end;
  }
  
  .nav-title {
    font-size: $font-lg;
    color: rgba(255, 255, 255, 0.95);
    font-weight: 600;
    letter-spacing: 1rpx;
  }
  
  .cancel {
    display: flex;
    align-items: center;
    font-size: $font-sm;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
    padding: $space-xs $space-sm;
    background: rgba(255, 255, 255, 0.1);
    border-radius: $button-radius;
    transition: all $transition-base;
    backdrop-filter: blur(10rpx);
    
    .cancel-icon {
      margin-right: $space-xs;
      font-size: $font-sm;
    }
    
    &:active {
      background: rgba(255, 255, 255, 0.2);
      transform: scale(0.95);
    }
  }
  .publish {
    position: relative;
    font-size: $font-base;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.7);
    background: rgba(255, 255, 255, 0.1);
    border-radius: $button-radius;
    padding: $space-sm $space-lg;
    letter-spacing: 1rpx;
    transition: all $transition-base;
    backdrop-filter: blur(10rpx);
    border: 1rpx solid rgba(255, 255, 255, 0.2);
    
    &.active {
      color: #fff;
      background: $success-gradient;
      box-shadow: $shadow-medium;
      border-color: transparent;
      transform: translateY(-1rpx);
    }
    
    &:active {
      transform: scale(0.95);
    }
  }
}
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
  margin: $space-lg;
  background: $surface-color;
  border-radius: $card-radius;
  box-shadow: $shadow-light;
  padding: 0;
  position: relative;
  border: 1rpx solid $border-color;
  transition: all $transition-base;
  overflow: hidden;
  
  &:focus-within {
    box-shadow: $shadow-medium;
    border-color: $action-color;
    transform: translateY(-2rpx);
  }
  
  .input-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $space-md $space-lg $space-sm;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    border-bottom: 1rpx solid $border-color;
    
    .input-label {
      font-size: $font-sm;
      color: $text-secondary;
      font-weight: 600;
    }
    
    .char-count {
      font-size: $font-xs;
      color: $text-muted;
      
      &.warning {
        color: $warning-color;
      }
    }
  }
  
  .content-input {
    width: 100%;
    min-height: 200rpx;
    font-size: $font-base;
    color: $text-primary;
    background: transparent;
    border: none;
    outline: none;
    resize: none;
    padding: $space-lg;
    line-height: 1.6;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  }
  
  .input-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $space-sm $space-lg;
    background: #fafbfc;
    border-top: 1rpx solid $border-color;
    
    .input-actions {
      display: flex;
      align-items: center;
      
      .word-count {
        font-size: $font-xs;
        color: $text-muted;
        padding: $space-xs $space-sm;
        background: rgba(102, 126, 234, 0.1);
        border-radius: 12rpx;
        
        &.warning {
          background: rgba(237, 137, 54, 0.1);
          color: $warning-color;
        }
      }
    }
  }
  .emoji-toolbar {
    display: flex;
    align-items: center;
    
    .emoji-btn {
      display: flex;
      align-items: center;
      font-size: $font-sm;
      color: $action-color;
      padding: $space-xs $space-sm;
      border-radius: 16rpx;
      background: rgba(102, 126, 234, 0.1);
      transition: all $transition-fast;
      
      .emoji-icon {
        margin-right: $space-xs;
        font-size: $font-base;
      }
      
      &:active {
        background: rgba(102, 126, 234, 0.2);
        transform: scale(0.95);
      }
    }
  }
  .emoji-panel {
    background: $surface-color;
    border-top: 1rpx solid $border-color;
    animation: slideDown $transition-base $smooth;
    
    .emoji-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: $space-md $space-lg;
      background: #fafbfc;
      border-bottom: 1rpx solid $border-color;
      
      .emoji-title {
        font-size: $font-sm;
        color: $text-secondary;
        font-weight: 600;
      }
      
      .emoji-close {
        font-size: $font-base;
        color: $text-muted;
        padding: $space-xs;
        border-radius: 50%;
        transition: all $transition-fast;
        
        &:active {
          background: rgba(0, 0, 0, 0.1);
          transform: scale(0.9);
        }
      }
    }
    
    .emoji-list {
      height: 300rpx;
      padding: $space-md;
      
      .emoji-item {
        display: inline-block;
        font-size: $font-xl;
        padding: $space-sm;
        margin: $space-xs;
        border-radius: 12rpx;
        transition: all $transition-fast;
        
        &:active {
          background: rgba(102, 126, 234, 0.15);
          transform: scale(0.9);
        }
      }
    }
  }
}
.media-area {
  margin: $space-lg;
  
  .media-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $space-md;
    
    .media-title {
      font-size: $font-base;
      color: $text-secondary;
      font-weight: 600;
    }
    
    .media-count {
      font-size: $font-xs;
      color: $text-muted;
      padding: $space-xs $space-sm;
      background: rgba(102, 126, 234, 0.1);
      border-radius: 12rpx;
    }
  }
  
  .media-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $space-sm;
    
    .media-item {
      position: relative;
      
      .media-wrapper {
        position: relative;
        border-radius: $card-radius;
        overflow: hidden;
        transition: all $transition-base;
        
        &:active {
          transform: scale(0.95);
        }
      }
      
      .media-img {
        width: 100%;
        height: 200rpx;
        object-fit: cover;
        transition: all $transition-base;
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
      .video-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.3);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
        .video-play-icon {
          font-size: $font-2xl;
          color: #fff;
          margin-bottom: $space-sm;
        }
        
        .video-duration {
          font-size: $font-xs;
          color: #fff;
          background: rgba(0, 0, 0, 0.5);
          padding: $space-xs $space-sm;
          border-radius: 8rpx;
        }
      }
      
      .media-actions {
        position: absolute;
        top: $space-xs;
        right: $space-xs;
        
        .delete-btn {
          width: 40rpx;
          height: 40rpx;
          background: rgba(0, 0, 0, 0.7);
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: $font-sm;
          font-weight: bold;
          backdrop-filter: blur(10rpx);
          transition: all $transition-base;
          
          &:active {
            background: $error-color;
            transform: scale(0.9);
          }
        }
      }
    }
    .add-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 200rpx;
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      border-radius: $card-radius;
      border: 2rpx dashed $border-color;
      transition: all $transition-base;
      position: relative;
      overflow: hidden;
      
      .add-icon {
        font-size: $font-2xl;
        color: $action-color;
        margin-bottom: $space-xs;
        font-weight: 300;
      }
      
      .add-text {
        font-size: $font-xs;
        color: $text-muted;
        font-weight: 500;
      }
      
      &:active {
        transform: scale(0.95);
        border-color: $action-color;
        background: rgba(102, 126, 234, 0.05);
        
        .add-icon {
          color: darken($action-color, 10%);
        }
      }
    }
  }
}
.bottom-options {
  margin: $space-lg;
  background: $surface-color;
  border-radius: $card-radius;
  box-shadow: $shadow-light;
  border: 1rpx solid $border-color;
  overflow: hidden;
  
  .options-header {
    padding: $space-md $space-lg;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    border-bottom: 1rpx solid $border-color;
    
    .options-title {
      font-size: $font-base;
      color: $text-secondary;
      font-weight: 600;
    }
  }
  
  .option-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $space-lg;
    border-bottom: 1rpx solid $border-color;
    transition: all $transition-base;
    position: relative;
    
    &:last-child {
      border-bottom: none;
    }
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 4rpx;
      height: 100%;
      background: $primary-gradient;
      transform: scaleY(0);
      transition: transform $transition-base;
    }
    
    &:active {
      background: rgba(102, 126, 234, 0.05);
      
      &::before {
        transform: scaleY(1);
      }
    }
    
    .option-left {
      display: flex;
      align-items: center;
      
      .option-icon {
        font-size: $font-base;
        margin-right: $space-sm;
        width: 32rpx;
        text-align: center;
      }
      
      .option-label {
        font-size: $font-sm;
        color: $text-secondary;
        font-weight: 500;
      }
    }
    
    .option-right {
      display: flex;
      align-items: center;
      
      .option-value {
        color: $action-color;
        font-weight: 600;
        font-size: $font-sm;
        margin-right: $space-xs;
      }
      
      .option-arrow {
        font-size: $font-lg;
        color: $text-muted;
        transform: rotate(0deg);
        transition: transform $transition-base;
      }
    }
  }
}
.tech-loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 9999;
  background: rgba(255, 255, 255, 0.95);
  padding: $space-2xl;
  border-radius: $card-radius;
  backdrop-filter: blur(20rpx);
  box-shadow: $shadow-heavy;
  border: 1rpx solid rgba(255, 255, 255, 0.8);
  
  .dot {
    width: 16rpx;
    height: 16rpx;
    background: $primary-gradient;
    border-radius: 50%;
    margin: 0 $space-xs;
    animation: techDot 1.2s infinite ease-in-out;
    display: inline-block;
    
    &:nth-child(1) { animation-delay: 0s; }
    &:nth-child(2) { animation-delay: 0.15s; }
    &:nth-child(3) { animation-delay: 0.3s; }
    &:nth-child(4) { animation-delay: 0.45s; }
  }
  
  .loading-text {
    margin-top: $space-lg;
    font-size: $font-sm;
    color: $text-secondary;
    letter-spacing: 1rpx;
    font-weight: 500;
    animation: textPulse 2s ease-in-out infinite;
  }
}
@keyframes techDot {
  0%, 80%, 100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  40% {
    opacity: 1;
    transform: scale(1.2);
  }
}
@keyframes textPulse {
  0%, 100% {
    opacity: 0.7;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.02);
  }
}
@keyframes slideUp {
  from {
    transform: translateY(40rpx);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

// 响应式设计
@media screen and (max-width: 750rpx) {
  .media-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: $space-sm !important;
  }
  
  .content-area,
  .media-area,
  .bottom-options {
    margin: $space-md !important;
  }
  
  .nav-bar {
    padding: $space-sm $space-md !important;
  }
  
  .nav-title {
    font-size: $font-base !important;
  }
}

// 暗色模式支持
@media (prefers-color-scheme: dark) {
  .publish-container {
    background: #0f172a;
    
    &::before {
      opacity: 0.1;
    }
  }
  
  .content-area {
    background: #1e293b;
    border-color: #334155;
    color: #f1f5f9;
  }
  
  .bottom-options .option-item {
    background: #1e293b;
    border-color: #334155;
    color: #cbd5e1;
  }
}
</style>
