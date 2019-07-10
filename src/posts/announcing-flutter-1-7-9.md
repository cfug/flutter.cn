---
title: Flutter 1.7 版正式发布
---

文 / Tim Sneath，谷歌 Dart & Flutter 产品组产品经理

Today we're pleased to announce the general availability of Flutter 1.7, a smaller release after the major feature announcements at Google I/O. Flutter 1.7 contains support for AndroidX and for updated Play Store requirements, a number of new and enhanced components, and bug fixes to customer-reported issues.

我们很高兴地宣布，今天正式发布继 Google I/O 大会以来的下一个通用版本 Flutter 1.7。它包括新增了对 AndroidX 以及 Google PlayStore 更新要求的支持，以及大量组件优化并修复了一些 issue 中用户反馈的 bug。

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot7-release/announcing-1-7.png)

If you already have Flutter on your system and you're on the default stable channel, you can upgrade to version 1.7 by running `flutter upgrade` from the command line. The updated release is also included in [a new installation](https://flutter.dev/docs/get-started/install) of Flutter.

如果你已经在系统中安装了 Flutter 并且使用的默认的 stable channel，那么你可以直接通过在命令行中运行 `flutter upgrade` 来升级到 1.7 版本。本次发布的更新还包括一个[新的 Flutter 安装包](https://flutter.dev/docs/get-started/install)。

## AndroidX Support for New Apps

## 新应用将增加 AndroidX 支持
=============================

[AndroidX](https://developer.android.com/jetpack/androidx) is a new open source support library from the Jetpack team that helps Android apps stay updated with the latest components without sacrificing backward compatibility. Now that AndroidX is itself stable and many Flutter packages have been updated to support it, Flutter now supports [creating new Flutter projects with AndroidX](https://github.com/flutter/flutter/pull/31028), which reduces the work needed to integrate with other parts of the Android ecosystem.

[AndroidX](https://developer.android.com/jetpack/androidx) 是新一代 Jetpack 的开源支持库，它能够帮助 Android 应用一直处于最新组件

When creating a Flutter project, you can add the `--androidx` flag to ensure the generated project targets the new support library. More information about migrating existing projects to AndroidX can be found [on flutter.dev](https://flutter.dev/docs/development/packages-and-plugins/androidx-compatibility#for-plugin-maintainers-migrating-a-flutter-plugin-to-androidx). We're actively working on bringing AndroidX / Jetifier support for apps with mixed AndroidX / Android Support libraries, such as in add-to-app cases, and will have more to share on this front in a forthcoming post.

## Support for Android app bundles and 64-bit Android apps
=======================================================

From August 1st, 2019, Android apps that use native code and target Android 9 Pie will be [required to provide a 64-bit version](https://developer.android.google.cn/distribute/best-practices/develop/64-bit) in addition to the 32-bit version when publishing to the Google Play Store. While Flutter has long supported generating 64-bit Android apps, version 1.7 adds support for creating [Android App Bundles](https://developer.android.google.cn/guide/app-bundle) that target both 64-bit and 32-bit from a single submission. See the updated [documentation on publishing Flutter-based Android apps](https://flutter.dev/docs/deployment/android) to learn how to do this, as well as how to create separate APK files for both 32-bit and 64-bit devices.

## New widgets and framework enhancements
======================================

We want your apps to look great and feel natural, regardless of what platform you're targeting. Correspondingly, we continue to update and enhance the widgets available for both Android and iOS.

This release features a new `[RangeSlider](https://github.com/flutter/flutter/pull/31681)` control that lets you select a range of values on a single slider (for example a minimum and maximum temperature value):

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot7-release/rangeslider-widget.gif)

The new, themeable RangeSlider widget supports continuous or discrete styles

The [updated ](https://github.com/flutter/flutter/pull/31275)`[SnackBar](https://github.com/flutter/flutter/pull/31275)`[ widget](https://github.com/flutter/flutter/pull/31275) supports an updated look in the Material spec, and a [number](https://github.com/flutter/flutter/pull/31294) [of](https://github.com/flutter/flutter/pull/32177) [new](https://github.com/flutter/flutter/pull/31929) [samples](https://github.com/flutter/flutter/pull/32703) are added [to the](https://github.com/flutter/flutter/pull/34679) [documentation](https://github.com/flutter/flutter/pull/32530).

For [Cupertino](https://flutter.dev/docs/development/ui/widgets/cupertino), the Flutter library for building pixel-perfect iOS applications, we've made a number of updates. In particular, we've improved the fidelity of the `[CupertinoPicker](https://github.com/flutter/flutter/pull/31464)`[ and ](https://github.com/flutter/flutter/pull/31464)`[CupertinoDateTimePicker](https://github.com/flutter/flutter/pull/31464)`[ widgets](https://github.com/flutter/flutter/pull/31464), and added support for localization to non-English languages.

We also made major improvements to the [text selection and editing experience on iOS](https://flutter.dev/docs/resources/platform-adaptations#text-editing), regardless of whether you're using the Material or Cupertino design language. Also, a [new sample](https://github.com/flutter/samples/tree/master/platform_design) demonstrates how to make more significant platform adaptations across iOS and Android while retaining the same codebase.

Text rendering gets a big upgrade with support for rich [typography features](https://api.flutter.dev/flutter/painting/TextStyle/fontFeatures.html), including tabular and old-style numbers, slashed zeros, and stylistic sets, as [this demo](https://github.com/timsneath/typography) shows:

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot7-release/openType-font.png)

With Flutter, you can now add sophisticated typography with OpenType font feature support

Lastly, we've added support for [game controllers](https://github.com/flutter/flutter/pull/33868). Could this lead to some fun Flutter apps? You tell us!

## Focus on the Fundamentals
=========================

Flutter 1.7 represents a lot of hard work by the team to respond to customer-reported issues, with [over 1,250 issues closed in the two months](https://github.com/flutter/flutter/issues?q=is%3Aissue+is%3Aclosed+closed%3A2019-04-22..2019-06-21+sort%3Areactions-%2B1-desc) since our last stable release.

With the rapid growth in Flutter, we're seeing lots of new issues reported, and to be transparent, the bug process that worked well when our project was smaller is not working so well now. As a result, our open issue count has increased significantly over the last few months, despite our progress in closing triaged issues. We're working to increase staffing in this area, which will help with faster triaging of new bugs, closing and merging duplicate issues and redirecting support requests to [StackOverflow](https://stackoverflow.com/questions/tagged/flutter).

In recent surveys, many of you said that you'd like to see us continue to invest in documentation and error messages. One key part of that work is to provide better structure for our errors which tools like VSCode and Android Studio can take advantage of in the future. You can see examples of this work [in issue 34684](https://github.com/flutter/flutter/pull/34684).

We also fixed the top crashing bug, which was an error when the Flutter tool is unable to write to the Flutter directory. Flutter now fails gracefully if the user doesn't have write permissions, with clearer indications on how to fix the problem.

In terms of documentation, we have an ever increasing list of samples that can be created directly from the flutter create tool. From the command line, you can run a command such as:

flutter create --sample=widgets.Form.1 mysample

If a sample can be created in this way, you'll see a "Sample in the App" tab in the documentation, as in [this example for the Form widget](https://api.flutter.dev/flutter/widgets/Form-class.html):

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot7-release/sample-at-docs.png)

We're also continuing to embed the popular [Widget of the Week](https://www.youtube.com/playlist?list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG) videos directly into the documentation, as an easy way to grok the various widgets in Flutter's toolkit.

Behind the scenes, you'll see lots of underlying work to create infrastructure towards enabling Flutter on macOS and Windows, with further support for important concepts like right-click and unique platform infrastructure such as [MSBuild](https://docs.microsoft.com/en-us/visualstudio/msbuild/msbuild?view=vs-2019). Support for non-mobile platforms is not yet available in the stable channel, however.

Lastly, when you're building Flutter apps on the Mac, we now have support for [the new Xcode build system](https://github.com/flutter/flutter/pull/33684). This is on by default for new projects, and [easy to enable for existing projects](https://github.com/flutter/flutter/issues/20685#issuecomment-509731873).

## An ever-growing Flutter community

## 不断壮大的 Flutter 社区
=================================

As ever, it's exciting to see Flutter continue to grow in popularity and usage, and we also celebrate the ways customers large and small are using Flutter. Since I/O, the team has been busy with various events around the world: from [GMTC](https://gmtc2019.geekbang.org/) in China to meetups and presentations in New York and Mexico; it's been great to meet with many of you and hear about some of the apps that you're building.

一如既往的，我们非常高兴看到 Flutter 在使用群体和应用模式上都在持续增长，同时我们也赞赏大家使用 Flutter 的各种方式，规模或大或小都有。从 I/O 以来，整个团队都致力于全球范围内的各项活动：从中国的 [GMTC](https://gmtc2019.geekbang.org/) 到纽约和墨西哥的聚会和分享，能和大家面对面交流你们所开发的应用是一件特别棒的事。

We've talked about [Reflectly](https://www.forbes.com/sites/heatherfarmbrough/2018/05/01/reflectly-wants-to-be-an-adidas-of-the-mind/#572291294204) before: a small Danish company who built a beautiful mindfulness app for iOS and Android. Their app was just featured as Apple's App of the Day on their US iPhone app store, demonstrating how Flutter apps are more than capable of delivering reference-quality experiences:

之前我们提到过[Reflectly](https://www.forbes.com/sites/heatherfarmbrough/2018/05/01/reflectly-wants-to-be-an-adidas-of-the-mind/#572291294204)，它是一个丹麦的公司，他们在 iOS 和 Android 平台开发了非常有吸引力的应用程序。他们的应用程序被美国 iPhone 应用商店评为当日最佳应用。这也证明了 Flutter 的真正潜力远远超过仅仅实现一个用户体验流畅的应用。

And at the [WeAreDevelopers](https://events.wearedevelopers.com/) conference in Berlin, [BMW announced their new Flutter-based app](https://youtu.be/80pRyn7fZRk?t=1234), currently in development. Here's what Guy Duncan, CTO Connected Company at BMW, had to say:
在柏林的  [我们是开发者](https://events.wearedevelopers.com/) 大会中，[BMW 发布了他们基于 Flutter 的应用](https://youtu.be/80pRyn7fZRk?t=1234)，目前已经在开发中。下面这段描述来自 Guy Duncan，他是 BMW 集团互联公司的 CTO：

> "By combining Dart and Flutter we have the first true cross-platform mobile toolkit; we feel it is a game changer to ensure feature parity for digital touchpoints and IoT.
>
>通过结合 Dart 和 Flutter，我们实现了第一个真正跨平台的移动工具包；我们认为它打破了原有的游戏规则，可以平衡数字交互和物联网的功能特性。

> By moving forward with world class tooling, automation and modern functional programming patterns we can improve feature cycle time, security, and cost of delivery of features for the business."
>
> 通过使用主流的工具链、自动化工具和现代化的编程模式，我们可以优化循环时延、安全性、商业应用特性的推送成本。

Beyond apps, of course the open source community is what makes Flutter such a fun place to work, with so many [resources](https://flutterx.com/), [plugins](https://pub.dev/flutter), [events](https://flutterevents.com/) and [meetups](https://www.meetup.com/topics/flutter/). We continue to be amazed by how you're using Flutter and are honored to be able to share the fun with you all!

除了应用程序，整个开源社区所涉及的众多  [资源](https://flutterx.com/)，[插件](https://pub.dev/flutter)， [活动](https://flutterevents.com/)和[聚会](https://www.meetup.com/topics/flutter/) 也使得 Flutter 变得格外生机勃勃。我们会持续关注大家基于 Flutter 所实现的各种有趣的应用，同时也非常荣幸和大家一起分享其中的乐趣。

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot7-release/flutter-bag.jpeg)

Photo credit: [@damian2048](https://twitter.com/damian2048)

原文：[Flutter 官方博客](https://medium.com/flutter/announcing-flutter-1-7-9cab4f34eacf)

译者：鑫磊，Yuan