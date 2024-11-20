<template>
    <view class="filter-popup" v-if="show">
        <view class="popup-mask" :class="{ closing: show }" @tap="close"></view>
        <view class="popup-content">
            <!-- 顶部标签栏 -->
            <view class="tab-bar">
                <view v-for="(tab, index) in tabs" :key="index" class="tab-item"
                    :class="{ active: currentTab === index }" @tap="switchTab(index)">
                    {{ tab }}
                    <view class="indicator" v-if="currentTab === index"></view>
                </view>
            </view>

            <!-- 选项列表 -->
            <scroll-view class="options-list" scroll-y>
                <template v-if="currentTab === 1"> <!-- 时段选项特殊处理 -->
                    <view class="option-row">
                        <view class="option-item full-width" :class="{ active: selectedOption === '全部' }"
                            @tap="selectOption('全部')">
                            全部
                        </view>
                    </view>

                    <view class="option-grid">
                        <view v-for="(item, index) in timeList.slice(1)" :key="index" class="option-item"
                            :class="{ active: selectedOption === item.time }" @tap="selectOption(item.time)">
                            {{ item.time }}
                        </view>
                    </view>
                </template>

                <template v-else-if="currentTab === 3"> <!-- 导师选项特殊处理 -->
                    <view class="teacher-section">
                        <view class="filter-content">
                            <!-- 左侧分类 -->
                            <view class="city-categories">
                                <view class="category-item" :class="{ active: selectedCategory === '明星导师' }"
                                    @tap="selectCategory('明星导师')">
                                    明星导师
                                </view>
                                <view v-for="(city, index) in cities" :key="index" class="category-item"
                                    :class="{ active: selectedCategory === `人气导师-${city}` }"
                                    @tap="selectCategory(`人气导师-${city}`)">
                                    人气导师 - {{ city }}
                                </view>
                                <view class="category-item" :class="{ active: selectedCategory === '新晋导师' }"
                                    @tap="selectCategory('新晋导师')">
                                    新晋导师
                                </view>
                                <view class="category-item" :class="{ active: selectedCategory === '零基础' }"
                                    @tap="selectCategory('零基础')">
                                    零基础
                                </view>
                                <view class="category-item" :class="{ active: selectedCategory === '已收藏的导师' }"
                                    @tap="selectCategory('已收藏的导师')">
                                    已收藏的导师
                                </view>
                            </view>

                            <!-- 右侧导师列表 -->
                            <scroll-view class="teacher-list" scroll-y>
                                <view class="teacher-item" v-for="(teacher, index) in currentTeachers" :key="index"
                                    :class="{ active: selectedOption === teacher.name }"
                                    @tap="selectOption(teacher.name)">
                                    <image class="teacher-avatar" :src="teacher.avatar" mode="aspectFill" />
                                    <text class="teacher-name">{{ teacher.name }}</text>
                                </view>
                            </scroll-view>
                        </view>
                    </view>
                </template>

                <template v-else>
                    <!-- 其他标签的选项列表保持原样 -->
                    <view class="option-row">
                        <view class="option-item full-width" :class="{ active: selectedOption === '全部' }"
                            @tap="selectOption('全部')">
                            全部
                        </view>
                    </view>

                    <view class="option-row" v-if="currentTab === 0">
                        <view class="option-item full-width" :class="{ active: selectedOption === '已收藏的门店' }"
                            @tap="selectOption('已收藏的门店')">
                            已收藏的门店
                        </view>
                    </view>

                    <view class="option-grid">
                        <view class="option-item" v-for="(item, index) in currentOptions" :key="index"
                            :class="{ active: selectedOption === item }" @tap="selectOption(item)">
                            {{ item }}
                        </view>
                    </view>
                </template>
            </scroll-view>

            <!-- 底部按钮 -->
            <view class="popup-footer">
                <view class="btn btn-clear" @tap="clearSelection">清空</view>
                <view class="btn btn-confirm" @tap="confirm">确认</view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
    show: Boolean,
    filterType: String
})

const emit = defineEmits(['update:show', 'confirm'])

const tabs = ['门店', '1个时段', '风格', '导师']
const currentTab = ref(0)
const selectedOption = ref('全部')
const selectedCategory = ref('明星导师')
const selectedCity = ref('')

