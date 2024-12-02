---
# title: List of state management approaches
title: 状态 (State) 管理参考
# description: A list of different approaches to managing state.
description: 通过不同的方式来进行状态管理。
tags: Flutter状态管理
keywords: 参考资料
prev:
  # title: Simple app state management
  title: 简单的共享 (app) 状态管理
  path: /data-and-backend/state-mgmt/simple
---

State management is a complex topic.
If you feel that some of your questions haven't been answered,
or that the approach described on these pages
is not viable for your use cases, you are probably right.

状态管理是一个相当复杂的话题。
如果你在浏览后发现一些问题并未得到解答，或者并不适用于你的具体需求场景，
自信些，你的实现就是对的。

Learn more at the following links,
many of which have been contributed by the Flutter community:

通过下面的链接了解更多的信息，
其中有很多信息都是由社区（第三方）提供。

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

## Provider

* [Simple app state management][], the previous page in this section

  [简易的应用状态管理 (Simple app state management)][Simple app state management]，
  这是本节内容的上篇。

* [Provider package][]

  [使用 Provider package][Provider package]

[Provider package]: {{site.pub-pkg}}/provider
[Simple app state management]: /data-and-backend/state-mgmt/simple

## Riverpod

Riverpod works in a similar fashion to Provider.
It offers compile safety and testing without depending on the Flutter SDK.

Riverpod 是另一个不错的选择，
它类似于 Provider，并且是编译安全和可测试的。
Riverpod 不依赖于 Flutter SDK。

* [Riverpod][] homepage

  [Riverpod][] 项目主页

* [Getting started with Riverpod][]

  [开始上手使用 Riverpod][Getting started with Riverpod]

[Getting started with Riverpod]: https://riverpod.dev/docs/introduction/getting_started
[Riverpod]: https://riverpod.dev/

## setState

The low-level approach to use for widget-specific, ephemeral state.

* [Adding interactivity to your Flutter app][], a Flutter tutorial

  [为你的 Flutter 应用添加交互 (Adding interactivity to your Flutter app)][Adding interactivity to your Flutter app]，
  一篇 Flutter 的教程。

* [Basic state management in Google Flutter][], by Agung Surya

  [Flutter 中的基础状态管理 (Basic state management in Google Flutter)][Basic state management in Google Flutter]，
  Agung Surya 著。

[Adding interactivity to your Flutter app]: /ui/interactivity
[Basic state management in Google Flutter]: {{site.medium}}/@agungsurya/basic-state-management-in-google-flutter-6ee73608f96d

## ValueNotifier &amp; InheritedNotifier

An approach using only Flutter provided tooling to update state and notify the UI of changes.


* [State Management using ValueNotifier and InheritedNotifier][], by Tadas Petra

[State Management using ValueNotifier and InheritedNotifier]: https://www.hungrimind.com/articles/flutter-state-management

## InheritedWidget &amp; InheritedModel

The low-level approach used to communicate between ancestors and children
in the widget tree. This is what `provider` and many other approaches
use under the hood.

Widget tree 中不同层级间的 widget 通信的基础方法。这是诸如 `provider` 等
众多方法的底层实现。

The following instructor-led video workshop covers how to
use `InheritedWidget`:

以下讲师指导的视频 workshop 介绍了如何使用 `InheritedWidget`：

<iframe width="560" height="315" src="{{site.bili.embed}}?aid=248744553&bvid=BV1Wv411W7yF&cid=354736130&page=1&autoplay=false" title="如何使用 inherited widget 管理应用状态" {{site.bili.set}}></iframe>

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
[Managing Flutter Application State With InheritedWidgets]: {{site.flutter-medium}}/managing-flutter-application-state-with-inheritedwidgets-1140452befe1
[Using Flutter Inherited Widgets Effectively]: https://ericwindmill.com/articles/inherited_widget/
[Widget - State - Context - InheritedWidget]: https://www.didierboelens.com/2018/06/widget---state---context---inheritedwidget/

## June

A lightweight and modern state management library that focuses on providing
a pattern similar to Flutter's built-in state management.

一个轻量级的现代状态管理库，
专注于提供与 Flutter 内置状态管理类似的模式。

* [june package][]

