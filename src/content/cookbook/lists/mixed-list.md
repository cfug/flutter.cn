---
# title: Create lists with different types of items
title: 创建拥有不同列表项的列表
# description: How to implement a list that contains different types of assets.
description: 如何实现一个包含不同类型资源的列表。
tags: cookbook, 实用教程, 列表相关
keywords: 列表进阶
js:
  - defer: true
    url: /assets/js/inject_dartpad.js
---

<?code-excerpt path-base="cookbook/lists/mixed_list/"?>

You might need to create lists that display different types of content.
For example, you might be working on a list that shows a heading
followed by a few items related to the heading, followed by another heading,
and so on.

我们经常需要创建展示不同类型内容的列表。
比方说，我们可能在开发一个列表，它显示一个标题，
后跟一些与标题相关的项目，然后是另一个标题，依此类推。

Here's how you can create such a structure with Flutter:

你可以通过以下步骤，用 Flutter 创建这样的结构：

  1. Create a data source with different types of items.

     创建一个拥有不同类型项目的数据源

  2. Convert the data source into a list of widgets.

     将数据源的数据转换成列表 widget

## 1. Create a data source with different types of items

## 1. 创建一个具有不同类型项目的数据源

### Types of items

### 项目的类型

To represent different types of items in a list, define
a class for each type of item.

为了表示 List 中不同类型的项，我们需要为每一个类型的项目定义一个类。

In this example, create an app that shows a header followed by five
messages. Therefore, create three classes: `ListItem`, `HeadingItem`,
and `MessageItem`.

在这个例子中，我们将制作一个展示了标题，后面有五条消息的应用。
因此，我们将创建三个类：`ListItem`、`HeadingItem` 和 `MessageItem`。

<?code-excerpt "lib/main.dart (ListItem)"?>
```dart
/// The base class for the different types of items the list can contain.
abstract class ListItem {
  /// The title line to show in a list item.
  Widget buildTitle(BuildContext context);

  /// The subtitle line, if any, to show in a list item.
  Widget buildSubtitle(BuildContext context);
}

/// A ListItem that contains data to display a heading.
class HeadingItem implements ListItem {
  final String heading;

  HeadingItem(this.heading);

  @override
  Widget buildTitle(BuildContext context) {
    return Text(
      heading,
      style: Theme.of(context).textTheme.headlineSmall,
    );
  }

  @override
  Widget buildSubtitle(BuildContext context) => const SizedBox.shrink();
}

/// A ListItem that contains data to display a message.
class MessageItem implements ListItem {
  final String sender;
  final String body;

  MessageItem(this.sender, this.body);

  @override
  Widget buildTitle(BuildContext context) => Text(sender);

  @override
  Widget buildSubtitle(BuildContext context) => Text(body);
}
```

### Create a list of items

### 创建项目的 List

Most of the time, you would fetch data from the internet or a local
database and convert that data into a list of items.

大部分时候，我们从网络或本地数据库获取数据，并将数据转换成一个项目列表。

For this example, generate a list of items to work with. The list
contains a header followed by five messages. Each message has one
of 3 types: `ListItem`, `HeadingItem`, or `MessageItem`.

对于这个例子来说，我们将生成一个要使用的项目列表。
这个列表将包含一个标题，后跟五条消息。
每条消息都属于以下三种类型中的一种：
`ListItem`、`HeadingItem`，或者是 `MessageItem`。

<?code-excerpt "lib/main.dart (Items)" replace="/^items:/final items =/g;/^\),$/);/g"?>
```dart
final items = List<ListItem>.generate(
  1000,
  (i) => i % 6 == 0
      ? HeadingItem('Heading $i')
      : MessageItem('Sender $i', 'Message body $i'),
);
```

## 2. Convert the data source into a list of widgets

## 2. 将数据源的数据转换成列表 widget

To convert each item into a widget,
use the [`ListView.builder()`][] constructor.

为了把每一个项目转换成 widget，
我们将采用 [`ListView.builder()`][] 构造方法。

In general, provide a builder function that checks for what type
of item you're dealing with, and returns the appropriate widget
for that type of item.

通常，我们需要提供一个 builder 函数来确定我们正在处理的项目类型，
并返回该类型项目的相应 widget。

<?code-excerpt "lib/main.dart (builder)" replace="/^body: //g;/^\),$/)/g"?>
```dart
ListView.builder(
  // Let the ListView know how many items it needs to build.
  itemCount: items.length,
  // Provide a builder function. This is where the magic happens.
  // Convert each item into a widget based on the type of item it is.
  itemBuilder: (context, index) {
    final item = items[index];

    return ListTile(
      title: item.buildTitle(context),
      subtitle: item.buildSubtitle(context),
    );
  },
)
```

## Interactive example

## 交互式样例

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter create mixed lists hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() {
  runApp(
    MyApp(
      items: List<ListItem>.generate(
        1000,
        (i) => i % 6 == 0
            ? HeadingItem('Heading $i')
            : MessageItem('Sender $i', 'Message body $i'),
      ),
    ),
  );
}

class MyApp extends StatelessWidget {
  final List<ListItem> items;

  const MyApp({super.key, required this.items});

  @override
  Widget build(BuildContext context) {
    const title = 'Mixed List';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(
          title: const Text(title),
        ),
        body: ListView.builder(
          // Let the ListView know how many items it needs to build.
          itemCount: items.length,
          // Provide a builder function. This is where the magic happens.
          // Convert each item into a widget based on the type of item it is.
          itemBuilder: (context, index) {
            final item = items[index];

            return ListTile(
              title: item.buildTitle(context),
              subtitle: item.buildSubtitle(context),
            );
          },
        ),
      ),
    );
  }
}

/// The base class for the different types of items the list can contain.
abstract class ListItem {
  /// The title line to show in a list item.
  Widget buildTitle(BuildContext context);

  /// The subtitle line, if any, to show in a list item.
  Widget buildSubtitle(BuildContext context);
}

/// A ListItem that contains data to display a heading.
class HeadingItem implements ListItem {
  final String heading;

  HeadingItem(this.heading);

  @override
  Widget buildTitle(BuildContext context) {
    return Text(
      heading,
      style: Theme.of(context).textTheme.headlineSmall,
    );
  }

  @override
  Widget buildSubtitle(BuildContext context) => const SizedBox.shrink();
}

/// A ListItem that contains data to display a message.
class MessageItem implements ListItem {
  final String sender;
  final String body;

  MessageItem(this.sender, this.body);

  @override
  Widget buildTitle(BuildContext context) => Text(sender);

  @override
  Widget buildSubtitle(BuildContext context) => Text(body);
}
```

<noscript>
  <img src="/assets/images/docs/cookbook/mixed-list.png" alt="Mixed list demo" class="site-mobile-screenshot" />
</noscript>


[`ListView.builder()`]: {{site.api}}flutter/widgets/ListView/ListView.builder.html
