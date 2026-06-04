---
# title: Navigation and routing
title: 路由和导航
# description: Overview of Flutter's navigation and routing features
description: Flutter路由和导航的概览。
tags: 用户界面,Flutter UI,布局
keywords: 路由和导航
ai-translated: true
---

Flutter provides a complete system for navigating between screens and handling
deep links. Small applications without complex deep linking can use
[`Navigator`][], while apps with specific deep linking and navigation
requirements should also use the [`Router`][] to correctly handle deep links on
Android and iOS, and to stay in sync with the address bar when the app is
running on the web.

Flutter 提供了一套完整的系统在界面之间导航并处理深层链接。没有复杂深层链接的小型应用可以使用 [`Navigator`][]，而有特定深层链接与导航需求的应用还应使用 [`Router`][]，以便在 Android 和 iOS 上正确处理深层链接，并在 Web 上运行时与地址栏保持同步。

To configure your Android or iOS application to handle deep links, see
[Deep linking][].

要为 Android 或 iOS 应用配置深层链接处理，请参阅[深层链接][Deep linking]。

## Using the Navigator

## 使用 Navigator

The `Navigator` widget displays screens as a stack using the correct transition
animations for the target platform. To navigate to a new screen, access the
`Navigator` through the route's `BuildContext` and call imperative methods such
as `push()` `or pop()`:

`Navigator` widget 以栈的形式显示界面，并使用目标平台对应的过渡动画。要导航到新界面，通过路由的 `BuildContext` 访问 `Navigator`，并调用 `push()` 或 `pop()` 等命令式方法：

<?code-excerpt "ui/navigation/lib/navigator_basic.dart (push-route)"?>
```dart
child: const Text('Open second screen'),
onPressed: () {
  Navigator.of(context).push(
    MaterialPageRoute<void>(
      builder: (context) => const SecondScreen(),
    ),
  );
},
```

Because `Navigator` keeps a stack of `Route` objects (representing the history
stack), The `push()` method also takes a `Route` object. The `MaterialPageRoute`
object is a subclass of `Route` that specifies the transition animations for
Material Design. For more examples of how to use the `Navigator`, follow the
[navigation recipes][] from the Flutter Cookbook or
visit the [Navigator API documentation][`Navigator`].

由于 `Navigator` 维护 `Route` 对象栈（表示历史栈），`push()` 方法也需要传入 `Route` 对象。`MaterialPageRoute` 是 `Route` 的子类，用于指定 Material Design 的过渡动画。更多 `Navigator` 用法示例，请参阅 Flutter Cookbook 中的[导航示例][navigation recipes]，或访问 [Navigator API 文档][`Navigator`]。

## Using named routes

## 使用命名路由

