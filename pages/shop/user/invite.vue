<template>
  <view class="invite-page">
    <!-- 邀请奖励卡片 -->
    <view class="reward-card glass-effect">
      <view class="card-header">
        <text class="title">邀请好友</text>
        <text class="subtitle">一起来喝茶</text>
      </view>
      <view class="reward-info">
        <view class="reward-item">
          <text class="value">¥{{ inviteReward }}</text>
          <text class="label">邀请奖励</text>
        </view>
        <view class="divider"></view>
        <view class="reward-item">
          <text class="value">¥{{ newUserReward }}</text>
          <text class="label">新人奖励</text>
        </view>
      </view>
      <view class="invite-code">
        <text class="code-label">我的邀请码</text>
        <text class="code-value">{{ inviteCode }}</text>
        <button class="copy-btn" @tap="copyInviteCode">复制</button>
      </view>
    </view>

    <!-- 邀请方式 -->
    <view class="share-methods glass-effect">
      <view class="section-title">邀请方式</view>
      <view class="method-list">
        <view 
          class="method-item"
          v-for="method in shareMethods"
          :key="method.id"
          @tap="handleShare(method)"
        >
          <image class="method-icon" :src="method.icon" mode="aspectFit"/>
          <text class="method-name">{{ method.name }}</text>
        </view>
      </view>
    </view>

    <!-- 邀请规则 -->
    <view class="invite-rules glass-effect">
      <view class="section-title">活动规则</view>
      <view class="rules-content">
        <view 
          class="rule-item"
          v-for="(rule, index) in rules"
          :key="index"
        >
          <text class="rule-num">{{ index + 1 }}.</text>
          <text class="rule-text">{{ rule }}</text>
        </view>
      </view>
    </view>

    <!-- 邀请记录 -->
    <view class="invite-records glass-effect">
      <view class="records-header">
        <text class="title">邀请记录</text>
        <text class="total">已邀请 {{ records.length }} 人</text>
      </view>
      <scroll-view 
        class="records-list"
        scroll-y
        :show-scrollbar="false"
      >
        <view 
          class="record-item"
          v-for="record in records"
          :key="record.id"
        >
          <view class="user-info">
            <image class="avatar" :src="record.avatar" mode="aspectFill"/>
            <view class="info-content">
              <text class="nickname">{{ record.nickname }}</text>
              <text class="time">{{ record.time }}</text>
            </view>
          </view>
          <view class="reward-status" :class="record.status">
            <text class="reward-text">{{ getStatusText(record.status) }}</text>
            <text class="reward-value" v-if="record.status === 'completed'">
              +¥{{ record.reward }}
            </text>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 分享弹窗 -->
    <uni-popup ref="sharePopup" type="bottom">
      <view class="share-popup">
        <view class="popup-header">
          <text class="title">分享给好友</text>
          <text class="close" @tap="closeShare">×</text>
        </view>
        <view class="share-content">
          <view class="qrcode-section">
            <image class="qrcode" :src="qrCodeUrl" mode="aspectFit"/>
            <text class="tip">扫码加入</text>
          </view>
          <view class="share-image">
            <image class="poster" :src="posterUrl" mode="aspectFit"/>
            <button class="save-btn" @tap="savePoster">保存图片</button>
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 邀请奖励金额
const inviteReward = ref('50.00')
const newUserReward = ref('30.00')
const inviteCode = ref('HT888888')

