<template>
  <view class="card-container">
    <!-- 顶部背景 -->
    <view class="header-bg"></view>
    
    <!-- 名片主体 -->
    <view class="card-main">
      <!-- 个人信息 -->
      <view class="profile-section">
        <image class="avatar" :src="userInfo.avatar" mode="aspectFill"></image>
        <view class="basic-info">
          <view class="name-row">
            <text class="name">{{ userInfo.name }}</text>
            <text class="title">{{ userInfo.title }}</text>
          </view>
          <view class="company">{{ userInfo.company }}</view>
          <view class="tags">
            <text v-for="(tag, index) in userInfo.tags" 
                  :key="index" 
                  class="tag">{{ tag }}</text>
          </view>
        </view>
        <button class="edit-btn" @tap="handleEdit">编辑</button>
      </view>
      
      <!-- 联系方式 -->
      <view class="contact-section">
        <view class="section-title">联系方式</view>
        <view class="contact-list">
          <view class="contact-item" @tap="handleContact('phone')">
            <text class="icon">📱</text>
            <text class="label">手机</text>
            <text class="value">{{ userInfo.phone }}</text>
            <text class="copy-btn">复制</text>
          </view>
          <view class="contact-item" @tap="handleContact('wechat')">
            <text class="icon">💬</text>
            <text class="label">微信</text>
            <text class="value">{{ userInfo.wechat }}</text>
            <text class="copy-btn">复制</text>
          </view>
          <view class="contact-item" @tap="handleContact('email')">
            <text class="icon">📧</text>
            <text class="label">邮箱</text>
            <text class="value">{{ userInfo.email }}</text>
            <text class="copy-btn">复制</text>
          </view>
        </view>
      </view>
      
      <!-- 个人简介 -->
      <view class="intro-section">
        <view class="section-title">个人简介</view>
        <view class="intro-content">{{ userInfo.introduction }}</view>
      </view>
      
      <!-- 业务范围 -->
      <view class="business-section">
        <view class="section-title">业务范围</view>
        <view class="business-tags">
          <text v-for="(business, index) in userInfo.business" 
                :key="index" 
                class="business-tag">{{ business }}</text>
        </view>
      </view>
    </view>
    
    <!-- 底部操作栏 -->
    <view class="bottom-actions">
      <button class="action-btn share" @tap="handleShare">
        <text class="icon">📤</text>
        <text>分享名片</text>
      </button>
      <button class="action-btn save" @tap="handleSave">
        <text class="icon">💾</text>
        <text>保存图片</text>
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const userInfo = ref({
  avatar: 'https://example.com/avatar.jpg',
  name: '张三',
  title: '销售经理',
  company: '富邦房产',
  tags: ['房产顾问', '3年经验', '优质服务'],
  phone: '13800138000',
  wechat: 'zhangsan888',
  email: 'zhangsan@example.com',
  introduction: '专注房产销售10年，熟悉本地房产市场，为您提供专业的购房建议和贴心服务。',
  business: ['新房销售', '二手房交易', '房屋租赁', '投资咨询']
})

// 编辑名片
const handleEdit = () => {
  uni.navigateTo({
    url: '/pages/city/card/edit'
  })
}

// 处理联系方式点击
const handleContact = (type) => {
  let content = ''
  switch(type) {
    case 'phone':
      content = userInfo.value.phone
      break
    case 'wechat':
      content = userInfo.value.wechat
      break
    case 'email':
      content = userInfo.value.email
      break
  }
  
  uni.setClipboardData({
    data: content,
    success: () => {
      uni.showToast({
        title: '已复制到剪贴板',
        icon: 'success'
      })
    }
  })
}

// 分享名片
const handleShare = () => {
  uni.showShareMenu({
    withShareTicket: true,
    menus: ['shareAppMessage', 'shareTimeline']
  })
}

