<template>
  <view class="publish-container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <text class="cancel" @tap="handleCancel">取消</text>
      <text class="publish" :class="{ active: canPublish }" @tap="handlePublish">发表</text>
    </view>

    <!-- 内容输入区 -->
    <view class="content-area">
      <textarea
        class="content-input"
        v-model="content"
        placeholder="这一刻的想法..."
        placeholder-style="color: #999;"
        maxlength="1000"
        auto-height
      />
    </view>

    <!-- 图片/视频展示区 -->
    <view class="media-area">
      <view class="media-grid">
        <view v-for="(item, index) in mediaList" :key="index" class="media-item">
          <image 
            v-if="item.type === 'image'"
            :src="item.url" 
            mode="aspectFill"
            @tap="previewImage(index)"
          />
          <video 
            v-else-if="item.type === 'video'"
            :src="item.url"
            class="video-preview"
          />
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

// 方法
const handleCancel = () => {
  uni.navigateBack()
}

const handlePublish = async () => {
  if (!canPublish.value) return
  
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
.publish-container {
  min-height: 100vh;
  background-color: #fff;
  animation: slideUp 0.3s ease-out;
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 32rpx;
  border-bottom: 1rpx solid #eee;
  
  .cancel {
    font-size: 32rpx;
    color: #333;
  }
  
  .publish {
    font-size: 32rpx;
    color: #999;
    
    &.active {
      color: #07c160;
    }
  }
  
  .cancel, .publish {
    transition: all 0.2s ease;
    
    &:active {
      opacity: 0.6;
      transform: scale(0.95);
    }
  }
  
  .publish.active {
    color: #07c160;
    animation: bounce 0.3s ease;
  }
}

.content-area {
  padding: 32rpx;
  
  .content-input {
    width: 100%;
    min-height: 200rpx;
    font-size: 32rpx;
    line-height: 1.5;
  }
}

.media-area {
  padding: 0 32rpx;
  
  .media-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16rpx;
  }
  
  .media-item {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    
    image, video {
      width: 100%;
      height: 100%;
      border-radius: 8rpx;
    }
    
    .delete-btn {
      position: absolute;
      top: -20rpx;
      right: -20rpx;
      width: 40rpx;
      height: 40rpx;
      line-height: 40rpx;
      text-align: center;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      border-radius: 50%;
      font-size: 32rpx;
    }
  }
  
  .add-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    aspect-ratio: 1;
    background: #f7f7f7;
    border-radius: 8rpx;
    
    .iconfont {
      font-size: 60rpx;
      color: #999;
    }
  }
  
  .media-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16rpx;
    
    .media-item, .add-btn {
      opacity: 0;
      animation: gridItemIn 0.3s ease-out forwards;
      
      @for $i from 1 through 9 {
        &:nth-child(#{$i}) {
          animation-delay: $i * 0.05s;
        }
      }
    }
  }
  
  @keyframes gridItemIn {
    from {
      opacity: 0;
      transform: translateY(20rpx);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

.bottom-options {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  border-top: 1rpx solid #eee;
  animation: slideUpBottom 0.3s ease-out;
  
  .option-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32rpx;
    font-size: 28rpx;
    border-bottom: 1rpx solid #eee;
    transition: background-color 0.2s ease;
    
    &:last-child {
      border-bottom: none;
    }
    
    .value {
      color: #999;
    }
    
    &:active {
      background-color: #f5f5f5;
    }
    
    &:active .value {
      transform: translateX(-6rpx);
    }
  }
}

@keyframes slideUpBottom {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes bounce {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.content-input {
  transition: all 0.3s ease;
  
  &:focus {
    background: #f8f8f8;
    padding: 20rpx;
    border-radius: 12rpx;
  }
}
</style>
