<view class="user-container data-v-762fbaff"><view class="user-card glass-effect data-v-762fbaff"><view class="user-info data-v-762fbaff"><image src="{{a}}" class="avatar data-v-762fbaff" mode="aspectFill"/><view class="info-content data-v-762fbaff"><text class="nickname data-v-762fbaff">{{b}}</text><view class="member-tag data-v-762fbaff"><text class="tag-text data-v-762fbaff">{{c}}</text><text class="exp data-v-762fbaff">{{d}}/1000</text></view></view></view><view class="user-stats data-v-762fbaff"><view qq:for="{{e}}" qq:for-item="stat" qq:key="c" class="stat-item data-v-762fbaff" bindtap="{{stat.d}}"><text class="value data-v-762fbaff">{{stat.a}}</text><text class="label data-v-762fbaff">{{stat.b}}</text></view></view></view><view class="member-card glass-effect data-v-762fbaff" bindtap="{{f}}"><view class="card-left data-v-762fbaff"><text class="card-title data-v-762fbaff">会员码</text><text class="card-desc data-v-762fbaff">点击出示会员码</text></view><text class="card-icon data-v-762fbaff">🎫</text></view><view class="order-section glass-effect data-v-762fbaff"><view class="section-header data-v-762fbaff"><text class="title data-v-762fbaff">我的订单</text><view class="more data-v-762fbaff" bindtap="{{g}}"><text class="data-v-762fbaff">全部订单</text><text class="arrow data-v-762fbaff">→</text></view></view><view class="order-types data-v-762fbaff"><view qq:for="{{h}}" qq:for-item="type" qq:key="e" class="type-item data-v-762fbaff" bindtap="{{type.f}}"><text class="icon data-v-762fbaff">{{type.a}}</text><text class="label data-v-762fbaff">{{type.b}}</text><text qq:if="{{type.c}}" class="badge data-v-762fbaff">{{type.d}}</text></view></view></view><view class="feature-list glass-effect data-v-762fbaff"><view qq:for="{{i}}" qq:for-item="group" qq:key="c" class="feature-group data-v-762fbaff"><text class="group-title data-v-762fbaff">{{group.a}}</text><view class="group-content data-v-762fbaff"><view qq:for="{{group.b}}" qq:for-item="item" qq:key="e" class="feature-item data-v-762fbaff" bindtap="{{item.f}}"><view class="feature-left data-v-762fbaff"><text class="icon data-v-762fbaff">{{item.a}}</text><text class="label data-v-762fbaff">{{item.b}}</text></view><view class="feature-right data-v-762fbaff"><text qq:if="{{item.c}}" class="value data-v-762fbaff">{{item.d}}</text><text class="arrow data-v-762fbaff">→</text></view></view></view></view></view><view class="logout-btn data-v-762fbaff" bindtap="{{j}}">退出登录</view></view>