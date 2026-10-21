# 信阳刘红律师 · 官网

多页结构个人站：首页 / 关于我 / 经典案例 / 专业洞见 / 小区治理 / 联系我。
主题：宣纸朱砂（主）＋ 近黑鎏金（联系区收尾）；结构取缪奇川式极简骨架，气口取朱满成式文学短句。

## 🌐 线上地址（2026.10.21 起）

| 项目 | 值 |
|---|---|
| **正式域名（主推）** | **https://liuhonglawyer.cn** |
| 备用地址 | https://www.liuhonglawyer.cn |
| Cloudflare 原生地址 | https://liuhonglawyer.pages.dev |
| 历史过渡站（仍可访问） | https://atongmuliuhong.github.io/ |
| 托管方式 | Cloudflare Pages（全球 CDN + 自动 HTTPS） |
| 源目录 | `D:\phpstudy_pro\WWW\liuhong_lawyer`（本目录为其工作区源码） |

**部署命令**（改完本目录内容后执行）：

```bash
cd C:/Users/86138/.workbuddy/binaries/node/workspace
export CLOUDFLARE_API_TOKEN="<cfut_ 开头的 Pages Token>"
export CLOUDFLARE_ACCOUNT_ID="06d32f145e4f45fac0c69540ffb235b1"
node node_modules/wrangler/bin/wrangler.js pages deploy "D:/phpstudy_pro/WWW/liuhong_lawyer" --project-name liuhonglawyer --branch production
```

**DNS**：Cloudflare 已托管 `liuhonglawyer.cn`，Nameserver 为 `alla.ns.cloudflare.com` / `jihoon.ns.cloudflare.com`；
`liuhonglawyer.cn` 与 `www.liuhonglawyer.cn` 均 CNAME 指向 `liuhonglawyer.pages.dev`（已开橙云代理）。

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
│   ├── liu-hong-portrait.png   律师照片（已从 site/assets 复制）
│   ├── qrcode-wechat.png         个人微信二维码
│   └── qrcode-gh.jpg             公众号「世界有法」二维码
├── llms.txt                 站点实体档案（供 AI 读取）
├── sitemap.xml
└── robots.txt
```

## 部署前必做（三件事）—— ✅ 2026.10.21 已全部完成

1. **换域名（已完成）**：全站 `<link rel="canonical">`、`og:url`、`og:image`、JSON-LD `url` / `@id`、
   各页 `BreadcrumbList` 的 `item`、`sitemap.xml`、`robots.txt` 已统一为 `https://liuhonglawyer.cn/...`
   （54 个文件、322 处引用，2026.10.21 由脚本批量完成）。不换会导致 AI 无法把「信阳刘红律师」
   归并成同一实体，直接废掉 GEO——已不再有此风险。
2. **换二维码（已完成）**：`assets/qrcode-wechat.png`（个人微信）+ `assets/qrcode-gh.jpg`（公众号「世界有法」）。
   后续任意一方更换，直接覆盖同名文件即可，无需改 HTML。
3. **确认照片（已完成）**：`assets/liu-hong-portrait.png` 为正式照片（原 PNG 源无损保留，边缘清晰）。

### 待跟进事项

- [ ] 在 Bing 站长平台 / 百度搜索资源平台提交 `https://liuhonglawyer.cn/sitemap.xml`，加速主域收录
- [ ] 观察 2–4 周过渡站 `atongmuliuhong.github.io` 的既有收录是否向主域迁移；必要时在过渡站加 canonical 指向主域
- [ ] 公众号菜单、文末简介、各第三方平台资料的官网地址统一改为 `https://liuhonglawyer.cn`


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
