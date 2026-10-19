# 信阳刘红律师 · 官网（new-site）

多页结构个人站：首页 / 关于我 / 经典案例 / 专业洞见 / 联系我。
主题：宣纸朱砂（主）＋ 近黑鎏金（联系区收尾）；结构取缪奇川式极简骨架，气口取朱满成式文学短句。

## 文件结构

```
new-site/
├── index.html               首页（导航 + Hero 头像 + 执业领域 + 工作方法 + 常见问答 + CTA）
├── about.html               关于我（照片 + 专业身份 + 执业档案 + 近期活动预留）
├── cases.html               经典案例（分类筛选 chips + 案例卡片，依据公开裁判文书整理）
├── insights.html            专业洞见（文章列表）
├── contact.html             联系我（电话/微信/邮箱/地址/公众号/网址 + 咨询表单 + 二维码）
├── posts/
│   └── website-launch.html  技能文章详情《我把信阳人常问的法律问题，搬到了一个网站上》
├── assets/
│   ├── style.css
│   ├── liu-hong-portrait.jpg   律师照片（已从 site/assets 复制）
│   ├── qrcode-wechat.png         个人微信二维码
│   └── qrcode-gh.jpg             公众号「世界有法」二维码
├── llms.txt                 站点实体档案（供 AI 读取）
├── sitemap.xml
└── robots.txt
```

## 部署前必做（三件事）

1. **换域名**：把每个页面 `<head>` 里注释掉的 `<link rel="canonical">` 启用，并改为
   `https://liuhonglawyer.cn/...` 绝对地址；同时把 JSON-LD 与各页 `BreadcrumbList` 里的
   `item` / `url` 占位 `https://liuhonglawyer.cn/...` 也替换成真实线上地址。
   不换会导致 AI 无法把「信阳刘红律师」归并成同一实体，直接废掉 GEO。
2. **换二维码**：微信二维码已就位（`assets/qrcode-wechat.png`），公众号二维码为 `assets/qrcode-gh.jpg`。
   后续任意一方更换，直接覆盖同名文件即可，无需改 HTML。
3. **确认照片**：`assets/liu-hong-portrait.jpg` 为正式照片（已复制）。

## 本次改造对照需求

- ✅ 增加律师照片（Hero 头像 + 关于页大照）
- ✅ 删除「不做胜诉承诺，只把在信阳怎么办讲清楚」（Hero 文案）；页脚合规声明保留「不承诺胜诉」
- ✅ 「服务信阳全境」→「常驻信阳，服务周边」
- ✅ 头衔标识：执业律师 / 企业管理专家 / 六西格玛黑带 / 法律AI应用专家（Hero badges + 关于页）
- ✅ 上传公众号技能文章（专业洞见首篇 + 详情页）
- ✅ 结构参照 suyinglaw.com/cases：列表页 + 分类筛选
- ✅ 菜单：首页 / 关于我 / 经典案例 / 专业洞见 / 联系我（全站 sticky 导航）
- ✅ 联系我：电话 / 微信 / 邮箱 / 律所地址 / 公众号 / 网址(liuhonglawyer.cn) / 咨询表单

## 已落实的 GEO 配置

- 首页 JSON-LD：`Attorney + LegalService + FAQPage`（10 条问答，答案与页面可见内容对应）
- 各内页 `BreadcrumbList`
- `llms.txt` 实体档案（别名消歧 + 专业身份 + 联系方式）
- `sitemap.xml` / `robots.txt`
- 文章详情按写作层规范：B1 一句话结论含「信阳」、B6 小标题问句化、B2 正文具名「刘红律师」、B3 文末常见追问

## 合规红线（勿删）

- 不承诺胜诉、不承诺取保候审或缓刑结果（页脚与文章声明保留）。
- 经典案例为公开裁判文书 / 本地法院口径的脱敏整理，标注「非个案代理结果」，不构成法律意见。

## 本地预览

```
cd new-site
python -m http.server 4173
# 浏览器打开 http://127.0.0.1:4173
```
