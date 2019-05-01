---
title: Creating a Grid List
title: 创建一个网格列表
prev:
  title: Create a horizontal list
  title: 创建一个水平滑动的列表
  path: /docs/cookbook/lists/horizontal-list
next:
  title: Creating lists with different types of items
  title: 创建拥有不同列表项的列表
  path: /docs/cookbook/lists/mixed-list
---

In some cases, you might want to display your items as a Grid rather than
a normal list of items that come one after the next. For this task, we'll employ
the [`GridView`]({{site.api}}/flutter/widgets/GridView-class.html) Widget.

有时候，你可能希望以网格形式展示内容，而不是以逐条展示内容的普通列表。对于本文的任务，
我们将采用 [`GridView`]({{site.api}}/flutter/widgets/GridView-class.html) Widget。

The simplest way to get started using grids is by using the
[`GridView.count`]({{site.api}}/flutter/widgets/GridView/GridView.count.html)
constructor, because it allow us to specify how many rows or columns we'd like.

开始使用网格最简单的方式，
就是通过使用 [`GridView.count`]({{site.api}}/flutter/widgets/GridView/GridView.count.html)构造方法，
因为它允许我们指定有多少行多少列。

In this example, we'll generate a List of 100 Widgets that display their
index in the list. This will help us visualize how `GridView`  works.

在例子中，我们将创建一个有 100 个 Widget 的 List 来展示他们的索引。
这将帮助我们想象 `GridView` 是如何工作的。

<!-- skip -->
```dart
GridView.count(
  // 创建一个两列的网格。如果你把 scrollDirection 改成了（Create a grid with 2 columns. If you change the scrollDirection to）
  // horizontal ，这将会变成两行。（horizontal, this would produce 2 rows.）
  crossAxisCount: 2,
  // 创建 100 个展示在 List 中索引的 Widget（Generate 100 Widgets that display their index in the List）
  children: List.generate(100, (index) {
    return Center(
      child: Text(
        'Item $index',
        style: Theme.of(context).textTheme.headline,
      ),
    );
  }),
);
```

## Complete example

## 完整示例

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final title = 'Grid List';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(
          title: Text(title),
        ),
        body: GridView.count(
          // 创建一个两列的网格。如果你把 scrollDirection 改成了（Create a grid with 2 columns. If you change the scrollDirection to）
          // horizontal ，这将会变成两行。（horizontal, this would produce 2 rows.）
          crossAxisCount: 2,
          // 创建 100 个展示在 List 中索引的 Widget（Generate 100 Widgets that display their index in the List）
          children: List.generate(100, (index) {
            return Center(
              child: Text(
                'Item $index',
                style: Theme.of(context).textTheme.headline,
              ),
            );
          }),
        ),
      ),
    );
  }
}
```
