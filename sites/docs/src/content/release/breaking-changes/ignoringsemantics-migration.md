---
# title: Migration guide for ignoringSemantics in IgnorePointer and related classes
title: IgnorePointer 及相关类中 ignoringSemantics 的迁移指南
# description: Removal of ignoringSemantics in IgnorePointer and related classes.
description: 移除 IgnorePointer 及相关类中的 ignoringSemantics。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The `IgnoringPointer` widget allows you to designate an area of the UI
where you don't want to accept pointer events, for example, when
you don't want to allow the user to enter text in a text field.

借助 `IgnorePointer` widget，你可以指定 UI 中不希望接收指针事件的区域，
例如不希望用户在文本字段中输入文本时。

Previously, the `IgnorePointer` not only blocked pointer events but also
dropped its subtree from the semantics tree. The `ignoreSemantics` parameter
was introduced as a workaround to preserve the semantics tree when using
`IgnorePointer`s.

此前，`IgnorePointer` 不仅会阻止指针事件，
还会把它的子树从语义树中去掉。
引入 `ignoreSemantics` 参数是一种变通办法，
以便在使用 `IgnorePointer` 时保留语义树。

The `IgnorePointer` behavior has changed in that it no longer drops
the entire semantics subtree but merely blocks semantics actions in the
subtree. The `ignoringSemantics` workaround is no longer needed and is
deprecated.

`IgnorePointer` 的行为已经改变：它不再丢掉整个语义子树，
而只是阻止子树中的语义操作。
`ignoringSemantics` 这一变通办法不再需要，并已弃用。

This change also applies to the `AbsorbPointer` and
`SliverIgnorePointer` widgets.

这次改动同样适用于 `AbsorbPointer` 和 `SliverIgnorePointer` widget。

## Description of change

## 改动说明

`ignoringSemantics` was removed.

`ignoringSemantics` 已移除。

## Migration guide

## 迁移指南

If you set this parameter to true in these widgets, consider using
`ExcludeSemantics` instead.

如果在这些 widget 中将该参数设为 true，请考虑改用 `ExcludeSemantics`。

Code before migration:

迁移之前的代码：

```dart
IgnorePointer(
  ignoringSemantics: true,
  child: const PlaceHolder(),
);

AbsorbPointer(
  ignoringSemantics: true,
  child: const PlaceHolder(),
);

SliverIgnorePointer(
  ignoringSemantics: true,
  child: const PlaceHolder(),
);
```

Code after migration:

迁移之后的代码：

```dart
ExcludeSemantics(
  child: IgnorePointer(
    child: const PlaceHolder(),
  ),
);

ExcludeSemantics(
  child: AbsorbPointer(
    child: const PlaceHolder(),
  ),
);

SliverIgnorePointer(
  child: ExcludeSemantics(
    child: const PlaceHolder(),
  ),
);
```

If you are previously using `IgnorePointer`s with `ignoringSemantics` set to `false`,
you can achieve the same behavior by copying the follow widgets directly into your
code and use.

如果你之前使用 `IgnorePointer` 且将 `ignoringSemantics` 设为 `false`，
可以把下列 widget 直接复制到代码中使用，以获得相同行为。

```dart
/// A widget ignores pointer events without modifying the semantics tree.
class _IgnorePointerWithSemantics extends SingleChildRenderObjectWidget {
  const _IgnorePointerWithSemantics({
    super.child,
  });

  @override
  _RenderIgnorePointerWithSemantics createRenderObject(BuildContext context) {
    return _RenderIgnorePointerWithSemantics();
  }
}

class _RenderIgnorePointerWithSemantics extends RenderProxyBox {
  _RenderIgnorePointerWithSemantics();

  @override
  bool hitTest(BoxHitTestResult result, { required Offset position }) => false;
}

/// A widget absorbs pointer events without modifying the semantics tree.
class _AbsorbPointerWithSemantics extends SingleChildRenderObjectWidget {
  const _AbsorbPointerWithSemantics({
    super.child,
  });

  @override
  _RenderAbsorbPointerWithSemantics createRenderObject(BuildContext context) {
    return _RenderAbsorbPointerWithSemantics();
  }
}

class _RenderAbsorbPointerWithSemantics extends RenderProxyBox {
  _RenderAbsorbPointerWithSemantics();

  @override
  bool hitTest(BoxHitTestResult result, { required Offset position }) {
    return size.contains(position);
  }
}

/// A sliver ignores pointer events without modifying the semantics tree.
class _SliverIgnorePointerWithSemantics extends SingleChildRenderObjectWidget {
  const _SliverIgnorePointerWithSemantics({
    super.child,
  });

  @override
  _RenderSliverIgnorePointerWithSemantics createRenderObject(BuildContext context) {
    return _RenderSliverIgnorePointerWithSemantics();
  }
}

class _RenderSliverIgnorePointerWithSemantics extends RenderProxySliver {
  _RenderSliverIgnorePointerWithSemantics();

  @override
  bool hitTest(BoxHitTestResult result, { required Offset position }) => false;
}
```

## Timeline

## 时间线

Landed in version: 3.10.0-2.0.pre<br>
合入版本：3.10.0-2.0.pre<br>
In stable release: 3.13.0

进入稳定版：3.13.0

## References

## 参考资料

Relevant PRs:

相关 PR：

* [PR 120619][]: Fixes IgnorePointer and AbsorbPointer to only block user
  interactions in a11y.

  [PR 120619][PR 120619]：修复 IgnorePointer 与 AbsorbPointer，
  使其仅在无障碍中阻止用户交互。

[PR 120619]: {{site.repo.flutter}}/pull/120619
[`IgnorePointer`]: {{site.api}}/flutter/widgets/IgnorePointer-class.html
[`AbsorbPointer`]: {{site.api}}/flutter/widgets/AbsorbPointer-class.html
[`SliverIgnorePointer`]: {{site.api}}/flutter/widgets/SliverIgnorePointer-class.html
[`RenderSliverIgnorePointer`]: {{site.api}}/flutter/rendering/RenderSliverIgnorePointer-class.html
[`RenderIgnorePointer`]: {{site.api}}/flutter/rendering/RenderIgnorePointer-class.html
[`RenderAbsorbPointer`]: {{site.api}}/flutter/rendering/RenderAbsorbPointer-class.html
