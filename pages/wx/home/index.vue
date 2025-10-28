<template>
  <view :class="['moments-container', themeClass, { 'disclaimer-hidden': !showDisclaimer }]">

    <!-- 免责声明顶部横幅 -->
    <view class="disclaimer-banner" v-if="showDisclaimer">
      <view class="disclaimer-banner-content">
        <view class="disclaimer-banner-left">
          <text class="disclaimer-banner-icon">⚠️</text>
          <text class="disclaimer-banner-text">
            本网站仅供编程学习交流使用，非商业网站，所有内容均为学习演示，真实性无法保证。请理性对待，切勿轻信。严禁发布违法违规内容，用户需对发布内容负责。
          </text>
        </view>
        <view class="disclaimer-banner-right">
          <text class="disclaimer-banner-timer">{{ countdown }}s</text>
          <text class="disclaimer-banner-close" @tap="closeDisclaimer">✕</text>
        </view>
      </view>
    </view>

    <!-- 顶部背景与Figma风格头部 -->
    <view class="header">
      <image class="bg-image" :src="headerBg" mode="aspectFill" :style="{ transform: `translateY(${parallaxY}px) scale(1.06)` }"></image>
      <view class="header-gradient"></view>
      <view class="header-blur"></view>
      <view class="header-glow"></view>

      <view class="header-topbar">
        <text class="brand">匿名圈</text>
        <view class="top-actions">
          <text class="top-icon" @tap="handleSettings">⋯</text>
        </view>
      </view>

      <view class="hero-card">
        <image class="hero-avatar" :src="defaultAvatar" mode="aspectFill" />
        <view class="hero-text">
          <text class="hero-title">{{ todayMood }}</text>
          <text class="hero-sub">匿名 · 温暖 · 真实</text>
          <view class="hero-chips">
            <text class="chip active">推荐</text>
            <text class="chip">关注</text>
            <text class="chip">附近</text>
          </view>
        </view>
      </view>
      
      <!-- 悬浮按钮 -->
      <view class="floating-btn" @tap="handleCamera">
        <view class="floating-btn-pulse"></view>
        <view class="floating-btn-inner">
        <image class="floating-btn-icon" src="https://img.icons8.com/fluency/48/plus.png" mode="aspectFit" />
        </view>
        <text class="floating-btn-label">发布</text>
      </view>
    </view>

    <!-- 精选照片 -->
    <view class="photo-showcase" v-if="photoShowcase.length">
      <view class="ps-header">
        <text class="ps-title">最美照片</text>
        <text class="ps-action" @tap="shufflePhotos">换一换</text>
      </view>
      <view class="ps-row">
        <view class="ps-item" v-for="(p, i) in photoShowcase" :key="i" @tap="previewPhoto(i)">
          <image class="ps-img" :src="p.url" mode="aspectFill" />
          <view class="ps-overlay">
            <view class="ps-cap">
              <text class="ps-emoji">{{ p.emoji }}</text>
              <text class="ps-text">{{ p.caption }}</text>
            </view>
            <text class="ps-like">❤ {{ formatCount(p.likes) }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 直播模块 -->
    <view class="live-section" v-if="liveStream.isLive">

    
      <view class="live-video-wrapper">
        <!-- 使用 FlvPlayer 组件支持 FLV 格式 -->
        <FlvPlayer 
          :src="liveStream.url" 
          :autoplay="true"
          :muted="liveStream.muted"
          :controls="true"
          @error="handleLiveError"
          @play="handleLivePlay"
        />
        
        <!-- 音量控制按钮 -->
        <view class="live-mute-btn" @tap="toggleMute" v-if="liveStream.muted">
          <text class="mute-icon">🔇</text>
          <text class="mute-text">点击开启声音</text>
        </view>
        
        <!-- 切换源按钮 -->
        <view class="live-switch-btn" @tap="switchLiveSource">

          <text class="switch-text">切换源</text>
        </view>
      
      </view>
    </view>

    <!-- 朋友圈内容列表 -->
    <view class="moments-list">
      <view class="moment-item" v-for="(item, index) in moments" :key="index">
        <!-- 用户信息 -->
        <image class="user-avatar avatar-glow" :src="item.avatar" mode="aspectFill"></image>
        <view class="content-area">
          <view class="meta-row">
            <text class="username">{{ item.username }}</text>
           
          </view>
          <view class="chip-row">
            <text class="chip">匿名</text>
            <text v-if="item.mediaType" class="chip ghost">图文</text>
          </view>
          <!-- 文本内容（可展开/收起） -->
          <view class="text-block" :class="{ clamped: !isExpanded[index] }">
            <text class="text-content">{{ item.content }}</text>
          </view>
          <view v-if="item.content && item.content.length > 60" class="expand-btn" @tap="toggleExpand(index)">
            {{ isExpanded[index] ? '收起' : '展开' }}
          </view>
          <!-- 图片/视频内容 -->
          <view class="media-content" v-if="item.mediaType">
            <video v-if="item.mediaType === 'video'" :src="item.mediaUrl" :poster="item.poster"
              class="video-content video-radius" controls show-center-play-btn enable-play-gesture show-fullscreen-btn
              show-play-btn object-fit="contain" @error="handleVideoError"></video>
            <view v-else-if="item.mediaType === 'image'" :class="['image-gallery', `columns-${item.mediaUrls.length}`]">
              <image v-for="(url, imgIndex) in item.mediaUrls" :key="imgIndex" :src="url" mode="aspectFill"
                class="image-content image-radius" @tap="previewImage(item.mediaUrls, url)"></image>
            </view>
            <!-- 浏览量 / 热度 小徽标 -->
            <view class="media-badges">
              <view class="badge ghost">
                <text class="b-ic">🔥</text>
                <text class="b-txt">{{ formatCount(getHeatScore(item)) }}</text>
              </view>
            </view>
          </view>
          <!-- 底部信息 -->
          <view class="bottom-info">
            <text class="time">{{ item.time }}</text>
            <view class="actions">
              <view class="action-btn like-btn" :class="{ 'liked': item.isLiked, 'animating': isLikeAnimating[index] }"
                @tap="handleLike(index)">
                <text class="icon iconfont">{{ item.isLiked ? '❤️' : '🤍' }}</text>
                <text class="action-text">{{ item.isLiked ? '已赞' : '点赞' }}</text>
                <text class="action-count">{{ (item.likes && item.likes.length) || 0 }}</text>
                <view v-if="isLikeAnimating[index]" class="like-burst-particles">
                  <view v-for="n in 8" :key="n" :class="['particle', 'p' + n]"></view>
                </view>
              </view>
              <view class="action-btn comment-btn" @tap="handleComment(index)">
                <text class="icon iconfont">💬</text>
                <text class="action-text">评论</text>
                <text class="action-count">{{ (item.comments && item.comments.length) || 0 }}</text>
              </view>
              <view class="action-btn report-btn" @tap="handleReport(index)">
                <text class="icon iconfont">🚨</text>
                <text class="action-text">举报</text>
              </view>
            </view>
          </view>
          <!-- 点赞列表 -->
          <view class="likes-section" v-if="item.likes && item.likes.length">
            <text class="like-users">{{ item.likes.join('、') }}</text>
          </view>
          <!-- 联系方式展示 -->
          <view class="contact-section" v-if="item.contactValue">
            <text class="contact-icon">📞</text>
            <text class="contact-text">{{ contactLabel(item.contactType) }}：{{ item.contactValue }}</text>
          </view>
          <!-- 评分选项展示 -->
          <view class="rating-section" v-if="item.ratingType">
            <view class="rating-header">
              <text class="rating-icon">⭐</text>
              <text class="rating-title">{{ ratingTypeLabel(item.ratingType) }}</text>
              <text class="rating-range">({{ item.ratingMin }}-{{ item.ratingMax }}分)</text>
            </view>
            <view class="rating-stats" v-if="item.ratingStats">
              <view class="rating-avg">
                <text class="avg-score">{{ item.ratingStats.average.toFixed(1) }}</text>
                <text class="avg-label">平均分</text>
              </view>
              <view class="rating-count">
                <text class="count-num">{{ item.ratingStats.count }}</text>
                <text class="count-label">人评分</text>
              </view>
            </view>
            <view class="rating-actions">
              <view class="rating-btn" @tap="showRatingModal(index)">
                <text class="rating-btn-icon">⭐</text>
                <text class="rating-btn-text">评分</text>
              </view>
              <view class="rating-btn" @tap="viewRatingDetails(index)">
                <text class="rating-btn-icon">📊</text>
                <text class="rating-btn-text">详情</text>
              </view>
            </view>
          </view>
          <!-- 评论列表 -->
          <view class="comments-section" v-if="item.comments && item.comments.length !== 0">
            <view class="comment-item" :class="{ 'new-comment': comment.isNew }" v-for="(comment, cIndex) in item.comments" :key="cIndex">
              <image class="comment-anon-icon" :src="comment.avatar || anonymousAvatar" />
              <view class="comment-content-wrapper">
                <view class="comment-text-line">
              <text class="comment-user">{{ comment.username }}：</text>
              <text class="comment-content">{{ comment.content }}</text>
                </view>
                <!-- 评论图片 -->
                <view class="comment-images" v-if="comment.images && comment.images.length > 0">
                  <image 
                    v-for="(img, imgIdx) in comment.images" 
                    :key="imgIdx" 
                    :src="img" 
                    mode="aspectFill" 
                    class="comment-image"
                    @tap="previewImage(comment.images, img)"
                  />
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="more-btn" @tap="handleMore(index)">⋯</view>
      </view>
    </view>
    <!-- 评论弹窗 -->
    <view class="comment-popup" v-if="showCommentPopup" @tap="closeCommentPopup">
      <view class="comment-box animated-popup" @tap.stop>
        <!-- 评论输入区域 -->
        <view class="comment-input-area">
          <input class="comment-input" v-model="commentText" placeholder="@匿名用户 说点什么..." :focus="showCommentPopup"
            @confirm="submitComment" />
          <!-- 评论图片预览 -->
          <view class="comment-images-preview" v-if="commentImages.length > 0">
            <view class="comment-preview-item" v-for="(img, idx) in commentImages" :key="idx">
              <image :src="img" mode="aspectFill" class="comment-preview-img" />
              <text class="comment-preview-delete" @tap="deleteCommentImage(idx)">✕</text>
            </view>
          </view>
          <view class="toolbar">
            <view class="toolbar-left">
              <view class="toolbar-icon emoji-btn" @tap="toggleEmojiPanel">
                <text class="icon-emoji">😊</text>
              </view>
              <view class="toolbar-icon image-btn" @tap="chooseCommentImage">
                <view class="icon-wrapper">
                  <text class="icon-camera">📸</text>
                </view>
                <text class="icon-label" v-if="commentImages.length > 0">{{ commentImages.length }}</text>
              </view>
            </view>
            <button 
              class="submit-btn" 
              :class="{ active: commentText.trim() || commentImages.length > 0 }" 
              @tap="submitComment">发送</button>
          </view>
        </view>
        <!-- 表情面板 -->
        <view class="emoji-panel" v-if="showEmojiPanel">
          <scroll-view scroll-y class="emoji-list">
            <view class="emoji-group">
              <text v-for="(emoji, index) in emojiList" :key="index" class="emoji-item" @tap="insertEmoji(emoji)">{{
                emoji }}</text>
            </view>
          </scroll-view>
        </view>
      </view>
    </view>
    
  
    
    <!-- <view class="publish-btn" @tap="handleCamera">
      <view class="icon-wrapper">
        <text class="iconfont">+</text>
      </view>
    </view> -->
    <!-- 科技感加载动画 -->
    <!-- <view class="tech-loading" v-if="loading">
      <view class="dot" v-for="i in 4" :key="i"></view>
      <text class="loading-text">加载中...</text>
    </view> -->


  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { nextTick } from 'vue'
import {
  onShow,
  onReachBottom,
  onPullDownRefresh,
  onPageScroll,
  onHide,
  onUnload
} from '@dcloudio/uni-app';
import FlvPlayer from '@/components/common/FlvPlayer.vue';
// 匿名昵称池
const anonymousNames = [
  '星河旅人', '夏日微风', '蓝莓汽水', '橙子汽球', '夜空守望', '晨曦微光', '云端漫步', '月下独行',
  '白茶清欢', '青柠时光', '温柔星球', '晴空万里', '风中诗人', '海盐冰沙', '山野听风', '橘子海岸',
  '银河信使', '微光拾梦', '晚风邮差', '雾里看花', '森林之心', '雨后初晴', '云朵收集者', '夏夜萤火'
]
function getRandomName() {
  return anonymousNames[Math.floor(Math.random() * anonymousNames.length)]
}
// 匿名头像（随机池 - 50个）
const anonymousAvatars = [
  'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1541271696563-3be2f555fc4e?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1516822003754-cca485356ecb?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1542202229-7d93c33f5d07?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1546961329-78bef0414d7c?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1558898479-33c0057a5d12?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1522556189639-b150ed9c4330?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1506919258185-6078bba55d2a?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1545996124-0501ebae84d0?auto=format&fit=crop&w=256&q=60',
  'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?auto=format&fit=crop&w=256&q=60'
]
const anonymousAvatar = anonymousAvatars[Math.floor(Math.random() * anonymousAvatars.length)];
// 生活化美女照片池（用于背景与精选补位）
const cnBeautyPool = [
  'https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80'
]
// 首屏背景图列表（随机挑选一张）
const headerBgList = cnBeautyPool
const headerBg = headerBgList[Math.floor(Math.random() * headerBgList.length)]; // 随机中国风美女/生活感背景
const defaultAvatar = anonymousAvatar
// 今日心情文案
const moodList = [
  '今天也要元气满满！',
  '匿名分享，轻松自在~',
  '每一天都值得记录。',
  '用心感受生活的美好。',
  '科技让匿名更温暖。',
  '世界很大，心情很美。',
  '做自己的小太阳 ☀️',
  '匿名不孤单，温暖在身边。',
  '记录此刻，遇见更好的自己。',
  '保持好奇，保持热爱！'
]
const todayMood = moodList[Math.floor(Math.random() * moodList.length)]
// 动态宣言文案池
const sloganList = [
  '匿名树洞 · 美好生活',
  '用温柔治愈世界',
  '每一天都值得记录',
  '让心情自由流动',
  '科技让温暖发生',
  '在这里遇见美好',
  '分享你的故事',
  '做自己的小太阳',
  '世界很大，温暖很近',
  '用匿名守护真心'
]
const currentSlogan = ref(sloganList[0])
let sloganIndex = 0
// 顶部宣言打字机动画
const typedSlogan = ref('')
const showCursor = ref(true)
let typingTimer = null
let sloganTypingIndex = 0
let charIndex = 0

// 默认主题色
const defaultPrimaryColor = '#667eea'
const defaultPrimaryGradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
function startTypingSlogan() {
  clearTimeout(typingTimer)
  const slogan = sloganList[sloganTypingIndex]
  typedSlogan.value = ''
  charIndex = 0
  function typeChar() {
    if (charIndex <= slogan.length) {
      typedSlogan.value = slogan.slice(0, charIndex)
      charIndex++
      typingTimer = setTimeout(typeChar, 60)
    } else {
      // 停留一段时间后切换下一个
      setTimeout(() => {
        sloganTypingIndex = (sloganTypingIndex + 1) % sloganList.length
        startTypingSlogan()
      }, 1800)
    }
  }
  typeChar()
}
onMounted(() => {
  startTypingSlogan()
  setInterval(() => { showCursor.value = !showCursor.value }, 500)
  // 启动免责声明倒计时
  startCountdown()
})

// 组件卸载时清除定时器
onUnmounted(() => {
  if (typingTimer) {
    clearTimeout(typingTimer)
  }
})
// 评论相关的响应式变量
const showCommentPopup = ref(false)
const showEmojiPanel = ref(false)
const commentText = ref('')
const commentImages = ref([])
const currentMomentIndex = ref(-1)
const isLikeAnimating = ref({})
// 分页相关变量
const page = ref(1)
const pageSize = ref(10)
const loading = ref(false)
const hasMore = ref(true)
const moments = ref([])

// 直播相关数据
const liveStream = ref({
  isLive: true,
  // FLV 格式直播流地址（使用 flv.js 播放器支持）
  url: 'https://f17aaf1317136366be2504096b9f92c6.v.smtcdns.net/pull-flv-f11.douyincdn.com/media/stream-118197556637860524_sd.flv?arch_hrchy=w1&exp_hrchy=w1&expire=1762265422&major_anchor_level=common&sign=f4175b289cb11110b19c622aa4c4f0a3&t_id=037-202510282210212F7A436DA68FDB24CF34-PXvUSV&unique_id=stream-118197556637860524_684_flv_sd&_session_id=874-202510282210226191716457F92E2E8546.1761660622619.61134&rsi=0&abr_pts=-800&tencent_test_client_ip=60.171.111.194&dispatch_from=OC_MGR220.180.244.116&utime=1761660658295&TxDispType=7&txTliveMsg=S5;TZ_EIC1LT;TZ_EIC1LT;',
  title: '抖音 FLV 直播',
  host: '抖音直播',
  viewerCount: 12580,
  muted: false, // 默认不静音，如果自动播放失败可以设为true
  // 备用直播源（支持 FLV 和 m3u8 格式）
  alternativeUrls: [
    'https://58a4c32cd699cb31aa5b89b77e020d6f.v.smtcdns.net/pull-flv-f11.douyincdn.com/media/stream-406441391741469356_sd.flv?arch_hrchy=w1&exp_hrchy=w1&expire=1762265553&major_anchor_level=common&sign=b2bc913a7598aa405bcf7267ba32746e&t_id=037-202510282212337F2D489521D1A425D011-eRzJth&unique_id=stream-406441391741469356_684_flv_sd&_session_id=764-20251028221234812965803771E56CB11.1761660754081.82275&rsi=0&abr_pts=-800&tencent_test_client_ip=60.171.111.194&dispatch_from=OC_MGR220.180.244.116&utime=1761660762208&TxDispType=7&txTliveMsg=S5;QZ_EIC5;QZ_EIC5;',
    'https://pull-flv-f26.douyincdn.com/media/stream-694555860336116396_sd.flv?arch_hrchy=w1&exp_hrchy=w1&expire=690a0a2e&major_anchor_level=common&sign=cd524f72dd5f86c4fceb3782bb6dc505&t_id=037-2025102822140673FAFEFD730E6D25EFDB-jaIZjj&unique_id=stream-694555860336116396_684_flv_sd&_session_id=504-202510282214068862868643E0D5709526.1761660846886.74324&rsi=0&abr_pts=-800'

  ]
})
const handleLogin = () => {
  uni.navigateTo({
    url: '/pages/wx/login/login'
  })
}

// 直播相关方法
let currentUrlIndex = 0

const handleLiveError = (e) => {

  
  // 尝试切换到备用源
  if (liveStream.value.alternativeUrls && currentUrlIndex < liveStream.value.alternativeUrls.length - 1) {
    currentUrlIndex++
    liveStream.value.url = liveStream.value.alternativeUrls[currentUrlIndex]
    
    uni.showToast({
      title: `切换到备用源${currentUrlIndex + 1}`,
      icon: 'none',
      duration: 1500
    })
  } else {
    // 所有源都失败了
    uni.showModal({
      title: '直播加载失败',
      content: '无法加载直播流，请检查网络连接或联系管理员。\n\n提示：blob:// 协议的URL无法在移动端使用，需要使用 http/https 的流媒体地址（如 .m3u8）',
      showCancel: false,
      confirmText: '知道了'
    })
    
    // 可以选择隐藏直播模块
    // liveStream.value.isLive = false
  }
}

const handleLivePlay = () => {

  // 重置备用源索引
  currentUrlIndex = liveStream.value.alternativeUrls.findIndex(url => url === liveStream.value.url)
  if (currentUrlIndex === -1) currentUrlIndex = 0
}

// 切换静音/取消静音
const toggleMute = () => {
  liveStream.value.muted = !liveStream.value.muted
  uni.showToast({
    title: liveStream.value.muted ? '已静音' : '已开启声音',
    icon: 'none',
    duration: 1000
  })
}

// 切换直播源
const switchLiveSource = () => {
  if (liveStream.value.alternativeUrls && liveStream.value.alternativeUrls.length > 0) {
    currentUrlIndex = (currentUrlIndex + 1) % liveStream.value.alternativeUrls.length
    liveStream.value.url = liveStream.value.alternativeUrls[currentUrlIndex]
    
    liveStream.value.title = sourceNames[currentUrlIndex] || `直播源${currentUrlIndex + 1}`
    
 
  }
}

// 获取朋友圈列表
const getMomentsList = async (isRefresh = false) => {
  if (loading.value || (!hasMore.value && !isRefresh)) return

  try {
    loading.value = true

    // 添加最小加载时间，确保动画效果显示
    const minLoadTime = new Promise(resolve => setTimeout(resolve, 800))

    const [{ result }] = await Promise.all([
      uniCloud.callFunction({
        name: 'wx_get_list',
        data: {
          page: isRefresh ? 1 : page.value,
          pageSize: pageSize.value
        }
      }),
      minLoadTime
    ])

    if (result.code === 0) {
    
      
      // 匿名处理：每条动态与评论分配随机昵称与随机头像
      const list = result.data.list.map(item => {
       
       
        
        return {
        ...item,
        username: getRandomName(),
        avatar: anonymousAvatars[Math.floor(Math.random() * anonymousAvatars.length)],
          comments: (item.comments || []).map(c => {
            
            return {
          ...c,
              images: c.images || [],  // 明确保留images字段
          username: getRandomName(),
          avatar: anonymousAvatars[Math.floor(Math.random() * anonymousAvatars.length)]
            }
          }),
        likes: (item.likes || []).map(() => getRandomName())
        }
      })

      if (isRefresh) {
        // 刷新：重置为第一页数据，并把下一页准备为第2页，避免重复请求第1页
        moments.value = list
        page.value = 2
      } else {
        // 追加：根据 _id 去重，避免后端分页交叠导致重复
        const existingIds = new Set((moments.value || []).map(i => i._id))
        const append = list.filter(i => !existingIds.has(i._id))
        moments.value = [...(moments.value || []), ...append]
        page.value++
      }
      hasMore.value = result.data.hasMore
      // 列表更新后重建精选照片（仅使用动态中的图片）
      try { rebuildPhotoShowcase() } catch (_) {}
    } else {
      throw new Error(result.msg)
    }
  } catch (error) {
    uni.showToast({
      title: error.message || '获取朋友圈失败',
      icon: 'none'
    })
  } finally {
    loading.value = false
    if (isRefresh) {
      uni.stopPullDownRefresh()
    }
  }
}

onShow(() => {
  getMomentsList(true)
  
  // 3秒后自动获取列表（刷新）
  setTimeout(() => {
    getMomentsList(true)
  }, 33000)
  // 尝试自动播放背景音乐（静音启动，随后淡入）
  tryAutoPlay()
})

onHide(() => {
  pauseBgm()
})

onUnload(() => {
  pauseBgm()
})
// 触底加载
onReachBottom(() => {
  if (!loading.value && hasMore.value) {
    getMomentsList()
  }
})

// 点赞/取消点赞
const handleLike = async (index) => {
  try {
    const moment = moments.value[index]
    isLikeAnimating.value[index] = true

    const { result } = await uniCloud.callFunction({
      name: 'wx_add_toggle_like',
      data: {
        momentId: moment._id
      }
    })

    if (result.code === 0) {
      moment.isLiked = result.data.isLiked
      // 更新点赞状态
      if (moment.isLiked) {
        if (!moment.likes) moment.likes = []
        moment.likes.push(getRandomName())
      } else {
        moment.likes.pop()
      }
    } else {
      throw new Error(result.msg)
    }

    setTimeout(() => {
      isLikeAnimating.value[index] = false
    }, 1000)

  } catch (error) {
    uni.showToast({
      title: error.message || '操作失败',
      icon: 'none'
    })
  }
}

// 发表评论
const submitComment = async () => {
  if (!commentText.value.trim() && commentImages.value.length === 0) return

  const tempContent = commentText.value
  const tempImages = [...commentImages.value]
  
  // 先关闭弹窗
  showCommentPopup.value = false
  showEmojiPanel.value = false

  // 清空输入
  commentText.value = ''
  commentImages.value = []

  uni.showLoading({
    title: '发送中...',
    mask: true
  })


  try {
    const { result } = await uniCloud.callFunction({
      name: 'wx_add_comment',
      data: {
        momentId: moments.value[currentMomentIndex.value]._id,
        content: tempContent,
        images: tempImages
      }
    })



    if (result.code === 0) {
      // 更新评论列表 - 立即显示在界面上
      const moment = moments.value[currentMomentIndex.value]
      if (!moment.comments) {
        moment.comments = []
      }
      
      // 生成随机匿名头像和用户名
      const randomAvatar = anonymousAvatars[Math.floor(Math.random() * anonymousAvatars.length)]
      
      moment.comments.push({
        username: getRandomName(),
        avatar: randomAvatar,
        content: tempContent,
        images: tempImages,
        create_time: Date.now(),
        isNew: true  // 标记为新评论，用于动画
      })
      
    
      
      // 500ms后移除新评论标记
      setTimeout(() => {
        const commentIndex = moment.comments.length - 1
        if (moment.comments[commentIndex]) {
          delete moment.comments[commentIndex].isNew
        }
      }, 500)

      uni.hideLoading()
      
      // 显示后端返回的消息
      const successMsg = result.msg || '评论成功'
      uni.showToast({
        title: successMsg,
        icon: 'success',
        duration: 1500
      })
      
  
    } else {
      throw new Error(result.msg || '评论失败')
    }
  } catch (error) {
 
    uni.hideLoading()
    uni.showToast({
      title: error.message || '评论失败',
      icon: 'none',
      duration: 2000
    })
  }
}

// 跳转发布页面
const handleCamera = async () => {
  uni.navigateTo({
    url: '/pages/wx/home/add'
  })
}

// 评论相关方法
const handleComment = (index) => {
  currentMomentIndex.value = index
  showCommentPopup.value = true
}

const closeCommentPopup = () => {
  showCommentPopup.value = false
  showEmojiPanel.value = false
  commentText.value = ''
  commentImages.value = []
  currentMomentIndex.value = -1
}

const toggleEmojiPanel = () => {
  showEmojiPanel.value = !showEmojiPanel.value
}

const insertEmoji = (emoji) => {
  commentText.value += emoji
}

// 选择评论图片
const UPLOAD_URL = 'http://117.72.208.124:40027/api/v1/upload'

const chooseCommentImage = () => {
  if (commentImages.value.length >= 3) {
    uni.showToast({
      title: '最多上传3张图片',
      icon: 'none'
    })
    return
  }
  
  uni.chooseImage({
    count: 3 - commentImages.value.length,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: async (res) => {
      uni.showLoading({
        title: '上传中...'
      })
      
      try {
        const uploadPromises = res.tempFilePaths.map(filePath => {
          return new Promise((resolve, reject) => {
            uni.uploadFile({
              url: UPLOAD_URL,
              filePath: filePath,
              name: 'file',
              success: (uploadRes) => {
                try {
                  const data = JSON.parse(uploadRes.data)
                  if (data.status) {
                    resolve(data.data.links.url)
                  } else {
                    reject(new Error(data.message || '上传失败'))
                  }
                } catch (e) {
                  reject(new Error('解析上传结果失败'))
                }
              },
              fail: (err) => {
                reject(err)
              }
            })
          })
        })
        
        const uploadedUrls = await Promise.all(uploadPromises)
        commentImages.value.push(...uploadedUrls)
        
        uni.hideLoading()
        uni.showToast({
          title: '上传成功',
          icon: 'success'
        })
      } catch (error) {
        uni.hideLoading()
        uni.showToast({
          title: error.message || '上传失败',
          icon: 'none'
        })
      }
    }
  })
}

// 删除评论图片
const deleteCommentImage = (index) => {
  commentImages.value.splice(index, 1)
}

// 图片点击预览
const previewImage = (urls, current) => {
  if (!urls || !urls.length) return
  uni.previewImage({
    urls,
    current
  })
}

// 视频错误处理
const handleVideoError = () => {
  uni.showToast({
    title: '视频加载失败',
    icon: 'none'
  })
}

// 顶部操作
const handleSearch = () => {
  uni.showToast({ title: '搜索即将上线', icon: 'none' })
}
const handleSettings = () => {
  uni.showActionSheet({
    itemList: ['切换主题', '内容偏好', '帮助与反馈'],
    success: (res) => {
      const t = res.tapIndex
      if (t === 0) uni.showToast({ title: '已切换主题', icon: 'none' })
      if (t === 1) uni.showToast({ title: '偏好设置暂未开放', icon: 'none' })
      if (t === 2) uni.showToast({ title: '感谢你的反馈', icon: 'none' })
    }
  })
}

// 头图视差
const parallaxY = ref(0)
onPageScroll((e) => {
  const y = e.scrollTop || 0
  parallaxY.value = Math.min(30, y * 0.2)
})

// 全局主题（晨/昼/夜 - 背景渐变）
const themeClass = ref('theme-day')
const updateThemeByTime = () => {
  const hour = new Date().getHours()
  if (hour >= 6 && hour < 11) themeClass.value = 'theme-morning'
  else if (hour >= 11 && hour < 18) themeClass.value = 'theme-day'
  else themeClass.value = 'theme-night'
}
onMounted(() => {
  updateThemeByTime()
  setInterval(updateThemeByTime, 10 * 60 * 1000) // 每10分钟检查一次
})


// 浏览量/热度（演示计算）
const formatCount = (n) => {
  if (!n && n !== 0) return '0'
  if (n >= 10000) return (n / 10000).toFixed(1).replace(/\.0$/, '') + 'w'
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
  return String(n)
}

const getViews = (item, index) => {
  const base = 120 + (index % 7) * 37
  const mediaFactor = item.mediaType === 'video' ? 1.6 : item.mediaType === 'image' ? 1.2 : 1
  const likes = (item.likes && item.likes.length) || 0
  const comments = (item.comments && item.comments.length) || 0
  return Math.floor(base * mediaFactor + likes * 9 + comments * 7)
}

const getHeatScore = (item) => {
  const likes = (item.likes && item.likes.length) || 0
  const comments = (item.comments && item.comments.length) || 0
  const isVideo = item.mediaType === 'video'
  return Math.floor(likes * 3 + comments * 5 + (isVideo ? 18 : 8))
}

// 分段控制（演示态）
const currentTab = ref('recommend')
const handleTabSelect = (key) => {
  currentTab.value = key
  uni.showToast({ title: key === 'recommend' ? '推荐' : key === 'follow' ? '关注' : '附近', icon: 'none' })
}

// 文本展开/收起（演示）
const isExpanded = ref({})
const toggleExpand = (index) => {
  isExpanded.value[index] = !isExpanded.value[index]
}

// Banner 话题数据
const bannerTopics = ref([
  { tag: '# 精选', title: '今日热聊：匿名也要有态度', sub: '来一条走心的分享吧' },
  { tag: '# 新鲜', title: '你的小确幸，值得被看到', sub: '记录当下，温暖一整天' },
  { tag: '# 附近', title: '发现身边的美好瞬间', sub: '同城热点，马上加入' },
])

const goHotWithParams = (params) => {
  const qs = Object.keys(params || {})
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k] == null ? '' : params[k]))
    .join('&')
  uni.navigateTo({ url: '/pages/wx/photos/add' + (qs ? ('?' + qs) : '') })
}

