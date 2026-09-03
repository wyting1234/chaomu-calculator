# 朝暮计

个人计划与复盘 PWA 应用（单文件 Web 应用改造）。

## 安装为 APP
- 访问 https://wyting1234.github.io/chaomu-calculator/
- Android：Chrome 菜单 →「添加到主屏幕 / 安装应用」
- iPhone：Safari 分享 →「添加到主屏幕」

## 结构
- `index.html` — 应用主体（单文件，数据存 localStorage）
- `manifest.webmanifest` — PWA 应用清单
- `sw.js` — Service Worker 离线缓存（chaomu-v1）
- `icon-*.png` — 应用图标（日 + 月牙主题）