[june package]: {{site.pub-pkg}}/june

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

  [Dart 与 Flutter 中的 Redux 中间件 Saga][Redux Saga Middleware Dart and Flutter]，Bilal Uslu 著

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

* [Redux and epics for better-organized code in Flutter apps][], by Nihad Delic

  [使用 Redux 和 redux_epics 更好地管理 Flutter 代码 (Redux and epics for better-organized code in Flutter apps)][Redux and epics for better-organized code in Flutter apps]，Nihad Delic 著。

* [Flutter_Redux_Gen - VS Code Plugin to generate boiler plate code][], by Balamurugan Muthusamy (BalaDhruv)
* [Flutter Animations Studio][], by Gianluca Romeo

[Accompanying article on Medium]: {{site.flutter-medium}}/animation-management-with-flutter-and-flux-redux-94729e6585fa
[Animation Management with Redux and Flutter]: {{site.yt.watch}}?v=9ZkLtr0Fbgk
[Async Redux–Redux without boilerplate. Allows for both sync and async reducers]: {{site.pub}}/packages/async_redux
[Building a (large) Flutter app with Redux]: https://hillelcoren.com/2018/06/01/building-a-large-flutter-app-with-redux/
[Building a TODO application (CRUD) in Flutter with Redux&mdash;Part 1]: {{site.yt.watch}}?v=Wj216eSBBWs
[Fish-Redux–An assembled flutter application framework based on Redux]: {{site.github}}/alibaba/fish-redux/
[Flutter Redux Thunk, an example]: {{site.medium}}/flutterpub/flutter-redux-thunk-27c2f2b80a3b
[Flutter meets Redux: The Redux way of managing Flutter applications state]: {{site.medium}}/@thisisamir98/flutter-meets-redux-the-redux-way-of-managing-flutter-applications-state-f60ef693b509
[Flutter Redux package]: {{site.pub-pkg}}/flutter_redux
[Flutter + Redux&mdash;How to make a shopping list app]: https://hackernoon.com/flutter-redux-how-to-make-shopping-list-app-1cd315e79b65
[Introduction to Redux in Flutter]: https://blog.novoda.com/introduction-to-redux-in-flutter/
[Redux and epics for better-organized code in Flutter apps]: {{site.medium}}/upday-devs/reduce-duplication-achieve-flexibility-means-success-for-the-flutter-app-e5e432839e61
[Redux Saga Middleware Dart and Flutter]: {{site.pub-pkg}}/redux_saga
[Flutter_Redux_Gen - VS Code Plugin to generate boiler plate code]: https://marketplace.visualstudio.com/items?itemName=BalaDhruv.flutter-redux-gen
[Flutter Animations Studio]: {{site.github}}/gianlucaromeo/flutter-animations-studio

## Fish-Redux

Fish Redux is an assembled flutter application framework
based on Redux state management.
It is suitable for building medium and large applications.

Fish Redux 是一个基于 Redux 状态管理的组合式 Flutter 应用框架，
适用于构建中型和大型应用。

* [Fish-Redux-Library][] package, by Alibaba

  由阿里巴巴开发的 [Fish-Redux-Library][] package

* [Fish-Redux-Source][], project code

  [Fish-Redux-Source][]，工程代码

* [Flutter-Movie][], A non-trivial example demonstrating how
  to use Fish Redux, with more than 30 screens, graphql,
  payment api, and media player.

  [Flutter-Movie][] 展示如何使用 Fish Redux 的简单示例应用，
  包含 30 多个页面、graphql、支付 api 和媒体播放器等。

[Fish-Redux-Library]: {{site.pub-pkg}}/fish_redux
[Fish-Redux-Source]: {{site.github}}/alibaba/fish-redux
[Flutter-Movie]: {{site.github}}/o1298098/Flutter-Movie

## BLoC / Rx

A family of stream/observable based patterns.

基于流/观察者模式的系列。

* [Architect your Flutter project using BLoC pattern][],
  by Sagar Suri

  [使用 BLoC 模式构建你的 Flutter 项目 (Architect your Flutter project using BLoC pattern)][Architect your Flutter project using BLoC pattern]，
  Sagar Suri 著。

* [BloC Library][], by Felix Angelov

  [BLoC 库 (BLoC Library)][BloC Library]，Felix Angelov 著。

