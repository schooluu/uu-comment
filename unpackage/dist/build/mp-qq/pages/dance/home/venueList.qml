<view class="venue-container"><view class="nav-bar"><view class="back-btn" bindtap="{{a}}"><text class="iconfont">←</text></view><text class="title">场馆列表</text></view><view class="venue-list"><view qq:for="{{b}}" qq:for-item="venue" qq:key="h" class="venue-item" bindtap="{{venue.i}}"><image class="venue-image" src="{{venue.a}}" mode="aspectFill"></image><view class="venue-info"><text class="venue-name">{{venue.b}}</text><text class="venue-address">{{venue.c}}</text><view class="venue-tags"><text qq:for="{{venue.d}}" qq:for-item="tag" qq:key="b" class="tag">{{tag.a}}</text></view></view><view class="favorite-btn" catchtap="{{venue.g}}"><icon type="{{venue.e}}" size="40" color="{{venue.f}}"></icon></view></view></view></view>