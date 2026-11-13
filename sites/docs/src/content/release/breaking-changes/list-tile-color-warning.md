---
# title: ListTile reports an error in debug when wrapped in a colored widget
title: ListTile 被带颜色的 widget 包裹时会在调试模式报告错误
# description: >-
#   ListTile now reports an error in debug mode when it is wrapped in
#   an intermediate widget with a non-transparent background color.
description: >-
  当 ListTile 被夹在中间、且背景色不透明的 widget 包裹时，
  现在会在调试模式报告错误。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

When a widget with a non-transparent background color,
such as a `Container` or `ColoredBox` that sets `color`,
sits between a `ListTile` and its nearest `Material` ancestor,
the framework now reports an error.

当设置了 `color` 的 `Container` 或 `ColoredBox` 等
带有非透明背景色的 widget，
位于 `ListTile` 与其最近的 `Material` 祖先之间时，
框架现在会报告错误。

## Background

## 背景

`ListTile` paints its background color and ink splashes
on the nearest `Material` ancestor.
When a widget with an opaque background color is
placed between the `ListTile` and its `Material` ancestor,
it obscures these visual effects,
making them invisible to the user.

`ListTile` 会把背景色和水波纹绘制在最近的 `Material` 祖先上。
如果在 `ListTile` 和它的 `Material` 祖先之间
放了一个不透明背景的 widget，
这些视觉效果会被挡住，用户就看不到了。

To prevent you from accidentally introducing this bug and
wondering why the background or ink splash effects on
the `ListTile` aren't displaying,
the framework now reports an assertion error during development.

为了避免你无意中引入这个问题，
却搞不清 `ListTile` 的背景或水波纹为什么不显示，
框架现在会在开发期间报告断言错误。

If your code has an intermediate colored widget
between a `ListTile` and a `Material` widget,
you will now see an error similar to this:

如果代码里在 `ListTile` 和 `Material` widget 之间
夹了一个带颜色的 widget，你会看到类似这样的错误：

```text
ListTile background color or ink splashes may be invisible.
The ListTile is wrapped in a Container that has a background color.
Because ListTile paints its background and ink splashes on
the nearest Material ancestor, this Container will hide those effects.
To fix this, wrap the ListTile in its own Material widget, or
remove the background color from the intermediate Container.
```

## Migration guide

## 迁移指南

To fix the error,
remove the background color from the intermediate widget or
wrap the `ListTile` in its own `Material` widget.

要消除这个错误，
请去掉中间那个 widget 的背景色，
或把 `ListTile` 包进它自己的 `Material` widget。

Code before migration:

迁移前的代码：

```dart
// The colored Container hides the ink splashes from the ListTile.
Material(
  child: Container(
    color: Colors.pink,
    child: ListTile(
      title: const Text('Title'),
      onTap: () {},
    ),
  ),
)
```

Code after migration:

迁移后的代码：

```dart
// Use a Material widget directly for the background color.
Material(
  color: Colors.pink,
  child: Container(
    child: ListTile(
      title: const Text('Title'),
      onTap: () {},
    ),
  ),
)
```

Alternatively,
wrap the `ListTile` in its own `Material` widget:

也可以把 `ListTile` 包进它自己的 `Material` widget：

```dart
Container(
  color: Colors.blue,
  child: Material(
    type: MaterialType.transparency,
    child: ListTile(
      title: const Text('Title'),
      onTap: () {},
    ),
  ),
)
```

## Timeline

## 时间线

Landed in version: 3.43.0-0.1.pre<br>
合入版本：3.43.0-0.1.pre<br>
In stable release: 3.44

进入稳定版：3.44

## References

## 参考资料

API documentation:

API 文档：

* [`ListTile`][]

  [`ListTile`][`ListTile`]

* [`Material`][]

  [`Material`][`Material`]

Relevant issues:

相关 issue：

* [`ListTile.selectedTileColor` not visible when parent `Container` has explicit background color][issue-174366]

  [父级 `Container` 显式设置背景色时 `ListTile.selectedTileColor` 不可见][issue-174366]

Relevant PRs:

相关 PR：

* [Add warning when there is a widget with color between `Material` and `ListTile`][pr-181402]

  [在 `Material` 与 `ListTile` 之间存在带颜色的 widget 时发出警告][pr-181402]

[`ListTile`]: {{site.api}}/flutter/material/ListTile-class.html
[`Material`]: {{site.api}}/flutter/material/Material-class.html
[issue-174366]: {{site.repo.flutter}}/issues/174366
[pr-181402]: {{site.repo.flutter}}/pull/181402
