<template>
  <div class="home-container">
    <!-- 顶部导航栏 -->
    <div class="header">
      <div class="title">富邦之家 🏠</div>
      <div class="more-btn">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    </div>

    <!-- 搜索栏 -->
    <div class="search-bar">
      <div class="category-btn" @click="showCategoryPicker">
        全部分类 
        <span class="arrow">▼</span>
      </div>
      <div class="search-input">
        <span class="search-icon">🔍</span>
        <input 
          type="text" 
          placeholder="找工作、找房子、找顺风车"
          @confirm="handleSearch"
          v-model="searchKeyword">
      </div>
    </div>

    <!-- 功能图标区 -->
    <div class="feature-grid">
      <div v-for="(item, index) in features" 
           :key="index" 
           class="feature-item"
           @click="handleFeatureClick(item)">
        <div class="icon-wrapper">
          <span class="icon">{{ item.emoji }}</span>
          <span v-if="item.badge" class="badge">{{ item.badge }}</span>
        </div>
        <div class="name">{{ item.name }}</div>
      </div>
    </div>

    <!-- 底部导航 -->
    <div class="bottom-nav">
      <div v-for="(tab, index) in tabs" 
           :key="index" 
           :class="['tab-item', { active: currentTab === index }]"
           @click="handleTabClick(tab, index)">
        <div class="tab-icon">{{ tab.emoji }}</div>
        <span class="tab-name">{{ tab.name }}</span>
      </div>
    </div>

    <!-- 添加横向滚动菜单和卡片部分 -->
    <div>
      <!-- 横向滚动菜单 -->
      <div class="scroll-menu">
        <div class="menu-item" @click="handleMenuClick('market')">
          <div class="menu-text">
            <span class="primary-text">同城二手</span>
            <span class="secondary-text">闲置换钱</span>
          </div>
          <span class="truck-emoji">🚛</span>
        </div>
        <div class="menu-item" @click="handleMenuClick('carpool')">
          <div class="menu-text">
            <span class="primary-text">顺风拼车</span>
            <span class="secondary-text">货物运输</span>
          </div>
          <span class="truck-emoji">🚛</span>
        </div>
        <div class="menu-item" @click="handleMenuClick('job')">
          <div class="menu-text">
            <span class="primary-text">求职招聘</span>
            <span class="secondary-text">信息发布</span>
          </div>
          <span class="water-emoji">💧</span>
        </div>
        <div class="menu-item" @click="handleMenuClick('house')">
          <div class="menu-text">
            <span class="primary-text">土地房产</span>
            <span class="secondary-text">房屋租售</span>
          </div>
          <span class="house-emoji">🏠</span>
        </div>
      </div>

      <!-- 最新头条 -->
      <div class="news-section">
        <div class="news-title">【最新头条】</div>
        <div class="news-content">用户发布信息协议条款</div>
      </div>

      <!-- 功能卡片区 -->
      <div class="card-section">
        <div class="card-row">
          <div class="card shop-card">
            <div class="card-tag">多快好省</div>
            <div class="card-icon">🛒</div>
            <div class="card-title">微商城</div>
            <div class="card-label">订阅</div>
          </div>
          <div class="card group-card">
            <div class="card-tag">呼朋引伴低价买</div>
            <div class="card-icon">🤝</div>
            <div class="card-title">拼团抢</div>
          </div>
        </div>
      </div>

      <!-- 热门商家列表 -->
      <div class="merchant-section">
        <div class="section-header">
          <div class="section-title">热门商家</div>
          <div class="more-link">更多 ></div>
        </div>
        
        <div class="merchant-list">
          <div v-for="(merchant, index) in merchants" 
               :key="index" 
               class="merchant-item"
               @click="handleMerchantClick(merchant)">
            <img :src="merchant.image" :alt="merchant.name" class="merchant-img">
            <div class="merchant-info">
              <div class="merchant-name">{{ merchant.name }}</div>
              <div class="merchant-tags">
                <span v-for="(tag, tagIndex) in merchant.tags" 
                      :key="tagIndex" 
                      class="tag">{{ tag }}</span>
              </div>
              <div class="merchant-address">
                <span class="location-icon">📍</span>
                {{ merchant.address }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTab: 0,
      features: [
        { name: '土地房产', emoji: '🏘️', badge: '热' },
        { name: '求职招聘', emoji: '💼', badge: '急' },
        { name: '闲置买卖', emoji: '🛍️' },
        { name: '车辆买卖', emoji: '🚗' },
        { name: '商户信息', emoji: '📢' },
        { name: '帮忙求助', emoji: '🆘' },
        { name: '同城活动', emoji: '🎉' },
        { name: '家有宠物', emoji: '🐱' },
        { name: '寻人找物', emoji: '🔍' },
        { name: '顺风拼车', emoji: '🚙' }
      ],
      tabs: [
        { name: '首页', emoji: '🏠' },
        { name: '商圈', emoji: '🏪' },
        { name: '发布', emoji: '➕' },
        { name: '名片', emoji: '👤' },
        { name: '我的', emoji: '😊' }
      ],
      merchants: [
        {
          name: "富邦超市",
          image: "https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/微信图片_20241123192816.png",
          tags: ["超市", "生鲜"],
          address: "富邦广场1楼"
        },
        {
          name: "富邦餐厅",
          image: "https://objectstorageapi.bja.sealos.run/ppny09lg-uu-img/微信图片_20241123192816.png",
          tags: ["美食", "特色"],
          address: "富邦广场2楼"
        }
      ],
      searchKeyword: ''
    }
  },
  methods: {
    handleFeatureClick(item) {
      // 根据功能名称跳转到对应页面
      switch(item.name) {
        case '土地房产':
          uni.navigateTo({ url: '/pages/city/house/index' })
          break
        case '求职招聘':
          uni.navigateTo({ url: '/pages/city/job/index' })
          break
        case '闲置买卖':
          uni.navigateTo({ url: '/pages/city/market/index' })
          break
        case '车辆买卖':
          uni.navigateTo({ url: '/pages/city/car/index' })
          break
        case '商户信息':
          uni.navigateTo({ url: '/pages/city/business/index' })
          break
        case '顺风拼车':
          uni.navigateTo({ url: '/pages/city/carpool/index' })
          break
        default:
          uni.showToast({
            title: '功能开发中...',
            icon: 'none'
          })
      }
    },
    handleTabClick(tab, index) {
      switch(tab.name) {
        case '首页':
          this.currentTab = index
          uni.reLaunch({ url: '/pages/city/home/index' })
          break
        case '商圈':
          this.currentTab = index
          uni.navigateTo({ url: '/pages/city/business/index' })
          break
        case '发布':
          uni.navigateTo({ url: '/pages/city/publish/index' })
          break
        case '名片':
          this.currentTab = index
          uni.navigateTo({ url: '/pages/city/card/index' })
          break
        case '我的':
          this.currentTab = index
          uni.navigateTo({ url: '/pages/city/user/index' })
          break
      }
    },
    handleMenuClick(type) {
      switch(type) {
        case 'market':
          uni.navigateTo({ url: '/pages/city/market/index' })
          break
        case 'carpool':
          uni.navigateTo({ url: '/pages/city/carpool/index' })
          break
        case 'job':
          uni.navigateTo({ url: '/pages/city/job/index' })
          break
        case 'house':
          uni.navigateTo({ url: '/pages/city/house/index' })
          break
      }
    },
    handleMerchantClick(merchant) {
      uni.navigateTo({
        url: `/pages/city/merchant/index?id=${merchant.id}`
      })
    },
    showCategoryPicker() {
      // 显示分类选择器
      uni.showActionSheet({
        itemList: ['全部', '房产', '招聘', '二手', '拼车'],
        success: (res) => {
          console.log('选择分类:', res.tapIndex)
        }
      })
    },
    handleSearch(e) {
      uni.navigateTo({
        url: `/pages/city/search/index?keyword=${this.searchKeyword}`
      })
    }
  }
}
</script>
<style scoped>
.home-container {
  min-height: 100vh;
  background: #f7f7f7;
  padding-bottom: 60px;
}