const handleBannerTap = (t) => {
  goHotWithParams({ tag: t.tag, title: t.title, sub: t.sub })
}

// 更多操作（Figma风格）
const handleMore = (index) => {
  uni.showActionSheet({
    itemList: ['举报', '拉黑', '不感兴趣'],
    success: (res) => {
      const tap = res.tapIndex
      if (tap === 0) {
        uni.showToast({ title: '已收到举报', icon: 'none' })
      } else if (tap === 1) {
        uni.showToast({ title: '已拉黑该用户', icon: 'none' })
      } else if (tap === 2) {
        uni.showToast({ title: '将减少类似内容', icon: 'none' })
      }
    }
  })
}

// 评分相关方法
const showRatingModal = (index) => {
  currentRatingIndex.value = index
  currentRatingItem.value = moments.value[index]
  currentRating.value = 0
  ratingComment.value = ''
  showRatingPopup.value = true
}

const closeRatingPopup = () => {
  showRatingPopup.value = false
  currentRatingItem.value = null
  currentRating.value = 0
  ratingComment.value = ''
  currentRatingIndex.value = -1
}

const setRating = (score) => {
  currentRating.value = score
}

const submitRating = async () => {
  if (currentRating.value === 0) {
    uni.showToast({ title: '请选择评分', icon: 'none' })
    return
  }
  
  try {
    uni.showLoading({ title: '提交中...' })
    
    const { result } = await uniCloud.callFunction({
      name: 'wx_add_rating',
      data: {
        momentId: currentRatingItem.value._id,
        rating: currentRating.value,
        comment: ratingComment.value,
        ratingType: currentRatingItem.value.ratingType
      }
    })
    
    if (result.code === 0) {
      uni.showToast({ title: '评分成功', icon: 'success' })
      // 更新本地数据
      if (!moments.value[currentRatingIndex.value].ratingStats) {
        moments.value[currentRatingIndex.value].ratingStats = { average: 0, count: 0 }
      }
      // 这里可以更新评分统计，实际应该从服务器重新获取
      closeRatingPopup()
    } else {
      throw new Error(result.msg)
    }
  } catch (error) {
    uni.showToast({ title: error.message || '评分失败', icon: 'none' })
  } finally {
    uni.hideLoading()
  }
}

