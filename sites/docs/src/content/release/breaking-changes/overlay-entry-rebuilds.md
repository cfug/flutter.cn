---
# title: Rebuild optimization for OverlayEntries and Routes
title: OverlayEntry 与 Route 的重建优化
# description: OverlayEntries only rebuild on explicit state changes.
description: OverlayEntry 仅在显式状态变化时重建。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

This optimization improves performance for route transitions,
but it may uncover missing calls to `setState` in your app.

这项优化提升了路由转场的性能，
但可能会暴露出应用中遗漏的 `setState` 调用。

## Context

## 上下文

Prior to this change, an `OverlayEntry` would rebuild when
a new opaque entry was added on top of it or removed above it.
These rebuilds were unnecessary because they were not triggered
by a change in state of the affected `OverlayEntry`. This
breaking change optimized how we handle the addition and removal of
`OverlayEntry`s, and removes unnecessary rebuilds
to improve performance.

在这次改动之前，当新的不透明条目添加到 `OverlayEntry` 上方，
或从其上方移除时，该 `OverlayEntry` 会重建。
这些重建并无必要，因为它们并非由受影响 `OverlayEntry` 的状态变化触发。
这次破坏性改动优化了添加和移除 `OverlayEntry` 的处理方式，
并去掉了不必要的重建，以提升性能。

Since the `Navigator` internally puts each `Route` into an
`OverlayEntry` this change also applies to `Route` transitions:
If an opaque `Route` is pushed on top or removed from above another
`Route`, the `Route`s below the opaque `Route`
no longer rebuilds unnecessarily.

由于 `Navigator` 在内部把每个 `Route` 放入一个 `OverlayEntry`，
这次改动同样适用于 `Route` 转场：
如果不透明 `Route` 被推到另一个 `Route` 上方，或从其上方移除，
不透明 `Route` 下方的 `Route` 不再进行不必要的重建。

## Description of change

## 改动说明

In most cases, this change doesn't require any changes to your code.
However, if your app was erroneously relying on the implicit
rebuilds you may see issues, which can be resolved by wrapping
any state change in a `setState` call.

在大多数情况下，这次改动不需要修改代码。
不过，如果应用错误地依赖了隐式重建，你可能会看到问题。
把任何状态变化包在 `setState` 调用中即可解决。

Furthermore, this change slightly modified the shape of the
widget tree: Prior to this change,
the `OverlayEntry`s were wrapped in a `Stack` widget.
The explicit `Stack` widget was removed from the widget hierarchy.

此外，这次改动略微改变了 widget 树的结构：
在此之前，`OverlayEntry` 被包在一个 `Stack` widget 中。
这个显式的 `Stack` widget 已从 widget 层级中移除。

## Migration guide

## 迁移指南

If you're seeing issues after upgrading to a Flutter version
that included this change, audit your code for missing calls to
`setState`. In the example below, assigning the return value of
`Navigator.pushNamed` to `buttonLabel` is
implicitly modifying the state and it should be wrapped in an
explicit `setState` call.

如果升级到包含这次改动的 Flutter 版本后出现问题，
请检查代码中是否遗漏了 `setState` 调用。
在下面的示例中，把 `Navigator.pushNamed` 的返回值赋给 `buttonLabel`
是在隐式修改状态，应当包在显式的 `setState` 调用中。

Code before migration:

迁移之前的代码：

```dart
class FooState extends State<Foo> {
  String buttonLabel = 'Click Me';
  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () async {
        // Illegal state modification that should be wrapped in setState.
        buttonLabel = await Navigator.pushNamed(context, '/bar');
      },
      child: Text(buttonLabel),
    );
  }
}
```

Code after migration:

迁移之后的代码：

```dart
class FooState extends State<Foo> {
  String buttonLabel = 'Click Me';
  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () async {
        final newLabel = await Navigator.pushNamed(context, '/bar');
        setState(() {
          buttonLabel = newLabel;
        });
      },
      child: Text(buttonLabel),
    );
  }
}
```

## Timeline

## 时间线

Landed in version: 1.16.3<br>
合入版本：1.16.3<br>
In stable release: 1.17

进入稳定版：1.17

## References

## 参考资料

API documentation:

API 文档：

* [`setState`][]
* [`OverlayEntry`][]
* [`Overlay`][]
* [`Navigator`][]
* [`Route`][]
* [`OverlayRoute`][]

Relevant issues:

相关 issue：

* [Issue 45797][]

Relevant PRs:

相关 PR：

* [Do not rebuild Routes when a new opaque Route is pushed on top][]

  [当新的不透明 Route 被推到上方时，
  不要重建 Route][Do not rebuild Routes when a new opaque Route is pushed on top]

* [Reland "Do not rebuild Routes when a new opaque Route is pushed on top"][]

  [重新落地「当新的不透明 Route 被推到上方时，不要重建 Route」
  ][Reland "Do not rebuild Routes when a new opaque Route is pushed on top"]


[Do not rebuild Routes when a new opaque Route is pushed on top]: {{site.repo.flutter}}/pull/48900
[Issue 45797]: {{site.repo.flutter}}/issues/45797
[`Navigator`]: {{site.api}}/flutter/widgets/Navigator-class.html
[`Overlay`]: {{site.api}}/flutter/widgets/Overlay-class.html
[`OverlayEntry`]: {{site.api}}/flutter/widgets/OverlayEntry-class.html
[`OverlayRoute`]: {{site.api}}/flutter/widgets/OverlayRoute-class.html
[`Route`]: {{site.api}}/flutter/widgets/Route-class.html
[`setState`]: {{site.api}}/flutter/widgets/State/setState.html
[Reland "Do not rebuild Routes when a new opaque Route is pushed on top"]: {{site.repo.flutter}}/pull/49376
