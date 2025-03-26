<template>
    <view class="container">

        <!-- 添加头部标题 -->
        <view class="header">
            <view class="header-title">
                <text class="title-text">程序员工具箱</text>
                <text class="title-desc">实用开发工具集合</text>
            </view>
        </view>

        <!-- 添加链接按钮 -->
        <view class="add-link-box">
            <view class="add-link" @click="addLink">添加链接</view>
        </view>

        <!-- 分类滚动筛选 -->
        <scroll-view class="category-filter" scroll-x="true" show-scrollbar="false" :scroll-left="scrollLeft" scroll-with-animation="true" @scroll="onScroll" id="categoryScroll">
            <view 
                class="filter-item" 
                :class="{ active: currentCategory === 'all' }" 
                @click="filterByCategory('all', $event)"
                id="category-all">
                全部
            </view>
            <view 
                class="filter-item" 
                :class="{ active: currentCategory === key }" 
                v-for="(category, key) in categories" 
                :key="key"
                :id="'category-' + key"
                @click="filterByCategory(key, $event)">
                {{ key }}
            </view>
        </scroll-view>

        <!-- 分类区域 -->
        <view class="category-section" v-for="(category,key) in filteredCategories" :key="category.key">
            <!-- 分类标签 -->
            <view class="category-header">
                <view class="category-item">
                    <text>{{ key }}</text>
                </view>
            </view>

            <!-- 该分类下的链接列表 -->
            <view class="link-grid">
                <view class="link-item" v-for="item in category" :key="item._id">
                    <view class="link-content" @click="goto(item.linkAddress)">
                        <image
                            :src="item.iconUrl ? item.iconUrl : 'https://ico.mintab.cn/?url=' + getDomain(item.linkAddress)"
                            class="link-icon"></image>
                        <view class="link-info">
                            <text class="link-title">{{ item.linkName }}</text>
                            <text class="link-desc">{{ item.linkDescribe }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <!-- 添加加载更多提示 -->
        <view class="loading-more" v-if="isLoading">
            <text>加载中...</text>
        </view>
    </view>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import {
    onShow,
    onReachBottom,
    onPullDownRefresh,
    onPageScroll
} from '@dcloudio/uni-app';
// 添加获取域名的方法
const getDomain = (url) => {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname;
    } catch {
        return url;
    }
};

const categories = ref([]);
const currentCategory = ref('all'); // 添加当前选中的分类

// 计算属性：根据选中的分类筛选数据
const filteredCategories = computed(() => {
    if (currentCategory.value === 'all') {
        return categories.value;
    } else {
        // 只返回选中的分类
        const result = {};
        if (categories.value[currentCategory.value]) {
            result[currentCategory.value] = categories.value[currentCategory.value];
        }
        return result;
    }
});

const scrollLeft = ref(0);
const scrollViewWidth = ref(0);

// 筛选分类的方法
const filterByCategory = (category, event) => {
    currentCategory.value = category;
    
    // 使用 uniapp 的 API 获取元素位置信息
    const query = uni.createSelectorQuery();
    query.select('#category-' + category).boundingClientRect();
    query.select('.category-filter').boundingClientRect();
    query.exec(function(res) {
        if (res && res[0] && res[1]) {
            const itemRect = res[0];
            const scrollViewRect = res[1];
            
            // 计算元素中心点到滚动视图左边的距离
            const elementCenterX = itemRect.left + itemRect.width / 2;
            // 计算滚动视图中心点
            const scrollViewCenterX = scrollViewRect.left + scrollViewRect.width / 2;
            // 计算需要滚动的距离
            const scrollDistance = elementCenterX - scrollViewCenterX;
            
            // 更新滚动位置
            scrollLeft.value += scrollDistance;
        }
    });
};

// 监听滚动事件
const onScroll = (e) => {
    scrollLeft.value = e.detail.scrollLeft;
};

// 添加分页相关变量
const page = ref(1);
const pageSize = ref(30);
const hasMore = ref(true);
const isLoading = ref(false);

const goto = (url) => {
    window.parent.postMessage({
        url: url
    }, '*');
};

// 监听来自父窗口的消息确认
window.addEventListener('message', (event) => {
    const message = event.data;
    if (message && message.command === 'openExternalResult') {
        console.log('打开链接结果:', message.success ? '成功' : '失败');
    }
});

// 修改获取数据方法，支持分页
const fetchTipList = async (loadMore = false) => {
    if (isLoading.value) return;

    isLoading.value = true;

    const result = await uniCloud.callFunction({
        name: 'getTip',
        data: {
            page: page.value,
            pageSize: pageSize.value
        }
    });
    if (result.result && result.result.data.length > 0) {
        
        if(loadMore && Object.keys(categories.value).length > 0){
            // 将现有数据扁平化
            const existingData = flattenGroups(categories.value);
            // 合并现有数据和新数据，然后重新分组
            categories.value = groupBy([...existingData, ...result.result.data], 'type');
        } else {
            categories.value = groupBy(result.result.data, 'type');
        }
        console.log(categories.value);
        hasMore.value = result.result.hasMore;
        isLoading.value = false;
    } else {
        hasMore.value = false;
        isLoading.value = false;
    }
};

