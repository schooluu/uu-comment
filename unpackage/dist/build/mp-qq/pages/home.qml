<view class="{{['container', o]}}"><view class="nav-bar" style="{{'padding-top:' + b}}"><view class="nav-content"><text class="logo">Portfolio</text><view class="nav-right"><view class="theme-btn" bindtap="{{a}}"><text class="icon">🎨</text></view></view></view></view><view class="hero-section" style="{{'padding-top:' + c}}"><view class="hero-content animate-slide-up"><text class="title">项目模板展示</text><text class="subtitle">探索独特的创意与技术结合</text><view class="stats"><view class="stat-item"><text class="count">10+</text><text class="label">模板</text></view><view class="stat-item"><text class="count">1000+</text><text class="label">用户</text></view><view class="stat-item"><text class="count">5.0</text><text class="label">评分</text></view></view></view></view><view class="projects-section"><view class="section-header animate-fade-in"><text class="section-title">精选项目</text><text class="section-subtitle">探索我们的最新作品</text></view><view class="project-grid"><view qq:for="{{d}}" qq:for-item="project" qq:key="e" class="project-card glass-effect animate-scale-up" style="{{'animation-delay:' + project.f}}" bindtap="{{project.g}}"><image class="project-image" src="{{project.a}}" mode="aspectFill"/><view class="project-info"><text class="project-title">{{project.b}}</text><text class="project-desc">{{project.c}}</text><view class="project-tags"><text qq:for="{{project.d}}" qq:for-item="tag" qq:key="b" class="tag">{{tag.a}}</text></view></view></view></view></view><view class="projects-links-section animate-fade-in"><view class="section-header"><text class="section-title">项目地址</text><text class="section-subtitle">开源代码</text></view><view class="link-card glass-effect" bindtap="{{e}}"><view class="link-icon"><text class="icon">📦</text></view><view class="link-info"><text class="link-title">UNIAPP</text><text class="link-desc">查看源代码</text></view><text class="arrow">→</text></view></view><view class="contact-section animate-fade-in"><text class="contact-title">需要定制开发？</text><text class="contact-subtitle">我们提供专业的技术支持和定制服务</text><view class="contact-buttons"><button class="contact-btn email-btn" bindtap="{{f}}"><text class="icon">👋</text><text>加我微信</text></button></view></view><uni-popup qq:if="{{i}}" class="r" u-s="{{['d']}}" u-r="themePopup" u-i="0aba3985-0" bind:__l="__l" u-p="{{i}}"><view class="theme-popup"><view class="popup-header"><text class="title">选择主题</text></view><view class="popup-content"><view class="theme-list"><view qq:for="{{g}}" qq:for-item="theme" qq:key="c" class="{{['theme-item', theme.d && 'active']}}" bindtap="{{theme.e}}"><view class="color-preview" style="{{'background:' + theme.a}}"></view><text class="theme-name">{{theme.b}}</text></view></view></view></view></uni-popup><view class="wechat-section animate-fade-in"><text class="section-title">加入微信群</text><text class="section-subtitle">与开发者和其他用户交流</text><view class="qrcode-container"><image class="qrcode" src="{{j}}" mode="aspectFit" bindtap="{{k}}"/><text class="tip">点击二维码放大查看</text></view><view class="group-info"><text class="info-item"><text class="icon">👥</text><text>当前群成员: 500+</text></text><text class="info-item"><text class="icon">🔥</text><text>日活跃: 200+</text></text></view></view><uni-popup qq:if="{{n}}" class="r" u-s="{{['d']}}" u-r="wechatPopup" u-i="0aba3985-1" bind:__l="__l" u-p="{{n}}"><view class="qr-popup"><image class="qr-code" src="{{l}}" mode="aspectFit"/><text class="qr-tip">扫码加微信</text></view></uni-popup></view>