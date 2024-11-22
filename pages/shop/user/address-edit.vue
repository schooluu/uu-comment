<template>
  <view class="address-edit">
    <view class="form">
      <!-- 联系人信息 -->
      <view class="form-item">
        <text class="label">联系人</text>
        <input 
          class="input" 
          v-model="form.name" 
          placeholder="请输入姓名"
          placeholder-class="placeholder"
        />
      </view>
      
      <view class="form-item">
        <text class="label">手机号</text>
        <input 
          class="input" 
          type="number"
          maxlength="11"
          v-model="form.phone" 
          placeholder="请输入手机号"
          placeholder-class="placeholder"
        />
      </view>

      <!-- 地址信息 -->
      <view class="form-item" @tap="showAreaPicker">
        <text class="label">所在地区</text>
        <view class="area-picker">
          <text v-if="form.region" class="value">{{ form.region }}</text>
          <text v-else class="placeholder">请选择所在地区</text>
          <text class="arrow">></text>
        </view>
      </view>

      <view class="form-item">
        <text class="label">详细地址</text>
        <textarea 
          class="textarea" 
          v-model="form.address"
          placeholder="请输入详细地址，如街道、楼牌号等"
          placeholder-class="placeholder"
        />
      </view>

      <!-- 地址标签 -->
      <view class="form-item">
        <text class="label">标签</text>
        <view class="tags">
          <view 
            v-for="tag in tags" 
            :key="tag"
            class="tag-item"
            :class="{ active: form.tag === tag }"
            @tap="selectTag(tag)"
          >
            {{ tag }}
          </view>
          <view 
            class="tag-item custom"
            :class="{ active: isCustomTag }"
            @tap="showCustomTagInput"
          >
            <text v-if="!isCustomTag">自定义</text>
            <input 
              v-else
              class="custom-input"
              v-model="form.tag"
              @blur="onCustomTagBlur"
              placeholder="自定义标签"
            />
          </view>
        </view>
      </view>

      <!-- 默认地址设置 -->
      <view class="form-item switch-item">
        <text class="label">设为默认地址</text>
        <switch 
          :checked="form.isDefault" 
          @change="onDefaultChange" 
          color="#ff6b6b"
        />
      </view>
    </view>

    <!-- 底部按钮 -->
    <view class="footer">
      <view class="btn-group">
        <button 
          class="delete-btn" 
          v-if="isEdit"
          @tap="confirmDelete"
        >
          删除
        </button>
        <button 
          class="save-btn"
          :class="{ 'full-width': !isEdit }"
          @tap="saveAddress"
        >
          保存
        </button>
      </view>
    </view>

  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isEdit = ref(false)
const showPicker = ref(false)
const isCustomTag = ref(false)

const tags = ['家', '公司', '学校']

const form = ref({
  name: '',
  phone: '',
  region: '',
  address: '',
  tag: '',
  isDefault: false
})

// 初始化数据
onMounted(() => {
  const id = getQueryString('id')
  if (id) {
    isEdit.value = true
    // 获取地址详情
    loadAddressDetail(id)
  }
})

// 加载地址详情
const loadAddressDetail = async (id) => {
  try {
    // 这里调用API获取地址详情
    const detail = await getAddressDetail(id)
    form.value = detail
  } catch (error) {
    uni.showToast({
      title: '加载失败',
      icon: 'none'
    })
  }
}

// 显示地区选择器
const showAreaPicker = () => {
  showPicker.value = true
}

// 地区选择确认
const onAreaConfirm = (region) => {
  form.value.region = region.join(' ')
  showPicker.value = false
}

// 选择标签
const selectTag = (tag) => {
  form.value.tag = tag
  isCustomTag.value = false
}

// 显示自定义标签输入
const showCustomTagInput = () => {
  isCustomTag.value = true
  form.value.tag = ''
}

// 自定义标签失焦
const onCustomTagBlur = () => {
  if (!form.value.tag) {
    isCustomTag.value = false
  }
}

