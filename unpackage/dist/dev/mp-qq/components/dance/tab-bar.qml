<view class="tab-bar"><view qq:for="{{a}}" qq:for-item="item" qq:key="c" class="{{['tab-item', item.d && 'active']}}" bindtap="{{item.e}}"><text class="text">{{item.a}}</text><view qq:if="{{item.b}}" class="indicator"></view></view></view>