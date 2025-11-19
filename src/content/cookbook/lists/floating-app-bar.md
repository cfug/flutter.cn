---
# title: Place a floating app bar above a list
title: 在列表顶部放置一个浮动的 app bar
# description: How to place a floating app bar or navigation bar above a list.
description: 如何在列表顶部放置一个浮动的 app bar 或导航栏。
tags: cookbook, 实用教程, 列表相关
keywords: 列表定制,顶部,搜索框,固定,隐藏搜索框
---

<?code-excerpt path-base="cookbook/lists/floating_app_bar/"?>

This guide describes how to place a floating app bar or
navigation bar above a list in a Flutter app.

本指南将介绍如何在 Flutter 应用的
列表顶部放置浮动 app bar 或导航栏。

## Overview

## 概览

To make it easier for users to view a list of items,
you might want to minimize the app bar (navigation bar), as
the user scrolls down the list.

为了方便用户查看列表，
你可能希望在用户向下滚动列表时最小化 app bar（导航栏）。

Moving the app bar into a [`CustomScrollView`][] allows you
to create an app bar that can be minimized or scroll
offscreen as you scroll through a list of items contained
inside the `CustomScrollView`.

将 app bar 放入 [`CustomScrollView`][] 中，
就可以创建一个随着滚动 `CustomScrollView` 中的列表项，
同时会最小化或在屏幕外滚动的 app bar。

This recipe demonstrates how to use a `CustomScrollView` to
display a list of items with an app bar on top that
minimizes as the user scrolls down the list using the
following steps:

下面这篇教程将介绍如何通过 `CustomScrollView` 
来生成一个带有随着用户滑动列表同时会最小化的 app bar 的列表。

  1. Create a `CustomScrollView`.

     创建一个 `CustomScrollView`

  2. Add a floating app bar to `CustomScrollView`.

     在 `CustomScrollView` 中添加一个浮动的 app bar。

  3. Add a list of items to `CustomScrollView`.

     在 `CustomScrollView` 中添加列表项。

## 1. Create a `CustomScrollView`

## 1. 创建一个 `CustomScrollView`

To create a floating app bar, place the app bar inside a
`CustomScrollView` that also contains the list of items.
This synchronizes the scroll position of the app bar and the
list of items. You might think of the `CustomScrollView`
widget as a `ListView` that allows you to mix and match
different types of scrollable lists and widgets together.

要创建一个浮动的 app bar，你需要将 app bar 
放在一个包含列表的 `CustomScrollView` 里，
这会同步 app bar 和列表的滚动位置。
你可以把 `CustomScrollView` widget 当成一个
可以让你把不同类型的可滚动列表和 widget 混合匹配在一起的 `ListView`。

The scrollable lists and widgets provided to the
`CustomScrollView` are known as _slivers_. There are several
types of slivers, such as `SliverList`, `SliverGrid`, and
`SliverAppBar`. In fact, the `ListView` and `GridView`
widgets use the `SliverList` and `SliverGrid` widgets to
implement scrolling.

可以放在 `CustomScrollView` 里的可滚动列表和 widget
我们称之为 **slivers**。有几种类型的 sliver，
比如 `SliverList`、`SliverGrid` 和 `SliverAppBar`。
实际上，`ListView` 和 `GridView` widget 底层
使用的就是 `SliverList` 和 `SliverGrid`。

For this example, create a `CustomScrollView` that contains
a `SliverList`. Also, remove the app bar property from your
code if it exists.

以下例子演示了创建一个包含 `SliverList` 的 `CustomScrollView`。
此外，如果存在 app bar 属性，请将其从代码中删除。

<Tabs key="device-type-tabs">

<Tab name="Material widget">

<?code-excerpt "lib/starter_material.dart (CustomScrollView)" replace="/^return const //g"?>
```dart
MaterialApp(
  title: 'Floating App Bar',
  home: Scaffold(
    // No app bar property provided yet.
    body: CustomScrollView(
      // Add the app bar and list of items as slivers in the next steps.
      slivers: <Widget>[],
    ),
  ),
);
```

</Tab>

<Tab name="Cupertino widget">

<?code-excerpt "lib/starter_cupertino.dart (CustomScrollView)" replace="/^return const //g"?>
```dart
CupertinoApp(
  title: 'Floating Navigation Bar',
  home: CupertinoPageScaffold(
    // No navigation bar property provided yet.
    child: CustomScrollView(
      // Add the navigation bar and list of items as slivers in the next steps.
      slivers: <Widget>[],
    ),
  ),
);
```

