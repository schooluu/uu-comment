<view class="user-container data-v-7e078e90"><view class="user-card glass-effect data-v-7e078e90"><view class="user-info data-v-7e078e90"><image src="{{a}}" class="avatar data-v-7e078e90" mode="aspectFill"/><view class="info-content data-v-7e078e90"><text class="nickname data-v-7e078e90">{{b}}</text><view class="member-tag data-v-7e078e90"><text class="tag-text data-v-7e078e90">{{c}}</text><text class="exp data-v-7e078e90">{{d}}/1000</text></view></view></view><view class="user-stats data-v-7e078e90"><view qq:for="{{e}}" qq:for-item="stat" qq:key="c" class="stat-item data-v-7e078e90" bindtap="{{stat.d}}"><text class="value data-v-7e078e90">{{stat.a}}</text><text class="label data-v-7e078e90">{{stat.b}}</text></view></view></view><view class="member-card glass-effect data-v-7e078e90" bindtap="{{f}}"><view class="card-left data-v-7e078e90"><text class="card-title data-v-7e078e90">会员码</text><text class="card-desc data-v-7e078e90">点击出示会员码</text></view><text class="card-icon data-v-7e078e90">🎫</text></view><view class="order-section glass-effect data-v-7e078e90"><view class="section-header data-v-7e078e90"><text class="title data-v-7e078e90">我的订单</text><view class="more data-v-7e078e90" bindtap="{{g}}"><text class="data-v-7e078e90">全部订单</text><text class="arrow data-v-7e078e90">→</text></view></view><view class="order-types data-v-7e078e90"><view qq:for="{{h}}" qq:for-item="type" qq:key="e" class="type-item data-v-7e078e90" bindtap="{{type.f}}"><text class="icon data-v-7e078e90">{{type.a}}</text><text class="label data-v-7e078e90">{{type.b}}</text><text qq:if="{{type.c}}" class="badge data-v-7e078e90">{{type.d}}</text></view></view></view><view class="feature-list glass-effect data-v-7e078e90"><view qq:for="{{i}}" qq:for-item="group" qq:key="c" class="feature-group data-v-7e078e90"><text class="group-title data-v-7e078e90">{{group.a}}</text><view class="group-content data-v-7e078e90"><view qq:for="{{group.b}}" qq:for-item="item" qq:key="e" class="feature-item data-v-7e078e90" bindtap="{{item.f}}"><view class="feature-left data-v-7e078e90"><text class="icon data-v-7e078e90">{{item.a}}</text><text class="label data-v-7e078e90">{{item.b}}</text></view><view class="feature-right data-v-7e078e90"><text qq:if="{{item.c}}" class="value data-v-7e078e90">{{item.d}}</text><text class="arrow data-v-7e078e90">→</text></view></view></view></view></view><view class="logout-btn data-v-7e078e90" bindtap="{{j}}">退出登录</view></view>