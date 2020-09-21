---
title: Find widgets
title: 定位到目标 widget
description: How to use the Finder classes for testing widgets.
description: 如何在 widget 测试中使用 Finder 类。
tags: cookbook, 实用教程, 测试
keywords: 定位 widget,CommonFinders,flutter_test
prev:
  title: An introduction to widget testing
  title: Widget 测试介绍
  path: /docs/cookbook/testing/widget/introduction
next:
  title: Tap, drag, and enter text
  title: 点击、拖拽事件和文本输入
  path: /docs/cookbook/testing/widget/tap-drag
---

{% assign api = site.api | append: '/flutter' -%}

To locate widgets in a test environment, use the `Finder`
classes. While it's possible to write your own `Finder` classes,
it's generally more convenient to locate widgets using the tools
provided by the [`flutter_test`][] package.

在测试环境下，为了定位 widgets，我们需要用到 `Finder` 类。
我们可以编写自己的 `finder` 类，
不过通常使用 [`flutter_test`][] package 提供的工具来定位 widgets 更加方便。

This recipe looks at the [`find`][] constant provided by
the `flutter_test` package, and demonstrates how
to work with some of the `Finders` it provides.
For a full list of available finders,
see the [`CommonFinders` documentation][].

下面，我们来看看 `flutter_test` package 提供的 [`find`][]
常量并演示如何使用其所提供的 `Finders`。
如需查看完整的 finders 的列表，
请参阅 [`CommonFinders` 文档][`CommonFinders` documentation]。

If you're unfamiliar with widget testing and the role of
`Finder` classes,
review the [Introduction to widget testing][] recipe.

如果你还不熟悉 Widget 测试和 Finder 类使用方法，
请参阅 [在 Flutter 里做集成测试][Introduction to widget testing]。

This recipe uses the following steps:

本教程包含以下步骤：

  1. Find a `Text` widget.
  
     查找 `Text` Widget 
  
  2. Find a widget with a specific `Key`.
  
     使用具体 `Key` 查找 Widget
  
  3. Find a specific widget instance.
  
     查找具体的 Widget 实例
  

### 1. Find a `Text` widget

### 一. 查找 `Text` widget

In testing, you often need to find widgets that contain specific text.
This is exactly what the `find.text()` method is for. It creates a
`Finder` that searches for widgets that display a specific `String` of text.

在测试中，我们经常需要查找含有特定文本的 widget。
这正是 `find.text()` 的用途。它会创建一个 `Finder`
来寻找显示特定文本 `String` 的 widget。

<!-- skip -->
```dart
testWidgets('finds a Text widget', (WidgetTester tester) async {
  // Build an app with a Text widget that displays the letter 'H'.
  await tester.pumpWidget(MaterialApp(
    home: Scaffold(
      body: Text('H'),
    ),
  ));

  // Find a widget that displays the letter 'H'.
  expect(find.text('H'), findsOneWidget);
});
```

### 2. Find a widget with a specific `Key`

### 二. 使用具体 `Key` 查找 widget

In some cases, you might want to find a widget based on the Key that has been
provided to it. This can be handy if displaying multiple instances of the
same widget. For example, a `ListView` might display several
`Text` widgets that contain the same text.

有时，我们可能想要通过已经提供给 widget 的 Key 来查找 widget。
这样在显示多个相同 widget 实体时会很方便。
比如，我们有一个 `ListView` 列表，
它显示了数个含有相同文本的 `Text` widgets。

In this case, provide a `Key` to each widget in the list. This allows
an app to uniquely identify a specific widget, making it easier to find
the widget in the test environment.

在这种情况下，我们可以为列表中的每一个 widget 赋予一个 `Key`。
这样我们就可以唯一识别特定的 widget，
在测试环境中更容易查找 widget。

<!-- skip -->
```dart
testWidgets('finds a widget using a Key', (WidgetTester tester) async {
  // Define the test key.
  final testKey = Key('K');

  // Build a MaterialApp with the testKey.
  await tester.pumpWidget(MaterialApp(key: testKey, home: Container()));

  // Find the MaterialApp widget using the testKey.
  expect(find.byKey(testKey), findsOneWidget);
});
```

### 3. Find a specific widget instance

### 三. 查找具体的 Widget 实例

Finally, you might be interested in locating a specific instance of a widget.
For example, this can be useful when creating widgets that take a `child`
property and you want to ensure you're rendering the `child` widget.

最后，我们有时会需要查找 widget 的具体实例。
比如，当创建含有 `child` 属性的 widget 并需要确保渲染 `child` widget。

<!-- skip -->
```dart
testWidgets('finds a specific instance', (WidgetTester tester) async {
  final childWidget = Padding(padding: EdgeInsets.zero);

  // Provide the childWidget to the Container.
  await tester.pumpWidget(Container(child: childWidget));

  // Search for the childWidget in the tree and verify it exists.
  expect(find.byWidget(childWidget), findsOneWidget);
});
```

### Summary

### 总结

The `find` constant provided by the `flutter_test` package provides
several ways to locate widgets in the test environment. This recipe
demonstrated three of these methods, and several more methods exist
for different purposes.

在测试环境下，`flutter_test` 包提供的 `find` 常量
给了我们多种查找 widget 的方法。
本篇列举了三种方法，另外还有一些其他用途的方法。

If the above examples do not work for a particular use-case,
see the [`CommonFinders` documentation][]
to review all available methods.

如果上述示例不适用于一些特殊情况，
请到 [`CommonFinders` 文档][`CommonFinders` documentation] 中查看更多用法。

### Complete example

### 完整样例

```dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('finds a Text widget', (WidgetTester tester) async {
    // Build an App with a Text widget that displays the letter 'H'.
    await tester.pumpWidget(MaterialApp(
      home: Scaffold(
        body: Text('H'),
      ),
    ));

    // Find a widget that displays the letter 'H'.
    expect(find.text('H'), findsOneWidget);
  });

  testWidgets('finds a widget using a Key', (WidgetTester tester) async {
    // Define the test key.
    final testKey = Key('K');

    // Build a MaterialApp with the testKey.
    await tester.pumpWidget(MaterialApp(key: testKey, home: Container()));

    // Find the MaterialApp widget using the testKey.
    expect(find.byKey(testKey), findsOneWidget);
  });

  testWidgets('finds a specific instance', (WidgetTester tester) async {
    final childWidget = Padding(padding: EdgeInsets.zero);

    // Provide the childWidget to the Container.
    await tester.pumpWidget(Container(child: childWidget));

    // Search for the childWidget in the tree and verify it exists.
    expect(find.byWidget(childWidget), findsOneWidget);
  });
}
```


[`CommonFinders` documentation]: {{api}}/flutter_test/CommonFinders-class.html
[`find`]: {{api}}/flutter_test/find-constant.html
[`flutter_test`]: {{api}}/flutter_test/flutter_test-library.html
[Introduction to widget testing]: /docs/cookbook/testing/widget/introduction
