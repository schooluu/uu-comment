<template>
  <view :class="['moments-container', themeClass]">
    <!-- 顶部背景与Figma风格头部 -->
    <view class="header">
      <image class="bg-image" :src="headerBg" mode="aspectFill" :style="{ transform: `translateY(${parallaxY}px) scale(1.06)` }"></image>
      <view class="header-gradient"></view>
      <view class="header-blur"></view>
      <view class="header-glow"></view>

      <view class="header-topbar">
        <text class="brand">匿名圈</text>
        <view class="top-actions">
          <text class="top-icon" @tap="handleSearch">🔍</text>
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
        <view class="hero-cta" @tap="handleCamera">
          <text class="cta-plus">+</text>
        </view>
      </view>
    </view>

    <!-- 首屏 Banner 话题轮播 -->
    <view class="banner-topics">
      <swiper class="banner-swiper" circular autoplay interval="4000">
        <swiper-item v-for="(t, i) in bannerTopics" :key="i">
          <view class="topic-card" @tap="handleBannerTap(t)">
            <view class="topic-tag">{{ t.tag }}</view>
            <text class="topic-title">{{ t.title }}</text>
            <text class="topic-sub">{{ t.sub }}</text>
          </view>
        </swiper-item>
      </swiper>
    </view>

    <!-- 分段控制（推荐 / 关注 / 附近） -->
    <view class="segmented-tabs">
      <view class="seg-pill active" @tap="handleTabSelect('recommend')">推荐</view>
      <view class="seg-pill" @tap="handleTabSelect('follow')">关注</view>
      <view class="seg-pill" @tap="handleTabSelect('nearby')">附近</view>
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
                @tap="handleLikeWithFW(index)">
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
            </view>
          </view>
          <!-- 点赞列表 -->
          <view class="likes-section" v-if="item.likes && item.likes.length">
            <text class="like-users">{{ item.likes.join('、') }}</text>
          </view>
          <!-- 评论列表 -->
          <view class="comments-section" v-if="item.comments && item.comments.length !== 0">
            <view class="comment-item" v-for="(comment, cIndex) in item.comments" :key="cIndex">
              <image class="comment-anon-icon" :src="anonymousAvatar" />
              <text class="comment-user">{{ comment.username }}：</text>
              <text class="comment-content">{{ comment.content }}</text>
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
          <view class="toolbar">
            <text class="emoji-btn" @tap="toggleEmojiPanel">😊</text>
            <button class="submit-btn" :class="{ active: commentText.trim() }" @tap="submitComment">发送</button>
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
    <!-- 发布按钮 -->
    <view class="publish-btn" @tap="handleCamera">
      <view class="icon-wrapper">
        <text class="iconfont">+</text>
      </view>
    </view>
    <!-- 科技感加载动画 -->
    <!-- <view class="tech-loading" v-if="loading">
      <view class="dot" v-for="i in 4" :key="i"></view>
      <text class="loading-text">加载中...</text>
    </view> -->

    <!-- 烟花特效层（轻量DOM动画） -->
    <view class="fireworks" v-if="showFireworks">
      <view
        v-for="f in fireworks"
        :key="f.id"
        class="fw"
        :style="{ left: f.x + '%', top: f.y + '%'}"
      >
        <view v-for="n in 12" :key="n" :class="['fw-p', 'p' + n, f.theme]"></view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { nextTick } from 'vue'
import {
  onShow,
  onReachBottom,
  onPullDownRefresh,
  onPageScroll,
  onHide,
  onUnload
} from '@dcloudio/uni-app';
// 匿名昵称池
const anonymousNames = [
  '星河旅人', '夏日微风', '蓝莓汽水', '橙子汽球', '夜空守望', '晨曦微光', '云端漫步', '月下独行',
  '白茶清欢', '青柠时光', '温柔星球', '晴空万里', '风中诗人', '海盐冰沙', '山野听风', '橘子海岸',
  '银河信使', '微光拾梦', '晚风邮差', '雾里看花', '森林之心', '雨后初晴', '云朵收集者', '夏夜萤火'
]
function getRandomName() {
  return anonymousNames[Math.floor(Math.random() * anonymousNames.length)]
}
// 匿名头像
const anonymousAvatar = 'https://qcloud.dpfile.com/pc/pawK4KeJSDNVINhfwh9CoLJPFluB-tnHSd3heJ_jybtNIYslSlGEPeQVyA4hZRCP.jpg';
const headerBg = 'https://img1.imgtp.com/2023/07/10/0Qv6Qw4w.png'; // 新科技感头像/背景
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
})
// 评论相关的响应式变量
const showCommentPopup = ref(false)
const showEmojiPanel = ref(false)
const commentText = ref('')
const currentMomentIndex = ref(-1)
const isLikeAnimating = ref({})
// 分页相关变量
const page = ref(1)
const pageSize = ref(10)
const loading = ref(false)
const hasMore = ref(true)
const moments = ref([])
const handleLogin = () => {
  uni.navigateTo({
    url: '/pages/wx/login/login'
  })
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
      // 匿名处理：每条动态分配一个随机昵称
      const list = result.data.list.map(item => ({
        ...item,
        username: getRandomName(),
        avatar: anonymousAvatar,
        comments: (item.comments || []).map(c => ({ ...c, username: getRandomName() })),
        likes: (item.likes || []).map(() => getRandomName())
      }))
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
  // 持续烟花循环
  stopFireworksLoop() // 防重启
  startFireworksLoop()
  // 3秒后自动获取列表（刷新）
  setTimeout(() => {
    getMomentsList(true)
  }, 3000)
})

