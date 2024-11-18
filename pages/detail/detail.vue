<template>
  <view class="container">
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
  
  .company-info {
    background: #fff;
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;
    box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.05);
    animation: fadeInUp 0.6s ease-out;
    
    .header {
      .name {
        font-size: 36rpx;
        font-weight: bold;
        color: #333;
        animation: slideInRight 0.8s ease-out;
      }
      
      .stats-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 20rpx 0;
        animation: scaleIn 0.8s ease-out 0.2s both;
        
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
            margin-left: 16rpx;
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
      margin-bottom: 20rpx;
      
      .title {
        font-size: 32rpx;
        font-weight: bold;
        color: #333;
        position: relative;
        
        &::after {
          content: '';
          position: absolute;
          bottom: -4rpx;
          left: 0;
          width: 0;
          height: 2rpx;
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
        background: #fff;
        border-radius: 16rpx;
        padding: 24rpx;
        margin-bottom: 20rpx;
        box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.03);
        opacity: 0;
        animation: fadeInUp 0.5s ease-out forwards;
        
        @for $i from 1 through 10 {
          &:nth-child(#{$i}) {
            animation-delay: #{$i * 0.1}s;
          }
        }
        
        &:hover {
          transform: translateY(-4rpx) scale(1.01);
          box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.08);
        }
        
        .comment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16rpx;
          
          .user-info {
            display: flex;
            align-items: center;
            
            .username {
              font-size: 28rpx;
              color: #333;
              margin-right: 16rpx;
              position: relative;
              
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
          }
        }
        
        .comment-content {
          font-size: 28rpx;
          color: #666;
          line-height: 1.6;
        }
      }
    }
  }
  
  .comment-form {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    padding: 20rpx 30rpx;
    box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.05);
    display: flex;
    align-items: center;
    animation: slideUpForm 0.6s ease-out;
    
    .rating-input {
      margin-right: 20rpx;
    }
    
    .input {
      flex: 1;
      height: 72rpx;
      background: #f5f5f5;
      border-radius: 36rpx;
      padding: 0 30rpx;
      font-size: 28rpx;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      
      &:focus {
        transform: translateY(-2rpx);
        box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.08);
      }
    }
    
    .submit-btn {
      width: 160rpx;
      height: 72rpx;
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
      
      .icon {
        margin-right: 8rpx;
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
        transform: scale(0.95);
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
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 公司详情数据
const company = ref<any>(null)
const comments = ref<any[]>([])

// 评论表单数据
const newRating = ref(0)
const newComment = ref('')

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

onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const id = currentPage.options.id
  
  if (id) {
    getCompanyDetail(id)
    getComments(id)
  }
})
</script>
