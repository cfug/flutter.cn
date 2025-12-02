---
title: 为文档做贡献
shortTitle: Docs
description: >-
  Learn about contributing to the Dart and Flutter documentation sites.
sitemap: false
noindex: true
showBreadcrumbs: true
---

:::warning
本文档正在编写中。
:::

## 贡献指南

- [写作](/contribute/docs/writing)
- [Markdown](/contribute/docs/markdown)
- [Frontmatter](/contribute/docs/frontmatter)
- [代码块](/contribute/docs/code-blocks)
- [代码摘录](/contribute/docs/excerpts)
- [组件](/contribute/docs/components)
- [侧边导航](/contribute/docs/sidenav)
- [版本发布](/contribute/docs/releases)
- [命令行工具](/contribute/docs/cli)

## 仓库布局

- `.github/`

  GitHub [actions][gh-actions]、
  issue 和 PR [模板][gh-templates]以及 [dependabot][] 的配置。
- `cloud_build/`

  用于暂存和部署网站的 Google [Cloud Build][] 配置。
- `diagrams/`

  网站上使用的图表的源文件。
- `examples/`

  文档代码块中使用的[代码摘录][code excerpts]的源文件。
- `src/`
  - `_11ty/`

    [11ty][]、[Liquid][] 和 Markdown 的自定义扩展。
    - `plugins/`
    - `syntax/`

      用于语法高亮的 [Shiki][] 主题。
    - `filters.ts`
    - `shortcodes.ts`
  - `_data/`

    用于在网站模板中添加数据的 YAML 和 JSON 文件。
  - `_includes/`

    liquid [render 和 include][] 语句使用的部分文件。
  - `_layouts/`

    网站页面使用的布局模板。
  - `_sass/`

    使用 [sass][] 编写的生成文档的样式。
  - `content/`

    网站内容的根目录。
    - `assets/`

      网站使用的资源（包括图片）目录。
    - `...`

      托管网站内容的其他目录。
- `tool/`
  - `dash_site/`

    `dash_site` 工具的实现目录。
- `dash_site`

  网站 CLI 工具的入口脚本。
- `eleventy.config.ts`

  网站 [11ty][] 静态网站生成设置的入口。
- `firebase.json`

  用于暂存和部署网站的 [Firebase Hosting][] 配置。
- `package.json`

  使用的 [npm][] 依赖项配置。

[gh-actions]: https://docs.github.com/actions
[gh-templates]: https://docs.github.com/communities/using-templates-to-encourage-useful-issues-and-pull-requests
[dependabot]: https://docs.github.com/en/code-security/getting-started/dependabot-quickstart-guide

[Cloud Build]: https://cloud.google.com/build
[code excerpts]: /contribute/docs/excerpts

[Shiki]: https://shiki.style/
[render and include]: https://liquidjs.com/tags/render.html
[sass]: https://sass-lang.com/

[Liquid]: https://liquidjs.com/
[11ty]: https://www.11ty.dev/
[Firebase Hosting]: https://firebase.google.com/docs/hosting
[npm]: https://www.npmjs.com/
