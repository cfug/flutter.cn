---
title: Place a floating app bar above a list
title: 在列表顶部放置一个浮动的 app bar
prev:
  title: Creating lists with different types of items
  title: 创建拥有不同列表项的列表
  path: /docs/cookbook/lists/mixed-list
next:
  title: Working with long lists
  title: 长列表的处理
  path: /docs/cookbook/lists/long-lists
---

To make it easier for users to view a list of items, you may want to hide the
app bar as the user scrolls down the list. This is especially true if your app
displays a "tall" app bar that occupies a lot of vertical space.

为了方便用户查看列表，你可能希望在用户向下滚动列表时隐藏 app bar，尤其在你的 app bar 特别高，导致它占据了很多竖向空间的时候。

Traditionally, you create an app bar by providing an `appBar` property to the
`Scaffold` Widget. This creates a fixed app bar that always remains above
the `body` of the `Scaffold`.

一般情况下，你可以通过给 `Scaffold` 组件设置一个 `appBar` 属性来创建一个 app bar。这个 app bar 会始终固定在 `Scaffold` 组件的 `body` 上方。

Moving the app bar from a `Scaffold` Widget into a
[`CustomScrollView`]({{site.api}}/flutter/widgets/CustomScrollView-class.html)
allows you to create an app bar that scrolls offscreen as you scroll through a
list of items contained inside the `CustomScrollView`.

把 app bar 从 `Scaffold` 组件挪到一个 [`CustomScrollView`]({{site.api}}/flutter/widgets/CustomScrollView-class.html) 里，可以让你创建一个随着你滑动 `CustomScrollView` 里列表的同时在屏幕外自动随之滚动的 app bar。

This recipe demonstrates how to use a `CustomScrollView` to display a list of 
items with an app bar on top that scrolls offscreen as the user scrolls down the
list.

下面这篇教程将介绍如何通过 `CustomScrollView` 来生成一个带有随着用户滑动列表同时会在屏幕外随之滚动的 app bar 的列表。

### Directions

### 步骤

  1. Create a `CustomScrollView`

     创建一个 `CustomScrollView`

  2. Use `SliverAppBar` to add a floating app bar

     通过 `SliverAppBar` 来添加一个浮动的 app bar

  3. Add a list of items using a `SliverList`

     通过 `SliverList` 来添加列表

## 1. Create a `CustomScrollView`

## 1. 创建一个 `CustomScrollView`

In order to create a floating app bar, you need to place the app bar inside a
`CustomScrollView` that also contains the list of items. This synchronizes the
scroll position of the app bar and the list of items. You may think of the
`CustomScrollView` Widget as a `ListView` that allows you to mix and match
different types of scrollable lists and widgets together!

要创建一个浮动的 app bar，你需要将 app bar 放在一个包含列表的 `CustomScrollView` 里，这会同步 app bar 和列表的滚动位置。你可以把 `CustomScrollView` 组件当成一个可以让你把不同类型的可滚动列表和组件混合匹配在一起的 `ListView`！

The scrollable lists and widgets that can be provided to the the
`CustomScrollView` are known as slivers. There are several types of Slivers,
such as a `SliverList`, `SliverGridList`, and `SliverAppBar`! In fact, the
`ListView` and `GridView` Widgets use the `SliverList` and `SliverGrid` widgets
under the hood!

可以放在 `CustomScrollView` 里的可滚动列表和组件我们称之为 slivers。有几种类型的 slivers，比如 `SliverList`、`SliverGridList` 和 `SliverAppBar`！实际上，`ListView` 和 `GridView` 组件底层使用的就是 `SliverList` 和 `SliverGrid`！

For this example, create a `CustomScrollView` that contains a 
`SliverAppBar` and a `SliverList`. In addition, you need to remove any app bars
you may be providing to the `Scaffold` Widget!

以下例子演示了创建一个包含 `SliverAppBar` 和 `SliverList` 的 `CustomScrollView`。另外你需要删除你之前可能设置在 `Scaffold` 组件上的 app bar！

<!-- skip -->
```dart
Scaffold(
  // 不需要设置 appBar 属性，只需要 body!（No appBar property provided, only the body!）
  body: CustomScrollView(
    // 下一步我们将在列表里把 app bar 作为一个 slivers 添加进去（Add the app bar and list of items as slivers in the next steps）
    slivers: <Widget>[]
  ),
);
```

### 2. Use `SliverAppBar` to add a floating app bar

### 2. 使用 `SliverAppBar` 来添加一个浮动的 app bar

Next, add an app bar to the
[`CustomScrollView`]({{site.api}}/flutter/widgets/CustomScrollView-class.html).
Flutter provides the
[`SliverAppBar`]({{site.api}}/flutter/material/SliverAppBar-class.html)
Widget out of the box.  Much like the normal `AppBar` widget, you can use the
`SliverAppBar` to display a title, tabs, images and more.

接下来为 [`CustomScrollView`]({{site.api}}/flutter/widgets/CustomScrollView-class.html) 添加一个 app bar。Flutter 提供开箱即用的 [`SliverAppBar`]({{site.api}}/flutter/material/SliverAppBar-class.html) 组件，与普通的 `AppBar` 组件非常相似，你可以使用 `SliverAppBar` 来显示标题、标签、图像等内容。

However, the `SliverAppBar` also gives you the ability to create a "floating"
app bar that scrolls offscreen as the user scrolls down the list. Furthermore,
you can configure the `SliverAppBar` to shrink and expand as the user scrolls.

同时，`SliverAppBar` 组件也提供一种创建 “浮动” app bar 的能力，当用户向下滚动列表时，app bar 会随之在屏幕外滚动。此外，你可以配置 `SliverAppBar` 在用户滚动时缩小或展开。

