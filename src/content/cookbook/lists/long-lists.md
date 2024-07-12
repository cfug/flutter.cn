---
# title: Work with long lists
title: 长列表的处理
# description: Use ListView.builder to implement a long or infinite list.
description: 使用 ListView.builder 实现一个长或无限的列表。
tags: cookbook, 实用教程, 列表相关
keywords: 长列表,进阶,数据源
js:
  - defer: true
    url: /assets/js/inject_dartpad.js
---

<?code-excerpt path-base="cookbook/lists/long_lists/"?>

The standard [`ListView`][] constructor works well
for small lists. To work with lists that contain
a large number of items, it's best to use the
[`ListView.builder`][] constructor.

标准的 [`ListView`][] 构造函数适用于短列表，对于具有大量列表项的长列表，
需要用 [`ListView.builder`][] 构造函数来创建。

In contrast to the default `ListView` constructor, which requires
creating all items at once, the `ListView.builder()` constructor
creates items as they're scrolled onto the screen.

与标准的 `ListView` 构造函数需要一次性创建所有列表项不同的是，
`ListView.builder` 构造函数只在列表项从屏幕外滑入屏幕时才去创建列表项。

## 1. Create a data source

## 1. 创建数据源

First, you need a data source. For example, your data source
might be a list of messages, search results, or products in a store.
Most of the time, this data comes from the internet or a database.

首先，需要获取列表的数据源。
例如，数据源可以是消息集、搜索结果集或者商店商品集。
大部分情况下，这些数据来自于网络请求或者数据库获取。

For this example, generate a list of 10,000 Strings using the
[`List.generate`][] constructor.

在下面的例子，使用 [`List.generate`][] 构造函数生成包含 10,000 个字符串的集合。

<?code-excerpt "lib/main.dart (Items)" replace="/^items: //g"?>
```dart
List<String>.generate(10000, (i) => 'Item $i'),
```

## 2. Convert the data source into widgets

## 2. 将数据源渲染成组件

To display the list of strings, render each String as a widget
using `ListView.builder()`.

为了将字符串集合展示出来，需要通过 `ListView.builder`
把集合中的每个字符串都渲染成组件。

In this example, display each String on its own line.

在下面的例子中，将会把每个字符串用单行列表项显示在列表中。

<?code-excerpt "lib/main.dart (ListView)" replace="/^body: //g;/^\),$/)/g"?>
```dart
ListView.builder(
  itemCount: items.length,
  prototypeItem: ListTile(
    title: Text(items.first),
  ),
  itemBuilder: (context, index) {
    return ListTile(
      title: Text(items[index]),
    );
  },
)
```

## Interactive example

## 交互式样例

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter create long list hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() {
  runApp(
    MyApp(
      items: List<String>.generate(10000, (i) => 'Item $i'),
    ),
  );
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
        appBar: AppBar(
          title: const Text(title),
        ),
        body: ListView.builder(
          itemCount: items.length,
          prototypeItem: ListTile(
            title: Text(items.first),
          ),
          itemBuilder: (context, index) {
            return ListTile(
              title: Text(items[index]),
            );
          },
        ),
      ),
    );
  }
}
```

## Children's extent

To specify each item's extent, you can use either [`prototypeItem`][], [`itemExtent`][],
or [`itemExtentBuilder`][].

Specifying either is more efficient than letting the children determine their own extent
because the scrolling machinery can make use of the foreknowledge of the children's
extent to save work, for example when the scroll position changes drastically.

Use [`prototypeItem`][] or [`itemExtent`][] if your list has items of fixed size.

Use [`itemExtentBuilder`][] if your list has items of different sizes.

<noscript>
  <img src="/assets/images/docs/cookbook/long-lists.gif" alt="Long Lists Demo" class="site-mobile-screenshot" />
</noscript>

[`List.generate`]: {{site.api}}/flutter/dart-core/List/List.generate.html
[`ListView`]: {{site.api}}/flutter/widgets/ListView-class.html
[`ListView.builder`]: {{site.api}}/flutter/widgets/ListView/ListView.builder.html
[`prototypeItem`]: {{site.api}}/flutter/widgets/ListView/prototypeItem.html
[`itemExtent`]: {{site.api}}/flutter/widgets/ListView/itemExtent.html
[`itemExtentBuilder`]: {{site.api}}/flutter/widgets/ListView/itemExtentBuilder.html
