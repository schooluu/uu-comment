<template>
  <view class="help-page">
    <!-- 搜索框 -->
    <view class="search-box glass-effect">
      <text class="icon">🔍</text>
      <input 
        type="text"
        class="search-input"
        placeholder="搜索常见问题"
        v-model="searchKey"
        @input="handleSearch"
      />
    </view>

    <!-- 常见问题分类 -->
    <view class="faq-categories">
      <view 
        class="category-item"
        v-for="category in categories"
        :key="category.id"
        @tap="selectCategory(category)"
      >
        <text class="icon">{{ category.icon }}</text>
        <text class="name">{{ category.name }}</text>
      </view>
    </view>

    <!-- 热门问题 -->
    <view class="hot-questions" v-if="!searchKey">
      <view class="section-title">热门问题</view>
      <view class="question-list glass-effect">
        <view 
          class="question-item"
          v-for="question in hotQuestions"
          :key="question.id"
          @tap="showAnswer(question)"
        >
          <text class="hot-tag" v-if="question.isHot">热</text>
          <text class="question-text">{{ question.title }}</text>
          <text class="arrow">></text>
        </view>
      </view>
    </view>

    <!-- 问题列表 -->
    <view class="faq-list">
      <view class="section-title">全部问题</view>
      <view 
        class="faq-group glass-effect"
        v-for="group in displayFaqs"
        :key="group.id"
      >
        <view class="group-header" @tap="toggleGroup(group)">
          <view class="header-left">
            <text class="icon">{{ group.icon }}</text>
            <text class="title">{{ group.title }}</text>
          </view>
          <text class="arrow" :class="{ expanded: group.expanded }">></text>
        </view>
        <view class="group-content" v-show="group.expanded">
          <view 
            class="faq-item"
            v-for="item in group.items"
            :key="item.id"
            @tap="showAnswer(item)"
          >
            <text class="question">{{ item.title }}</text>
            <text class="arrow">></text>
          </view>
        </view>
      </view>
    </view>

    <!-- 联系客服 -->
    <view class="contact-section glass-effect">
      <view class="contact-header">
        <text class="title">没有找到答案？</text>
        <text class="subtitle">联系在线客服为您解答</text>
      </view>
      <view class="contact-buttons">
        <button class="contact-btn" @tap="handleContact('online')">
          <text class="icon">💬</text>
          <text>在线客服</text>
        </button>
        <button class="contact-btn" @tap="handleContact('phone')">
          <text class="icon">📞</text>
          <text>电话客服</text>
        </button>
      </view>
    </view>

    <!-- 问题详情弹窗 -->
    <uni-popup ref="answerPopup" type="bottom">
      <view class="answer-popup">
        <view class="popup-header">
          <text class="title">问题详情</text>
          <text class="close" @tap="closeAnswer">×</text>
        </view>
        <scroll-view 
          class="popup-content" 
          scroll-y
        >
          <view class="question-title">
            {{ currentQuestion?.title }}
          </view>
          <rich-text 
            class="answer-content"
            :nodes="currentQuestion?.content"
          ></rich-text>
        </scroll-view>
        <view class="popup-footer">
          <text class="feedback">是否解决了您的问题？</text>
          <view class="feedback-btns">
            <button class="btn" @tap="handleFeedback(true)">已解决</button>
            <button class="btn outline" @tap="handleFeedback(false)">未解决</button>
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 搜索关键词
const searchKey = ref('')

// 问题分类
const categories = ref([
  { id: 1, name: '账号相关', icon: '👤' },
  { id: 2, name: '订单物流', icon: '📦' },
  { id: 3, name: '售后退款', icon: '💰' },
  { id: 4, name: '会员权益', icon: '👑' },
  { id: 5, name: '支付问题', icon: '💳' },
  { id: 6, name: '商品相关', icon: '🛍️' }
])

// 热门问题
const hotQuestions = ref([
  { 
    id: 1, 
    title: '如何修改收货地址？',
    isHot: true,
    content: '1. 进入"我的"-"收货地址"<br>2. 点击需要修改的地址<br>3. 修改后点击保存即可'
  },
  { 
    id: 2, 
    title: '退款多久能到账？',
    isHot: true,
    content: '退款到账时间说明：<br>1. 原路退回：1-3个工作日<br>2. 退回余额：实时到账<br>3. 退回银行卡：3-5个工作日'
  },
  // ... 更多热门问题
])

// FAQ分组
const faqGroups = ref([
  {
    id: 1,
    title: '账号相关',
    icon: '👤',
    expanded: false,
    items: [
      { id: 101, title: '如何注册新账号？' },
      { id: 102, title: '忘记密码怎么办？' },
      { id: 103, title: '如何绑定手机号？' }
    ]
  },
  {
    id: 2,
    title: '订单物流',
    icon: '📦',
    expanded: false,
    items: [
      { id: 201, title: '发货需要多久？' },
      { id: 202, title: '如何查看物流信息？' },
      { id: 203, title: '收货地址可以修改吗？' }
    ]
  }
  // ... 更多分组
])

// 当前显示的问题
const currentQuestion = ref(null)
const answerPopup = ref(null)

