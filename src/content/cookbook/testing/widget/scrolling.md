---
# title: Handle scrolling
title: 模拟滚动操作
# description: How to handle scrolling in a widget test.
description: 如何在 widget 测试中模拟滚动操作。
---

<?code-excerpt path-base="cookbook/testing/widget/scrolling/"?>

Many apps feature lists of content,
from email clients to music apps and beyond.
To verify that lists contain the expected content
using widget tests,
you need a way to scroll through lists to search for particular items.

许多应用程序（电子邮件客户端、音乐应用程序等）都具有内容列表功能。
要使用 widget 测试来验证列表是否包含预期内容，
你需要一种方法来滚动列表以检索指定的项目。

To scroll through lists via integration tests,
use the methods provided by the [`WidgetTester`][] class,
which is included in the [`flutter_test`][] package:

请在集成测试中使用 [`WidgetTester`][] 类提供的方法测试滚动列表，
该类包含在 [`flutter_test`][] package 中：

In this recipe, learn how to scroll through a list of items to
verify a specific widget is being displayed,
and the pros and cons of different approaches. 

在本指南中，你将学习如何滚动列表来验证指定的 widget 是否正在显示，
还会了解到不同做法的利弊。

This recipe uses the following steps:

本指南会采用以下步骤：

1. Create an app with a list of items.

   创建带有列表的应用程序。

2. Write a test that scrolls through the list.

   编写滚动列表的测试。

3. Run the test.

   运行测试。

## 1. Create an app with a list of items

## 1、创建带有列表的应用程序

This recipe builds an app that shows a long list of items.
To keep this recipe focused on testing, use the app created in the
[Work with long lists][] recipe.
If you're unsure of how to work with long lists,
see that recipe for an introduction.

本章节创建了一个显示长列表的应用程序。
为了专注于测试的编写，
这里使用 [长列表的处理][Work with long lists] 指南中创建的应用程序。
如果你不确定如何使用长列表，请查阅该指南。

Add keys to the widgets you want to interact with
inside the integration tests.

请在需要交互的 widget 上添加 key 以便
进行集成测试。

<?code-excerpt "lib/main.dart"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp(items: List<String>.generate(10000, (i) => 'Item $i')));
}

class MyApp extends StatelessWidget {
  final List<String> items;

  const MyApp({super.key, required this.items});

  @override
  Widget build(BuildContext context) {
    const title = 'Long List';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(title: const Text(title)),
        body: ListView.builder(
          // Add a key to the ListView. This makes it possible to
          // find the list and scroll through it in the tests.
          key: const Key('long_list'),
          itemCount: items.length,
          itemBuilder: (context, index) {
            return ListTile(
              title: Text(
                items[index],
                // Add a key to the Text widget for each item. This makes
                // it possible to look for a particular item in the list
                // and verify that the text is correct
                key: Key('item_${index}_text'),
              ),
            );
          },
        ),
      ),
    );
  }
}
```


## 2. Write a test that scrolls through the list

## 2、编写滚动列表的测试

Now, you can write a test. In this example, scroll through the list of items and
verify that a particular item exists in the list. The [`WidgetTester`][] class
provides the [`scrollUntilVisible()`][] method, which scrolls through a list
until a specific widget is visible. This is useful because the height of the
items in the list can change depending on the device.

现在，你可以编写一个测试：滚动列表并验证列表中是否存在指定的项目。
使用 [`WidgetTester`][] 类提供的 [`scrollUntilVisible()`][] 方法，
它可以滚动列表，直到某个指定的 widget 可见为止。
这个方法非常有用，
因为列表中项目的高度会根据设备的不同而变化。

Rather than assuming that you know the height of all the items
in a list, or that a particular widget is rendered on all devices,
the `scrollUntilVisible()` method repeatedly scrolls through
a list of items until it finds what it's looking for.

`scrollUntilVisible()` 方法只会缓慢地滚动列表，直至找到指定的内容。
它不会假定你知道列表中所有项目的高度，
也不会假定指定的 widget 会在所有设备上渲染。

The following code shows how to use the `scrollUntilVisible()` method
to look through the list for a particular item. This code lives in a
file called `test/widget_test.dart`.

以下代码展示了如何使用 `scrollUntilVisible()` 方法
在列表中查找到指定的项目。
这段代码位于 `test/widget_test.dart` 文件中。

<?code-excerpt "test/widget_test.dart (ScrollWidgetTest)"?>
```dart

// This is a basic Flutter widget test.
//
// To perform an interaction with a widget in your test, use the WidgetTester
// utility that Flutter provides. For example, you can send tap and scroll
// gestures. You can also use WidgetTester to find child widgets in the widget
// tree, read text, and verify that the values of widget properties are correct.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:scrolling/main.dart';

void main() {
  testWidgets('finds a deep item in a long list', (tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(
      MyApp(items: List<String>.generate(10000, (i) => 'Item $i')),
    );

    final listFinder = find.byType(Scrollable);
    final itemFinder = find.byKey(const ValueKey('item_50_text'));

    // Scroll until the item to be found appears.
    await tester.scrollUntilVisible(itemFinder, 500.0, scrollable: listFinder);

    // Verify that the item contains the correct text.
    expect(itemFinder, findsOneWidget);
  });
}
```

## 3. Run the test

## 3、运行测试

Run the test using the following command from the root of the project:

在项目根目录下使用以下指令运行测试：

```console
flutter test test/widget_test.dart
```

[`flutter_test`]: {{site.api}}/flutter/flutter_test/flutter_test-library.html
[`WidgetTester`]: {{site.api}}/flutter/flutter_test/WidgetTester-class.html
[`ListView.builder`]: {{site.api}}/flutter/widgets/ListView/ListView.builder.html
[`scrollUntilVisible()`]: {{site.api}}/flutter/flutter_test/WidgetController/scrollUntilVisible.html
[Work with long lists]: /cookbook/lists/long-lists
