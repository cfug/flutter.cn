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

<a name="latest-release"></a>
## What's new on this site

## 网站更新

To stay on top of Flutter announcements,
including breaking changes, join the
[flutter-announce][] Google group.

加入官方的 [flutter-announce][]
邮件群组，以关注 Flutter 的相关通知，包括 breaking changes 等。

**Sept 10, 2019**

**2019 年 9 月 10 日**

Flutter 1.9 is live!

Flutter 1.9 正式发布！

For more information, see [Flutter news from GDD China: uniting Flutter on web and mobile, and introducing Flutter
1.9](https://developers.googleblog.com/2019/09/flutter-news-from-gdd-china-flutter1.9.html?m=1)
and the [1.9.1 release
notes]({{site.github}}/flutter/flutter/wiki/Release-Notes-Flutter-1.9.1).

更多信息，请查看 [本文](/posts/flutter-news-from-gdd-china-flutter1.9.html)，和 1.9.1 的
[发行注记]({{site.github}}/flutter/flutter/wiki/Release-Notes-Flutter-1.9.1)

For the 1.9 release, Flutter's web support has been
merged ("unforked") into the main repo.
**Web support hasn't reached beta, and is not ready
to be used in production.**
Web and desktop support (which is also coming), will
impact the website, which was originally written
exclusively for developing Flutter mobile apps.
Some website updates are available now (and listed below),
but more will be coming.

随着 1.9 版本的发布，在 Web 平台运行
Flutter 的代码正式被合并到主 repo，但是
**在 Web 平台的支持尚未达到 Beta 阶段，请不要用在生产环节**。
Web 和即将到来的桌面端支持将会影响本站的内容，
如下列出了一些更新，更多的更新将会在稍后时间发布：

New and updated docs on the site include:

新的文档和更新包括：

* The Flutter layout codelab has been rewritten and
  uses the updated DartPad, the browser-based tool for running
  Dart code. DartPad now supports Flutter!
  [Try it out](/docs/codelabs/layout-basics)
  and let us know what you think.

  我们重写了 Flutter 布局的 codelab，
  使用了最新的、支持了 Flutter 的 DartPad，
  可以在 [这里](/docs/codelabs/layout-basics) 
  查看并告诉我们你的想法。
  
* The Performance view tool, which allows you to record
  and profile a session from your Dart/Flutter application,
  has been enabled in DevTools. For more information,
  see the [Performance
  view](/docs/development/tools/devtools/performance)
  page.

  开发者工具（DevTools）里的性能视图工具（Performance view tool），
  可以让你录制并检查 Dart 或 Flutter 应用的某个运行时 session，
  可以在这里查看更多：
  [使用性能视图 (Performance view)](/docs/development/tools/devtools/performance)
  
* A new page on
  [building a web application](/docs/get-started/web).

  新增一个页面，关于 [如何构建一个 Web 应用](/docs/get-started/web)。
  
* A new page on [creating responsive
  apps](/docs/development/ui/layout/responsive)
  in Flutter.
  
  新增一个页面，关于在 Flutter 里
  [如何创建响应式应用](/docs/development/ui/layout/responsive)

* A new page on
  [preparing a web app for release](/docs/deployment/web).

  新增一个页面，关于如何 [打包并发布到 Web 平台](/docs/deployment/web)。

* A new [web FAQ](/docs/development/platform-integration/web).
 
  关于在 Web 平台运行 Flutter 应用，我们新增了一个 
  [Web 常见问题页面](/docs/development/platform-integration/web)。
  
* The [Flutter for web](/web) page is updated.
  
  关于 [在 Web 平台运行 Flutter](/web) 的页面已经更新。

Other relevant docs:

其他相关文档：

* Error messages have been improved in SDK 1.9.
  For more information, read [Improving Flutter's
  Error Messages](https://medium.com/flutter/improving-flutters-error-messages-e098513cecf9)
  on the [Flutter Medium publication](https://medium.com/flutter).

  Flutter 1.9 版本里我们更新了对开发者更友好的 [错误信息提示](https://mp.weixin.qq.com/s/PlBJBo-LTZe0XBkPOeEFbA)。
  
* If you already have a web app that depends on the
  flutter_web package, the following instructions tell
  you how to migrate to the flutter package:
  [Upgrading from package:flutter_web to the Flutter
  SDK](https://github.com/flutter/flutter/wiki/Upgrading-from-package:flutter_web-to-the-Flutter-SDK).
  
  如果你先前已经通过 flutter_web 这个 package 使用了 Flutter Web，
  请根据 [这个文档](https://github.com/flutter/flutter/wiki/Upgrading-from-package:flutter_web-to-the-Flutter-SDK) 来迁移。

Happy Fluttering!

祝你在 Flutter 应用的开发中有一个愉快的经历和体验！

[What's new archive][]

[最近更新归档页面][What's new archive]。

## New to Flutter?

## 新接触 Flutter 吗

Once you've gone through [Get Started][],
including [Write Your First Flutter App,][]
here are some next steps.

你可以从 [安装和环境配置][Get Started] 开始，
也可以上手试试看 [第一个 Flutter 应用的开发][Write Your First Flutter App,]。

### Docs

### 文档

Coming from another platform? Check out: 
[Android][], [iOS][], [Web][], [React Native][],
[Xamarin.Forms][]

看我们为各种已经有相关平台开发经验的开发者准备的文档：
[给 Android 开发者的 Flutter 指南][Android]、
[给 iOS 开发者的 Flutter 指南][iOS]、
[给 React Native 开发者的 Flutter 指南][React Native]、
[给 Web 开发者的 Flutter 指南][Web]、
[给 Xamarin.Forms 开发者的 Flutter 指南][Xamarin.Forms]。

[Building layouts in Flutter][]<br>
Learn how to create layouts in Flutter, where everything is a widget.

[Flutter 中的布局][Building layouts]<br>
学习如何在 Flutter 中创建布局，在 Flutter 里，所有事物都是 widget。

[Adding interactivity to your Flutter app][]<br>
Learn how to add a stateful widget to your app.
  
[为你的 Flutter 应用加入交互体验][Adding interactivity to your Flutter app]<br>
在 app 里使用有状态的 widget。

[A tour of the Flutter widget framework][]<br>
Learn more about Flutter's react-style framework.
  
[Widgets 介绍][A tour of the Flutter widget framework]<br>
学习 Flutter 响应式框架的核心。

[FAQ][]<br>
Get the answers to frequently asked questions.
  
[常见问题][FAQ]<br>
常见问题解答。

### Videos

### 视频

### Videos

We also have some helpful videos on our
[Flutter Youtube channel][]! In particular, check
out the Flutter in Focus series,
and learn about other series on our [videos][] page.

我们在 YouTube 上有一个 [视频频道][Flutter Youtube channel]，欢迎订阅！
更多视频和播放列表介绍，以及社区制作的视频教程，
可以查看我们的 [Flutter 技术视频资源][videos] 页面。

First up, why use Flutter? What makes it different than other
app frameworks?

首先你需要知道，为何我们要使用 Flutter？ 是什么让它与众不同？

<iframe src="//player.bilibili.com/player.html?aid=68736077&cid=119126400&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="560" height="315" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe><br>

<p>How is Flutter different for app development?</p>
<p>视频名称：使用 Flutter 开发应用与其他有何不同</p>

<iframe style="max-width: 100%" width="560" height="315" src="//player.bilibili.com/player.html?aid=55794948&cid=97538589&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen> </iframe>

Flutter in Focus: Learn Flutter features in 10 minutes or less.<br>
[Flutter in Focus playlist][]

FiF 系列视频：十分钟以内学会一个 Flutter 特性<br>
[Flutter in Focus 播放列表][Flutter in Focus playlist]

In Flutter, "everything is a widget"! If you want to better
understand the two kinds of widgets, Stateless and Stateful,
see the following videos,
part of the [Flutter in Focus][] series.

Flutter 里 “所有的事物都是 widget”，
如果你想更好了解有状态和无状态的 widget，请关注
[Flutter in Focus 系列视频][Flutter in Focus]。

<iframe style="max-width: 100%" width="560" height="315" src="//player.bilibili.com/player.html?aid=55794591&cid=97538062&page=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<iframe width="560" height="315" src="//player.bilibili.com/player.html?aid=55832147&cid=97601562&page=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Want to skill up?

## 提升内容

If you learn best by watching engineers write code,
make mistakes, and fix them,
check out the [Boring Flutter Show][] video series:

如果你想看工程师们在线写代码、写 bug、修 bug，请关注
[Boring Flutter Show 系列视频][Boring Flutter Show]。

<iframe style="max-width: 100%" width="560" height="315" src="//player.bilibili.com/player.html?aid=55815727&cid=97573460&page=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
[Boring Flutter Show 系列视频][Boring Flutter Show]

You might also find these docs useful:

下列文档可能也会对你有所帮助：

* [Using packages][]
  
  [在 Flutter 里使用 Packages][Using packages]
  
* [Adding assets and images][]
  
  [添加资源和图片][Adding assets and images]
  
* [Navigation and routing][]
  
  [路由和导航][Navigation and routing]
  
* [State management][]
  
  [状态 (State) 管理介绍][State management]
  
* [Animations][]
  
  [动画效果介绍][Animations]


[A tour of the Flutter widget framework]: /docs/development/ui/widgets-intro
[Adding assets and images]: /docs/development/ui/assets-and-images
[Adding interactivity to your Flutter app]: /docs/development/ui/interactive
[Android]: /docs/get-started/flutter-for/android-devs
[Animations]: /docs/development/ui/animations
[Boring Flutter Show]: https://www.youtube.com/watch?v=vqPG1tU6-c0&list=PLjxrf2q8roU28W3pXbISJbVA5REsA41Sx&index=3&t=9s
[Boring Flutter Show playlist]: https://www.youtube.com/watch?v=vqPG1tU6-c0&list=PLjxrf2q8roU28W3pXbISJbVA5REsA41Sx&index=3&t=9s
[Building layouts]: /docs/development/ui/layout
[FAQ]: /docs/resources/faq
[flutter-announce]: https://groups.google.com/forum/#!forum/flutter-announce
[Flutter in Focus]: https://www.youtube.com/playlist?list=PLjxrf2q8roU2HdJQDjJzOeO6J3FoFLWr2
[Flutter in Focus playlist]: https://www.youtube.com/playlist?list=PLjxrf2q8roU2HdJQDjJzOeO6J3FoFLWr2
[Flutter Youtube channel]: {{site.social.youtube}}
[Get Started]: /docs/get-started/install
[iOS]: /docs/get-started/flutter-for/ios-devs
[Navigation and routing]: /docs/development/ui/navigation
[React Native]: /docs/get-started/flutter-for/react-native-devs
[State management]: /docs/development/data-and-backend/state-mgmt/intro
[Using packages]: /docs/development/packages-and-plugins/using-packages
[videos]: /docs/resources/videos
[Web]: /docs/get-started/flutter-for/web-devs
[What's new archive]: /docs/whats-new-archive
[Write Your First Flutter App,]: /docs/get-started/codelab
[Xamarin.Forms]: /docs/get-started/flutter-for/xamarin-forms-devs

