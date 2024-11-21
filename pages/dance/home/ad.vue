<template>
  <view class="container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @tap="handleBack">
        <text class="iconfont">←</text>
      </view>
      <text class="title">活动详情</text>
    </view>

    <!-- 活动海报 -->
    <view class="poster-section">
      <image class="poster" src="/static/images/free-class.jpg" mode="widthFix"></image>
    </view>
    
    <!-- 活动说明 -->
    <view class="rules-section">
      <view class="rule-item" v-for="(rule, index) in rules" :key="index">
        <text class="rule-number">{{ index + 1 }}. </text>
        <text class="rule-content">{{ rule }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const rules = ref([
  '本课卡适用在XXXX未有过任何消费记录的用户，消费记录包括充值记录，上课记录，体验课记录，私教及其它特殊课程上课记录。',
  '点击"领取课卡"后，请根据您的需求，从"XXXX上海单次体验卡""XXXX南京单次体验卡""XXXX成都单次体验卡"中选择其一进行领取，领取后可进行约课。',
  'XXXX南京单次体验卡"XXXX成都单次体验卡"分别适用于XXXX门店不通用。可点击小程序"XXXX"进入约课界面，点击筛选按钮选择对应门店后，进行约课。',
  '免费课程课卡没有使用有效期，请在课卡有效期内使用，可点击"我的"查看课卡详情。',
  '体验当天办理会员享受85折优惠，优惠范围包括：次卡单店/全市通30次、60次、90次、200次；时效卡单店/全市通季卡、半年卡、年卡。'
])

const handleBack = () => {
  uni.navigateBack({
    delta: 1
  })
}
</script>

<style lang="scss" scoped>
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 88rpx;
  background: rgba(20, 17, 35, 0.8);
  backdrop-filter: blur(10px);
  
  .back-btn {
    position: absolute;
    left: 30rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64rpx;
    height: 64rpx;
    padding: 10rpx;
    
    .iconfont {
      font-size: 40rpx;
      color: #fff;
    }
    
    &:active {
      opacity: 0.8; // 点击反馈
    }
  }
  
  .title {
    font-size: 32rpx;
    color: #fff;
    font-weight: 500;
  }
}

.container {
  padding-top: 88rpx; // 为固定导航栏留出空间
  min-height: 100vh;
  background-color: #141123f5;
  padding-bottom: 40rpx;
}

.poster-section {
  width: 100%;
  
  .poster {
    width: 100%;
  }
}

.rules-section {
  padding: 40rpx;
  background: rgba(255,255,255,0.1);
  border-radius: 20rpx;
  margin: 30rpx;
  
  .rule-item {
    display: flex;
    margin-bottom: 30rpx;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .rule-number {
      color: rgba(255,255,255,0.8);
      font-size: 28rpx;
      margin-right: 10rpx;
    }
    
    .rule-content {
      flex: 1;
      color: rgba(255,255,255,0.8);
      font-size: 28rpx;
      line-height: 1.6;
    }
  }
}
</style>