To achieve this effect:

要达到这个效果：

  1. Start with an app bar that displays only a title 

     先创建一个只显示标题的 app bar
    
  2. Set the `floating` property to `true`. This allows users to quickly reveal
  the app bar when they being scrolling up the list.
     
     将 `floating` 属性设为 `true`。这使用户在向上滚动列表时能快速显示 app bar。

  3. Add a `flexibleSpace` widget that will fill the available `expandedHeight`.

     添加一个 `flexibleSpace` 组件，这个组件将填充可用的 `expandedHeight`。

<!-- skip -->
```dart
CustomScrollView(
  slivers: <Widget>[
    SliverAppBar(
      title: Text('Floating app bar'),
      // 允许用户在开始向上滚动列表时显示 app bar（Allows the user to reveal the app bar if they begin scrolling back up the list of items）
      floating: true,
      // 用一个占位组件来显示收缩的范围（Display a placeholder Widget to visualize the shrinking size）
      flexibleSpace: Placeholder(),
      // 使 SliverAppBar 的初始高度大于正常高度（Make the initial height of the SliverAppBar larger than normal）
      expandedHeight: 200,
    ),
  ],
);
```

{{site.alert.tip}}
Play around with the [various properties you can pass to the `SliverAppBar`
Widget]({{site.api}}/flutter/material/SliverAppBar/SliverAppBar.html)
and use hot reload to see the results. For example, you can use an `Image`
Widget for the `flexibleSpace` property to create a background image that
shrinks in size as it's scrolled offscreen.

试试 [`SliverAppBar` 支持的各种属性]({{site.api}}/flutter/material/SliverAppBar/SliverAppBar.html)，并使用热重载来查看结果。例如，你可以给 `flexibleSpace` 提供一个 `Image` 组件来创建一个背景图像，当它在屏幕外滚动时会缩小尺寸。
{{site.alert.end}}


### 3. Add a list of items using a `SliverList`

### 3. 使用 `SliverList` 来添加一个列表

Now that you have the app bar in place, add a list of items to the
`CustomScrollView`. You have two options: a
[`SliverList`]({{site.api}}/flutter/widgets/SliverList-class.html) or
a [`SliverGrid`]({{site.api}}/flutter/widgets/SliverGrid-class.html).
If you need to display a list of items one after the other, use the `SliverList`
Widget. If you need to display a grid list, use the `SliverGrid` Widget.

现在你已经创建好一个 app bar，接下来应该给 `CustomScrollView` 添加一个列表。你有两种选择：用 [`SliverList`]({{site.api}}/flutter/widgets/SliverList-class.html) 或用 [`SliverGrid`]({{site.api}}/flutter/widgets/SliverGrid-class.html)。如果你需要一个一个往下排地显示列表中的内容，应该用 `SliverList` 组件。如果需要网格状地显示列表中的内容，应该用 `SliverGrid` 组件。

The `SliverList` and `SliverGrid` Widgets take one required parameter: a
[`SliverChildDelegate`]({{site.api}}/flutter/widgets/SliverChildDelegate-class.html).
While this sounds fancy, the delegate is simply used to provide a list Widgets
to `SliverList` or `SliverGrid`. For example, the
[`SliverChildBuilderDelegate`]({{site.api}}/flutter/widgets/SliverChildBuilderDelegate-class.html)
allows you to create a list of items that are built lazily as you scroll, just
like the the `ListView.builder` Widget.

`SliverList` 和 `SliverGrid` 组件都需要一个必要参数：[`SliverChildDelegate`]({{site.api}}/flutter/widgets/SliverChildDelegate-class.html)。虽然听起来很花哨，但它只是用来给列表组件 `SliverList` 或 `SliverGrid` 提供一个代理。例如，[`SliverChildBuilderDelegate`]({{site.api}}/flutter/widgets/SliverChildBuilderDelegate-class.html) 允许你创建一组可以在滚动时懒加载的列表项，就和 `ListView.builder` 组件差不多。

<!-- skip -->
```dart
// Create a SliverList
// 创建一个 SliverList
SliverList(
  // 用代理在列表滚动的时候加载列表项（That uses a delegate to build items as they're scrolled on screen. ）
  delegate: SliverChildBuilderDelegate(
    // 构造函数返回一个展示当前列表项序号的 ListTile（The builder function returns a ListTile with a title that displays the index of the current item）
    (context, index) => ListTile(title: Text('Item #$index')),
    // 展示 1000 个列表项（Builds 1000 ListTiles）
    childCount: 1000,
  ),
)
```

## Complete example

## 完整示例

```dart
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  MyApp({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final title = 'Floating App Bar';

    return MaterialApp(
      title: title,
      home: Scaffold(
        // No appbar provided to the Scaffold, only a body with a
        // CustomScrollView
        body: CustomScrollView(
          slivers: <Widget>[
            // Add the app bar to the CustomScrollView
            SliverAppBar(
              // Provide a standard title
              title: Text(title),
              // Allows the user to reveal the app bar if they begin scrolling
              // back up the list of items
              floating: true,
              // Display a placeholder Widget to visualize the shrinking size
              flexibleSpace: Placeholder(),
              // Make the initial height of the SliverAppBar larger than normal
              expandedHeight: 200,
            ),
            // Next, create a SliverList
            SliverList(
              // Use a delegate to build items as they're scrolled on screen.
              delegate: SliverChildBuilderDelegate(
                // The builder function returns a ListTile with a title that
                // displays the index of the current item
                (context, index) => ListTile(title: Text('Item #$index')),
                // Builds 1000 ListTiles
                childCount: 1000,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

![Basic List Demo](/images/cookbook/floating-app-bar.gif){:.site-mobile-screenshot}
