## 项目概况

* 技术栈：VitePress + 自定义主题（`.vitepress/theme`，Curve）。

* 文章来源：`posts/` 目录下的 Markdown（`getPostData.mjs` 只会处理 `posts/`）。

* 站点配置来源：`.vitepress/theme/assets/themeConfig.mjs`；可被根目录 `themeConfig.mjs` 覆盖（当前不存在）。

## 变更范围

* 站点标识与文案：标题、描述、作者信息、导航、页脚社交等。

* 清理默认文档：移除根目录 `README.md`（主题性文档）。

* 创建首篇博客：在 `posts/` 新建 Markdown，注入您提供的个人介绍内容。

* 包元信息：将 `package.json` 的 `name/description/author/...` 更新为博客相关。

* 保留必要页面：`pages/archives|categories|tags|about|link|privacy|cc|project` 保留；移除/修正会导致 404 的导航项。

## 实施步骤

1. 更新站点身份（`.vitepress/theme/assets/themeConfig.mjs`）

* `siteMeta.title`：改为 “小姜的博客”。

* `siteMeta.description`：改为 “jiangyin14 的博客”。

* `siteMeta.author`：填入“姜胤（小姜）”及头像占位、主页链接（先指向 GitHub）。

* `siteMeta.site`：暂设为 `https://blog.jiangyin14.top`（用于 sitemap 与 canonical；若有指定域名，后续再改）。

* `nav/navMore/footer.social/footer.sitemap`：去除原作者相关条目与不存在页面；保留“文章列表/全部分类/全部标签/关于/隐私/版权/友情链接/项目”等有效链接；GitHub 改为 `https://github.com/jiangyin14`。

* `reward/search/music/friends` 等默认开启但未配置的功能：保持关闭或清空，避免加载第三方资源。

1. 清理默认文档

* 删除根目录 `README.md`（该文件为主题说明，不再适用本博客）。

1. 创建首篇博客（`posts/first-blog.md`）

* Front Matter：

  * `title: 第一篇博客：小姜的自我介绍`

  * `date: YYYY-MM-DD`（按今日日期）

  * `description: 一段简述（从正文提炼）`

  * `categories: 个人`

  * `tags: [个人, 创业, 教育]`

  * `cover: /images/logo/logo.webp`

* 正文：使用您提供的内容，适度分段与加粗称谓，保证排版；不引入外链与脚本。

1. 更新包元信息（`package.json`）

* `name/productName/description/author/blog/github/home/repository`：改为与 `jiangyin14` 博客一致的表述与链接（GitHub 链接使用 `https://github.com/jiangyin14`）。

* 保持 `vitepress` 与现有依赖版本不变；不新增依赖。

## 验证与提交

* 本地验证：

  * `pnpm install`（若尚未安装依赖）

  * `pnpm dev`，检查首页标题、描述、导航、页脚与文章列表是否显示首文；

  * `pnpm build`，确认构建成功，无报错与 404 路由。

* 提交但不推送：

  * `git add -A`

  * `git commit -m "chore: 初始化为 jiangyin14 的博客，清理默认文档并添加首篇文章"`

  * 待您确认后再执行 `git push`。

## 风险与注意

* 站点域名暂为占位（`siteMeta.site`），会影响生成的 canonical 与 sitemap；如需指定域名，请告知后我立即调整。

* 导航条目将仅保留现有 `pages/` 中可用页面，避免 404；后续新增页面时再扩展。

* 不改动 `page/` 与分页逻辑（`[num].md`），以保证列表分页正常。

* 不修改 `public/images/logo`，如需更换 Logo 可后续提供素材。

