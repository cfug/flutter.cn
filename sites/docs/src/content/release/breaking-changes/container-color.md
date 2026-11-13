---
# title: Container with color optimization
title: 带颜色的 Container 优化
# description: >
#   A container with a color and no other background decoration
#   no longer builds the same child widgets.
description: >
  仅指定颜色、没有其他背景装饰的 container，
  构建出的子 widget 已与之前不同。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

A new `ColoredBox` widget has been added to the framework,
and the `Container` widget has been optimized to use it
if a user specifies a `color` instead of a `decoration`.

框架新增了 `ColoredBox` widget。
如果用户指定的是 `color` 而不是 `decoration`，
`Container` widget 会改用它，从而得到优化。

## Context

## 上下文

It is very common to use the `Container` widget as follows:

下面这种 `Container` 用法非常常见：

```dart
return Container(color: Colors.red);
```

Previously, this code resulted in a widget hierarchy that used a
`BoxDecoration` to actually paint the background color.
The `BoxDecoration` widget covers many cases other than
just painting a background color,
and is not as efficient as the new `ColoredBox` widget,
which only paints a background color.

之前，这段代码生成的 widget 层级会用 `BoxDecoration` 来实际绘制背景色。
`BoxDecoration` 能处理的情况远不止绘制背景色，
效率也不如只绘制背景色的新 `ColoredBox` widget。

Widget tests that wanted to assert based on the color
of a container in the widget tree would previously have
to find the `BoxDecoration` to actually get
the color of the container.
Now, they are able to check the `color` property
on the `Container` itself, unless a `BoxDecoration`
was explicitly provided as the `decoration` property.
It is still an error to supply both `color` and
`decoration` to `Container`.

widget 测试若要根据 widget 树中 container 的颜色做断言，
之前必须找到 `BoxDecoration` 才能拿到 container 的颜色。
现在可以直接检查 `Container` 自身的 `color` 属性，
除非显式把 `BoxDecoration` 作为 `decoration` 传入。
同时向 `Container` 提供 `color` 和 `decoration` 仍然是错误的。

## Migration guide

## 迁移指南

Tests that assert on the color of a `Container`
or that expected it to create a
`BoxDecoration` need to be modified.

对 `Container` 颜色做断言、
或预期它会创建 `BoxDecoration` 的测试需要修改。

Code before migration:

迁移之前的代码：

```dart
testWidgets('Container color', (WidgetTester tester) async {
  await tester.pumpWidget(Container(color: Colors.red));

  final Container container = tester.widgetList<Container>().first;
  expect(container.decoration.color, Colors.red);
  // Or, a test may have specifically looked for the BoxDecoration, e.g.:
  expect(find.byType(BoxDecoration), findsOneWidget);
});
```

Code after migration:

迁移之后的代码：

```dart
testWidgets('Container color', (WidgetTester tester) async {
  await tester.pumpWidget(Container(color: Colors.red));

  final Container container = tester.widgetList<Container>().first;
  expect(container.color, Colors.red);
  // If your test needed to work directly with the BoxDecoration, it should
  // instead look for the ColoredBox, e.g.:
  expect(find.byType(BoxDecoration), findsNothing);
  expect(find.byType(ColoredBox), findsOneWidget);
});
```

## Timeline

## 时间线

Landed in version: 1.15.4<br>
合入版本：1.15.4<br>
In stable release: 1.17

进入稳定版：1.17

## References

## 参考资料

API documentation:

API 文档：

* [`Container`][]
* [`ColoredBox`][]
* [`BoxDecoration`][]

Relevant issues:

相关 issue：

* [Issue 9672][]
* [Issue 28753][]

Relevant PR:

相关 PR：

* [Colored box and container optimization #50979][]

  [ColoredBox 与 Container 优化 #50979][Colored box and container optimization #50979]

[`Container`]: {{site.api}}/flutter/widgets/Container-class.html
[`ColoredBox`]: {{site.api}}/flutter/widgets/ColoredBox-class.html
[`BoxDecoration`]: {{site.api}}/flutter/painting/BoxDecoration-class.html
[Issue 9672]: {{site.repo.flutter}}/issues/9672
[Issue 28753]: {{site.repo.flutter}}/issues/28753
[Colored box and container optimization #50979]: {{site.repo.flutter}}/pull/50979
