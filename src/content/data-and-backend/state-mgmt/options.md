---
# title: Approaches to state management
title: 状态 (State) 管理参考
short-link: State-management approaches
breadcrumb: 方式建议
# description: >-
#   An introduction to different approaches to
#   managing state in Flutter apps.
description: 介绍 Flutter 应用中状态管理的不同方式。
tags: Flutter状态管理
keywords: 参考资料
prev:
  # title: Simple app state management
  title: 简单的应用状态管理
  path: /data-and-backend/state-mgmt/simple
---

State management is a complex topic.
If you feel that some of your questions haven't been answered,
or that the approach described on these pages
is not viable for your use cases, you are probably right.

状态管理是一个相当复杂的话题。
如果你在浏览后发现一些问题并未得到解答，或者并不适用于你的具体需求场景，
自信些，你的实现就是对的。

Learn more from the following resources,
many of which have been contributed by the Flutter community.

通过下面的资源了解更多的信息，
其中有很多内容都是由社区（第三方）提供。

## General overview

## 总体概览

Things to review before selecting an approach.

在选择一个具体内容前，你可以先查看以下几项。

* [Introduction to state management][],
  which is the beginning of this very section
  (for those of you who arrived directly to this _Options_ page
  and missed the previous pages)

  [状态管理的介绍][Introduction to state management]。
  这是本篇内容的总起。（当你直接跳转到了该页面，但错过了
  其他页面时，可以先从这里开始阅读）

* [Pragmatic State Management in Flutter][],
  a video from Google I/O 2019

  [Flutter 实用状态管理 (Pragmatic State Management in Flutter)][Pragmatic State Management in Flutter]，
  来自 Google I/O 2019 的介绍视频。

* [Flutter Architecture Samples][], by Brian Egan

  [Flutter 架构实例 (Flutter Architecture Samples)][Flutter Architecture Samples]，
  Brian Egan 著。

[Flutter Architecture Samples]: https://fluttersamples.com/
[Introduction to state management]: /data-and-backend/state-mgmt/intro
[Pragmatic State Management in Flutter]: {{site.yt.watch}}?v=d_m5csmrf7I

## Built-in approaches

## 内置的方式

### `setState`

The low-level approach to use for widget-specific, ephemeral state.

用于 Widget 临时状态的基础方式。

* [Adding interactivity to your Flutter app][], a Flutter tutorial

  [为你的 Flutter 应用添加交互 (Adding interactivity to your Flutter app)][Adding interactivity to your Flutter app]，
  一篇 Flutter 的教程。

* [Basic state management in Google Flutter][], by Agung Surya

  [Flutter 中的基础状态管理 (Basic state management in Google Flutter)][Basic state management in Google Flutter]，
  Agung Surya 著。

[Adding interactivity to your Flutter app]: /ui/interactivity
[Basic state management in Google Flutter]: {{site.medium}}/@agungsurya/basic-state-management-in-google-flutter-6ee73608f96d

<a id="valuenotifier-inheritednotifier" aria-hidden="true"></a>

### `ValueNotifier` and `InheritedNotifier`

### `ValueNotifier` 和 `InheritedNotifier`

An approach using only Flutter provided APIs to
update state and notify the UI of changes.

一种完全使用 Flutter 提供的 API 
来更新状态并通知 UI 更新的方式。

* [State Management using ValueNotifier and InheritedNotifier][], by Tadas Petra

[State Management using ValueNotifier and InheritedNotifier]: https://www.hungrimind.com/articles/flutter-state-management

<a id="inheritedwidget-inheritedmodel" aria-hidden="true"></a>

### `InheritedWidget` and `InheritedModel`

### `InheritedWidget` 和 `InheritedModel`

The low-level approach used to
communicate between ancestors and children in the widget tree.
This is what `package:provider` and many other approaches use under the hood.

Widget tree 中不同层级间的 widget 通信的基础方法。这是诸如 `package:provider` 等
众多方法的底层实现。

