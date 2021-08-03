---
title: List of state management approaches
title: 状态 (State) 管理参考
description: A list of different approaches to managing state.
description: 通过不同的方式来进行状态管理。
tags: Flutter状态管理
keywords: 参考资料
prev:
  title: Simple app state management
  title: 简单的共享 (app) 状态管理
  path: /docs/development/data-and-backend/state-mgmt/simple
---

State management is a complex topic.
If you feel that some of your questions haven't been answered,
or that the approach described on these pages
is not viable for your use cases, you are probably right.

状态管理是一个相当复杂的话题。
如果您在浏览后发现一些问题并未得到解答，或者并不适用于您的具体需求场景，
自信些，您的实现就是对的。

Learn more at the following links,
many of which have been contributed by the Flutter community:

通过下面的链接了解更多的信息，
其中有很多信息都是由社区（第三方）提供。

## General overview

## 总体概览

Things to review before selecting an approach. 

在选择一个具体内容前，您可以先查看以下几项。

* [Introduction to state management][],
  which is the beginning of this very section
  (for those of you who arrived directly to this _Options_ page 
  and missed the previous pages)
  
  [状态管理的介绍][Introduction to state management]。
  这是本篇内容的总起。（当您直接跳转到了该页面，但错过了
  其他页面时，可以先从这里开始阅读）

* [Pragmatic State Management in Flutter][],
  a video from Google I/O 2019
  
  [Flutter 实用状态管理 (Pragmatic State Management in Flutter)][Pragmatic State Management in Flutter]，
  来自 Google I/O 2019 的介绍视频。

* [Flutter Architecture Samples][], by Brian Egan
  
  [Flutter 架构实例 (Flutter Architecture Samples)][Flutter Architecture Samples]，
  Brian Egan 著。

## Provider

A recommended approach.

推荐的管理方式。

* [Simple app state management][], the previous page in this section
  
  [简易的应用状态管理 (Simple app state management)][Simple app state management]，
  这是本节内容的上篇。

* [Provider package][]
  
  [Provider 依赖包 (Provider package)][Provider package]

* [You might not need Redux: The Flutter edition][], by Ryan Edge
  
  [你可能并不需要 Redux：Flutter 专版 (You might not need Redux: The Flutter edition)][You might not need Redux: The Flutter edition]

* [Making sense of all those Flutter Providers][]
  
  [学习并理解 Flutter Providers (Making sense of all those Flutter Providers)][Making sense of all those Flutter Providers]

## setState

The low-level approach to use for widget-specific, ephemeral state.

适用于较小规模 widget 的暂时性状态的基础管理方法。

* [Adding interactivity to your Flutter app][], a Flutter tutorial
  
  [为你的 Flutter 应用添加交互 (Adding interactivity to your Flutter app)][Adding interactivity to your Flutter app]，一篇 Flutter 的教程。

* [Basic state management in Google Flutter][], by Agung Surya
  
  [Flutter 中的基础状态管理 (Basic state management in Google Flutter)][Basic state management in Google Flutter]，Agung Surya 著。

## InheritedWidget &amp; InheritedModel

The low-level approach used to communicate between ancestors and children
in the widget tree. This is what `provider` and many other approaches
use under the hood.

Widget tree 中不同层级间的 widget 通信的基础方法。这是诸如 `provider` 等
众多方法的底层实现。

The following instructor-led video workshop covers how to
use `InheritedWidget`:

以下讲师指导的视频 workshop 介绍了如何使用 `InheritedWidget`：

<iframe width="560" height="315" src="https://player.bilibili.com/player.html?aid=248744553&bvid=BV1Wv411W7yF&cid=354736130&page=1" title="Bilibili video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

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

## Redux

A state container approach familiar to many web developers.

前端开发者较为熟悉的状态容器实现。

* [Animation Management with Redux and Flutter][],
  a video from DartConf 2018 [Accompanying article on Medium][]
  
  [使用 Redux 在 Flutter 中管理动画 (Animation Management with Redux and Flutter)][Animation Management with Redux and Flutter]，来自 DartConf 2018 的视频，
  [以及 Medium 的配套文章 (Accompanying article on Medium)][Accompanying article on Medium]。

* [Flutter Redux package][]
  
  [Flutter Redux 依赖包][Flutter Redux package]

