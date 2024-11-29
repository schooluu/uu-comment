<template>
    <view class="container" :class="`theme-${currentTheme}`">
        <!-- 顶部导航栏 -->
        <view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
            <view class="nav-content">
                <text class="logo">Portfolio</text>
                <view class="nav-right">
                    <view class="theme-btn" @tap="showThemePicker">
                        <text class="icon">🎨</text>
                    </view>
                </view>
            </view>
        </view>

        <!-- 头部区域 -->
        <view class="hero-section" :style="{ paddingTop: statusBarHeight + 88 + 'px' }">
            <view class="hero-content animate-slide-up">
                <text class="title">项目模板展示</text>
                <text class="subtitle">探索独特的创意与技术结合</text>
                <view class="stats">
                    <view class="stat-item">
                        <text class="count">10+</text>
                        <text class="label">模板</text>
                    </view>
                    <view class="stat-item">
                        <text class="count">1000+</text>
                        <text class="label">用户</text>
                    </view>
                    <view class="stat-item">
                        <text class="count">5.0</text>
                        <text class="label">评分</text>
                    </view>
                </view>
            </view>
        </view>

        <!-- 项目列表 -->
        <view class="projects-section">
            <view class="section-header animate-fade-in">
                <text class="section-title">精选项目</text>
                <text class="section-subtitle">探索我们的最新作品</text>
            </view>

            <view class="project-grid">
                <view v-for="(project, index) in projects" :key="project.id"
                    class="project-card glass-effect animate-scale-up" :style="{ animationDelay: `${index * 0.1}s` }"
                    @tap="goToProject(project)">
                    <image class="project-image" :src="project.image" mode="aspectFill" />
                    <view class="project-info">
                        <text class="project-title">{{ project.title }}</text>
                        <text class="project-desc">{{ project.description }}</text>
                        <view class="project-tags">
                            <text v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <!-- 项目地址部分 -->
        <view class="projects-links-section animate-fade-in">
            <view class="section-header">
                <text class="section-title">项目地址</text>
                <text class="section-subtitle">开源代码</text>
            </view>
            
            <view class="link-card glass-effect" @tap="openLink">
                <view class="link-icon">
                    <text class="icon">📦</text>
                </view>
                <view class="link-info">
                    <text class="link-title">UNIAPP</text>
                    <text class="link-desc">查看源代码</text>
                </view>
                <text class="arrow">→</text>
            </view>
        </view>

        <!-- 底部联系区域 -->
        <view class="contact-section animate-fade-in">
            <text class="contact-title">需要定制开发？</text>
            <text class="contact-subtitle">我们提供专业的技术支持和定制服务</text>
            <view class="contact-buttons">
                <button class="contact-btn email-btn" @tap="showWechatQR">
                    <text class="icon">👋</text>
                    <text>加我微信</text>
                </button>
            </view>
        </view>

        <!-- 添加主题选择弹窗 -->
        <uni-popup ref="themePopup" type="bottom">
            <view class="theme-popup">
                <view class="popup-header">
                    <text class="title">选择主题</text>
                </view>
                <view class="popup-content">
                    <view class="theme-list">
                        <view class="theme-item" v-for="theme in themes" :key="theme.value"
                            :class="{ active: currentTheme === theme.value }" @tap="selectTheme(theme.value)">
                            <view class="color-preview" :style="{ background: theme.gradient }"></view>
                            <text class="theme-name">{{ theme.label }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </uni-popup>

        <!-- 在联系区域后添加微信群区域 -->
        <view class="wechat-section animate-fade-in">
            <text class="section-title">加入微信群</text>
            <text class="section-subtitle">与开发者和其他用户交流</text>
            <view class="qrcode-container">
                <image class="qrcode" :src="wechatQunQr" mode="aspectFit" @tap="previewQRCode"/>
                <text class="tip">点击二维码放大查看</text>
            </view>
            <view class="group-info">
                <text class="info-item">
                    <text class="icon">👥</text>
                    <text>当前群成员: 500+</text>
                </text>
                <text class="info-item">
                    <text class="icon">🔥</text>
                    <text>日活跃: 200+</text>
                </text>
            </view>
        </view>

        <!-- 添加微信二维码弹窗 -->
        <uni-popup ref="wechatPopup" type="center">
            <view class="qr-popup">
                <image class="qr-code" :src="wechatQr" mode="aspectFit" />
                <text class="qr-tip">扫码加微信</text>
            </view>
        </uni-popup>
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const themePopup = ref(null)
const currentTheme = ref('default')
const statusBarHeight = uni.getSystemInfoSync().statusBarHeight
const getCompanyDetail = async () => {
  try {
    const { result } = await uniCloud.callFunction({
      name: 'getHome',
      data: {  }
    })
    if (result.code === 0) {
        projects.value = result.data.projects
        wechatQr.value = result.data.wechatQr
        wechatQunQr.value = result.data.wechatQunQr
    }
  } catch (error) {
    uni.showToast({
      title: error.message,
      icon: 'none'
    })
  }
}
const wechatQr = ref('')
const wechatQunQr = ref('')
// 示例项目数据
const projects = ref([
    {
        id: 1,
        title: '人人点评模板',
        description: '匿名化点评平台，为用户提供真实可靠的评价信息',
        image: '/static/images/project1.png',
        tags: ['Vue3', 'uniapp']
    },
    {
        id: 2,
        title: '舞蹈店预约模板',
        description: 'AI驱动的舞蹈店预约模板，提供全方位的智能服务',
        image: '/static/images/project2.png',
        tags: ['Vue3', 'uniapp']
    },
    // 更多项目...
])

const goToProject = (project) => {
    // 检查是否为http(s)链接
    const isHttpLink = /^https?:\/\//.test(project.path)
    
    if (!isHttpLink) {
        uni.navigateTo({
            url: project.path
        })
        return
    }
    
    // #ifdef H5
    window.open(project.path)
    // #endif
    
    // #ifdef MP-WEIXIN
    uni.setClipboardData({
        data: project.path,
        success: () => {
            uni.showToast({
                title: '链接已复制',
                icon: 'none'
            })
        }
    })
    // #endif
}

const sendEmail = () => {
    // 实现发送邮件逻辑
}

const openGithub = () => {
    // 实现打开项目链接逻辑
}

// 主题列表
const themes = [
    { label: '默认紫', value: 'default', gradient: 'linear-gradient(135deg, #7C3AED, #4F46E5)' },
    { label: '清新蓝', value: 'blue', gradient: 'linear-gradient(135deg, #0EA5E9, #2563EB)' },
    { label: '自然绿', value: 'green', gradient: 'linear-gradient(135deg, #10B981, #059669)' },
    { label: '活力红', value: 'red', gradient: 'linear-gradient(135deg, #EF4444, #DC2626)' }
]

// 显示主题选择器
const showThemePicker = () => {
    themePopup.value.open()
}

// 选择主题
const selectTheme = (theme: string) => {
    currentTheme.value = theme
    // 保存主题到本地存储
    uni.setStorageSync('theme', theme)
    themePopup.value.close()
}

// 初始化主题
onMounted(() => {
    const savedTheme = uni.getStorageSync('theme')
    if (savedTheme) {
        currentTheme.value = savedTheme
    }
})

// 添加预览二维码方法
const previewQRCode = () => {
    uni.previewImage({
        urls: [wechatQunQr.value]
    })
}
getCompanyDetail()

const wechatPopup = ref(null)

// 显示微信二维码
const showWechatQR = () => {
    wechatPopup.value.open()
}

const openLink = () => {
    const githubUrl = 'https://ext.dcloud.net.cn/plugin?id=21066'
    
    // #ifdef H5
    window.open(githubUrl)
    // #endif
    
    // #ifdef MP-WEIXIN
    uni.setClipboardData({
        data: githubUrl,
        success: () => {
            uni.showToast({
                title: '链接已复制',
                icon: 'none'
            })
        }
    })
    // #endif
}
</script>

<style lang="scss">
.container {
    min-height: 100vh;


    // 添加主题背景色
    &.theme-default {
        background: linear-gradient(135deg, rgba(124, 58, 237, 0.05), rgba(79, 70, 229, 0.05));

        .nav-bar {
            background: linear-gradient(to bottom, rgba(124, 58, 237, 0.1), rgba(124, 58, 237, 0.05));
        }

        .logo,
        .title {
            background: var(--theme-gradient);
            -webkit-background-clip: text;
        }
    }

    &.theme-blue {
        background: linear-gradient(135deg, rgba(14, 165, 233, 0.05), rgba(37, 99, 235, 0.05));

        .nav-bar {
            background: linear-gradient(to bottom, rgba(14, 165, 233, 0.1), rgba(14, 165, 233, 0.05));
        }

        .logo,
        .title {
            background: var(--theme-gradient);
            -webkit-background-clip: text;
        }
    }

    &.theme-green {
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(5, 150, 105, 0.05));

        .nav-bar {
            background: linear-gradient(to bottom, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05));
        }

        .logo,
        .title {
            background: var(--theme-gradient);
            -webkit-background-clip: text;
        }
    }

    &.theme-red {
        background: linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(220, 38, 38, 0.05));

        .nav-bar {
            background: linear-gradient(to bottom, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05));
        }

        .logo,
        .title {
            background: var(--theme-gradient);
            -webkit-background-clip: text;
        }
    }

    // 导航栏样式
    .nav-bar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        backdrop-filter: blur(10px);

        .nav-content {
            height: 88rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 40rpx;

            .logo {
                font-size: 36rpx;
                font-weight: 600;
                background: linear-gradient(to right, #333, #666);
                -webkit-background-clip: text;
                color: transparent;
            }
        }
    }

    // 头部区域样式
    .hero-section {
        padding: 60rpx 40rpx;

        .hero-content {
            text-align: center;

            .title {
                font-size: 48rpx;
                font-weight: 700;
                margin-bottom: 20rpx;
                background: linear-gradient(to right, #333, #666);
                -webkit-background-clip: text;
                color: transparent;
            }

            .subtitle {
                font-size: 28rpx;
                color: #666;
                margin-bottom: 40rpx;
            }

            .stats {
                display: flex;
                justify-content: center;
                gap: 60rpx;

                .stat-item {
                    text-align: center;

                    .count {
                        font-size: 40rpx;
                        font-weight: 600;
                        color: var(--theme-color);
                    }

                    .label {
                        font-size: 24rpx;
                        color: #666;
                        margin-top: 8rpx;
                    }
                }
            }
        }
    }

    // 项目列表样式
    .projects-section {
        padding: 40rpx;

        .section-header {
            text-align: center;
            margin-bottom: 40rpx;

            .section-title {
                font-size: 36rpx;
                font-weight: 600;
                margin-bottom: 12rpx;
            }

            .section-subtitle {
                font-size: 26rpx;
                color: #666;
            }
        }

        .project-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 30rpx;

            .project-card {
                border-radius: 24rpx;
                overflow: hidden;
                transition: all 0.3s;

                &:hover {
                    transform: translateY(-6rpx);
                }

                .project-image {
                    width: 100%;
                    height: 300rpx;
                    background: #f5f5f5;
                }

                .project-info {
                    padding: 24rpx;

                    .project-title {
                        font-size: 28rpx;
                        font-weight: 600;
                        margin-bottom: 12rpx;
                    }

                    .project-desc {
                        font-size: 24rpx;
                        color: #666;
                        margin-bottom: 16rpx;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }

                    .project-tags {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 12rpx;

                        .tag {
                            font-size: 22rpx;
                            color: var(--theme-color);
                            background: rgba(var(--theme-rgb), 0.1);
                            padding: 4rpx 16rpx;
                            border-radius: 100rpx;
                        }
                    }
                }
            }
        }
    }

    // 项目地址部分样式
    .projects-links-section {
        padding: 40rpx;
        margin-top: 20rpx;
        
        .section-header {
            text-align: center;
            margin-bottom: 40rpx;
            
            .section-title {
                font-size: 36rpx;
                font-weight: 600;
                margin-bottom: 12rpx;
            }
            
            .section-subtitle {
                font-size: 26rpx;
                color: #666;
            }
        }
        
        .link-card {
            display: flex;
            align-items: center;
            padding: 30rpx;
            border-radius: 24rpx;
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(10px);
            box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.05);
            border: 1rpx solid rgba(255, 255, 255, 0.3);
            transition: all 0.3s;
            
            &:active {
                transform: scale(0.98);
            }
            
            .link-icon {
                width: 80rpx;
                height: 80rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 20rpx;
                background: rgba(var(--theme-rgb), 0.1);
                margin-right: 20rpx;
                
                .icon {
                    font-size: 40rpx;
                }
            }
            
            .link-info {
                flex: 1;
                
                .link-title {
                    font-size: 28rpx;
                    font-weight: 600;
                    color: #333;
                    margin-bottom: 4rpx;
                }
                
                .link-desc {
                    font-size: 24rpx;
                    color: #666;
                }
            }
            
            .arrow {
                font-size: 32rpx;
                color: var(--theme-color);
                margin-left: 20rpx;
            }
        }
    }

    // 联系区域样式
    .contact-section {
        padding: 60rpx 40rpx;
        text-align: center;

        .contact-title {
            font-size: 36rpx;
            font-weight: 600;
            margin-bottom: 40rpx;
        }

        .contact-buttons {
            display: flex;
            justify-content: center;
            gap: 30rpx;
            margin-top: 30rpx;

            .contact-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 12rpx;
                padding: 20rpx 40rpx;
                border-radius: 100rpx;
                font-size: 28rpx;
                transition: all 0.3s;

                &.email-btn {
                    background: var(--theme-gradient);
                    color: #fff;
                }

                &.github-btn {
                    background: rgba(0, 0, 0, 0.05);
                    color: #333;
                }

                &:active {
                    transform: scale(0.95);
                }
            }
        }
    }
}

