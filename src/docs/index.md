---
title: Flutter Documentation
title: Flutter 开发文档
short-title: Docs
short-title: 文档
description: The landing page for Flutter documentation.
description: Flutter 开发文档页面。
---

{% for card in site.data.docs_cards -%}
  {% capture index0Modulo3 %}{{ forloop.index0 | modulo:3 }}{% endcapture %}
  {% capture indexModulo3 %}{{ forloop.index | modulo:3 }}{% endcapture %}
  {% if index0Modulo3 == '0' %}
  <div class="card-deck mb-4">
  {% endif %}
    <a class="card" href="{{card.url}}">
      <div class="card-body">
        <header class="card-title">{{card.name}}</header>
        <p class="card-text">{{card.description}}</p>
      </div>
    </a>
  {% if indexModulo3 == '0' %}
  </div>
  {% endif %}
{% endfor -%}

## What's new on the site

## 网站更新

To stay on top of Flutter announcements, including breaking changes, join the
[flutter-announce](https://groups.google.com/forum/#!forum/flutter-announce)
Google group.

加入官方的 [flutter-announce](https://groups.google.com/forum/#!forum/flutter-announce)
邮件群组，以关注 Flutter 的相关通知，包括 breaking changes 等。

**July 9, 2019**

Flutter 1.7 is live!

Flutter 1.7 正式发布！

For more information, see [Announcing Futter
1.7]({{site.flutter-medium}}/announcing-flutter-1-7-9cab4f34eacf)
on the [Flutter Medium Publication]({{site.flutter-medium}}),
and the [1.7.8 release
notes]({{site.github}}/flutter/flutter/wiki/Release-Notes-Flutter-1.7.8)
on the [Flutter wiki]({{site.github}}//flutter/flutter/wiki).

请参见 [这个文章](/posts/announcing-flutter-1-7-9.html) 了解更多 1.7 的更新内容，
在 [Flutter wiki 页面]({{site.github}}/flutter/flutter/wiki/Release-Notes-Flutter-1.7.8) 
查看 1.7.8 的具体更新。

New and updated docs on the site include:

文档站的更新内容包括：

* The [Preparing an Android app for release](/docs/deployment/android)
  page is updated to discuss how to build an Android release
  using an app bundle, as well as how to create separate APK
  files for both 32-bit and 64-bit devices.

  [打包和发布到 Android 平台](/docs/deployment/android) 有更新，
  包括使用 app bundle 和为 32 位 / 64 位单独打包。

* The [DevTools](/docs/development/tools/devtools) docs are migrated
  to flutter.dev. If you haven't tried this browser-based suite
  of debugging, performance, memory, and inspection tools that
  work with both Flutter and Dart apps and can be launched from
  Android Studio/IntelliJ _and_ VS Code, please check it out!

  新增 [开发者工具文档](/docs/development/tools/devtools) 系列内容，
  这是个基于浏览器的开发者工具套件，可以帮助你对 Flutter 和 Dart 应用
  做调试、性能监控、内存检测和检查器等，同时可以直接从 Android Studio 
  或 IntelliJ 以及 VSCode 运行，如果你还没有试试看，推荐你看一下。

* The [Simple app state
  management](/docs/development/data-and-backend/state-mgmt/simple)
  page is updated. The example code in the page now uses the 3.0
  release of the Provider package.

  [简单的应用
  状态管理](/docs/development/data-and-backend/state-mgmt/simple)
  页面有所更新，新的文档是基于 Provider 3.0 正式版的。

  
* A new animation recipe, [Animate a page route
  transition](/docs/cookbook/animation/page-route-animation)
  has been added to the [Cookbook](/docs/cookbook).

  [实用教程](/docs/cookbook) 里添加了一篇新的文章：
  [为页面切换加入动画效果](/docs/cookbook/animation/page-route-animation)。

* The [Debugging](/docs/testing/debugging), 
  [Flutter's build modes](/docs/testing/build-modes),
  [Performance best practices](/docs/testing/best-practices), and
  [Performance profiling](/docs/testing/ui-performance)
  pages are updated to reflect DevTools. A
  [Debugging apps programmatically](/docs/testing/code-debugging)
  page has also been added.

  [调试 Flutter 应用](/docs/testing/debugging)、
  [Flutter 的构建模式选择](/docs/testing/build-modes)、
  [Flutter 应用性能优化最佳实践](/docs/testing/best-practices) 和
  [Flutter 性能分析](/docs/testing/ui-performance) 
  页面中加入了开发者工具的使用说明。与此同时，还加入了这个文档页面：
  [添加代码的方式来调试](/docs/testing/code-debugging)。

The Flutter 1.7 release includes the new
[RangeSlider]({{site.api}}/flutter/material/RangeSlider-class.html)
component, which allows the user to select both the upper and lower
endpoints in a range of values. For information about this
component and how to customize it, see [Material RangeSlider in
Flutter]({{site.flutter-medium}}/material-range-slider-in-flutter-a285c6e3447d).

Flutter 1.7 版本的更新同时加入了 
[RangeSlider]({{site.api}}/flutter/material/RangeSlider-class.html)
这个 widget，可以让用户选择在最大值和最小值之间选择一个数字，本周稍晚些时候，
在 Flutter 官方博客里可以看到关于这篇文章的介绍和以及如何自定义它，请关注：
[这里]({{site.flutter-medium}})。

Happy Fluttering!

[What's new archive](/docs/whats-new-archive)

[最近更新归档页面](/docs/whats-new-archive)。


## New to Flutter?

## 新接触 Flutter 吗

Once you've gone through [Get Started](/docs/get-started/install),
including [Write Your First Flutter App,](/docs/get-started/codelab)
here are some next steps.

你可以从 [安装和环境配置](/docs/get-started/install) 开始，
也可以上手试试看 [第一个 Flutter 应用的开发](/docs/get-started/codelab)。

### Docs

### 文档

Coming from another platform? Check out: 
[Android](/docs/get-started/flutter-for/android-devs),
[iOS](/docs/get-started/flutter-for/ios-devs),
[Web](/docs/get-started/flutter-for/web-devs),
[React Native](/docs/get-started/flutter-for/react-native-devs),
[Xamarin.Forms](/docs/get-started/flutter-for/xamarin-forms-devs)

看我们为各种已经有相关平台开发经验的开发者准备的文档：
[给 Android 开发者的 Flutter 指南](/docs/get-started/flutter-for/android-devs)、
[给 iOS 开发者的 Flutter 指南](/docs/get-started/flutter-for/ios-devs)、
[给 React Native 开发者的 Flutter 指南](/docs/get-started/flutter-for/web-devs)、
[给 Web 开发者的 Flutter 指南](/docs/get-started/flutter-for/react-native-devs)、
[给 Xamarin.Forms 开发者的 Flutter 指南](/docs/get-started/flutter-for/xamarin-forms-devs)。

[Building layouts in Flutter](/docs/development/ui/layout)<br>
Learn how to create layouts in Flutter, where everything is a widget.

[Flutter 中的布局](/docs/development/ui/layout)<br>
学习如何在 Flutter 中创建布局，在 Flutter 里，所有事物都是 widget。

[Adding interactivity to your Flutter app](/docs/development/ui/interactive)<br>
Learn how to add a stateful widget to your app.
  
[为你的 Flutter 应用加入交互体验](/docs/development/ui/interactive)<br>
在 app 里使用有状态的 widget。

[A tour of the Flutter widget framework](/docs/development/ui/widgets-intro)<br>
Learn more about Flutter's react-style framework.
  
[Widgets 介绍](/docs/development/ui/widgets-intro)<br>
学习 Flutter 响应式框架的核心。

[FAQ](/docs/resources/faq)<br>
Get the answers to frequently asked questions.
  
[常见问题](/docs/resources/faq)<br>
常见问题解答。

### Videos

### 视频

We also have some helpful videos on our [Flutter Youtube
channel]({{site.social.youtube}})!  In particular, check
out the Flutter in Focus series, and learn about other
series on our [videos](/docs/resources/videos) page.

我们在 YouTube 上有一个 [视频频道]({{site.social.youtube}})，欢迎订阅！
更多视频和播放列表介绍，以及社区制作的视频教程，
可以查看我们的 [Flutter 技术视频资源](/docs/resources/videos) 页面。

<iframe style="max-width: 100%" width="560" height="315" src="//player.bilibili.com/player.html?aid=55794948&cid=97538589&page=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Flutter in Focus: Learn Flutter features in 10 minutes or less.<br>
[Flutter in Focus playlist](https://www.youtube.com/playlist?list=PLjxrf2q8roU2HdJQDjJzOeO6J3FoFLWr2)

In Flutter, "everything is a widget"! If you want to better understand the
two kinds of widgets, Stateless and Stateful, see the following videos,
part of the [Flutter in
Focus](https://www.youtube.com/playlist?list=PLjxrf2q8roU2HdJQDjJzOeO6J3FoFLWr2) series.

Flutter 里 “所有的事物都是 widget”，
如果你想更好了解有状态和无状态的 widget，请关注
[Flutter in Focus 系列视频](https://www.youtube.com/playlist?list=PLjxrf2q8roU2HdJQDjJzOeO6J3FoFLWr2)。

<iframe style="max-width: 100%" width="560" height="315" src="//player.bilibili.com/player.html?aid=55794591&cid=97538062&page=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<iframe width="560" height="315" src="//player.bilibili.com/player.html?aid=55832147&cid=97601562&page=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Want to skill up?

## 提升内容

If you learn best by watching engineers write code, make mistakes, and fix them,
check out the [Boring Flutter
Show](https://www.youtube.com/watch?v=vqPG1tU6-c0&list=PLjxrf2q8roU28W3pXbISJbVA5REsA41Sx&index=3&t=9s)
video series:

如果你想看工程师们在线写代码、写 bug、修 bug，请关注
[Boring Flutter Show 系列视频](https://www.youtube.com/watch?v=vqPG1tU6-c0&list=PLjxrf2q8roU28W3pXbISJbVA5REsA41Sx&index=3&t=9s)

<iframe style="max-width: 100%" width="560" height="315" src="//player.bilibili.com/player.html?aid=55815727&cid=97573460&page=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

[Boring Flutter Show playlist](https://www.youtube.com/watch?v=vqPG1tU6-c0&list=PLjxrf2q8roU28W3pXbISJbVA5REsA41Sx&index=3&t=9s)

You might also find these docs useful:

这些文档也会非常有用：

* [Using packages](/docs/development/packages-and-plugins/using-packages)
  
  [在 Flutter 里使用 Packages](/docs/development/packages-and-plugins/using-packages)
  
* [Adding assets and images](/docs/development/ui/assets-and-images)
  
  [添加资源和图片](/docs/development/ui/assets-and-images)
  
* [Navigation and routing](/docs/development/ui/navigation)
  
  [路由和导航](/docs/development/ui/navigation)
  
* [State management](/docs/development/data-and-backend/state-mgmt/intro)
  
  [状态 (State) 管理介绍](/docs/development/data-and-backend/state-mgmt/intro)
  
* [Animations](/docs/development/ui/animations)
  
  [动画效果介绍](/docs/development/ui/animations)
  
