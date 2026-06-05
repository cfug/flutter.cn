---
# title: Deep linking
title: 深度链接
# description: Navigate to routes when the app receives a new URL.
description: 当应用收到新 URL 时导航到对应路由。
ai-translated: true
---

Deep links are links that not only open an app, but also take the
user to a specific location "deep" inside the app. For example,
a deep link from an advertisement for a pair of sneakers might open
a shopping app and display the product page for those particular shoes.

深度链接不仅能打开应用，还能将用户带到应用内「深层」的特定位置。例如，
一双运动鞋广告中的深度链接可能会打开购物应用，
并显示那双鞋的商品页面。

Flutter supports deep linking on iOS, Android, and the web.
Opening a URL displays that screen in your app.
With the following steps,
you can launch and display routes by using named routes
(either with the [`routes`][routes] parameter or
[`onGenerateRoute`][onGenerateRoute]), or by
using the [`Router`][Router] widget.

Flutter 在 iOS、Android 和 Web 上均支持深度链接。
打开 URL 会在你的应用中显示对应界面。
按照以下步骤，
你可以使用命名路由（通过 [`routes`][routes] 参数或
[`onGenerateRoute`][onGenerateRoute]），或使用 [`Router`][Router] widget
来启动并显示路由。

:::note
Named routes are no longer recommended for most
applications. For more information, see
[Limitations][] in the [navigation overview][] page.

对于大多数应用，不再推荐使用命名路由。
更多信息请参阅[导航概览][navigation overview]页面中的[局限性][Limitations]。
:::

[Limitations]: /ui/navigation#limitations
[navigation overview]: /ui/navigation

If you're running the app in a web browser, there's no additional setup
required. Route paths are handled in the same way as an iOS or Android deep
link. By default, web apps read the deep link path from the url fragment using
the pattern: `/#/path/to/app/screen`, but this can be changed by
[configuring the URL strategy][] for your app.

若在 Web 浏览器中运行应用，无需额外配置。
路由路径的处理方式与 iOS 或 Android 深度链接相同。
默认情况下，Web 应用使用 `/#/path/to/app/screen` 模式从 URL 片段读取深度链接路径，
但你可以通过[配置应用的 URL 策略][configuring the URL strategy]来更改这一点。

If you are a visual learner, check out the following video:

若你偏好视觉学习，请观看以下视频：

<YouTubeEmbed id="KNAb2XL7k2g" title="Deep linking in Flutter"></YouTubeEmbed>

## Get started

## 入门

To get started, see our cookbooks for Android and iOS:

入门请参阅我们为 Android 和 iOS 准备的 Cookbook 教程：

<div class="card-grid">
  <a class="card outlined-card" href="/cookbook/navigation/set-up-app-links">
    <div class="card-header text-center">
      <span class="card-title">Android</span>
    </div>
  </a>
  <a class="card outlined-card" href="/cookbook/navigation/set-up-universal-links">
    <div class="card-header text-center">
      <span class="card-title">iOS</span>
    </div>
  </a>
</div>

## Migrating from plugin-based deep linking

## 从基于 plugin 的深度链接迁移

If you have written a plugin to handle deep links, as described in
[Deep Links and Flutter applications][plugin-linking]
(a free article on Medium),
you should opt out the Flutter's default deep link handler.
To do this, set `FlutterDeepLinkingEnabled` to false in `Info.plist` _or_
`flutter_deeplinking_enabled` to false in `AndroidManifest.xml`.

若你已按 Medium 上的免费文章
[Deep Links and Flutter applications][plugin-linking] 所述编写了处理深度链接的 plugin，
应退出 Flutter 的默认深度链接处理器。
为此，在 `Info.plist` 中将 `FlutterDeepLinkingEnabled` 设为 false，**或**
在 `AndroidManifest.xml` 中将 `flutter_deeplinking_enabled` 设为 false。

## Behavior

## 行为

