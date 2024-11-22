<template>
  <view class="about-page">
    <!-- 品牌信息 -->
    <view class="brand-info glass-effect">
      <image 
        class="logo" 
        src="/static/images/logo.png" 
        mode="aspectFit"
      />
      <text class="app-name">XX商城</text>
      <text class="version">Version {{ appVersion }}</text>
    </view>

    <!-- 公司介绍 -->
    <view class="company-intro glass-effect">
      <view class="section-title">公司介绍</view>
      <text class="intro-text">
        XX成立于2012年，是一家专注于茶饮研发与创新的现代茶饮品牌。
        我们致力于将传统茶饮与现代饮品文化相结合，为消费者带来更好的饮品体验。
      </text>
    </view>

    <!-- 功能列表 -->
    <view class="feature-list glass-effect">
      <view 
        class="feature-item"
        v-for="item in featureList"
        :key="item.id"
        @tap="handleFeature(item)"
      >
        <view class="item-left">
          <text class="icon">{{ item.icon }}</text>
          <text class="label">{{ item.label }}</text>
        </view>
        <view class="item-right">
          <text class="value" v-if="item.value">{{ item.value }}</text>
          <text class="arrow">></text>
        </view>
      </view>
    </view>

    <!-- 联系方式 -->
    <view class="contact-info glass-effect">
      <view class="section-title">联系我们</view>
      <view class="contact-list">
        <view 
          class="contact-item"
          v-for="contact in contactList"
          :key="contact.id"
          @tap="handleContact(contact)"
        >
          <text class="icon">{{ contact.icon }}</text>
          <view class="contact-detail">
            <text class="label">{{ contact.label }}</text>
            <text class="value">{{ contact.value }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 社交媒体 -->
    <view class="social-media glass-effect">
      <view class="section-title">关注我们</view>
      <view class="social-list">
        <view 
          class="social-item"
          v-for="social in socialList"
          :key="social.id"
          @tap="handleSocial(social)"
        >
          <image 
            class="social-icon" 
            :src="social.icon" 
            mode="aspectFit"
          />
          <text class="social-name">{{ social.name }}</text>
        </view>
      </view>
    </view>

    <!-- 版权信息 -->
    <view class="copyright">
      <text class="copyright-text">Copyright © 2012-2024 喜茶</text>
      <text class="copyright-text">All Rights Reserved</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// App版本
const appVersion = ref('2.5.0')

// 功能列表
const featureList = ref([
  { id: 1, icon: '📋', label: '用户协议', type: 'agreement' },
  { id: 2, icon: '🔒', label: '隐私政策', type: 'privacy' },
  { id: 3, icon: '⭐', label: '给我们评分', type: 'rate' },
  { id: 4, icon: '🔄', label: '检查更新', type: 'update', value: '已是最新版本' }
])

// 联系方式
const contactList = ref([
  { id: 1, icon: '📞', label: '客服电话', value: '400-100-5555', type: 'phone' },
  { id: 2, icon: '📧', label: '商务合作', value: 'business@heytea.com', type: 'email' },
  { id: 3, icon: '📍', label: '公司地址', value: '深圳市南山区深圳湾科技生态园', type: 'address' }
])

// 社交媒体
const socialList = ref([
  { id: 1, name: '微信', icon: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg', type: 'wechat' },
  { id: 2, name: '微博', icon: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg', type: 'weibo' },
  { id: 3, name: '抖音', icon: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg', type: 'douyin' },
  { id: 4, name: '小红书', icon: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg', type: 'xiaohongshu' }
])

// 处理功能点击
const handleFeature = (item) => {
  switch (item.type) {
    case 'agreement':
      uni.navigateTo({ url: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg' })
      break
    case 'privacy':
      uni.navigateTo({ url: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg' })
      break
    case 'rate':
      // 跳转应用商店
      break
    case 'update':
      checkUpdate()
      break
  }
}

// 处理联系方式点击
const handleContact = (contact) => {
  switch (contact.type) {
    case 'phone':
      uni.makePhoneCall({
        phoneNumber: contact.value
      })
      break
    case 'email':
      uni.setClipboardData({
        data: contact.value,
        success: () => {
          uni.showToast({
            title: '邮箱已复制',
            icon: 'success'
          })
        }
      })
      break
    case 'address':
      uni.setClipboardData({
        data: contact.value,
        success: () => {
          uni.showToast({
            title: '地址已复制',
            icon: 'success'
          })
        }
      })
      break
  }
}

// 处理社交媒体点击
const handleSocial = (social) => {
  // 显示对应的二维码
  uni.previewImage({
    urls: [`/static/images/qrcode/${social.type}.png`]
  })
}

// 检查更新
const checkUpdate = () => {
  uni.showLoading({
    title: '检查更新中'
  })
  
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({
      title: '已是最新版本',
      icon: 'success'
    })
  }, 1500)
}
</script>

<style lang="scss">
.about-page {
  min-height: 100vh;
  padding: 30rpx;
  box-sizing: border-box;
  background: #f8f8f8;

  .brand-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60rpx 30rpx;
    margin-bottom: 30rpx;
    
    .logo {
      width: 160rpx;
      height: 160rpx;
      margin-bottom: 20rpx;
    }
    
    .app-name {
      font-size: 36rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 10rpx;
    }
    
    .version {
      font-size: 24rpx;
      color: #999;
    }
  }

  .section-title {
    font-size: 28rpx;
    font-weight: 500;
    color: #333;
    margin-bottom: 20rpx;
  }

  .company-intro {
    padding: 30rpx;
    margin-bottom: 30rpx;
    
    .intro-text {
      font-size: 26rpx;
      color: #666;
      line-height: 1.6;
    }
  }

  .feature-list {
    margin-bottom: 30rpx;
    
    .feature-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30rpx;
      border-bottom: 1rpx solid rgba(0, 0, 0, 0.05);
      
      &:last-child {
        border-bottom: none;
      }
      
      .item-left {
        display: flex;
        align-items: center;
        
        .icon {
          font-size: 36rpx;
          margin-right: 20rpx;
        }
        
        .label {
          font-size: 28rpx;
          color: #333;
        }
      }
      
      .item-right {
        display: flex;
        align-items: center;
        
        .value {
          font-size: 26rpx;
          color: #999;
          margin-right: 10rpx;
        }
        
        .arrow {
          font-size: 24rpx;
          color: #ccc;
        }
      }
      
      &:active {
        background: rgba(0, 0, 0, 0.02);
      }
    }
  }

  .contact-info {
    padding: 30rpx;
    margin-bottom: 30rpx;
    
    .contact-list {
      .contact-item {
        display: flex;
        align-items: center;
        margin-bottom: 30rpx;
        
        &:last-child {
          margin-bottom: 0;
        }
        
        .icon {
          font-size: 40rpx;
          margin-right: 20rpx;
        }
        
        .contact-detail {
          flex: 1;
          
          .label {
            font-size: 26rpx;
            color: #999;
            margin-bottom: 4rpx;
          }
          
          .value {
            font-size: 28rpx;
            color: #333;
          }
        }
        
        &:active {
          opacity: 0.8;
        }
      }
    }
  }

  .social-media {
    padding: 30rpx;
    margin-bottom: 60rpx;
    
    .social-list {
      display: flex;
      justify-content: space-around;
      
      .social-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        
        .social-icon {
          width: 80rpx;
          height: 80rpx;
          margin-bottom: 10rpx;
        }
        
        .social-name {
          font-size: 24rpx;
          color: #666;
        }
        
        &:active {
          opacity: 0.8;
        }
      }
    }
  }

  .copyright {
    text-align: center;
    padding: 30rpx 0;
    
    .copyright-text {
      font-size: 24rpx;
      color: #999;
      line-height: 1.6;
      display: block;
    }
  }
}

// 毛玻璃效果
.glass-effect {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
}
</style>
