# wx_upload 云函数配置说明

## 功能说明
此云函数作为上传代理，解决前端直接上传时的 CORS 跨域问题。

## 工作原理
```
前端 uni.uploadFile → 云函数 URL (无 CORS 限制) → 目标服务器 (http://117.72.208.124:40027/upload)
```

## 配置步骤

### 1. 安装依赖
在云函数目录下运行：
```bash
cd uniCloud-aliyun/cloudfunctions/wx_upload
npm install form-data
```

### 2. 上传并部署云函数
在 HBuilderX 中：
1. 右键点击 `wx_upload` 云函数
2. 选择"上传部署"
3. 等待部署完成

### 3. 开启云函数 URL 化（重要）
1. 登录 [uniCloud Web控制台](https://unicloud.dcloud.net.cn/)
2. 选择您的服务空间
3. 进入"云函数" → 找到 `wx_upload`
4. 点击"详情" → "云函数URL化"
5. 点击"开启"
6. 复制生成的 URL 地址（类似：`https://fc-xxx.service.tcloudbase.com/wx_upload`）

### 4. 配置前端
打开 `pages/wx/home/add.vue`，找到第 249 行：
```javascript
const CLOUD_FUNCTION_URL = 'YOUR_CLOUD_FUNCTION_URL'
```

将 `YOUR_CLOUD_FUNCTION_URL` 替换为步骤3中复制的云函数 URL。

例如：
```javascript
const CLOUD_FUNCTION_URL = 'https://fc-mp-xxx.service.tcloudbase.com/wx_upload'
```

## 优势
✅ 无需 base64 转换，直接上传原始文件  
✅ 避免 CORS 跨域问题  
✅ 云函数自动处理转发  
✅ 支持大文件上传  
✅ 性能更好，减少数据转换

## 测试
配置完成后：
1. 运行项目
2. 进入发布动态页面
3. 选择图片上传
4. 查看控制台输出和上传结果

## 故障排查

### 错误：上传失败
- 检查云函数是否已部署
- 检查云函数 URL 是否已开启
- 检查前端配置的 URL 是否正确

### 错误：form-data 模块未找到
```bash
cd uniCloud-aliyun/cloudfunctions/wx_upload
npm install
```

### 错误：目标服务器连接失败
- 检查目标服务器地址是否正确
- 检查服务器是否在线
- 检查云函数是否有网络访问权限

## 备注
- 云函数有访问频率限制，请根据实际情况调整
- 建议在生产环境使用 HTTPS
- 可以在云函数中添加更多的安全校验逻辑

