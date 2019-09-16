---
title: Flutter 1.9 正式发布
toc: true
---

 
![Google Developer Days taking place in China](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot9-release/flutter1-9-gdd-keynote.jpg){:width="95%"}

This week is a big one for [Flutter](http://flutter.dev)! Today, at [Google Developer Days](https://events.google.cn/intl/en/developerdays2019/), our flagship conference for Chinese developers, we used the keynote to **announce our latest stable release: Flutter 1.9**. This release is our biggest update yet with more than 1,500 PRs from more than 100 contributors. The new features and updates span a wide range, from support for macOS Catalina and iOS 13 to improved tooling support, as well as new Dart language features and new Material widgets.

本周对 [Flutter](http://flutter.dev) 意义非凡。Google 面向中国开发者举办的重量级年度盛会——[中国 Google 开发者大会](https://events.google.cn/intl/en/developerdays2019/)于今日正式拉开帷幕。在主题演讲环节，Flutter 团队宣布推出最新稳定版: Flutter 1.9。这是 Flutter 迄今为止最大的一次版本更新，100 余位贡献者提交共计超过 1,500 份 pull request。Flutter 1.9 引入的新特性与更新涵盖范围广泛，包括 macOS Catalina 和 iOS 13 支持、工具支持优化、多项 Dart 语言新特性以及全新的 Material widget。

At the keynote, we also announced a major milestone for Flutter’s web support, with the **successful integration of Flutter’s web support into the main Flutter repository**, allowing developers to write for mobile, desktop and web with the same codebase. And we showcased [Tencent](https://www.youtube.com/watch?v=DVGIBU109nI&feature=youtu.be), one of the largest worldwide internet brands, who are using Flutter in a growing number of their mobile apps.

团队还在会上宣布了另一个具有里程碑意义的重磅消息: **Flutter web 支持现已成功合并到 Flutter 的主 repo**，自此以后，开发者只需使用同一套基准代码，便可为移动平台、桌面端和网页端开发应用。此外，团队也分享了来自全球互联网公司 [腾讯](https://www.youtube.com/watch?v=DVGIBU109nI&feature=youtu.be) 的成功案例，让现场观众体验了一把 Flutter 的蓬勃活力，亲眼见证越来越多的应用正在通过 Flutter 缔造精彩。

Let’s take a deeper look at this week’s news, starting with what’s new in Flutter 1.9.

接下来，让我们一起回顾一下 Flutter 要闻。首先，给大家介绍一下 Flutter 1.9 带来了哪些重要的更新内容。

## Supporting macOS Catalina and iOS 13

## macOS Catalina 和 iOS 13 支持

As Apple prepares to release Catalina, the latest version of macOS, we’ve worked hard to make sure that Flutter is ready for you to upgrade. We’ve updated the end-to-end tooling experience to ensure it works well on Catalina and with Xcode 11. This includes adding support for the new Xcode build system, enabling 64-bit support throughout the toolchain, and simplifying platform dependencies.

苹果将在近期内推出新版本的 macOS 操作系统 Catalina，为此，团队付出了巨大努力，以确保 Flutter 做好升级准备，顺利适配新平台。比如说，我们进一步优化了端到端的工具体验，保证 Flutter 工具能够与 Xcode 妥善协作，助力开发者面向 Catalina 开发出优质应用，具体优化项包括：为新的 Xcode 构建系统提供支持、全工具链启用 64 位支持、简化平台依赖项等。

With iOS 13 on the way, we’ve also been working to ensure your Flutter apps look great on the latest iPhone release. Flutter 1.9 includes [an implementation of the iOS 13 draggable toolbar](https://github.com/flutter/flutter/pull/35829), with both long-press and drag-from-right, and supports [vibration feedback](https://github.com/flutter/flutter/pull/37724). Work on iOS dark mode is also well underway with a number of [pull requests already merged](https://github.com/flutter/flutter/issues/35541).

此外，随着 iOS 13 即将面世，团队也在积极推进相关的支持工作，以确保您的 Flutter 应用在新款 iPhone 设备上保持美观的界面。Flutter 1.9 实现了 [iOS 13 的拖曳式工具栏功能](https://github.com/flutter/flutter/pull/35829)，允许长按与从右往左拖动两项操作，并且为 [触感反馈](https://github.com/flutter/flutter/pull/37724) 提供了支持。不少开发者已经提交了 [pull request](https://github.com/flutter/flutter/issues/35541)，希望 Flutter 支持 iOS 夜间模式，团队目前已开始着手解决这方面的需求，争取尽早推出解决方案。 

Finally, in the latest development builds, you can now turn on [experimental support for Bitcode](https://github.com/flutter/flutter/wiki/Creating-an-iOS-Bitcode-enabled-app-(experimental)), which is Apple’s platform-independent intermediate representation of a compiled program. Submitting your app as Bitcode allows Apple to optimize your binary in the future without resubmission, and opens the door to Flutter potentially supporting platforms like watchOS and tvOS that require Bitcode for app submission.

最后，最新版本的开发构建允许您启用 [Bitcode 实验性支持](https://github.com/flutter/flutter/wiki/Creating-an-iOS-Bitcode-enabled-app-(experimental))。Bitcode 是苹果新添加的一个编译特性，开启 Bitcode 功能后，开发者只需在编译环节上传与平台无关的 Intermediate Representation (中间文件) 即可。以 Bitcode 的形式上传应用后，苹果可以在后期直接对二进制文件进行优化，免除了开发者二次上传的麻烦，与此同时，这也为 Flutter 开启了更多的使用场景，比如说为 watchOS 和 tvOS 等要求上传 Bitcode 文件的平台提供支持。

## New Material widgets

## 全新的 Material widget

The [Material](https://material.io/) components and features also get an upgrade in Flutter 1.9. Material is one of the world’s leading open-source design systems, providing a comprehensive, flexible set of building blocks for implementing interactive user experiences across many platforms.

Flutter 1.9 也对 [Material](https://material.io/) 组件和特性进行了升级。作为一款全球顶尖的开源设计系统，Material 提供了丰富多彩、灵活易操作的视觉元素，助力开发者在多个平台实现高交互性的用户体验。

In this release, we provide several new widgets including `ToggleButtons` (left) and `ColorFiltered` (right).

在 Flutter 1.9 中，我们新添加了若干 widget, 其中包括 ToggleButtons 和 ColorFiltered。

![Flutter ToggleButtons Demo](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot9-release/image1phone.gif){:width="45%"}

![Flutter ColorFilter Demo](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot9-release/image2phone.gif){:width="45%"}

The `ToggleButtons` widget bundles a row of `ToggleButton` widgets together, often composed of a set of `Icon` and `Text` widgets, to form a set of buttons with fully customizable look and behavior. Do you want single selection or multi-select? Do you want to require at least one selection or allow none? Do you want square or rounded edges, thick or thin borders, icons or text, etc? You can see some of these options above on the left and see how they’re implemented in [the ToggleButtons sample](https://github.com/csells/flutter_toggle_buttons).

ToggleButtons widget 可将同一行的多个 ToggleButton widget 组合到一起，其中每个 widget 各自又由一组图标和文本 widget 构成。通过这种组合，开发者将得到一组外观与行为完全可自定义的按钮。它能为您的应用按钮实现更加多元化的设计——不论是单选还是多选，选择至少一个或是零个，尖角还是圆角、粗边或细边，图标或文本——ToggleButtons widget 全都可以满足。请查看 [ToggleButtons 示例](https://github.com/csells/flutter_toggle_buttons)，了解以上需求的具体实现。

As shown in the image above on the right, the `ColorFiltered` widget allows you to recolor a tree of child widgets just like you can recolor an image using one of several different algorithms (some of which are shown in the example screenshot above). This has many uses, for example, handling color blindness accessibility issues for your users. To see this in action, check out [the ColorFiltered sample](https://github.com/csells/flutter_color_filter).

正如上文右图所示，ColorFiltered widget 允许您更改子 widget 树的颜色，这与利用算法 (部分算法见上图样例) 给图片重新上色差不多。该 widget 能够帮您处理许多用例，例如: 向用户提供更好的色彩无障碍服务等等。请查看 [ColorFiltered 示例](https://github.com/csells/flutter_color_filter)，了解该 widget 的工作细节。

## Worldwide language support

## 全球语言支持

We’ve also added support for 24 new languages, from Afrikaans to Zulu.

我们还新增了南非语 (Afrikaans)、祖鲁语 (Zulu) 等 24 种语言的支持。

![Table of languages supported](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot9-release/i18n.png){:width="95%"}

## Dart 2.5 release

## Dart 2.5 发布

The end-to-end developer experience depends not just on the features of Flutter but also on the underlying language itself. As part of the Flutter 1.9 release, we are also releasing [Dart 2.5](https://medium.com/dartlang/dart-2-5-release-328822024970). Dart 2.5 includes a pre-release of Foreign Function Interface (FFI) support, providing native extensions so Dart can call directly into code written in C. It also introduces machine learning-powered code completions for the IDE. You can learn about both of these and more in the [Dart 2.5 announcement](https://medium.com/dartlang/dart-2-5-release-328822024970).

如要保障流畅的端到端 Flutter 开发体验，仅仅凭借强劲的特性是不够的，底层语言也至关重要。在 Flutter 1.9 发布之际，我们也推出了最新版本的 Dart 语言——[Dart 2.5](https://medium.com/dartlang/dart-2-5-release-328822024970)，内含预发布版本的 Dart: FFI ( 外部函数接口 )，它可用于实现 Dart 语言与 C 语言之间的互操作 (interop)，以及由机器学习驱动的 IDE/ 编辑器代码补全功能。更多技术细节，请阅读 [Dart 2.5 发布说明](https://medium.com/dartlang/dart-2-5-release-328822024970)（请关注微信公众号后续推文）。

## Toolchain improvements

## 工具链优化

With this release, new projects default to Swift instead of Objective-C and Kotlin instead of Java for iOS and Android projects respectively. Since many [packages](https://pub.dev) are written with Swift, making it the default language removes manual work for adding those packages to an app created with the default options. Swift 5 is ABI stable, and thanks to [app thinning work Apple has done in recent releases](https://developer.apple.com/documentation/xcode_release_notes/xcode_10_2_release_notes/swift_5_release_notes_for_xcode_10_2#3138038), the Swift dynamic libraries no longer need to be included in the distribution package for iOS 12.2 or greater, reducing the size of Swift applications compared to previous releases.

从 Flutter 1.9 开始，iOS 新项目默认使用 Swift 语言，而非 Objective-C；Android 新项目则默认使用 Kotlin，而非 Java。由于许多 [Flutter package](https://pub.dev/) 使用 Swift 编写，因此，一旦将 Swift 设置为默认语言后，开发者便无需再为启用默认设置的应用手动添加包。Swift 5 实现了 ABI 稳定，而且 [苹果在近期几个系统版本中也为应用瘦身做了许多工作](https://developer.apple.com/documentation/xcode_release_notes/xcode_10_2_release_notes/swift_5_release_notes_for_xcode_10_2#3138038)，因此 12.2 或更高版本的 iOS 系统将不再包含用于 Swift 的动态链接库，从而大幅缩小了 Swift 应用的体积。 

And as Kotlin is now the default language for new projects in Android Studio, it seems natural to make the language switch for Android also. These options are now the default for both the `flutter` CLI tool and the [IntelliJ/Android Studio](https://plugins.jetbrains.com/plugin/9212-flutter) and [VS Code](https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter) plugins for Flutter, but you can always switch back to Objective-C or Java if you prefer.

考虑到 Android Studio 新项目现在已经默认采用 Kotlin 作为开发语言了，因此，很自然地，我们就想着再往前迈一步，把所有 Android 项目的默认语言统一为 Kotlin。flutter CLI 工具、[IntelliJ/Android Studio](https://plugins.jetbrains.com/plugin/9212-flutter) 和 [VS Code](https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter) 插件均默认启用这些选项，不过，如有需要，您可随时切换回之前的 Objective-C 或 Java 语言。

Additionally, we’ve been working to improve Flutter’s error messages by making them more readable, more concise and more actionable.

此外，我们也在一直改善 Flutter 应用中的错误信息质量。优化之后，信息的可读性、简洁性和可操作性均有明显提升。

![Flutter error message](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot9-release/fluttererrormessage.png){:width="95%"}

The Flutter User Experience team has led the charge on this project; you can read the details in a separate [blog post](https://medium.com/@taodong/e098513cecf9) covering the work on structured error display. We’ve just started to apply these new patterns, and you can expect more error messages to take advantage of this work in coming releases.

该项目由 Flutter 用户体验团队负责牵头，如果您想了解更多有关结构化错误显示的内容，请阅读 [更精准更简洁: Flutter 改进错误信息提示](https://medium.com/flutter/improving-flutters-error-messages-e098513cecf9)。我们才刚刚开始采用这些新格式，预计未来将有更多错误信息会以结构化的形式呈现。

## Flutter on the web

## 在 web 平台运行 Flutter

And finally, we are very happy to announce that [the flutter_web repository](https://github.com/flutter/flutter_web) is deprecated now that web support has been merged into [the main flutter repository](https://github.com/flutter/flutter)! What this means is that if you have the latest builds of Flutter from the master or dev channel, you can target the web with the latest experimental version of Flutter by running `flutter run -d chrome`.

最后，我们很高兴地宣布，flutter_web 这个 [repo](https://github.com/flutter/flutter_web) 已经完成了自己的使命，现在所有的 web 支持已经合并到 flutter 的 [主 repo](https://github.com/flutter/flutter)！这意味着，如果您通过 master 或 dev 渠道安装最新版本的 Flutter 构建，您只需要运行 flutter run -d chrome 就可以使用最新的试验版本 Flutter 来开发 web 应用。

When you create a project, Flutter now creates a web runner via a minimal `web/index.html` file that bootstraps your web-compiled Flutter code. With that file in place, you can use the Flutter CLI tool or the IDE plugins to edit and run Flutter apps on the web.

在您创建项目时，Flutter 会通过一个最小的 web/index.html 文件来生成一个 web 运行引擎 (web runner)，其中 web/index.html 文件主要用于自举 (bootstrap) 基于 web 编译的 Flutter 代码，有了这文件后，您可使用 Flutter CLI 工具或 IDE 中的 Flutter 插件来编辑或运行针对 web 平台开发的 Flutter 应用。

![screenshot of VS Code with web support enabled for Flutter](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot9-release/vscode.png){:width="95%"}

Above is a screenshot of VS Code with web support enabled for Flutter. Notice the `web/index.html` file, along with the dropdown list allowing you to choose Chrome as your target development device. Support for web output with Flutter is still at an early phase, but this release represents a major step forward towards enabling production support for web development with Flutter.

上图为启用了 Flutter web 支持的 VS Code 界面截屏。请注意 web/index.html 文件和顶部的下拉列表允许您选择 Chrome 作为目标设备。尽管 Flutter 的 web 支持还不成熟，但是我们在 Flutter 1.9 中朝着正确的方向迈进了一大步。

At the end of July, we [announced an early adopter program](https://medium.com/flutter/flutter-for-web-early-adopter-program-now-open-9f1fb146e4c4) designed to get a group of select Flutter applications deployed to production on the web over the next six to twelve months. We received over 1,000 submissions to the program. Unfortunately, we don’t have the capacity to support everyone who applied to join the program, but now web support is merged into the Flutter framework, we’re excited that everyone can now experiment with this capability.

我们在今年 7 月底启动了一项 [早期体验计划](https://medium.com/flutter/flutter-for-web-early-adopter-program-now-open-9f1fb146e4c4)，其主要目的是加快 web 版 Flutter 应用的落地速度。获选开发者能得到必要协助，在接下来的 6 到 12 个月内在 web 环境中推出生产版本的 Flutter 应用。非常感谢大家的踊跃报名，我们收到了超过 1,000 份示例与申请，但由于名额有限，对无法参加的开发者，我们深表遗憾。不过，目前 web 支持已正式合并到 Flutter 框架中，因此，每一位开发者都有机会利用 Flutter web 支持构建出精美的应用。

Some community experiments have already showcased Flutter’s web output:

我们的开发者已经构建了许多实用的 web 工具，下面就简单介绍一下 Flutter Widget Livebook 和 Panache。

![Flutter Widget Livebook](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot9-release/communityexperiment1.png){:width="45%"}

![Panache](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot9-release/communityexperiment2.png){:width="45%"}

[Flutter Widget Livebook](https://flutter-widget-livebook.blankapp.org/) (left) is built with Flutter for web and shows Flutter widgets running live in your browser. [Panache](https://rxlabz.github.io/panache_web/) (right) is a tool for creating themes for Flutter which you can then download and drop directly into your code.

[Flutter Widget Livebook](https://flutter-widget-livebook.blankapp.org/) 是一个在网页上展示 widget 运行效果的网站，它使用 Flutter 开发，并直接运行在网页上。[Panache](https://rxlabz.github.io/panache_web/) 则是一款为 Flutter 创建主题的工具，您可以下载创建好的主题，然后将其直接添加到代码中。

Please give this updated experimental support for Flutter on the web a try and [let us know if you have any feedback](https://github.com/flutter/flutter/issues).

欢迎大家尝试更新后的实验性 web 支持，并向我们 [分享您的使用感受](https://github.com/flutter/flutter/issues)。

## Community

## 社区

We’re thrilled to see continuing fast growth and adoption of for Flutter. Here at Google, hundreds of developers are working on more than twenty projects using Flutter, including some that are released and many that are still in development. At GDD China this week, we highlighted how Tencent, one of the largest internet brands, is using Flutter pervasively for a wide variety of projects:

Flutter 惊人的成长速度和采用率让我们倍感欣慰。在 Google 内部，有超过 20 个项目正在稳步推进中，凝集着数千位工程师的辛勤付出，其中有部分项目已成功落地，其余的则尚在开发阶段。在本周的 Google 开发者大会上，我们已经与大家分享了全球互联网巨头腾讯的成功经验，介绍了腾讯是如何把 Flutter 灵活地运用到越来越多的产品中，欢迎收看下方视频，了解更多。
Bilibili 视频链接 https://www.bilibili.com/video/av67230699/

<iframe src="//player.bilibili.com/player.html?aid=67230699&cid=116573649&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

Switching gears to something just for fun, if you have Google Assistant on your phone or one of the Google Nest Hub devices, try saying “OK Google. [Talk to Flutter Widget Quiz](https://assistant.google.com/services/a/uid/000000f3a4034e91).” We loved seeing this community-powered quiz that tests your knowledge of Flutter.

现在，让我们插个轻松的话题，邀请您参加一个有趣的小游戏。请找到您手边的 Google Assistant 设备，然后对它说 “OK Google. Talk to Flutter Widget Quiz.” (OK Google, [为我接通 Flutter Widget 问答挑战赛](https://assistant.google.com/services/a/uid/000000f3a4034e91))。十分感谢 Flutter 社区对这份小测试的倾情贡献，期待各位小伙伴的精彩表现:

![Flutter Widget Quiz](https://4.bp.blogspot.com/-WnoX_nu_xLQ/XXZ7zNXYH8I/AAAAAAAAH1A/jB4iodXkUnQsHUbbOg1J97yVIoa3XLEoACLcBGAs/s1600/flutterwidgetquiz.png){:width="80%"}

## Conclusion

## 结语

We love the support we’ve received from the developer community, whether in the form of blogs and articles, published apps or issues and code contributions. For more details on upgrading to Flutter 1.9, including details on how to fix any breaking changes that you might experience as you migrate your code, check out the detailed [Flutter 1.9 release notes](https://github.com/flutter/flutter/wiki/Release-Notes-Flutter-1.9.1).

十分感谢 Flutter 开发者社区一路以来对我们的支持。来自全球各地的贡献者们为 Flutter 1.9 的发布投入了巨大的热情与努力，通过博客、文章、应用发布、报错、代码贡献等多种渠道为我们提供帮助。如果您想了解 Flutter 1.9 的升级方法，学习如何修复迁移过程中可能出现的问题，请参阅 [Flutter 1.9.1 版本说明](https://github.com/flutter/flutter/wiki/Release-Notes-Flutter-1.9.1)。

There’s a ton for you to try with this release, from trying out [the new dart:ffi or ML-based code completion features](https://medium.com/dartlang/dart-2-5-release-328822024970) to [experimenting with Flutter for web](https://flutter.dev/wehttps://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot9-release/flutterwidgetquiz.pngthub.com/csells/flutter_color_filter) widgets to testing yourself on [your Flutter widget knowledge](https://assistant.google.com/services/a/uid/000000f3a4034e91).

Flutter 1.9 提供了超级丰富的新功能等您前来体验，比如，新的 [dart:ffi](https://medium.com/dartlang/announcing-dart-2-5-super-charged-development-328822024970) 或者 [基于机器学习的代码补全功能](https://flutter.dev/web)，通过自己爱用且顺手的开发工具探索在 web 平台运行 Flutter、Catalina 与 iOS 13 支持、两款新出的 widget ([ToggleButtons](https://github.com/csells/flutter_toggle_buttons) 和 [ColorFiltered](https://github.com/csells/flutter_color_filter))，以及趣味满满的 [Flutter Widget 知识问答挑战赛](https://assistant.google.com/services/a/uid/000000f3a4034e91)。

Now that you’ve got Flutter 1.9 in your hands, we’re excited to see what you will build with it!

Flutter 1.9 已至，您将构建怎样的精彩？