* [Redux Saga Middleware Dart and Flutter][], by Bilal Uslu

  [Dart 与 Flutter 中的 Redux 中间件 Saga][]，Bilal Uslu 著

* [Introduction to Redux in Flutter][], by Xavi Rigau
  
  [Flutter 中的 Redux 介绍][Introduction to Redux in Flutter]，
  Xavi Rigau 著。

* [Flutter + Redux&mdash;How to make a shopping list app][],
  by Paulina Szklarska on Hackernoon
  
  [Flutter + Redux&mdash;构建一个购物列表 APP (Flutter + Redux&mdash;How to make a shopping list app)][Flutter + Redux&mdash;How to make a shopping list app]，
  发布于 Hackernoon，Paulina Szklarska 著。

* [Building a TODO application (CRUD) in Flutter with Redux&mdash;Part 1][],
  a video by Tensor Programming
  
  [用 Flutter Redux 构建一个任务应用 (CRUD) &mdash;第一部分 (Building a TODO application (CRUD) in Flutter with Redux&mdash;Part 1)][Building a TODO application (CRUD) in Flutter with Redux&mdash;Part 1]，由 Tensor Programming 制作的视频。

* [Flutter Redux Thunk, an example][], by Jack Wong
  
  [Flutter Redux Thunk 示例 (Flutter Redux Thunk, an example)][Flutter Redux Thunk, an example]，Jack Wong 著。

* [Building a (large) Flutter app with Redux][], by Hillel Coren
  
  [使用 Redux 构建（大型）Flutter 应用 (Building a (large) Flutter app with Redux)][Building a (large) Flutter app with Redux]，Hillel Coren 著。

* [Fish-Redux–An assembled flutter application framework based on Redux][],
  by Alibaba
  
  [Fish-Redux&mdash;基于 Redux 封装的 Flutter 应用框架 (Fish-Redux–An assembled flutter application framework based on Redux)][Fish-Redux–An assembled flutter application framework based on Redux]，阿里巴巴著。

* [Async Redux–Redux without boilerplate. Allows for both sync and async reducers][],
  by Marcelo Glasberg
  
  [异步 Redux&mdash;没有模板的 Redux，允许同步和异步 reducers (Async Redux–Redux without boilerplate. Allows for both sync and async reducers)][Async Redux–Redux without boilerplate. Allows for both sync and async reducers]，Marcelo Glasberg 著。

* [Flutter meets Redux: The Redux way of managing Flutter applications state][],
  by Amir Ghezelbash
* [Redux and epics for better-organized code in Flutter apps][], by Nihad Delic
  
  [当 Flutter 遇见 Redux：以 Redux 的风格管理 Flutter 应用的状态 (Flutter meets Redux: The Redux way of managing Flutter applications state)][Flutter meets Redux: The Redux way of managing Flutter applications state]，Amir Ghezelbash 著。

## Fish-Redux

Fish Redux is an assembled flutter application framework based on Redux state management. 
It is suitable for building medium and large applications.

Fish Redux 是一个基于 Redux 状态管理的组合式 Flutter 应用框架，
适用于构建中型和大型应用。

* [Fish-Redux-Library][] package, by Alibaba

  由阿里巴巴开发的 [Fish-Redux-Library][] package
  
* [Fish-Redux-Source][], project code

  [Fish-Redux-Source][]，工程代码
  
* [Flutter-Movie][] - Non-trivial example demonstrating how to use Fish Redux,
with more than 30 screens, graphql, payment api and media player.

  [Flutter-Movie][] 展示如何使用 Fish Redux 的简单示例应用，
  包含 30 多个页面、graphql、支付 api 和媒体播放器等。

## BLoC / Rx

A family of stream/observable based patterns. 

基于流/观察者模式的系列。

* [Architect your Flutter project using BLoC pattern][],
  by Sagar Suri
  
  [使用 BLoC 模式构建你的 Flutter 项目][Architect your Flutter project using BLoC pattern]，
  Sagar Suri 著。

* [BloC Library][], by Felix Angelov
  
  [BLoC 库 (BLoC Library)][BloC Library]，Felix Angelov 著。

