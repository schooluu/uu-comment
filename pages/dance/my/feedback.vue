<template>
  <view class="container">
    <view class="header">
      <text class="title">意见反馈</text>
    </view>
    
    <!-- 反馈类型选择 -->
    <view class="type-section">
      <text class="section-title">反馈类型</text>
      <view class="type-grid">
        <view 
          class="type-item" 
          v-for="type in feedbackTypes" 
          :key="type.id"
          :class="{ active: selectedType === type.id }"
          @tap="selectType(type.id)"
        >
          {{ type.name }}
        </view>
      </view>
    </view>
    
    <!-- 反馈内容 -->
    <view class="content-section">
      <text class="section-title">反馈内容</text>
      <textarea 
        class="content-input"
        v-model="content"
        placeholder="请详细描述您的问题或建议，以便我们更好地为您服务"
        placeholder-class="placeholder"
        maxlength="500"
      />
      <text class="word-count">{{ content.length }}/500</text>
    </view>
    
    <!-- 图片上传 -->
    <view class="upload-section">
      <text class="section-title">上传图片（选填，最多4张）</text>
      <view class="upload-grid">
        <view 
          class="upload-item" 
          v-for="(image, index) in images" 
          :key="index"
        >
          <image class="preview" :src="image" mode="aspectFill"></image>
          <text class="delete-btn" @tap="deleteImage(index)">×</text>
        </view>
        <view class="upload-btn" @tap="chooseImage" v-if="images.length < 4">
          <text class="icon">+</text>
        </view>
      </view>
    </view>
    
    <!-- 联系方式 -->
    <view class="contact-section">
      <text class="section-title">联系方式（选填）</text>
      <input 
        class="contact-input"
        v-model="contact"
        placeholder="请留下您的手机号或邮箱，方便我们及时回复"
        placeholder-class="placeholder"
      />
    </view>
    
    <!-- 提交按钮 -->
    <button 
      class="submit-btn" 
      :class="{ disabled: !isValid }"
      @tap="submit"
    >
      提交反馈
    </button>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

const feedbackTypes = [
  { id: 1, name: '课程相关' },
  { id: 2, name: '老师相关' },
  { id: 3, name: '系统问题' },
  { id: 4, name: '其他建议' }
]

const selectedType = ref(0)
const content = ref('')
const images = ref([])
const contact = ref('')

const isValid = computed(() => {
  return selectedType.value !== 0 && content.value.trim().length > 0
})

const selectType = (typeId) => {
  selectedType.value = typeId
}

const chooseImage = () => {
  uni.chooseImage({
    count: 4 - images.value.length,
    success: (res) => {
      images.value = [...images.value, ...res.tempFilePaths]
    }
  })
}

const deleteImage = (index) => {
  images.value.splice(index, 1)
}

const submit = () => {
  if (!isValid.value) {
    uni.showToast({
      title: '请选择反馈类型并填写反馈内容',
      icon: 'none'
    })
    return
  }
  
  uni.showLoading({
    title: '提交中'
  })
  
  // 模拟提交
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({
      title: '提交成功',
      icon: 'success'
    })
    
    // 重置表单
    selectedType.value = 0
    content.value = ''
    images.value = []
    contact.value = ''
    
    // 返回上一页
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  }, 1500)
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  background-color: #1C1B21;
  padding: 30rpx 30rpx 120rpx;
}

.header {
  margin-bottom: 40rpx;
  
  .title {
    color: #fff;
    font-size: 36rpx;
    font-weight: 600;
  }
}

.section-title {
  color: rgba(255,255,255,0.6);
  font-size: 28rpx;
  margin-bottom: 20rpx;
  display: block;
}

.type-section {
  margin-bottom: 40rpx;
  
  .type-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20rpx;
    
    .type-item {
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      background: rgba(255,255,255,0.1);
      border-radius: 12rpx;
      color: #fff;
      font-size: 28rpx;
      
      &.active {
        background: #FF4D8F;
      }
    }
  }
}

.content-section {
  margin-bottom: 40rpx;
  position: relative;
  
  .content-input {
    width: 100%;
    height: 300rpx;
    background: rgba(255,255,255,0.1);
    border-radius: 12rpx;
    padding: 20rpx;
    color: #fff;
    font-size: 28rpx;
  }
  
  .word-count {
    position: absolute;
    right: 20rpx;
    bottom: 20rpx;
    color: rgba(255,255,255,0.4);
    font-size: 24rpx;
  }
}

.upload-section {
  margin-bottom: 40rpx;
  
  .upload-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20rpx;
    
    .upload-item {
      position: relative;
      width: 160rpx;
      height: 160rpx;
      
      .preview {
        width: 100%;
        height: 100%;
        border-radius: 12rpx;
      }
      
      .delete-btn {
        position: absolute;
        top: -20rpx;
        right: -20rpx;
        width: 40rpx;
        height: 40rpx;
        line-height: 36rpx;
        text-align: center;
        background: rgba(0,0,0,0.5);
        color: #fff;
        border-radius: 50%;
        font-size: 32rpx;
      }
    }
    
    .upload-btn {
      width: 160rpx;
      height: 160rpx;
      background: rgba(255,255,255,0.1);
      border-radius: 12rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .icon {
        color: rgba(255,255,255,0.6);
        font-size: 48rpx;
      }
    }
  }
}

.contact-section {
  margin-bottom: 60rpx;
  
  .contact-input {
    background: rgba(255,255,255,0.1);
    border-radius: 12rpx;
    height: 80rpx;
    padding: 0 20rpx;
    color: #fff;
    font-size: 28rpx;
  }
}

.placeholder {
  color: rgba(255,255,255,0.3);
}

.submit-btn {
  position: fixed;
  bottom: 40rpx;
  left: 40rpx;
  right: 40rpx;
  height: 88rpx;
  line-height: 88rpx;
  background: #FF4D8F;
  color: #fff;
  font-size: 32rpx;
  border-radius: 100rpx;
  
  &.disabled {
    background: rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.3);
  }
}
</style> 