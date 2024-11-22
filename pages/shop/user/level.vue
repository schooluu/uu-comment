<template>
  <view class="member-level-page">
    <!-- 当前等级卡片 -->
    <view class="current-level glass-effect">
      <view class="level-header">
        <view class="level-info">
          <image class="level-icon" :src="currentLevel.icon" mode="aspectFit"/>
          <view class="level-detail">
            <text class="level-name">{{ currentLevel.name }}</text>
            <text class="level-desc">{{ currentLevel.description }}</text>
          </view>
        </view>
        <view class="member-code" @tap="showQRCode">
          <text class="icon">🎫</text>
          <text>会员码</text>
        </view>
      </view>
      
      <!-- 经验值进度 -->
      <view class="exp-progress">
        <view class="progress-info">
          <text class="current-exp">当前经验值 {{ currentExp }}/{{ nextLevelExp }}</text>
          <text class="next-level">距离{{ nextLevel.name }}还需 {{ remainExp }} 经验</text>
        </view>
        <view class="progress-bar">
          <view 
            class="progress-inner"
            :style="{ width: `${(currentExp / nextLevelExp) * 100}%` }"
          ></view>
        </view>
      </view>
    </view>

    <!-- 等级特权列表 -->
    <view class="level-privileges">
      <view class="section-title">等级特权</view>
      <view class="privileges-grid">
        <view 
          class="privilege-item"
          v-for="privilege in currentLevel.privileges"
          :key="privilege.id"
        >
          <text class="privilege-icon">{{ privilege.icon }}</text>
          <text class="privilege-name">{{ privilege.name }}</text>
          <text class="privilege-desc">{{ privilege.desc }}</text>
        </view>
      </view>
    </view>

    <!-- 等级说明 -->
    <view class="level-rules">
      <view class="section-title">等级说明</view>
      <view class="rules-list glass-effect">
        <view 
          class="rule-item"
          v-for="(level, index) in levelList"
          :key="level.id"
          :class="{ active: level.id === currentLevel.id }"
        >
          <view class="level-badge">
            <image class="badge-icon" :src="level.icon" mode="aspectFit"/>
            <text class="badge-name">{{ level.name }}</text>
          </view>
          <view class="level-requirement">
            <text class="exp-text">累计经验值 {{ level.requiredExp }}</text>
            <text class="discount">{{ level.discount }}折</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 获取经验值说明 -->
    <view class="exp-rules">
      <view class="section-title">如何获取经验值</view>
      <view class="exp-list glass-effect">
        <view 
          class="exp-item"
          v-for="rule in expRules"
          :key="rule.id"
        >
          <view class="rule-left">
            <text class="rule-icon">{{ rule.icon }}</text>
            <view class="rule-info">
              <text class="rule-name">{{ rule.name }}</text>
              <text class="rule-desc">{{ rule.desc }}</text>
            </view>
          </view>
          <text class="exp-value">+{{ rule.exp }}经验</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 当前等级信息
const currentLevel = ref({
  id: 2,
  name: '白银会员',
  icon: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg',
  description: '尊贵白银会员',
  privileges: [
    { id: 1, icon: '🎁', name: '生日礼券', desc: '生日当月获赠100元礼券' },
    { id: 2, icon: '🏷️', name: '专属折扣', desc: '全场商品9.5折' },
    { id: 3, icon: '🎯', name: '积分加速', desc: '消费积分1.2倍' },
    { id: 4, icon: '🎫', name: '专属券包', desc: '每月专享优惠券' }
  ]
})

// 经验值信息
const currentExp = ref(2800)
const nextLevelExp = ref(5000)
const remainExp = computed(() => nextLevelExp.value - currentExp.value)

// 下一等级信息
const nextLevel = ref({
  name: '黄金会员',
  icon: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg'
})