// 动画类
.animate-slide-up {
    animation: slideUp 0.8s ease-out;
}

.animate-fade-in {
    animation: fadeIn 1s ease-out;
}

.animate-scale-up {
    animation: scaleUp 0.6s ease-out;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30rpx);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes scaleUp {
    from {
        opacity: 0;
        transform: scale(0.9);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

// 主题相关样式
.theme-default {
    --theme-color: #7C3AED;
    --theme-rgb: 124, 58, 237;
    --theme-gradient: linear-gradient(135deg, #7C3AED, #4F46E5);
}

.theme-blue {
    --theme-color: #0EA5E9;
    --theme-rgb: 14, 165, 233;
    --theme-gradient: linear-gradient(135deg, #0EA5E9, #2563EB);
}

.theme-green {
    --theme-color: #10B981;
    --theme-rgb: 16, 185, 129;
    --theme-gradient: linear-gradient(135deg, #10B981, #059669);
}

.theme-red {
    --theme-color: #EF4444;
    --theme-rgb: 239, 68, 68;
    --theme-gradient: linear-gradient(135deg, #EF4444, #DC2626);
}

// 添加主题选择弹窗样式
.theme-popup {
    background: #fff;
    border-radius: 24rpx 24rpx 0 0;
    overflow: hidden;

    .popup-header {
        padding: 30rpx;
        text-align: center;
        border-bottom: 1rpx solid #eee;

        .title {
            font-size: 32rpx;
            font-weight: 500;
        }
    }

    .popup-content {
        padding: 30rpx;

        .theme-list {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20rpx;

            .theme-item {
                display: flex;
                align-items: center;
                gap: 16rpx;
                padding: 20rpx;
                border-radius: 16rpx;
                border: 2rpx solid transparent;
                transition: all 0.3s;

                &.active {
                    background: #f5f5f5;
                    border-color: var(--theme-color);
                }

                .color-preview {
                    width: 40rpx;
                    height: 40rpx;
                    border-radius: 50%;
                }

                .theme-name {
                    font-size: 28rpx;
                    color: #333;
                }
            }
        }
    }
}

 // 优化卡片样式
 .project-card {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.05);
    border: 1rpx solid rgba(255, 255, 255, 0.3);
    
    &:hover {
      transform: translateY(-6rpx);
      box-shadow: 0 12rpx 36rpx rgba(var(--theme-rgb), 0.1);
    }
  }

  // 优化联系按钮
  .contact-btn {
    &.email-btn {
      background: var(--theme-gradient);
      box-shadow: 0 4rpx 12rpx rgba(var(--theme-rgb), 0.2);
    }
    
    &.github-btn {
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
      border: 1rpx solid rgba(0, 0, 0, 0.1);
    }
  }

// 优化主题选择器
.theme-popup {
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.9);
  
  .theme-item {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border: 1rpx solid rgba(255, 255, 255, 0.3);
    
    &.active {
      background: rgba(var(--theme-rgb), 0.1);
      border-color: var(--theme-color);
    }
  }
}

// 添加微信群区域样式
.wechat-section {
    padding: 60rpx 40rpx;
    margin-top: 40rpx;
    text-align: center;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border-radius: 24rpx;
    
    .section-title {
        font-size: 36rpx;
        font-weight: 600;
        margin-bottom: 12rpx;
        color: var(--theme-color);
    }
    
    .section-subtitle {
        font-size: 26rpx;
        color: #666;
        margin-bottom: 40rpx;
    }
    
    .qrcode-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 30rpx;
        margin-top: 30rpx;
        
        .qrcode {
            width: 300rpx;
            height: 300rpx;
            background: #fff;
            padding: 20rpx;
            border-radius: 24rpx;
            box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
        }
        
        .tip {
            font-size: 24rpx;
            color: #999;
            margin-top: 16rpx;
        }
    }
    
    .group-info {
        display: flex;
        justify-content: center;
        gap: 40rpx;
        
        .info-item {
            display: flex;
            align-items: center;
            gap: 8rpx;
            font-size: 26rpx;
            color: #666;
            
            .icon {
                font-size: 28rpx;
            }
        }
    }
}

.qr-popup {
    background: #fff;
    padding: 40rpx;
    border-radius: 24rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .qr-code {
        width: 400rpx;
        height: 400rpx;
        background: #f5f5f5;
    }
    
    .qr-tip {
        margin-top: 20rpx;
        font-size: 28rpx;
        color: #666;
    }
}
</style>
