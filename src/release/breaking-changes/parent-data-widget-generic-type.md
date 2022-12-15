---
title: The generic type of ParentDataWidget changed to ParentData
title: ParentDataWidget 的泛型已更改为 ParentData。
description: The ParentDataWidget is now bound to the ParentData type.
description: 现在 ParentDataWidget 已绑定为 ParentData 类型。
---

## Summary

## 概述

The generic type of `ParentDataWidget` has changed from
`RenderObjectWidget` to `ParentData`.

`ParentDataWidget` 的泛型已由 `RenderObjectWidget` 更改为 `ParentData`。

## Context

## 上下文

Prior to this change, a `ParentDataWidget` was bound
to a specific `RenderObjectWidget` type as ancestor.
For example, a `Positioned` widget could only be used
within a `Stack` widget. With this change,
a `ParentDataWidget` can be used with any
`RenderObjectWidget` type as ancestor as long as
the `RenderObject` of said `RenderObjectWidget`
sets up the correct `ParentData` type. In this new world,
the `Positioned` widget can be reused with a hypothetical
new `SuperStack` widget.

在此次更改之前，`ParentDataWidget` 是作为祖先节点被绑定至特定的 `RenderObjectWidget` 类型的。
例如：`Positioned` 部件只能在 `Stack` 部件中使用。
通过此次更改，只要上述 `RenderObjectWidget` 的 `RenderObject`
设置了正确的 `ParentData` 类型，
`ParentDataWidget` 就可以作为任意 `RenderObjectWidget` 类型的祖先节点和其一起使用。
通过这种新的方式，`Positioned` 部件就可以通过假想的 `SuperStack` 新部件而被重用了。

## Description of change

## 更改描述

The generic type argument of `ParentDataWidget`
has changed from `RenderObjectWidget` to `ParentData`,
and a new debug property, `debugTypicalAncestorWidgetClass`,
is added to `ParentDataWidget`.
The latter is used for error messages to give users a
better idea of the context a given `ParentDataWidget`
is supposed to be used in.

`ParentDataWidget` 的泛型参数已由 `RenderObjectWidget` 更改为 `ParentData`，
并添加了一个新的调试属性 `debugTypicalAncestorWidgetClass`。
后者用于展示错误信息，让用户更好地理解 `ParentDataWidget` 中应该使用的上下文。

## Migration guide

## 迁移指南

You must migrate your code as described in this section
if you're subclassing or implementing `ParentDataWidget`.
If you do, the analyzer shows the following warnings when you
upgrade to the Flutter version that includes this change:

如果您继承或实现了 `ParentDataWidget`，则必须按照本节所述迁移您的代码。
当您升级至包含了此更改的 Flutter 版本时，分析器会展示如下警告信息：

```none
  error • Missing concrete implementation of 'getter ParentDataWidget.debugTypicalAncestorWidgetClass' • lib/main.dart:114:7 • non_abstract_class_inherits_abstract_member
  error • 'FrogJar' doesn't extend 'ParentData' • lib/main.dart:114:41 • type_argument_not_matching_bounds
```

Code before migration:

迁移前代码：

```dart
class FrogSize extends ParentDataWidget<FrogJar> {
  FrogSize({
    Key key,
    @required this.size,
    @required Widget child,
  }) : assert(child != null),
        assert(size != null),
        super(key: key, child: child);

  final Size size;

  @override
  void applyParentData(RenderObject renderObject) {
    final FrogJarParentData parentData = renderObject.parentData;
    if (parentData.size != size) {
      parentData.size = size;
      final RenderFrogJar targetParent = renderObject.parent;
      targetParent.markNeedsLayout();
    }
  }
}

class FrogJarParentData extends ParentData {
  Size size;
}

class FrogJar extends RenderObjectWidget {
  // ...
}
```

Code after migration:

迁移后代码：

```dart
class FrogSize extends ParentDataWidget<FrogJarParentData> { // FrogJar changed to FrogJarParentData
  FrogSize({
    Key key,
    @required this.size,
    @required Widget child,
  }) : assert(child != null),
        assert(size != null),
        super(key: key, child: child);

  final Size size;

  @override
  void applyParentData(RenderObject renderObject) {
    final FrogJarParentData parentData = renderObject.parentData;
    if (parentData.size != size) {
      parentData.size = size;
      final RenderFrogJar targetParent = renderObject.parent;
      targetParent.markNeedsLayout();
    }
  }

  @override
  Type get debugTypicalAncestorWidgetClass => FrogJar; // Newly added
}
```

The generic type of the `ParentDataWidget` superclass
changes from `FrogJar` (a `RenderObjectWidget`) to
`FrogJarParentData` (the `ParentData` type that
`FrogSize.applyParentData` wants to operate on).
Additionally, the new `debugTypicalAncestorWidgetClass`
is implemented for this `ParentDataWidget` subclass.
It returns the type of a typical ancestor `RenderObjectWidget`
for this `ParentDataWidget`. Most of the time,
you just want to return the old generic type here
(`FrogJar` in this example).

父类 `ParentDataWidget` 的泛型从 `FrogJar`（一个 `RenderObjectWidget`）更改为 `FrogJarParentData`
（`FrogSize.applyParentData` 所操作的 `ParentData` 类型）。
除此之外，子类 `ParentDataWidget` 实现了新的 `debugTypicalAncestorWidgetClass`。
它给 `ParentDataWidget` 返回了一个典型的 `RenderObjectWidget` 类型的祖先节点。
大多数时候，您只是想在此处返回旧的泛型（在这个示例中就是 `FrogJar`）。

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

* [`ParentDataWidget`][]

Relevant PR:

相关 PR：

* [Make ParentDataWidget usable with different ancestor RenderObjectWidget types][]

[Make ParentDataWidget usable with different ancestor RenderObjectWidget types]: {{site.repo.flutter}}/pull/48541
[`ParentDataWidget`]: {{site.api}}/flutter/widgets/ParentDataWidget-class.html
