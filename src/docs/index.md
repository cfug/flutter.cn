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

**May 7, 2019, Google I/O Edition**

**2019 年 5 月 7 日，Google I/O 版本**

[Flutter 1.5](https://developers.googleblog.com/2019/05/Flutter-io19.html) is live!

[Flutter 1.5 发布啦](/posts/Flutter-io19.html)。

For more information on updates, see the [release
notes](https://github.com/flutter/flutter/wiki/Release-Notes-Flutter-1.5.4)
or [download the release](/docs/development/tools/sdk/archive).

更多关于此次发布的信息，可以在这里查看 [release
notes](https://github.com/flutter/flutter/wiki/Release-Notes-Flutter-1.5.4)
或者 [下载最新版本](/docs/development/tools/sdk/archive)。

We are updating DartPad to work with Flutter. Try our new
[Basic Flutter layout codelab](/docs/codelabs/layout-basics)
and tell us what you think!

我们正在更新 DartPad 以支持 Flutter，可以通过这个新的 codelab
[Flutter 布局基础教程](/docs/codelabs/layout-basics)
来试试看吧。

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
  