The following instructor-led video workshop covers how to
use `InheritedWidget`:

以下讲师指导的视频 workshop 介绍了如何使用 `InheritedWidget`：

<iframe {{site.bili.std-size}} src="{{site.bili.embed}}?aid=248744553&bvid=BV1Wv411W7yF&cid=354736130&page=1&autoplay=false" title="如何使用 inherited widget 管理应用状态" {{site.bili.set}}></iframe>

Other useful docs include:

其他有用的文档包括：

* [InheritedWidget docs][]

  [InheritedWidget 文档 (InheritedWidget docs)][InheritedWidget docs]

* [Managing Flutter Application State With InheritedWidgets][],
  by Hans Muller

  [使用 InheritedWidgets 管理 Flutter 应用状态 (Managing Flutter Application State With InheritedWidgets)][Managing Flutter Application State With InheritedWidgets]，
  Hans Muller 著。

* [Inheriting Widgets][], by Mehmet Fidanboylu

  [继承 Widgets (Inheriting Widgets)][Inheriting Widgets]，
  Mehmet Fidanboyly 著。

* [Using Flutter Inherited Widgets Effectively][], by Eric Windmill

  [高效地使用 Flutter 继承 Widgets (Using Flutter Inherited Widgets Effectively)][Using Flutter Inherited Widgets Effectively]，Eric Windmill 著。

* [Widget - State - Context - InheritedWidget][], by Didier Bolelens

  [Widget - State - Context - InheritedWidget][]，Didier Bolelens 著。

[InheritedWidget docs]: {{site.api}}/flutter/widgets/InheritedWidget-class.html
[Inheriting Widgets]: {{site.medium}}/@mehmetf_71205/inheriting-widgets-b7ac56dbbeb1
[Managing Flutter Application State With InheritedWidgets]: {{site.flutter-blog}}/managing-flutter-application-state-with-inheritedwidgets-1140452befe1
[Using Flutter Inherited Widgets Effectively]: https://ericwindmill.com/articles/inherited_widget/
[Widget - State - Context - InheritedWidget]: https://www.didierboelens.com/2018/06/widget---state---context---inheritedwidget/

## Community-provided packages

## 社区提供的 package

Depending on the complexity of your app and preferences of your team,
you might find adopting a state management package useful.
State management packages often help reduce boilerplate code,
provide specialized debugging tools, and can help
enable a clearer and consistent application architecture.

The Flutter community offers a wide variety of state management packages.
The best choice for your app often depends on the app's complexity,
your team's preferences, and the specific problems you need to solve.

To begin exploring the available options,
check out the [`#state-management`][]{: target="_blank"} topic on the pub.dev site and
refine the search to find packages that match your needs.

<div class="card-grid">
  <a class="card outlined-card" href="{{site.pub}}/packages?q=topic%3Astate-management" target="_blank">
    <div class="card-header">
      <span class="card-title">
        <span><!-- State management packages -->状态管理 package</span>
        <span class="material-symbols" aria-hidden="true" style="font-size: 1rem;" translate="no">open_in_new</span>
      </span>
    </div>
    <div class="card-content">
      <p>Explore the variety of state-management packages built by and for the Flutter community.</p>
      <p>探索由 Flutter 社区（第三方）开发的各类状态管理 package。</p>
    </div>
  </a>
</div>

:::tip

If you've developed a state management package that
you think would be useful to the Flutter community,
consider [adding the `state-management` topic][pub-topics] and
[publishing the package][pub-publish] to pub.dev.

如果你开发了一个认为对 Flutter 社区有用的状态管理 package，
请考虑 [添加 `state-management` 主题][pub-topics]，
并 [发布 package][pub-publish] 到 pub.dev。

:::

[`#state-management`]: {{site.pub}}/packages?q=topic%3Astate-management
[pub-topics]: {{site.dart-site}}/tools/pub/pubspec#topics
[pub-publish]: {{site.dart-site}}/tools/pub/publishing