* [Reactive Programming - Streams - BLoC - Practical Use Cases][],
  by Didier Boelens
  
  [响应式编程 - 流 - BLoC - 用例 (Reactive Programming - Streams - BLoC - Practical Use Cases)][Reactive Programming - Streams - BLoC - Practical Use Cases]，
  Didier Boelens 著。

## GetIt

A service locator based state management approach that doesn't need a `BuildContext`.

* [GetIt package][], the service locator. It can also be used together with BloCs.
* [GetIt Mixin package][], a mixin that completes `GetIt` to a full state management solution.
* [GetIt Hooks package][], same as the mixin in case you already use `flutter_hooks`.
* [Flutter state management for minimalists][], by Suragch

## MobX

A popular library based on observables and reactions.

一个基于观察及响应的状态管理常用库。

* [MobX.dart, Hassle free state-management for your Dart and Flutter apps][]
  
  [MobX.dart 轻松管理你的 Dart 及 Flutter 应用状态 (MobX.dart, Hassle free state-management for your Dart and Flutter apps)][MobX.dart, Hassle free state-management for your Dart and Flutter apps]

* [Getting started with MobX.dart][]
  
  [开始使用 MobX.dart (Getting started with MobX.dart)][Getting started with MobX.dart]

* [Flutter: State Management with Mobx][], a video by Paul Halliday
  
  [Flutter：使用 MobX 进行状态管理 (Flutter: State Management with Mobx)][Flutter: State Management with Mobx]

## Flutter Commands