const storeList = [
    'FancyFancy舞室金鹰店',
    'FancyFancy舞室南京店',
    'FancyFancy舞室博荟店',
    'FancyFancy成都晶融汇店',
    'FancyFancy舞室大悦城店',
    'FancyFancy舞室梅奔店',
    'FancyFancy舞室嘉里合集店',
    'FancyFancy舞室华润店',
    'FancyFancy舞室杭州中心店',
    'FancyFancy舞室人广来福士店',
    'FancyFancy舞室徐汇传媒港店',
    'FancyFancy舞室长宁来福士店'
]

const timeList = [
    { time: '全部', value: 'all' },
    { time: '08:00 ~ 10:00', value: '08-10' },
    { time: '10:00 ~ 12:00', value: '10-12' },
    { time: '12:00 ~ 14:00', value: '12-14' },
    { time: '14:00 ~ 16:00', value: '14-16' },
    { time: '16:00 ~ 18:00', value: '16-18' },
    { time: '18:00 ~ 20:00', value: '18-20' },
    { time: '20:00 ~ 22:00', value: '20-22' }
]

const teacherList = {
    '明星导师': [
        { name: 'APHRODITE', avatar: '/static/teachers/aphrodite.jpg' },
        { name: 'CHERRY', avatar: '/static/teachers/cherry.jpg' },
        { name: 'DEVIN PORNEL', avatar: '/static/teachers/devin.jpg' },
        { name: 'DOYUN', avatar: '/static/teachers/doyun.jpg' },
        { name: 'JUNHO LEE', avatar: '/static/teachers/junho.jpg' },
        { name: 'MAAIN', avatar: '/static/teachers/maain.jpg' },
        { name: 'MARLEE HIGHTOWER', avatar: '/static/teachers/marlee.jpg' }
    ],
    // ... 其他分类的导师列表
}

const cities = ['上海', '杭州', '南京', '成都']

// 根据当前选中的标签显示不同的选项列表
const currentOptions = computed(() => {
    switch (currentTab.value) {
        case 0: // 门店
            return storeList
        case 1: // 时段
            return timeList
        case 2: // 风格
            return styleList
        case 3: // 导师
            return teacherList
        default:
            return []
    }
})

const currentTeachers = computed(() => {
    return teacherList[selectedCategory.value] || []
})

const switchTab = (index) => {
    currentTab.value = index
}

const selectOption = (option) => {
    selectedOption.value = option
}

const clearSelection = () => {
    selectedOption.value = '全部'
}

const close = () => {
    emit('update:show', false)
}

const confirm = () => {
    emit('confirm', {
        type: tabs[currentTab.value],
        value: selectedOption.value
    })
    close()
}

const selectCategory = (category) => {
    selectedCategory.value = category
    selectedOption.value = '全部' // 重置选中的导师
}

const selectCity = (city) => {
    selectedCity.value = city
}

// 根据类型获取选项列表
const getOptionsByType = (type) => {
    switch (type) {
        case 'store':
            return [
                '全部',
                '已收藏的门店',
                'FancyFancy舞室金鹰店',
                'FancyFancy舞室南京店',
                // ... 其他门店
            ]
        case 'time':
            return [
                '全部时段',
                '上午(10:00-12:00)',
                '中午(12:00-14:00)',
                '下午(14:00-18:00)',
                '晚上(18:00-22:00)'
            ]
        case 'style':
            return [
                '全部风格',
                'Jazz',
                'Hip-hop',
                'Urban',
                'Contemporary',
                'Kpop'
            ]
        case 'teacher':
            return [
                '全部导师',
                '推荐导师',
                '收藏导师'
            ]
        default:
            return []
    }
}

// 监听筛选类型变化
watch(() => props.filterType, (newType) => {
    if (newType) {
        currentOptions.value = getOptionsByType(newType)
    }
})
</script>

