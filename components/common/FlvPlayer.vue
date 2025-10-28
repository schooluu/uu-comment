<template>
  <view class="flv-player-container">
    <video 
      v-if="useNativePlayer"
      :src="src" 
      :autoplay="autoplay"
      :muted="muted"
      :controls="controls"
      class="flv-video"
      @error="handleError"
      @play="handlePlay"
    />
    <!-- #ifdef H5 -->
    <view v-else class="flv-video-wrapper">
      <video 
        id="flvVideo"
        class="flv-video"
        :controls="controls"
        :muted="muted"
        :autoplay="autoplay"
        webkit-playsinline="true"
        playsinline="true"
        x5-playsinline="true"
        preload="auto"
      />
      <view v-if="error" class="error-overlay">
        <text class="error-icon">⚠️</text>
        <text class="error-text">{{ error }}</text>
        <button class="retry-btn" @tap="retry">重试</button>
      </view>
      <view v-if="loading" class="loading-overlay">
        <text class="loading-icon">⏳</text>
        <text class="loading-text">加载中...</text>
      </view>
    </view>
    <!-- #endif -->
  </view>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import flvjs from 'flv.js'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  muted: {
    type: Boolean,
    default: false
  },
  controls: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['error', 'play'])

const flvPlayer = ref(null)
const error = ref('')
const loading = ref(false)
const useNativePlayer = ref(false)

// 判断是否为 FLV 格式
const isFlv = (url) => {
  return url && (url.includes('.flv') || url.includes('flv'))
}

