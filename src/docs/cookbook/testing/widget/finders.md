---
title: Finding widgets
title: 定位到目标 Widgets
prev:
  title: An introduction to widget testing
  title: Widget 测试介绍
  path: /docs/cookbook/testing/widget/introduction
next:
  title: Tapping, dragging and entering text
  title: 点击、拖拽事件和文本输入
  path: /docs/cookbook/testing/widget/tap-drag
---

{% assign api = site.api | append: '/flutter' -%}

In order to locate Widgets in a test environment, we need to use `Finder`
classes. While it's possible to write our own `Finder` classes, it's generally
more convenient to locate Widgets using the tools provided by the
[`flutter_test`]({{api}}/flutter_test/flutter_test-library.html)
package.

在测试环境下，为了定位 Widgets，我们需要用到 `Finder` 类。我们可以编写自己的 `finder` classes，不过通常使用 [`flutter_test`]({{api}}/flutter_test/flutter_test-library.html) 包提供的工具来定位 Widgets 更加方便。

In this recipe, we'll look at the
[`find`]({{api}}/flutter_test/find-constant.html)
constant provided by the `flutter_test` package and demonstrate how to work with
some of the `Finders` it provides. For a full list of available finders, please
consult the
[`CommonFinders` documentation]({{api}}/flutter_driver/CommonFinders-class.html).

下面，我们来看看 `flutter_test` 包提供的 [`find`]({{api}}/flutter_test/find-constant.html) 常量并演示如何使用其所提供的 `Finders`。如需查看完整的 finders 的列表，请参阅 [`CommonFinders` documentation]({{api}}/flutter_driver/CommonFinders-class.html)。

If you're unfamiliar with Widget testing and the role of `Finder` classes,
review the [Introduction to Widget testing](/docs/cookbook/testing/integration) recipe.

如果你还不熟悉 Widget 测试和 Finder 类使用方法，请参阅 [Introduction to Widget testing](/docs/cookbook/testing/integration)。

### Directions

### 步骤：

  1. Find a `Text` Widget
  
     查找 `Text` Widget 
  
  2. Find a Widget with a specific `Key`
  
     使用具体 `Key` 查找Widget
  
  3. Find a specific Widget instance
  
     查找具体的 Widget 实例
  

### 1. Find a `Text` Widget

###    查找Text Widget

In our tests, we often need to find Widgets that contain specific text. This is
exactly what the `find.text` method is for. It will create a `Finder` that
searches for Widgets that display a specific `String` of text.

在测试中，我们经常需要查找含有特定文本的 Widget。这正是 `find.text` 的用途。它会创建一个 `Finder` 来寻找显示特定文本 `String` 的 Widget。

<!-- skip -->
```dart
testWidgets('finds a Text Widget', (WidgetTester tester) async {
  // Build an App with a Text Widget that displays the letter 'H'
  await tester.pumpWidget(MaterialApp(
    home: Scaffold(
      body: Text('H'),
    ),
  ));

  // Find a Widget that displays the letter 'H'
  expect(find.text('H'), findsOneWidget);
});
```

### 2. Find a Widget with a specific `Key`

###    使用具体 `Key` 查找Widget

In some cases, we may want to find a Widget based on the Key that has been
provided to it. This can be handy if we're displaying multiple instances of the
same Widget. For example, we might have a `ListView` that displays several
`Text` Widgets that contain the same text.

有时，我们可能想要通过已经提供给 Widget 的 Key 来查找 Widget。这样在显示多个相同 Widget实体时会很方便。比如，我们有一个 `ListView` 列表，它显示了数个含有相同文本的 `Text` Widgets。

In this case, we can provide a `Key` to each Widget in the list. This will allow
us to uniquely identify a specific Widget, making it easier to find the Widget
in the test environment.

在这种情况下，我们可以为列表中的每一个 Widget 赋予一个 `Key`。这样我们就可以唯一识别特定的 Widget，在测试环境中更容易查找 Widget。

<!-- skip -->
```dart
testWidgets('finds a Widget using a Key', (WidgetTester tester) async {
  // Define our test key
  final testKey = Key('K');

  // Build a MaterialApp with the testKey
  await tester.pumpWidget(MaterialApp(key: testKey, home: Container()));

  // Find the MaterialApp Widget using the testKey
  expect(find.byKey(testKey), findsOneWidget);
});
```

### 3. Find a specific Widget instance

###    查找具体的 Widget 实例

Finally, we might be interested in locating a specific instance of a Widget.
For example, this can be useful when creating Widgets that take a `child`
property and we want to ensure we're rendering the `child` Widget.

最后，我们有时会需要查找 Widget 的具体实例。比如，当创建含有 `child` 属性的 Widget 并需要确保渲染  `child` Widget。

<!-- skip -->
```dart
testWidgets('finds a specific instance', (WidgetTester tester) async {
  final childWidget = Padding(padding: EdgeInsets.zero);

  // Provide our childWidget to the Container
  await tester.pumpWidget(Container(child: childWidget));

  // Search for the childWidget in the tree and verify it exists
  expect(find.byWidget(childWidget), findsOneWidget);
});
```

### Summary

### 总结

The `find` constant provided by the `flutter_test` package gives us several ways
to locate Widgets in the test environment. This recipe demonstrated three of
these methods, and several more methods exist for different purposes.

在测试环境下，`flutter_test` 包提供的 `find` 常量给了我们多种查找 Widget 的方法。本篇列举了三种方法，另外还有一些其他用途的方法。

If the above examples do not work for a particular use-case, please see the
[`CommonFinders` documentation]({{api}}/flutter_driver/CommonFinders-class.html)
to review all available methods.

如果上述示例不适用于一些特殊情况，请到 [`CommonFinders` documentation]({{api}}/flutter_driver/CommonFinders-class.html) 查看更多用法。

### Complete example

### 完整示例：

```dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('finds a Text Widget', (WidgetTester tester) async {
    // Build an App with a Text Widget that displays the letter 'H'
    await tester.pumpWidget(MaterialApp(
      home: Scaffold(
        body: Text('H'),
      ),
    ));

    // Find a Widget that displays the letter 'H'
    expect(find.text('H'), findsOneWidget);
  });

  testWidgets('finds a Widget using a Key', (WidgetTester tester) async {
    // Define our test key
    final testKey = Key('K');

    // Build a MaterialApp with the testKey
    await tester.pumpWidget(MaterialApp(key: testKey, home: Container()));

    // Find the MaterialApp Widget using the testKey
    expect(find.byKey(testKey), findsOneWidget);
  });

  testWidgets('finds a specific instance', (WidgetTester tester) async {
    final childWidget = Padding(padding: EdgeInsets.zero);

    // Provide our childWidget to the Container
    await tester.pumpWidget(Container(child: childWidget));

    // Search for the childWidget in the tree and verify it exists
    expect(find.byWidget(childWidget), findsOneWidget);
  });
}
```
