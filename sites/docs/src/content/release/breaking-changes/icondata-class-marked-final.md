---
# title: IconData class marked as final
title: IconData 类被标记为 final
# description: >-
#   The IconData class is now marked as final,
#   preventing it from being extended or implemented.
description: >-
  IconData 类现已标记为 final，
  不能再被扩展或实现。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The `IconData` class is now marked as [`final`][],
which prevents it from being implemented or extended.
This change is part of an effort to generalize the
mechanism for tree-shaking assets and native code.

`IconData` 类现已标记为 [`final`][]，
因此不能再被实现或扩展。
此改动是把资源与原生代码的摇树优化机制
通用化这一工作的一部分。

[`final`]: {{site.dart-site}}/language/class-modifiers#final

## Background

## 背景

The Flutter team is working on a generalized mechanism to
bring tree-shaking of assets and native code to packages.
The existing bespoke Icon Tree Shaker is
being folded into this general mechanism.

Flutter 团队正在开发一套通用机制，
让 package 也能对资源和原生代码做摇树优化。
现有的专用 Icon Tree Shaker 将并入这套通用机制。

For performance, locality, and understandability, the general mechanism doesn't
support recording `const` instances in complex type hierarchies.
Therefore, the `IconData` class is now marked as `final`.

出于性能、局部性与可理解性，这套通用机制不支持
在复杂类型层次中记录 `const` 实例。
因此，`IconData` 类现已标记为 `final`。

Code that implements or extends `IconData` now
fails to compile with the following error:

实现或扩展 `IconData` 的代码现在会编译失败，
并出现下面的错误：

```text
The class 'IconData' is 'final' and can't be extended or implemented outside of its library.
```

## Migration guide

## 迁移指南

Instead of implementing `IconData`,
such as with an `enum` that supports dot shorthand,
type safety, and an automated `.values` list,
use a wrapper class with `static const` instances.

不要再实现 `IconData`，
例如不要再用支持点简写、类型安全
以及自动 `.values` 列表的 `enum`，
请改用带有 `static const` 实例的包装类。

### Migrating custom icon types

### 迁移自定义图标类型

If you used an `enum` that implements `IconData`,
migrate to a class with `static const` instances and a custom widget.

如果你用实现了 `IconData` 的 `enum`，
请迁移到带有 `static const` 实例的类，并配合自定义 widget。

Code before migration:

迁移前的代码：

```dart
enum AppIcons implements IconData {
  arrowUpward(0xe062),
  arrowDownward(0xe061);

  const AppIcons(this.codePoint)
    : fontFamily = 'MaterialIcons',
      fontPackage = null,
      matchTextDirection = false;

  @override
  final int codePoint;
  @override
  final String? fontFamily;
  @override
  final String? fontPackage;
  @override
  final bool matchTextDirection;
}

Widget build(BuildContext context) {
  // Example usage of AppIcons:
  return Icon(AppIcons.arrowUpward);
}
```

To maintain dot shorthand support and type safety,
use a wrapper class and a custom widget.

要保留点简写支持和类型安全，
请使用包装类和自定义 widget。

Code after migration:

迁移后的代码：

```dart
final class AppIconData {
  final IconData iconData;

  const AppIconData._(this.iconData);

  static const arrowUpward = AppIconData._(
    IconData(0xe062, fontFamily: 'MaterialIcons'),
  );
  static const arrowDownward = AppIconData._(
    IconData(0xe061, fontFamily: 'MaterialIcons'),
  );

  static const values = [arrowUpward, arrowDownward];
}

class AppIcon extends StatelessWidget {
  const AppIcon(this.icon, {super.key});
  final AppIconData icon;

  @override
  Widget build(BuildContext context) {
    return Icon(icon.iconData);
  }
}

Widget build(BuildContext context) {
  // Usage preserves dot shorthand if the type can be inferred:
  return const AppIcon(AppIconData.arrowUpward);
  // Or if inferred: const AppIcon(.arrowUpward)
}
```

If you rely on `.values` for tools like Widgetbook,
you can maintain the `values` list manually as shown in
the previous example or use code generation.

如果你依赖 `.values` 来配合 Widgetbook 等工具，
可以像上例那样手动维护 `values` 列表，
也可以使用代码生成。

### Ignore the `mustBeConst` lint

### 忽略 `mustBeConst` lint

To enable tree-shaking, some `IconData` parameters are
marked with the `mustBeConst` annotation.
If you must use a non-const `IconData` and
are willing to forgo tree-shaking for that icon,
add an ignore comment for the lint.

为了启用摇树优化，部分 `IconData` 参数
标有 `mustBeConst` 注解。
如果你必须使用非 const 的 `IconData`，
并且愿意放弃该图标的摇树优化，
请为这条 lint 添加忽略注释。

```dart
// ignore: non_const_argument_for_const_parameter
Icon(myDynamicIconData);
```

## Timeline

## 时间线

Landed in version: 3.44.0-0.1.pre<br>
合入版本：3.44.0-0.1.pre<br>
In stable release: 3.44

进入稳定版：3.44

## References

## 参考资料

Relevant PR:

相关 PR：

* [Mark `IconData` `final` and `@mustBeConst`][pr-181345]

  [将 `IconData` 标记为 `final` 并添加 `@mustBeConst`][pr-181345]

Relevant issues:

相关 issue：

* [Breaking Change: Marking `class IconData` as `final`][issue-181342]

  [破坏性改动：将 `class IconData` 标记为 `final`][issue-181342]

* [Marking `IconData`'s constructor parameters as `@mustBeConst`][issue-181344]

  [将 `IconData` 的构造函数参数标记为 `@mustBeConst`][issue-181344]

[pr-181345]: {{site.repo.flutter}}/pull/181345
[issue-181342]: {{site.repo.flutter}}/issues/181342
[issue-181344]: {{site.repo.flutter}}/issues/181344
