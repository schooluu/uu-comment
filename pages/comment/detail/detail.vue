<template>
  <view class="container" :class="`theme-${currentTheme}`">
    <!-- 自定义导航栏 -->
    <view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="nav-content">
        <view class="nav-left">
          <view class="back-btn" @tap="goBack">
            <text class="icon">←</text>
          </view>
          <text class="nav-title">详情</text>
        </view>
        <view class="nav-right">
          <view class="share-btn" @tap="handleShare">
            <text class="icon">📤</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 调整原有内容的上边距 -->
    <view class="main-content" :style="{ paddingTop: statusBarHeight + 88 + 'rpx' }">
      <!-- 公司基本信息 -->
      <view class="company-info" v-if="company">
        <view class="header">
          <text class="name">{{company.companyName}}</text>
          <view class="stats-box">
            <view class="rating-box">
              <uni-rate :value="company.rating" size="15"/>
              <text class="review-count">{{company.reviewCount || 0}}条点评</text>
            </view>
            <text class="view-count">
              <text class="icon">👁️</text>
              {{company.viewCount || 0}}
            </text>
          </view>
          <text class="address">{{company.address}}</text>
        </view>
      </view>
      <view class="company-info comments-section" v-if="company">
        <view class="section-title">
          <text class="title">评价</text>
        </view>
        <view style="color: darkorange;">
          {{company.cons}}
        </view>
      </view>
      <!-- 评论列表 -->
      <view class="comments-section">
        <view class="section-title">
          <text class="title">看法</text>
          <text class="count">({{comments.length}})</text>
        </view>
        
        <view class="comment-list">
          <view 
            v-for="comment in comments" 
            :key="comment._id"
            class="comment-item"
          >
            <view class="comment-header">
              <view class="user-info">
                <text class="username">{{comment.userName || '匿名用户'}}</text>
                <uni-rate :value="comment.rating" size="15"/>
              </view>
              <text class="time">{{formatTime(comment.createdAt)}}</text>
            </view>
            
            <view class="comment-content">
              <text class="text">{{comment.content}}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 评论输入框 -->
      <view class="comment-form">
        <view class="rating-input">
          <uni-rate v-model="newRating" size="20"/>
        </view>
        <input 
          class="input"
          v-model="newComment"
          placeholder="说说你的看法..."
          @confirm="submitComment"
        />
        <button 
          class="submit-btn"
          @click="submitComment"
        >
          <text class="icon">✏️</text>
          <text>发表</text>
        </button>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
