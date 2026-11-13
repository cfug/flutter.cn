---
# title: Deprecated ExpansionTileController
title: 弃用 ExpansionTileController
# description: >
#   `ExpansionTileController` is deprecated and replaced by
#   `ExpansibleController`.
description: >-
  `ExpansionTileController` 已弃用，由 `ExpansibleController` 取代。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

`ExpansionTileController` is deprecated. The same functionality can be
achieved by using `ExpansibleController` instead.

`ExpansionTileController` 已弃用。
改用 `ExpansibleController` 即可实现相同功能。

## Background

## 背景

`ExpansionTileController` programmatically expands and collapses an `ExpansionTile`. A new `Expansible` widget has been added to the widgets library, which contains logic for expanding and collapsing behavior without being tied to the Material library. `ExpansibleController` complements `Expansible` and has the same functionality as `ExpansionTileController`. Additionally, `ExpansibleController` also supports adding and notifying listeners when its expansion state changes.

`ExpansionTileController` 用于以编程方式展开和折叠 `ExpansionTile`。
widgets 库新增了 `Expansible` widget，
它包含展开与折叠的逻辑，且不依赖 Material 库。
`ExpansibleController` 与 `Expansible` 配套，
功能与 `ExpansionTileController` 相同。
此外，`ExpansibleController` 还支持在展开状态变化时添加并通知监听器。

Apps that use `ExpansionTileController` display the following error when run
in debug mode: "Use `ExpansibleController` instead.". Specifically, this means that users should replace usage of `ExpansionTileController` with `ExpansibleController`.

使用 `ExpansionTileController` 的应用在调试模式下运行时会显示如下错误：
「Use `ExpansibleController` instead.」。
具体来说，应把 `ExpansionTileController` 替换为 `ExpansibleController`。

## Migration guide

## 迁移指南

To migrate, replace the `controller` parameter of an `ExpansionTile` from an `ExpansionTileController` to an `ExpansibleController`. Unlike `ExpansionTileController`, `ExpansibleController` is a `ChangeNotifier`, so remember to dispose the new `ExpansibleController`.

要完成迁移，把 `ExpansionTile` 的 `controller` 参数
从 `ExpansionTileController` 换成 `ExpansibleController`。
与 `ExpansionTileController` 不同，`ExpansibleController` 是 `ChangeNotifier`，
因此记得 dispose 新的 `ExpansibleController`。

Code before migration:

迁移之前的代码：

```dart
class _MyWidgetState extends State<MyWidget> {
  final ExpansionTileController controller = ExpansionTileController();

  @override
  Widget build(BuildContext context) {
    return ExpansionTile(
      controller: controller,
    );
  }
}
```

Code after migration:

迁移之后的代码：

```dart
class _MyWidgetState extends State<MyWidget> {
  final ExpansibleController controller = ExpansibleController();

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ExpansionTile(
      controller: controller,
    );
  }
}
```

## Timeline

## 时间线

Landed in version: 3.31.0-0.1.pre<br>
合入版本：3.31.0-0.1.pre<br>
In stable release: 3.32

进入稳定版：3.32

## References

## 参考资料

API documentation:

API 文档：

* [`ExpansionTileController`][]
* [`ExpansibleController`][]
* [`ExpansionTile.controller`][]
* [`Expansible.controller`][]

Relevant issues:

相关 issue：

* [Codeshare between ExpansionTile and its Cupertino variant][]

  [在 ExpansionTile 与其 Cupertino 变体之间共享代码][Codeshare between ExpansionTile and
  its Cupertino variant]

* [Deprecate ExpansionTileController in favor of ExpansibleController][]

  [弃用 ExpansionTileController，改用 ExpansibleController][Deprecate
  ExpansionTileController in favor of ExpansibleController]

Relevant PRs:

相关 PR：

* [Introduce Expansible, a base widget for ExpansionTile][]

  [引入 Expansible，作为 ExpansionTile 的基础 widget][Introduce Expansible, a base
  widget for ExpansionTile]

* [Deprecate ExpansionTileController][]

  [弃用 ExpansionTileController][Deprecate ExpansionTileController]

[`ExpansionTileController`]: {{site.api}}/flutter/material/ExpansionTileController-class.html
[`ExpansibleController`]: {{site.api}}/flutter/widgets/ExpansibleController-class.html
[`ExpansionTile.controller`]: {{site.api}}/flutter/material/ExpansionTile/controller.html
[`Expansible.controller`]: {{site.api}}/flutter/widgets/Expansible/controller.html

[Codeshare between ExpansionTile and its Cupertino variant]: {{site.repo.flutter}}/issues/163552
[Deprecate ExpansionTileController in favor of ExpansibleController]: {{site.repo.flutter}}/issues/165511
[Introduce Expansible, a base widget for ExpansionTile]: {{site.repo.flutter}}/pull/164049
[Deprecate ExpansionTileController]: {{site.repo.flutter}}/pull/166368