// 初始化 FLV 播放器
const initFlvPlayer = () => {
  // #ifdef H5
  loading.value = true
  error.value = ''
  
  // 检查是否支持 flv.js
  if (!flvjs.isSupported()) {
    error.value = '当前浏览器不支持 FLV 播放'
    useNativePlayer.value = true
    loading.value = false
    emit('error', new Error('FLV not supported'))
    return
  }

  // 如果不是 FLV 格式，使用原生播放器
  if (!isFlv(props.src)) {
    useNativePlayer.value = true
    loading.value = false
    return
  }

  try {
   
    // uni-app 的 video 组件会被编译成 uni-video，需要找到内部的真实 video 元素
    let uniVideoEl = document.getElementById('flvVideo')
    
    if (!uniVideoEl) {
      uniVideoEl = document.querySelector('#flvVideo')
    }
    
    // 查找 uni-video 内部的真实 video 元素
    let realVideoEl = null
    
    // 方法1: 查找 uni-video 的子元素中的 video 标签
    if (uniVideoEl) {
      realVideoEl = uniVideoEl.querySelector('video')
     
    }
    
    // 方法2: 查找 Shadow DOM 中的 video（如果使用了 Shadow DOM）
    if (!realVideoEl && uniVideoEl && uniVideoEl.shadowRoot) {
      realVideoEl = uniVideoEl.shadowRoot.querySelector('video')
      
    }
    
    // 方法3: 直接查找页面上的所有原生 video 标签
    if (!realVideoEl) {
      const allVideos = document.querySelectorAll('video')
      console.log('页面上所有 video 元素:', allVideos)
      if (allVideos && allVideos.length > 0) {
        // 找到最后一个，因为它最可能是我们刚创建的
        realVideoEl = allVideos[allVideos.length - 1]
        console.log('使用页面上的 video 元素:', realVideoEl)
      }
    }
    
    // 方法4: 如果还找不到，创建一个原生 video 元素并替换
    if (!realVideoEl || realVideoEl.tagName !== 'VIDEO') {
      console.warn('未找到原生 video 元素，尝试创建一个')
      
      if (uniVideoEl) {
        // 创建原生 video 元素
        realVideoEl = document.createElement('video')
        realVideoEl.id = 'flvVideoNative'
        realVideoEl.className = 'flv-video'
        realVideoEl.controls = props.controls
        realVideoEl.muted = props.muted
        realVideoEl.autoplay = props.autoplay
        realVideoEl.setAttribute('webkit-playsinline', 'true')
        realVideoEl.setAttribute('playsinline', 'true')
        realVideoEl.setAttribute('x5-playsinline', 'true')
        realVideoEl.setAttribute('preload', 'auto')
        realVideoEl.style.width = '100%'
        realVideoEl.style.height = '420px'
        realVideoEl.style.backgroundColor = '#000'
        
        // 将原生 video 插入到 uni-video 内部或替换它
        if (uniVideoEl.firstChild) {
          uniVideoEl.insertBefore(realVideoEl, uniVideoEl.firstChild)
        } else {
          uniVideoEl.appendChild(realVideoEl)
        }
        
        console.log('✓ 已创建并插入原生 video 元素:', realVideoEl)
      } else {
        error.value = '无法初始化播放器'
        loading.value = false
        console.error('未找到 uni-video 容器')
        emit('error', new Error('无法初始化播放器'))
        return
      }
    }
    
    console.log('✓ 找到原生 Video 元素')
    console.log('Video 元素:', realVideoEl)
    console.log('Video 元素标签名:', realVideoEl.tagName)

    flvPlayer.value = flvjs.createPlayer({
      type: 'flv',
      url: props.src,
      isLive: true,
      hasAudio: true,
      hasVideo: true,
      cors: true
    }, {
      enableWorker: true,
      enableStashBuffer: false,
      stashInitialSize: 128,
      autoCleanupSourceBuffer: true,
      lazyLoad: false,
      lazyLoadMaxDuration: 3 * 60,
      seekType: 'range'
    })

    // 使用真实的 DOM 元素附加到播放器
    flvPlayer.value.attachMediaElement(realVideoEl)
    flvPlayer.value.load()
    
    console.log('FLV 播放器初始化成功，开始加载流')
    
    // 监听加载完成
    realVideoEl.addEventListener('loadeddata', () => {
      loading.value = false
      console.log('视频数据已加载')
    })
    
    // 监听播放开始
    realVideoEl.addEventListener('playing', () => {
      loading.value = false
      console.log('视频正在播放')
      emit('play')
    })

    if (props.autoplay) {
      // 延迟自动播放，确保元素已准备好
      setTimeout(() => {
        console.log('尝试自动播放')
        console.log('Video 元素类型:', realVideoEl)
        console.log('是否有 play 方法:', typeof realVideoEl?.play)
        
        if (realVideoEl && typeof realVideoEl.play === 'function') {
          // 使用原生 video 元素的 play 方法
          try {
            const playPromise = realVideoEl.play()
            
            if (playPromise !== undefined) {
              playPromise.then(() => {
                loading.value = false
                console.log('FLV 直播开始播放')
              }).catch(err => {
                console.error('自动播放失败:', err)
                // 如果自动播放失败，尝试静音播放
                realVideoEl.muted = true
                const retryPlay = realVideoEl.play()
                if (retryPlay !== undefined) {
                  retryPlay.then(() => {
                    loading.value = false
                    console.log('静音模式播放成功')
                  }).catch(e => {
                    console.error('静音播放也失败:', e)
                    loading.value = false
                  })
                } else {
                  loading.value = false
                }
              })
            } else {
              loading.value = false
            }
          } catch (e) {
            console.error('调用 play 方法失败:', e)
            loading.value = false
          }
        } else {
          console.warn('无法找到有效的 video 元素或 play 方法，视频可能需要手动播放')
          console.warn('realVideoEl 类型:', typeof realVideoEl, realVideoEl)
          loading.value = false
          // 设置 video 的 autoplay 属性
          if (realVideoEl) {
            try {
              realVideoEl.autoplay = true
              realVideoEl.setAttribute('autoplay', 'true')
              console.log('已设置 autoplay 属性')
            } catch (e) {
              console.error('设置 autoplay 属性失败:', e)
            }
          }
        }
      }, 500)
    } else {
      loading.value = false
    }

    // 监听 FLV 播放器事件
    flvPlayer.value.on(flvjs.Events.ERROR, (errorType, errorDetail, errorInfo) => {
      console.error('FLV 播放错误:')
      console.error('- 错误类型:', errorType)
      console.error('- 错误详情:', errorDetail)
      console.error('- 错误信息:', errorInfo)
      
      let errorMsg = '播放错误'
      if (errorType === 'NetworkError') {
        errorMsg = '网络错误，无法加载直播流'
      } else if (errorType === 'MediaError') {
        errorMsg = '媒体错误，直播流格式可能不支持'
      } else if (errorType === 'OtherError') {
        errorMsg = '未知错误，请重试'
      }
      
      error.value = errorMsg
      loading.value = false
      emit('error', { errorType, errorDetail, errorInfo })
    })
    
    // 监听统计信息
    flvPlayer.value.on(flvjs.Events.STATISTICS_INFO, (stats) => {
      
    })
    
    // 监听视频错误
    realVideoEl.addEventListener('error', (e) => {
      console.error('Video 元素错误:', e)
      error.value = 'Video 播放错误'
      loading.value = false
    })

  } catch (err) {
    console.error('FLV 播放器初始化失败:', err)
    error.value = err.message || '播放器初始化失败'
    loading.value = false
    emit('error', err)
  }
  // #endif
}

