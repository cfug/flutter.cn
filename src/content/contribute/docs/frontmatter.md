---
title: Frontmatter
description: >-
  Learn about the YAML frontmatter each document on
  the Dart and Flutter documentation sites starts with.
sitemap: false
noindex: true
showBreadcrumbs: true
---

:::warning
本文档正在编写中。
:::

网站上的每个 Markdown 文档都以 [YAML][] frontmatter 开头。
你可以编辑 frontmatter 来自定义
生成的页面及其元数据。

每个页面至少需要 `title` 和 `description`。

```yaml
---
title: Build a Flutter app
description: >-
  Learn how to build a basic Flutter app with interactive code samples.
---
```

[YAML]: https://yaml.org/

## 在模板中访问 frontmatter 数据

布局、模板和源文件可以通过模板语法
将 frontmatter 中的值作为顶级数据访问。

例如，以下 frontmatter 将 `showData` 变量设置为 `value`：

```yaml
---
# ...
showDate: false
---
```

`showDate` 的配置值可以在模板中访问：

```md
Should show date: {{showDate}}
{% if showDate %}
  The current data is...
{% endif %}
```

如果你向 frontmatter 添加新值，
请优先使用 `lowerCamelCase` 作为名称。

## Frontmatter 字段

除了 `title` 和 `description`，
网站还支持各种其他可选字段
来自定义页面生成。

### `title`

### `description`

### `shortTitle`

### `js`

### `toc`

### `layout`

### `showBreadcrumbs`

### `showBanner`

### `sitemap`