</Tab>

</Tabs>


## 2. Add a floating app bar

## 2. 添加一个浮动的 app bar

Next, add an app bar to the [`CustomScrollView`][].

接下来，在 [`CustomScrollView`][] 中添加一个 app bar。

<Tabs key="device-type-tabs">

<Tab name="Material widget">

Flutter provides the [`SliverAppBar`][] widget which,
much like the normal `AppBar` widget,
uses the `SliverAppBar` to display a title,
tabs, images and more.

Flutter 提供开箱即用的 [`SliverAppBar`][] widget，
与普通的 `AppBar` widget 非常相似，
你可以使用 `SliverAppBar` 来显示标题、标签、图像等内容。

However, the `SliverAppBar` also gives you the ability to
create a "floating" app bar that shrinks and floats when
you're not at the top of the page.

同时，`SliverAppBar` widget 也提供一种创建 “浮动” app bar 的能力，
当你向下滚动列表离开顶部时，app bar 会随之缩小并浮动。

To create this effect:

要达到这个效果：

  1. Start with an app bar that displays only a title.

     先创建一个只显示标题的 app bar。

  2. Set the `pinned` property to `true`.

     然后设置 `pinned` 属性为 `true`。

  3. Add a `flexibleSpace` widget that fills the available
     `expandedHeight`.

     最后添加一个 `flexibleSpace` widget，
     该 widget 将填充可用的 `expandedHeight` 高度。

<?code-excerpt "lib/step2_material.dart (SliverAppBar)" replace="/^body: //g;/^\),$/)/g"?>
```dart
slivers: [
  // Add the app bar to the CustomScrollView.
  SliverAppBar(
    // Provide a standard title.
    title: Text('Floating App Bar'),
    // Pin the app bar when scrolling.
    pinned: true,
    // Display a placeholder widget to visualize the shrinking size.
    flexibleSpace: Placeholder(),
    // Make the initial height of the SliverAppBar larger than normal.
    expandedHeight: 200,
  ),
],
```

:::tip

Play around with the
[various properties you can pass to the `SliverAppBar` widget][],
and use hot reload to see the results. For example, use an
`Image` widget for the `flexibleSpace` property to create a
background image that shrinks in size as it's scrolled offscreen.

试试 [`SliverAppBar` 支持的各种属性][various properties you can pass to the `SliverAppBar` widget]，
并使用热重载来查看结果。例如，你可以给 `flexibleSpace`
提供一个 `Image` widget 来创建一个背景图像，当它在屏幕外滚动时会缩小尺寸。

:::

</Tab>

<Tab name="Cupertino widget">

Flutter provides the [`CupertinoSliverNavigationBar`][]
widget, which lets you have a "floating" navigation
bar that shrinks when you scroll down and floats when
you're not at the top of the page.

Flutter 还提供了 [`CupertinoSliverNavigationBar`][] widget，
可以让你拥有一个 “浮动” 导航栏，当你向下滚动时，导航栏会缩小，
而当你不在页面顶部时，导航栏会浮动。

To create this effect:

要达到这个效果：

  1. Add `CupertinoSliverNavigationBar` to
     `CustomScrollView`.

     在 `CustomScrollView` 中添加 `CupertinoSliverNavigationBar`。

  2. Start with an app bar that displays only a title.

     创建一个只显示标题的 app bar。

<?code-excerpt "lib/step2_cupertino.dart (SliverAppBar)" replace="/^body: //g;/^\),$/)/g"?>
```dart
slivers: [
  // Add the navigation bar to the CustomScrollView.
  CupertinoSliverNavigationBar(
    // Provide a standard title.
    largeTitle: Text('Floating App Bar'),
  ),
],
```

</Tab>

</Tabs>


## 3. Add a list of items

## 3. 添加一个列表

Now that you have the app bar in place, add a list of items
to the `CustomScrollView`. You have two options: a
[`SliverList`][] or a [`SliverGrid`][].  If you need to
display a list of items one after the other, use the
`SliverList` widget. If you need to display a grid list, use
the `SliverGrid` widget.

现在你已经创建好一个 app bar，接下来应该给 `CustomScrollView` 添加一个列表。
你有两种选择：[`SliverList`][] 或者 [`SliverGrid`][]。
如果你需要一项接着一项地显示列表中的内容，那就应该用 `SliverList` widget。
如果你需要网格状地显示列表中的内容，那就应该用 `SliverGrid` widget。

<Tabs key="device-type-tabs">