The behavior varies slightly based on the platform and whether the app is
launched and running.

行为会因平台以及应用是否已启动并运行而略有不同。

| Platform / Scenario      | Using Navigator                                                     | Using Router                                                                                                                                                                                               |
|--------------------------|---------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| iOS (not launched)       | App gets initialRoute ("/") and a short time after gets a pushRoute | App gets initialRoute ("/") and a short time after uses the RouteInformationParser to parse the route and call RouterDelegate.setNewRoutePath, which configures the Navigator with the corresponding Page. |
| Android - (not launched) | App gets initialRoute containing the route ("/deeplink")            | App gets initialRoute ("/deeplink") and passes it to the RouteInformationParser to parse the route and call RouterDelegate.setNewRoutePath, which configures the Navigator with the corresponding Pages.   |
| iOS (launched)           | pushRoute is called                                                 | Path is parsed, and the Navigator is configured with a new set of Pages.                                                                                                                                   |
| Android (launched)       | pushRoute is called                                                 | Path is parsed, and the Navigator is configured with a new set of Pages.                                                                                                                                   |

| 平台 / 场景              | 使用 Navigator                                                      | 使用 Router                                                                                                                                                                                                |
|--------------------------|---------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| iOS（未启动）            | 应用获得 initialRoute（"/"），稍后收到 pushRoute                      | 应用获得 initialRoute（"/"），稍后使用 RouteInformationParser 解析路由并调用 RouterDelegate.setNewRoutePath，从而用对应的 Page 配置 Navigator。                                                          |
| Android（未启动）        | 应用获得包含路由（"/deeplink"）的 initialRoute                      | 应用获得 initialRoute（"/deeplink"）并传给 RouteInformationParser 解析路由，调用 RouterDelegate.setNewRoutePath，从而用对应的 Pages 配置 Navigator。                                                     |
| iOS（已启动）            | 调用 pushRoute                                                      | 解析路径，并用新的 Pages 集合配置 Navigator。                                                                                                                                                              |
| Android（已启动）        | 调用 pushRoute                                                      | 解析路径，并用新的 Pages 集合配置 Navigator。                                                                                                                                                              |

{:.table .table-striped}

When using the [`Router`][Router] widget,
your app has the ability to replace the
current set of pages when a new deep link
is opened while the app is running.

使用 [`Router`][Router] widget 时，
当应用运行期间打开新的深度链接，
你的应用可以替换当前的页面集合。

## To learn more

## 延伸阅读

* [Learning Flutter's new navigation and routing system][] provides an
introduction to the Router system.
* [Deep dive into Flutter deep linking][io-dl] video from Google I/O 2023
* [Flutter Deep Linking: The Ultimate Guide][],
   a step-by-step tutorial showing how to implement deep links in Flutter.

* [Learning Flutter's new navigation and routing system][] 介绍了 Router 系统。
* Google I/O 2023 的 [Deep dive into Flutter deep linking][io-dl] 视频
* [Flutter Deep Linking: The Ultimate Guide][]，
  分步教程，展示如何在 Flutter 中实现深度链接。

[io-dl]: {{site.yt.watch}}?v=6RxuDcs6jVw&t=3s
[Learning Flutter's new navigation and routing system]: {{site.flutter-blog}}/learning-flutters-new-navigation-and-routing-system-7c9068155ade
[routes]: {{site.api}}/flutter/material/MaterialApp/routes.html
[onGenerateRoute]: {{site.api}}/flutter/material/MaterialApp/onGenerateRoute.html
[Router]: {{site.api}}/flutter/widgets/Router-class.html
[plugin-linking]: {{site.medium}}/flutter-community/deep-links-and-flutter-applications-how-to-handle-them-properly-8c9865af9283
[Flutter Deep Linking: The Ultimate Guide]: https://codewithandrea.com/articles/flutter-deep-links/

[configuring the URL strategy]: /ui/navigation/url-strategies