const viewRatingDetails = (index) => {
  const item = moments.value[index]
  uni.showModal({
    title: `${ratingTypeLabel(item.ratingType)}详情`,
    content: `平均分：${item.ratingStats?.average?.toFixed(1) || 0}分\n评分人数：${item.ratingStats?.count || 0}人\n评分范围：${item.ratingMin}-${item.ratingMax}分`,
    showCancel: false
  })
}

// 今日热榜（示例数据）
const hotTopics = ref([
  { text: '# 今天你匿名表白了吗', views: '12.3w', posts: '2.1k', emoji: '💌', badge: '热议', badgeType: 'badge-hot', cta: '参与' },
  { text: '# 城市树洞：你的小烦恼', views: '8.7w', posts: '1.2k', emoji: '🌆', badge: '同城', badgeType: 'badge-near', cta: '去看看', mood: '氛围很暖' },
  { text: '# 三件让你快乐的小事', views: '6.5w', posts: '980', emoji: '✨', badge: '精选', badgeType: 'badge-new', cta: '我也分享' }
])
const handleHotTap = (h) => {
  goHotWithParams({ text: h.text, views: h.views, posts: h.posts, emoji: h.emoji, badge: h.badge, badgeType: h.badgeType })
}

// 背景音乐（H5，使用原生 HTMLAudio；带多源与故障切换，避免 403/CORS 问题）
const isBgmPlaying = ref(false)
let bgmInstance = null
const bgmUrlList = [
  // 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  // 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  // 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
]
let bgmIndex = Math.floor(Math.random() * bgmUrlList.length)
const currentBgm = () => bgmUrlList[bgmIndex % bgmUrlList.length]
const nextBgm = () => { bgmIndex = (bgmIndex + 1) % bgmUrlList.length; return currentBgm() }