<Tab name="Material widget">

<?code-excerpt "lib/main_material.dart (SliverList)" replace="/^\),$/)/g"?>
```dart
// Next, create a SliverList
SliverList.builder(
  // The builder function returns a ListTile with a title that
  // displays the index of the current item.
  itemBuilder: (context, index) =>
      ListTile(title: Text('Item #$index')),
  // Builds 50 ListTiles
  itemCount: 50,
)
```

</Tab>

<Tab name="Cupertino widget">

<?code-excerpt "lib/main_cupertino.dart (SliverList)" replace="/^\),$/)/g"?>
```dart
// Next, create a SliverList
SliverList.builder(
  // The builder function returns a CupertinoListTile with a title
  // that displays the index of the current item.
  itemBuilder: (context, index) =>
      CupertinoListTile(title: Text('Item #$index')),
  // Builds 50 CupertinoListTile
  itemCount: 50,
)
```

</Tab>

</Tabs>

## Interactive example

## 交互式样例

<Tabs key="device-type-tabs">

<Tab name="Material widget">

<?code-excerpt "lib/main_material.dart"?>
```dartpad title="Flutter floating app bar hands-on example in DartPad" run="false"
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const title = 'Floating App Bar';

    return MaterialApp(
      title: title,
      home: Scaffold(
        // No app bar provided to Scaffold, only a body with a
        // CustomScrollView.
        body: CustomScrollView(
          slivers: [
            // Add the app bar to the CustomScrollView.
            const SliverAppBar(
              // Provide a standard title.
              title: Text(title),
              // Pin the app bar when scrolling
              pinned: true,
              // Display a placeholder widget to visualize the shrinking size.
              flexibleSpace: Placeholder(),
              // Make the initial height of the SliverAppBar larger than normal.
              expandedHeight: 200,
            ),
            // Next, create a SliverList
            SliverList.builder(
              // The builder function returns a ListTile with a title that
              // displays the index of the current item.
              itemBuilder: (context, index) =>
                  ListTile(title: Text('Item #$index')),
              // Builds 50 ListTiles
              itemCount: 50,
            ),
          ],
        ),
      ),
    );
  }
}
```

<noscript>
  <img src="/assets/images/docs/cookbook/floating-app-bar.webp" alt="Use floating app bar demo" class="site-mobile-screenshot"/>
</noscript>

</Tab>

<Tab name="Cupertino widget">

<?code-excerpt "lib/main_cupertino.dart"?>
```dartpad title="Flutter floating navigation bar hands-on example in DartPad" run="false"
import 'package:flutter/cupertino.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const title = 'Floating Navigation Bar';

    return CupertinoApp(
      title: title,
      home: CupertinoPageScaffold(
        // No navigation bar provided to CupertinoPageScaffold,
        // only a body with a CustomScrollView.
        child: CustomScrollView(
          slivers: [
            // Add the navigation bar to the CustomScrollView.
            const CupertinoSliverNavigationBar(
              // Provide a standard title.
              largeTitle: Text(title),
            ),
            // Next, create a SliverList
            SliverList.builder(
              // The builder function returns a CupertinoListTile with a title
              // that displays the index of the current item.
              itemBuilder: (context, index) =>
                  CupertinoListTile(title: Text('Item #$index')),
              // Builds 50 CupertinoListTile
              itemCount: 50,
            ),
          ],
        ),
      ),
    );
  }
}
```

<noscript>
  <img src="/assets/images/docs/cookbook/floating-app-bar.webp" alt="Use floating nav bar demo" class="site-mobile-screenshot"/>
</noscript>

</Tab>

</Tabs>

[`CupertinoSliverNavigationBar`]: {{site.api}}/flutter/cupertino/CupertinoSliverNavigationBar-class.html
[`CustomScrollView`]: {{site.api}}/flutter/widgets/CustomScrollView-class.html
[`SliverAppBar`]: {{site.api}}/flutter/material/SliverAppBar-class.html
[`SliverChildBuilderDelegate`]: {{site.api}}/flutter/widgets/SliverChildBuilderDelegate-class.html
[`SliverChildDelegate`]: {{site.api}}/flutter/widgets/SliverChildDelegate-class.html
[`SliverGrid`]: {{site.api}}/flutter/widgets/SliverGrid-class.html
[`SliverList`]: {{site.api}}/flutter/widgets/SliverList-class.html
[various properties you can pass to the `SliverAppBar` widget]: {{site.api}}/flutter/material/SliverAppBar/SliverAppBar.html
