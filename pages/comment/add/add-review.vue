<template>
  <view class="container">
    <!-- 自定义导航栏 -->
    <view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="nav-content">
        <view class="nav-left">
          <view class="back-btn" @tap="goBack">
            <text class="icon">←</text>
          </view>
          <text class="nav-title">发布点评</text>
        </view>
        <view class="nav-right">
          <view class="draft-btn" @tap="saveDraft">
            <text class="icon">📝</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 调整表单容器的上边距 -->
    <view class="form-box" :style="{ marginTop: statusBarHeight + 88 + 'rpx' }">
      <!-- 标题名称 -->
      <view class="form-item">
        <text class="label">标题</text>
        <input 
          class="input" 
          v-model="formData.companyName"
          placeholder="请输入标题"
        />
      </view>
      
      <!-- 总体评分 -->
      <view class="form-item">
        <text class="label">总体评分</text>
        <uni-rate 
          v-model="formData.rating"
          :size="30"
          :value="formData.rating"
        />
      </view>
      
      <!-- 评价 -->
      <view class="form-item">
        <text class="label">评价</text>
        <textarea 
          class="textarea"
          maxlength="99999"
          v-model="formData.cons"
          placeholder="请输入内容..."
        />
      </view>
      
      <!-- 城市选择 -->
      <view class="form-item">
        <text class="label">城市</text>
        <view 
          class="city-picker"
          @tap="showCityPicker"
        >
          <text class="picker-text">{{ formData.city || '请选择城市' }}</text>
          <text class="picker-arrow">▼</text>
        </view>
      </view>
      
      <!-- 大概地址 -->
      <view class="form-item">
        <text class="label">大概地址</text>
        <input 
          class="input"
          v-model="formData.address"
          placeholder="请输入大概地址"
        />
      </view>
      
      <!-- 提交按钮 -->
      <button 
        class="submit-btn" 
        :loading="loading"
        @click="handleSubmit"
      >
        提交点评
      </button>
    </view>
  </view>
<uni-popup ref="cityPopup" type="bottom">
  <view class="city-popup">
    <view class="popup-header">
      <text class="cancel" @tap="closeCityPopup">取消</text>
      <text class="title">选择城市</text>
      <text class="confirm" @tap="confirmCitySelect">确定</text>
    </view>
    
    <view class="popup-content">
      <!-- 省份列表 -->
      <scroll-view class="province-list" scroll-y>
        <view 
          v-for="(province, index) in provinces" 
          :key="province.code"
          class="province-item"
          :class="{ active: selectedProvince === province.name }"
          @tap="selectProvince(province)"
        >
          <text class="name">{{ province.name }}</text>
        </view>
      </scroll-view>
      
      <!-- 城市列表 -->
      <scroll-view class="city-list" scroll-y>
        <view 
          v-for="city in cities" 
          :key="city.code"
          class="city-item"
          :class="{ active: tempCity === city.name }"
          @tap="selectCity(city)"
        >
          <text class="name">{{ city.name }}</text>
        </view>
      </scroll-view>
    </view>
  </view>
</uni-popup>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import CryptoJS from 'crypto-js'

// 添加城市选择相关的 ref
const cityPopup = ref(null)
const tempCity = ref('')

// 表单数据
const formData = reactive({
  companyName: '',
  rating: 0,
  cons: '',
  city: '',
  address: ''
})

// loading状态
const loading = ref(false)

// 加密密钥
const SECRET_KEY = 'your-secret-key-here'

// 加密数据
const encryptData = (data: any) => {
  const jsonStr = JSON.stringify(data)
  return CryptoJS.AES.encrypt(jsonStr, SECRET_KEY).toString()
}

// 表单验证
const validateForm = () => {
  if (!formData.companyName) {
    uni.showToast({
      title: '请输入标题',
      icon: 'none'
    })
    return false
  }
  if (formData.rating === 0) {
    uni.showToast({
      title: '请选择评分',
      icon: 'none'
    })
    return false
  }
  if (!formData.cons) {
    uni.showToast({
      title: '请填写评价',
      icon: 'none'
    })
    return false
  }
  if (!formData.city) {
    uni.showToast({
      title: '请选城市',
      icon: 'none'
    })
    return false
  }
  return true
}

// 重置表单
const resetForm = () => {
  formData.companyName = ''
  formData.rating = 0
  formData.cons = ''
  formData.city = ''
  formData.address = ''
}