const ensureBgm = () => {
  if (typeof Audio === 'undefined') return null
  if (!bgmInstance) {
    bgmInstance = new Audio(currentBgm())
    bgmInstance.loop = true
    bgmInstance.preload = 'auto'
    bgmInstance.volume = 0.6
    bgmInstance.onerror = () => {
      // 发生 403/跨域等错误时，切换到下一个音源
      try {
        const src = nextBgm()
        bgmInstance.src = src
        if (isBgmPlaying.value) {
          bgmInstance.play().catch(() => {
            isBgmPlaying.value = false
            uni.showToast({ title: '背景音乐需手动播放', icon: 'none' })
          })
        }
      } catch (e) {
        // 忽略，保持静音状态
      }
    }
  }
  return bgmInstance
}

// 精选照片（美女生活风格示例）
// 从动态中提取图片作为精选照片
const extractPhotoPool = () => {
  const pool = []
  ;(moments.value || []).forEach(m => {
    // 支持 image 类型的 media
    if (m.mediaType === 'image' && Array.isArray(m.mediaUrls)) {
      m.mediaUrls.forEach(u => { if (u) pool.push({ url: u }) })
    }
    // 支持无 mediaType 但存在 mediaList 的情形（兼容其他结构）
    if (Array.isArray(m.mediaList)) {
      m.mediaList.filter(x => x && (x.type === 'image') && x.url).forEach(x => pool.push({ url: x.url }))
    }
  })
  return pool
}
const insCaptions = [
  'today vibes', 'mood on', 'little joy', 'city walk',
  'coffee o’clock', 'soft light', 'daily look', 'slow life'
]
const randomCaption = () => insCaptions[Math.floor(Math.random()*insCaptions.length)]
const photoShowcase = ref([])
const rebuildPhotoShowcase = () => {
  const pool = extractPhotoPool()
  if (!pool.length) { photoShowcase.value = []; return }
  const mixed = pool.sort(() => Math.random() - 0.5).slice(0, 8)
  photoShowcase.value = mixed.map(p => ({
    ...p,
    likes: Math.floor(100 + Math.random()*9000),
    emoji: ['💖','🌸','📸','😊','☕','👗','🧋','✨'][Math.floor(Math.random()*8)],
    caption: randomCaption()
  }))
}
const shufflePhotos = () => {
  rebuildPhotoShowcase()
}
const previewPhoto = (idx) => {
  const urls = photoShowcase.value.map(p => p.url)
  uni.previewImage({ urls, current: urls[idx] })
}

// 联系方式标签
const contactLabel = (t) => ({ wechat: '微信', phone: '手机', qq: 'QQ', email: '邮箱' }[t] || '联系')

// 评分类型标签
const ratingTypeLabel = (t) => ({ beauty: '颜值评分', style: '穿搭评分', photo: '照片评分' }[t] || '评分')

// 评分相关状态
const showRatingPopup = ref(false)
const currentRatingItem = ref(null)
const currentRating = ref(0)
const ratingComment = ref('')
const currentRatingIndex = ref(-1)

// 首次加载和每次刷新列表后重建精选照片
onShow(() => {
  setTimeout(() => rebuildPhotoShowcase(), 400)
  // 定时更换精选照片（每5秒）
  startPhotoRotation()
})

onHide(() => {
  stopPhotoRotation()
})

onUnload(() => {
  stopPhotoRotation()
})

// 定时更换精选照片
let photoRotationTimer = null
const startPhotoRotation = () => {
  if (photoRotationTimer) return
  photoRotationTimer = setInterval(() => {
    rebuildPhotoShowcase()
  }, 5000) // 每5秒更换一次
}

const stopPhotoRotation = () => {
  if (photoRotationTimer) {
    clearInterval(photoRotationTimer)
    photoRotationTimer = null
  }
}

const pauseBgm = () => {
  if (bgmInstance) {
    try { bgmInstance.pause() } catch (e) {}
  }
  isBgmPlaying.value = false
}

const toggleBgm = () => {
  const el = ensureBgm()
  if (!el) return
  if (isBgmPlaying.value) {
    pauseBgm()
  } else {
    el.play().then(() => { isBgmPlaying.value = true }).catch(() => {
      uni.showToast({ title: '需手动点击播放', icon: 'none' })
    })
  }
}

// 自动播放（尽力而为）：尝试静音播放，再淡入音量；若失败则等待首次用户手势
const fadeVolume = (to = 0.6, durationMs = 1200) => {
  const el = bgmInstance
  if (!el) return
  const from = el.volume || 0
  const steps = Math.max(1, Math.floor(durationMs / 80))
  let i = 0
  const timer = setInterval(() => {
    i++
    el.volume = from + (to - from) * (i / steps)
    if (i >= steps) clearInterval(timer)
  }, 80)
}

let autoPlayBound = false
const onFirstUserGesture = () => { tryAutoPlay() }
const bindAutoPlayListeners = () => {
  if (typeof document === 'undefined' || autoPlayBound) return
  ;['touchstart', 'click', 'wheel', 'keydown'].forEach(evt => {
    try { document.addEventListener(evt, onFirstUserGesture, { once: true, passive: true }) } catch (_) {}
  })
  autoPlayBound = true
}
const unbindAutoPlayListeners = () => {
  if (typeof document === 'undefined') return
  ;['touchstart', 'click', 'wheel', 'keydown'].forEach(evt => {
    try { document.removeEventListener(evt, onFirstUserGesture) } catch (_) {}
  })
  autoPlayBound = false
}

const tryAutoPlay = () => {
  const el = ensureBgm()
  if (!el) return
  el.muted = true
  el.volume = 0
  el.play().then(() => {
    isBgmPlaying.value = true
    el.muted = false
    fadeVolume(0.6, 1200)
    unbindAutoPlayListeners()
  }).catch(() => {
    // 等待用户手势
    bindAutoPlayListeners()
  })
}


// 表情列表
const emojiList = [
  '😊', '😂', '🤣', '❤️', '😍', '🤔', '😒', '👍', '👎',
  '😳', '🥺', '😭', '😘', '🤗', '🙄', '😴', '🤮', '🤧',
  '😷', '🤒', '🤕', '😈', '👻', '👽', '🤖', '💩', '😺',
  '💪', '👊', '✌️', '🤞', '🙏', '👏', '🙌', '👐', '🤲'
]

// 免责声明弹窗相关
const showDisclaimer = ref(true)
const countdown = ref(10)
let disclaimerTimer = null

// 关闭免责声明
const closeDisclaimer = () => {
  showDisclaimer.value = false
  if (disclaimerTimer) {
    clearInterval(disclaimerTimer)
    disclaimerTimer = null
  }
}

// 启动倒计时
const startCountdown = () => {
  disclaimerTimer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      closeDisclaimer()
    }
  }, 1000)
}

// 举报功能
const handleReport = (index) => {
  const moment = moments.value[index]
  uni.showActionSheet({
    title: '举报内容',
    itemList: [
      '色情低俗',
      '暴力血腥', 
      '政治敏感',
      '诈骗信息',
      '垃圾广告',
      '其他违规'
    ],
    success: (res) => {
      const reportTypes = [
        '色情低俗',
        '暴力血腥', 
        '政治敏感',
        '诈骗信息',
        '垃圾广告',
        '其他违规'
      ]
      const reportType = reportTypes[res.tapIndex]
      
      // 显示举报确认
      uni.showModal({
        title: '确认举报',
        content: `确定要举报此内容为"${reportType}"吗？`,
        success: (modalRes) => {
          if (modalRes.confirm) {
            // 执行举报逻辑
            submitReport(index, reportType)
          }
        }
      })
    }
  })
}

// 提交举报
const submitReport = async (index, reportType) => {
  try {
    uni.showLoading({ title: '处理中...' })
    
    const moment = moments.value[index]
    
    // 调用删除接口
    const { result } = await uniCloud.callFunction({
      name: 'wx_del',
      data: {
        momentId: moment._id
      }
    })
    
    if (result.code === 0) {
      // 删除成功，从本地列表中移除
      moments.value.splice(index, 1)
      
      uni.hideLoading()
      uni.showToast({
        title: '举报已成功',
        icon: 'none',
        duration: 2000
      })
    } else {
      throw new Error(result.msg || '删除失败')
    }
    
  } catch (error) {
    uni.hideLoading()
    uni.showToast({
      title: error.message || '操作失败，请重试',
      icon: 'none'
    })
  }
}
</script>

<style lang="scss" scoped>
$primary-gradient: linear-gradient(90deg, #5A8FFF 0%, #7F5AFF 100%);
$card-radius: 20rpx;
$shadow: 0 8rpx 32rpx rgba(90, 143, 255, 0.08);
$font-color-dark: #222;
$font-color-light: #666;
$background-color: #f7f9fb;
$action-color: #5A8FFF;

// 悬浮按钮样式
.floating-btn {
  position: fixed;
  right: 32rpx;
  bottom: 120rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 999;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);

  &:active {
    transform: scale(0.92) translateY(2rpx);
    
    .floating-btn-inner {
      box-shadow: 0 8rpx 32rpx rgba(102, 126, 234, 0.35);
    }
  }

  // 脉冲动画背景
  .floating-btn-pulse {
    position: absolute;
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    opacity: 0.3;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    transition: background 0.6s ease-in-out;
  }

  // 主按钮容器
  .floating-btn-inner {
    position: relative;
    width: 100rpx;
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: 0 12rpx 40rpx rgba(102, 126, 234, 0.5),
                0 0 0 4rpx rgba(255, 255, 255, 0.3),
                inset 0 -4rpx 12rpx rgba(0, 0, 0, 0.1);
    transition: all 0.6s ease-in-out;
    
    // 光晕效果
    &::before {
      content: '';
      position: absolute;
      top: -4rpx;
      left: -4rpx;
      right: -4rpx;
      bottom: -4rpx;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      opacity: 0.6;
      filter: blur(12rpx);
      z-index: -1;
      animation: glow 2s ease-in-out infinite alternate;
      transition: background 0.6s ease-in-out;
    }

    // 内部高光
    &::after {
      content: '';
      position: absolute;
      top: 8rpx;
      left: 16rpx;
      width: 40rpx;
      height: 20rpx;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      filter: blur(8rpx);
    }
  }

  .floating-btn-icon {
    width: 52rpx;
    height: 52rpx;
    position: relative;
    z-index: 2;
    filter: drop-shadow(0 2rpx 4rpx rgba(0, 0, 0, 0.2));
  }

  // 文字标签
  .floating-btn-label {
    margin-top: 12rpx;
    font-size: 24rpx;
    color: #667eea;
    font-weight: 600;
    text-shadow: 0 2rpx 8rpx rgba(255, 255, 255, 0.8);
    letter-spacing: 1rpx;
    background: rgba(255, 255, 255, 0.95);
    padding: 6rpx 16rpx;
    border-radius: 32rpx;
    box-shadow: 0 4rpx 16rpx rgba(102, 126, 234, 0.15);
    backdrop-filter: blur(10rpx);
    border: 1rpx solid rgba(102, 126, 234, 0.1);
    transition: color 0.6s ease-in-out, border-color 0.6s ease-in-out;
  }
}