// 等级列表
const levelList = ref([
  { id: 1, name: '青铜会员', icon: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg', requiredExp: 0, discount: 9.8 },
  { id: 2, name: '白银会员', icon: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg', requiredExp: 1000, discount: 9.5 },
  { id: 3, name: '黄金会员', icon: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg', requiredExp: 5000, discount: 9.0 },
  { id: 4, name: '铂金会员', icon: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg', requiredExp: 10000, discount: 8.5 },
  { id: 5, name: '钻石会员', icon: 'https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg', requiredExp: 20000, discount: 8.0 }
])

// 获取经验值规则
const expRules = ref([
  { id: 1, icon: '🛍️', name: '消费奖励', desc: '每消费1元获得', exp: 1 },
  { id: 2, icon: '📝', name: '评价奖励', desc: '发布评价可获得', exp: 10 },
  { id: 3, icon: '🎯', name: '签到奖励', desc: '每日签到可获得', exp: 5 },
  { id: 4, icon: '👥', name: '邀请奖励', desc: '邀请好友注册可获得', exp: 50 }
])

// 显示会员码
const showQRCode = () => {
  uni.navigateTo({
    url: '/pages/shop/member/qrcode'
  })
}
</script>

<style lang="scss">
.member-level-page {
  min-height: 100vh;
  padding: 30rpx;
  box-sizing: border-box;
  background: #f8f8f8;

  .current-level {
    padding: 30rpx;
    border-radius: 20rpx;
    margin-bottom: 30rpx;
    background: linear-gradient(135deg, #fff 0%, #f8f8f8 100%);
    
    .level-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30rpx;
      
      .level-info {
        display: flex;
        align-items: center;
        
        .level-icon {
          width: 80rpx;
          height: 80rpx;
          margin-right: 20rpx;
        }
        
        .level-detail {
          .level-name {
            font-size: 32rpx;
            font-weight: bold;
            color: #333;
          }
          
          .level-desc {
            font-size: 24rpx;
            color: #666;
            margin-top: 4rpx;
          }
        }
      }
      
      .member-code {
        display: flex;
        align-items: center;
        padding: 12rpx 24rpx;
        background: rgba(255, 107, 107, 0.1);
        border-radius: 30rpx;
        
        .icon {
          font-size: 28rpx;
          margin-right: 8rpx;
        }
        
        text {
          font-size: 24rpx;
          color: #ff6b6b;
        }
      }
    }
    
    .exp-progress {
      .progress-info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 16rpx;
        
        text {
          font-size: 24rpx;
          color: #666;
        }
      }
      
      .progress-bar {
        height: 16rpx;
        background: #f0f0f0;
        border-radius: 8rpx;
        overflow: hidden;
        
        .progress-inner {
          height: 100%;
          background: linear-gradient(90deg, #ff6b6b 0%, #ff9f9f 100%);
          border-radius: 8rpx;
          transition: width 0.3s ease;
        }
      }
    }
  }

  .section-title {
    font-size: 28rpx;
    color: #333;
    font-weight: 500;
    margin: 40rpx 0 20rpx;
  }

  .privileges-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20rpx;
    
    .privilege-item {
      background: #fff;
      padding: 30rpx;
      border-radius: 16rpx;
      text-align: center;
      
      .privilege-icon {
        font-size: 48rpx;
        margin-bottom: 16rpx;
      }
      
      .privilege-name {
        font-size: 28rpx;
        color: #333;
        margin-bottom: 8rpx;
      }
      
      .privilege-desc {
        font-size: 24rpx;
        color: #999;
      }
    }
  }

  .rules-list, .exp-list {
    background: #fff;
    border-radius: 16rpx;
    padding: 20rpx;
    
    .rule-item, .exp-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx;
      border-bottom: 1rpx solid #f5f5f5;
      
      &:last-child {
        border-bottom: none;
      }
      
      &.active {
        background: rgba(255, 107, 107, 0.05);
      }
    }
  }
}
</style>
