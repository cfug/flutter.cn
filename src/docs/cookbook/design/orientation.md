---
title: Update the UI based on orientation
title: 根据屏幕方向更新界面
prev:
  title: Exporting fonts from a package
  title: 以 package 的方式使用字体
  path: /docs/cookbook/design/package-fonts
next:
  title: Use custom fonts
  title: 使用自定义字体
  path: /docs/cookbook/design/fonts
js:
  - defer: true
    url: https://dartpad.cn/inject_embed.dart.js
---

In some situations,
you want to update the display of an app when the user
rotates the screen from portrait mode to landscape mode. For example,
the app might show one item after the next in portrait mode,
yet put those same items side-by-side in landscape mode.

一般情况下，一旦一个应用的屏幕方向发生了改变，比如从横屏变成竖屏，其设计也将跟着更新。
例如，在纵向模式下，我们可能想要依次显示各个项目，但在横向模式下，我们会把这些相同的项目并排放置。

In Flutter, you can build different layouts depending
on a given [`Orientation`][].
In this example, build a list that displays two columns in
portrait mode and three columns in landscape mode using the
following steps:

在 Flutter 中，我们可以根据给定的 [`Orientation`][]
构建不同的布局。本示例中，我们将构建一个列表，
在纵向模式下显示两列，在横向模式下显示三列。

  1. Build a `GridView` with two columns.
     
     创建一个列的数量为 2 的 `GridView`；
     
  2. Use an `OrientationBuilder` to change the number of columns.
  
     使用 `OrientationBuilder` 更改列数。

## 1. Build a `GridView` with two columns

## 1. 创建一个列的数量为 2 的 `GridView`

First, create a list of items to work with.
Rather than using a normal list,
create a list that displays items in a grid.
For now, create a grid with two columns.

首先，我们需要一个项目的列表来配合完成。
我们需要使用一个在网格中显示项目的列表而非一个普通的列表。
现在，我们将创建一个包含两个列的网格。

<!-- skip -->
```dart
GridView.count(
  // A list with 2 columns
  crossAxisCount: 2,
  // ...
);
```

To learn more about working with `GridViews`,
see the [Creating a grid list][] recipe.

要了解有关使用 `GridViews` 的更多信息，
请参阅这个教程文档：[创建一个网格列表](/docs/cookbook/lists/grid-lists)。

## 2. Use an `OrientationBuilder` to change the number of columns

## 2. 使用 `OrientationBuilder` 更改列数。

To determine the app's current `Orientation`, use the
[`OrientationBuilder`][] widget.
The `OrientationBuilder` calculates the current `Orientation` by
comparing the width and height available to the parent widget,
and rebuilds when the size of the parent changes.

为了确定当前的屏幕方向 `Orientation`，我们可以使用 `OrientationBuilder` widget。
[`OrientationBuilder`][] 通过比较父 widget 的可用宽度和高度
来计算当前的 `Orientation`，
并在父窗口大小更改时重建。

Using the `Orientation`, build a list that displays two columns in portrait
mode, or three columns in landscape mode.

使用 `Orientation`，我们可以构建一个列表，
在纵向模式下显示两列，在横向模式下显示三列。

<!-- skip -->
```dart
OrientationBuilder(
  builder: (context, orientation) {
    return GridView.count(
      // Create a grid with 2 columns in portrait mode,
      // or 3 columns in landscape mode.
      crossAxisCount: orientation == Orientation.portrait ? 2 : 3,
    );
  },
);
```

{{site.alert.note}}

  If you're interested in the orientation of the screen,
  rather than the amount of space available to the parent,
  use `MediaQuery.of(context).orientation` instead of an
  `OrientationBuilder` widget.
  
  如果你只想知道屏幕的方向，可以直接使用 `MediaQuery.of(context).orientation`，
  而不是使用 `OrientationBuilder` widget.

{{site.alert.end}}

## Interactive example

## 交互式样例

```run-dartpad:theme-light:mode-flutter:run-true:width-100%:height-500px:split-60:ga_id-interactive_example
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final appTitle = 'Orientation Demo';

    return MaterialApp(
      title: appTitle,
      home: OrientationList(
        title: appTitle,
      ),
    );
  }
}

class OrientationList extends StatelessWidget {
  final String title;

  OrientationList({Key key, this.title}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(title)),
      body: OrientationBuilder(
        builder: (context, orientation) {
          return GridView.count(
            // Create a grid with 2 columns in portrait mode, or 3 columns in
            // landscape mode.
            crossAxisCount: orientation == Orientation.portrait ? 2 : 3,
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
        },
      ),
    );
  }
}
```

<noscript>
  <img src="/images/cookbook/orientation.gif" alt="Orientation Demo（屏幕方向适配样例）" class="site-mobile-screenshot" />
</noscript>


[Creating a grid list]: /docs/cookbook/lists/grid-lists
[`Orientation`]: {{site.api}}/flutter/widgets/Orientation-class.html
[`OrientationBuilder`]: {{site.api}}/flutter/widgets/OrientationBuilder-class.html