// 脉冲动画
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.15);
    opacity: 0.15;
  }
}

// 光晕动画
@keyframes glow {
  0% {
    opacity: 0.4;
    transform: scale(0.95);
  }
  100% {
    opacity: 0.7;
    transform: scale(1.05);
  }
}

// 徽章弹出动画
@keyframes badge-pop {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

// 表情弹跳动画
@keyframes emoji-bounce {
  0%, 100% {
    transform: scale(1) rotate(0deg);
  }
  25% {
    transform: scale(1.2) rotate(-10deg);
  }
  75% {
    transform: scale(1.2) rotate(10deg);
  }
}

// 新评论滑入动画
@keyframes commentSlideIn {
  0% {
    opacity: 0;
    transform: translateX(-20rpx);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

// 主题指示器样式
.theme-indicator {
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  padding: 20rpx 16rpx;
  border-radius: 16rpx 0 0 16rpx;
  box-shadow: -4rpx 4rpx 16rpx rgba(0, 0, 0, 0.15);
  z-index: 999;
  animation: themeSlideIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  backdrop-filter: blur(10rpx);
  -webkit-backdrop-filter: blur(10rpx);

  .theme-name {
    font-size: 24rpx;
    color: #fff;
    font-weight: 600;
    writing-mode: vertical-lr;
    letter-spacing: 2rpx;
    text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.2);
  }
}

@keyframes themeSlideIn {
  0% {
    transform: translateY(-50%) translateX(100%);
    opacity: 0;
  }
  50% {
    transform: translateY(-50%) translateX(-10rpx);
  }
  100% {
    transform: translateY(-50%) translateX(0);
    opacity: 1;
  }
}

.moments-container {
  min-height: 100vh;
  background: $background-color;
  position: relative;
  padding-top: 120rpx; // 为顶部横幅留出空间
  transition: padding-top 0.3s ease;
  
  // 免责声明隐藏时的样式
  &.disclaimer-hidden {
    padding-top: 0;
  }
  
  // 动态背景光晕（低透明不干扰内容）
  &::before {
    content: '';
    position: fixed;
    inset: 0;
    background:
      radial-gradient(60% 60% at 15% 20%, rgba(90,143,255,0.10) 0%, rgba(90,143,255,0) 70%),
      radial-gradient(50% 50% at 85% 80%, rgba(127,90,255,0.10) 0%, rgba(127,90,255,0) 70%);
    background-size: 200% 200%, 200% 200%;
    animation: bgFloat 22s ease-in-out infinite;
    pointer-events: none;
    z-index: 0;
  }
}

.header {
  position: relative;
  height: 360rpx;
  overflow: hidden;
  border-bottom-left-radius: $card-radius;
  border-bottom-right-radius: $card-radius;
  transition: background 0.6s ease-in-out;

  // 装饰性流光
  &::after {
    content: '';
    position: absolute;
    right: -120rpx;
    bottom: -120rpx;
    width: 260rpx;
    height: 260rpx;
    background: radial-gradient(circle, rgba(127, 90, 255, 0.25) 0%, rgba(90, 143, 255, 0.0) 70%);
    border-radius: 50%;
    animation: headerFloat 6s ease-in-out infinite;
    pointer-events: none;
    z-index: 1;
  }

  .bg-image {
    width: 100%;
    height: 110%;
    filter: blur(1px) brightness(0.92) saturate(1.05);
    transition: transform 0.2s ease-out;
  }

  .header-gradient {
    position: absolute;
    inset: 0;
    background: $primary-gradient;
    opacity: 0.45;
    z-index: 1;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background-size: 300% 300%;
    animation: gradientShift 20s ease infinite;
    transition: background 0.6s ease-in-out, opacity 0.6s ease-in-out;
  }

  .header-blur {
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.12);
    filter: blur(8px);
    z-index: 1;
    pointer-events: none;
  }

  .header-glow {
    position: absolute;
    left: 60rpx;
    top: 60rpx;
    width: 120rpx;
    height: 120rpx;
    background: radial-gradient(circle, #7F5AFF 0%, #5A8FFF 60%, transparent 100%);
    opacity: 0.18;
    border-radius: 50%;
    z-index: 2;
    pointer-events: none;
  }

  .header-topbar {
    position: absolute;
    top: 24rpx;
    left: 24rpx;
    right: 24rpx;
    height: 72rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 4;

    .brand {
      font-size: 34rpx;
      color: #fff;
      font-weight: 700;
      letter-spacing: 2rpx;
      text-shadow: 0 2rpx 10rpx rgba(0,0,0,0.18);
      transition: color 0.6s ease-in-out;
    }

    .top-actions {
      display: flex;
      align-items: center;
      gap: 16rpx;

      .top-icon {
        width: 64rpx;
        height: 64rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 36rpx;
        color: #fff;
        background: rgba(255,255,255,0.18);
        border: 1rpx solid rgba(255,255,255,0.35);
        border-radius: 50%;
        backdrop-filter: blur(6rpx);
        -webkit-backdrop-filter: blur(6rpx);

        &:active {
          background: rgba(255,255,255,0.26);
        }
      }
    }
  }

  .hero-card {
    position: absolute;
    left: 24rpx;
    right: 24rpx;
    bottom: 24rpx;
    z-index: 4;
    display: flex;
    align-items: center;
    gap: 20rpx;
    padding: 18rpx 20rpx;
    background: rgba(255,255,255,0.16);
    border: 1rpx solid rgba(255,255,255,0.35);
    border-radius: 20rpx;
    box-shadow: 0 8rpx 28rpx rgba(0,0,0,0.08), 0 2rpx 12rpx rgba(90,143,255,0.18);
    backdrop-filter: blur(10rpx);
    -webkit-backdrop-filter: blur(10rpx);

    .hero-avatar {
      width: 88rpx;
      height: 88rpx;
      border-radius: 50%;
      border: 2rpx solid #fff;
      box-shadow: 0 0 16rpx rgba(90,143,255,0.45);
      background: #fff;
    }

    .hero-text {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 6rpx;

      .hero-title {
        color: #fff;
        font-size: 32rpx;
        font-weight: 700;
        text-shadow: 0 2rpx 8rpx rgba(0,0,0,0.18);
        transition: color 0.6s ease-in-out;
      }

      .hero-sub {
        color: #e9edff;
        font-size: 24rpx;
        opacity: 0.9;
      }

      .hero-chips {
        margin-top: 4rpx;
        display: flex;
        gap: 10rpx;

        .chip {
          padding: 4rpx 16rpx;
          font-size: 22rpx;
          color: #e9edff;
          background: rgba(255, 255, 255, 0.12);
          border: 1rpx solid rgba(255, 255, 255, 0.3);
          border-radius: 999rpx;
          transition: all 0.6s ease-in-out;
        }

        .active {
          color: #fff;
          background: rgba(127, 90, 255, 0.35);
          border-color: rgba(127, 90, 255, 0.65);
        }
      }
    }

  }
  .slogan-area {
    position: absolute;
    left: 0;
    right: 0;
    top: 120rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 3;
    padding: 20rpx 28rpx;
    margin: 0 32rpx;
    border-radius: 16rpx;
    background: linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.08) 100%);
    border: 1rpx solid rgba(255, 255, 255, 0.28);
    box-shadow: 0 10rpx 32rpx rgba(90,143,255,0.16), 0 2rpx 12rpx rgba(0,0,0,0.08);
    backdrop-filter: blur(10rpx);
    -webkit-backdrop-filter: blur(10rpx);
    .slogan-typing {
      color: #fff;
      font-size: 42rpx;
      font-weight: 700;
      text-shadow: 0 2rpx 10rpx rgba(0,0,0,0.18);
      letter-spacing: 2rpx;
      margin-bottom: 14rpx;
      min-height: 58rpx;
      transition: color 0.3s, letter-spacing 0.2s;
      display: flex;
      align-items: center;
      .cursor {
        display: inline-block;
        width: 18rpx;
        margin-left: 2rpx;
        color: #7F5AFF;
        font-weight: 900;
        font-size: 44rpx;
        opacity: 0.8;
        transition: opacity 0.2s;
        &.blink {
          opacity: 0.2;
        }
      }
      span {
        background: linear-gradient(90deg, #fff 0%, #e6e9ff 40%, #7F5AFF 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: sloganFadeIn 0.7s cubic-bezier(0.23, 1.2, 0.32, 1);
      }
    }
    .signature {
      color: #e9edff;
      font-size: 26rpx;
      font-style: italic;
      opacity: 0.9;
      padding: 6rpx 14rpx;
      border-radius: 999rpx;
      background: rgba(255, 255, 255, 0.12);
      border: 1rpx solid rgba(255, 255, 255, 0.25);
      box-shadow: 0 2rpx 8rpx rgba(90,143,255,0.18);
    }
  }
  // 顶部宣言渐变切换动画
  .slogan-fade-enter-active, .slogan-fade-leave-active {
    transition: opacity 0.7s cubic-bezier(0.23, 1.2, 0.32, 1);
  }
  .slogan-fade-enter-from, .slogan-fade-leave-to {
    opacity: 0;
    filter: blur(8rpx);
    transform: translateY(-20rpx) scale(0.96);
  }
  .slogan-fade-enter-to, .slogan-fade-leave-from {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0) scale(1);
  }

  .avatar-area {
    display: none;
  }
}

.banner-topics {
  margin: 24rpx;

  .banner-swiper {
    height: 180rpx;
    border-radius: 16rpx;
    overflow: hidden;
  }

  .topic-card {
    height: 180rpx;
    padding: 20rpx;
    border-radius: 16rpx;
    background: linear-gradient(90deg, rgba(90,143,255,0.12) 0%, rgba(127,90,255,0.10) 100%);
    border: 1rpx solid rgba(90,143,255,0.16);
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      right: -20rpx;
      top: -20rpx;
      width: 120rpx;
      height: 120rpx;
      background: radial-gradient(circle, rgba(127,90,255,0.22) 0%, rgba(127,90,255,0) 70%);
      border-radius: 50%;
    }
  }

  .topic-tag {
    display: inline-block;
    padding: 4rpx 12rpx;
    font-size: 22rpx;
    color: #5A8FFF;
    background: rgba(90,143,255,0.10);
    border: 1rpx solid rgba(90,143,255,0.28);
    border-radius: 999rpx;
  }

  .topic-title {
    margin-top: 8rpx;
    font-size: 34rpx;
    color: $font-color-dark;
    font-weight: 700;
  }

  .topic-sub {
    margin-top: 4rpx;
    font-size: 24rpx;
    color: $font-color-light;
  }
}

