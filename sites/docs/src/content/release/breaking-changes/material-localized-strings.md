---
# title: Migration guide for material localized strings
title: Material 本地化字符串迁移指南
# description: >
#   ReorderableListView's localized strings are moved from
#   material localizations to widgets localizations.
description: >
  ReorderableListView 的本地化字符串已从
  material localizations 移至 widgets localizations。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

`ReorderableListView`'s localized strings were moved from
material localizations to widgets localizations.
These strings were deprecated in material localizations.

`ReorderableListView` 的本地化字符串已从
material localizations 移至 widgets localizations。
这些字符串在 material localizations 中已被弃用。

## Context

## 上下文

[`ReorderableListView`][] uses these strings to annotate its semantics actions.
To apply the same annotations to [`ReorderableList`][]
and [`SliverReorderableList`][], they need to
access these strings from widgets library.

[`ReorderableListView`][] 使用这些字符串标注其语义操作。
要把同样的标注应用到 [`ReorderableList`][]
和 [`SliverReorderableList`][]，
它们需要从 widgets 库访问这些字符串。

## Description of change

## 改动说明

The [`MaterialLocalizations`][] strings for
`reorderItemToStart`, `reorderItemToEnd`, `reorderItemUp`,
`reorderItemDown`, `reorderItemLeft`, and `reorderItemRight` are deprecated and
replaced by the same strings in [`WidgetsLocalizations`][].

[`MaterialLocalizations`][] 中的
`reorderItemToStart`、`reorderItemToEnd`、`reorderItemUp`、
`reorderItemDown`、`reorderItemLeft` 和 `reorderItemRight`
已弃用，并由 [`WidgetsLocalizations`][] 中的同名字符串替代。

## Migration guide

## 迁移指南

If you use these strings in your code,
you can access them from `WidgetsLocalizations`instead.

如果你在代码中使用这些字符串，
可以从 `WidgetsLocalizations` 访问它们。

Code before migration:

迁移前的代码：

```dart
MaterialLocalizations.of(context).reorderItemToStart;
```

Code after migration:

迁移后的代码：

```dart
WidgetsLocalizations.of(context).reorderItemToStart;
```

If you override `MaterialLocalizations` or `WidgetsLocalizations`,
make sure to remove the translations from the `MaterialLocalizations`
subclass and move them to the `WidgetsLocalizations` subclass.

如果你重写了 `MaterialLocalizations` 或 `WidgetsLocalizations`，
请从 `MaterialLocalizations` 子类中移除这些译文，
并把它们移到 `WidgetsLocalizations` 子类中。

Code before migration:

迁移前的代码：

```dart
class MaterialLocalizationsMyLanguage extends MaterialLocalizationsEn {
  // ...
  @override
  String get reorderItemRight => 'my translation';
}
```

Code after migration:

迁移后的代码：

```dart
class MaterialLocalizationsMyLanguage extends MaterialLocalizationsEn {
  // ...
}

class WidgetsLocalizationsMyLanguage extends WidgetsLocalizationsEn {
  // ...
  @override
  String get reorderItemRight => 'my translation';
}
```

## Timeline

## 时间线

Landed in version: v3.10.0-2.0.pre<br>
合入版本：v3.10.0-2.0.pre<br>
In stable release: 3.13.0

进入稳定版：3.13.0

## References

## 参考资料

Relevant PR:

相关 PR：

* [PR 124711][]: Deprecates string for
  ReorderableList in material_localizations.

  [PR 124711][PR 124711]：弃用 material_localizations 中
  ReorderableList 的字符串。

[PR 124711]: {{site.repo.flutter}}/pull/124711
[`ReorderableListView`]: {{site.api}}/flutter/material/ReorderableListView-class.html
[`ReorderableList`]: {{site.api}}/flutter/widgets/ReorderableList-class.html
[`SliverReorderableList`]: {{site.api}}/flutter/widgets/SliverReorderableList-class.html
[`MaterialLocalizations`]: {{site.api}}/flutter/material/MaterialLocalizations-class.html
[`WidgetsLocalizations`]: {{site.api}}/flutter/widgets/WidgetsLocalizations-class.html
