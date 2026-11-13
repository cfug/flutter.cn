---
# title: Deprecate onReorder callback
title: 弃用 onReorder 回调
# description: >-
#   The onReorder callback has been deprecated
#   in favor of a new callback, called onReorderItem.
description: >-
  onReorder 回调已弃用，
  请改用名为 onReorderItem 的新回调。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The `onReorder` callback in the
`ReorderableListView`, `ReorderableListView.builder`,
`ReorderableList`, and `SliverReorderableList` widgets
has been replaced by a new callback, `onReorderItem`,
which provides more intuitive behavior for `newIndex`.

`ReorderableListView`、`ReorderableListView.builder`、`ReorderableList`
和 `SliverReorderableList` widget 中的
`onReorder` 回调已由新回调 `onReorderItem` 取代。
它对 `newIndex` 的行为更直观。

## Background

## 背景

The `onReorder` callback in the
`ReorderableListView`, `ReorderableListView.builder`,
`ReorderableList`, and `SliverReorderableList` widgets required
a manual correction for the second parameter, `newIndex`,
in case the `oldIndex` is before the `newIndex` because
the list of items would be shortened by one element.

`ReorderableListView`、`ReorderableListView.builder`、`ReorderableList`
和 `SliverReorderableList` widget 的
`onReorder` 回调要求手动修正第二个参数 `newIndex`。
当 `oldIndex` 在 `newIndex` 之前时需要这样做，
因为条目列表会缩短一个元素。

```dart
void handleReorder(int oldIndex, int newIndex) {
  if (oldIndex < newIndex) {
    // Removing the item at oldIndex shortens the list by 1.
    newIndex -= 1;
  }

  // Handle the actual reorder behavior...
}

ReorderableListView(
  onReorder: handleReorder,
)
```

The new callback, `onReorderItem`, solves this problem
by doing the correction automatically.

新回调 `onReorderItem` 会自动完成这项修正，
从而解决这个问题。

```dart
void handleReorder(int oldIndex, int newIndex) {
  // Handle the actual reorder behavior...
}

ReorderableListView(
  onReorderItem: handleReorder,
)
```

## Migration guide

## 迁移指南

The `ReorderableListView`, `ReorderableListView.builder`,
`ReorderableList`, and `SliverReorderableList` widgets
share the same reordering logic.
The same migration steps apply to each of these widgets.

`ReorderableListView`、`ReorderableListView.builder`、`ReorderableList`
和 `SliverReorderableList` widget
共用同一套重排序逻辑。
这些 widget 的迁移步骤相同。

This migration guide uses `ReorderableListView` as an example.

本迁移指南以 `ReorderableListView` 为例。

### Case 1: Simple callbacks {: #case-1-simple-callbacks }

### 情形 1：简单回调

Code before migration:

迁移之前的代码：

```dart
ReorderableListView(
  onReorder: (int oldIndex, int newIndex) {
    if (oldIndex < newIndex) {
      newIndex -= 1;
    }

    // Handle reorder ...
  }
)
```

Code after migration:

迁移之后的代码：

```dart diff
  ReorderableListView(
-   onReorder: (int oldIndex, int newIndex) {
-     if (oldIndex < newIndex) {
-       newIndex -= 1;
-     }
-
+   onReorderItem: (int oldIndex, int newIndex) {
      // Handle reorder ...
    }
  )
```

### Case 2: Opt out for complex `onReorder` implementations {: #case-2-opt-out }

### 情形 2：复杂 `onReorder` 实现选择退出

In some cases, such as when the provided callback is complex,
the migration to the new `onReorderItem` callback might not be obvious.

在某些情况下，例如提供的回调比较复杂时，
迁移到新的 `onReorderItem` 回调可能并不直观。

In these cases, to opt out of the new behavior,
adjust the `newIndex` to match the old behavior.

这时，若要退出新行为，
可以调整 `newIndex`，使它与旧行为一致。

Code before migration:

迁移之前的代码：

```dart
void handleSomeComplexReorder(int oldIndex, int newIndex) {
  // Handle reorder ...
}

ReorderableListView(
  onReorder: (int oldIndex, int newIndex) {
    handleSomeComplexReorder(oldIndex, newIndex);
  }
)
```

Code after migration:

迁移之后的代码：

```dart diff
  void handleSomeComplexReorder(int oldIndex, int newIndex) {
    // Handle reorder ...
  }

  ReorderableListView(
-   onReorder: (int oldIndex, int newIndex) {
+   onReorderItem: (int oldIndex, int newIndex) {
+     // To get the equivalent of the old newIndex:
+     if (oldIndex < newIndex) {
+       newIndex += 1;
+     }
+
      return handleSomeComplexReorder(oldIndex, newIndex);
    }
  )
```

:::important
This migration isn't supported by `dart fix`,
due to the change in meaning for the second callback parameter.

由于第二个回调参数的含义发生了变化，`dart fix`
不支持这次迁移。
:::

## Timeline

## 时间线

Landed in version: 3.41.0-1.0.pre-364<br>
In stable release: 3.44

合入版本：3.41.0-1.0.pre-364<br>
进入稳定版：3.44

## References

## 参考资料

API documentation:

API 文档：

* [`ReorderCallback`][]
* [`ReorderableList`][]
* [`ReorderableListView`][]
* [`SliverReorderableList`][]

Relevant issues:

相关 issue：

* [The index parameter for ReorderableListView's onReorderCallback is confusing][issue-127901]

  [ReorderableListView 的 onReorderCallback 索引参数容易混淆][issue-127901]

* [SliverReorderableList newIndex arg off by one on drag down list][issue-169878]

  [向下拖动列表时，SliverReorderableList 的 newIndex 参数差 1][issue-169878]

Relevant PRs:

相关 PR：

* [Deprecate onReorder callback][]

  [弃用 onReorder 回调][Deprecate onReorder callback]

[`ReorderCallback`]: {{site.api}}/flutter/widgets/ReorderCallback.html
[`ReorderableList`]: {{site.api}}/flutter/widgets/ReorderableList-class.html
[`ReorderableListView`]: {{site.api}}/flutter/material/ReorderableListView-class.html
[`SliverReorderableList`]: {{site.api}}/flutter/widgets/SliverReorderableList-class.html

[issue-127901]: {{site.repo.flutter}}/issues/127901
[issue-169878]: {{site.repo.flutter}}/issues/169878
[Deprecate onReorder callback]: {{site.repo.flutter}}/pull/178242
