---
title: Work with tabs
title: 使用 tabs
description: How to implement tabs in a layout.
description: 如何实现 tab 布局。
prev:
  title: Use themes to share colors and font styles
  title: 使用 Themes 统一颜色和字体风格
  path: /docs/cookbook/design/themes
next:
  title: Build a form with validation
  title: 构建一个有验证判断的表单
  path: /docs/cookbook/forms/validation
js:
  - defer: true
    url: https://dartpad.cn/inject_embed.dart.js
---

Working with tabs is a common pattern in apps that follow the
Material Design guidelines.
Flutter includes a convenient way to create tab layouts as part of
the [material library][].

在 Material Design 设计准则里，tabs 是一种常用的布局模型。
Flutter 自带的 [Material 库][material library] 
可以帮助开发者们非常便捷的创建 tab 布局。

{{site.alert.note}}

  To create tabs in a Cupertino app, see the
  [Building a Cupertino app with Flutter][] codelab.
  
  创建一个使用 tabs 布局、Cupertino 风格的 iOS 应用，
  请参见这个 codelab: [使用 Flutter 构建 iOS 风格的应用][]。
  
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
sections in sync.
This is the job of the [`TabController`][].

为了使所选的 tab 与它所对应的内容能够同步变化，
需要用 [`TabController`][] 进行控制。

Either create a `TabController` manually,
or automatically by using a [`DefaultTabController`][] widget.

我们既可以手动创建一个 `TabController` ，也能够直接使用
[`DefaultTabController`][] widget。

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
You can create tabs using the [`TabBar`][] widget.
In this example, create a `TabBar` with three
[`Tab`][] widgets and place it within an [`AppBar`][].

现在我们已经成功创建了 `TabController`，
接下来就可以用 [`TabBar`][] widget
来创建 tabs。下面这个示例创建了包含三组
[`Tab`][] widget 的 `TabBar`（一个），
并把它放置于 [`AppBar`][] widget 中。

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

`TabBar` 默认将会在 Widget 树中向上寻找离它最近的一个
`DefaultTabController` 节点作为自己的 `TabController`。
如果您想手动创建 `TabController`，
那么您必须将它作为参数传给 `TabBar`。

## 3. Create content for each tab

## 3. 为每个 tab 创建内容

Now that you have tabs, display content when a tab is selected.
For this purpose, use the [`TabBarView`][] widget.

现在我们已经成功创建了一些 tabs，
接下来要实现的是 tab 被选中时显示其对应的内容。
为了实现这个效果，我们将使用
[`TabBarView`][] widget。

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

## Interactive example

## 交互式样例

```run-dartpad:theme-light:mode-flutter:run-true:width-100%:height-600px:split-60:ga_id-interactive_example
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

<noscript>
  <img src="/images/cookbook/tabs.gif" alt="Tabs Demo" class="site-mobile-screenshot" />
</noscript>


[`AppBar`]: {{site.api}}/flutter/material/AppBar-class.html
[Building a Cupertino app with Flutter]: https://codelabs.developers.google.com/codelabs/flutter-cupertino
[使用 Flutter 构建 iOS 风格的应用]: (https://codelabs.flutter.cn/codelabs/flutter-cupertino-cn/index.html)
[`DefaultTabController`]: {{site.api}}/flutter/material/DefaultTabController-class.html
[material library]: {{site.api}}/flutter/material/material-library.html
[`Tab`]: {{site.api}}/flutter/material/Tab-class.html
[`TabBar`]: {{site.api}}/flutter/material/TabController-class.html
[`TabBarView`]: {{site.api}}/flutter/material/TabBarView-class.html
[`TabController`]: {{site.api}}/flutter/material/TabController-class.html
