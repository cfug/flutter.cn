---
title: Work with tabs
title: 使用 tabs
prev:
  title: Use custom fonts
  title: 使用自定义字体
  path: /docs/cookbook/design/fonts
next:
  title: Build a form with validation
  title: 构建一个有验证判断的表单
  path: /docs/cookbook/forms/validation
---

Working with tabs is a common pattern in apps that follow the Material Design
guidelines. Flutter includes a convenient way to create tab layouts as part of
the [material library]({{site.api}}/flutter/material/material-library.html).

在 Material Design 设计准则里，tabs 是一种常用的布局模型。
Flutter 自带的 [Material 库]({{site.api}}/flutter/material/material-library.html) 
可以帮助开发者们非常便捷的创建 tab 布局。

{{site.alert.note}}

  To create tabs in a Cupertino app, see the
  [Building a Cupertino app with
  Flutter](https://codelabs.developers.google.com/codelabs/flutter-cupertino)
  codelab.
  
  创建一个使用 tabs 布局、Cupertino 风格的 iOS 应用，
  请参见这个 codelab: 
  [使用 Flutter 构建 iOS 风格的应用](https://codelabs.flutter.cn/codelabs/flutter-cupertino-cn/index.html)。
  
{{site.alert.end}}

This recipe creates a tabbed example using the following steps;

这份教程将帮助你创建一个 tabs 布局样例，请参见如下步骤：

## Directions

## 步骤

  1. Create a `TabController`.
     
     创建 `TabController`
  
  2. Create the tabs.
    
     创建 tabs
     
  3. Create content for each tab.
    
     为每个 tab 创建内容

## 1. Create a `TabController`

## 1. 创建 `TabController`

For tabs to work, you need to keep the selected tab and content
sections in sync. This is the job of the
[`TabController`]({{site.api}}/flutter/material/TabController-class.html).

为了使所选的 tab 与它所对应的内容能够同步变化，
需要用 [`TabController`]({{site.api}}/flutter/material/TabController-class.html) 进行控制。

Either create a TabController manually, or automatically by using a
[DefaultTabController]({{site.api}}/flutter/material/DefaultTabController-class.html)
widget.

我们既可以手动创建一个 `TabController` ，也能够直接使用
[`DefaultTabController`]({{site.api}}/flutter/material/DefaultTabController-class.html) widget。

Using `DefaultTabController` is the simplest option, since it
creates a `TabController` and makes it available to all descendant widgets.

最简单的选择是使用 `DefaultTabController` widget，
因为它能够创建出一个可供所有子 widgets 使用的 `TabController`。


<!-- skip -->
```dart
DefaultTabController(
  // The number of tabs / content sections to display.
  length: 3,
  child: // Complete this code in the next step.
);
```

## 2. Create the tabs

## 2. 创建 tabs 

When a tab is selected, it needs to display content.
You can create tabs using the
[`TabBar`]({{site.api}}/flutter/material/TabController-class.html)
widget. In this example, create a `TabBar` with three
[`Tab`]({{site.api}}/flutter/material/Tab-class.html)
widgets and place it within an
[`AppBar`]({{site.api}}/flutter/material/AppBar-class.html).

现在我们已经成功创建了 `TabController`，
接下来就可以用 [`TabBar`]({{site.api}}/flutter/material/TabController-class.html) widget
来创建 tabs。下面这个示例创建了包含三组
[`Tab`]({{site.api}}/flutter/material/Tab-class.html) widget 的 `TabBar`（一个），
并把它放置于 [`AppBar`]({{site.api}}/flutter/material/AppBar-class.html) widget 中。

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

By default, the `TabBar` looks up the widget tree for the nearest
`DefaultTabController`. If you're manually creating a `TabController`,
pass it to the `TabBar`.

`TabBar` 默认将会在 Widget 树中向上寻找离它最近的一个 `DefaultTabController` 节点作为自己的 `TabController`。如果您想手动创建 `TabController`，那么您必须将它作为参数传给 `TabBar`。

## 3. Create content for each tab

## 3. 为每个 tab 创建内容

Now that you have tabs, display content when a tab is selected.
For this purpose, use the
[`TabBarView`]({{site.api}}/flutter/material/TabBarView-class.html) widget.

现在我们已经成功创建了一些 tabs，
接下来要实现的是 tab 被选中时显示其对应的内容。
为了实现这个效果，我们将使用
[`TabBarView`]({{site.api}}/flutter/material/TabBarView-class.html) widget。

*Note:* Order is important and must correspond to the order of the tabs in the
`TabBar`!

*注意：* `TabBarView` 中内容的顺序很重要，它必须与 `TabBar` 中 tab 的顺序相对应!

{{site.alert.note}}

  Order is important and must correspond to the order of the tabs in the
  `TabBar`.
  
  `TabBarView` 中内容的顺序很重要，它必须与 `TabBar` 中 tab 的顺序相对应！

{{site.alert.end}}



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

## 完整样例

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
