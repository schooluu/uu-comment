<template>
  <view class="add-photos">
    <view class="nav">
      <text class="back" @tap="goBack">‹</text>
      <view class="center">
        <text class="title">新增照片</text>
        <text class="count">{{ photos.length }}/9</text>
      </view>
      <text class="done" :class="{ active: canSubmit }" @tap="handleSubmit">完成</text>
    </view>

    <view class="tip">
      <image class="tip-icon" src="https://img.icons8.com/fluency/48/camera.png" mode="aspectFit" />
      <text class="tip-text">最多选择 9 张，支持预览与删除</text>
    </view>

    <!-- 文案输入（可选） -->
    <view class="desc-card">
      <textarea class="desc-input" v-model="overallCaption" placeholder="为这组照片写一句话...（可选）" maxlength="120" />
    </view>

    <!-- 工具栏 -->
    <view class="toolbar">
      <view class="tb-btn" @tap="chooseFromAlbum">
        <image class="tb-ic" src="https://img.icons8.com/fluency/32/gallery.png" mode="aspectFit" />
        <text class="tb-txt">从相册</text>
      </view>
      <view class="tb-btn" @tap="takePhoto">
        <image class="tb-ic" src="https://img.icons8.com/fluency/32/camera.png" mode="aspectFit" />
        <text class="tb-txt">拍摄</text>
      </view>
      <view class="tb-btn ghost" @tap="clearAll" v-if="photos.length">
        <image class="tb-ic" src="https://img.icons8.com/fluency/32/trash.png" mode="aspectFit" />
        <text class="tb-txt">清空</text>
      </view>
    </view>

    <!-- 上传设置 -->
    <view class="cfg-card">
      <view class="cfg-row">
        <text class="cfg-label">压缩上传</text>
        <switch :checked="enableCompress" @change="onToggleCompress" />
      </view>
      <view class="cfg-row" v-if="enableCompress">
        <text class="cfg-label">质量</text>
        <slider class="cfg-slider" min="40" max="100" step="10" :value="quality" @change="onQualityChange" />
        <text class="cfg-val">{{ quality }}</text>
      </view>
    </view>

    <view class="grid">
      <view class="cell" v-for="(p,i) in photos" :key="i">
        <image :class="['img', { loaded: loadedMap[i] }]" :src="p.url" mode="aspectFill" @tap="preview(i)" @load="onImgLoad(i)" />
        <view class="del" @tap="remove(i)">✕</view>
        <input class="cap" v-model="p.caption" placeholder="添加说明（可选）" maxlength="40" />
      </view>
      <view v-if="photos.length < 9" class="add" @tap="choose">
        <text class="plus">+</text>
        <text class="txt">添加</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

const photos = ref([])
const canSubmit = computed(()=> photos.value.length > 0)
const loadedMap = ref({})
const enableCompress = ref(true)
const quality = ref(80)
const overallCaption = ref('')

const goBack = () => uni.navigateBack({ delta: 1 })

const choose = () => {
  uni.chooseImage({
    count: 9 - photos.value.length,
    success: async (res) => {
      const paths = (res.tempFiles && res.tempFiles.length) ? res.tempFiles.map(f=>f.path || f.tempFilePath || f) : (res.tempFilePaths || [])
      if (!paths.length) return
      uni.showLoading({ title: '上传中...' })
      try {
        const tasks = paths.map(path => new Promise((resolve, reject) => {
          const doUpload = (finalPath) => {
            uniCloud.uploadFile({
              filePath: finalPath,
              cloudPath: `wx-photos/${Date.now()}-${Math.random().toString(36).slice(-6)}${String(finalPath).match(/\.[^.]+$/)}`,
              success: (r) => resolve({ url: r.fileID, caption: '' }),
              fail: reject
            })
          }
          if (enableCompress.value) {
            uni.compressImage({
              src: path,
              quality: quality.value,
              success: (cr) => doUpload(cr.tempFilePath || cr.tempFiles?.[0]?.tempFilePath || path),
              fail: () => doUpload(path)
            })
          } else {
            doUpload(path)
          }
        }))
        const list = await Promise.all(tasks)
        photos.value.push(...list)
      } catch (e) {
        uni.showToast({ title: e.message || '上传失败', icon: 'none' })
      } finally {
        uni.hideLoading()
      }
    }
  })
}

const chooseFromAlbum = () => choose()
const takePhoto = () => {
  uni.chooseImage({
    count: 1,
    sourceType: ['camera'],
    success: (r) => {
      // 复用上传流程
      const res = { tempFilePaths: r.tempFilePaths, tempFiles: r.tempFiles }
      // @ts-ignore
      choose.call(null, res)
    }
  })
}
const clearAll = () => { photos.value = [] }
const onToggleCompress = (e) => { enableCompress.value = !!(e?.detail?.value) }
const onQualityChange = (e) => { quality.value = Number(e?.detail?.value || quality.value) }

const preview = (idx) => {
  const urls = photos.value.map(p=>p.url)
  uni.previewImage({ urls, current: urls[idx] })
}

const remove = (idx) => { photos.value.splice(idx, 1) }

const onImgLoad = (i) => { loadedMap.value[i] = true }

