---
title: What's new archive
description: An archive of what's new on the site.
---

This archive contains current and previous announcements of what's new on the
site.

To stay on top of Flutter announcements, including breaking changes, join the
[flutter-announce][] Google group.

[flutter-announce][]

## **July 9, 2019**

Flutter 1.7 is live!

Flutter 1.7 正式发布！

For more information, see [Announcing Flutter
1.7][]
on the [Flutter Medium Publication][],
and the [1.7.8 release
notes][]
on the [Flutter wiki][].

请参见 [这个文章][Announcing Flutter
1.7] 了解更多 1.7 的更新内容，
在 [Flutter wiki 页面][Flutter wiki] 
查看 1.7.8 的具体更新。

文档站的更新内容包括：

* The [Preparing an Android app for release][]
  page is updated to discuss how to build an Android release
  using an app bundle, as well as how to create separate APK
  files for both 32-bit and 64-bit devices.

  [打包和发布到 Android 平台][Preparing an Android app for release] 有更新，
  包括使用 app bundle 和为 32 位 / 64 位单独打包。

* The [DevTools][] docs are migrated
  to flutter.dev. If you haven't tried this browser-based suite
  of debugging, performance, memory, and inspection tools that
  work with both Flutter and Dart apps and can be launched from
  Android Studio/IntelliJ _and_ VS Code, please check it out!

  新增 [开发者工具文档][DevTools] 系列内容，
  这是个基于浏览器的开发者工具套件，可以帮助你对 Flutter 和 Dart 应用
  做调试、性能监控、内存检测和检查器等，同时可以直接从 Android Studio 
  或 IntelliJ 以及 VSCode 运行，如果你还没有试试看，推荐你看一下。

* The [Simple app state
  management][]
  page is updated. The example code in the page now uses the 3.0
  release of the Provider package.

  [简单的应用
  状态管理][Simple app state
  management]
  页面有所更新，新的文档是基于 Provider 3.0 正式版的。

  
* A new animation recipe, [Animate a page route
  transition][]
  has been added to the [Cookbook][].

  [实用教程][Cookbook] 里添加了一篇新的文章：
  [为页面切换加入动画效果][Animate a page route
  transition]。