.header {
  background: linear-gradient(to right, #ff4444, #ff0000);
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.title {
  font-size: 18px;
  font-weight: bold;
}

.more-btn {
  display: flex;
  gap: 3px;
}

.dot {
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
}

.search-bar {
  background: white;
  margin: 10px;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  gap: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

.category-btn {
  color: #666;
  display: flex;
  align-items: center;
  gap: 4px;
}

.arrow {
  font-size: 12px;
  color: #999;
}

.search-input {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.search-input input {
  width: 100%;
  padding: 8px 8px 8px 30px;
  border: none;
  background: #f5f5f5;
  border-radius: 4px;
}

.search-icon {
  position: absolute;
  left: 8px;
  font-size: 14px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
  padding: 20px;
  background: white;
  margin-top: 10px;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}

.feature-item:active {
  transform: scale(0.95);
}

.icon-wrapper {
  position: relative;
}

.icon {
  font-size: 28px;
}

.badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff4444;
  color: white;
  font-size: 12px;
  padding: 2px 4px;
  border-radius: 8px;
}

.name {
  font-size: 12px;
  color: #333;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  background: white;
  padding: 8px 0;
  box-shadow: 0 -2px 6px rgba(0,0,0,0.05);
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.tab-icon {
  font-size: 24px;
}

.tab-name {
  font-size: 12px;
  color: #666;
}

.tab-item.active {
  color: #ff4444;
}

.tab-item.active .tab-name {
  color: #ff4444;
}

.scroll-menu {
  display: flex;
  overflow-x: auto;
  padding: 15px;
  background: white;
  gap: 20px;
  margin: 10px 0;
  -webkit-overflow-scrolling: touch;
}

.menu-item {
  display: flex;
  flex-direction: column;
  min-width: 90px;
  position: relative;
  padding: 10px;
  border-radius: 8px;
  background: #fff;
  transition: transform 0.2s;
}

.menu-item:active {
  transform: scale(0.98);
}

.menu-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.primary-text {
  color: #ff4444;
  font-size: 15px;
  font-weight: 500;
}

.secondary-text {
  color: #666;
  font-size: 12px;
}

.coin-icon, .truck-emoji, .water-emoji, .house-emoji {
  position: absolute;
  right: -5px;
  bottom: -5px;
  width: 24px;
  height: 24px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}

/* 隐藏滚动条但保持可滚动 */
.scroll-menu::-webkit-scrollbar {
  display: none;
}

.scroll-menu {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* 添加渐变阴影提示可滚动 */
.scroll-menu::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 30px;
  background: linear-gradient(to right, transparent, white);
  pointer-events: none;
}

.news-section {
  margin: 15px;
  padding: 10px;
  background: white;
  border-radius: 8px;
}

.news-title {
  color: #333;
  font-weight: bold;
}

.news-content {
  color: #666;
  font-size: 14px;
  margin-top: 5px;
}

.card-section {
  padding: 15px;
}

.card-row {
  display: flex;
  gap: 15px;
}

.card {
  flex: 1;
  background: white;
  padding: 15px;
  border-radius: 8px;
  position: relative;
}

.shop-card {
  background: linear-gradient(to right, #ffb6b6, #ff8989);
}

.group-card {
  background: linear-gradient(to right, #ffd700, #ffc000);
}

.card-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(255, 255, 255, 0.9);
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.card-icon {
  font-size: 24px;
  margin: 20px 0 10px;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  color: white;
}

.card-label {
  display: inline-block;
  padding: 2px 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  font-size: 12px;
  color: white;
  margin-top: 5px;
}

.merchant-section {
  background: white;
  margin: 15px;
  border-radius: 8px;
  padding: 15px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.more-link {
  color: #999;
  font-size: 14px;
}

.merchant-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.merchant-item {
  display: flex;
  gap: 12px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f5f5f5;
}

.merchant-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.merchant-img {
  width: 80px;
  height: 80px;
  border-radius: 4px;
  object-fit: cover;
}

.merchant-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.merchant-name {
  font-size: 15px;
  font-weight: bold;
  color: #333;
}

.merchant-tags {
  display: flex;
  gap: 6px;
}

.tag {
  background: #f5f5f5;
  color: #666;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
}

.merchant-address {
  color: #999;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.location-icon {
  font-size: 14px;
}
</style>
