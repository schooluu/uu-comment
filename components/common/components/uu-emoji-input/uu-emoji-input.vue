<template>
  <view v-show="modelValue" class="comment-mask" @click="$emit('update:modelValue', false)">
    <!-- 评论弹窗 -->
    <view class="comment-popup" @click.stop>
      <view class="comment-box">
        <!-- 评论输入区域 -->
        <view class="comment-input-area">
          <input 
            class="comment-input"
            v-model="commentText"
            placeholder="评论"
            :focus="modelValue"
            @confirm="handleSubmit"
          />
          <view class="toolbar">
            <text class="emoji-btn" @tap="toggleEmojiPanel">😊</text>
            <button 
              class="submit-btn" 
              :class="{ active: commentText.trim() }"
              @tap="handleSubmit"
            >发送</button>
          </view>
        </view>
        
        <!-- 表情面板 -->
        <view class="emoji-panel" v-if="showEmojiPanel">
          <scroll-view scroll-y class="emoji-list">
            <view class="emoji-group">
              <text 
                v-for="(emoji, index) in emojiList" 
                :key="index"
                class="emoji-item"
                @tap="insertEmoji(emoji)"
              >{{ emoji }}</text>
            </view>
          </scroll-view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'UuEmojiInput',
  
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },

  emits: ['update:modelValue', 'submit'],
  
  data() {
    return {
      commentText: '',
      showEmojiPanel: false,
      emojiList: [
        // 表情类
        '😊', '😂', '🤣', '😍', '😒', '😘', '🤔', '😅', '😭', '😃', '😄', '😁', 
        '😆', '😉', '😋', '😎', '😌', '😏', '😐', '😑', '😒', '😓', '😔', '😕',
        '😖', '😗', '😙', '😚', '😛', '😜', '😝', '😞', '😟', '😢', '😤', '😥',

        // 手势类
        '👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '👊', '✊', '🤛', '🤜', '👏',
        
        // 心形类
        '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '💕', '💞', '💓', '💗', '💖',
        
        // 其他符号
        '🎉', '✨', '⭐', '🌟', '💫', '🔥', '💯', '💪', '🤝', '🙏', '💐', '🌸',
        '🎵', '🎶', '💡', '💭', '💬', '🗯️', '💝', '🎁', '🎈', '🎊'
      ]
    }
  },

  methods: {
    toggleEmojiPanel() {
      this.showEmojiPanel = !this.showEmojiPanel
    },

    insertEmoji(emoji) {
      this.commentText += emoji
    },

    handleSubmit() {
      if (!this.commentText.trim()) {
        return
      }
      this.$emit('submit', this.commentText)
      this.commentText = ''
      this.showEmojiPanel = false
      this.$emit('update:modelValue', false)
    }
  }
}
</script>

<style scoped>
.comment-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
}

.comment-popup {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}

.comment-box {
  background-color: #f7f7f7;
  animation: slideUp 0.2s ease-out;
}

.comment-input-area {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  gap: 8px;
}

.comment-input {
  flex: 1;
  height: 36px;
  background: #fff;
  border-radius: 4px;
  padding: 0 12px;
  font-size: 14px;
  border: none;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
}

.emoji-btn {
  font-size: 24px;
  line-height: 1;
  padding: 4px;
  color: #666;
}

.emoji-btn:active {
  opacity: 0.7;
}

.submit-btn {
  min-width: 56px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background: #ededed;
  color: #999;
  border-radius: 4px;
  font-size: 14px;
  padding: 0;
  border: none;
}

.submit-btn.active {
  background: #07c160;
  color: #fff;
}

.emoji-panel {
  height: 220px;
  background: #fff;
  border-top: 1px solid #eee;
  animation: slideUp 0.2s ease-out;
}

.emoji-list {
  height: 100%;
}

.emoji-group {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 8px;
}

.emoji-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  font-size: 20px;
}

.emoji-item:active {
  background: #f5f5f5;
  border-radius: 4px;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>