.segmented-tabs {
  margin: 20rpx 20rpx 16rpx 20rpx;
  display: flex;
  gap: 12rpx;

  .seg-pill {
    flex: 1;
    text-align: center;
    height: 64rpx;
    line-height: 64rpx;
    font-size: 26rpx;
    color: #5A8FFF;
    background: rgba(90,143,255,0.08);
    border: 1rpx solid rgba(90,143,255,0.28);
    border-radius: 999rpx;

    &.active {
      color: #fff;
      background: $primary-gradient;
      border-color: transparent;
      box-shadow: 0 6rpx 16rpx rgba(90, 143, 255, 0.2);
    }
  }
}

.hot-board {
  margin: 24rpx;
  background: #fff;
  border-radius: 16rpx;
  box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.06);
  border: 1rpx solid rgba(0,0,0,0.04);
  overflow: hidden;

  .hot-title {
    padding: 20rpx;
    font-size: 28rpx;
    font-weight: 700;
    color: $font-color-dark;
    background: linear-gradient(180deg, rgba(247,249,251,1) 0%, rgba(247,249,251,0) 100%);
  }

  .hot-list {
    padding: 20rpx;

      .hot-item {
      display: flex;
      align-items: center;
      padding: 14rpx 14rpx;
      border-radius: 12rpx;
      transition: background 0.2s ease;

      &:active { background: rgba(90,143,255,0.06); }

      .hot-rank {
        width: 40rpx;
        text-align: center;
        font-size: 26rpx;
        color: #9aa3af;

        &.top { color: #ff7e6b; font-weight: 800; }
      }

      .hot-thumb {
        width: 60rpx;
        height: 60rpx;
        border-radius: 12rpx;
        background: #f4f7ff;
        margin: 0 10rpx 0 6rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border: 1rpx solid #eef1f7;

        .hot-thumb-img { width: 100%; height: 100%; }
        .hot-thumb-emoji { font-size: 36rpx; }
      }

      .hot-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin: 0 8rpx;

        .hot-row { display: flex; align-items: center; gap: 8rpx; }
        .hot-text { font-size: 26rpx; color: $font-color-dark; }
        .hot-badge { font-size: 20rpx; padding: 2rpx 10rpx; border-radius: 999rpx; }
        .badge-hot { background: rgba(255,126,107,0.12); color: #ff7e6b; border: 1rpx solid rgba(255,126,107,0.35); }
        .badge-new { background: rgba(90,143,255,0.12); color: #5A8FFF; border: 1rpx solid rgba(90,143,255,0.35); }
        .badge-near { background: rgba(127,90,255,0.12); color: #7F5AFF; border: 1rpx solid rgba(127,90,255,0.35); }
        .hot-meta { margin-top: 4rpx; font-size: 22rpx; color: #9aa3af; }
      }

      .hot-arrow { font-size: 32rpx; color: #c4c9d1; }
      .hot-cta { margin-left: 10rpx; font-size: 22rpx; color: #5A8FFF; padding: 6rpx 12rpx; border-radius: 999rpx; background: rgba(90,143,255,0.08); }
    }
  }
}

.photo-showcase {
  margin: 24rpx;
  background: #fff;
  border-radius: 16rpx;
  border: 1rpx solid rgba(0,0,0,0.04);
  box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.06);
  overflow: hidden;

  .ps-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx;
    .ps-title { font-size: 28rpx; font-weight: 700; color: $font-color-dark; }
    .ps-action { font-size: 24rpx; color: #5A8FFF; padding: 8rpx 12rpx; background: rgba(90,143,255,0.08); border-radius: 999rpx; }
  }

  .ps-row {
    padding: 20rpx;
    display: flex;
    gap: 12rpx;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;

    .ps-item {
      position: relative;
      width: 260rpx;
      height: 180rpx;
      border-radius: 14rpx;
      overflow: hidden;
      flex: 0 0 auto;
      box-shadow: 0 6rpx 18rpx rgba(0,0,0,0.08);
      scroll-snap-align: start;

      .ps-img { width: 100%; height: 100%; }

      .ps-overlay {
        position: absolute;
        left: 0; right: 0; bottom: 0;
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        padding: 8rpx 12rpx;
        background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 100%);
        color: #fff;
        .ps-cap { display: flex; align-items: center; gap: 8rpx; min-width: 0; }
        .ps-emoji { font-size: 30rpx; flex: none; }
        .ps-text { font-size: 22rpx; color: #f8fafc; opacity: 0.92; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .ps-like { font-size: 22rpx; }
      }
    }
  }
}

// 直播模块样式
.live-section {
  margin: 24rpx;
  background: #fff;
  border-radius: 16rpx;
  border: 1rpx solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.06);
  overflow: hidden;

  .live-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx;
    background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%);

    .live-title-wrapper {
      display: flex;
      align-items: center;
      gap: 12rpx;
      flex: 1;

      .live-badge {
        display: flex;
        align-items: center;
        gap: 6rpx;
        padding: 6rpx 12rpx;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 20rpx;
        backdrop-filter: blur(10rpx);

        .live-dot {
          width: 12rpx;
          height: 12rpx;
          background: #fff;
          border-radius: 50%;
          animation: livePulse 1.5s ease-in-out infinite;
        }

        .live-text {
          font-size: 22rpx;
          color: #fff;
          font-weight: 600;
        }
      }

      .live-title {
        font-size: 28rpx;
        font-weight: 700;
        color: #fff;
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .live-viewer-count {
      display: flex;
      align-items: center;
      gap: 6rpx;
      padding: 6rpx 12rpx;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 20rpx;
      backdrop-filter: blur(10rpx);

      .viewer-icon {
        font-size: 24rpx;
      }

      .viewer-count {
        font-size: 22rpx;
        color: #fff;
        font-weight: 600;
      }
    }
  }

  .live-video-wrapper {
    position: relative;
    width: 100%;
    background: #000;

    .live-video {
      width: 100%;
      height: 420rpx;
      display: block;
    }

    .live-overlay-info {
      position: absolute;
      bottom: 20rpx;
      left: 20rpx;
      padding: 8rpx 16rpx;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 20rpx;
      backdrop-filter: blur(10rpx);

      .live-host {
        font-size: 22rpx;
        color: #fff;
        font-weight: 500;
      }
    }

    .live-mute-btn {
      position: absolute;
      bottom: 20rpx;
      right: 20rpx;
      display: flex;
      align-items: center;
      gap: 8rpx;
      padding: 10rpx 16rpx;
      background: rgba(255, 87, 34, 0.9);
      border-radius: 30rpx;
      backdrop-filter: blur(10rpx);
      box-shadow: 0 4rpx 12rpx rgba(255, 87, 34, 0.4);
      animation: mutePulse 2s ease-in-out infinite;
      z-index: 10;

      .mute-icon {
        font-size: 28rpx;
      }

      .mute-text {
        font-size: 22rpx;
        color: #fff;
        font-weight: 600;
      }
    }

    .live-switch-btn {
      position: absolute;
      bottom: 20rpx;
      left: 20rpx;
      display: flex;
      align-items: center;
      gap: 8rpx;
      padding: 10rpx 16rpx;
      background: rgba(103, 58, 183, 0.9);
      border-radius: 30rpx;
      backdrop-filter: blur(10rpx);
      box-shadow: 0 4rpx 12rpx rgba(103, 58, 183, 0.4);
      z-index: 10;
      transition: all 0.3s ease;

      &:active {
        transform: scale(0.95);
      }

      .switch-icon {
        font-size: 28rpx;
        animation: rotate 2s linear infinite;
      }

      .switch-text {
        font-size: 22rpx;
        color: #fff;
        font-weight: 600;
      }
    }
  }
}

@keyframes livePulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.2);
  }
}