// 添加动画关键帧
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30rpx);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.container {
  padding: 30rpx;
  padding-bottom: calc(120rpx + env(safe-area-inset-bottom));
  
  .main-content {
    padding: 20rpx 0;
  }
  
  .company-info {
    background: rgba(255, 255, 255, 0.8) !important;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8rpx 32rpx rgba(31, 38, 135, 0.1) !important;
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 40rpx !important;
    animation: fadeInUp 0.6s ease-out;
    
    .header {
      .name {
        font-size: 40rpx;
        font-weight: bold;
        color: #333;
        animation: slideInRight 0.8s ease-out;
        background: linear-gradient(to right, #333, #666);
        -webkit-background-clip: text;
        color: transparent;
        margin-bottom: 24rpx;
        line-height: 1.3;
      }
      
      .stats-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 24rpx 0;
        animation: scaleIn 0.8s ease-out 0.2s both;
        background: rgba(0, 0, 0, 0.02);
        padding: 20rpx 24rpx;
        border-radius: 12rpx;
        
        .rating-box, .view-count {
          transition: transform 0.3s;
          
          &:hover {
            transform: translateY(-2rpx);
          }
        }
        
        .rating-box {
          display: flex;
          align-items: center;
          
          .review-count {
            font-size: 24rpx;
            color: #666;
            margin-left: 20rpx;
            font-weight: 500;
          }
        }
        
        .view-count {
          font-size: 24rpx;
          color: #666;
          display: flex;
          align-items: center;
          
          .icon {
            margin-right: 8rpx;
          }
        }
      }
      
      .address {
        font-size: 26rpx;
        color: #666;
        animation: slideInRight 0.8s ease-out 0.4s both;
        padding: 12rpx 0;
        opacity: 0.8;
        
        &::before {
          display: inline-block;
          animation: bounce 1s ease-in-out infinite;
        }
      }
    }
  }
  
  .comments-section {
    .section-title {
      display: flex;
      align-items: center;
      margin-bottom: 30rpx;
      padding: 0 6rpx;
      
      .title {
        font-size: 34rpx;
        font-weight: bold;
        color: #333;
        position: relative;
        
        &::after {
          content: '';
          position: absolute;
          bottom: -6rpx;
          left: 0;
          width: 0;
          height: 3rpx;
          background: #3B7FFF;
          animation: expandWidth 0.6s ease-out 0.8s forwards;
        }
      }
      
      .count {
        font-size: 24rpx;
        color: #999;
        margin-left: 12rpx;
      }
    }
    
    .comment-list {
      .comment-item {
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 16rpx;
        padding: 28rpx;
        margin-bottom: 24rpx;
        box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.03);
        opacity: 0;
        animation: fadeInUp 0.5s ease-out forwards;
        transition: all 0.3s ease;
        
        @for $i from 1 through 10 {
          &:nth-child(#{$i}) {
            animation-delay: #{$i * 0.1}s;
          }
        }
        
        &:hover {
          transform: translateY(-4rpx);
          box-shadow: 0 12rpx 36rpx rgba(31, 38, 135, 0.15);
        }
        
        .comment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20rpx;
          
          .user-info {
            display: flex;
            align-items: center;
            
            .username {
              font-size: 28rpx;
              color: #333;
              margin-right: 20rpx;
              position: relative;
              font-weight: 500;
              padding-bottom: 4rpx;
              
              &::after {
                content: '';
                position: absolute;
                bottom: -4rpx;
                left: 0;
                width: 0;
                height: 2rpx;
                background: #3B7FFF;
                transition: width 0.3s;
              }
              
              &:hover::after {
                width: 100%;
              }
            }
          }
          
          .time {
            font-size: 24rpx;
            color: #999;
            background: rgba(0, 0, 0, 0.03);
            padding: 4rpx 12rpx;
            border-radius: 100rpx;
          }
        }
        
        .comment-content {
          font-size: 28rpx;
          color: #454545;
          line-height: 1.8;
          padding: 20rpx 0;
        }
      }
    }
  }
  
  .comment-form {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    padding: 24rpx 30rpx calc(24rpx + env(safe-area-inset-bottom));
    box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.05);
    display: flex;
    align-items: center;
    animation: slideUpForm 0.6s ease-out;
    
    .rating-input {
      margin-right: 24rpx;
    }
    
    .input {
      flex: 1;
      height: 80rpx;
      background: rgba(0, 0, 0, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 36rpx;
      padding: 0 36rpx;
      font-size: 28rpx;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      
      &:focus {
        background: #fff;
        border-color: var(--theme-color);
      }
    }
    
    .submit-btn {
      min-width: 160rpx;
      height: 80rpx;
      background: linear-gradient(135deg, #3B7FFF, #007AFF);
      color: #fff;
      border-radius: 36rpx;
      margin-left: 20rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28rpx;
      position: relative;
      overflow: hidden;
      padding: 0 32rpx;
      
      .icon {
        margin-right: 12rpx;
        font-size: 32rpx;
      }
      
      text {
        color: #fff;
        line-height: 1;
        display: inline-block;
        vertical-align: middle;
      }
      
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255,255,255,0.2),
          transparent
        );
        animation: shimmer 2s infinite;
      }
      
      &:active {
        transform: scale(0.96);
        box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.1);
        &::after {
          animation: none;
        }
      }
    }
  }
}

// 新增动画关键帧
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4rpx); }
}

@keyframes expandWidth {
  from { width: 0; }
  to { width: 40rpx; }
}

@keyframes shimmer {
  100% { left: 100%; }
}

@keyframes slideUpForm {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

// 添加页面切换动画
.page-enter-active,
.page-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateX(30rpx);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-30rpx);
}

// 导航栏样式
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background: var(--primary-gradient);
  box-shadow: 0 4rpx 30rpx rgba(0, 0, 0, 0.1);

  .nav-content {
    height: 88rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 36rpx;

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
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        margin-right: 24rpx;
        transition: all 0.3s;
        
        .icon {
          font-size: 36rpx;
          color: #fff;
          font-weight: 500;
        }
        
        &:active {
          transform: scale(0.9);
          background: rgba(255, 255, 255, 0.25);
        }
      }

      .nav-title {
        font-size: 34rpx;
        font-weight: 600;
        color: #fff;
        letter-spacing: 2rpx;
        text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
      }
    }

    .nav-right {
      .share-btn {
        width: 64rpx;
        height: 64rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        transition: all 0.3s;
        
        .icon {
          font-size: 32rpx;
          font-weight: 500;
        }
        
        &:active {
          transform: scale(0.9);
          background: rgba(255, 255, 255, 0.25);
        }
      }
    }
  }
}

