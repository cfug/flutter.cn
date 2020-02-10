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

加入我们的 [flutter-announce][] 邮件群组追踪最新的发布、Breaking changes 等。

**Dec 11, 2019, Flutter Interact Edition**

**2019 年 12 月 11 日, Flutter Interact 版本**

Flutter 1.12 is live!

Flutter 1.12 正式发布!

For more information, see
[Flutter: the first UI platform designed for ambient computing][],
[Announcing Flutter 1.12: What a year!][] and
the [Flutter 1.12.13][] release notes.

更多详细信息请参阅 
[Flutter：第一个为环境计算设计的UI平台][Flutter: the first UI platform designed for ambient computing]，
[宣布 Flutter 1.12 正式发布：太棒的一年!][Announcing Flutter 1.12: What a year!] 
以及 [Flutter 1.12.13][] 发行注记。

Docs added and updated since the last announcement include:

自上次发布以来添加和更新的文档包括：

* To accompany an updated implementation of add-to-app,
  we have added documentation on how to
  [add Flutter to an existing app][] for both iOS and Android.

  为配合最新版「添加到现有应用」的实现，我们添加了有关如何
  [将 Flutter 添加到现有应用中][add Flutter to an existing app] 的文章，
  同时适用于 iOS 和 Android。

* If you own plugin code, we encourage you to update to the
  new plugin APIs for Android. For more information, see
  [Migrating your plugin to the new Android APIs][].

  如果您拥有插件代码，我们建议您更新到适用于 Android 插件的新的 API。
  有关更多信息，请参阅
  [将您的插件迁移到新的 Android API][Migrating your plugin to the new Android APIs]。

* Web support has moved to the beta channel. For more information,
  see [Web support for Flutter][] and
  [Web support for Flutter goes beta][] on the Medium publication.
  Also, the [building a web app with Flutter][] page is updated.

  Web 支持已进入 Beta 频道，想要查看更多的信息，
  请参阅 [Flutter 的 Web 支持][Web support for Flutter] 和
  [Flutter 的 Web 支持变为 beta][Web support for Flutter goes beta]。
  此外，
  [使用 Flutter 构建 Web 应用程序][building a web app with Flutter] 页面也已更新。

* A new [write your first Flutter app on the web][] codelab
  is added to the [Get started][] docs, and includes
  instructions on setting breakpoints in DevTools!

  全新 
  [编写你的第一个 Flutter Web 应用][write your first Flutter app on the web] codelab
  已添加到 [使用入门][Get started] 文档中，其中包括在 DevTools 中设置断点的说明。

