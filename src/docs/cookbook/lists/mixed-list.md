---
title: Creating lists with different types of items
title: 创建拥有不同列表项的列表
prev:
  title: Creating a Grid List
  title: 创建一个网格列表
  path: /docs/cookbook/lists/grid-lists
next:
  title: Place a floating app bar above a list
  path: /docs/cookbook/lists/floating-app-bar
---

We often need to create lists that display different types of content. For
example, we might be working on a List that shows a heading followed by a few
items related to the heading, followed by another heading, and so on.

我们经常需要创建展示不同类型内容的列表。比方说，
我们可能在开发一个列表，它显示一个标题，后跟一些与
标题相关的项目，然后是另一个标题，依此类推。

How would we create such a structure with Flutter?

我们该如何用 Flutter 创建这样的结构呢？

## Directions

## 路线

  1. Create a data source with different types of items

     创建一个拥有不同类型项目的数据源

  2. Convert the data source into a List of Widgets

     把数据源转换成一个包含 Widget 的 List

## 1. Create a data source with different types of item

## 1. 创建一个具有不同类型项目的数据源

### Types of Items

### 项目的类型

In order to represent different types of items in a List, we'll need to define
a class for each type of item.

为了表示 List 中不同类型的项，我们需要为每一个类型的项目定义一个类。

In this example, we'll work on an app that shows a header followed by five
messages. Therefore, we'll create three classes: `ListItem`, `HeadingItem`,
and `MessageItem`.

在这个例子中，我们将制作一个展示了标题，后面有五条消息的应用。
因此，我们将创建三个类：`ListItem`、`HeadingItem` 和 `MessageItem`。

<!-- skip -->
```dart
// List 可以包含的不同类型项的基类（The base class for the different types of items the List can contain）
abstract class ListItem {}

// 包含展示标题数据的一种 ListItem（A ListItem that contains data to display a heading）
class HeadingItem implements ListItem {
  final String heading;

  HeadingItem(this.heading);
}

// 包含展示消息数据的一种 ListItem（A ListItem that contains data to display a message）
class MessageItem implements ListItem {
  final String sender;
  final String body;

  MessageItem(this.sender, this.body);
}
```

### Create a List of Items

### 创建项目的 List

Most of the time, we'd fetch data from the internet or a local database and
convert that data into a list of items.

大部分时候，我们从网络上或本地数据库获取数据，并将数据转换成一个项目列表。

For this example, we'll generate a list of items to work with. The list will
contain a header followed by five messages. Rinse, repeat.

对于这个例子来说，我们将生成一个要使用的项目列表。
这个列表将包含一个标题，后跟五条消息。如此往复。

<!-- skip -->
```dart
final items = List<ListItem>.generate(
  1200,
  (i) => i % 6 == 0
      ? HeadingItem("Heading $i")
      : MessageItem("Sender $i", "Message body $i"),
);
```

## 2. Convert the data source into a List of Widgets

## 2. 把数据源转换成 Widget 的 List

In order to handle converting each item into a Widget, we'll employ the
[`ListView.builder`]({{site.api}}/flutter/widgets/ListView/ListView.builder.html)
constructor.

为了把每一个项目转换成 Widget，
我们将采用 [`ListView.builder`]({{site.api}}/flutter/widgets/ListView/ListView.builder.html) 构造方法。

In general, we'll want to provide a `builder` function that checks for what type
of item we're dealing with, and returns the appropriate Widget for that type of
item.

通常，我们需要提供一个 `builder` 函数来检查我们正在处理的项目类型，
并返回该类型项目的相应 Widget。

In this example, using the `is` keyword to check the type of item we're dealing
with can be handy. It's fast, and will automatically cast each item to the
appropriate type. However, there are different ways to approach this problem if
you prefer another pattern!

在这个例子中，我们使用 `is` 关键字来检查我们正在处理的项目类型。
这样做速度很快，并会自动将每个项目转换为适当的类型。但是，如果您更喜欢其他模式，有不同的方法可以解决此问题！

<!-- skip -->
```dart
ListView.builder(
  // 让 ListView 知道有多少项目需要被构建（Let the ListView know how many items it needs to build）
  itemCount: items.length,
  // 提供一个 builder 方法。这正是魔力所在！（Provide a builder function. This is where the magic happens! We'll）
  // 我们将基于各个项目本身的类型，转化成 Widget。（convert each item into a Widget based on the type of item it is.）
  itemBuilder: (context, index) {
    final item = items[index];

    if (item is HeadingItem) {
      return ListTile(
        title: Text(
          item.heading,
          style: Theme.of(context).textTheme.headline,
        ),
      );
    } else if (item is MessageItem) {
      return ListTile(
        title: Text(item.sender),
        subtitle: Text(item.body),
      );
    }
  },
);
```

## Complete example

## 完整示例

```dart
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp(
    items: List<ListItem>.generate(
      1000,
      (i) => i % 6 == 0
          ? HeadingItem("Heading $i")
          : MessageItem("Sender $i", "Message body $i"),
    ),
  ));
}

class MyApp extends StatelessWidget {
  final List<ListItem> items;

  MyApp({Key key, @required this.items}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final title = 'Mixed List';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(
          title: Text(title),
        ),
        body: ListView.builder(
          // 让 ListView 知道有多少项目需要被构建（Let the ListView know how many items it needs to build）
          itemCount: items.length,
          // 提供一个 builder 方法。这正是魔力所在！（Provide a builder function. This is where the magic happens! We'll）
          // 我们将基于各个项目本身的类型，转化成 Widget。（convert each item into a Widget based on the type of item it is.）
          itemBuilder: (context, index) {
            final item = items[index];

            if (item is HeadingItem) {
              return ListTile(
                title: Text(
                  item.heading,
                  style: Theme.of(context).textTheme.headline,
                ),
              );
            } else if (item is MessageItem) {
              return ListTile(
                title: Text(item.sender),
                subtitle: Text(item.body),
              );
            }
          },
        ),
      ),
    );
  }
}

// List 能容纳的不同类型项目的基类（The base class for the different types of items the List can contain）
abstract class ListItem {}

// 一种包含展示标题数据的 ListItem（A ListItem that contains data to display a heading）
class HeadingItem implements ListItem {
  final String heading;

  HeadingItem(this.heading);
}

// 一种包含展示消息数据的 ListItem（A ListItem that contains data to display a message）
class MessageItem implements ListItem {
  final String sender;
  final String body;

  MessageItem(this.sender, this.body);
}
```

![Mixed List Demo](/images/cookbook/mixed-list.png){:.site-mobile-screenshot}
