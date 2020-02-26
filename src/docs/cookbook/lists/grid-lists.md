---
title: Create a grid list
title: 创建一个网格列表
prev:
  title: Create a horizontal list
  title: 创建一个水平滑动的列表
  path: /docs/cookbook/lists/horizontal-list
next:
  title: Create lists with different types of items
  title: 创建拥有不同列表项的列表
  path: /docs/cookbook/lists/mixed-list
js:
  - defer: true
    url: https://dartpad.cn/inject_embed.dart.js
---

In some cases, you might want to display your items as a grid rather than
a normal list of items that come one after the next.
For this task, use the [`GridView`][] widget.

有时候，你可能希望用网格来展示内容，而不是一条接着一条的普通列表来展示。
在本文当中，我们将采用 [`GridView`][] widget。

The simplest way to get started using grids is by using the
[`GridView.count()`][] constructor,
because it allows you to specify how many rows or columns you'd like.

用网格展示数据最简单的方式，
就是通过使用 [`GridView.count()`][] 构造方法，
因为它允许我们指定有多少行多少列。

To visualize how `GridView` works, 
generate a list of 100 widgets that display their index in the list.

为了帮助我们想象 `GridView` 是如何工作的，
在这个例子中，我们将创建一个包含有 100 个 widget 的 List，
每个 Widget 将展示它在 List 中的索引。

<!-- skip -->
```dart
GridView.count(
  // Create a grid with 2 columns. If you change the scrollDirection to
  // horizontal, this produces 2 rows.
  crossAxisCount: 2,
  // Generate 100 widgets that display their index in the List.
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

## Interactive example

## 交互式样例

```run-dartpad:theme-light:mode-flutter:run-true:width-100%:height-600px:split-60:ga_id-interactive_example
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
          // Create a grid with 2 columns. If you change the scrollDirection to
          // horizontal, this produces 2 rows.
          crossAxisCount: 2,
          // Generate 100 widgets that display their index in the List.
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

<noscript>
  <img src="/images/cookbook/grid-list.gif" alt="Grid List Demo" class="site-mobile-screenshot" />
</noscript>

[`GridView`]: {{site.api}}/flutter/widgets/GridView-class.html
[`GridView.count()`]: {{site.api}}/flutter/widgets/GridView/GridView.count.html
