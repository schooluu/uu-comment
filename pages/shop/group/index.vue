<template>
    <view class="group-container">
      <!-- 顶部banner -->
      <view class="banner glass-effect">
        <text class="title">企业团餐</text>
        <text class="subtitle">为企业提供专业的餐饮服务</text>
        <view class="contact-btn">立即咨询</view>
      </view>
      
      <!-- 服务优势 -->
      <view class="advantages glass-effect">
        <view class="advantage-item" v-for="item in advantages" :key="item.id">
          <text class="icon">{{ item.icon }}</text>
          <text class="text">{{ item.text }}</text>
        </view>
      </view>
      
      <!-- 套餐推荐 -->
      <view class="packages">
        <view class="section-title">套餐推荐</view>
        <view class="package-list">
          <view class="package-card glass-effect" v-for="pkg in packages" :key="pkg.id">
            <image :src="pkg.image" mode="aspectFill" class="package-image"/>
            <view class="package-info">
              <text class="package-name">{{ pkg.name }}</text>
              <text class="package-desc">{{ pkg.desc }}</text>
              <view class="package-price">
                <text class="price">¥{{ pkg.price }}</text>
                <text class="unit">/人起</text>
              </view>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 合作流程 -->
      <view class="process glass-effect">
        <view class="section-title">合作流程</view>
        <view class="process-steps">
          <view class="step" v-for="(step, index) in steps" :key="index">
            <text class="step-num">{{ index + 1 }}</text>
            <text class="step-text">{{ step }}</text>
          </view>
        </view>
      </view>
    </view>
  </template>
  
  <script setup>
  const advantages = [
    { id: 1, icon: '🎯', text: '专属定制' },
    { id: 2, icon: '🚚', text: '准时配送' },
    { id: 3, icon: '💰', text: '优惠价格' },
    { id: 4, icon: '👨‍👩‍👦‍👦', text: '专业服务' }
  ]
  
  const packages = [
    {
      id: 1,
      name: '商务简餐',
      desc: '经典茶饮+精选小食',
      price: '25',
      image: 'https://example.com/package1.jpg'
    },
    // ... 更多套餐
  ]
  
  const steps = [
    '在线咨询',
    '需求确认',
    '方案制定',
    '签订合同',
    '开始供餐'
  ]
  </script>
  
  <style lang="scss" scoped>
  .group-container {
    min-height: 100vh;
    background: #f8f9fa;
    padding: 20rpx;
    
    .banner {
      height: 300rpx;
      border-radius: 24rpx;
      padding: 40rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-image: linear-gradient(45deg, var(--theme-color, #e4393c), #ff6b6b);
      margin-bottom: 30rpx;
      
      .title {
        font-size: 40rpx;
        color: #fff;
        font-weight: bold;
        margin-bottom: 16rpx;
      }
      
      .subtitle {
        font-size: 28rpx;
        color: rgba(255, 255, 255, 0.9);
        margin-bottom: 30rpx;
      }
      
      .contact-btn {
        align-self: flex-start;
        padding: 16rpx 40rpx;
        background: #fff;
        color: var(--theme-color, #e4393c);
        border-radius: 100rpx;
        font-size: 28rpx;
        font-weight: 500;
        box-shadow: 0 8rpx 16rpx rgba(0,0,0,0.1);
        transition: all 0.3s ease;
        
        &:active {
          transform: scale(0.98);
          opacity: 0.9;
        }
      }
    }
    
    .advantages {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      padding: 30rpx;
      border-radius: 24rpx;
      margin-bottom: 30rpx;
      
      .advantage-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        
        .icon {
          font-size: 48rpx;
          margin-bottom: 12rpx;
        }
        
        .text {
          font-size: 24rpx;
          color: #333;
        }
      }
    }
    
    .packages {
      margin-bottom: 30rpx;
      
      .section-title {
        font-size: 32rpx;
        font-weight: bold;
        margin-bottom: 20rpx;
        padding: 0 10rpx;
      }
      
      .package-list {
        display: flex;
        flex-direction: column;
        gap: 20rpx;
        
        .package-card {
          display: flex;
          border-radius: 16rpx;
          overflow: hidden;
          
          .package-image {
            width: 200rpx;
            height: 200rpx;
            flex-shrink: 0;
          }
          
          .package-info {
            flex: 1;
            padding: 20rpx;
            display: flex;
            flex-direction: column;
            
            .package-name {
              font-size: 30rpx;
              font-weight: 500;
              margin-bottom: 8rpx;
            }
            
            .package-desc {
              font-size: 24rpx;
              color: #666;
              margin-bottom: auto;
            }
            
            .package-price {
              display: flex;
              align-items: baseline;
              
              .price {
                font-size: 36rpx;
                color: var(--theme-color, #e4393c);
                font-weight: bold;
              }
              
              .unit {
                font-size: 24rpx;
                color: #999;
                margin-left: 4rpx;
              }
            }
          }
        }
      }
    }
    
    .process {
      padding: 30rpx;
      border-radius: 24rpx;
      
      .section-title {
        font-size: 32rpx;
        font-weight: bold;
        margin-bottom: 30rpx;
        text-align: center;
      }
      
      .process-steps {
        display: flex;
        justify-content: space-between;
        position: relative;
        
        &::before {
          content: '';
          position: absolute;
          top: 40rpx;
          left: 60rpx;
          right: 60rpx;
          height: 2rpx;
          background: #eee;
          z-index: 0;
        }
        
        .step {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 1;
          flex: 1;
          
          .step-num {
            width: 80rpx;
            height: 80rpx;
            background: var(--theme-color, #e4393c);
            color: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32rpx;
            font-weight: bold;
            margin-bottom: 16rpx;
          }
          
          .step-text {
            font-size: 24rpx;
            color: #666;
            text-align: center;
          }
        }
      }
    }
    
    // 底部联系方式
    .contact-info {
      margin-top: 40rpx;
      text-align: center;
      
      .contact-title {
        font-size: 28rpx;
        color: #333;
        margin-bottom: 16rpx;
      }
      
      .contact-phone {
        font-size: 36rpx;
        color: var(--theme-color, #e4393c);
        font-weight: bold;
      }
    }
  }
  
  // 添加动画效果
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20rpx);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .package-card {
    animation: fadeIn 0.5s ease forwards;
    
    @for $i from 1 through 10 {
      &:nth-child(#{$i}) {
        animation-delay: #{$i * 0.1}s;
      }
    }
  }
  </style>