* [Reactive Programming - Streams - BLoC - Practical Use Cases][],
  by Didier Boelens

  [响应式编程 - 流 - BLoC - 用例 (Reactive Programming - Streams - BLoC - Practical Use Cases)][Reactive Programming - Streams - BLoC - Practical Use Cases]，
  Didier Boelens 著。

[Architect your Flutter project using BLoC pattern]: {{site.medium}}/flutterpub/architecting-your-flutter-project-bd04e144a8f1
[BloC Library]: https://felangel.github.io/bloc
[Reactive Programming - Streams - BLoC - Practical Use Cases]: https://www.didierboelens.com/2018/12/reactive-programming---streams---bloc---practical-use-cases

## GetIt

A service locator based state management approach that
doesn't need a `BuildContext`.

* [GetIt package][], the service locator.
  It can also be used together with BloCs.
* [GetIt Mixin package][], a mixin that completes
  `GetIt` to a full state management solution.
* [GetIt Hooks package][], same as the mixin in
  case you already use `flutter_hooks`.
* [Flutter state management for minimalists][], by Suragch

:::note
To learn more, watch this short Package of the Week video on the GetIt package:

{% ytEmbed 'f9XQD5mf6FY', 'get_it | Flutter package of the week', true %}
:::

[Flutter state management for minimalists]: {{site.medium}}/flutter-community/flutter-state-management-for-minimalists-4c71a2f2f0c1?sk=6f9cedfb550ca9cc7f88317e2e7055a0
[GetIt package]: {{site.pub-pkg}}/get_it
[GetIt Hooks package]: {{site.pub-pkg}}/get_it_hooks
[GetIt Mixin package]: {{site.pub-pkg}}/get_it_mixin

## MobX

A popular library based on observables and reactions.

一个基于观察及响应的状态管理常用库。

* [MobX.dart, Hassle free state-management for your Dart and Flutter apps][]

  [MobX.dart 轻松管理你的 Dart 及 Flutter 应用状态 (MobX.dart, Hassle free state-management for your Dart and Flutter apps)][MobX.dart, Hassle free state-management for your Dart and Flutter apps]

* [Getting started with MobX.dart][]

  [开始使用 MobX.dart (Getting started with MobX.dart)][Getting started with MobX.dart]

* [Flutter: State Management with Mobx][], a video by Paul Halliday

  [Flutter：使用 MobX 进行状态管理 (Flutter: State Management with Mobx)][Flutter: State Management with Mobx]

[Flutter: State Management with Mobx]: {{site.bili.video}}/BV1Gt411K7JD/
[Getting started with MobX.dart]: https://mobx.netlify.app/getting-started
[MobX.dart, Hassle free state-management for your Dart and Flutter apps]: {{site.github}}/mobxjs/mobx.dart

## Dart Board

A modular feature management framework for Flutter.
Dart Board is designed to help encapsulate and isolate
features, including examples/frameworks,
small kernel, and many ready-to-use decoupled features
such as debugging, logging, auth, redux, locator,
particle system and more.