* A new [implicit animations][] codelab is available
  featuring DartPad.
  (To run it, you don't need to download any software!)

  新的 [隐式动画][implicit animations] codelab 发布啦，
  它还带有 DartPad。（直接运行它，你无需下载任何软件！）

* Alpha support for MacOS (desktop) is now available in
  release 1.13 on the master and dev channels.
  For more information, see [Desktop support for Flutter][].

  现在可以在主频道和开发者频道上发布的 1.13 版获得对 MacOS（桌面）的 Alpha 支持。
  有关更多信息，请参见 [Flutter 的桌面支持][Desktop support for Flutter]。

* The iOS section of the [app size][] page is updated to reflect
  the inclusion of bitcode.

  iOS 页面的 [app size][] 部分已更新，包含 bitcode。

* An alpha release of Flutter Layout Explorer, a new feature
  (and part of the Flutter inspector) that allows you to
  explore a visual representation of your layout is available.
  For more information, see the [Flutter Layout Explorer][] docs.

  Flutter Layout Explorer 的 Alpha 版本，一项新功能
  （以及 Flutter inspector 的一部分），你可以探索您的布局的可视化表示形式。
  有关更多信息，请参看 [探索 Flutter 中的布局][Flutter Layout Explorer] 文档。

Other newness:

其他新颖之处：

* A brand new version of [Flutter Gallery][]. There's a 
  link to the runnable sample in the side nav under
  **Samples & Tutorials**.

  全新版本的 [Flutter Gallery][]。
  侧面导航 **示例和教程** 下有个可运行示例的链接。

Happy Fluttering!

祝你在 Flutter 应用的开发中有一个愉快的经历和体验！

[最近更新归档页面][What's new archive]。

[add Flutter to an existing app]: /docs/development/add-to-app
[Announcing Flutter 1.12: What a year!]: https://medium.com/flutter/announcing-flutter-1-12-what-a-year-22c256ba525d
[app size]: /docs/perf/app-size#ios
[building a web app with Flutter]: /docs/get-started/web
[Desktop support for Flutter]: /desktop
[Flutter: the first UI platform designed for ambient computing]: https://developers.googleblog.com/2019/12/flutter-ui-ambient-computing.html?m=1
[Flutter 1.12.13]: /docs/development/tools/sdk/release-notes/release-notes-1.12.13
[Flutter Gallery]: https://flutter.github.io/samples/#/
[Flutter Layout Explorer]: https://flutter.dev/docs/development/tools/devtools/inspector#flutter-layout-explorer
[Flutter Medium publication]: https://medium.com/flutter
[Migrating your plugin to the new Android APIs]: /docs/development/packages-and-plugins/plugin-api-migration
[implicit animations]: /docs/codelabs/implicit-animations
[Web support for Flutter]: /web
[Web support for Flutter goes beta]: https://medium.com/flutter/web-support-for-flutter-goes-beta-35b64a1217c0
[write your first Flutter app on the web]: /docs/get-started/codelab-web
[Get started]: /docs/get-started/install

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

<iframe style="max-width: 100%" width="560" height="315" src="//player.bilibili.com/player.html?aid=68736077&cid=119126400&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="560" height="315" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe><br>

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

<iframe style="max-width: 100%" width="560" height="315" src="//player.bilibili.com/player.html?aid=55832147&cid=97601562&page=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

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
[1.9.1 release notes]: {{site.github}}/flutter/flutter/wiki/Release-Notes-Flutter-1.9.1
[building a web application]: /docs/get-started/web
[ColorFiltered]: {{site.api}}/flutter/widgets/ColorFiltered-class.html
[ColorFiltered demo]: {{site.github}}/csells/flutter_color_filter
[creating responsive apps]: /docs/development/ui/layout/responsive
[Flutter Medium publication]: https://medium.com/flutter
[Flutter for web]: /web
[Flutter news from GDD China: uniting Flutter on web and mobile, and introducing Flutter 1.9]: https://developers.googleblog.com/2019/09/flutter-news-from-gdd-china-flutter1.9.html?m=1
[Improving Flutter's Error Messages]: https://medium.com/flutter/improving-flutters-error-messages-e098513cecf9
[Performance view]: /docs/development/tools/devtools/performance
[preparing a web app for release]: /docs/deployment/web
[SelectableText]: {{site.api}}/flutter/material/SelectableText-class.html
[Showcase]: /showcase
[ToggleButtons]: {{site.api}}/flutter/material/ToggleButtons-class.html
[ToggleButtons demo]: {{site.github}}/csells/flutter_toggle_buttons
[Try it out]: /docs/codelabs/layout-basics
[Upgrading from package:flutter_web to the Flutter SDK]: https://github.com/flutter/flutter/wiki/Upgrading-from-package:flutter_web-to-the-Flutter-SDK
[using the dart:ffi library]: /docs/development/platform-integration/c-interop
[web FAQ]: /docs/development/platform-integration/web
[add Flutter to an existing app]: /docs/development/add-to-app
[Announcing Flutter 1.12: What a year!]: https://medium.com/flutter/announcing-flutter-1-12-what-a-year-22c256ba525d
[app size]: /docs/perf/app-size#ios
[building a web app with Flutter]: /docs/get-started/web
[Desktop support for Flutter]: /desktop
[Flutter: the first UI platform designed for ambient computing]: https://developers.googleblog.com/2019/12/flutter-ui-ambient-computing.html?m=1
[Flutter 1.12.13]: /docs/development/tools/sdk/release-notes/release-notes-1.12.13
[Flutter Gallery]: https://flutter.github.io/samples/#/
[Flutter Layout Explorer]: https://flutter.dev/docs/development/tools/devtools/inspector#flutter-layout-explorer
[Flutter Medium publication]: https://medium.com/flutter
[Migrating your plugin to the new Android APIs]: /docs/development/packages-and-plugins/plugin-api-migration
[implicit animations]: /docs/codelabs/implicit-animation
[Web support for Flutter]: /web
[Web support for Flutter goes beta]: https://medium.com/flutter/web-support-for-flutter-goes-beta-35b64a1217c0
[write your first Flutter app on the web]: /docs/get-started/codelab-web
[Get started]: /docs/get-started/install

