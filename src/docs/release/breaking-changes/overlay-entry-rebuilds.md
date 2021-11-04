---
title: Rebuild optimization for OverlayEntries and Routes
title: OverlayEntries 和 Routes 进行了重建优化
description: OverlayEntries only rebuild on explicit state changes.
description: OverlayEntries 仅在显式状态更改时重建。
---

## Summary

## 概述

This  optimization improves performance for route transitions,
but it may uncover missing calls to `setState` in your app.

本次优化提高了路由切换时的性能，但可能会揭露出你的应用中没有显式调用 `setState` 的问题。 

## Context

## 上下文

Prior to this change, an `OverlayEntry` would rebuild when
a new opaque entry was added on top of it or removed above it.
These rebuilds were unnecessary because they were not triggered
by a change in state of the affected `OverlayEntry`. This
breaking change optimized how we handle the addition and removal of
`OverlayEntry`s, and removes unnecessary rebuilds
to improve performance.

在此更改之前，当一个新的不透明 `OverlayEntry`（记作 A）被添加到另一个 `OverlayEntry`（记作 B）上，
或者 A 从 B 上移除时，B 将会重新构建。
这些重建是不必要的，因为它们不是由 `OverlayEntry` 内部状态发生的改变而触发的。
这个破坏性的改动优化了我们对 `OverlayEntry` 进行添加和移除的场景，
移除了不必要的重建以提高性能。

Since the `Navigator` internally puts each `Route` into an
`OverlayEntry` this change also applies to `Route` transitions:
If an opaque `Route` is pushed on top or removed from above another
`Route`, the `Route`s below the opaque `Route`
no longer rebuilds unnecessarily.

由于 `Navigator` 在内部会把每一个 `Route` 嵌套在 `OverlayEntry` 中，因此这个改动同样作用于 `Route` 的变换：
如果一个不透明的 `Route` 被添加到栈顶，或是从另一个 `Route` 的上层被移除时，
位于不透明的 `Route` 下面的 `Route` 将不再进行不必要的重建。

## Description of change

## 更改描述

In most cases, this change doesn't require any changes to your code.
However, if your app was erroneously relying on the implicit
rebuilds you may see issues, which can be resolved by wrapping
any state change in a `setState` call.

在大多数情况下，本次优化不需要你对代码进行任何更改。
然而，如果你的应用错误地依赖了隐式重建，你可能会发现问题，
这可以通过调用 `setState` 进行状态的变更来解决。

Furthermore, this change slightly modified the shape of the
widget tree: Prior to this change,
the `OverlayEntry`s were wrapped in a `Stack` widget.
The explicit `Stack` widget was removed from the widget hierarchy.

此外，这一更改略微调整了 widget 树的层级结构：
在此更改之前，`OverlayEntry` 集合嵌套在 `Stack` 中。
更改后，`Stack` 将从 `widget` 树结构中移除。

## Migration guide

## 迁移指南

If you're seeing issues after upgrading to a Flutter version
that included this change, audit your code for missing calls to
`setState`. In the example below, assigning the return value of
`Navigator.pushNamed` to `buttonLabel` is
implicitly modifying the state and it should be wrapped in an
explicit `setState` call.

如果你在升级到包含此次更改的 Flutter 版本后遇到了问题，请检查你的代码是否遗漏了 `setState` 的调用。
在下面的例子中，`Navigator.pushNamed` 方法异步执行完后隐式地修改了 `Text` 所展示的字符串 `buttonLabel`，
它应该在显式的 `setState` 中调用。
 
Code before migration:

迁移前代码：

<!-- skip -->
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

迁移后代码：

<!-- skip -->
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

## 时间轴

Landed in version: 1.16.3<br>
In stable release: 1.17

发布于版本：1.16.3<br>
发布于稳定版本：1.17

## References

## 参考文献

API documentation:

API 文档：

* [`setState`][]
* [`OverlayEntry`][]
* [`Overlay`][]
* [`Navigator`][]
* [`Route`][]
* [`OverlayRoute`][]

Relevant issues:

相关 issues：

* [Issue 45797][]

Relevant PRs:

相关 PR：

* [Do not rebuild Routes when a new opaque Route is pushed on top][]
* [Reland "Do not rebuild Routes when a new opaque Route is pushed on top"][]


[Do not rebuild Routes when a new opaque Route is pushed on top]: {{site.repo.flutter}}/pull/48900
[Issue 45797]: {{site.repo.flutter}}/issues/45797
[`Navigator`]: {{site.api}}/flutter/widgets/Navigator-class.html
[`Overlay`]: {{site.api}}/flutter/widgets/Overlay-class.html
[`OverlayEntry`]: {{site.api}}/flutter/widgets/OverlayEntry-class.html
[`OverlayRoute`]: {{site.api}}/flutter/widgets/OverlayRoute-class.html
[`Route`]: {{site.api}}/flutter/widgets/Route-class.html
[`setState`]: {{site.api}}/flutter/widgets/State/setState.html
[Reland "Do not rebuild Routes when a new opaque Route is pushed on top"]: {{site.repo.flutter}}/pull/49376
