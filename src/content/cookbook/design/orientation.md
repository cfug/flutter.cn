---
# title: Update the UI based on orientation
title: 根据屏幕方向更新界面
# description: Respond to a change in the screen's orientation.
description: 根据屏幕方向自适应界面。
tags: cookbook, 实用教程, 设计
keywords: 屏幕切换,横屏模式,竖屏模式,自适应
js:
  - defer: true
    url: /assets/js/inject_dartpad.js
---

<?code-excerpt path-base="cookbook/design/orientation"?>

In some situations,
you want to update the display of an app when the shape of the
available space changes like when a user rotates
the screen from portrait mode to landscape mode. For example,
the app might show one item after the next in portrait mode,
yet put those same items side-by-side in landscape mode.
Expanded docs covering this and more can be found
in the [adaptive ui documenation][].

在某些情况下，当应用的可用空间的形状发生了变化，
比如用户从横屏变成竖屏时，其设计也需要将跟着更新。
例如，在纵向模式下，我们可能想要依次显示各个项目，但在横向模式下，我们会把这些相同的项目并排放置。
[自适应 UI 文档][adaptive ui documenation] 中提供了更多相关扩展信息。

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

<?code-excerpt "lib/partials.dart (GridViewCount)"?>
```dart
return GridView.count(
  // A list with 2 columns
  crossAxisCount: 2,
  // ...
);
```

To learn more about working with `GridViews`,
see the [Creating a grid list][] recipe.

要了解有关使用 `GridViews` 的更多信息，
请参阅这个教程文档：[创建一个网格列表][Creating a grid list]。

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

<?code-excerpt "lib/partials.dart (OrientationBuilder)"?>
```dart
body: OrientationBuilder(
  builder: (context, orientation) {
    return GridView.count(
      // Create a grid with 2 columns in portrait mode,
      // or 3 columns in landscape mode.
      crossAxisCount: orientation == Orientation.portrait ? 2 : 3,
    );
  },
),
```

:::note

If you're interested in the orientation of the screen,
rather than the amount of space available to the parent,
use `MediaQuery.orientationOf(context)` instead of an
`OrientationBuilder` widget.

如果你只想知道屏幕的方向，可以直接使用 `MediaQuery.orientationOf(context)`，
而不是使用 `OrientationBuilder` widget.

Using `MediaQuery.orientationOf` as a way to orignize ui
is [discouraged][]. Instead use `MediaQuery.sizeOf(context)`

[不鼓励][discouraged] 使用 `MediaQuery.orientationOf` 来调整用户界面。
请使用 `MediaQuery.sizeOf(context)`。

:::

## Interactive example

## 交互式样例

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter app orientation hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const appTitle = 'Orientation Demo';

    return const MaterialApp(
      title: appTitle,
      home: OrientationList(title: appTitle),
    );
  }
}

class OrientationList extends StatelessWidget {
  final String title;

  const OrientationList({super.key, required this.title});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(title)),
      body: OrientationBuilder(
        builder: (context, orientation) {
          return GridView.count(
            // Create a grid with 2 columns in portrait mode, or
            // 3 columns in landscape mode.
            crossAxisCount: orientation == Orientation.portrait ? 2 : 3,
            // Generate 100 widgets that display their index in the list.
            children: List.generate(100, (index) {
              return Center(
                child: Text(
                  'Item $index',
                  style: TextTheme.of(context).displayLarge,
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
  <img src="/assets/images/docs/cookbook/orientation.webp" alt="屏幕方向适配样例" class="site-mobile-screenshot" />
</noscript>

## Locking device orientation

In the previous section, you learned 
how to adapt the app UI to device orientation changes.

Flutter also allows you to specify the orientations your app supports 
using the values of [`DeviceOrientation`]. You can either:

- Lock the app to a single orientation, like only the `portraitUp` position, or...
- Allow multiple orientations, like both `portraitUp` and `portraitDown`, but not landscape.

In the application `main()` method,
call [`SystemChrome.setPreferredOrientations()`]
with the list of preferred orientations that your app supports.

To lock the device to a single orientation, 
you can pass a list with a single item.

For a list of all the possible values, check out [`DeviceOrientation`].

<?code-excerpt "lib/orientation.dart (PreferredOrientations)"?>
```dart
void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
  runApp(const MyApp());
}
```


[Creating a grid list]: /cookbook/lists/grid-lists
[`DeviceOrientation`]: {{site.api}}/flutter/services/DeviceOrientation.html
[`OrientationBuilder`]: {{site.api}}/flutter/widgets/OrientationBuilder-class.html
[`Orientation`]: {{site.api}}/flutter/widgets/Orientation.html
[`SystemChrome.setPreferredOrientations()`]: {{site.api}}/flutter/services/SystemChrome/setPreferredOrientations.html
[adaptive ui documenation]: {{site.api}}/ui/adaptive-responsive
[discouraged]: {{site.api}}/ui/adaptive-responsive/best-practices