// 提交表单
const handleSubmit = async () => {
  if (!validateForm()) return
  
  try {
    loading.value = true
    // 调用API提交数据
    await submitReview(formData)
    uni.showToast({
      title: '提交成功',
      icon: 'success'
    })
    setTimeout(() => {
      uni.navigateBack()
    }, 1000)
  } catch (error) {
    uni.showToast({
      title: '提交失败',
      icon: 'error'
    })
  } finally {
    loading.value = false
  }
}

// 修改提交方法
const submitReview = async (data: any) => {
  // 加密表单数据
  const encryptedData = encryptData(data)
  
  const result = await uniCloud.callFunction({
    name: 'addCompanyReview',
    data: {
      encryptedData
    }
  })
  
  if (result.result.code !== 0) {
    throw new Error(result.result.message)
  }
  
  return result.result
}

// 添加省市数据相关的变量
const provinces = ref([])
const cities = ref([])
const selectedProvince = ref('')

// 获取省份列表
const getProvinces = async () => {
  try {
    const { result } = await uniCloud.callFunction({
      name: 'getCityList'
    })
    if (result.code === 0) {
      provinces.value = result.data
    }
  } catch (error) {
    uni.showToast({
      title: '获取省份失败',
      icon: 'none'
    })
  }
}

// 获取城市列表
const getCities = async (provinceCode: string) => {
  try {
    const { result } = await uniCloud.callFunction({
      name: 'getCityList',
      data: { province: provinceCode }
    })
    if (result.code === 0) {
      cities.value = result.data
    }
  } catch (error) {
    uni.showToast({
      title: '获取城市失败',
      icon: 'none'
    })
  }
}



// 修改城市选择相关方法
const showCityPicker = async () => {
  try {
    if (provinces.value.length === 0) {
      await getProvinces()
    }
    cityPopup.value.open()
  } catch (error) {
    console.error('城市选择错误:', error)
    uni.showToast({
      title: '获取城市列表失败',
      icon: 'none'
    })
  }
}

const selectProvince = async (province) => {
  selectedProvince.value = province.name
  await getCities(province.code)
}

const selectCity = (city) => {
  tempCity.value = city.name
}

const confirmCitySelect = () => {
  if (tempCity.value) {
    formData.city = tempCity.value
    closeCityPopup()
  } else {
    uni.showToast({
      title: '请选择城市',
      icon: 'none'
    })
  }
}

const closeCityPopup = () => {
  cityPopup.value.close()
  tempCity.value = ''
}

// 在 onMounted 中初始化省份数据
onMounted(async () => {
  await getProvinces()
})

// 获取状态栏高度
const statusBarHeight = uni.getSystemInfoSync().statusBarHeight

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 保存草稿
const saveDraft = () => {
  uni.showToast({
    title: '已保存草稿',
    icon: 'success'
  })
}
</script>

<style lang="scss">
.container {
  padding: 30rpx;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.form-box {
  background: #fff;
  border-radius: 24rpx;
  padding: 40rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
  animation: slideUp 0.5s ease-out;
}

.form-item {
  margin-bottom: 40rpx;
  opacity: 0;
  animation: fadeIn 0.5s ease-out forwards;
  
  @for $i from 1 through 6 {
    &:nth-child(#{$i}) {
      animation-delay: #{$i * 0.1}s;
    }
  }
  
  .label {
    display: block;
    font-size: 28rpx;
    color: #333;
    margin-bottom: 20rpx;
    font-weight: 500;
  }
  
  .input {
    height: 88rpx;
    border: 2rpx solid #e5e7eb;
    border-radius: 12rpx;
    padding: 0 24rpx;
    font-size: 28rpx;
    background-color: #f9fafb;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:focus {
      transform: translateY(-2rpx);
      box-shadow: 0 4rpx 12rpx rgba(0, 122, 255, 0.1);
    }
  }
  
  .textarea {
    height: 240rpx;
    border: 2rpx solid #e5e7eb;
    border-radius: 12rpx;
    padding: 24rpx;
    font-size: 28rpx;
    background-color: #f9fafb;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:focus {
      transform: translateY(-2rpx);
      box-shadow: 0 4rpx 12rpx rgba(0, 122, 255, 0.1);
    }
  }
  
  .city-picker {
    height: 88rpx;
    border: 2rpx solid #e5e7eb;
    border-radius: 12rpx;
    padding: 0 24rpx;
    background-color: #f9fafb;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    .picker-text {
      font-size: 28rpx;
      color: #333;
      
      &:empty::before {
        content: attr(placeholder);
        color: #999;
      }
    }
    
    .picker-arrow {
      font-size: 24rpx;
      color: #999;
      margin-left: 12rpx;
    }
    
    &:active {
      transform: translateY(-2rpx);
      box-shadow: 0 4rpx 12rpx rgba(0, 122, 255, 0.1);
    }
  }
}