// 默认地址切换
const onDefaultChange = (e) => {
  form.value.isDefault = e.detail.value
}

// 保存地址
const saveAddress = async () => {
  // 表单验证
  if (!form.value.name) {
    return uni.showToast({
      title: '请输入联系人姓名',
      icon: 'none'
    })
  }
  if (!form.value.phone) {
    return uni.showToast({
      title: '请输入手机号',
      icon: 'none'
    })
  }
  if (!/^1[3-9]\d{9}$/.test(form.value.phone)) {
    return uni.showToast({
      title: '手机号格式不正确',
      icon: 'none'
    })
  }
  if (!form.value.region) {
    return uni.showToast({
      title: '请选择所在地区',
      icon: 'none'
    })
  }
  if (!form.value.address) {
    return uni.showToast({
      title: '请输入详细地址',
      icon: 'none'
    })
  }

  try {
    // 调用保存API
    await saveAddressApi(form.value)
    uni.showToast({
      title: '保存成功',
      icon: 'success'
    })
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  } catch (error) {
    uni.showToast({
      title: '保存失败',
      icon: 'none'
    })
  }
}

// 确认删除
const confirmDelete = () => {
  uni.showModal({
    title: '提示',
    content: '确定要删除该地址吗？',
    success: async (res) => {
      if (res.confirm) {
        try {
          // 调用删除API
          await deleteAddressApi(form.value.id)
          uni.showToast({
            title: '删除成功',
            icon: 'success'
          })
          setTimeout(() => {
            uni.navigateBack()
          }, 1500)
        } catch (error) {
          uni.showToast({
            title: '删除失败',
            icon: 'none'
          })
        }
      }
    }
  })
}
</script>

<style lang="scss">
.address-edit {
  min-height: 100vh;
  background: #f8f8f8;
  padding-bottom: 140rpx;
}

.form {
  background: #fff;
  padding: 0 30rpx;
  margin-top: 20rpx;
  
  .form-item {
    padding: 30rpx 0;
    border-bottom: 2rpx solid #f5f5f5;
    
    .label {
      font-size: 28rpx;
      color: #333;
      margin-bottom: 20rpx;
      display: block;
    }
    
    .input {
      height: 60rpx;
      font-size: 28rpx;
    }
    
    .textarea {
      width: 100%;
      height: 160rpx;
      font-size: 28rpx;
    }
    
    .area-picker {
      display: flex;
      align-items: center;
      height: 60rpx;
      
      .value {
        flex: 1;
        font-size: 28rpx;
        color: #333;
      }
      
      .arrow {
        font-size: 28rpx;
        color: #999;
        margin-left: 10rpx;
      }
    }
    
    &.switch-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .label {
        margin-bottom: 0;
      }
    }
  }
  
  .tags {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -10rpx;
    
    .tag-item {
      margin: 10rpx;
      padding: 12rpx 24rpx;
      border-radius: 8rpx;
      font-size: 26rpx;
      color: #666;
      background: #f5f5f5;
      
      &.active {
        background: #ff6b6b;
        color: #fff;
      }
      
      &.custom {
        .custom-input {
          width: 120rpx;
          height: 100%;
          text-align: center;
        }
      }
    }
  }
}

.placeholder {
  color: #999;
  font-size: 28rpx;
}

.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  padding: 20rpx 30rpx;
  box-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.03);
  
  .btn-group {
    display: flex;
    gap: 20rpx;
    
    button {
      flex: 1;
      height: 88rpx;
      line-height: 88rpx;
      text-align: center;
      border-radius: 44rpx;
      font-size: 30rpx;
      font-weight: 500;
      
      &.delete-btn {
        background: #fff;
        color: #666;
        border: 2rpx solid #ddd;
      }
      
      &.save-btn {
        background: #ff6b6b;
        color: #fff;
        
        &.full-width {
          flex: none;
          width: 100%;
        }
        
        &:active {
          background: darken(#ff6b6b, 5%);
        }
      }
    }
  }
}
</style> 