onHide(() => {
  stopFireworksLoop()
})

onUnload(() => {
  stopFireworksLoop()
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
  if (!commentText.value.trim()) return
  // 重置状态

  showCommentPopup.value = false
  showEmojiPanel.value = false

  uni.showToast({
    title: '评论成功',
    icon: 'none'
  })
  try {
    const { result } = await uniCloud.callFunction({
      name: 'wx_add_comment',
      data: {
        momentId: moments.value[currentMomentIndex.value]._id,
        content: commentText.value
      }
    })

    if (result.code === 0) {
      // 更新评论列表
      const moment = moments.value[currentMomentIndex.value]
      if (!moment.comments) moment.comments = []
      moment.comments.push({
        username: getRandomName(),
        content: commentText.value,
        create_time: Date.now()
      })

      commentText.value = ''


    } else {
      throw new Error(result.msg)
    }
  } catch (error) {
    uni.showToast({
      title: error.message || '评论失败',
      icon: 'none'
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
  currentMomentIndex.value = -1
}

const toggleEmojiPanel = () => {
  showEmojiPanel.value = !showEmojiPanel.value
}

const insertEmoji = (emoji) => {
  commentText.value += emoji
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

// 烟花特效 - 轻量演示
const showFireworks = ref(false)
const fireworks = ref([])
let fwId = 0
const removeFireworkById = (id) => {
  const idx = fireworks.value.findIndex(f => f.id === id)
  if (idx !== -1) fireworks.value.splice(idx, 1)
}
// 连续绽放：在给定时间窗内按次序依次发射，避免同一时刻全部出现
const launchFireworks = (bursts = 4, spreadMs = 1000) => {
  showFireworks.value = true
  const steps = Math.max(1, bursts)
  const stepGap = Math.floor(spreadMs / steps)
  for (let i = 0; i < steps; i++) {
    const delay = i * stepGap
    setTimeout(() => {
      const id = fwId++
      fireworks.value.push({
        id,
        x: Math.floor(10 + Math.random() * 80),
        y: Math.floor(18 + Math.random() * 54),
        theme: ['t-blue','t-violet','t-gold','t-mint','t-pink'][Math.floor(Math.random()*5)]
      })
      // 单枚烟花在动画结束后清理（与 CSS 动画时长匹配，略有冗余）
      setTimeout(() => {
        removeFireworkById(id)
        if (fireworks.value.length === 0) showFireworks.value = false
      }, 2200)
    }, delay)
  }
}

// 点赞达到一定阈值时触发烟花（演示：任意点赞触发一次）
const _origHandleLike = handleLike
const handleLikeWithFW = async (index) => {
  await _origHandleLike(index)
  launchFireworks(3)
}

// 持续烟花：定时发射
let fwTimer = null
const startFireworksLoop = () => {
  if (fwTimer) return
  showFireworks.value = true
  // 随机间隔发射，且每次在1.0~1.6s的时间窗内分散绽放，制造“连续感”
  fwTimer = setInterval(() => {
    const groups = 3 + Math.floor(Math.random() * 3) // 3~5组
    const spread = 1000 + Math.floor(Math.random() * 600) // 1.0s~1.6s
    launchFireworks(groups, spread)
  }, 1500 + Math.floor(Math.random() * 900)) // 1.5s~2.4s 间隔
}
const stopFireworksLoop = () => {
  clearInterval(fwTimer)
  fwTimer = null
  showFireworks.value = false
  fireworks.value = []
}

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
  { tag: '# 热议', title: '今天你匿名表白了吗？', sub: '真实表达让世界更温柔' },
  { tag: '# 附近', title: '城市树洞：说说你的小烦恼', sub: '有人正经历着同样的心情' },
  { tag: '# 推荐', title: '三件让你快乐的小事', sub: '记录微光，让生活发亮' },
])

const handleBannerTap = (t) => {
  uni.showToast({ title: t.tag + ' · ' + t.title, icon: 'none' })
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


// 表情列表
const emojiList = [
  '😊', '😂', '🤣', '❤️', '😍', '🤔', '😒', '👍', '👎',
  '😳', '🥺', '😭', '😘', '🤗', '🙄', '😴', '🤮', '🤧',
  '😷', '🤒', '🤕', '😈', '👻', '👽', '🤖', '💩', '😺',
  '💪', '👊', '✌️', '🤞', '🙏', '👏', '🙌', '👐', '🤲'
]
</script>

<style lang="scss" scoped>
$primary-gradient: linear-gradient(90deg, #5A8FFF 0%, #7F5AFF 100%);
$card-radius: 20rpx;
$shadow: 0 8rpx 32rpx rgba(90, 143, 255, 0.08);
$font-color-dark: #222;
$font-color-light: #666;
$background-color: #f7f9fb;
$action-color: #5A8FFF;

.moments-container {
  min-height: 100vh;
  background: $background-color;
  position: relative;
  
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
  height: 400rpx;
  overflow: hidden;
  border-bottom-left-radius: $card-radius;
  border-bottom-right-radius: $card-radius;

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
        }

        .active {
          color: #fff;
          background: rgba(127, 90, 255, 0.35);
          border-color: rgba(127, 90, 255, 0.65);
        }
      }
    }

    .hero-cta {
      width: 88rpx;
      height: 88rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: $primary-gradient;
      box-shadow: 0 6rpx 16rpx rgba(90, 143, 255, 0.35);

      .cta-plus {
        color: #fff;
        font-size: 48rpx;
        line-height: 1;
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
  margin: 24rpx 20rpx 8rpx 20rpx;

  .banner-swiper {
    height: 180rpx;
    border-radius: 16rpx;
    overflow: hidden;
  }

  .topic-card {
    height: 180rpx;
    padding: 22rpx 22rpx 22rpx 24rpx;
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

.moments-list {
  padding: 20rpx 20rpx 0 20rpx;

  .moment-item {
    display: flex;
    margin-bottom: 32rpx;
    padding: 32rpx 24rpx;
    background: #fff;
    border-radius: $card-radius;
    box-shadow: $shadow;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4rpx;
      background: $primary-gradient;
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
          gap: 30rpx;

          .action-btn {
            display: flex;
            align-items: center;
            padding: 12rpx 20rpx;
            border-radius: 30rpx;
            background: rgba(90, 143, 255, 0.06);
            border: 1rpx solid rgba(90, 143, 255, 0.18);
            position: relative;
            overflow: hidden;
            transition: all 0.3s;

            &::before {
              content: '';
              position: absolute;
              inset: 0;
              background: $primary-gradient;
              opacity: 0;
              transition: opacity 0.2s ease;
            }

            .icon {
              font-size: 32rpx;
              margin-right: 8rpx;
              color: $action-color;
              transition: transform 0.2s, color 0.2s;
            }

            .action-text {
              font-size: 24rpx;
              color: #666;
            }

            .action-count {
              margin-left: 6rpx;
              font-size: 22rpx;
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
          background: $primary-gradient;
          border-radius: 1rpx;
        }

        .like-users {
          font-size: 26rpx;
          color: $action-color;
        }
      }

      .comments-section {
        .comment-item {
          display: flex;
          align-items: center;
          font-size: 26rpx;
          margin-bottom: 8rpx;

          .comment-dot {
            width: 10rpx;
            height: 10rpx;
            background: $action-color;
            border-radius: 50%;
            margin-right: 10rpx;
          }

          .comment-user {
            color: $action-color;
            margin-right: 4rpx;
          }

          .comment-content {
            color: $font-color-dark;
          }
        }
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
      align-items: center;
      padding: 20rpx;
      border-top: 1rpx solid #eee;
      background: #f8f8f8;

      .comment-input {
        flex: 1;
        height: 72rpx;
        background: #fff;
        border-radius: 36rpx;
        padding: 0 30rpx;
        font-size: 28rpx;
        border: 1rpx solid #eee;
      }

      .toolbar {
        display: flex;
        align-items: center;
        margin-left: 20rpx;
        gap: 20rpx;

        .emoji-btn {
          font-size: 56rpx;
          line-height: 1;
          padding: 0 10rpx;

          &:active {
            opacity: 0.7;
          }
        }

        .submit-btn {
          min-width: 120rpx;
          height: 72rpx;
          line-height: 72rpx;
          text-align: center;
          background: #e0e6f6;
          color: #999;
          border-radius: 36rpx;
          font-size: 28rpx;
          border: none;

          &.active {
            background: $primary-gradient;
            color: #fff;
            font-weight: 600;
            box-shadow: 0 2rpx 8rpx #5A8FFF33;
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
    background: $primary-gradient;
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

// 烟花特效样式
.fireworks {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;

  .fw {
    position: absolute;
    width: 0;
    height: 0;
    transform: translate(-50%, -50%);
    animation: fw-pop 360ms ease-out;
  }

  .fw-p {
    position: absolute;
    width: 8rpx;
    height: 8rpx;
    border-radius: 50%;
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.2);
    animation: fw-burst 1600ms ease-out forwards;
  }

  // 12个方向发散
  @for $i from 1 through 12 {
    .p#{$i} { animation-delay: #{($i - 1) * 60}ms; }
  }

  // 位移向量（rpx）- 扩大10%
  .p1  { --tx:    0rpx;  --ty: -132rpx; }
  .p2  { --tx:   66rpx;  --ty: -114rpx; }
  .p3  { --tx:  114rpx;  --ty:  -66rpx; }
  .p4  { --tx:  132rpx;  --ty:    0rpx; }
  .p5  { --tx:  114rpx;  --ty:   66rpx; }
  .p6  { --tx:   66rpx;  --ty:  114rpx; }
  .p7  { --tx:    0rpx;  --ty:  132rpx; }
  .p8  { --tx:  -66rpx;  --ty:  114rpx; }
  .p9  { --tx: -114rpx;  --ty:   66rpx; }
  .p10 { --tx: -132rpx;  --ty:    0rpx; }
  .p11 { --tx: -114rpx;  --ty:  -66rpx; }
  .p12 { --tx:  -66rpx;  --ty: -114rpx; }

  // 主题色
  .t-blue { background: #5A8FFF; box-shadow: 0 0 8rpx rgba(90,143,255,0.8); }
  .t-violet { background: #7F5AFF; box-shadow: 0 0 8rpx rgba(127,90,255,0.8); }
  .t-gold { background: #f59e0b; box-shadow: 0 0 8rpx rgba(245,158,11,0.8); }
  .t-mint { background: #10b981; box-shadow: 0 0 8rpx rgba(16,185,129,0.8); }
  .t-pink { background: #ec4899; box-shadow: 0 0 8rpx rgba(236,72,153,0.8); }
}

@keyframes fw-pop {
  from { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
  to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
}

@keyframes fw-burst {
  0% { opacity: 1; transform: translate(-50%, -50%) scale(0.4); }
  80% { opacity: 1; }
  100% { opacity: 0; transform: translate(-50%, -50%) translate(var(--tx, 0), var(--ty, 0)) scale(1.2); }
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
    padding: 16rpx;

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

// 点赞粒子爆炸动画
.like-burst-particles {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 40rpx;
  height: 40rpx;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 2;

  .particle {
    position: absolute;
    width: 8rpx;
    height: 8rpx;
    border-radius: 50%;
    background: $primary-gradient;
    opacity: 0.7;
    animation: particleBurst 0.5s linear;
  }

  .p1 {
    left: 50%;
    top: 0%;
    animation-delay: 0s;
  }

  .p2 {
    left: 85%;
    top: 15%;
    animation-delay: 0.05s;
  }

  .p3 {
    left: 100%;
    top: 50%;
    animation-delay: 0.1s;
  }

  .p4 {
    left: 85%;
    top: 85%;
    animation-delay: 0.15s;
  }

  .p5 {
    left: 50%;
    top: 100%;
    animation-delay: 0.2s;
  }

  .p6 {
    left: 15%;
    top: 85%;
    animation-delay: 0.25s;
  }

  .p7 {
    left: 0%;
    top: 50%;
    animation-delay: 0.3s;
  }

  .p8 {
    left: 15%;
    top: 15%;
    animation-delay: 0.35s;
  }
}

@keyframes particleBurst {
  0% {
    transform: scale(0.5);
    opacity: 0.7;
  }

  80% {
    transform: scale(1.2);
    opacity: 1;
  }

  100% {
    transform: scale(1.8);
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
</style>