.submit-btn {
  width: 100%;
  height: 96rpx;
  line-height: 96rpx;
  background: var(--primary-gradient, linear-gradient(135deg, #7C3AED, #4F46E5));
  color: #fff;
  border-radius: 48rpx;
  font-size: 32rpx;
  margin-top: 60rpx;
  font-weight: 500;
  box-shadow: 0 4rpx 12rpx rgba(124, 58, 237, 0.2);
  transition: all 0.3s;
  animation: pulse 2s infinite;
  
  &:active {
    transform: scale(0.95);
    animation-play-state: paused;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(50rpx);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 4rpx 12rpx rgba(124, 58, 237, 0.2);
  }
  50% {
    box-shadow: 0 4rpx 20rpx rgba(124, 58, 237, 0.4);
  }
  100% {
    box-shadow: 0 4rpx 12rpx rgba(124, 58, 237, 0.2);
  }
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateX(30rpx);
}

.city-popup {
  background-color: #fff;
  border-radius: 24rpx 24rpx 0 0;
  overflow: hidden;
  animation: slideUpEnter 0.3s ease-out;
  
  .popup-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30rpx;
    border-bottom: 1rpx solid #eee;
    animation: fadeInDown 0.3s ease-out;
    
    .title {
      font-size: 32rpx;
      font-weight: 500;
      color: #333;
    }
    
    .cancel, .confirm {
      font-size: 28rpx;
      padding: 10rpx 20rpx;
      transition: opacity 0.2s;
      
      &:active {
        opacity: 0.6;
      }
    }
    
    .cancel {
      color: #666;
    }
    
    .confirm {
      color: var(--primary-color, #7C3AED);
      font-weight: 500;
    }
  }
  
  .popup-content {
    display: flex;
    height: 600rpx;
    
    .province-list, .city-list {
      flex: 1;
      height: 100%;
      
      .province-item, .city-item {
        padding: 30rpx;
        display: flex;
        align-items: center;
        transition: all 0.2s ease;
        animation: fadeInRight 0.3s ease-out;
        animation-fill-mode: both;
        
        @for $i from 1 through 20 {
          &:nth-child(#{$i}) {
            animation-delay: #{$i * 0.02}s;
          }
        }
        
        .name {
          font-size: 28rpx;
          color: #333;
        }
        
        &.active {
          background: rgba(124, 58, 237, 0.1);
          transform: translateX(4rpx);
          
          .name {
            color: var(--primary-color, #7C3AED);
            font-weight: 500;
          }
        }
        
        &:active {
          background: rgba(124, 58, 237, 0.05);
        }
      }
    }
    
    .province-list {
      background: #f5f7fa;
      border-right: 1rpx solid #eee;
    }
    
    .city-list {
      transform: translateX(100%);
      animation: slideInRight 0.3s ease-out forwards;
    }
  }
}

// 添加新的动画关键帧
@keyframes slideUpEnter {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(-20rpx);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

// 导航栏样式
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background: var(--primary-gradient, linear-gradient(135deg, #007AFF, #0056b3));
  box-shadow: 0 4rpx 30rpx rgba(0, 0, 0, 0.1);

  .nav-content {
    height: 88rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30rpx;

    .nav-left {
      display: flex;
      align-items: center;
      
      .back-btn {
        width: 64rpx;
        height: 64rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.15);
        margin-right: 20rpx;
        transition: all 0.3s;
        
        .icon {
          font-size: 36rpx;
          color: #fff;
        }
        
        &:active {
          transform: scale(0.9);
          background: rgba(255, 255, 255, 0.25);
        }
      }
      
      .nav-title {
        font-size: 32rpx;
        font-weight: 600;
        color: #fff;
      }
    }
    
    .nav-right {
      display: flex;
      align-items: center;
      
      .draft-btn {
        width: 64rpx;
        height: 64rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.15);
        margin-left: 20rpx;
        transition: all 0.3s;
        
        .icon {
          font-size: 36rpx;
          color: #fff;
        }
        
        &:active {
          transform: scale(0.9);
          background: rgba(255, 255, 255, 0.25);
        }
      }
    }
  }
}
</style> 