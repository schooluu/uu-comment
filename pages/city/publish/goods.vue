<template>
  <view class="publish-goods">
    <view class="header">
      <text class="title">发布商品</text>
    </view>
    
    <form class="form">
      <view class="form-item">
        <text class="label">商品名称</text>
        <input class="input" type="text" placeholder="请输入商品名称"></input>
      </view>
      
      <view class="form-item">
        <text class="label">价格</text>
        <input class="input" type="number" placeholder="请输入价格"></input>
      </view>
      
      <view class="form-item">
        <text class="label">描述</text>
        <textarea class="textarea" placeholder="请输入商品描述"></textarea>
      </view>
      
      <view class="form-item">
        <text class="label">上传图片</text>
        <button class="upload-btn">选择图片</button>
      </view>
      
      <button class="submit-btn">发布</button>
    </form>
  </view>
</template>

<script setup>
// 这里可以添加上传图片和提交表单的逻辑
</script>

<style lang="scss" scoped>
.publish-goods {
  min-height: 100vh;
  background: #f5f5f5;
  
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
  
  .form {
    padding: 30rpx;
    
    .form-item {
      margin-bottom: 30rpx;
      
      .label {
        font-size: 28rpx;
        color: #333;
        margin-bottom: 10rpx;
        display: block;
      }
      
      .input, .textarea {
        width: 100%;
        padding: 20rpx;
        font-size: 28rpx;
        border: 1rpx solid #ddd;
        border-radius: 8rpx;
        background: #fff;
      }
      
      .textarea {
        height: 200rpx;
        resize: none;
      }
      
      .upload-btn {
        display: inline-block;
        padding: 20rpx 40rpx;
        background: #07c160;
        color: #fff;
        border-radius: 8rpx;
        font-size: 28rpx;
        text-align: center;
      }
    }
    
    .submit-btn {
      width: 100%;
      height: 88rpx;
      background: #ff5a5f;
      color: #fff;
      border-radius: 44rpx;
      font-size: 32rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 40rpx;
    }
  }
}
</style> 