---
# title: Frontmatter
title: Frontmatter
# description: >-
#   Learn about the YAML frontmatter each document on
#   the Dart and Flutter documentation sites starts with.
description: >-
  了解 Dart 与 Flutter 文档站点上每篇文档开头的 YAML frontmatter。
sitemap: false
noindex: true
showBreadcrumbs: true
ai-translated: true
---

:::warning
This document is a work in progress.

本文档仍在编写中。
:::

Each Markdown document on the site starts with [YAML][] frontmatter.
You can edit the frontmatter to customize
the generated page and its metadata.

站点上每篇 Markdown 文档都以 [YAML][] frontmatter 开头。你可以编辑 frontmatter 以自定义生成的页面及其元数据。

As a minimum, a `title` and `description` are required for each page.

每页至少需要 `title` 与 `description`。

```yaml
---
title: Build a Flutter app
description: >-
  Learn how to build a basic Flutter app with interactive code samples.
---
```

[YAML]: https://yaml.org/

## Access frontmatter data in templates

## 在模板中访问 frontmatter 数据

Layouts, templates, and source files can access values from the frontmatter
as top-level data with templating.

布局、模板与源文件可通过模板将 frontmatter 中的值作为顶层数据访问。

For example, the following frontmatter sets a `showData` variable to `value`:

例如，以下 frontmatter 将 `showData` 变量设为 `value`：

```yaml
---
# ...
showDate: false
---
```

The configured value of `showDate` can be accessed in templates:

`showDate` 的配置值可在模板中访问：

```md
Should show date: {{showDate}}
{% if showDate %}
  The current data is...
{% endif %}
```

If you add a new value to the frontmatter,
prefer using `lowerCamelCase` for the name.

若向 frontmatter 添加新值，名称优先使用 `lowerCamelCase`。

## Frontmatter fields

## frontmatter 字段

Besides `title` and `description`,
the sites support a variety of other optional fields
to customize page generation.

除 `title` 与 `description` 外，站点还支持多种可选字段以自定义页面生成。

### `title`

### `description`

### `shortTitle`

### `js`

### `toc`

### `layout`

### `showBreadcrumbs`

### `showBanner`

### `sitemap`