@keyframes mutePulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 4rpx 12rpx rgba(255, 87, 34, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 6rpx 16rpx rgba(255, 87, 34, 0.6);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.moments-list {
  margin: 24rpx;
  padding: 0;

  .moment-item {
    display: flex;
    margin-bottom: 32rpx;
    padding: 20rpx;
    background: #fff;
    border-radius: $card-radius;
    box-shadow: $shadow;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    padding-bottom: 30rpx;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4rpx;
     
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.25s ease;
    }

    &:hover {
      transform: translateY(-2rpx);
      box-shadow: 0 12rpx 36rpx rgba(90, 143, 255, 0.12);

      &::before {
        transform: scaleX(1);
      }
    }

    .user-avatar {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
      margin-right: 24rpx;
      border: 2rpx solid #5A8FFF;
      box-shadow: 0 0 12rpx #7F5AFF;
      background: #fff;
      transition: box-shadow 0.25s ease, transform 0.25s ease;

      &:hover {
        box-shadow: 0 0 16rpx rgba(127, 90, 255, 0.55), 0 0 28rpx rgba(90, 143, 255, 0.35);
        transform: translateY(-2rpx);
      }
    }

    .content-area {
      flex: 1;

        .meta-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }

      .username {
        font-size: 30rpx;
        font-weight: 600;
        color: $font-color-dark;
        transition: color 0.6s ease-in-out;
        margin-bottom: 10rpx;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -4rpx;
          width: 0;
          height: 4rpx;
          background: $primary-gradient;
          border-radius: 4rpx;
          transition: width 0.25s ease;
        }

        &:hover::after {
          width: 80rpx;
        }
      }

        .meta-time {
          display: block;
          margin-top: 10rpx;
          font-size: 22rpx;
          color: #9aa3af;
        }

        .chip-row {
          display: flex;
          gap: 10rpx;
          margin: 2rpx 0 16rpx 0;

          .chip {
            padding: 4rpx 14rpx;
            font-size: 22rpx;
            color: #5a6fff;
            background: rgba(90, 143, 255, 0.08);
            border: 1rpx solid rgba(90, 143, 255, 0.28);
            border-radius: 999rpx;
            transition: all 0.6s ease-in-out;
          }

          .ghost {
            color: #7f5aff;
            background: rgba(127, 90, 255, 0.08);
            border-color: rgba(127, 90, 255, 0.28);
          }
        }

      .text-content {
        font-size: 28rpx;
        color: $font-color-light;
        margin-bottom: 0;
        line-height: 1.7;
      }

      .text-block {
        margin-bottom: 12rpx;
        position: relative;

        &.clamped {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }

      .expand-btn {
        display: inline-block;
        font-size: 24rpx;
        color: $action-color;
        padding: 6rpx 12rpx;
        border-radius: 999rpx;
        background: rgba(90, 143, 255, 0.08);
        border: 1rpx solid rgba(90, 143, 255, 0.18);
        margin-bottom: 12rpx;
        transition: all 0.6s ease-in-out;

        &:active {
          background: rgba(90, 143, 255, 0.16);
        }
      }

      .media-content {
        margin-bottom: 16rpx;
        margin-top: 20rpx;
        border-radius: 12rpx;
        overflow: hidden;

        .video-content {
          width: 100%;
          height: 400rpx;
          border-radius: 16rpx;
          object-fit: cover;
        }

        .image-gallery {
          display: grid;
          gap: 12rpx;

          .image-content {
            transition: transform 0.25s ease;

            &:hover {
              transform: scale(1.02);
            }
          }
        }

        .image-radius {
          border-radius: 12rpx;
        }

        .media-badges {
          position: absolute;
          right: 12rpx;
          top: 12rpx;
          display: flex;
          gap: 8rpx;
          z-index: 5;

          .badge {
            display: inline-flex;
            align-items: center;
            height: 40rpx;
            padding: 0 12rpx;
            border-radius: 999rpx;
            background: rgba(0,0,0,0.42);
            color: #fff;
            backdrop-filter: blur(6rpx);
            -webkit-backdrop-filter: blur(6rpx);

            .b-ic {
              font-size: 24rpx;
              margin-right: 6rpx;
            }
            .b-txt {
              font-size: 22rpx;
            }
          }

          .ghost {
            background: rgba(255,255,255,0.18);
            color: #222;
            border: 1rpx solid rgba(0,0,0,0.08);
          }
        }
      }

      .bottom-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20rpx 0;

        .time {
          font-size: 24rpx;
          color: #999;
        }

        .actions {
          display: flex;
          align-items: center;
          gap: 20rpx;

          .action-btn {
            display: flex;
            align-items: center;
            padding: 8rpx 16rpx;
            border-radius: 24rpx;
            background: rgba(90, 143, 255, 0.06);
            border: 1rpx solid rgba(90, 143, 255, 0.18);
            position: relative;
            overflow: hidden;
            transition: all 0.6s ease-in-out;

            &::before {
              content: '';
              position: absolute;
              inset: 0;
              background: $primary-gradient;
              opacity: 0;
              transition: opacity 0.2s ease;
            }

            .icon {
              font-size: 28rpx;
              margin-right: 6rpx;
              color: $action-color;
              transition: transform 0.2s, color 0.2s;
            }

            .action-text {
              font-size: 22rpx;
              color: #666;
            }

            .action-count {
              margin-left: 4rpx;
              font-size: 20rpx;
              color: #9aa3af;
            }

            &:active {
              transform: scale(0.95);
              background: rgba(127, 90, 255, 0.12);
              
              &::before {
                opacity: 0.06;
              }
            }
          }

          .like-btn {
            &.liked {
              background: rgba(90, 143, 255, 0.13);

              .action-text {
                color: #5A8FFF;
              }

              .icon {
                color: #7F5AFF;
              }
            }

            &.animating .icon {
              animation: likeBounce 0.4s;
            }
          }

          .report-btn {
            &:active {
              background: rgba(255, 87, 34, 0.12);
              transform: scale(0.95);
            }

            .icon {
              color: #ff5722;
            }

            .action-text {
              color: #ff5722;
            }
          }

          .like-burst {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 40rpx;
            height: 40rpx;
            pointer-events: none;
            transform: translate(-50%, -50%);
            background: radial-gradient(circle, #7F5AFF 0%, #5A8FFF 60%, transparent 100%);
            opacity: 0.5;
            animation: burst 0.5s;
            border-radius: 50%;
          }
        }
      }

      .likes-section,
      .comments-section {
        background: #f4f7ff;
        padding: 16rpx;
        border-radius: 12rpx;
        margin-top: 16rpx;
        border: 1rpx solid rgba(90, 143, 255, 0.12);
        position: relative;

        &::before {
          content: '';
          position: absolute;
          left: 16rpx;
          right: 16rpx;
          top: 0;
          height: 2rpx;
       
          border-radius: 1rpx;
        }

        .like-users {
          font-size: 26rpx;
          color: $action-color;
          transition: color 0.6s ease-in-out;
        }
      }

      .comments-section {
        .comment-item {
          display: flex;
          align-items: flex-start;
          font-size: 26rpx;
          margin-bottom: 15rpx;
          transition: all 0.3s ease;

          &.new-comment {
            animation: commentSlideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            background: linear-gradient(90deg, 
              rgba(102, 126, 234, 0.08) 0%, 
              rgba(102, 126, 234, 0.03) 50%, 
              transparent 100%
            );
            padding: 8rpx;
            margin-left: -8rpx;
            margin-right: -8rpx;
            border-radius: 8rpx;
          }

          .comment-anon-icon {
            width: 40rpx;
            height: 40rpx;
            border-radius: 50%;
            margin-right: 12rpx;
            flex-shrink: 0;
            box-shadow: 0 2rpx 8rpx rgba(102, 126, 234, 0.15);
            border: 2rpx solid rgba(255, 255, 255, 0.8);
          }

          .comment-content-wrapper {
            flex: 1;
            
            .comment-text-line {
              display: flex;
              flex-wrap: wrap;
              align-items: center;

          .comment-user {
            color: $action-color;
            margin-right: 4rpx;
                font-weight: 500;
            transition: color 0.6s ease-in-out;
          }

          .comment-content {
            color: $font-color-dark;
                word-break: break-all;
                line-height: 1.5;
              }
            }

            .comment-images {
              display: flex;
              flex-wrap: wrap;
              gap: 8rpx;
              margin-top: 12rpx;

              .comment-image {
                width: 120rpx;
                height: 120rpx;
                border-radius: 12rpx;
                object-fit: cover;
                transition: all 0.3s ease;
                border: 1rpx solid #e8ecf0;
                box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);

                &:active {
                  transform: scale(0.95);
                  opacity: 0.8;
                }
              }
            }
          }
        }
      }

      .contact-section {
        margin-top: 8rpx;
        display: inline-flex;
        align-items: center;
        padding: 8rpx 12rpx;
        border-radius: 999rpx;
        background: rgba(90,143,255,0.08);
        border: 1rpx solid rgba(90,143,255,0.18);
        .contact-icon { font-size: 24rpx; margin-right: 6rpx; }
        .contact-text { font-size: 22rpx; color: #5A8FFF; }
      }
    }

    .more-btn {
      position: absolute;
      right: 16rpx;
      top: 12rpx;
      width: 64rpx;
      height: 64rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #9aa3af;
      font-size: 48rpx;
      border-radius: 50%;
      transition: background 0.2s ease;

      &:active {
        background: rgba(0,0,0,0.04);
      }
    }
  }
}

.columns-1 {
  grid-template-columns: repeat(1, 1fr);
}

.columns-2 {
  grid-template-columns: repeat(2, 1fr);
}

.columns-3 {
  grid-template-columns: repeat(3, 1fr);
}

.columns-4 {
  grid-template-columns: repeat(2, 1fr);
}

.columns-5,
.columns-6,
.columns-7,
.columns-8,
.columns-9 {
  grid-template-columns: repeat(3, 1fr);
}

.image-content {
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  transition: transform 0.25s ease;
  
  &:active {
    transform: scale(0.98);
  }

  // 预览提示
  &::after {
    content: '🔍';
    position: absolute;
    right: 8rpx;
    bottom: 8rpx;
    font-size: 28rpx;
    opacity: 0;
    transform: translateY(6rpx);
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  &:hover::after {
    opacity: 0.9;
    transform: translateY(0);
  }
}

.video-radius {
  border-radius: 16rpx;
}

// 点赞动画
@keyframes likeBounce {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.5);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes burst {
  0% {
    opacity: 0.5;
    transform: scale(0.8);
  }

  80% {
    opacity: 0.8;
    transform: scale(1.3);
  }

  100% {
    opacity: 0;
    transform: scale(1.8);
  }
}

// 评论弹窗动画
.animated-popup {
  animation: popupIn 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}

@keyframes popupIn {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.comment-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;

  .comment-box {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    border-top-left-radius: 24rpx;
    border-top-right-radius: 24rpx;
    box-shadow: 0 -4rpx 24rpx rgba(90, 143, 255, 0.08);

    .comment-input-area {
      display: flex;
      flex-direction: column;
      padding: 20rpx;
      border-top: 1rpx solid #eee;
      background: #f8f8f8;

      .comment-input {
        width: 100%;
        height: 72rpx;
        background: #fff;
        border-radius: 36rpx;
        padding: 0 30rpx;
        font-size: 28rpx;
        border: 1rpx solid #eee;
        box-sizing: border-box;
      }

      .comment-images-preview {
        display: flex;
        flex-wrap: wrap;
        gap: 12rpx;
        margin: 16rpx 0;

        .comment-preview-item {
          position: relative;
          width: 120rpx;
          height: 120rpx;
          border-radius: 12rpx;
          overflow: hidden;

          .comment-preview-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .comment-preview-delete {
            position: absolute;
            top: 4rpx;
            right: 4rpx;
            width: 36rpx;
            height: 36rpx;
            background: rgba(0, 0, 0, 0.6);
            color: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24rpx;
            font-weight: bold;
            backdrop-filter: blur(10rpx);
            transition: all 0.2s ease;

            &:active {
              background: rgba(255, 59, 48, 0.9);
              transform: scale(0.9);
            }
          }
        }
      }

      .toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 12rpx;

        .toolbar-left {
          display: flex;
          align-items: center;
          gap: 12rpx;
        }

        .toolbar-icon {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 72rpx;
          height: 72rpx;
          border-radius: 50%;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border: 2rpx solid rgba(102, 126, 234, 0.1);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2rpx 8rpx rgba(102, 126, 234, 0.08);

          &:active {
            transform: scale(0.92);
            box-shadow: 0 1rpx 4rpx rgba(102, 126, 234, 0.15);
            background: linear-gradient(135deg, #e8ecf0 0%, #dde4ec 100%);
          }

          .icon-emoji,
          .icon-camera {
            font-size: 44rpx;
          line-height: 1;
          }

          .icon-wrapper {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .icon-label {
            position: absolute;
            top: -8rpx;
            right: -8rpx;
            min-width: 32rpx;
            height: 32rpx;
            line-height: 32rpx;
            text-align: center;
            font-size: 20rpx;
            color: #fff;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 16rpx;
            padding: 0 8rpx;
            box-shadow: 0 2rpx 8rpx rgba(102, 126, 234, 0.4);
            font-weight: 600;
            animation: badge-pop 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }
        }

        .emoji-btn {
          &:active .icon-emoji {
            animation: emoji-bounce 0.3s ease;
          }
        }

        .image-btn {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%);
          border-color: rgba(102, 126, 234, 0.2);

          &:active {
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
          }

          .icon-camera {
            filter: drop-shadow(0 2rpx 4rpx rgba(102, 126, 234, 0.2));
          }
        }

        .submit-btn {
          min-width: 120rpx;
          height: 72rpx;
          line-height: 72rpx;
          text-align: center;
          background: linear-gradient(135deg, #e8ecf0 0%, #dde4ec 100%);
          color: #94a3b8;
          border-radius: 36rpx;
          font-size: 28rpx;
          border: 2rpx solid rgba(148, 163, 184, 0.15);
          font-weight: 500;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 0 32rpx;
          box-shadow: 0 2rpx 8rpx rgba(148, 163, 184, 0.1);

          &.active {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #fff;
            font-weight: 600;
            border-color: transparent;
            box-shadow: 0 4rpx 16rpx rgba(102, 126, 234, 0.4),
                        0 0 0 2rpx rgba(102, 126, 234, 0.1);
            transform: translateY(-1rpx);
            
            &:active {
              transform: scale(0.96) translateY(0);
              box-shadow: 0 2rpx 8rpx rgba(102, 126, 234, 0.3);
            }
          }

          &:not(.active):active {
            transform: scale(0.96);
            background: linear-gradient(135deg, #dde4ec 0%, #cbd5e1 100%);
          }
        }
      }
    }

    .emoji-panel {
      height: 400rpx;
      background: #fff;
      border-top: 1rpx solid #eee;

      .emoji-list {
        height: 100%;
        padding: 20rpx;

        .emoji-group {
          display: flex;
          flex-wrap: wrap;
          gap: 10rpx;

          .emoji-item {
            width: 80rpx;
            height: 80rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 40rpx;

            &:active {
              background: #f5f5f5;
              border-radius: 8rpx;
            }
          }
        }
      }
    }
  }
}

.publish-btn {
  position: fixed;
  right: 30rpx;
  bottom: 120rpx;
  z-index: 99;
  width: 100rpx;
  height: 100rpx;
  background: $primary-gradient;
  border-radius: 50%;
  box-shadow: 0 6rpx 16rpx #5A8FFF33;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;

  &::before {
    content: '';
    position: absolute;
    inset: -8rpx;
    border-radius: 50%;
    // background: $primary-gradient;
    opacity: 0.18;
    animation: pulseRing 2.2s ease-in-out infinite;
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;

    .iconfont {
      color: #fff;
      font-size: 60rpx;
      font-weight: 300;
      line-height: 1;
    }
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: inherit;
    border-radius: inherit;
    opacity: 0.4;
    transform: scale(1);
    animation: breathe 2s ease-in-out infinite;
  }
}

// 背景音乐按钮
.music-btn {
  position: fixed;
  right: 24rpx;
  bottom: 240rpx;
  z-index: 98;
  width: 88rpx;
  height: 88rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.18);
  border: 1rpx solid rgba(255,255,255,0.35);
  backdrop-filter: blur(8rpx);
  -webkit-backdrop-filter: blur(8rpx);
  box-shadow: 0 6rpx 16rpx rgba(0,0,0,0.08);
  transition: transform 0.2s ease;

  &:active { transform: scale(0.95); }

  &.playing { box-shadow: 0 0 18rpx rgba(127,90,255,0.35); }

  .music-icon {
    font-size: 44rpx;
    color: #fff;
    text-shadow: 0 2rpx 8rpx rgba(0,0,0,0.2);
  }
}


@keyframes breathe {
  0% {
    transform: scale(1);
    opacity: 0.4;
  }

  50% {
    transform: scale(1.6);
    opacity: 0;
  }

  100% {
    transform: scale(1);
    opacity: 0.4;
  }
}

// 背景渐变与光晕动画
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes bgFloat {
  0% { transform: translate3d(0,0,0) scale(1); opacity: 1; }
  50% { transform: translate3d(0,-6rpx,0) scale(1.02); opacity: 0.98; }
  100% { transform: translate3d(0,0,0) scale(1); opacity: 1; }
}
// 头部浮动与按钮环动效
@keyframes headerFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12rpx); }
}

