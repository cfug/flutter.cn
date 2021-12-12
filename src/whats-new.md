---
title: What’s new
title: 文档网站更新内容归档
description: A list of what’s new on flutter.dev and related sites.
description: Flutter 和 Dart 文档的相关更新说明页面。
tags: Flutter文档更新
keywords: 内容归档
---

This page contains current and previous announcements of
what's new on the Flutter website and blog.

该归档包含了历史公告，以及网站上的更新内容。

To stay on top of Flutter announcements,
including breaking changes,
join the [flutter-announce][] Google group.

要及时同步最新 Flutter 公告，包括重大变更 (breaking changes) 等，
请加入 [flutter-announce][] 邮件组。

[flutter-announce]: {{site.groups}}/forum/#!forum/flutter-announce

## September 8, 2021: 2.5 release

## 2021 年 9 月 8 日：2.5 版本发布

Flutter 2.5 is live! For details, see
[What's new in Flutter 2.5][].

We've made significant changes to flutter/website
repo to make it easier to use and maintain.
If you contribute to this repo, see the [README][] file
for more information.

**Docs updated or added since the 2.2 release**

* A new page on [Using Actions and Shortcuts][].

**Articles**

We've published the following articles on the [Flutter Medium][]
publication since the last stable release:

* [Raster thread performance optimization tips][]
* [Writing a good code sample][]
* [GSoC'21: Creating a desktop sample for Flutter][]
* [Flutter Hot Reload][]
* [What can we do to better improve Flutter?][]
* [Adding Flutter to  your existing iOS and Android codebases][]
* [Google I/O Spotlight: Flutter in action at ByteDance][] 
* [Improving Platform Channel Performance in Flutter][]


[Adding Flutter to  your existing iOS and Android codebases]: {{site.flutter-medium}}/adding-flutter-to-your-existing-ios-and-android-codebases-3e2c5a4797c1
[What's new in Flutter 2.5]: {{site.flutter-medium}}/whats-new-in-flutter-2-5-6f080c3f3dc
[Flutter Hot Reload]: {{site.flutter-medium}}/flutter-hot-reload-f3c5994e2cee
[Google I/O Spotlight: Flutter in action at ByteDance]: {{site.flutter-medium}}/google-i-o-spotlight-flutter-in-action-at-bytedance-c22f4b6dc9ef
[GSoC'21: Creating a desktop sample for Flutter]: {{site.flutter-medium}}/gsoc-21-creating-a-desktop-sample-for-flutter-7d77e74812d6
[Improving Platform Channel Performance in Flutter]: {{site.flutter-medium}}/improving-platform-channel-performance-in-flutter-e5b4e5df04af
[Raster thread performance optimization tips]: {{site.flutter-medium}}/raster-thread-performance-optimization-tips-e949b9dbcf06
[README]: {{site.repo.this}}/#flutter-website
[Using Actions and Shortcuts]: {{site.url}}/development/ui/advanced/actions_and_shortcuts
[What can we do to better improve Flutter?]: {{site.flutter-medium}}/what-can-we-do-better-to-improve-flutter-q2-2021-user-survey-results-1037fb8f057b
[Writing a good code sample]: {{site.flutter-medium}}/writing-a-good-code-sample-323358edd9f3

---

## May 18, 2021, Google I/O Edition: 2.2 release

Flutter 2.2 is live! For details, see
[Announcing Flutter 2.2][] and
[What's New in Flutter 2.2][].

We continue migrating code on the website to use
null safety, but that work is not yet completed.

**Docs updated or added since the 2.0 release**

* A new page on [Building adaptive apps][].
* A new page describing how to use [Google APIs][]
  with Flutter.
* A new landing page for [Embedded Support for Flutter][].
* A new page on setting up and using [Deferred components][]
  on Android.
* Significant updates to the DevTools [Memory view page][].
* The [desktop][] page is updated to reflect the progress
  on desktop support, particularly the new support for
  Windows UWP.

{% comment %}
- migration guides (drag gestures and package:flutter_lints, depending)
{% endcomment %}

**Codelabs**

New codelabs since the last stable release:

* [Adding in-app purchases to your Flutter app][]
* [Build Voice Bots for Android with Dialogflow Essentials & Flutter][]
* [Get to know Firebase for Flutter][]

**Workshops**

For Google I/O 2021, we have added a new
Flutter/Dart learning tool that
is based on DartPad: **Workshops!**
These workshops are designed to be instructor led.
The instructor-led videos are available on the
Flutter and Firebase YouTube channels:

* [Building your first Flutter app][]
* [Firebase for Flutter][]
* [Flutter and Dialogflow voice bots][]
* [Inherited widgets][]
* [Null safety][]
* [Slivers][]

To see the event list of "all things Flutter" at I/O,
see the [Google 2021 I/O Flutter][] page.

You can author your own DartPad workshops!
If you are interested, check out the following resources:

* [DartPad Workshop Authoring Guide][]
* [DartPad Sharing Guide (using a Gist file)][]
* [Embedding DartPad in your web page][]

[Google 2021 I/O Flutter]: https://events.google.com/io/program/content?4=topic_flutter

**Articles**

We've published the following articles on the [Flutter Medium][]
publication since the last stable release:

* [How It's Made: I/O Photo Booth][]
* [Which factors affected users’ decisions to adopt Flutter? - Q1 2021 user survey results][Q1 2021 survey]

[Adding in-app purchases to your Flutter app]: {{site.codelabs}}/codelabs/flutter-in-app-purchases
[Announcing Flutter 2.2]: {{site.flutter-medium}}/announcing-flutter-2-2-at-google-i-o-2021-92f0fcbd7ef9
[Building adaptive apps]: {{site.url}}/development/ui/layout/building-adaptive-apps
[Build Voice Bots for Android with Dialogflow Essentials & Flutter]: {{site.codelabs}}/codelabs/dialogflow-flutter?hl=en&continue=https%3A%2F%2Fcodelabs.developers.google.com%2F#0
[Building your first Flutter app]: {{site.youtube-site}}/watch?v=Z6KZ3cTGBWw
[DartPad Sharing Guide (using a Gist file)]: {{site.github}}/dart-lang/dart-pad/wiki/Sharing-Guide
[DartPad Workshop Authoring Guide]: {{site.github}}/dart-lang/dart-pad/wiki/Workshop-Authoring-Guide
[Deferred components]: {{site.url}}/perf/deferred-components
[desktop]: {{site.url}}/desktop
[Embedded Support for Flutter]: {{site.url}}/embedded
[Embedding DartPad in your web page]: {{site.github}}/dart-lang/dart-pad/wiki/Embedding-Guide
[Firebase for Flutter]: {{site.youtube-site}}/watch?v=4wunbF29Kkg
[Flutter and Dialogflow voice bots]: {{site.youtube-site}}/watch?v=O7JfSF3CJ84
[Get to know Firebase for Flutter]: {{site.firebase}}/codelabs/firebase-get-to-know-flutter#0
[Google APIs]: {{site.url}}/development/data-and-backend/google-apis
[Google I/O workshops page]: https://events.google.com/io/program/content?4=topic_flutter&5=type_workshop&lng=en
[How It's Made: I/O Photo Booth]: {{site.flutter-medium}}/how-its-made-i-o-photo-booth-3b8355d35883
[Inherited widgets]: {{site.youtube-site}}/watch?v=LFcGPS6cGrY
[Inherited widgets DartPad]: {{site.url}}/go/inheritedwidget-workshop
[Memory view page]: {{site.url}}/development/tools/devtools/memory
[Null safety]: {{site.youtube-site}}/watch?v=HdKwuHQvArY
[Slivers]: {{site.youtube-site}}/watch?v=YY-_yrZdjGc
[Q1 2021 survey]: {{site.flutter-medium}}/which-factors-affected-users-decisions-to-adopt-flutter-q1-2021-user-survey-results-563e61fc68c9
[What's New in Flutter 2.2]: {{site.flutter-medium}}/whats-new-in-flutter-2-2-fd00c65e2039


---

## March 3, 2021, Flutter Engage Edition: 2.0 release

Flutter 2 is live!!!  For more information, see
[Announcing Flutter 2][], [What's new in Flutter 2][],
[Flutter web support hits the stable milestone][],
[Announcing Dart 2.12][],
and the [Flutter 2 release notes][].

**Docs updated or added since the 1.22 release**

* A new [Who is Dash?][] page!
* Information about monetizing your apps has been
  collected in the new [Flutter Ads][] landing page.
* Added a new page explaining the [Flutter Fix][]
  feature and how to use it.
* New and updated web pages, including:
  * [Web support for Flutter][]
  * [Configuring the URL strategy on the web][]
  * [Web FAQ][] 
* The [Desktop support for Flutter][] page is updated,
  as well as other pages on the site that discuss
  desktop support.
* The [DevTools][] docs have been updated. The
  most significant updates are to the following page:
  * [Flutter inspector][]
* Added a page on how to [implement deep linking][]
  for mobile and web.
* Updated the [Creating responsive and adaptive apps][]
  page.
* Many pages (including all codelabs on flutter.dev)
  and examples are updated to be null safe.
* Added two new add to app pages:
  * [Using multiple Flutter instances][]
  * [Adding a Flutter view to an Android app][]
* Added a page on how to [write integration tests using
  the integration_test package][].
* Significant updates to the [internationalization][] page.
* New and updated [performance][] pages, including:
  * [Performance metrics][]
  * [Performance faq][]
  * [More thoughts about performance][]

**Codelabs**

Many of our codelabs have been updated to null safety.
We've also added a new codelab since the last stable release:

* [Adding AdMob banner and native inline ads to a Flutter app][]

For a complete list, see [Flutter codelabs][].

**Articles**

We've published the following articles on the [Flutter Medium][]
publication since the last stable release:

* [Flutter performance updates in the first half of 2020][perf-H1-2020]
* [Are you happy with Flutter? - Q4 2020 user survey results][Q4]
* [Join us for #30DaysOfFlutter][]
* [Providing operating system compatibility on a large scale][comp]
* [Updates on Flutter Testing][]
* [Announcing Dart null safety beta][]
* [Deprecation Lifetime in Flutter][]
* [New ad formats for Flutter][]
* [Accessible expression with Material Icons and Flutter][]
* [Dart sound null safety: technical preview 2][]
* [Flutter on the web, slivers, and platform-specific issues: user survey results from Q3 2020][Q3]
* [Testable Flutter and Cloud Firestore][]
* [Performance testing on the web][]


[Accessible expression with Material Icons and Flutter]: {{site.flutter-medium}}/accessible-expression-with-material-icons-and-flutter-e3f3f622200b
[Adding AdMob banner and native inline ads to a Flutter app]: {{site.codelabs}}/codelabs/admob-inline-ads-in-flutter
[Adding a Flutter view to an Android app]: {{site.url}}/development/add-to-app/android/add-flutter-view
[Announcing Dart null safety beta]: {{site.flutter-medium}}/announcing-dart-null-safety-beta-4491da22077a
[Announcing Dart 2.12]: {{site.medium}}/dartlang/announcing-dart-2-12-499a6e689c87
[Announcing Flutter 2]: {{site.google-blog}}/2021/03/announcing-flutter-2.html
[comp]: {{site.flutter-medium}}/providing-operating-system-compatibility-on-a-large-scale-374cc2fb0dad
[Configuring the URL strategy on the web]: {{site.url}}/development/ui/navigation/url-strategies
[Creating responsive and adaptive apps]: {{site.url}}/development/ui/layout/adaptive-responsive
[Dart sound null safety: technical preview 2]: {{site.flutter-medium}}/null-safety-flutter-tech-preview-cb5c98aba187
[Deprecation Lifetime in Flutter]: {{site.flutter-medium}}/deprecation-lifetime-in-flutter-e4d76ee738ad
[Desktop support for Flutter]: {{site.url}}/desktop
[Devtools]: {{site.url}}/development/tools/devtools/overview
[Flutter Ads]: {{site.main-url}}/monetization
[Flutter 2 release notes]: {{site.url}}/development/tools/sdk/release-notes/release-notes-2.0.0
[Flutter Fix]: {{site.url}}/development/tools/flutter-fix
[Flutter inspector]: {{site.url}}/development/tools/devtools/inspector
[Flutter web support hits the stable milestone]: {{site.flutter-medium}}/flutter-web-support-hits-the-stable-milestone-d6b84e83b425
[implement deep linking]: {{site.url}}/development/ui/navigation/deep-linking
[internationalization]: {{site.url}}/development/accessibility-and-localization/internationalization
[Join us for #30DaysOfFlutter]: {{site.flutter-medium}}/join-us-for-30daysofflutter-9993e3ec847b
[More thoughts about performance]: {{site.url}}/perf/appendix
[New ad formats for Flutter]: {{site.flutter-medium}}/new-ads-beta-inline-banner-and-native-support-for-the-flutter-mobile-ads-plugin-e48a7e9a0e64
[perf-H1-2020]: {{site.flutter-medium}}/flutter-performance-updates-in-the-first-half-of-2020-5c597168b6bb
[performance]: {{site.url}}/perf
[Performance faq]: {{site.url}}/perf/faq
[Performance metrics]: {{site.url}}/perf/metrics
[Performance testing on the web]: {{site.flutter-medium}}/performance-testing-on-the-web-25323252de69
[Q3]: {{site.flutter-medium}}/flutter-on-the-web-slivers-and-platform-specific-issues-user-survey-results-from-q3-2020-f8034236b2a8
[Q4]: {{site.flutter-medium}}/are-you-happy-with-flutter-q4-2020-user-survey-results-41cdd90aaa48
[Testable Flutter and Cloud Firestore]: {{site.flutter-medium}}/flutter/testable-flutter-and-cloud-firestore-1cf2fbbce97b
[Updates on Flutter Testing]: {{site.flutter-medium}}/updates-on-flutter-testing-f54aa9f74c7e
[Using multiple Flutter instances]: {{site.url}}/development/add-to-app/multiple-flutters
[Web FAQ]: {{site.url}}/development/platform-integration/web
[Web support for Flutter]: {{site.url}}/web
[What's new in Flutter 2]: {{site.flutter-medium}}/whats-new-in-flutter-2-0-fe8e95ecc65
[Who is Dash?]: {{site.url}}/dash
[write integration tests using the integration_test package]: {{site.url}}/testing/integration-tests

---

## Oct 1, 2020: 1.22 release

Flutter 1.22 is live! For details, see
[Announcing Flutter 1.22][].


**Docs updated or added to flutter.dev since the 1.20 release**

* Updated the [Developing for iOS 14][] page with
  details about targeting iOS 14 with Flutter, including some
  Add-to-App, deep linking, and notification considerations.
* Added a page on how to [add an iOS App Clip][],
  a new iOS 14 feature that supports running lightweight,
  no-install apps under 10 MB.
* Added a page that describes how to [migrate your app to use the
  new icon glyphs available in
  `CupertinoIcons`][cupertino-icons].
* Added a page that describes the new [implementation for
  Platform Views and how to use them to host native Android
  and iOS views in your Flutter app][platform-views].
  This feature has enabled the [google_maps_flutter][]
  and [webview_flutter][] plugins to be
  updated to production-ready release 1.0.
* Added a page that describes how to use the new
  [App Size tool][] in Dart DevTools.

**Codelabs**

We've added a new codelab since the last stable release:

* [Building Beautiful Transitions with Material Motion
  for Flutter][]<br>
  Learn how to use the Material [animations][] package to
  add prebuilt transitions to a Material app called Reply.

For a complete list, see [Flutter codelabs][].

**Articles**

We've published the following articles on the [Flutter Medium][]
publication since the last stable release:

* [Learning Flutter's new navigation and routing][]
* [Integration testing with flutter_driver][]
* [Announcing Flutter Windows Alpha][]
* [Handling web gestures in Flutter][]
* [Supporting iOS 14 and Xcode 12 with Flutter][]
* [Learn testing with the new Flutter sample][]
* [Platform channel examples][]
* [Updates on Flutter and Firebase][]


[add an iOS App Clip]: {{site.url}}/development/platform-integration/ios-app-clip
[animations]: {{site.pub}}/packages/animations
[Announcing Flutter 1.22]: {{site.flutter-medium}}/announcing-flutter-1-22-44f146009e5f
[Announcing Flutter Windows Alpha]: {{site.flutter-medium}}/announcing-flutter-windows-alpha-33982cd0f433
[App Size tool]: {{site.url}}/development/tools/devtools/app-size
[Building Beautiful Transitions with Material Motion for Flutter]: {{site.codelabs}}/codelabs/material-motion-flutter
[cupertino-icons]: {{site.url}}/release/breaking-changes/cupertino-icons-1.0.0
[Developing for iOS 14]: {{site.url}}/development/ios-14
[google_maps_flutter]: {{site.pub}}/packages/google_maps_flutter
[Handling web gestures in Flutter]: {{site.flutter-medium}}/handling-web-gestures-in-flutter-e16946a04745
[Integration testing with flutter_driver]: {{site.flutter-medium}}/integration-testing-with-flutter-driver-36f66ede5cf2
[Learn testing with the new Flutter sample]: {{site.flutter-medium}}/learn-testing-with-the-new-flutter-sample-gsoc20-work-product-e872c7f6492a
[Learning Flutter's new navigation and routing]: {{site.flutter-medium}}/learning-flutters-new-navigation-and-routing-system-7c9068155ade
[Platform channel examples]: {{site.flutter-medium}}/platform-channel-examples-7edeaeba4a66
[platform-views]: {{site.url}}/development/platform-integration/platform-views
[Supporting iOS 14 and Xcode 12 with Flutter]: {{site.flutter-medium}}/supporting-ios-14-and-xcode-12-with-flutter-15fe0062e98b
[Updates on Flutter and Firebase]: {{site.flutter-medium}}/updates-on-flutter-and-firebase-8076f70bc90e
[webview_flutter]: {{site.pub}}/packages/webview_flutter


## Aug 5, 2020: 1.20 release

## 2020 年 5 月：1.20 发布

Flutter 1.20 is live! For details,
see [Announcing Flutter 1.20][].

Flutter 1.20 版本正式发布！
更多信息请参见 [Flutter 1.20 发布介绍][Announcing Flutter 1.20]。

**Docs updated or added to flutter.dev**

**flutter.dev 文档更新**

* [Reducing shader compilation jank on mobile][] is added to the
  performance docs.

  [减少移动设备上的着色器（shader）掉帧问题][Reducing shader compilation jank on mobile]
  文档已添加到性能章节中。

* [Developing for iOS 14 beta][] outlines some issues you might
  run into if developing for devices running iOS 14 beta.

  [在 iOS 14 beta 上进行开发][Developing for iOS 14 beta]
  介绍了一些你在 iOS 14 beta 开发中可能会遇到的一些问题。

* New instructions for [installing Flutter on Linux using snapd.][]

  [使用 snaped 在 Linux 安装 Flutter 应用][installing Flutter on Linux using snapd.]
  提供了最新介绍。

* Updated the [Desktop support][] page to reflect that Linux
  desktop apps (as well as macOS) are available as alpha.

  更新了 [桌面支持][Desktop support] 介绍页面，
  Linux 桌面应用（以及 macOS）已经进入 alpha 阶段。

* Several new Flutter books have been published. The
  [Flutter books][] page is updated.

  多本全新 Flutter 书籍正式出版。更新了 [Flutter 书籍][Flutter books]页面。

* The [codelabs landing][] page has been updated.

  更新了[代码实验室主页][codelabs landing]。

A deep dive into null safety has been added to dart.dev:

dart.dev 增加了深入探索 null safety（空安全）文章：

* [Understanding null safety][]

  [深入理解空安全][Understanding null safety]

**Codelabs**

[Flutter Day][] was held on 6/25/2020.
In preparation for the event,
we wrote new codelabs and updated existing codelabs.
New codelabs include:

在 2020 年 6 月 25 日我们举办了 [Flutter Day][]。
为了准备这次活动，我们编写了全新的代码实验室并更新了已有的 codelab。
最新的 codelab 包括以下内容：

* [Adding Admob Ads to a Flutter app][]

  [为 Flutter 应用添加 Admob 广告][Adding Admob Ads to a Flutter app]

* [How to write a Flutter plugin][]

  [如何编写一个 Flutter plugin][How to write a Flutter plugin]

* [Multi-platform Firestore Flutter][]

  [使用 Flutter Firestore 支持多端存储][Multi-platform Firestore Flutter]

* [Using a plugin with a Flutter web app][]

  [在 Flutter web 应用中使用 plugin][Using a plugin with a Flutter web app]

* [Write a Flutter desktop application][]

  [编写一个 Flutter 桌面应用][Write a Flutter desktop application]

For a complete list, see [Flutter codelabs][].

完整列表请查看[Flutter 代码实验室][Flutter codelabs]。

**Articles**

**文章**

We've published the following articles on the [Flutter Medium][]
publication since the last stable release:

自从上次稳定版发布以来，我们在 [Flutter Medium][] 上发布了一系列文章：

  * [Announcing Adobe XD support for Flutter][]

    [介绍 Flutter Adobe XD 支持][Announcing Adobe XD support for Flutter]

  * [What are the important & difficult tasks for Flutter
     devs? - Q1 2020 survey results][q1-2020]

    [对于 Flutter 开发者来说有哪些重要且困难的问题？ - 2020 第一季度调查结果][q1-2020]

  * [Optimizing performance in Flutter web apps with tree
     shaking and deferred loading][shaking]

    [Flutter web 应用中的性能优化，包括了 tree shaking 和延迟加载][shaking]

  * [Flutter Package Ecosystem Update][]

    [Flutter package 生态更新][Flutter Package Ecosystem Update]

  * [Improving perceived performance with image placeholders,
     precaching, and disabled navigation transitions][web-perf]

    [使用图片占位符改善感知性能，预缓存和禁用的导航转换][web-perf]

  * [Two Months of #FlutterGoodNewsWednesday][]

    [#FlutterGoodNewsWednesday 的两个月][Two Months of #FlutterGoodNewsWednesday]

  * [Handling 404: Page not found error in Flutter][]

    [在 Flutter 中处理 404 无法找到页面的问题][Handling 404: Page not found error in Flutter]

  * [Flutter and Desktop apps][]

    [Flutter 桌面应用][Flutter and Desktop apps]

  * [What's new with the Slider widget?][]

    [Slider widget 有哪些更新？][What's new with the Slider widget?]

  * [New tools for Flutter developers, built in Flutter][dev-tools]

    [为 Flutter 开发者们带来全新工具，工具也是 Flutter 编写的哦][dev-tools]

  * [Canonical enables Linux desktop app support with Flutter][ubuntu]

    [通过启用 Canonical Flutter Linux 开启桌面应用程序支持][ubuntu]

  * [Enums with Extensions in Dart][]

    [Dart 中对枚举值添加扩展方法][Enums with Extensions in Dart]

  * [Managing issues in a large-scale open source project][]

    [在大型开源项目中管理 issue][Managing issues in a large-scale open source project]

  * [What we learned from the Flutter Q2 2020 survey][]

    [我们在 Flutter 第二季度调查报告中发现了哪些亮点][What we learned from the Flutter Q2 2020 survey]

  * [Building performant Flutter widgets][]

    [构建高性能 Flutter widgets][Building performant Flutter widgets]

  * [How to debug layout issues with the Flutter Inspector][]

    [如何使用 Flutter Inspector 调试布局问题][How to debug layout issues with the Flutter Inspector]

  * [Going deeper with Flutter's web support][]

    [深入 Flutter web 支持][Going deeper with Flutter's web support]

  * [Flutter Performance Updates in 2019][]

    [Flutter 在 2019 年中性能有哪些改进][Flutter Performance Updates in 2019]


[Adding Admob Ads to a Flutter app]: {{site.codelabs}}/codelabs/admob-ads-in-flutter/
[Announcing Adobe XD Support for Flutter]: {{site.flutter-medium}}/announcing-adobe-xd-support-for-flutter-4b3dd55ff40e
[Announcing Flutter 1.20]: {{site.flutter-medium}}/announcing-flutter-1-20-2aaf68c89c75
[Building performant Flutter widgets]: {{site.flutter-medium}}/building-performant-flutter-widgets-3b2558aa08fa
[codelabs landing]: {{site.url}}/codelabs
[Desktop support]: {{site.url}}/desktop
[dev-tools]: {{site.flutter-medium}}/new-tools-for-flutter-developers-built-in-flutter-a122cb4eec86
[Developing for iOS 14 beta]: {{site.url}}/development/ios-14
[Enums with Extensions in Dart]: {{site.flutter-medium}}/enums-with-extensions-dart-460c42ea51f7
[Flutter and Desktop apps]: {{site.flutter-medium}}/flutter-and-desktop-3a0dd0f8353e
[Flutter architectural overview]: {{site.url}}/resources/architectural-overview
[Flutter books]: {{site.url}}/resources/books
[Flutter codelabs]: {{site.url}}/codelabs
[Flutter Day]: https://events.withgoogle.com/flutter-day/
[Flutter Package Ecosystem Update]: {{site.flutter-medium}}/flutter-package-ecosystem-update-d50645f2d7bc
[Flutter Performance Updates in 2019]: {{site.flutter-medium}}/going-deeper-with-flutters-web-support-66d7ad95eb5224
[Going deeper with Flutter's web support]: {{site.flutter-medium}}/going-deeper-with-flutters-web-support-66d7ad95eb52
[Handling 404: Page not found error in Flutter]: {{site.flutter-medium}}/handling-404-page-not-found-error-in-flutter-731f5a9fba29
[How to write a Flutter plugin]: {{site.codelabs}}/codelabs/write-flutter-plugin
[installing Flutter on Linux using snapd.]: {{site.url}}/get-started/install/linux
[Managing issues in a large-scale open source project]: {{site.flutter-medium}}/managing-issues-in-a-large-scale-open-source-project-b3be6eecae2b
[How to debug layout issues with the Flutter Inspector]: {{site.flutter-medium}}/how-to-debug-layout-issues-with-the-flutter-inspector-87460a7b9db
[Multi-platform Firestore Flutter]: {{site.codelabs}}/codelabs/friendlyeats-flutter/
[q1-2020]: {{site.flutter-medium}}/what-are-the-important-difficult-tasks-for-flutter-devs-q1-2020-survey-results-a5ef2305429b
[Reducing shader compilation jank on mobile]: {{site.url}}/perf/rendering/shader
[shaking]: {{site.flutter-medium}}/optimizing-performance-in-flutter-web-apps-with-tree-shaking-and-deferred-loading-535fbe3cd674
[Two Months of #FlutterGoodNewsWednesday]: {{site.flutter-medium}}/two-months-of-fluttergoodnewswednesday-a12e60bab782
[ubuntu]: {{site.flutter-medium}}/announcing-flutter-linux-alpha-with-canonical-19eb824590a9
[Understanding null safety]: {{site.dart-site}}/null-safety/understanding-null-safety
[Using a plugin with a Flutter web app]: {{site.codelabs}}/codelabs/web-url-launcher/
[web-perf]: {{site.flutter-medium}}/improving-perceived-performance-with-image-placeholders-precaching-and-disabled-navigation-6b3601087a2b
[What's new with the Slider widget?]: {{site.flutter-medium}}/whats-new-with-the-slider-widget-ce48a22611a3
[What we learned from the Flutter Q2 2020 survey]: {{site.flutter-medium}}/what-we-learned-from-the-flutter-q2-2020-survey-a4f1fc8faac9
[Write a Flutter desktop application]: {{site.codelabs}}/codelabs/flutter-github-graphql-client/

## May 6, 2020, Work-From-Home Edition: 1.17 release

Flutter 1.17 is live!

For more information, see [Announcing Flutter 1.17][].

Docs added and updated since the last announcement include:

* Added a new page on [Understanding constraints][],
  contributed by Marcelo Glasberg, a Flutter community member.
* The [animations landing page][] has been re-written.
  This page now includes the animation decision tree
  that helps you figure out which animation approach
  is right for your needs. It also includes information
  on the new [package for pre-canned Material widget animations][].
* The [hot reload][] page has been re-written. We
  hope you find it to be clearer!
* The [Desktop][] page has been updated and now includes information
  on setting up entitlements and using the App Sandbox on macOS.
* The plugin docs are updated to cover the new Android Plugin APIs
  and also to describe Federated Plugins. Affected pages include:
  * [Developing packages and plugins][]
  * [Developing plugin packages][]
  * [Supporting the new Android plugin APIs][]
  * [Writing custom platform-specific code][]
* Added an [Obfuscating Dart code][] page.
  (Moved from the wiki and updated as of 1.16.2.)
* Added a page on using [Xcode 11.4][] and how to manually update
  your project. The tooling, which automatically updates your
  configuration when possible, may direct you to this page
  if it detects that it's needed.
* Added a page on
  [Managing plugins and dependencies in add-to-app][add2app]
  when developing for Android.


Other newness:

* We've published a number of articles on the [Flutter Medium][]
  publication since the last stable release:
  * [Custom implicit animations in Flutter…with TweenAnimationBuilder][]
  * [Directional animations with build-in explicit animations][]
  * [When should I use AnimatedBuilder or AnimatedWidget?][]
  * [Improving Flutter with your opinion - Q4 2019 survey results][]
  * [How to write a Flutter web plugin, Part 2][]
  * [It’s Time: The Flutter Clock contest results][]
  * [How to float an overlay widget over a (possibly transformed) UI widget][]
  * [How to embed a Flutter application in a website using DartPad][]
  * [Flutter web: Navigating URLs using named routes][]
  * [How to choose which Flutter animation widget is right for you?][]
  * [Announcing a free Flutter introductory course][]
  * [Announcing CodePen support for Flutter][]
  * [Animation deep dive][]
  * [Flutter Spring 2020 update][]
  * [Introducing Google Fonts for Flutter v 1.0.0!][]
  * [Flutter web support updates][]
  * [Modern Flutter plugin development][]

[add2app]: {{site.url}}/development/add-to-app/android/plugin-setup
[Animation deep dive]: {{site.flutter-medium}}/animation-deep-dive-39d3ffea111f
[animations landing page]: {{site.url}}/development/ui/animations
[Announcing a free Flutter introductory course]: {{site.flutter-medium}}/learn-flutter-for-free-c9bc3b898c4d
[Announcing CodePen support for Flutter]: {{site.flutter-medium}}/announcing-codepen-support-for-flutter-bb346406fe50
[Announcing Flutter 1.17]: {{site.flutter-medium}}/announcing-flutter-1-17-4182d8af7f8e
[Custom implicit animations in Flutter…with TweenAnimationBuilder]: {{site.flutter-medium}}/custom-implicit-animations-in-flutter-with-tweenanimationbuilder-c76540b47185
[Desktop]: {{site.url}}/desktop
[Developing packages and plugins]: {{site.url}}/development/packages-and-plugins/developing-packages
[Developing plugin packages]: {{site.url}}/development/packages-and-plugins/developing-packages#federated-plugins
[Directional animations with build-in explicit animations]: {{site.flutter-medium}}/directional-animations-with-built-in-explicit-animations-3e7c5e6fbbd7
[Flutter Medium]: {{site.medium}}/flutter
[Flutter Spring 2020 update]: {{site.flutter-medium}}/spring-2020-update-f723d898d7af
[Flutter web: Navigating URLs using named routes]: {{site.flutter-medium}}/web-navigating-urls-using-named-routes-307e1b1e2050
[Flutter web support updates]: {{site.flutter-medium}}/web-support-updates-8b14bfe6a908
[hot reload]: {{site.url}}/development/tools/hot-reload
[How to choose which Flutter animation widget is right for you?]: {{site.flutter-medium}}/how-to-choose-which-flutter-animation-widget-is-right-for-you-79ecfb7e72b5
[How to embed a Flutter application in a website using DartPad]: {{site.flutter-medium}}/how-to-embed-a-flutter-application-in-a-website-using-dartpad-b8fd0ee8c4b9
[How to float an overlay widget over a (possibly transformed) UI widget]: {{site.flutter-medium}}/how-to-float-an-overlay-widget-over-a-possibly-transformed-ui-widget-1d15ca7667b6
[How to write a Flutter web plugin, Part 2]: {{site.flutter-medium}}/how-to-write-a-flutter-web-plugin-part-2-afdddb69ece6
[Improving Flutter with your opinion - Q4 2019 survey results]: {{site.flutter-medium}}/improving-flutter-with-your-opinion-q4-2019-survey-results-ba0e6721bf23
[Introducing Google Fonts for Flutter v 1.0.0!]: {{site.flutter-medium}}/introducing-google-fonts-for-flutter-v-1-0-0-c0e993617118
[It’s Time: The Flutter Clock contest results]: {{site.flutter-medium}}/its-time-the-flutter-clock-contest-results-dcebe2eb3957
[Obfuscating Dart code]: {{site.url}}/deployment/obfuscate
[package for pre-canned Material widget animations]: {{site.pub}}/packages/animations
[Modern Flutter plugin development]: {{site.flutter-medium}}/modern-flutter-plugin-development-4c3ee015cf5a
[Supporting the new Android plugin APIs]: {{site.url}}/development/packages-and-plugins/plugin-api-migration
[Understanding constraints]: {{site.url}}/development/ui/layout/constraints
[When should I use AnimatedBuilder or AnimatedWidget?]: {{site.flutter-medium}}/when-should-i-useanimatedbuilder-or-animatedwidget-57ecae0959e8
[Writing custom platform-specific code]: {{site.url}}/development/platform-integration/platform-channels
[Xcode 11.4]: {{site.url}}/development/ios-project-migration

## Dec 11, 2019, Flutter Interact Edition: 1.12 release

## 2019 年 12 月 11 日, Flutter Interact 版本

Flutter 1.12 is live!

Flutter 1.12 正式发布!

For more information, see
[Flutter: the first UI platform designed for ambient computing][],
[Announcing Flutter 1.12: What a year!][] and
the [Flutter 1.12.13][] release notes.

更多详细信息请参阅
[Flutter：第一个为环境计算设计的 UI 平台][Flutter: the first UI platform designed for ambient computing]，
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
  此外，[使用 Flutter 构建 Web 应用程序][building a web app with Flutter]
  页面也已更新。

* A new [write your first Flutter app on the web][] codelab
  is added to the [Get started][] docs, and includes
  instructions on setting breakpoints in DevTools!

  全新的 [编写你的第一个 Flutter Web 应用][write your first Flutter app on the web]
  codelab 已添加到 [使用入门][Get started] 文档中，其中包括在 DevTools 中设置断点的说明。

* We've introduced a program for recommending particular Dart and
  Flutter plugins and packages. Learn more about the
  [Flutter Favorite program][].

  我们推出了一个计划以介绍特定 Dart 或者 Flutter package 或插件。
  请在 [Flutter Favorite 项目计划中][Flutter Favorite program] 查看更多信息。

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

[add Flutter to an existing app]: {{site.url}}/development/add-to-app
[Announcing Flutter 1.12: What a year!]: {{site.flutter-medium}}/announcing-flutter-1-12-what-a-year-22c256ba525d
[app size]: {{site.url}}/perf/app-size#ios
[building a web app with Flutter]: {{site.url}}/get-started/web
[Desktop support for Flutter]: {{site.url}}/desktop
[Flutter: the first UI platform designed for ambient computing]: {{site.google-blog}}/2019/12/flutter-ui-ambient-computing.html?m=1
[Flutter Favorite program]: {{site.url}}/development/packages-and-plugins/favorites
[Flutter 1.12.13]: {{site.url}}/development/tools/sdk/release-notes/release-notes-1.12.13
[Flutter Gallery]: https://flutter.github.io/samples/#/
[Flutter Layout Explorer]: {{site.url}}/development/tools/devtools/inspector#flutter-layout-explorer
[Flutter Medium publication]: {{site.medium}}/flutter
[Migrating your plugin to the new Android APIs]: {{site.url}}/development/packages-and-plugins/plugin-api-migration
[implicit animations]: {{site.url}}/codelabs/implicit-animations
[Web support for Flutter]: {{site.url}}/web
[Web support for Flutter goes beta]: {{site.flutter-medium}}/web-support-for-flutter-goes-beta-35b64a1217c0
[write your first Flutter app on the web]: {{site.url}}/get-started/codelab-web
[Get started]: {{site.url}}/get-started/install

## Sept 10, 2019: 1.9 release

Flutter 1.9 is live!

For more information, see [Flutter news from GDD China:
uniting Flutter on web and mobile, and introducing Flutter 1.9][]
and the [1.9.1 release notes][].

For the 1.9 release, Flutter's web support has been
merged ("unforked") into the main repo.
**Web support hasn't reached beta, and is not ready
to be used in production.**
Web and desktop support (which is also coming), will
impact the website, which was originally written
exclusively for developing Flutter mobile apps.
Some website updates are available now (and listed below),
but more will be coming.

New and updated docs on the site include:

* We've revamped the [Showcase][] page.
* The Flutter layout codelab has been rewritten and
  uses the updated DartPad, the browser-based tool for
  running Dart code. DartPad now supports Flutter!
  [Try it out] and let us know what you think.
* A new page on [using the dart:ffi library][]
  to bind your app to native code (a feature currently under
  development).
* The Performance view tool, which allows you to record
  and profile a session from your Dart/Flutter application,
  has been enabled in DevTools. For more information,
  see the [Performance view][] page.
* A new page on
  [building a web application][].
* A new page on [creating responsive apps][] in Flutter.
* A new page on [preparing a web app for release][].
* A new [web FAQ][].
* The [Flutter for web][] page is updated.

Other relevant docs:

* Error messages have been improved in SDK 1.9.
  For more information, read
  [Improving Flutter's Error Messages][]
  on the [Flutter Medium publication][].
* If you already have a web app that depends on the
  flutter_web package, the following instructions tell
  you how to migrate to the flutter package:
  [Upgrading from package:flutter_web to the Flutter SDK][].
* A new [`ToggleButtons`][] widget, described in the API docs.
  [ToggleButtons demo][]
* A new [`ColorFiltered`][] widget, also described in the API docs.
  [ColorFiltered demo][]
* New behavior for the [`SelectableText`][] widget.

Happy Fluttering!

[1.9.1 release notes]: {{site.url}}/development/tools/sdk/release-notes/release-notes-1.9.1
[building a web application]: {{site.url}}/get-started/web
[`ColorFiltered`]: {{site.api}}/flutter/widgets/ColorFiltered-class.html
[ColorFiltered demo]: {{site.github}}/csells/flutter_color_filter
[creating responsive apps]: {{site.url}}/development/ui/layout/adaptive-responsive
[Flutter Medium publication]: {{site.medium}}/flutter
[Flutter for web]: {{site.url}}/web
[Flutter news from GDD China: uniting Flutter on web and mobile, and introducing Flutter 1.9]: {{site.google-blog}}/2019/09/flutter-news-from-gdd-china-flutter1.9.html?m=1
[Improving Flutter's Error Messages]: {{site.flutter-medium}}/improving-flutters-error-messages-e098513cecf9
[Performance view]: {{site.url}}/development/tools/devtools/performance
[preparing a web app for release]: {{site.url}}/deployment/web
[`SelectableText`]: {{site.api}}/flutter/material/SelectableText-class.html
[Showcase]: {{site.main-url}}/showcase
[`ToggleButtons`]: {{site.api}}/flutter/material/ToggleButtons-class.html
[ToggleButtons demo]: {{site.github}}/csells/flutter_toggle_buttons
[Try it out]: {{site.url}}/codelabs/layout-basics
[Upgrading from package:flutter_web to the Flutter SDK]: {{site.repo.flutter}}/wiki/Upgrading-from-package:flutter_web-to-the-Flutter-SDK
[using the dart:ffi library]: {{site.url}}/development/platform-integration/c-interop
[web FAQ]: {{site.url}}/development/platform-integration/web

## July 9, 2019: 1.7 release

Flutter 1.7 is live!

Flutter 1.7 正式发布！

For more information, see [Announcing Flutter 1.7][]
on the [Flutter Medium Publication][], and the
[1.7.8 release notes][].

请参见 [这个文章][Announcing Flutter 1.7] 了解更多 1.7 的更新内容，
在 [Flutter wiki 页面][1.7.8 release notes] 查看 1.7.8 的具体更新。

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

* The [Simple app state management][] page is updated.
  The example code in the page now uses the 3.0
  release of the Provider package.

  [简单的应用状态管理][Simple app state management]
  页面有所更新，新的文档是基于 Provider 3.0 正式版的。

* A new animation recipe, [Animate a page route transition][]
  has been added to the [Cookbook][].

  [实用教程][Cookbook] 里添加了一篇新的文章：
  [为页面切换加入动画效果][Animate a page route transition]。

* The [Debugging][], [Flutter's build modes][],
  [Performance best practices][], and [Performance profiling][]
  pages are updated to reflect DevTools. A
  [Debugging apps programmatically][] page has also been added.

  [调试 Flutter 应用][Debugging]、
  [Flutter 的构建模式选择][Flutter's build modes]、
  [Flutter 应用性能优化最佳实践][Performance best practices] 和
  [Flutter 性能分析][Performance profiling] 
  页面中加入了开发者工具的使用说明。与此同时，还加入了这个文档页面：
  [添加代码的方式来调试][Debugging apps programmatically]。

The Flutter 1.7 release includes the new [`RangeSlider`][]
component, which allows the user to select both the upper and lower
endpoints in a range of values. For information about this
component and how to customize it, see
[Material RangeSlider in Flutter].

Flutter 1.7 版本的更新同时加入了 [`RangeSlider`][] 这个 widget，
可以让用户选择在最大值和最小值之间选择一个数字，本周稍晚些时候，
在 Flutter 官方博客里可以看到关于这篇文章的介绍和以及如何自定义它，
请关注 [这里][Material RangeSlider in Flutter]。

[1.7.8 release notes]: {{site.url}}/development/tools/sdk/release-notes/release-notes-1.7.8
[Animate a page route transition]: {{site.url}}/cookbook/animation/page-route-animation
[Announcing Flutter 1.7]: {{site.flutter-medium}}/announcing-flutter-1-7-9cab4f34eacf
[Cookbook]: {{site.url}}/cookbook
[Debugging]: {{site.url}}/testing/debugging
[Debugging apps programmatically]: {{site.url}}/testing/code-debugging
[DevTools]: {{site.url}}/development/tools/devtools
[Flutter Medium Publication]: {{site.flutter-medium}}
[Flutter's build modes]: {{site.url}}/testing/build-modes
[Material RangeSlider in Flutter]: {{site.flutter-medium}}/material-range-slider-in-flutter-a285c6e3447d
[Performance best practices]: {{site.url}}/perf/rendering/best-practices
[Performance profiling]: {{site.url}}/perf/rendering/ui-performance
[Preparing an Android app for release]: {{site.url}}/deployment/android
[`RangeSlider`]: {{site.api}}/flutter/material/RangeSlider-class.html
[Simple app state management]: {{site.url}}/development/data-and-backend/state-mgmt/simple

## May 7, 2019, Google I/O Edition: 1.5 release

**2019 年 5 月 7 日，Google I/O 版本：1.5 版本发布**

[Flutter 1.5][] is live!

[Flutter 1.5 发布啦][Flutter 1.5]。

For more information on updates, see the [1.5.4 release notes][]
or [download the release][].

更多关于此次发布的信息，可以在这里查看 [1.5.4 release notes][]
或者 [下载最新版本][download the release]。

We are updating DartPad to work with Flutter. Try our new
[Basic Flutter layout codelab][] and tell us what you think!

我们正在更新 DartPad 以支持 Flutter，可以通过这个新的 codelab
[Flutter 布局基础教程][Basic Flutter layout codelab]
来试试看吧。

[Basic Flutter layout codelab]: {{site.url}}/codelabs/layout-basics
[download the release]: {{site.url}}/development/tools/sdk/releases
[Flutter 1.5]: {{site.google-blog}}/2019/05/Flutter-io19.html
[1.5.4 release notes]: {{site.url}}/development/tools/sdk/release-notes/release-notes-1.5.4

## February 26, 2019: 1.2 release

Flutter released [version 1.2][] at Mobile World Congress
(MWC) in Barcelona. For more information, see the
[1.2.1 release notes][] or [download the release][].

In addition, here are some recent new and updated docs:

* We've updated our [state management advice][].
  New pages include an [introduction][],
  [thinking declaratively][], [ephemeral vs app state][],
  [simple app state management][], and
  [different state management options].
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

[Android Studio/IntelliJ]: {{site.url}}/development/tools/android-studio
[different state management options]: {{site.url}}/development/data-and-backend/state-mgmt/options
[download the release]: {{site.url}}/development/tools/sdk/releases
[ephemeral vs app state]: {{site.url}}/development/data-and-backend/state-mgmt/ephemeral-vs-app
[file an issue]: {{site.repo.this}}/issues
[introduction]: {{site.url}}/development/data-and-backend/state-mgmt/intro
[Performance profiling]: {{site.url}}/perf/rendering/ui-performance
[1.2.1 release notes]: {{site.url}}/development/tools/sdk/release-notes/release-notes-1.2.1
[simple app state management]: {{site.url}}/development/data-and-backend/state-mgmt/simple
[state management advice]: {{site.url}}/development/data-and-backend/state-mgmt/intro
[thinking declaratively]: {{site.url}}/development/data-and-backend/state-mgmt/declarative
[this site]: {{site.url}}/development/tools/devtools
[timeline view]: {{site.url}}/development/tools/devtools/performance
[VS Code]: {{site.url}}/development/tools/vs-code
[widget inspector]: {{site.url}}/development/tools/devtools/inspector


[version 1.2]: {{site.google-blog}}/2019/02/launching-flutter-12-at-mobile-world.html

## November 5, 2018: new website

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
  [a native debugger _and_ a Dart debugger to your app]
  (not yet complete)
{% endcomment %}

If you have questions or comments about the revamped site,
[file an issue][].

[a native debugger _and_ a Dart debugger to your app]: {{site.url}}/testing/oem-debuggers
[Background Dart processes]: {{site.url}}/development/packages-and-plugins/background-processes
[community]: {{site.main-url}}/community
[file an issue]: {{site.repo.this}}/issues
[Flutter's build modes]: {{site.url}}/testing/build-modes
[front]: {{site.url}}/
[Inside Flutter]: {{site.url}}/resources/inside-flutter
[showcase]: {{site.main-url}}/showcase
[State management]: {{site.url}}/development/data-and-backend/state-mgmt
[Technical videos]: {{site.url}}/resources/videos
