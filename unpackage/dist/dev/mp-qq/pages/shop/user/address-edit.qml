<view class="address-edit"><view class="form"><view class="form-item"><text class="label">联系人</text><input class="input" placeholder="请输入姓名" placeholder-class="placeholder" value="{{a}}" bindinput="{{b}}"/></view><view class="form-item"><text class="label">手机号</text><input class="input" type="number" maxlength="11" placeholder="请输入手机号" placeholder-class="placeholder" value="{{c}}" bindinput="{{d}}"/></view><view class="form-item" bindtap="{{g}}"><text class="label">所在地区</text><view class="area-picker"><text qq:if="{{e}}" class="value">{{f}}</text><text qq:else class="placeholder">请选择所在地区</text><text class="arrow">></text></view></view><view class="form-item"><text class="label">详细地址</text><textarea class="textarea" placeholder="请输入详细地址，如街道、楼牌号等" placeholder-class="placeholder" value="{{h}}" bindinput="{{i}}"/></view><view class="form-item"><text class="label">标签</text><view class="tags"><view qq:for="{{j}}" qq:for-item="tag" qq:key="b" class="{{['tag-item', tag.c && 'active']}}" bindtap="{{tag.d}}">{{tag.a}}</view><view class="{{['tag-item', 'custom', o && 'active']}}" bindtap="{{p}}"><text qq:if="{{k}}">自定义</text><input qq:else class="custom-input" bindblur="{{l}}" placeholder="自定义标签" value="{{m}}" bindinput="{{n}}"/></view></view></view><view class="form-item switch-item"><text class="label">设为默认地址</text><switch checked="{{q}}" bindchange="{{r}}" color="#ff6b6b"/></view></view><view class="footer"><view class="btn-group"><button qq:if="{{s}}" class="delete-btn" bindtap="{{t}}"> 删除 </button><button class="{{['save-btn', v && 'full-width']}}" bindtap="{{w}}"> 保存 </button></view></view></view>