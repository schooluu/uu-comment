<view class="container"><view class="header"><text class="title">活动报名</text></view><view class="activity-list"><view qq:for="{{a}}" qq:for-item="activity" qq:key="i" class="activity-item"><image class="cover" src="{{activity.a}}" mode="aspectFill"></image><view class="content"><text class="name">{{activity.b}}</text><view class="info"><text class="time">{{activity.c}}</text><text class="location">{{activity.d}}</text></view><view class="status-bar"><text class="price">¥{{activity.e}}</text><button class="{{['join-btn', activity.g]}}" bindtap="{{activity.h}}">{{activity.f}}</button></view></view></view></view></view>