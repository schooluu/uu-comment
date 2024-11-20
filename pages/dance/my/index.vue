<template>
  <view class="container">
    <!-- 顶部Logo区域 -->
    <view class="header">
      <view class="user-info" v-if="isLoggedIn">
        <image class="avatar" :src="userInfo.avatar || defaultAvatar" mode="aspectFill"></image>
        <view class="info-right">
          <text class="nickname">{{ userInfo.nickname || '用户' }}</text>
          <text class="phone">{{ userInfo.phone || '' }}</text>
        </view>
        <view class="edit-btn" @tap="editProfile">
          <text class="emoji">✏️</text>
        </view>
      </view>
      <view class="login-section" v-else>
        <image class="logo" src="https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/微信图片_20241119193419.png" mode="aspectFit"></image>
        <text class="slogan">登录FancyFancy 开始我的学习</text>
        <button class="login-btn" @tap="handleLogin">登录/注册</button>
      </view>
    </view>

    <!-- 添加课程统计区域 -->
    <view class="stats-section" v-if="isLoggedIn">
      <view class="stat-item">
        <text class="number">{{ stats.reserved || 0 }}</text>
        <text class="label">预约课程</text>
      </view>
      <view class="stat-item">
        <text class="number">{{ stats.attended || 0 }}</text>
        <text class="label">签到课程</text>
      </view>
      <view class="stat-item">
        <text class="number">{{ stats.cancelled || 0 }}</text>
        <text class="label">取消课程</text>
      </view>
    </view>

    <!-- 课程模块 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">课程 CLASS</text>
        <text class="section-subtitle">Dance Course Management</text>
      </view>
      <view class="menu-grid">
        <view class="menu-item" v-for="item in classMenu" :key="item.id" @tap="navigateTo(item.path)">
          <view class="icon-wrapper">
            <text class="emoji">{{ item.icon }}</text>
          </view>
          <text class="text">{{ item.name }}</text>
        </view>
      </view>
    </view>

    <!-- 其他功能模块 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">其它 OTHER</text>
        <text class="section-subtitle">Additional Features</text>
      </view>
      <view class="menu-grid">
        <view class="menu-item" v-for="item in otherMenu" :key="item.id" @tap="navigateTo(item.path)">
          <view class="icon-wrapper">
            <text class="emoji">{{ item.icon }}</text>
          </view>
          <text class="text">{{ item.name }}</text>
        </view>
      </view>
    </view>

    <tab-bar :current="currentPath" />
  </view>
</template>

<script setup>
import { ref,computed, onMounted } from 'vue'
import TabBar from '@/components/dance/tab-bar.vue'
const classMenu = ref([
  { id: 1, name: '常规课程', icon: '📅', path: '/pages/dance/course/regular' },
  { id: 2, name: '私教', icon: '👤', path: '/pages/dance/course/private' },
  { id: 3, name: '赠送', icon: '🎁', path: '/pages/dance/course/gift' }
])

const otherMenu = ref([
  { id: 1, name: '券包', icon: '🎫', path: '/pages/dance/my/coupon' },
  { id: 2, name: '活动报名', icon: '🎯', path: '/pages/dance/my/activity' },
  { id: 3, name: '消费记录', icon: '📝', path: '/pages/dance/my/record' },
  { id: 4, name: '积分兑换', icon: '💎', path: '/pages/dance/my/points' },
  { id: 5, name: '我的邀请', icon: '👥', path: '/pages/dance/my/invite' },
  { id: 6, name: '我的收藏', icon: '❤️', path: '/pages/dance/my/favorite' },
  { id: 7, name: '分享', icon: '📤', path: '/pages/dance/my/share' },
  { id: 8, name: '通知', icon: '🔔', path: '/pages/dance/my/notification' },
  { id: 9, name: '申请开票', icon: '📄', path: '/pages/dance/my/invoice' },
  { id: 10, name: '意见反���', icon: '💭', path: '/pages/dance/my/feedback' }
])

const tabBar = ref([
  { id: 1, name: '首页', icon: '🏠', path: '/pages/dance/home/index' },
  { id: 2, name: '课程', icon: '🎵', path: '/pages/dance/course/index' },
  { id: 3, name: '我的', icon: '👤', path: '/pages/dance/my/index' }
])

const handleLogin = () => {
  uni.navigateTo({
    url: '/pages/dance/login/index'
  })
}

const navigateTo = (path) => {
  if(path.includes('/pages/dance/course/')) {
    uni.switchTab({
      url: path
    })
  } else {
    uni.navigateTo({
      url: path
    })
  }
}

const switchTab = (path) => {
  uni.switchTab({ url: path })
}

const currentPath = computed(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  return `/${currentPage.route}`
})