// 销毁播放器
const destroyPlayer = () => {
  // #ifdef H5
  if (flvPlayer.value) {
    try {
      // 先获取 video 元素并暂停
      const videoEl = document.getElementById('flvVideo')
      if (videoEl && !videoEl.paused) {
        videoEl.pause()
      }
      
      // 卸载资源
      if (flvPlayer.value.unload && typeof flvPlayer.value.unload === 'function') {
        flvPlayer.value.unload()
      }
      
      // 分离媒体元素
      if (flvPlayer.value.detachMediaElement && typeof flvPlayer.value.detachMediaElement === 'function') {
        flvPlayer.value.detachMediaElement()
      }
      
      // 销毁播放器
      if (flvPlayer.value.destroy && typeof flvPlayer.value.destroy === 'function') {
        flvPlayer.value.destroy()
      }
      
      console.log('FLV 播放器已销毁')
    } catch (err) {
      console.error('销毁播放器时出错:', err)
    } finally {
      flvPlayer.value = null
    }
  }
  // #endif
}

// 重试
const retry = () => {
  error.value = ''
  destroyPlayer()
  initFlvPlayer()
}

// 处理错误
const handleError = (e) => {
  error.value = '播放失败'
  emit('error', e)
}

// 处理播放
const handlePlay = () => {
  emit('play')
}

// 监听 src 变化
watch(() => props.src, (newSrc, oldSrc) => {
  if (newSrc !== oldSrc) {
    destroyPlayer()
    error.value = ''
    
    // #ifdef H5
    if (newSrc) {
      // 延迟初始化，确保销毁完成
      setTimeout(() => {
        if (isFlv(newSrc)) {
          useNativePlayer.value = false
          initFlvPlayer()
        } else {
          useNativePlayer.value = true
        }
      }, 300)
    }
    // #endif
    
    // #ifndef H5
    useNativePlayer.value = true
    // #endif
  }
})

onMounted(() => {
  // #ifdef H5
  // H5 环境才使用 flv.js
  if (isFlv(props.src)) {
    // 延迟初始化，确保 DOM 已经渲染
    setTimeout(() => {
      initFlvPlayer()
    }, 500)
  } else {
    useNativePlayer.value = true
  }
  // #endif
  
  // #ifndef H5
  // 非 H5 环境使用原生播放器
  useNativePlayer.value = true
  // #endif
})

onBeforeUnmount(() => {
  destroyPlayer()
})
</script>

<style lang="scss" scoped>
.flv-player-container {
  width: 100%;
  position: relative;
  background: #000;
}

.flv-video-wrapper {
  position: relative;
  width: 100%;
  height: 420rpx;
}

.flv-video {
  width: 100%;
  height: 420rpx;
  display: block;
  background: #000;
}

.error-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  gap: 20rpx;
  padding: 40rpx;
  z-index: 10;

  .error-icon {
    font-size: 60rpx;
  }

  .error-text {
    font-size: 24rpx;
    color: #fff;
    text-align: center;
    line-height: 1.5;
  }

  .retry-btn {
    margin-top: 20rpx;
    padding: 12rpx 32rpx;
    background: #ff5722;
    color: #fff;
    border: none;
    border-radius: 30rpx;
    font-size: 24rpx;
  }
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  gap: 20rpx;
  z-index: 5;

  .loading-icon {
    font-size: 60rpx;
    animation: spin 1.5s linear infinite;
  }

  .loading-text {
    font-size: 24rpx;
    color: #fff;
    text-align: center;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