function flattenGroups(groupedObject) {
    // 检查是否为对象且有键
    if(Object.keys(groupedObject).length > 0){
        // 将所有分组的数组合并成一个扁平数组
        return Object.values(groupedObject).flat();
    } else {
        return [];
    }
}

function groupBy(array, key) {
    return array.reduce((result, currentValue) => {
        // 获取当前值的键值
        const groupKey = currentValue[key];
        
        // 如果结果对象中还没有这个键，则创建一个空数组
        if (!result[groupKey]) {
            result[groupKey] = [];
        }
        
        // 将当前值添加到对应的数组中
        result[groupKey].push(currentValue);
        
        return result;
    }, {});
}

// 添加加载更多方法
const loadMore = () => {
    if (hasMore.value && !isLoading.value) {
        page.value++;
        fetchTipList(true);
    }
};

// 添加链接
const addLink = () => {
    uni.showToast({
        title: '正在开发中',
        icon: 'none'
    });
    // 处理添加链接逻辑
};

onMounted(() => {
    fetchTipList();
});

onReachBottom(() => {
    // loadMore();
});
</script>

<style scoped>
.container {
    padding: 20rpx;
    background: #f8f9fa;
    min-height: 100vh;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx 10rpx;
    margin-bottom: 20rpx;
    border-bottom: 1rpx solid rgba(0, 0, 0, 0.05);
}

.header-title {
    display: flex;
    flex-direction: column;
}

.title-text {
    font-size: 40rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 8rpx;
    position: relative;
}

.title-text::after {
    content: '';
    position: absolute;
    bottom: -4rpx;
    left: 0;
    width: 60rpx;
    height: 6rpx;
    background: #4080ff;
    border-radius: 6rpx;
}

.title-desc {
    font-size: 24rpx;
    color: #888;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 12rpx;
}

.thumb-icon {
    width: 48rpx;
    height: 48rpx;
}

.header-right {
    display: flex;
    gap: 30rpx;
    color: #555;
    font-size: 28rpx;
}

.add-link-box {
    margin: 30rpx 0;
}

.add-link {
    border: 2rpx dashed #bbb;
    padding: 24rpx;
    text-align: center;
    border-radius: 16rpx;
    color: #555;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
}

.add-link:active {
    background: rgba(240, 240, 240, 0.8);
    transform: scale(0.98);
}

/* 分类滚动筛选样式 */
.category-filter {
    white-space: nowrap;
    margin-bottom: 30rpx;
    padding: 10rpx 0;
}

.filter-item {
    display: inline-block;
    padding: 12rpx 30rpx;
    margin-right: 20rpx;
    background: #fff;
    border-radius: 30rpx;
    font-size: 26rpx;
    color: #666;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
}

.filter-item.active {
    background: #4080ff;
    color: #fff;
    font-weight: 500;
}

.category-section {
    margin-bottom: 40rpx;
    animation: fadeIn 0.5s ease;
}

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

.category-header {
    display: flex;
    justify-content: space-between;
    padding: 20rpx 0;
    margin-bottom: 16rpx;
}

.category-item {
    display: flex;
    align-items: center;
    gap: 12rpx;
    position: relative;
}

.category-item text {
    font-size: 32rpx;
    font-weight: 600;
    color: #333;
    position: relative;
}

.category-item text::after {
    content: '';
    position: absolute;
    bottom: -6rpx;
    left: 0;
    width: 40%;
    height: 6rpx;
    background: #4080ff;
    border-radius: 6rpx;
}

.link-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24rpx;
}

.link-item {
    background: #fff;
    border-radius: 16rpx;
    padding: 24rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
    overflow: hidden;
}

.link-item:active {
    transform: translateY(2rpx);
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
}

.link-content {
    display: flex;
    align-items: center;
    gap: 24rpx;
    width: 100%;
}

.link-icon {
    width: 80rpx;
    height: 80rpx;
    min-width: 80rpx;
    border-radius: 16rpx;
    object-fit: cover;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
    background: #f5f5f5;
}

.link-info {
    flex: 1;
    overflow: hidden;

}

.link-title {
    font-size: 28rpx;
    font-weight: bold;
    margin-bottom: 8rpx;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    color: #222;
    word-break: break-all;
}

.link-desc {
    font-size: 22rpx;
    color: #888;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    line-height: 1.3;
    word-break: break-all;
}

/* 添加加载更多样式 */
.loading-more,
.no-more {
    text-align: center;
    padding: 30rpx 0;
    color: #999;
    font-size: 24rpx;
}
</style>