---
title: Working with Tabs
title: 使用 Tabs
prev:
  title: Using custom fonts
  title: 使用自定义字体
  path: /docs/cookbook/design/fonts
next:
  title: Building a form with validation
  title: 构建一个有验证判断的表单
  path: /docs/cookbook/forms/validation
---

Working with tabs is a common pattern in apps following the Material Design
guidelines. Flutter includes a convenient way to create tab layouts as part of
the [material library]({{site.api}}/flutter/material/material-library.html).

在应用中使用Tab进行导航是一种常见的Material Design风格。Flutter在其Material风格组件库中提供了一种非常便捷的方式来创建Tab布局。

## Directions

    1. Create a `TabController`
    2. Create the tabs
    3. Create content for each tab

## 构建步骤

1. 创建`TabController`
2. 创建tab标签
3. 为每个tab标签创建内容

## 1. Create a `TabController`

In order for tabs to work, we'll need to keep the selected tab and content
sections in sync. This is the job of the
[`TabController`]({{site.api}}/flutter/material/TabController-class.html).

We can either manually create a `TabController` or use the
[`DefaultTabController`]({{site.api}}/flutter/material/DefaultTabController-class.html)
Widget. Using the `DefaultTabController` is the simplest option, since it will
create a `TabController` for us and make it available to all descendant Widgets.

<!-- skip -->

## 1. 创建`TabController`

为了使tab标签工作, 我们必须保证我们所选的tab和它的内容是同步变化的。所以这里我们需要使用[`TabController`]({{site.api}}/flutter/material/TabController-class.html).

我们可以手动创建一个 `TabController` 或者使用
[`DefaultTabController`]({{site.api}}/flutter/material/DefaultTabController-class.html) Widget。最简单选择是使用 `DefaultTabController` Widget ，因为它会帮我们创建出一个可以供所有后代Widgets使用的`TabController` 。

<!-- skip -->

```dart
DefaultTabController(
  // The number of tabs / content sections we need to display
  length: 3,
  child: // See the next step!
);
```

## 2. Create the tabs

Now that we have a `TabController` to work with, we can create our tabs using
the [`TabBar`]({{site.api}}/flutter/material/TabController-class.html)
Widget. In this example, we'll create a `TabBar` with 3
[`Tab`]({{site.api}}/flutter/material/Tab-class.html)
Widgets and place it within an
[`AppBar`]({{site.api}}/flutter/material/AppBar-class.html).

<!-- skip -->

## 2. 创建tab标签

现在我们已经成功创建了 `TabController` ， 接下来我们可以用 [`TabBar`]({{site.api}}/flutter/material/TabController-class.html)Widget来创建tab标签。
 在这个示例里，我们将会创建一个包含三个 [`Tab`]({{site.api}}/flutter/material/Tab-class.html)Widget的`TabBar`。
 并把它放在[`AppBar`]({{site.api}}/flutter/material/AppBar-class.html) Widget里面。

<!-- skip -->

```dart
DefaultTabController(
  length: 3,
  child: Scaffold(
    appBar: AppBar(
      bottom: TabBar(
        tabs: [
          Tab(icon: Icon(Icons.directions_car)),
          Tab(icon: Icon(Icons.directions_transit)),
          Tab(icon: Icon(Icons.directions_bike)),
        ],
      ),
    ),
  ),
);
```

By default, the `TabBar` looks up the Widget tree for the nearest
`DefaultTabController`. If you're manually creating a `TabController`, you'll
need to pass it to the `TabBar`.

 `TabBar`默认将会在Widget树中向上寻找离它最近的一个`DefaultTabController`节点作为自己的`TabController`。如果你想手动创建`TabController`，那么你必须将它作为参数传给 `TabBar`。

## 3. Create content for each tab

Now that we have tabs, we'll want to display content when a tab is selected.
For this purpose, we'll employ the
[`TabBarView`]({{site.api}}/flutter/material/TabBarView-class.html) Widget.

*Note:* Order is important and must correspond to the order of the tabs in the
`TabBar`!

<!-- skip -->

## 3. 为每个tab标签创建内容

现在我们成功创建了tab标签，接下来我们想要在点击tab标签时显示对应的内容。
为了实现这个效果，我们将使用[`TabBarView`]({{site.api}}/flutter/material/TabBarView-class.html) Widget。

*Note:* `TabBarView`中内容的顺序很重要， 它必须与`TabBar`中tab的顺序相对应!

<!-- skip -->

```dart
TabBarView(
  children: [
    Icon(Icons.directions_car),
    Icon(Icons.directions_transit),
    Icon(Icons.directions_bike),
  ],
);
```

## Complete example

## 一个完整的例子

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(TabBarDemo());
}

class TabBarDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: DefaultTabController(
        length: 3,
        child: Scaffold(
          appBar: AppBar(
            bottom: TabBar(
              tabs: [
                Tab(icon: Icon(Icons.directions_car)),
                Tab(icon: Icon(Icons.directions_transit)),
                Tab(icon: Icon(Icons.directions_bike)),
              ],
            ),
            title: Text('Tabs Demo'),
          ),
          body: TabBarView(
            children: [
              Icon(Icons.directions_car),
              Icon(Icons.directions_transit),
              Icon(Icons.directions_bike),
            ],
          ),
        ),
      ),
    );
  }
}
```

![Tabs Demo](/images/cookbook/tabs.gif){:.site-mobile-screenshot}
