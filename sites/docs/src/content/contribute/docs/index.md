---
# title: Contribute to the docs
title: 为文档贡献
# shortTitle: Docs
shortTitle: 文档
# description: >-
#   Learn about contributing to the Dart and Flutter documentation sites.
description: >-
  了解如何为 Dart 与 Flutter 文档站点贡献。
sitemap: false
noindex: true
showBreadcrumbs: true
ai-translated: true
---

:::warning
This document is a work in progress.

本文档仍在编写中。
:::

## Contribution guides

## 贡献指南

- [Writing](/contribute/docs/writing)

  [写作](/contribute/docs/writing)

- [Markdown](/contribute/docs/markdown)

  [Markdown](/contribute/docs/markdown)

- [Frontmatter](/contribute/docs/frontmatter)

  [Frontmatter](/contribute/docs/frontmatter)

- [Code blocks](/contribute/docs/code-blocks)

  [代码块](/contribute/docs/code-blocks)

- [Code excerpts](/contribute/docs/excerpts)

  [代码摘录](/contribute/docs/excerpts)

- [Components](/contribute/docs/components)

  [组件](/contribute/docs/components)

- [Sidenav](/contribute/docs/sidenav)

  [侧边栏导航](/contribute/docs/sidenav)

- [Releases](/contribute/docs/releases)

  [发布](/contribute/docs/releases)

- [Command-line tool](/contribute/docs/cli)

  [命令行工具](/contribute/docs/cli)

## Repository layout

## 仓库布局

- `.github/`

  Configuration for GitHub [actions][gh-actions],
  issue and PR [templates][gh-templates], and [dependabot][].

  GitHub [actions][gh-actions]、issue 与 PR [templates][gh-templates] 以及 [dependabot][] 的配置。

- `cloud_build/`

  Configuration for Google [Cloud Build][] that is used for staging
  and deploying the site.

  用于站点预发布与部署的 Google [Cloud Build][] 配置。

- `diagrams/`

  Source files for diagrams used on the site.

  站点所用图表的源文件。

- `examples/`

  The source files for [code excerpts][] used in doc code blocks.

  文档代码块中使用的 [代码摘录][code excerpts] 源文件。

- `src/`
  - `_11ty/`

    Custom extensions for [11ty][], [Liquid][], and Markdown.

    [11ty][]、[Liquid][] 与 Markdown 的自定义扩展。

    - `plugins/`
    - `syntax/`

      [Shiki][] themes for syntax highlighting.

      语法高亮的 [Shiki][] 主题。

    - `filters.ts`
    - `shortcodes.ts`
  - `_data/`

    YAML and JSON files used to add data used across site templates.

    用于向全站模板提供数据的 YAML 与 JSON 文件。

  - `_includes/`

    Partial files used by liquid [render and include][] statements.

    liquid [render and include][] 语句使用的局部文件。

  - `_layouts/`

    Layout templates used by the pages on the site.

    站点页面使用的布局模板。

  - `_sass/`

    Styles for the generated documentation, written with [sass][].

    使用 [sass][] 编写的生成文档样式。

  - `content/`

    The root directory for the content of the site.

    站点内容的根目录。

    - `assets/`

      The directory for assets, including images, used by the site.

      站点资源（含图片）目录。

    - `...`

      The other directories hosting the site content.

      托管站点内容的其他目录。

- `tool/`
  - `dash_site/`

    The implementation directories for the `dash_site` tooling.

    `dash_site` 工具的实现目录。

- `dash_site`

  The entrypoint script for the site's CLI tool.

  站点 CLI 工具的入口脚本。

- `eleventy.config.ts`

  The entrypoint for the site's [11ty][] static-site generation setup.

  站点 [11ty][] 静态站点生成配置的入口。

- `firebase.json`

  Configuration for [Firebase Hosting][] that is used for
  the staged and deployed sites.

  用于预发布与已部署站点的 [Firebase Hosting][] 配置。

- `package.json`

  Configuration of used [npm][] dependencies.

  所用 [npm][] 依赖的配置。

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