@keyframes pulseRing {
  0% { transform: scale(1); opacity: 0.18; }
  70% { transform: scale(1.35); opacity: 0; }
  100% { transform: scale(1.35); opacity: 0; }
}

// 科技感加载动画
.tech-loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 999;
  background: rgba(255, 255, 255, 0.96);
  padding: 40rpx;
  border-radius: 20rpx;
  backdrop-filter: blur(10px);

  .dot {
    width: 20rpx;
    height: 20rpx;
    background: $primary-gradient;
    border-radius: 50%;
    margin: 0 8rpx;
    animation: techDot 1s infinite alternate;
    display: inline-block;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }

    &:nth-child(4) {
      animation-delay: 0.6s;
    }
  }

  .loading-text {
    margin-top: 30rpx;
    font-size: 28rpx;
    color: #666;
    letter-spacing: 2rpx;
    animation: textPulse 1.5s ease-in-out infinite;
  }
}

@keyframes techDot {
  0% {
    opacity: 0.5;
    transform: scale(1);
  }

  100% {
    opacity: 1;
    transform: scale(1.5);
  }
}

@keyframes textPulse {

  0%,
  100% {
    opacity: 0.6;
  }

  50% {
    opacity: 1;
  }
}

// 优化列表加载动画
.moment-item {
  opacity: 0;
  transform: translateY(30rpx);
  animation: fadeInUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;

  @for $i from 1 through 10 {
    &:nth-child(#{$i}) {
      animation-delay: #{$i * 0.08}s;
    }
  }

  &:hover {
    transform: translateY(-2rpx);
    box-shadow: 0 6rpx 24rpx rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
  }
}

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

// 添加骨架屏动画
.skeleton {
  background: linear-gradient(90deg,
      rgba(190, 190, 190, 0.2) 25%,
      rgba(129, 129, 129, 0.24) 37%,
      rgba(190, 190, 190, 0.2) 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
}

@keyframes shimmer {
  0% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}

// 添加下拉刷新动画
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.interaction-area {
  margin-top: 16rpx;
  background: #f8f8f8;
  border-radius: 12rpx;
  overflow: hidden;

  .likes-section {
    padding: 16rpx;
    display: flex;
    align-items: center;

    .heart-icon {
      font-size: 24rpx;
      margin-right: 10rpx;
    }

    .like-users {
      font-size: 26rpx;
      color: $action-color;
      line-height: 1.4;
    }
  }

  .divider {
    height: 1rpx;
    background: rgba(0, 0, 0, 0.06);
    margin: 0 16rpx;
  }

  .comments-section {

    padding-bottom: 0rpx !important;
    .comment-item {
      display: flex;
      margin-bottom: 12rpx;
      font-size: 26rpx;
      line-height: 1.4;

      &:last-child {
        margin-bottom: 0;
      }

      &.new-comment {
        animation: commentFadeIn 0.3s ease;
      }

      .comment-user {
        color: $action-color;
        font-weight: 500;
      }

      .comment-separator {
        color: #999;
        margin: 0 4rpx;
      }

      .comment-content {
        color: $font-color-dark;
        flex: 1;
        word-break: break-all;
      }
    }
  }
}

@keyframes likePopup {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.4) rotate(15deg);
  }

  100% {
    transform: scale(1) rotate(0);
  }
}

@keyframes commentFadeIn {
  from {
    opacity: 0;
    transform: translateY(10rpx);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 评论区匿名icon
.comment-anon-icon {
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
  margin-right: 8rpx;
  background: #f4f7ff;
  border: 1rpx solid #e0e6f6;
}

// 点赞粒子爆炸动画 - 增强版
.like-burst-particles {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 80rpx;
  height: 80rpx;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 2;

  .particle {
    position: absolute;
    width: 14rpx;
    height: 14rpx;
    border-radius: 50%;
    background: $primary-gradient;
    opacity: 1;
    animation: particleBurst 1.2s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 0 12rpx currentColor, 0 0 24rpx currentColor;
  }

  .p1 {
    left: 50%;
    top: 0%;
    animation-delay: 0s;
  }

  .p2 {
    left: 85%;
    top: 15%;
    animation-delay: 0.06s;
  }

  .p3 {
    left: 100%;
    top: 50%;
    animation-delay: 0.12s;
  }

  .p4 {
    left: 85%;
    top: 85%;
    animation-delay: 0.18s;
  }

  .p5 {
    left: 50%;
    top: 100%;
    animation-delay: 0.24s;
  }

  .p6 {
    left: 15%;
    top: 85%;
    animation-delay: 0.30s;
  }

  .p7 {
    left: 0%;
    top: 50%;
    animation-delay: 0.36s;
  }

  .p8 {
    left: 15%;
    top: 15%;
    animation-delay: 0.42s;
  }
}

@keyframes particleBurst {
  0% {
    transform: scale(0.4) translate(0, 0);
    opacity: 1;
  }

  30% {
    transform: scale(1.5) translate(0, 0);
    opacity: 1;
  }

  60% {
    transform: scale(2) translate(0, -40rpx);
    opacity: 0.8;
  }

  100% {
    transform: scale(3) translate(0, -80rpx);
    opacity: 0;
  }
}

// 顶部宣言循环弹跳动画
.slogan-bounce-animate {
  animation: sloganBounceLoop 2.2s cubic-bezier(0.23, 1.2, 0.32, 1) infinite;
}
@keyframes sloganBounceLoop {
  0% { transform: translateY(0) scale(1); }
  10% { transform: translateY(-18rpx) scale(1.08); }
  18% { transform: translateY(6rpx) scale(0.98); }
  24% { transform: translateY(-4rpx) scale(1.03); }
  30% { transform: translateY(0) scale(1); }
  100% { transform: translateY(0) scale(1); }
}
@keyframes sloganFadeIn {
  0% { opacity: 0; filter: blur(8rpx); }
  100% { opacity: 1; filter: blur(0); }
}
// 免责声明顶部横幅样式
.disclaimer-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%);
  box-shadow: 0 4rpx 12rpx rgba(255, 152, 0, 0.3);
  animation: disclaimerSlideDown 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.disclaimer-banner-content {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20rpx 24rpx;
  min-height: 100rpx;
}

.disclaimer-banner-left {
  display: flex;
  align-items: flex-start;
  flex: 1;
  gap: 12rpx;
  margin-right: 16rpx;

  .disclaimer-banner-icon {
    font-size: 32rpx;
    animation: warningPulse 2s ease-in-out infinite;
    flex-shrink: 0;
  }

  .disclaimer-banner-text {
    font-size: 24rpx;
    color: #fff;
    line-height: 1.4;
    font-weight: 500;
    text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.1);
  }
}

.disclaimer-banner-right {
  display: flex;
  align-items: center;
  gap: 16rpx;
  flex-shrink: 0;
  margin-top: 8rpx;

  .disclaimer-banner-timer {
    font-size: 22rpx;
    color: #fff;
    background: rgba(255, 255, 255, 0.2);
    padding: 6rpx 12rpx;
    border-radius: 12rpx;
    font-weight: 600;
    text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.1);
    min-width: 60rpx;
    text-align: center;
  }

  .disclaimer-banner-close {
    width: 48rpx;
    height: 48rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28rpx;
    color: #fff;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transition: all 0.2s ease;
    text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.1);

    &:active {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(0.95);
    }
  }
}

@keyframes disclaimerSlideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes warningPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

// 移动端收紧留白并提升模块高度
@media screen and (max-width: 750rpx) {
  .banner-topics { margin: 24rpx; }
  .banner-topics .banner-swiper { height: 200rpx; }
  .banner-topics .topic-card { height: 200rpx; padding: 18rpx; }

  .photo-showcase { margin: 24rpx; }
  .photo-showcase .ps-row { gap: 10rpx; }
  .photo-showcase .ps-item { width: 240rpx; height: 200rpx; }

  .hot-board { margin: 24rpx; }

  .moments-list { margin: 24rpx; padding: 0; }
  .moments-list .moment-item { padding: 24rpx 18rpx; }
  .moments-list .media-content .video-content { height: 420rpx; }
  .moments-list .actions { gap: 16rpx; }
  .moments-list .action-btn { padding: 6rpx 12rpx; border-radius: 20rpx; }
  .moments-list .action-btn .icon { font-size: 24rpx; margin-right: 4rpx; }
  .moments-list .action-btn .action-text { font-size: 20rpx; }
  .moments-list .action-btn .action-count { font-size: 18rpx; margin-left: 3rpx; }

  .disclaimer-banner-content { padding: 16rpx 20rpx; min-height: 90rpx; }
  .disclaimer-banner-left .disclaimer-banner-text { font-size: 20rpx; line-height: 1.3; }
  .disclaimer-banner-right .disclaimer-banner-timer { font-size: 18rpx; padding: 4rpx 8rpx; }
  .disclaimer-banner-right .disclaimer-banner-close { width: 40rpx; height: 40rpx; font-size: 24rpx; }
}
</style>