const handleSubmit = async () => {
  if (!canSubmit.value) return
  uni.showLoading({ title: '提交中...' })
  try {
    // 使用与 wx_add_moment 一致的新增接口
    const payload = {
      content: overallCaption.value || '',
      mediaList: photos.value.map(p => ({ type: 'image', url: p.url, caption: p.caption || '' })),
      location: '',
      privacy: 'public'
    }
    const { result } = await uniCloud.callFunction({ name: 'wx_add_moment', data: payload })
    if (!result || result.code !== 0) {
      throw new Error(result?.msg || '提交失败')
    }
    // 提交成功后回传到上一页并返回
    try { uni.$emit('photosAdded', photos.value) } catch (_) {}
    uni.showToast({ title: '已添加', icon: 'success' })
    setTimeout(()=>{ goBack() }, 600)
  } catch (e) {
    uni.showToast({ title: e.message || '提交失败', icon: 'none' })
  } finally {
    uni.hideLoading()
  }
}
</script>

<style lang="scss" scoped>
$primary-gradient: linear-gradient(90deg, #bec3cc 0%, #b2a8d4 100%);
.add-photos { 
  min-height: 100vh; 
  background: linear-gradient(180deg, #f7f9ff 0%, #f4f6fd 100%);
  position: relative;
}
.add-photos::before {
  content: '';
  position: fixed;
  inset: 0;
  background:
    radial-gradient(60% 60% at 15% 20%, rgba(90,143,255,0.06) 0%, rgba(90,143,255,0) 70%),
    radial-gradient(50% 50% at 85% 80%, rgba(127,90,255,0.06) 0%, rgba(127,90,255,0) 70%);
  pointer-events: none;
  z-index: 0;
}
.nav { display: flex; align-items: center; justify-content: space-between; padding: 20rpx 16rpx; background: $primary-gradient; color: #fff; position: sticky; top: 0; z-index: 10; box-shadow: 0 6rpx 18rpx rgba(90,143,255,0.25); }
.back { font-size: 44rpx; width: 64rpx; text-align: center; }
.center { display: flex; align-items: baseline; gap: 10rpx; }
.title { font-size: 32rpx; font-weight: 700; }
.count { font-size: 24rpx; opacity: 0.9; background: rgba(255,255,255,0.18); border: 1rpx solid rgba(255,255,255,0.35); padding: 4rpx 10rpx; border-radius: 999rpx; }
.done { font-size: 28rpx; opacity: 0.7; }
.done.active { opacity: 1; font-weight: 700; }
.tip { margin: 24rpx; padding: 18rpx; background: #fff; border-radius: 16rpx; color: #41506b; font-size: 24rpx; border: 1rpx solid rgba(0,0,0,0.04); display: flex; align-items: center; gap: 10rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.06); }
.tip-icon { width: 40rpx; height: 40rpx; }
.tip-text { font-size: 26rpx; }
.grid { margin: 24rpx; display: grid; grid-template-columns: repeat(3, 1fr); gap: 14rpx; }
.cell { position: relative; border-radius: 16rpx; overflow: hidden; background: #fff; border: 1rpx solid rgba(0,0,0,0.04); box-shadow: 0 6rpx 18rpx rgba(0,0,0,0.05); }
.img { width: 100%; height: 220rpx; object-fit: cover; display: block; transform: scale(1.01); opacity: 0; transition: opacity 0.35s ease, transform 0.35s ease; }
.img.loaded { opacity: 1; transform: scale(1); }
.del { position: absolute; right: 6rpx; top: 6rpx; width: 40rpx; height: 40rpx; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.6); color: #fff; font-weight: 700; }
.cap { position: absolute; left: 8rpx; right: 8rpx; bottom: 8rpx; height: 60rpx; border-radius: 12rpx; background: rgba(255,255,255,0.92); border: 1rpx solid #e5e9f3; padding: 0 12rpx; font-size: 24rpx; }
.add { height: 220rpx; border-radius: 14rpx; border: 2rpx dashed #dbe3ff; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #5A8FFF; background: #fff; transition: transform 0.2s ease, background 0.2s ease; box-shadow: 0 6rpx 18rpx rgba(0,0,0,0.04); }
.add:active { transform: scale(0.98); background: #f5f8ff; }
.plus { font-size: 56rpx; line-height: 1; }
.txt { font-size: 24rpx; }

.desc-card { margin: 0 24rpx 12rpx 24rpx; background: #fff; border-radius: 16rpx; border: 1rpx solid #eef1f7; box-shadow: 0 6rpx 18rpx rgba(0,0,0,0.04); }
.desc-input { min-height: 100rpx; padding: 16rpx 18rpx; font-size: 26rpx; line-height: 1.6; }

.toolbar { margin: 0 24rpx 8rpx 24rpx; display: flex; gap: 12rpx; }
.tb-btn { flex: none; display: inline-flex; align-items: center; gap: 8rpx; padding: 12rpx 16rpx; border-radius: 999rpx; background: rgba(90,143,255,0.08); border: 1rpx solid rgba(90,143,255,0.28); color: #5A8FFF; }
.tb-btn.ghost { background: #fff; color: #8b97ad; border-color: #e7eaf2; }
.tb-ic { width: 32rpx; height: 32rpx; }
.tb-txt { font-size: 24rpx; }

.cfg-card { margin: 0 24rpx 8rpx 24rpx; background: #fff; border-radius: 16rpx; border: 1rpx solid #eef1f7; box-shadow: 0 6rpx 18rpx rgba(0,0,0,0.04); }
.cfg-row { display: flex; align-items: center; justify-content: space-between; padding: 16rpx 18rpx; }
.cfg-label { font-size: 26rpx; color: #41506b; }
.cfg-slider { flex: 1; margin: 0 12rpx; }
.cfg-val { width: 80rpx; text-align: right; font-size: 24rpx; color: #6b7280; }
</style>