// 添加新的响应式数据
const isLoggedIn = ref(false)
const userInfo = ref({
  avatar: '',
  nickname: '',
  phone: ''
})
const defaultAvatar = 'default-avatar-url'
const stats = ref({
  reserved: 0,
  attended: 0,
  cancelled: 0
})

// 添加新的方法
const editProfile = () => {
  uni.navigateTo({
    url: '/pages/dance/my/profile'
  })
}

// 在组件挂载时检查登录状态
onMounted(() => {
  checkLoginStatus()
})

const checkLoginStatus = () => {
  const token = uni.getStorageSync('token')
  if (token) {
    isLoggedIn.value = true
    // 获取用户信息
    getUserInfo()
    // 获取课程统计
    getStats()
  }
}

const getUserInfo = () => {
  // 调用获取用户信息的API
  // 示例数据
  userInfo.value = {
    avatar: 'user-avatar-url',
    nickname: '张三',
    phone: '133****3856'
  }
}

const getStats = () => {
  // 调用获取统计数据的API
  // 示例数据
  stats.value = {
    reserved: 5,
    attended: 12,
    cancelled: 1
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #141123f5;
  padding-bottom: 120rpx;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60rpx 0;
  
  .logo {
    width: 440rpx;
    height: 420rpx;
    margin-bottom: 30rpx;
  }
  
  .slogan {
    color: #fff;
    font-size: 32rpx;
    margin-bottom: 30rpx;
  }
  
  .login-btn {
    width: 240rpx;
    height: 80rpx;
    line-height: 80rpx;
    background: #FF4D8F;
    color: #fff;
    font-size: 28rpx;
    border-radius: 100rpx;
  }
}

.section {
  padding: 30rpx;
  margin-bottom: 30rpx;
  
  .section-header {
    margin-bottom: 30rpx;
    
    .section-title {
      font-size: 32rpx;
      font-weight: 600;
      color: #fff;
      display: block;
      margin-bottom: 8rpx;
    }
    
    .section-subtitle {
      font-size: 24rpx;
      color: rgba(255, 255, 255, 0.5);
    }
  }

  .menu-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20rpx;
    
    .menu-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20rpx;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 16rpx;
      transition: all 0.3s ease;
      
      &:active {
        transform: scale(0.98);
        background: rgba(255, 255, 255, 0.08);
      }
      
      .icon-wrapper {
        width: 80rpx;
        height: 80rpx;
        background: rgba(255, 77, 143, 0.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 16rpx;
        
        .emoji {
          font-size: 36rpx;
        }
      }
      
      .text {
        font-size: 26rpx;
        color: rgba(255, 255, 255, 0.9);
        margin-top: 8rpx;
      }
    }
  }
}

.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  background: rgba(255,255,255,0.1);
  display: flex;
  justify-content: space-around;
  align-items: center;
  
  .tab-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .icon {
      width: 48rpx;
      height: 48rpx;
      margin-bottom: 6rpx;
    }
    
    .text {
      color: #fff;
      font-size: 20rpx;
      
      &.active {
        color: #FF4D8F;
      }
    }
  }
}

.user-info {
  display: flex;
  align-items: center;
  padding: 40rpx;
  
  .avatar {
    width: 120rpx;
    height: 120rpx;
    border-radius: 60rpx;
    margin-right: 30rpx;
  }
  
  .info-right {
    flex: 1;
    
    .nickname {
      font-size: 36rpx;
      color: #fff;
      font-weight: 500;
      margin-bottom: 10rpx;
    }
    
    .phone {
      font-size: 26rpx;
      color: rgba(255, 255, 255, 0.6);
    }
  }
  
  .edit-btn {
    padding: 20rpx;
    
    .emoji {
      font-size: 36rpx;
    }
  }
}

.stats-section {
  display: flex;
  justify-content: space-around;
  padding: 30rpx;
  margin: 0 30rpx 30rpx;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16rpx;
  
  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .number {
      font-size: 40rpx;
      color: #FF4D8F;
      font-weight: 600;
      margin-bottom: 10rpx;
    }
    
    .label {
      font-size: 24rpx;
      color: rgba(255, 255, 255, 0.6);
    }
  }
}

.login-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60rpx 30rpx;
  box-sizing: border-box;
  
  .logo {
    width: 280rpx;
    height: 280rpx;
    margin-bottom: 40rpx;
  }
  
  .slogan {
    color: #fff;
    font-size: 32rpx;
    margin-bottom: 40rpx;
    text-align: center;
  }
  
  .login-btn {
    width: 280rpx;
    height: 80rpx;
    line-height: 80rpx;
    background: #FF4D8F;
    color: #fff;
    font-size: 28rpx;
    border-radius: 40rpx;
    text-align: center;
    border: none;
    
    &::after {
      border: none;
    }
  }
}

</style>