// 处理搜索
const handleSearch = () => {
  // 实现搜索逻辑
}

// 选择分类
const selectCategory = (category) => {
  // 实现分类筛选逻辑
}

// 显示答案
const showAnswer = (question) => {
  currentQuestion.value = question
  answerPopup.value.open()
}

// 关闭答案弹窗
const closeAnswer = () => {
  answerPopup.value.close()
}

// 切换分组展开状态
const toggleGroup = (group) => {
  group.expanded = !group.expanded
}

// 处理反馈
const handleFeedback = (isResolved) => {
  uni.showToast({
    title: isResolved ? '感谢您的反馈' : '正在为您转接人工客服',
    icon: 'none'
  })
  if (!isResolved) {
    handleContact('online')
  }
  closeAnswer()
}

// 处理联系客服
const handleContact = (type) => {
  if (type === 'online') {
    // 打开在线客服会话
  } else if (type === 'phone') {
    uni.makePhoneCall({
      phoneNumber: '400-123-4567'
    })
  }
}
</script>

<style lang="scss">
.help-page {
  min-height: 100vh;
  padding: 30rpx;
  box-sizing: border-box;
  background: #f8f8f8;

  .search-box {
    display: flex;
    align-items: center;
    padding: 20rpx 30rpx;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 40rpx;
    margin-bottom: 30rpx;
    
    .icon {
      font-size: 32rpx;
      margin-right: 20rpx;
    }
    
    .search-input {
      flex: 1;
      font-size: 28rpx;
      color: #333;
    }
  }

  .faq-categories {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20rpx;
    margin-bottom: 40rpx;
    
    .category-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 30rpx;
      background: #fff;
      border-radius: 16rpx;
      
      .icon {
        font-size: 48rpx;
        margin-bottom: 16rpx;
      }
      
      .name {
        font-size: 26rpx;
        color: #333;
      }
      
      &:active {
        opacity: 0.8;
      }
    }
  }

  .section-title {
    font-size: 32rpx;
    font-weight: 500;
    color: #333;
    margin-bottom: 20rpx;
  }

  .question-list, .faq-group {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 16rpx;
    margin-bottom: 20rpx;
    overflow: hidden;
    
    .question-item, .faq-item {
      display: flex;
      align-items: center;
      padding: 30rpx;
      border-bottom: 1rpx solid rgba(0, 0, 0, 0.05);
      
      &:last-child {
        border-bottom: none;
      }
      
      .hot-tag {
        background: #ff6b6b;
        color: #fff;
        font-size: 20rpx;
        padding: 4rpx 12rpx;
        border-radius: 4rpx;
        margin-right: 12rpx;
      }
      
      .question-text {
        flex: 1;
        font-size: 28rpx;
        color: #333;
      }
      
      .arrow {
        font-size: 24rpx;
        color: #999;
      }
      
      &:active {
        background: rgba(0, 0, 0, 0.02);
      }
    }
  }

  .contact-section {
    margin-top: 60rpx;
    padding: 40rpx;
    text-align: center;
    
    .contact-header {
      margin-bottom: 30rpx;
      
      .title {
        font-size: 32rpx;
        font-weight: 500;
        color: #333;
        margin-bottom: 8rpx;
      }
      
      .subtitle {
        font-size: 26rpx;
        color: #666;
      }
    }
    
    .contact-buttons {
      display: flex;
      justify-content: center;
      gap: 30rpx;
      
      .contact-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 240rpx;
        height: 80rpx;
        border-radius: 40rpx;
        background: #ff6b6b;
        color: #fff;
        font-size: 28rpx;
        border: none;
        
        .icon {
          margin-right: 8rpx;
        }
        
        &:active {
          opacity: 0.8;
        }
      }
    }
  }
}

.answer-popup {
  background: #fff;
  border-radius: 30rpx 30rpx 0 0;
  max-height: 80vh;
  
  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;
    border-bottom: 1rpx solid #f5f5f5;
    
    .title {
      font-size: 32rpx;
      font-weight: 500;
    }
    
    .close {
      font-size: 40rpx;
      color: #999;
      padding: 0 20rpx;
    }
  }
  
  .popup-content {
    padding: 30rpx;
    max-height: 60vh;
    
    .question-title {
      font-size: 30rpx;
      font-weight: 500;
      color: #333;
      margin-bottom: 20rpx;
    }
    
    .answer-content {
      font-size: 28rpx;
      color: #666;
      line-height: 1.6;
    }
  }
  
  .popup-footer {
    padding: 30rpx;
    border-top: 1rpx solid #f5f5f5;
    
    .feedback {
      font-size: 26rpx;
      color: #666;
      text-align: center;
      margin-bottom: 20rpx;
    }
    
    .feedback-btns {
      display: flex;
      justify-content: center;
      gap: 20rpx;
      
      .btn {
        width: 200rpx;
        height: 72rpx;
        line-height: 72rpx;
        border-radius: 36rpx;
        font-size: 28rpx;
        margin: 0;
        
        &.outline {
          background: #fff;
          color: #ff6b6b;
          border: 1rpx solid #ff6b6b;
        }
      }
    }
  }
}
</style>