<style lang="scss" scoped>
.filter-popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;

    .popup-mask {
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        animation: fadeIn 0.3s ease;
    }

    .popup-content {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 85vh;
        background: #141123f5;
        border-radius: 32rpx 32rpx 0 0;
        display: flex;
        flex-direction: column;
        animation: slideUp 0.3s ease;
        box-shadow: 0 -4rpx 24rpx rgba(0, 0, 0, 0.2);
    }

    .tab-bar {
        display: flex;
        padding: 30rpx 40rpx;
        border-bottom: 1rpx solid rgba(255, 255, 255, 0.1);

        .tab-item {
            position: relative;
            color: rgba(255, 255, 255, 0.6);
            font-size: 32rpx;
            margin-right: 60rpx;
            padding-bottom: 16rpx;

            &.active {
                color: #fff;
                font-weight: 500;

                .indicator {
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 8rpx;
                    height: 8rpx;
                    background: #FF4D8F;
                    border-radius: 50%;
                }
            }
        }
    }

    .options-list {
        flex: 1;
        padding: 20rpx 30rpx;
        box-sizing: border-box;

        .option-row {
            margin-bottom: 20rpx;

            .option-item.full-width {
                width: 100%;
            }
        }

        .option-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20rpx;
            padding-bottom: 30rpx;
        }

        .option-item {
            padding: 24rpx 20rpx;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 100rpx;
            color: rgba(255, 255, 255, 0.9);
            font-size: 28rpx;
            text-align: center;
            transition: all 0.3s ease;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            &:active {
                transform: scale(0.95);
            }

            &.active {
                background: #FF4D8F;
                color: #fff;
                box-shadow: 0 4rpx 12rpx rgba(255, 77, 143, 0.3);
            }
        }
    }

    .popup-footer {
        padding: 30rpx;
        display: flex;
        gap: 20rpx;
        width: 100vw;
        bottom: 0px;
        width: 100vw;
        bottom: 0px;
        position: absolute;

        .btn {
            flex: 1;
            height: 88rpx;
            line-height: 88rpx;
            text-align: center;
            border-radius: 44rpx;
            font-size: 30rpx;

            &.btn-clear {
                background: rgba(255, 255, 255, 0.1);
                color: #fff;
            }

            &.btn-confirm {
                background: #FF4D8F;
                color: #fff;
            }
        }
    }
}

@keyframes slideUp {
    from {
        transform: translateY(100%);
    }

    to {
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

.popup-content.closing {
    animation: slideDown 0.3s ease forwards;
}

.popup-mask.closing {
    animation: fadeOut 0.3s ease forwards;
}

@keyframes slideDown {
    from {
        transform: translateY(0);
    }

    to {
        transform: translateY(100%);
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}

// 优化滚动条样式
::-webkit-scrollbar {
    width: 8rpx;
}

::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4rpx;
}

.teacher-section {
    height: 100%;

    .filter-content {
        display: flex;
        height: 100%;

        .city-categories {
            width: 240rpx;
            background: rgba(255, 255, 255, 0.02);
            border-right: 2rpx solid rgba(255, 255, 255, 0.05);

            .category-item {
                padding: 32rpx 30rpx;
                color: rgba(255, 255, 255, 0.6);
                font-size: 28rpx;
                transition: all 0.3s ease;
                position: relative;

                &.active {
                    color: #fff;
                    background: rgba(255, 77, 143, 0.1);
                    font-weight: 500;

                    &::after {
                        content: '';
                        position: absolute;
                        left: 0;
                        top: 50%;
                        transform: translateY(-50%);
                        width: 6rpx;
                        height: 32rpx;
                        background: #FF4D8F;
                        border-radius: 0 4rpx 4rpx 0;
                    }
                }

                &:active {
                    opacity: 0.8;
                }
            }
        }

        .teacher-list {
            flex: 1;
            padding: 20rpx;

            .teacher-item {
                display: flex;
                align-items: center;
                padding: 24rpx;
                margin-bottom: 20rpx;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 16rpx;
                transition: all 0.3s ease;

                &.active {
                    background: #FF4D8F;
                }

                &:active {
                    transform: scale(0.98);
                    opacity: 0.9;
                }

                .teacher-avatar {
                    width: 88rpx;
                    height: 88rpx;
                    border-radius: 50%;
                    margin-right: 24rpx;
                    border: 2rpx solid rgba(255, 255, 255, 0.1);
                }

                .teacher-name {
                    color: #fff;
                    font-size: 28rpx;
                    font-weight: 500;
                }
            }
        }
    }
}
</style>