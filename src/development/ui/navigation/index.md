---
title: Navigation and routing
title: 路由和导航
Description: Articles and cookbook recipes that address screen navigation.
Description: 关于路由和导航的一些教程文章等。
tags: 用户界面,Flutter UI,布局
keywords: 路由和导航
---

Flutter has an imperative routing mechanism, the `Navigator` widget,
and a more idiomatic declarative routing mechanism (which is similar to
build methods as used with widgets), the `Router` widget.

Flutter 有一个命令式路由机制，即 `Navigator` 组件，
还有一个更为惯用的声明式路由机制（类似于 widget 中使用的 build 方法），即 `Route` 组件。

The two systems can be used together (indeed, the declarative system
is built using the imperative system).

这两个系统可以一起使用（事实上，声明式系统是使用命令式系统构建的）。

Typically, small applications are served well by just using the
`Navigator` API, via the `MaterialApp` constructor's
[`MaterialApp.routes`][] property.

通常，只需通过 `MaterialApp` 构造函数中的 [`MaterialApp.routes`][] 属性使用 `Navigator` API，
就可以很好地为小型应用程序提供服务。

To learn about `Navigator` and its imperative API, see the
[Navigation recipes][] in the [Flutter cookbook][], and the
[`Navigator`][] API docs.

要了解 `Navigator` 及其命令式 API，
参阅 [Flutter 教程][Flutter cookbook] 中的 [Navigator 教程][Navigation recipes] 和 [`Navigator`][] API 文档。

More elaborate applications are usually better served by the `Router`
API, via the [`MaterialApp.router`] constructor. This requires some
more up-front work to describe how to parse deep links for your
application and how to map the application state to the set of active
pages, but is more expressive on the long run.

通过 [`MaterialApp.router`] 构造函数，`Router` API 可以更好地为复杂应用程序服务。
这需要更多的前期工作来描述如何解析应用程序的路由（link），
以及如何将应用程序的状态映射到页面集合，但从长远来看更具表现力。

To learn about `Router` and the declarative approach, see [Learning
Flutter’s new navigation and routing system][], and the [`Router`][]
API docs.

要了解 `Router` 和声明式方法，参阅 [学习 Flutter 的新导航和路由系统][Learning Flutter’s new navigation and routing system] 
和 [`Router`][] API 文档。

[Flutter cookbook]: {{site.url}}/cookbook
[Learning Flutter’s new navigation and routing system]: {{site.flutter-medium}}/learning-flutters-new-navigation-and-routing-system-7c9068155ade
[Navigation recipes]: {{site.url}}/cookbook/navigation
[`Navigator`]: {{site.api}}/flutter/widgets/Navigator-class.html
[`Router`]: {{site.api}}/flutter/widgets/Router-class.html
[`MaterialApp.routes`]: {{site.api}}/flutter/material/MaterialApp/routes.html
[`MaterialApp.router`]: {{site.api}}/flutter/material/MaterialApp/MaterialApp.router.html