* The [Debugging][], 
  [Flutter's build modes][],
  [Performance best practices][], and
  [Performance profiling][]
  pages are updated to reflect DevTools. A
  [Debugging apps programmatically][] page has also been added.

  [调试 Flutter 应用][Debugging]、
  [Flutter 的构建模式选择][Flutter's build modes]、
  [Flutter 应用性能优化最佳实践][Performance best practices] 和
  [Flutter 性能分析][Performance profiling] 
  页面中加入了开发者工具的使用说明。与此同时，还加入了这个文档页面：
  [添加代码的方式来调试][Debugging apps programmatically]。

The Flutter 1.7 release includes the new
[RangeSlider][]
component, which allows the user to select both the upper and lower
endpoints in a range of values. For information about this
component and how to customize it, see
[Material RangeSlider in Flutter][].

[1.7.8 release notes]: {{site.github}}/flutter/flutter/wiki/Release-Notes-Flutter-1.7.8
[Animate a page route transition]: /docs/cookbook/animation/page-route-animation
[Announcing Flutter 1.7]: {{site.flutter-medium}}/announcing-flutter-1-7-9cab4f34eacf
[Cookbook]: /docs/cookbook
[Debugging]: /docs/testing/debugging
[Debugging apps programmatically]: /docs/testing/code-debugging
[DevTools]: /docs/development/tools/devtools
[Flutter Medium Publication]: {{site.flutter-medium}}
[Flutter wiki]: {{site.github}}//flutter/flutter/wiki
[Flutter's build modes]: /docs/testing/build-modes
[Material RangeSlider in Flutter]: {{site.flutter-medium}}/material-range-slider-in-flutter-a285c6e3447d
[Performance best practices]: /docs/perf/rendering/best-practices
[Performance profiling]: /docs/perf/rendering/ui-performance
[Preparing an Android app for release]: /docs/deployment/android
[RangeSlider]: {{site.api}}/flutter/material/RangeSlider-class.html
[Simple app state management]: /docs/development/data-and-backend/state-mgmt/simple

Flutter 1.7 版本的更新同时加入了 
[RangeSlider][]
这个 widget，可以让用户选择在最大值和最小值之间选择一个数字，本周稍晚些时候，
在 Flutter 官方博客里可以看到关于这篇文章的介绍和以及如何自定义它，请关注：
[这里][Material RangeSlider in Flutter]。

## **May 7, 2019, Google I/O Edition**

**2019 年 5 月 7 日，Google I/O 版本**

[Flutter 1.5][] is live!

[Flutter 1.5 发布啦][Flutter 1.5]。

For more information on updates, see the [release notes][]
or [download the release][].

更多关于此次发布的信息，可以在这里查看 [release
notes][]
或者 [下载最新版本][release
notes]。

We are updating DartPad to work with Flutter. Try our new
[Basic Flutter layout codelab][] and tell us what you think!

[Basic Flutter layout codelab]: /docs/codelabs/layout-basics
[download the release]: /docs/development/tools/sdk/archive
[Flutter 1.5]: https://developers.googleblog.com/2019/05/Flutter-io19.html
[release notes]: https://github.com/flutter/flutter/wiki/Release-Notes-Flutter-1.5.4

我们正在更新 DartPad 以支持 Flutter，可以通过这个新的 codelab
[Flutter 布局基础教程](/docs/codelabs/layout-basics)
来试试看吧。

## **February 26, 2019**

Flutter released [version 1.2][] at Mobile World Congress
(MWC) in Barcelona. For more information, see the [release notes][]
or [download the release][].

In addition, here are some recent new and updated docs:

* We've updated our [state management advice][].
  New pages include an [introduction][],
  [thinking declaratively][], [ephemeral vs app state][],
  [simple app state management][], and
  [different state management options][].
  Documenting state management is a tricky thing, as there is no
  one-size-fits-all approach. We'd love your feedback on these new docs!
* A new page on [Performance best practices][].
* Also at MWC, we announced a preview version of the new Dart DevTools
  for profiling and debugging Dart and Flutter apps.
  You can find the docs on the DevTools wiki
  (Note: since moved to [this site][].)
  In particular, check out the DevTool's [widget inspector][] for
  debugging your UI, or the [timeline view][] for profiling your Flutter
  application. Try them out and let us know what you think!
* An update to the [Performance profiling][]
  page that incorporates the new Dart DevTools UI.
* Updates to the [Android Studio/IntelliJ][]
  and [VS Code][] pages incorporating info from
  the new Dart DevTools UI.

If you have questions or comments about any of these docs,
[file an issue][].

[Android Studio/IntelliJ]: /docs/development/tools/android-studio
[different state management options]: /docs/development/data-and-backend/state-mgmt/options
[download the release]: /docs/development/tools/sdk/archive
[ephemeral vs app state]: /docs/development/data-and-backend/state-mgmt/ephemeral-vs-app
[file an issue]: {{site.repo.this}}/issues
[introduction]: /docs/development/data-and-backend/state-mgmt/intro
[Performance profiling]: /docs/perf/rendering/ui-performance
[release notes]: https://github.com/flutter/flutter/wiki/Release-Notes---Flutter-1.2.1
[simple app state management]: /docs/development/data-and-backend/state-mgmt/simple
[state management advice]: /docs/development/data-and-backend/state-mgmt/intro
[thinking declaratively]: /docs/development/data-and-backend/state-mgmt/declarative
[this site]: /docs/development/tools/devtools
[timeline view]: /docs/development/tools/devtools/timeline
[VS Code]: /docs/development/tools/vs-code
[widget inspector]: /docs/development/tools/devtools/inspector


[version 1.2]: https://developers.googleblog.com/2019/02/launching-flutter-12-at-mobile-world.html

## **November 5, 2018**

Welcome to the revamped Flutter website!

We've spent the last few months redesigning the website and how its
information is organized. We hope you can more easily find the docs
you are looking for. Some of the changes to the website include:

* Revised [front][] page
* Revised [showcase][] page
* Revised [community][] page
* Revised navigation in the left side bar
* Table of contents on the right side of most pages

Some of the new content includes:

* Deep dive on Flutter internals, [Inside Flutter][]
* [Technical videos][]
* [State management][]
* [Background Dart processes][]
* [Flutter's build modes][]
{% comment %}
* How to connect
  [a native debugger _and_ a Dart debugger to your app][]
  (not yet complete)
{% endcomment %}

If you have questions or comments about the revamped site,
[file an issue][].

[a native debugger _and_ a Dart debugger to your app]: /docs/testing/oem-debuggers
[Background Dart processes]: /docs/development/packages-and-plugins/background-processes
[community]: /community
[file an issue]: {{site.repo.this}}/issues
[Flutter's build modes]: /docs/testing/build-modes
[front]: /
[Inside Flutter]: /docs/resources/inside-flutter
[showcase]: /showcase
[State management]: /docs/development/data-and-backend/state-mgmt
[Technical videos]: /docs/resources/videos
