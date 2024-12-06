<template>
  <view class="about-container">
    <!-- 顶部导航 -->
    <view class="header">
      <text class="title">关于我们</text>
    </view>
    
    <!-- Logo部分 -->
    <view class="logo-section">
      <image class="logo" src="/static/images/logo.png" mode="aspectFit"></image>
      <text class="app-name">富邦之家</text>
      <text class="version">Version {{ version }}</text>
    </view>
    
    <!-- 功能介绍 -->
    <view class="feature-section">
      <view class="section-title">主要功能</view>
      <view class="feature-list">
        <view class="feature-item" v-for="(feature, index) in features" :key="index">
          <text class="icon">{{ feature.icon }}</text>
          <text class="name">{{ feature.name }}</text>
          <text class="desc">{{ feature.desc }}</text>
        </view>
      </view>
    </view>
    
    <!-- 公司信息 -->
    <view class="company-section">
      <view class="section-title">公司介绍</view>
      <view class="company-info">
        <text class="company-desc">{{ companyInfo.desc }}</text>
        <view class="info-item">
          <text class="label">公司地址</text>
          <text class="value">{{ companyInfo.address }}</text>
        </view>
        <view class="info-item">
          <text class="label">联系电话</text>
          <text class="value">{{ companyInfo.phone }}</text>
        </view>
        <view class="info-item">
          <text class="label">电子邮箱</text>
          <text class="value">{{ companyInfo.email }}</text>
        </view>
      </view>
    </view>
    
    <!-- 其他信息 -->
    <view class="other-section">
      <view class="link-item" @tap="navigateTo('/pages/city/agreement/privacy')">
        <text>隐私政策</text>
        <text class="arrow">></text>
      </view>
      <view class="link-item" @tap="navigateTo('/pages/city/agreement/service')">
        <text>服务协议</text>
        <text class="arrow">></text>
      </view>
      <view class="link-item" @tap="navigateTo('/pages/city/agreement/copyright')">
        <text>版权声明</text>
        <text class="arrow">></text>
      </view>
    </view>
    
    <!-- 底部版权信息 -->
    <view class="footer">
      <text class="copyright">Copyright © 2024 富邦之家</text>
      <text class="icp">浙ICP备xxxxxxxx号</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const version = ref('1.0.0')

const features = ref([
  {
    icon: '🏠',
    name: '房产交易',
    desc: '为用户提供安全、便捷的房产交易服务'
  },
  {
    icon: '🚗',
    name: '顺风拼车',
    desc: '绿色出行，共享便利'
  },
  {
    icon: '💼',
    name: '求职招聘',
    desc: '连接企业与人才的桥梁'
  },
  {
    icon: '🛍️',
    name: '二手交易',
    desc: '闲置换钱，循环利用'
  }
])

const companyInfo = ref({
  desc: '富邦之家是一家专注于本地生活服务的互联网平台，致力于为用户提供便捷、高效、安全的生活服务。我们始终秉持"用心服务，创造价值"的理念，不断创新和优化服务体验。',
  address: '浙江省杭州市西湖区xxxxx大厦',
  phone: '400-888-8888',
  email: 'service@example.com'
})

// 页面跳转
const navigateTo = (url) => {
  uni.navigateTo({ url })
}
</script>

<style lang="scss" scoped>
.about-container {
  min-height: 100vh;
  background: #f5f5f5;
  
  .header {
    height: 88rpx;
    background: #fff;
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    box-shadow: 0 2rpx 4rpx rgba(0,0,0,0.1);
    
    .title {
      font-size: 32rpx;
      font-weight: 500;
      color: #333;
    }
  }
  
  .logo-section {
    padding: 60rpx 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    
    .logo {
      width: 160rpx;
      height: 160rpx;
      margin-bottom: 20rpx;
    }
    
    .app-name {
      font-size: 36rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 12rpx;
    }
    
    .version {
      font-size: 26rpx;
      color: #999;
    }
  }
  
  .feature-section {
    margin-top: 20rpx;
    background: #fff;
    padding: 30rpx;
    
    .section-title {
      font-size: 32rpx;
      font-weight: 500;
      color: #333;
      margin-bottom: 30rpx;
    }
    
    .feature-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 30rpx;
      
      .feature-item {
        background: #f9f9f9;
        padding: 20rpx;
        border-radius: 12rpx;
        
        .icon {
          font-size: 40rpx;
          margin-bottom: 12rpx;
          display: block;
        }
        
        .name {
          font-size: 28rpx;
          color: #333;
          font-weight: 500;
          margin-bottom: 8rpx;
          display: block;
        }
        
        .desc {
          font-size: 24rpx;
          color: #666;
          line-height: 1.4;
        }
      }
    }
  }
  
  .company-section {
    margin-top: 20rpx;
    background: #fff;
    padding: 30rpx;
    
    .section-title {
      font-size: 32rpx;
      font-weight: 500;
      color: #333;
      margin-bottom: 30rpx;
    }
    
    .company-info {
      .company-desc {
        font-size: 28rpx;
        color: #666;
        line-height: 1.6;
        margin-bottom: 30rpx;
      }
      
      .info-item {
        display: flex;
        margin-bottom: 20rpx;
        
        .label {
          width: 140rpx;
          font-size: 28rpx;
          color: #999;
        }
        
        .value {
          flex: 1;
          font-size: 28rpx;
          color: #333;
        }
      }
    }
  }
  
  .other-section {
    margin-top: 20rpx;
    background: #fff;
    
    .link-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30rpx;
      font-size: 30rpx;
      color: #333;
      border-bottom: 1rpx solid #f5f5f5;
      
      .arrow {
        color: #999;
      }
      
      &:active {
        background: #f9f9f9;
      }
    }
  }
  
  .footer {
    padding: 60rpx 30rpx;
    text-align: center;
    
    .copyright {
      font-size: 26rpx;
      color: #999;
      display: block;
      margin-bottom: 12rpx;
    }
    
    .icp {
      font-size: 24rpx;
      color: #999;
    }
  }
}
</style> 