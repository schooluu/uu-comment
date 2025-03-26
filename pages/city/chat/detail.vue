<template>
  <view class="chat-container">
    <!-- 顶部信息 -->
    <view class="header">
      <text class="title">{{ chatInfo.name }}</text>
    </view>
    
    <!-- 聊天记录区 -->
    <scroll-view 
      class="message-list" 
      scroll-y 
      :scroll-into-view="lastMessageId"
      @scrolltoupper="loadMoreMessages">
      <view 
        v-for="(message, index) in messages" 
        :key="index"
        :id="'msg-' + message.id"
        :class="['message-item', message.isSelf ? 'self' : 'other']">
        <image 
          class="avatar" 
          :src="message.avatar">
        </image>
        <view class="message-content">
          <text class="time" v-if="showMessageTime(index)">
            {{ formatTime(message.time) }}
          </text>
          <view class="bubble">
            <text>{{ message.content }}</text>
          </view>
        </view>
      </view>
    </scroll-view>
    
    <!-- 输入区域 -->
    <view class="input-area">
      <view class="input-box">
        <input 
          type="text" 
          v-model="inputMessage"
          placeholder="请输入消息"
          @confirm="sendMessage"
        />
      </view>
      <view class="tools">
        <text class="emoji-btn">😊</text>
        <text class="image-btn">🖼️</text>
      </view>
      <button 
        class="send-btn"
        :class="{ active: inputMessage }"
        @tap="sendMessage">
        发送
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

const chatInfo = {
  name: '张三',
  avatar: 'https://example.com/avatar.jpg'
}

const messages = ref([
  {
    id: 1,
    content: '你好，请问这个商品还在吗？',
    time: '2024-01-20 10:30:00',
    isSelf: false,
    avatar: 'https://example.com/avatar1.jpg'
  },
  {
    id: 2,
    content: '在的，您想了解什么？',
    time: '2024-01-20 10:31:00',
    isSelf: true,
    avatar: 'https://example.com/avatar2.jpg'
  }
])

const inputMessage = ref('')
const lastMessageId = computed(() => {
  const lastMsg = messages.value[messages.value.length - 1]
  return lastMsg ? 'msg-' + lastMsg.id : ''
})

const showMessageTime = (index) => {
  if (index === 0) return true
  const currentMsg = messages.value[index]
  const prevMsg = messages.value[index - 1]
  return dayjs(currentMsg.time).diff(dayjs(prevMsg.time), 'minute') > 5
}

const formatTime = (time) => {
  return dayjs(time).format('MM-DD HH:mm')
}

const sendMessage = () => {
  if (!inputMessage.value.trim()) return
  
  messages.value.push({
    id: messages.value.length + 1,
    content: inputMessage.value,
    time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    isSelf: true,
    avatar: 'https://example.com/avatar2.jpg'
  })
  
  inputMessage.value = ''
}

const loadMoreMessages = () => {
  // 加载更多历史消息的逻辑
  console.log('加载更多消息')
}
</script>

<style lang="scss" scoped>
.chat-container {
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  
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
  
  .message-list {
    flex: 1;
    padding: 20rpx;
    
    .message-item {
      display: flex;
      margin-bottom: 30rpx;
      
      .avatar {
        width: 80rpx;
        height: 80rpx;
        border-radius: 40rpx;
      }
      
      .message-content {
        max-width: 60%;
        margin: 0 20rpx;
        
        .time {
          font-size: 24rpx;
          color: #999;
          text-align: center;
          margin-bottom: 10rpx;
        }
        
        .bubble {
          padding: 20rpx;
          border-radius: 8rpx;
          font-size: 28rpx;
          word-break: break-all;
        }
      }
      
      &.other {
        .bubble {
          background: #fff;
          color: #333;
        }
      }
      
      &.self {
        flex-direction: row-reverse;
        
        .bubble {
          background: #07c160;
          color: #fff;
        }
      }
    }
  }
  
  .input-area {
    background: #fff;
    padding: 20rpx;
    display: flex;
    align-items: center;
    border-top: 1rpx solid #eee;
    
    .input-box {
      flex: 1;
      background: #f5f5f5;
      border-radius: 8rpx;
      padding: 0 20rpx;
      
      input {
        height: 72rpx;
        font-size: 28rpx;
      }
    }
    
    .tools {
      display: flex;
      padding: 0 20rpx;
      
      .emoji-btn, .image-btn {
        font-size: 48rpx;
        margin-left: 20rpx;
      }
    }
    
    .send-btn {
      width: 120rpx;
      height: 72rpx;
      background: #ddd;
      color: #fff;
      border-radius: 8rpx;
      font-size: 28rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 20rpx;
      
      &.active {
        background: #07c160;
      }
    }
  }
}
</style> 