// 保存名片图片
const handleSave = () => {
  // 这里需要实现生成名片图片的逻辑
  uni.showLoading({
    title: '生成图片中...'
  })
  
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({
      title: '保存成功',
      icon: 'success'
    })
  }, 1500)
}
</script>

<style lang="scss" scoped>
.card-container {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 120rpx;
  
  .header-bg {
    height: 300rpx;
    background: linear-gradient(135deg, #07c160, #10ad7a);
  }
  
  .card-main {
    margin: -200rpx 30rpx 0;
    background: #fff;
    border-radius: 20rpx;
    padding: 30rpx;
    box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.1);
    
    .profile-section {
      display: flex;
      align-items: flex-start;
      margin-bottom: 40rpx;
      
      .avatar {
        width: 120rpx;
        height: 120rpx;
        border-radius: 60rpx;
        margin-right: 20rpx;
        border: 4rpx solid #fff;
      }
      
      .basic-info {
        flex: 1;
        
        .name-row {
          display: flex;
          align-items: center;
          gap: 12rpx;
          margin-bottom: 8rpx;
          
          .name {
            font-size: 36rpx;
            font-weight: 500;
            color: #333;
          }
          
          .title {
            font-size: 26rpx;
            color: #666;
            background: #f5f5f5;
            padding: 4rpx 12rpx;
            border-radius: 4rpx;
          }
        }
        
        .company {
          font-size: 28rpx;
          color: #666;
          margin-bottom: 12rpx;
        }
        
        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 12rpx;
          
          .tag {
            font-size: 24rpx;
            color: #07c160;
            background: rgba(7,193,96,0.1);
            padding: 4rpx 12rpx;
            border-radius: 4rpx;
          }
        }
      }
      
      .edit-btn {
        padding: 12rpx 24rpx;
        background: #f5f5f5;
        border-radius: 24rpx;
        font-size: 26rpx;
        color: #666;
      }
    }
    
    .contact-section {
      margin-bottom: 40rpx;
      
      .section-title {
        font-size: 32rpx;
        font-weight: 500;
        color: #333;
        margin-bottom: 20rpx;
      }
      
      .contact-list {
        .contact-item {
          display: flex;
          align-items: center;
          padding: 20rpx 0;
          border-bottom: 1rpx solid #f5f5f5;
          
          .icon {
            font-size: 36rpx;
            margin-right: 12rpx;
          }
          
          .label {
            width: 80rpx;
            font-size: 28rpx;
            color: #666;
          }
          
          .value {
            flex: 1;
            font-size: 28rpx;
            color: #333;
          }
          
          .copy-btn {
            font-size: 26rpx;
            color: #07c160;
            padding: 8rpx 20rpx;
          }
        }
      }
    }
    
    .intro-section {
      margin-bottom: 40rpx;
      
      .section-title {
        font-size: 32rpx;
        font-weight: 500;
        color: #333;
        margin-bottom: 20rpx;
      }
      
      .intro-content {
        font-size: 28rpx;
        color: #666;
        line-height: 1.6;
      }
    }
    
    .business-section {
      .section-title {
        font-size: 32rpx;
        font-weight: 500;
        color: #333;
        margin-bottom: 20rpx;
      }
      
      .business-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 20rpx;
        
        .business-tag {
          padding: 12rpx 24rpx;
          background: #f5f5f5;
          color: #666;
          font-size: 26rpx;
          border-radius: 8rpx;
        }
      }
    }
  }
  
  .bottom-actions {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    padding: 20rpx 30rpx;
    background: #fff;
    box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.05);
    
    .action-btn {
      flex: 1;
      height: 80rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28rpx;
      border-radius: 40rpx;
      
      .icon {
        font-size: 32rpx;
        margin-right: 8rpx;
      }
      
      &.share {
        background: #fff;
        color: #07c160;
        border: 2rpx solid #07c160;
        margin-right: 20rpx;
      }
      
      &.save {
        background: #07c160;
        color: #fff;
      }
    }
  }
}
</style> 