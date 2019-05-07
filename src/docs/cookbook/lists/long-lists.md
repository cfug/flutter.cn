---
title: Working with long lists
title: 长列表的处理
prev:
  title: Place a floating app bar above a list
  path: /docs/cookbook/lists/floating-app-bar
next:
  title: Report errors to a service
  title: 把报错信息通过服务上传
  path: /docs/cookbook/maintenance/error-reporting
---

The standard [`ListView`]({{site.api}}/flutter/widgets/ListView-class.html)
constructor works well for small lists. In order to work with lists that contain
a large number of items, it's best to use the
[`ListView.builder`]({{site.api}}/flutter/widgets/ListView/ListView.builder.html)
constructor.

标准的 [`ListView`]({{site.api}}/flutter/widgets/ListView-class.html) 构造函数适用于短列表，对于具有大量列表项的长列表，需要用 [`ListView.builder`]({{site.api}}/flutter/widgets/ListView/ListView.builder.html) 构造函数来创建。

Whereas the default `ListView` constructor requires us to create all items at
once, the `ListView.builder` constructor will create items as they are scrolled
onto the screen.

与标准的 `ListView` 构造函数需要一次性创建所有列表项不同的是，`ListView.builder` 构造函数只在列表项从屏幕外滑入屏幕时才去创建列表项。

## 1. Create a data source

## 1. 创建数据源

First, we'll need a data source to work with. For example, your data source
might be a list of messages, search results, or products in a store. Most of
the time, this data will come from the internet or a database.

首先，需要获取列表的数据源。例如，数据源可以是消息集、搜索结果集或者商店商品集。大部分情况下，这些数据来自于网络请求或者数据库获取。

For this example, we'll generate a list of 10000 Strings using the
[`List.generate`]({{site.api}}/flutter/dart-core/List/List.generate.html)
constructor.

在下面的例子，使用 [`List.generate`]({{site.api}}/flutter/dart-core/List/List.generate.html) 构造函数生成包含 10000 个字符串的集合。

<!-- skip -->
```dart
final items = List<String>.generate(10000, (i) => "Item $i");
```

## 2. Convert the data source into Widgets

## 2. 将数据源渲染成组件

In order to display our List of Strings, we'll need to render each String as
a Widget!

为了将字符串集合展示出来，需要把集合中的每个字符串都渲染成组件。

This is where the `ListView.builder` will come into play. In our case, we'll
display each String on its own line.

这个渲染过程正是 `ListView.builder` 的作用所在。在下面的例子中，将会把每个字符串用单行列表项显示在列表中。

<!-- skip -->
```dart
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) {
    return ListTile(
      title: Text('${items[index]}'),
    );
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
    items: List<String>.generate(10000, (i) => "Item $i"),
  ));
}

class MyApp extends StatelessWidget {
  final List<String> items;

  MyApp({Key key, @required this.items}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final title = 'Long List';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(
          title: Text(title),
        ),
        body: ListView.builder(
          itemCount: items.length,
          itemBuilder: (context, index) {
            return ListTile(
              title: Text('${items[index]}'),
            );
          },
        ),
      ),
    );
  }
}
```

![Long Lists Demo](/images/cookbook/long-lists.gif){:.site-mobile-screenshot}

![长列表处理演示](/images/cookbook/long-lists.gif){:.site-mobile-screenshot}