// 主内容区域样式调整
.main-content {
  padding: 30rpx;
}

// 主题相关样式
.container {
  min-height: 100vh;
  
  // 默认主题
  &.theme-default {
    background: linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%);
    
    .nav-bar {
      background: linear-gradient(135deg, #7C3AED, #4F46E5);
    }
    
    .section-title .title::after {
      background: #7C3AED;
    }
    
    .username::after {
      background: #7C3AED;
    }
    
    .submit-btn {
      background: linear-gradient(135deg, #7C3AED, #4F46E5);
    }
  }
  
  // 蓝色主题
  &.theme-blue {
    background: linear-gradient(135deg, #E0F2FE 0%, #DBEAFE 100%);
    
    .nav-bar {
      background: linear-gradient(135deg, #0EA5E9, #2563EB);
    }
    
    .section-title .title::after {
      background: #0EA5E9;
    }
    
    .username::after {
      background: #0EA5E9;
    }
    
    .submit-btn {
      background: linear-gradient(135deg, #0EA5E9, #2563EB);
    }
  }
  
  // 绿色主题
  &.theme-green {
    background: linear-gradient(135deg, #DCFCE7 0%, #D1FAE5 100%);
    
    .nav-bar {
      background: linear-gradient(135deg, #10B981, #059669);
    }
    
    .section-title .title::after {
      background: #10B981;
    }
    
    .username::after {
      background: #10B981;
    }
    
    .submit-btn {
      background: linear-gradient(135deg, #10B981, #059669);
    }
  }
  
  // 红色主题
  &.theme-red {
    background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%);
    
    .nav-bar {
      background: linear-gradient(135deg, #EF4444, #DC2626);
    }
    
    .section-title .title::after {
      background: #EF4444;
    }
    
    .username::after {
      background: #EF4444;
    }
    
    .submit-btn {
      background: linear-gradient(135deg, #EF4444, #DC2626);
    }
  }
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 公司详情数据
const company = ref<any>(null)
const comments = ref<any[]>([])

// 评论表单数据
const newRating = ref(0)
const newComment = ref('')

// 获取状态栏高度
const statusBarHeight = uni.getSystemInfoSync().statusBarHeight

// 主题相关
const currentTheme = ref('default')

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 分享功能
const handleShare = () => {
  uni.showShareMenu({
    withShareTicket: true,
    menus: ['shareAppMessage', 'shareTimeline']
  })
}

// 获取公司详情
const getCompanyDetail = async (id: string) => {
  uni.showLoading({ title: '加载中...' })
  try {
    const { result } = await uniCloud.callFunction({
      name: 'getCompanyDetail',
      data: { id }
    })
    if (result.code === 0) {
      company.value = result.data
    }
  } catch (error) {
    uni.showToast({
      title: '获取详情失败',
      icon: 'none'
    })
  } finally {
    uni.hideLoading()
  }
}

// 获取评论列表
const getComments = async (companyId: string) => {
  try {
    const { result } = await uniCloud.callFunction({
      name: 'getCompanyComments',
      data: { companyId }
    })
    if (result.code === 0) {
      comments.value = result.data
    }
  } catch (error) {
    uni.showToast({
      title: '获取评论失败',
      icon: 'none'
    })
  }
}

// 提交评论
const submitComment = async () => {
  try {
    uni.showLoading({title:'发表中...'});
    const { result } = await uniCloud.callFunction({
      name: 'addCompanyComment',
      data: {
        companyId: company.value._id,
        content: newComment.value,
        rating: newRating.value
      }
    })
    
    if (result.code === 0) {
      uni.showToast({ title: '评论成功' })
      // 重置表单
      newComment.value = ''
      newRating.value = 0
      // 刷新评论列表
      await getComments(company.value._id)
    }
    uni.hideLoading();
  } catch (error) {
    uni.showToast({
      title: '评论失败',
      icon: 'none'
    })
  }
}

// 格式化时间
const formatTime = (timestamp: number) => {
  const date = new Date(timestamp)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

// 初始化主题
onMounted(() => {
  const savedTheme = uni.getStorageSync('theme')
  if (savedTheme) {
    currentTheme.value = savedTheme
  }
  
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const id = currentPage.options.id
  
  if (id) {
    getCompanyDetail(id)
    getComments(id)
  }
})
</script>