:::note
We don't recommend using named routes for most applications.
Instead, use [go_router][] (or another routing package) or
use `Navigator` with [`MaterialPageRoute`][].
For more information, see the [Limitations](#limitations) section.
:::

:::note
我们不建议大多数应用使用命名路由。
请改用 [go_router][]（或其他路由 package），
或将 `Navigator` 与 [`MaterialPageRoute`][] 配合使用。
更多信息请参阅[局限性](#limitations)一节。
:::

Applications with simple navigation and deep linking requirements can use the
`Navigator` for navigation and the [`MaterialApp.routes`][] parameter for deep
links:

导航与深层链接需求较简单的应用，可用 `Navigator` 进行导航，并用 [`MaterialApp.routes`][] 参数处理深层链接：

<?code-excerpt "ui/navigation/lib/navigator_named_routes.dart (push-route)"?>
```dart
child: const Text('Open second screen'),
onPressed: () {
  Navigator.pushNamed(context, '/second');
},
```

`/second` represents a _named route_ that was declared in the
`MaterialApp.routes` list. For a complete example, follow the
[Navigate with named routes][] recipe from the Flutter Cookbook.

`/second` 表示在 `MaterialApp.routes` 列表中声明的*命名路由*。完整示例请参阅 Flutter Cookbook 中的[使用命名路由导航][Navigate with named routes]。

### Limitations {: #limitations}

### 局限性 {: #limitations}

Although named routes can handle deep links, the behavior is always the same and
can't be customized. When a new deep link is received by the platform, Flutter
pushes a new `Route` onto the Navigator regardless of where the user currently is.

尽管命名路由可以处理深层链接，但行为始终相同且无法自定义。当平台收到新的深层链接时，无论用户当前在何处，Flutter 都会在 `Navigator` 上压入新的 `Route`。

Flutter also doesn't support the browser forward button for applications using
named routes. For these reasons, we don't recommend using named routes in most
applications. Instead, use a routing package like [go_router][] or
use `Navigator` with [`MaterialPageRoute`][].

使用命名路由的应用也不支持浏览器的前进按钮。因此，我们不建议大多数应用使用命名路由。请改用 [go_router][] 等路由 package，或将 `Navigator` 与 [`MaterialPageRoute`][] 配合使用。

## Using the Router

## 使用 Router

Flutter applications with advanced navigation and routing requirements (such as
a web app that uses direct links to each screen, or an app with multiple
`Navigator` widgets) should use a routing package such as [go_router][] that can
parse the route path and configure the `Navigator` whenever the app receives a
new deep link.

具有高级导航与路由需求（例如 Web 应用为每个界面提供直接链接，或应用包含多个 `Navigator` widget）的 Flutter 应用，应使用 [go_router][] 等路由 package，以便解析路由路径，并在收到新深层链接时配置 `Navigator`。

To use the Router, switch to the `router` constructor on `MaterialApp` or
`CupertinoApp` and provide it with a `Router` configuration. Routing packages,
such as [go_router][], typically provide route configuration and routes
can be used as follows:

要使用 Router，请在 `MaterialApp` 或 `CupertinoApp` 上改用 `router` 构造函数，并提供 `Router` 配置。[go_router][] 等路由 package 通常提供路由配置，可按如下方式使用路由：

<?code-excerpt "ui/navigation/lib/navigator_router.dart (push-route)"?>
```dart
child: const Text('Open second screen'),
onPressed: () => context.go('/second'),
```

Because packages like go_router are _declarative_, they will always display the
same screen(s) when a deep link is received.

由于 go_router 等 package 是*声明式*的，收到深层链接时始终会显示相同的界面。

:::note Note for advanced developers
If you prefer not to use a routing package
and would like full control over navigation and routing in your app, override
`RouteInformationParser` and `RouterDelegate`. When the state in your app
changes, you can precisely control the stack of screens by providing a list of
`Page` objects using the `Navigator.pages` parameter. For more details, see the
`Router` API documentation.
:::

:::note 面向高级开发者
若不想使用路由 package，而希望对应用中的导航与路由完全控制，可重写 `RouteInformationParser` 和 `RouterDelegate`。当应用状态变化时，可通过 `Navigator.pages` 参数提供 `Page` 对象列表，精确控制界面栈。更多细节请参阅 `Router` API 文档。
:::

## Using Router and Navigator together

## 同时使用 Router 与 Navigator

The `Router` and `Navigator` are designed to work together. You can navigate
using the `Router` API through a declarative routing package, such as
`go_router`, or by calling imperative methods such as `push()` and `pop()` on
the `Navigator`.

`Router` 与 `Navigator` 设计为协同工作。你可以通过声明式路由 package（如 `go_router`）使用 `Router` API 导航，也可以在 `Navigator` 上调用 `push()`、`pop()` 等命令式方法。

When you navigate using the `Router` or a declarative routing package, each
route on the Navigator is _page-backed_, meaning it was created from a
[`Page`][] using the [`pages`][]
argument on the `Navigator` constructor. Conversely, any `Route`
created by calling `Navigator.push` or `showDialog` will add a _pageless_
route to the Navigator. If you are using a routing package, Routes that are
_page-backed_ are always deep-linkable, whereas _pageless_ routes
are not.

使用 `Router` 或声明式路由 package 导航时，`Navigator` 上的每条路由都是*由 Page 支持*（page-backed）的，即通过 `Navigator` 构造函数的 [`pages`][] 参数由 [`Page`][] 创建。反之，通过 `Navigator.push` 或 `showDialog` 创建的 `Route` 会向 `Navigator` 添加*无 Page*（pageless）路由。若使用路由 package，*由 Page 支持*的路由始终可深层链接，而*无 Page* 的路由则不行。

When a _page-backed_ `Route` is removed from the `Navigator`, all of the
_pageless_ routes after it are also removed. For example, if a deep link
navigates by removing a _page-backed_ route from the Navigator, all _pageless_
routes after (up until the next _page-backed_ route) are removed too.

当从 `Navigator` 移除*由 Page 支持*的 `Route` 时，其后的所有*无 Page* 路由也会一并移除。例如，若深层链接通过从 `Navigator` 移除*由 Page 支持*的路由进行导航，其后（直到下一条*由 Page 支持*的路由之前）的所有*无 Page* 路由也会被移除。

:::note
You can't prevent navigation from page-backed screens using `WillPopScope`.
Instead, you should consult your routing package's API documentation.
:::

:::note
你无法使用 `WillPopScope` 阻止由 Page 支持的界面的导航。
请查阅你所用路由 package 的 API 文档。
:::

## Web support

## Web 支持

Apps using the `Router` class integrate with the browser History API to provide
a consistent experience when using the browser's back and forward buttons.
Whenever you navigate using the `Router`, a History API entry is added to the
browser's history stack. Pressing the **back** button uses _[reverse
chronological navigation][]_, meaning that the user is taken to the previously
visited location that was shown using the `Router`. This means that if the user
pops a page from the `Navigator` and then presses the browser **back** button
the previous page is pushed back onto the stack.

使用 `Router` 类的应用会与浏览器 History API 集成，在使用浏览器后退与前进按钮时提供一致的体验。每当你通过 `Router` 导航，都会在浏览器历史栈中添加一条 History API 记录。按下**后退**按钮会使用*[逆时间顺序导航][reverse chronological navigation]*，即用户会回到先前通过 `Router` 显示的访问位置。这意味着若用户从 `Navigator` 弹出页面后再按浏览器**后退**按钮，先前的页面会重新压入栈中。

## More information

## 更多信息

For more information on navigation and routing, check out the following
resources:

有关导航与路由的更多信息，请参阅以下资源：

* The Flutter cookbook includes multiple [navigation recipes][] that show how to
  use the `Navigator`.
* Flutter Cookbook 包含多个[导航示例][navigation recipes]，展示如何使用 `Navigator`。
* The [`Navigator`][] and [`Router`][] API documentation contain details on how
  to set up declarative navigation without a routing package.
* [`Navigator`][] 与 [`Router`][] API 文档说明如何在不使用路由 package 的情况下设置声明式导航。
* [Understanding navigation][], a page from the Material Design documentation,
  outlines concepts for designing the navigation in your app, including
  explanations for forward, upward, and chronological navigation.
* [理解导航][Understanding navigation]（Material Design 文档）概述应用导航的设计概念，包括前向、向上与时间顺序导航的说明。
* [Learning Flutter's new navigation and routing system][], an article on
  Medium, describes how to use the `Router` widget directly, without
  a routing package.
* [学习 Flutter 的新导航与路由系统][Learning Flutter's new navigation and routing system]（Medium 文章）介绍如何在不使用路由 package 的情况下直接使用 `Router` widget。
* The [Router design document][] contains the motivation and design of the
  `Router` API.
* [Router 设计文档][Router design document]包含 `Router` API 的动机与设计。

[`Navigator`]: {{site.api}}/flutter/widgets/Navigator-class.html
[`Router`]: {{site.api}}/flutter/widgets/Router-class.html
[Deep linking]: /ui/navigation/deep-linking
[navigation recipes]: /cookbook/navigation
[`MaterialApp.routes`]: {{site.api}}/flutter/material/MaterialApp/routes.html
[Navigate with named routes]: /cookbook/navigation/named-routes
[go_router]: {{site.pub}}/packages/go_router
[`Page`]: {{site.api}}/flutter/widgets/Page-class.html
[`pages`]: {{site.api}}/flutter/widgets/Navigator/pages.html
[reverse chronological navigation]: https://material.io/design/navigation/understanding-navigation.html#reverse-navigation
[Understanding navigation]: https://material.io/design/navigation/understanding-navigation.html
[Learning Flutter's new navigation and routing system]: {{site.medium}}/flutter/learning-flutters-new-navigation-and-routing-system-7c9068155ade
[Router design document]: {{site.main-url}}/go/navigator-with-router
[`MaterialPageRoute`]: {{site.api}}/flutter/material/MaterialPageRoute-class.html