* [Dart Board Homepage + Demos](https://dart-board.io/)
* [Dart Board on pub.dev]({{site.pub-pkg}}/dart_board_core)
* [dart_board on GitHub]({{site.github}}/ahammer/dart_board)
* [Getting started with Dart Board]({{site.github}}/ahammer/dart_board/blob/master/GETTING_STARTED.md)

## Flutter Commands

Reactive state management that uses the Command Pattern
and is based on `ValueNotifiers`. Best in combination with
[GetIt](#getit), but can be used with `Provider` or other
locators too.

基于 `ValueNotifiers` 的命令式的状态管理，能与 [GetIt](#getit) 完美结合使用，
也可以与 `Provider` 或者其他 locators 配合使用。

* [Flutter Command package][]
* [RxCommand package][], `Stream` based implementation.

[Flutter Command package]: {{site.pub-pkg}}/flutter_command
[RxCommand package]: {{site.pub-pkg}}/rx_command

## Binder

A state management package that uses `InheritedWidget`
at its core. Inspired in part by recoil.
This package promotes the separation of concerns.

一个使用 `InheritedWidget` 作为核心实现的状态管理库。受到 recoil 的启发，该库提供了分治的解决方式。

* [Binder package][]
* [Binder examples][]

  [Binder 样例][Binder examples]

* [Binder snippets][], vscode snippets to be even more
  productive with Binder

  [Binder snippets][] 是一个 vscode 插件，能够将代码拆分以获得更高的生产力

[Binder examples]: {{site.github}}/letsar/binder/tree/main/examples
[Binder package]: {{site.pub-pkg}}/binder
[Binder snippets]: https://marketplace.visualstudio.com/items?itemName=romain-rastel.flutter-binder-snippets

## GetX

A simplified reactive state management solution.

一个简单的响应式状态管理解决方案。

* [GetX package][]
* [GetX Flutter Firebase Auth Example][], by Jeff McMorris

[GetX package]: {{site.pub-pkg}}/get
[GetX Flutter Firebase Auth Example]: {{site.medium}}/@jeffmcmorris/getx-flutter-firebase-auth-example-b383c1dd1de2

## states_rebuilder

An approach that combines state management with a
dependency injection solution and an integrated router.
For more information, see the following info:

一种将状态管理与依赖注入解决方案和集成路由器相结合的方法。
更多信息，请参阅以下信息：

* [States Rebuilder][] project code

  [States Rebuilder][] 项目代码

* [States Rebuilder documentation][]

[States Rebuilder]: {{site.github}}/GIfatahTH/states_rebuilder
[States Rebuilder documentation]: {{site.github}}/GIfatahTH/states_rebuilder/wiki

## Triple Pattern (Segmented State Pattern)

Triple is a pattern for state management that uses `Streams` or `ValueNotifier`.
This mechanism (nicknamed _triple_ because the stream always uses three
values: `Error`, `Loading`, and `State`), is based on the
[Segmented State pattern][].

For more information, refer to the following resources:

* [Triple documentation][]
* [Flutter Triple package][]
* [Triple Pattern: A new pattern for state management in Flutter][]
  (blog post written in Portuguese but can be auto-translated)
* [VIDEO: Flutter Triple Pattern by Kevlin Ossada][] (recorded in English)

[Triple documentation]: https://triple.flutterando.com.br/
[Flutter Triple package]: {{site.pub-pkg}}/flutter_triple
[Segmented State pattern]: https://triple.flutterando.com.br/docs/intro/overview#-segmented-state-pattern-ssp
[Triple Pattern: A new pattern for state management in Flutter]: https://blog.flutterando.com.br/triple-pattern-um-novo-padr%C3%A3o-para-ger%C3%AAncia-de-estado-no-flutter-2e693a0f4c3e
[VIDEO: Flutter Triple Pattern by Kevlin Ossada]: {{site.yt.watch}}?v=dXc3tR15AoA

## solidart

A simple but powerful state management solution inspired by SolidJS.

* [Official Documentation][]
* [solidart package][]
* [flutter_solidart package][]

[Official Documentation]: https://docs.page/nank1ro/solidart
[solidart package]: {{site.pub-pkg}}/solidart
[flutter_solidart package]: {{site.pub-pkg}}/flutter_solidart

## flutter_reactive_value

The `flutter_reactive_value` library might offer the least complex solution for state
management in Flutter. It might help Flutter newcomers add reactivity to their UI,
without the complexity of the mechanisms described before.
The `flutter_reactive_value` library defines the `reactiveValue(BuildContext)`
extension method on `ValueNotifier`. This extension allows a `Widget` to
fetch the current value of the `ValueNotifier` and
subscribe the `Widget` to changes in the value of the `ValueNotifier`.
If the value of the `ValueNotifier` changes, `Widget` rebuilds.

* [`flutter_reactive_value`][] source and documentation

[`flutter_reactive_value`]: {{site.github}}/lukehutch/flutter_reactive_value

## Elementary

Elementary is a simple and reliable way to build applications with MVVM in Flutter.
It offers a pure Flutter experience with clear code separation by responsibilities,
efficient rebuilds, easy testability, and enhancing team productivity.

* [Elementary Documentation][]
* [Elementary Repository][]
* [Elementary package][]

[Elementary Documentation]: https://documentation.elementaryteam.dev/
[Elementary Repository]: {{site.github}}/Elementary-team/flutter-elementary
[Elementary package]: {{site.pub-pkg}}/elementary