Reactive state management that uses the Command Pattern and is based on `ValueNotifiers`. Best in combination with [GetIt](#getit), but can be used with `Provider` or other locators too.

基于 `ValueNotifiers` 的命令式的状态管理，能与 [GetIt](#getit) 完美结合使用，
也可以与 `Provider` 或者其他 locators 配合使用。

* [Flutter Command package][] 
* [RxCommand package][], 基于 `Stream` 的实现.

## Binder

A state management package that uses `InheritedWidget` at its core. Inspired in part by recoil. This package promotes the separation of concerns.

一个使用 `InheritedWidget` 作为核心实现的状态管理库。受到 recoil 的启发，该库提供了分治的解决方式。

* [Binder package][] 

  [Binder 包][Binder package]

* [Binder examples][]

  [Binder 样例][Binder examples]

* [Binder snippets][], vscode snippets to be even more productive with Binder

  [Binder snippets][] 是一个 vscode 插件，能够将代码拆分以获得更高的生产力

## GetX

A simplified reactive state management solution.

一个简单的响应式状态管理解决方案。

* [GetX package][]
* [Complete GetX State Management][], a video by Tadas Petra
* [GetX Flutter Firebase Auth Example][], by Jeff McMorris

## Riverpod

An approach similar to Provider that is compile-safe and testable. It doesn't have a dependency on the Flutter SDK.

一个编译安全，测试步骤简单的类似于 Provider 的解决方案。且它不依赖于 Flutter SDK。

* [Riverpod][] homepage
* [Getting started with Riverpod][]

[Getting started with Riverpod]: https://riverpod.dev/docs/getting_started
[Riverpod]: https://riverpod.dev/
[Flutter-Movie]: {{site.github}}/o1298098/Flutter-Movie
[Fish-Redux-Source]: {{site.github}}/alibaba/fish-redux
[Fish-Redux-Library]: {{site.pub-pkg}}/fish_redux
[Adding interactivity to your Flutter app]: /docs/development/ui/interactive
[accompanying article]: {{site.flutter-medium}}/build-reactive-mobile-apps-in-flutter-companion-article-13950959e381
[Accompanying article on Medium]: {{site.flutter-medium}}/animation-management-with-flutter-and-flux-redux-94729e6585fa
[Animation Management with Redux and Flutter]: https://www.youtube.com/watch?v=9ZkLtr0Fbgk
[Architect your Flutter project using BLoC pattern]: {{site.medium}}/flutterpub/architecting-your-flutter-project-bd04e144a8f1
[Async Redux–Redux without boilerplate. Allows for both sync and async reducers]: {{site.pub}}/packages/async_redux
[Basic state management in Google Flutter]: {{site.medium}}/@agungsurya/basic-state-management-in-google-flutter-6ee73608f96d
[Flutter meets Redux: The Redux way of managing Flutter applications state]: https://medium.com/@thisisamir98/flutter-meets-redux-the-redux-way-of-managing-flutter-applications-state-f60ef693b509
[BloC Library]: https://felangel.github.io/bloc
[Building a (large) Flutter app with Redux]: https://hillelcoren.com/2018/06/01/building-a-large-flutter-app-with-redux/
[Building a TODO application (CRUD) in Flutter with Redux&mdash;Part 1]: https://www.youtube.com/watch?v=Wj216eSBBWs
[Complete GetX State Management]: https://www.youtube.com/watch?v=CNpXbeI_slw
[Fish-Redux–An assembled flutter application framework based on Redux]: {{site.github}}/alibaba/fish-redux/
[Flutter Architecture Samples]: https://fluttersamples.com/
[Flutter: State Management with Mobx]: https://www.youtube.com/watch?v=p-MUBLOEkCs
[Flutter Redux package]: {{site.pub-pkg}}/flutter_redux
[Redux Saga Middleware Dart and Flutter]: {{site.pub-pkg}}/redux_saga
[Flutter Redux Thunk, an example]: {{site.medium}}/flutterpub/flutter-redux-thunk-27c2f2b80a3b
[Flutter + Redux&mdash;How to make a shopping list app]: https://hackernoon.com/flutter-redux-how-to-make-shopping-list-app-1cd315e79b65
[Getting started with MobX.dart]: https://mobx.netlify.com/getting-started
[GetX Flutter Firebase Auth Example]: {{site.medium}}/@jeffmcmorris/getx-flutter-firebase-auth-example-b383c1dd1de2
[InheritedWidget docs]: {{site.api}}/flutter/widgets/InheritedWidget-class.html
[Inheriting Widgets]: {{site.medium}}/@mehmetf_71205/inheriting-widgets-b7ac56dbbeb1
[Introduction to Redux in Flutter]: https://blog.novoda.com/introduction-to-redux-in-flutter/
[Introduction to state management]: /docs/development/data-and-backend/state-mgmt/intro
[Making sense of all those Flutter Providers]: {{site.medium}}/flutter-community/making-sense-all-of-those-flutter-providers-e842e18f45dd?sk=7859a73fac0ca414a0e911b0322e8589
[Managing Flutter Application State With InheritedWidgets]: {{site.flutter-medium}}/managing-flutter-application-state-with-inheritedwidgets-1140452befe1
[MobX.dart, Hassle free state-management for your Dart and Flutter apps]: {{site.github}}/mobxjs/mobx.dart
[Pragmatic State Management in Flutter]: https://www.youtube.com/watch?v=d_m5csmrf7I
[Provider package]: {{site.pub-pkg}}/provider
[GetX package]: {{site.pub-pkg}}/get
[Reactive Programming - Streams - BLoC - Practical Use Cases]: https://www.didierboelens.com/2018/12/reactive-programming---streams---bloc---practical-use-cases
[Simple app state management]: /docs/development/data-and-backend/state-mgmt/simple
[Using Flutter Inherited Widgets Effectively]: https://ericwindmill.com/articles/inherited_widget/
[Widget - State - Context - InheritedWidget]: https://www.didierboelens.com/2018/06/widget---state---context---inheritedwidget/
[You might not need Redux: The Flutter edition]: https://proandroiddev.com/you-might-not-need-redux-the-flutter-edition-9c11eba006d7
[Redux and epics for better-organized code in Flutter apps]: {{site.medium}}/upday-devs/reduce-duplication-achieve-flexibility-means-success-for-the-flutter-app-e5e432839e61
[GetIt package]: https://pub.dev/packages/get_it
[GetIt Hooks package]: https://pub.dev/packages/get_it_hooks
[GetIt Mixin package]: https://pub.dev/packages/get_it_mixin
[Flutter state management for minimalists]: {{site.medium}}/flutter-community/flutter-state-management-for-minimalists-4c71a2f2f0c1?sk=6f9cedfb550ca9cc7f88317e2e7055a0
[Flutter Command package]: https://pub.dev/packages/flutter_command
[RxCommand package]: https://pub.dev/packages/rx_command
[Binder package]: https://pub.dev/packages/binder
[Binder examples]: https://github.com/letsar/binder/tree/main/examples
[Binder snippets]: https://marketplace.visualstudio.com/items?itemName=romain-rastel.flutter-binder-snippets