// 分享方式
const shareMethods = ref([
  { id: 1, name: '微信', icon: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg', type: 'wechat' },
  { id: 2, name: '朋友圈', icon: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg', type: 'moments' },
  { id: 3, name: '微博', icon: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg', type: 'weibo' },
  { id: 4, name: '复制链接', icon: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg', type: 'link' }
])

// 活动规则
const rules = ref([
  '新用户通过您的邀请码注册后，双方可获得相应奖励',
  '新用户首次下单后，邀请奖励将自动发放到账户余额',
  '每位用户最多可邀请50位好友',
  '对于恶意刷奖励的行为，平台有权取消奖励资格',
  '活动最终解释权归喜茶所有'
])

// 邀请记录
const records = ref([
  {
    id: 1,
    nickname: '小明',
    avatar: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
    time: '2024-01-20 14:30',
    status: 'completed',
    reward: '50.00'
  },
  {
    id: 2,
    nickname: '小红',
    avatar: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
    time: '2024-01-19 15:20',
    status: 'pending'
  },
  {
    id: 3,
    nickname: '小张',
    avatar: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
    time: '2024-01-18 10:15',
    status: 'completed',
    reward: '50.00'
  }
])

// 获取状态文本
const getStatusText = (status) => {
  const statusMap = {
    completed: '已完成',
    pending: '待完成首单'
  }
  return statusMap[status]
}

// 复制邀请码
const copyInviteCode = () => {
  uni.setClipboardData({
    data: inviteCode.value,
    success: () => {
      uni.showToast({
        title: '邀请码已复制',
        icon: 'success'
      })
    }
  })
}

// 处理分享
const handleShare = (method) => {
  switch (method.type) {
    case 'wechat':
      // 调用微信分享
      break
    case 'moments':
      // 分享到朋友圈
      break
    case 'weibo':
      // 分享到微博
      break
    case 'link':
      // 复制分享链接
      uni.setClipboardData({
        data: `https://heytea.com/invite?code=${inviteCode.value}`,
        success: () => {
          uni.showToast({
            title: '链接已复制',
            icon: 'success'
          })
        }
      })
      break
  }
}
</script>

<style lang="scss">
.invite-page {
  min-height: 100vh;
  padding: 30rpx;
  background: #f8f8f8;

  .reward-card {
    padding: 40rpx;
    margin-bottom: 30rpx;
    background: linear-gradient(135deg, #ff6b6b 0%, #ff9f9f 100%);
    color: #fff;
    
    .card-header {
      text-align: center;
      margin-bottom: 40rpx;
      
      .title {
        font-size: 40rpx;
        font-weight: bold;
        margin-bottom: 10rpx;
      }
      
      .subtitle {
        font-size: 28rpx;
        opacity: 0.9;
      }
    }
    
    .reward-info {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 40rpx;
      
      .reward-item {
        text-align: center;
        
        .value {
          font-size: 48rpx;
          font-weight: bold;
          margin-bottom: 10rpx;
        }
        
        .label {
          font-size: 26rpx;
          opacity: 0.9;
        }
      }
      
      .divider {
        width: 2rpx;
        height: 80rpx;
        background: rgba(255, 255, 255, 0.3);
      }
    }
    
    .invite-code {
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.2);
      padding: 20rpx;
      border-radius: 12rpx;
      
      .code-label {
        font-size: 26rpx;
        margin-right: 20rpx;
      }
      
      .code-value {
        font-size: 32rpx;
        font-weight: bold;
        margin-right: 20rpx;
      }
      
      .copy-btn {
        font-size: 24rpx;
        color: #ff6b6b;
        background: #fff;
        padding: 8rpx 24rpx;
        border-radius: 30rpx;
        border: none;
        
        &:active {
          opacity: 0.8;
        }
      }
    }
  }

  .share-methods {
    padding: 30rpx;
    margin-bottom: 30rpx;
    
    .method-list {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20rpx;
      
      .method-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        
        .method-icon {
          width: 80rpx;
          height: 80rpx;
          margin-bottom: 10rpx;
        }
        
        .method-name {
          font-size: 24rpx;
          color: #666;
        }
        
        &:active {
          opacity: 0.8;
        }
      }
    }
  }

  .invite-rules {
    padding: 30rpx;
    margin-bottom: 30rpx;
    
    .rules-content {
      .rule-item {
        display: flex;
        margin-bottom: 20rpx;
        
        .rule-num {
          color: #ff6b6b;
          margin-right: 10rpx;
        }
        
        .rule-text {
          font-size: 26rpx;
          color: #666;
          line-height: 1.5;
        }
      }
    }
  }

  .invite-records {
    padding: 30rpx;
    
    .records-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30rpx;
      
      .title {
        font-size: 28rpx;
        font-weight: 500;
        color: #333;
      }
      
      .total {
        font-size: 24rpx;
        color: #999;
      }
    }
    
    .records-list {
      max-height: 400rpx;
      
      .record-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20rpx 0;
        border-bottom: 1rpx solid #f5f5f5;
        
        &:last-child {
          border-bottom: none;
        }
        
        .user-info {
          display: flex;
          align-items: center;
          
          .avatar {
            width: 80rpx;
            height: 80rpx;
            border-radius: 50%;
            margin-right: 20rpx;
          }
          
          .info-content {
            .nickname {
              font-size: 28rpx;
              color: #333;
              margin-bottom: 6rpx;
            }
            
            .time {
              font-size: 24rpx;
              color: #999;
            }
          }
        }
        
        .reward-status {
          text-align: right;
          
          .reward-text {
            font-size: 26rpx;
            margin-bottom: 6rpx;
          }
          
          .reward-value {
            font-size: 28rpx;
            color: #ff6b6b;
            font-weight: 500;
          }
          
          &.completed {
            .reward-text {
              color: #52c41a;
            }
          }
          
          &.pending {
            .reward-text {
              color: #faad14;
            }
          }
        }
      }
    }
  }
}

.section-title {
  font-size: 28rpx;
  font-weight: 500;
  color: #333;
  margin-bottom: 20rpx;
}

.glass-effect {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
}
</style>
