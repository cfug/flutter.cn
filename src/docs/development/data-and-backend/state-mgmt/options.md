---
title: List of state management approaches
title: 状态 (State) 管理参考
description: A list of different approaches to managing state.
description: 通过不同的方式来进行状态管理。
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
  
  [当 Flutter 遇见 Redux：以 Redux 的风格管理 Flutter 应用的状态 (Flutter meets Redux: The Redux way of managing Flutter applications state)][Flutter meets Redux: The Redux way of managing Flutter applications state]，Amir Ghezelbash 著。


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

## MobX

A popular library based on observables and reactions.

一个基于观察及响应的状态管理常用库。

* [MobX.dart, Hassle free state-management for your Dart and Flutter apps][]
  
  [MobX.dart 轻松管理你的 Dart 及 Flutter 应用状态 (MobX.dart, Hassle free state-management for your Dart and Flutter apps)][MobX.dart, Hassle free state-management for your Dart and Flutter apps]

* [Getting started with MobX.dart][]
  
  [开始使用 MobX.dart (Getting started with MobX.dart)][Getting started with MobX.dart]

* [Flutter: State Management with Mobx][], a video by Paul Halliday
  
  [Flutter：使用 MobX 进行状态管理 (Flutter: State Management with Mobx)][Flutter: State Management with Mobx]


[Adding interactivity to your Flutter app]: /docs/development/ui/interactive
[accompanying article]: {{site.flutter-medium}}/build-reactive-mobile-apps-in-flutter-companion-article-13950959e381
[Accompanying article on Medium]: {{site.flutter-medium}}/animation-management-with-flutter-and-flux-redux-94729e6585fa
[Animation Management with Redux and Flutter]: https://www.youtube.com/watch?v=9ZkLtr0Fbgk
[Architect your Flutter project using BLoC pattern]: {{site.medium}}/flutterpub/architecting-your-flutter-project-bd04e144a8f1
[Async Redux–Redux without boilerplate. Allows for both sync and async reducers]: {{site.pub}}/packages/async_redux/
[Basic state management in Google Flutter]: {{site.medium}}/@agungsurya/basic-state-management-in-google-flutter-6ee73608f96d
[Flutter meets Redux: The Redux way of managing Flutter applications state]: https://medium.com/@thisisamir98/flutter-meets-redux-the-redux-way-of-managing-flutter-applications-state-f60ef693b509
[BloC Library]: https://felangel.github.io/bloc
[Building a (large) Flutter app with Redux]: https://hillelcoren.com/2018/06/01/building-a-large-flutter-app-with-redux/
[Building a TODO application (CRUD) in Flutter with Redux&mdash;Part 1]: https://www.youtube.com/watch?v=Wj216eSBBWs
[Fish-Redux–An assembled flutter application framework based on Redux]: {{site.github}}/alibaba/fish-redux/
[Flutter Architecture Samples]: https://fluttersamples.com/
[Flutter: State Management with Mobx]: https://www.youtube.com/watch?v=p-MUBLOEkCs
[Flutter Redux package]: {{site.pub-pkg}}/flutter_redux
[Flutter Redux Thunk, an example]: {{site.medium}}/flutterpub/flutter-redux-thunk-27c2f2b80a3b
[Flutter + Redux&mdash;How to make a shopping list app]: https://hackernoon.com/flutter-redux-how-to-make-shopping-list-app-1cd315e79b65
[Getting started with MobX.dart]: https://mobx.netlify.com/getting-started
[InheritedWidget docs]: {{site.api}}/flutter/widgets/InheritedWidget-class.html
[Inheriting Widgets]: {{site.medium}}/@mehmetf_71205/inheriting-widgets-b7ac56dbbeb1
[Introduction to Redux in Flutter]: https://blog.novoda.com/introduction-to-redux-in-flutter/
[Introduction to state management]: /docs/development/data-and-backend/state-mgmt/intro
[Making sense of all those Flutter Providers]: {{site.medium}}/flutter-community/making-sense-all-of-those-flutter-providers-e842e18f45dd
[Managing Flutter Application State With InheritedWidgets]: {{site.flutter-medium}}/managing-flutter-application-state-with-inheritedwidgets-1140452befe1
[MobX.dart, Hassle free state-management for your Dart and Flutter apps]: {{site.github}}/mobxjs/mobx.dart
[Pragmatic State Management in Flutter]: https://www.youtube.com/watch?v=d_m5csmrf7I
[Provider package]: {{site.pub-pkg}}/provider
[Reactive Programming - Streams - BLoC - Practical Use Cases]: https://www.didierboelens.com/2018/12/reactive-programming---streams---bloc---practical-use-cases
[Simple app state management]: /docs/development/data-and-backend/state-mgmt/simple
[Using Flutter Inherited Widgets Effectively]: https://ericwindmill.com/articles/inherited_widget/
[Widget - State - Context - InheritedWidget]: https://www.didierboelens.com/2018/06/widget---state---context---inheritedwidget/
[You might not need Redux: The Flutter edition]: https://proandroiddev.com/you-might-not-need-redux-the-flutter-edition-9c11eba006d7