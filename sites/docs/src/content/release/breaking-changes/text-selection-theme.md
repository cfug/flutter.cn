---
# title: TextSelectionTheme migration
title: TextSelectionTheme 迁移
# description: >
#   The default properties for text selection are migrating to TextSelectionTheme.
description: >
  文本选择的默认属性正在迁移到 TextSelectionTheme。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The `ThemeData` properties that controlled the look of
selected text in Material widgets have been moved into
their own `TextSelectionTheme`. These properties include
`cursorColor`, `textSelectionColor`, and
`textSelectionHandleColor`. The defaults for these
properties have also been changed to match the Material
Design specification.

控制 Material widget 中选中文本外观的 `ThemeData` 属性，
已移入独立的 `TextSelectionTheme`。
这些属性包括 `cursorColor`、`textSelectionColor`
和 `textSelectionHandleColor`。
它们的默认值也已调整，以符合 Material Design 规范。

## Context

## 上下文

As part of the larger [Material Theme Updates][],
we have introduced a new [Text Selection Theme][]
used to specify the properties of selected text in
`TextField` and `SelectableText` widgets.
These replace several top-level properties of `ThemeData`
and update their default values to match the Material
Design specification. This document describes how
applications can migrate to this new API.

作为更大规模的 [Material 主题更新][Material Theme Updates] 的一部分，
我们引入了新的 [文本选择主题][Text Selection Theme]，
用于指定 `TextField` 和 `SelectableText` widget 中
选中文本的属性。
它们替代了 `ThemeData` 的若干顶层属性，
并把默认值更新为符合 Material Design 规范。
本文说明应用如何迁移到这个新 API。

## Migration guide

## 迁移指南

If you are currently using the following properties of
`ThemeData`, you need to update them to use the new
equivalent properties on `ThemeData.textSelectionTheme`:

如果你目前使用 `ThemeData` 的下列属性，
需要改为使用 `ThemeData.textSelectionTheme` 上
对应的新属性：

| <t>Before</t><t>之前</t> | <t>After</t><t>之后</t> |
|--------------------------------------|-----------------------------------------------|
| `ThemeData.cursorColor`              | `TextSelectionThemeData.cursorColor`          |
| `ThemeData.cursorColor`              | `TextSelectionThemeData.cursorColor`          |
| `ThemeData.textSelectionColor`       | `TextSelectionThemeData.selectionColor`       |
| `ThemeData.textSelectionColor`       | `TextSelectionThemeData.selectionColor`       |
| `ThemeData.textSelectionHandleColor` | `TextSelectionThemeData.selectionHandleColor` |
| `ThemeData.textSelectionHandleColor` | `TextSelectionThemeData.selectionHandleColor` |

<br/>

**Code before migration:**

**迁移前的代码：**

```dart
ThemeData(
  cursorColor: Colors.red,
  textSelectionColor: Colors.green,
  textSelectionHandleColor: Colors.blue,
)
```

**Code after migration:**

**迁移后的代码：**

```dart
ThemeData(
  textSelectionTheme: TextSelectionThemeData(
    cursorColor: Colors.red,
    selectionColor: Colors.green,
    selectionHandleColor: Colors.blue,
  )
)
```

**Default changes**

**默认值改动**

If you weren't using these properties explicitly,
but depended on the previous default colors used
for text selection you can add a new field to your
`ThemeData` for your app to return to the old defaults
as shown:

如果你没有显式使用这些属性，
但依赖之前用于文本选择的默认颜色，
可以按下面这样在应用的 `ThemeData` 中新增字段，
以恢复旧的默认值：

```dart
// Old defaults for a light theme
ThemeData(
  textSelectionTheme: TextSelectionThemeData(
    cursorColor: const Color.fromRGBO(66, 133, 244, 1.0),
    selectionColor: const Color(0xff90caf9),
    selectionHandleColor: const Color(0xff64b5f6),
  )
)
```

```dart
// Old defaults for a dark theme
ThemeData(
  textSelectionTheme: TextSelectionThemeData(
    cursorColor: const Color.fromRGBO(66, 133, 244, 1.0),
    selectionColor: const Color(0xff64ffda),
    selectionHandleColor: const Color(0xff1de9b6),
  )
)
```

If you are fine with the new defaults,
but have failing golden file tests, you
can update your master golden files using the
following command:

如果你接受新的默认值，
但 golden 文件测试失败，
可以用下面的命令更新主 golden 文件：

```console
$ flutter test --update-goldens
```

## Timeline

## 时间线

Landed in version: 1.23.0-4.0.pre<br>
合入版本：1.23.0-4.0.pre<br>
In stable release: 2.0.0

进入稳定版：2.0.0

## References

## 参考资料

API documentation:

API 文档：

* [`TextSelectionThemeData`][]
* [`ThemeData`][]

Relevant PRs:

相关 PR：

* [PR 62014: TextSelectionTheme support][]

  [PR 62014：TextSelectionTheme 支持][PR 62014: TextSelectionTheme support]

[Material Theme Updates]: /go/material-theme-system-updates
[PR 62014: TextSelectionTheme support]: {{site.repo.flutter}}/pull/62014
[Text Selection Theme]: /go/text-selection-theme
[`TextSelectionThemeData`]: {{site.api}}/flutter/material/TextSelectionThemeData-class.html
[`ThemeData`]: {{site.api}}/flutter/material/ThemeData-class.html
