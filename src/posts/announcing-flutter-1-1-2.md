---
title: Flutter 1.12 发布
description: Flutter 1.12 正式发布，包括多项性能改进等。
---

# Announcing Flutter 1.12: What a year!

# Flutter 1.12 正式发布，为这一年画上圆满的句号！

Posted by Chris Sells, Product Manager, Flutter developer experience*

作者 / Chris Sells，Flutter 开发者体验产品经理*

Today we're pleased to announce version 1.12, the latest stable Flutter release. This makes 5 stable releases since our 1.0 release in December, 2018. It's been an amazing year! We've closed 5,303 issues and merged 5,950 pull requests from 484 contributors. In the Flutter engine and framework, we've added support for Android App Bundles, iOS 13, implemented mouse and keyboard events, released the In-App Purchase plugin, merged [several](https://github.com/flutter/engine/pull/12385) [important](https://github.com/flutter/flutter/pull/36482) [performance](https://github.com/flutter/engine/pull/10182) [improvements](https://github.com/flutter/flutter/pull/37275), localized for 24 additional locales and created several new widgets. Furthermore, the Flutter tools have seen a great deal of improvement as well, with the release of Dart DevTools, which provides the widget inspector, memory and CPU profiling, and enhanced logging that can be used regardless of your editor/IDE of choice. Also, we've added auto-import of packages for referenced types, explicit ChromeOS support, UI Guides to make your build methods easier to read and write, and improved error messages with formatting, colors and more actionable wording.

我们很高兴正式推出 Flutter 最新稳定版: Flutter 1.12。自从去年 12 月发布 Flutter 1.0 以来，这已经是我们发布的第 5 个稳定版本了。多么精彩的一年！我们一共解决了 5,303 个报错，合并了来自 484 位贡献者的 5,950 份 pull request。我们在 Flutter 引擎和框架中添加了对 Android App Bundles、iOS 13 和 web 的支持，实现了鼠标与键盘事件，发布了应用内购插件，融合了[多项](https://github.com/flutter/engine/pull/12385)[重要](https://github.com/flutter/flutter/pull/36482)的[性能](https://github.com/flutter/engine/pull/10182)[改进](https://github.com/flutter/flutter/pull/37275)，还新增了 24 种语言支持和多个 widget。
此外，随着 Dart DevTools 的发布，Flutter 开发工具也比之前更为强劲。Dart DevTools 内含 widget 检查器以及内存与 CPU 性能分析工具，而且优化后的日志功能在所有编辑器和 IDE 中都能流畅运行。此外，我们还针对引用类型添加了代码包自动导入功能，加入了 ChromeOS 显式支持以及 UI Guide，让您的构建方法更易读写，并从排版、配色和可操作性三方面对 Flutter 的错误信息进行了优化。

And with each release, we've said the same thing --- that we're just getting started. This continues to be true in this, our biggest release yet, coming from 188 contributors, closing 4,571 issues and merging 1,905 PRs. As in previous releases, enhancements abound for both the Flutter framework, and the tooling.

我们每次推出新版本的时候都会反复强调: 这是一个新的开始。Flutter 1.12 自然也不例外，作为我们到目前为止最大的一次版本更新，1.12 包含了 188 位贡献者的辛勤付出，解决了 4,571 个报错，合并了 1,905 份 pull request。与之前发布的版本类似，本次更新也包含了大量针对 Flutter 框架和开发工具的改进。

**Flutter framework**

**Flutter 框架**

This release includes a visual refresh to support iOS 13 that includes completed implementation of Dark Mode, new Cupertino widgets, several UX tweaks, and a greatly enhanced Add-to-App experience.

为更好地支持 iOS 13，Flutter 1.12 在视觉效果方面进行了全面更新，其中包括深色模式 (Dark Mode) 完整实现、全新的 Cupertino widget，多项 UX 微调以及增强版 Add-to-App 体验。

**iOS 13 dark mode completed**

**全面支持 iOS 13 深色模式**

More big news in Flutter 1.12 is the completion of our work to support the iOS 13 look and feel. This includes complete dark mode support in the Cupertino widgets.

Flutter 1.12 带来的一个重磅消息是，我们现已支持 iOS 13 风格的界面和操作。这包括在 Cupertino widget 中对深色模式的全面支持。

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot12-release/ios-13-dark-mode.png){:width="95%"}

If you'll notice in the screen shots above, dark mode support is much more than just swapping out the background color, but also adapting the rest of the colors to be a good match. Such deep attention to dark mode was a huge amount of work, but worth it to get pixel-perfect iOS design support across both dark and light mode.

仔细观察上图您会发现，如果想要支持深色模式，可不是单单换个背景颜色就大功告成了，必须要让屏幕上的其它颜色也适应偏暗的色调才行。这些细节处理为开发者带来了巨大的工作量，但是为了在深色和浅色模式下都能呈现出精美的 Cupertino 风格外观，这些努力都是值得的。

Also, in our continuing goal for pixel-perfection for iOS 13, we've added two new widgets.

在 iOS 13 上实现像素级完美是我们一直在努力的目标，为此，我们在 Flutter 1.12 中新增了 2 个 widget。

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot12-release/cupertino-context-menu-and-cupertino-sliding-segmented-control.png){:width="95%"}

[CupertinoContextMenu](https://api.flutter.cn/flutter/cupertino/CupertinoContextMenu-class.html) and [CupertinoSlidingSegmentedControl](https://api.flutter.cn/flutter/cupertino/CupertinoSlidingSegmentedControl-class.html)

And finally, in our quest to make a Flutter app feel as well as look native on iOS 13, we've [improved scrollbar fidelity](https://github.com/flutter/flutter/pull/41799), [provided for adaptive CupertinoAlertDialog padding](https://github.com/flutter/flutter/pull/42967), and [allowed for min/max date constraints on the CupertinoDatePicker](https://github.com/flutter/flutter/pull/44149).

最后，为了让 Flutter 应用能在 iOS 13 设备上实现原生级别的界面和操作感受，我们还[提高了滚动条保真度](https://github.com/flutter/flutter/pull/41799)，[提供了自适应对话框弹出模式 CupertinoAlertDialog](https://github.com/flutter/flutter/pull/42967)，并在 [CupertinoDatePicker 内添加了最小/最大日期约束](https://github.com/flutter/flutter/pull/44149)。

**Add-to-App updated**

**Add-to-App 更新**

Another improvement in our mobile support is an update to Add-to-App, which is the ability to integrate Flutter into an existing Android or iOS app. Here, we've been working on simplifying the integration flow to make adding a Flutter library to your app a better experience, including the addition of a new Flutter Module wizard in Android Studio.

Add-to-App 功能更新是我们在移动支持方面所做的另一项改进。通过 Add-to-App，开发者可以将 Flutter 集成到现有的 Android 或 iOS 应用中。我们一直在努力简化集成流程，让您可以更轻松地把 Flutter 代码库添加到应用中，比如说，我们在 Android Studio 中添加了一个全新的 Flutter 模块向导。

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot12-release/flutter-module.png){:width="95%"}

With Flutter 1.12, Add-to-App is now officially supported for adding one fullscreen Flutter instance to your app. In supporting this functionality, we've also:

Flutter 1.12 现已正式支持 Add-to-App 功能，允许开发者在应用中添加一个全屏 Flutter 实例。在支持这个功能的同时，我们还: 

-   Stabilized the APIs for platform integration in Java, Kotlin, Objective-C and Swift, including a new set of APIs for Android. See [the Android project migration docs](https://flutter.cn/go/android-project-migration) for details on changes.

    提高了 API 稳定性，以便在平台中集成 Java、Kotlin、Objective-C 和 Swift 代码，其中包括一套全新的 Android API。请参阅 [Android 项目迁移说明](https://flutter.cn/go/android-project-migration)，了解变更细节。

-   Added support for using plugins in embedded Flutter modules.

    支持在内嵌 Flutter 模块中使用插件。

-   Provided additional integration mechanisms via [Android AARs](https://flutter.cn/docs/development/add-to-app/android/project-setup#option-a---depend-on-the-android-archive-aar) and [iOS Frameworks](https://flutter.cn/docs/development/add-to-app/ios/project-setup#option-b---embed-frameworks-in-xcode) for better compatibility with existing build systems.

    通过 [Android AAR](https://flutter.cn/docs/development/add-to-app/android/project-setup#option-a---depend-on-the-android-archive-aar) 和 [iOS 框架提供额外的集成机制](https://flutter.cn/docs/development/add-to-app/ios/project-setup#option-b---embed-frameworks-in-xcode)，以提高与现有构建系统的兼容性。

-   Reworked the 'flutter attach' mechanism on the command-line tools, VSCode and IntelliJ plugins to easily attach onto a running Flutter module for debugging, DevTools and hot reload.

    更新了命令行工具、VSCode 和 IntelliJ 插件中的 "flutter attach" 机制，方便开发者接入正在运行的 Flutter 模块，并进行调试，使用 DevTools 或者进行热重载。    

To try Add-to-App, see the [website documentation](https://flutter.cn/docs/development/add-to-app) or browse our [sample projects](https://github.com/flutter/samples/tree/master/experimental/add_to_app) demonstrating various integration scenarios.

如果您想要体验 [Add-to-App](https://flutter.cn/docs/development/add-to-app) 功能，请参阅文档或浏览我们的[示例项目](https://github.com/flutter/samples/tree/master/experimental/add_to_app)，我们在这些项目中展示了多种集成场景。

**Dart 2.7**

**Dart 2.7**

Of course, everything we do in Flutter is based on Dart, so if you haven't already read about extension methods and safe string handling (including emojis), or want an update on null safety using non-nullable types, you can find that information in the [Dart 2.7 announcement](https://medium.com/dartlang/dart-2-7-a3710ec54e97).

当然，我们在 Flutter 中所做的一切都是构建在 Dart 的基础上的，所以，如果您还没有听过扩展方法和字符串安全处理 (包含表情符)，或是想要了解非空类型在空安全方面的最新知识，不妨阅读[《Dart 2.7 现已发布》](https://medium.com/dartlang/dart-2-7-a3710ec54e97)进一步了解相关信息。

**Beyond Flutter 1.12 stable**

**在 Flutter 1.12 稳定版之外也同样精彩**

At the same time that Flutter is getting new features in the stable channel, it's also getting new features beyond what you can do in stable, specifically a beta release of web support and an alpha release of macOS support.

Flutter 不仅通过稳定渠道发布了许多全新功能，稳定版之外亦是精彩纷呈，尤其是 Beta 版本的 web 支持以及 Alpha 版本的 macOS 支持。

**Web support available in beta**

**Beta 版 web 支持**

The Flutter 1.12 master, dev and beta channels all provide improved support for web.

Flutter 1.12 master、dev 和 beta 三个渠道所提供的 web 支持均有明显提升。

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot12-release/support-for-web.png){:width="95%"}

One happy customer of Flutter on the web is [Rivet](https://rivet.area120.com/link/flutter), pictured above. Rivet is an education project that currently has a mobile app in production. They're using Flutter and Firebase to build a web version of their app that they plan to launch in early 2020.

[Rivet](https://rivet.area120.com/link/flutter) (应用界面如上图所示) 对 Flutter 在 web 端的表现非常满意。Rivet 是一个教育项目，旗下的移动版应用已经发布，目前，他们正在使用 Flutter 和 Firebase 构建 web 版本的应用，预计发布时间为 2020 年 1 月。

You can learn more about what other customers are doing with Flutter's web support as well as the rest of the details in the [Flutter web blog post](https://medium.com/flutter/web-support-for-flutter-goes-beta-35b64a1217c0).

请阅读这篇 [Flutter web 支持文章](https://medium.com/flutter/web-support-for-flutter-goes-beta-35b64a1217c0)，进一步了解其他开发者的 Flutter web 故事。

**macOS moving to alpha**

**macOS 端支持进入 alpha 版本**

macOS desktop support isn't far behind, moving from tech preview to alpha, available now in both master and dev channels (in Flutter SDK 1.13).

macOS 桌面支持的进展也很顺利，现在已经从技术预览版迭代至 alpha 版，并通过 master 和 dev 两个渠道开放下载。

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot12-release/macos-desktop-support.png){:width="95%"}

Pictured here at desktop size is [a new version of the Flutter Gallery](https://flutter.github.io/samples/#/) that's been completely updated to support macOS in addition to Android, iOS, and web.

上图展示的是桌面尺寸的[新版 Flutter Gallery](https://flutter.github.io/samples/#/)，经过彻底升级，现在它已经支持 Android、iOS、web 和 macOS。

The macOS alpha represents a big step forward for Flutter's desktop support, including the new DataTree and Split sample widgets, several plugins ported to macOS, support for building in both release and profiling mode, and a greatly simplified tooling story. If you're running from the dev or master channel, you can gain access to the macOS tooling by enabling macOS desktop support in Flutter's system-wide config:

macOS 端支持的 alpha 版代表着 Flutter 在桌面支持领域的重大进展，其中包括全新的 DataTree、Split 示例 widget、已成功移植至 macOS 的多个插件、发布 (release mode) 和分析模式 (profiling mode) 内的构建支持、以及更为简便的工具体验。如果您通过 master 和 dev 渠道运行 Flutter，请在 Flutter 系统配置中启用 macOS 桌面端支持，以便获取 macOS 工具:

`$ flutter config --enable-macos-desktop`

Creating a Flutter project that runs on macOS is now just like creating any other new Flutter project with 'flutter create'.

现在，您只需通过 "flutter create" 命令就能创建一个可在 macOS 平台上运行的 Flutter 项目，操作步骤和新建一个普通的 Flutter 项目一样简单。

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot12-release/flutter-create.png){:width="95%"}

Notice the new macos directory created by default

△ 请注意默认创建的新 macOS 目录

In addition to the tooling support, we've also been working on the density that's appropriate for desktop-sized apps. Mobile apps need relatively large controls to accommodate touch interactions whereas on desktop-sized devices, a user is more likely to be using a mouse. In bringing Flutter to the desktop, we've worked on allowing you to choose the density of your widgets to better accommodate the needs of your desktop users:

除了工具支持之外，我们也在一直探索适合桌面级应用的 widget 密度。移动应用需要较大的控制区域才能正常进行触控操作，但在桌面应用中，用户更可能会使用鼠标。为了把 Flutter 带到桌面，我们现在允许您选择 widget 密度，以便更好地满足桌面用户的需求。

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot12-release/sample-demonstrating-flutters-implementation-of-the-material-density-guidelines.gif){:width="95%"}

[Sample](https://github.com/gspencergoog/density_sample) demonstrating Flutter's implementation of [the Material Density guidelines](https://material.io/design/layout/applying-density.html)

[示例](https://github.com/gspencergoog/density_sample): [Material 视觉密度设计规范](https://material.io/design/layout/applying-density.html)在 Flutter 上的实现 

And finally, to improve the experience of Flutter desktop apps, we've done a lot of work on keyboard navigation and keyboard access, including:

最后一点，为了改善 Flutter 桌面应用的体验，我们还在键盘导航和键盘访问方面做了不少工作，包括:

-   [synchronizing modifier keys with key events](https://github.com/flutter/flutter/pull/43948)

    [在按键事件中同步修饰键信息](https://github.com/flutter/flutter/pull/43948)

-   [managing item selection when a dropdown is opened](https://github.com/flutter/flutter/pull/43722)

    [在下拉列表打开时管理项目选取](https://github.com/flutter/flutter/pull/43722)

-   [adding a convenience accessor for primary focus](https://github.com/flutter/flutter/pull/43859)

    [为主焦点添加便利访问器](https://github.com/flutter/flutter/pull/43859)

-   [adding keyboard navigation, hover and shortcuts for switches](https://github.com/flutter/flutter/pull/43384)

    [为切换控件添加键盘导航、悬浮和快捷方式](https://github.com/flutter/flutter/pull/43384)

-   [checkboxes and radio buttons](https://github.com/flutter/flutter/pull/43384)

    [勾选框和单选按钮](https://github.com/flutter/flutter/pull/43384)

-   [automatic scrolling to keep focused items in view](https://github.com/flutter/flutter/pull/44965)

    [自动滚动以便让焦点项维持在视野内](https://github.com/flutter/flutter/pull/44965)

-   [keyboard shortcut-based scrolling](https://github.com/flutter/flutter/pull/45019)

    [基于键盘快捷方式的滚动](https://github.com/flutter/flutter/pull/45019)

-   [a new widget for handling focus and hover](https://github.com/flutter/flutter/pull/44867)

    [处理焦点和悬浮的新 widget](https://github.com/flutter/flutter/pull/44867)

-   [rewritten copy/paste and keyboard selection](https://github.com/flutter/flutter/pull/44130)

    [重写复制/粘贴和键盘选取](https://github.com/flutter/flutter/pull/44130)

-   [keyboard navigation of dropdowns](https://github.com/flutter/flutter/pull/42811)

    [下拉列表键盘导航](https://github.com/flutter/flutter/pull/42811)

-   [visual density support](https://github.com/flutter/flutter/pull/43547)

    [视觉密度支持](https://github.com/flutter/flutter/pull/43547)

-   [adding macOS function key support](https://github.com/flutter/flutter/pull/44410)

    [添加 macOS 功能键支持](https://github.com/flutter/flutter/pull/44410)

In addition to the Flutter sample, we also recommend [the new Photos Search sample](https://github.com/flutter/samples/tree/master/experimental/desktop_photo_search), which shows off a lot of desktop goodness, including keyboard handling, the new widget density, the new plugins, and the new widgets.

除了 Flutter Gallery，我们还推荐大家去看一下[全新的 Photos Search 示例应用](https://github.com/flutter/samples/tree/master/experimental/desktop_photo_search)，我们在其中展示了桌面平台特有的强大功能，包括键盘操作、新加入的 widget 视觉密度、新插件、新 widget 等。

For those of you curious about progress on Windows and Linux, they're still in technical preview, but both benefit from a lot of the work to get macOS to alpha. We'll share the updates to those platforms soon. For more details of where we are with desktop support in Flutter for macOS, Windows and Linux, please see [flutter.cn/desktop](https://flutter.cn/desktop).

至于 Windows 和 Linux 支持，它们目前还处在技术预览阶段，不过，macOS alpha 版的开发经历很多值得借鉴的地方，有助于我们之后开展 Windows 和 Linux 的工作。我们近期就会和大家分享关于这两个平台的最新消息。如果您想进一步了解 Flutter 为 macOS、Windows 和 Linux 等桌面系统提供了哪些支持，请移步 [flutter.cn/desktop](https://flutter.cn/desktop)。

**Flutter tooling**

**Flutter 开发工具**

In addition to the Framework and Engine, we also have a lot to talk about for Flutter tooling. This includes a new version of DartPad with support for Flutter, augmented IntelliJ-based IDEs with a preview of a new feature we're calling "Hot UI", enhanced Dart DevTools with a new visual layout view, enabled simultaneous multi-device debugging in Visual Studio Code, improved the Android build process and better support for finding differences in rendered widgets between test runs.

除了框架和引擎之外，我们在 Flutter 工具方面也有许多内容想与您分享，包括: 提供 Flutter 支持的新版本 DartPad、基于 IntelliJ 的增强版 IDE (内含新功能 Hot UI 的预览)、强化版 Dart DevTools (内含全新的视觉布局视图)、Visual Studio Code 同步多设备调试启用，以及改进版 Android 构建流程，此外，我们提供了更好的差异检测支持，帮助您检测已渲染 widget 在不同试运行中差异。

**DartPad loves Flutter**

**DartPad 现已支持 Flutter**

If you aren't already using [DartPad](https://dartpad.dev/), you should try it out! It's a great way to try Dart features without installing anything. Furthermore, with the new release of DartPad, now you get Flutter, too!

如果您还没用过 [DartPad](https://dartpad.dev/) 的话，不妨现在就上手试试！有了它，您不用安装任何工具就能体验 Dart 的功能。此外，最新的 DartPad 还支持 Flutter！

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot12-release/dartpad.png){:width="95%"}

The new DartPad leverages Flutter's web support so that when you're writing Flutter code on the left, you're running a real, live Flutter (web) program on the right. The chief difference is that using DartPad, you can get started with Flutter without installing a thing.

全新的 DartPad 活用了 Flutter 的 web 端支持，当您在左侧编写 Flutter 代码的时候，右侧就会实时运行一个真实的 Flutter (web) 程序。DartPad 的独特之处在于，您无需安装任何程序就能立即开始编写 Flutter 应用。

In addition to the stand-alone DartPad playground, we've also started adding DartPad with Flutter support into our docs and in our codelabs (like [Basic Flutter layout concepts](https://flutter.cn/docs/codelabs/layout-basics) and [Implicit animations](https://flutter.cn/docs/codelabs/implicit-animations)), so that you can learn about Flutter from the comfort of your browser. For more information on DartPad, please check out our [DartPad announcement post](https://medium.com/dartlang/a-brand-new-dartpad-dev-with-flutter-support-16fe6027784).

除了单独的 DartPad 网站之外，我们还在文档和 codelab (如 "Flutter [布局基础教程](https://flutter.cn/docs/codelabs/layout-basics)" 和 "[隐式动画](https://flutter.cn/docs/codelabs/implicit-animations)") 中加入了带 Flutter 支持的 DartPad，从而方便大家在浏览器中学习 Flutter。如果您想要了解更多关于 DartPad 的信息，请阅读《[DartPad.dev 全面升级，现已支持 Flutter](https://medium.com/dartlang/a-brand-new-dartpad-dev-with-flutter-support-16fe6027784)》。

**Build your widgets inline with Hot UI**

**在 IDE 中通过 Hot UI 直接构建 widget**

If you install the Flutter tools locally on your own machine (and we hope you will), you'll find a new feature previewed in the IntelliJ/Android Studio plugin for Flutter. It allows you to see and interact with your widgets directly in your IDE as you're building them.

如果您在自己的机器上安装了本地工具 (我们也希望您这么做)，您会在 Flutter 的 IntelliJ/Android Studio 插件中找到一个新功能预览。现在您可以在开发 widget 的过程中，直接在 IDE 里进行预览并与之进行交互。

We call this feature "Hot UI" and, like Hot Reload, as you make the changes in your code, it updates the hosted UI directly. You can also interact with the hosted UI (like changing a color, as shown here) and that change goes directly into your code. To enable the Hot UI preview, you can [read the instructions on the Flutter wiki](https://github.com/flutter/flutter-intellij/wiki/HotUI-Getting-Started-instructions).

我们把这个功能起名为 Hot UI，它与热重启有点类似，当您在代码中做出改动的时候，Hot UI 就会直接更新对应的 UI。您也可以和 UI 进行互动 (比如像上图中这样更改颜色)，所有改动会直接写入代码。如需启用 Hot UI 预览功能，请阅读 [Github Flutter wiki 页面上的操作指南](https://github.com/flutter/flutter-intellij/wiki/HotUI-Getting-Started-instructions)。

**Debug layout issues with the Layout Explorer**

**使用 Layout Explorer 调试布局问题**

Whether you write the code by hand or let Hot UI write it for you, you've still got code and sometimes code has issues. Helping you track down and fix your issues is exactly why Dart DevTools was invented. In this new version of DevTools, we've added a feature called the "Layout Explorer" to augment the Inspector with a visual representation of your layout.

无论您是选择自己手写代码，还是让 Hot UI 替写，代码中出现问题总是难免的。我们推出 Dart DevTools 工具的目的就是，帮助您找到并修复这些问题。在新版 DevTools 中，我们添加了一个名为 Layout Explorer 的功能，它能够以可视化的方式呈现应用的布局信息，从而让检查器可以更好地发挥功能。

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot12-release/layout-explorer.gif){:width="95%"}

Not only does the Layout Explorer help you to visualize the layout of the widgets in your running app, but if you'd like to experiment with changing the layout options, it allows you to do so interactively. We're hoping the preview of this feature helps make it easier to understand and fix your layout issues. To enable this feature, see [the Layout Explorer docs](https://flutter.cn/docs/development/tools/devtools/inspector#flutter-layout-explorer).

Layout Explorer 不仅能以可视化的方式展现正在运行的应用中的 widget 布局，而且还允许您以交互的方式更改布局选项。我们希望这个功能预览可以让您更容易理解并修正布局问题。如需启用这一功能，请参阅 [Layout Explorer 官方文档](https://flutter.cn/docs/development/tools/devtools/inspector#flutter-layout-explorer)。

**Multi-device debugging**

**多设备调试**

When you've built and debugged your Flutter UI, you have most likely done it on a single device. Wouldn't it be nice to be able to debug your app across multiple devices (physical or virtual) at the same time? With Flutter's support for multi-session debugging in Visual Code, that's just what you can do.

构建并调试 Flutter UI 的工作往往是在同一台设备上完成的。如果能同时在多台实体或虚拟的设备上调试您的应用，是不是会更好呢？Flutter 在 Visual Code 上提供的多会话调试支持就能帮您做到这一点。

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot12-release/multi-device-debugging.png){:width="95%"}

Here we've got the same Flutter app running simultaneously on three separate debugging sessions. If we make a change in the code, Hot Reload makes sure that it's reflected in all three apps. If we set a breakpoint, whichever app triggers that code gets stopped. If you'd like to stop debugging one, you can do so without stopping them all. You can learn how to configure this feature for [multiple device debugging on the wiki](https://github.com/flutter/flutter/wiki/Multi-device-debugging-in-VS-Code).

从上面这张图里我们可以看到，一个 Flutter 应用正同时运行在 3 个不同的调试会话中，如果我们在代码中做出一处更改，Hot Reload 会确保这个更改反映在所有 3 个应用中。如果我们设置一个断点，那么无论哪个应用触发了相关代码，它都会停下来。如果您想中止某一个会话的调试，也不需要停止所有的会话。请前往 Github wiki 页面了解如何配置这个功能来实现[多设备调试](https://github.com/flutter/flutter/wiki/Multi-device-debugging-in-VS-Code)。

**Android build improvements**

**Android 构建改进**

And finally, to continue to improve Android, we addressed some build problems in this release. Firstly, we made the Android build more robust, specifically around combining plugins using Support Libraries and those using AndroidX. We did this by moving the Flutter team's plugins to AndroidX and [we recommend that apps and plugins move to AndroidX as well](https://flutter.cn/docs/development/packages-and-plugins/plugin-api-migration). However, for plugins that haven't yet moved, if there is a build problem, we have an alternate code path in our build that uses Android Archive files and Jetifier. The build is slower, which is why it's not the primary build mechanism, but we find that it solves about 95% of the build problems we've encountered.

最后一点，为了继续改进 Android，我们在新版本中解决了一些构建方面的问题。首先，我们让 Android 构建体验更加强健了，尤其是使用 Support 库的插件与使用 AndroidX 的插件混用的情况。我们的做法是把 Flutter 团队的插件移入 AndroidX，我们[建议大家把应用和插件也迁移至 AndroidX](https://flutter.cn/docs/development/packages-and-plugins/plugin-api-migration)。对于那些尚未迁移的插件，如果存在构建问题，我们已经在构建中添加了其它的代码路径，这个路径使用的是 Android Archive 文件和 Jetifier。但如此一来构建的速度也减慢了，所以我们不把它作为主要的构建机制，但我们发现，这个做法解决了我们遇到的大约 95% 的构建问题。

Another issue we addressed was deprecating Proguard in favor of [R8](https://developer.android.com/studio/build/shrink-code), the new code optimizer from Google. Before this release, the app author had to configure ProGuard rules manually using guidance provided by the plugin author. In this release, plugins can define their rules in the source code and R8 consumes these rules automatically, saving the app developer that headache.

我们解决的另一个问题使用 Google 旗下的最新代码优化器 [R8](https://developer.android.google.cn/studio/build/shrink-code) 来替代 ProGuard。在此版本之前，应用开发者必须按照插件作者提供的指南手动配置 ProGuard 规则。在从新版本开始，插件可在源代码中定义规则，R8 会自动根据这些规则进行代码优化，从而为开发者解决了手动配置的难题。

Furthermore, in our attempt to continue to make Flutter as slim as possible, we reduced the Hello, World app size for Android by 2.6% (reducing it from 3.8MB to 3.7MB). Every little bit helps!

此外，我们也在一直努力减少 Flutter 的应用体积，现在，供 Android 使用的 Hello, World 应用已经成功 "瘦身" 2.6% (从 3.8MB 降到 3.7MB)。不积跬步，无以至千里！

**Golden image testing**

**Golden 图像测试**

The term "golden image" refers to a master image file that is considered the true rendering of a given widget, state, application, or other visual representation you have chosen to capture. In Flutter 1.12, we have implementations of the [GoldenFileComparator](https://api.flutter.cn/flutter/flutter_test/GoldenFileComparator-class.html) and [LocalFileComparator](https://api.flutter.cn/flutter/flutter_test/LocalFileComparator-class.html) classes that compare by pixels instead of bits, [eliminating false positives](https://github.com/flutter/flutter/issues/30036). These new implementations highlight visual differences to make it clear when there are differences between your golden image and the updates under testing.

Golden 图像指的是一个主图像文件，它是 widget、state、应用或其它您选择捕捉的视觉内容的正确渲染结果。在 Flutter 1.12 中，我们实现了 [GoldenFileComparator](https://api.flutter.cn/flutter/flutter_test/GoldenFileComparator-class.html) 和 [LocalFileComparator](https://api.flutter.cn/flutter/flutter_test/LocalFileComparator-class.html) 类，它们依照像素而不是比特来进行比较，因此可以彻底消除错误的比较结果。这些新的实现强调呈现视觉差异，从而更清楚地展现出 Golden 图像和正在测试中的更新文件之间的差异。

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot12-release/golden-image-testing.png){:width="95%"}

In this case, it's clear that the differences between the master and the test image are all in the border, making it much easier to track down the discrepancy.

在这个例子中，主图像文件 (上图) 和测试图像文件 (下图) 之间的差异集中在轮廓上，通过差值图 (中图) 可以更容易地看出二者之间的差异。

**Community**

**社区**

In addition to all of the work on Flutter and its associated tooling, the Flutter community continues to take Flutter into new and amazing directions! To see what developers in the community are doing, we've put together a little video.

除了 Flutter 及其工具方面的工作，Flutter 社区还在不断地引领 Flutter 前往令人惊奇的新领域！请查看☟下方视频☟，了解一下社区中的开发者们正在做什么。

We're so lucky to have such a great set of developers in the Flutter community. You make us all proud to be on the Flutter team!

拥有这样一群了不起的开发者，真是 Flutter 社区的一大幸事。您们让全体 Flutter 团队成员深感骄傲！

<iframe src="//player.bilibili.com/player.html?aid=86761188&cid=148257761&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="560" height="315"> </iframe>

**Flutter Favorite packages**

**Flutter Favorite 代码包**

When we released Flutter 1.0 in December, 2018, there were about 1000 packages on pub.dev that supported Flutter and we thought that was a huge number. As of this writing, that number has increased by more than 6x. With that many options, it's sometimes hard to know which packages to choose. The overall score on pub.dev helps as well as the new [Verified Publishers](https://medium.com/dartlang/verified-publishers-98f05466558a) feature. Now, pub.dev is getting [a rating system](https://medium.com/dartlang/dart-2-7-a3710ec54e97), which should help even more.

当我们在 2019 年 12 月推出 Flutter 1.0 的时候，pub.dev 上大约有 1,000 个代码包支持 Flutter，我们当时认为这个数字很大。现在，这个数字已经增加至 6 倍以上。选择这么多，究竟该用哪个代码包反而成了一件麻烦事。pub.dev 的综合评分系统和全新的 [Verified Publishers (发布者认证)](https://medium.com/dartlang/verified-publishers-98f05466558a) 功能都能帮助大家更好地做出选择。另外，pub.dev 即将迎来[评分系统](https://medium.com/dartlang/dart-2-7-a3710ec54e97)，进一步为大家提供方便。

Still, our users have asked again and again for a set of "recommended" packages and plugins. With that in mind, we're pleased to announce [the Flutter Favorite program](https://flutter.cn/docs/development/packages-and-plugins/favorites).

我们的用户仍在不断要求推出 "官方推荐" 的代码包和插件。为此，我们很高兴地推出 [Flutter Favorite 计划](https://flutter.cn/docs/development/packages-and-plugins/favorites)。

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot12-release/the-flutter-favorite-program.png)

A Flutter Favorite package (or plugin) is one that we think that you should consider first when building your app. The "we" in that sentence is the Flutter Ecosystem Committee, a group of regionally-diverse individuals picked from the Flutter team at Google and from the Flutter community at large to address issues across the Flutter ecosystem. Their first job was to establish a high quality bar and to identify an initial set of packages that met that quality bar. The authors of those packages are able to use the Flutter Favorite logo in their package documentation. Furthermore, pub.dev has been updated to show the logo in search results and other places.

Flutter Favorite 代码包 (或插件) 是我们认为您在构建应用时的第一选择。这里的 "我们" 指的是 Flutter Ecosystem Committee (Flutter 生态圈委员会)。委员会成员来自各个地区，由 Google 的 Flutter 团队和 Flutter 社区共同推选，他们的目标是解决 Flutter 生态圈中存在的各种问题。委员会要做的第一件事就是建立一个高标准基线，并依照这个标准线挑选出合适的代码包。被选中的代码包的作者可以在代码包说明文档中使用 Flutter Favorite 徽标。此外，pub.dev 在更新后也会在搜索结果等位置显示 Flutter Favorite 徽标。

For details, see [the Flutter Favorite page on flutter.cn](https://flutter.cn/docs/development/packages-and-plugins/favorites). You can also see [the complete list of Flutter Favorite packages on pub.dev](https://pub.dev/flutter/favorites). The bottom line is that if you're an app developer and you see that logo, you should have confidence in that package. If you're a package author and you've been awarded the Flutter Favorite logo, thank you for your contribution to the Flutter ecosystem.

请大家前往 flutter.cn 网站上的 [Flutter Favorite 页面](https://flutter.cn/docs/development/packages-and-plugins/favorites)了解详情。您也可以前往 pub.dev 查看[完整的 Flutter Favorite 代码包列表](https://pub.dev/flutter/favorites)。关键是，如果您是应用开发者，而且您看到了 Flutter Favorite 徽标，那么您就可以认为这个代码包是可以信赖的。如果您是得到 Flutter Favorite 认证的代码包作者，我们非常感谢您对 Flutter 生态圈所做的贡献。

**Community tools**

**来自社区的工具**

And speaking of contributions to be proud of, the Flutter community at large has been building a number of excellent tools as well; here's just a selection.

谈到值得骄傲的贡献，就不得不说 Flutter 社区打造的众多出色工具。我们在下面列举部分成果。

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot12-release/flutter-device-preview.png){:width="95%"}

[Flutter Device Preview](https://github.com/aloisdeniel/flutter_device_preview)

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot12-release/widget-maker.png){:width="95%"}

[Widget Maker](https://www.widgetmaker.dev/)

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot12-release/panache.png){:width="95%"}

[Panache](https://rxlabz.github.io/panache/#/)

**Featured tooling partner: Nevercode**

**工具开发伙伴鸣谢: Nevercode**

In addition to a great set of community tools, the Flutter ecosystem has a great set of tooling partners as well. One notable partner has always been Nevercode, who have a whole new set of features in their latest release, including [a Visual Studio Code plugin called Remote Mac](https://marketplace.visualstudio.com/items?itemName=codemagic.remote-mac).

Flutter 生态圈不仅包括由社区开发的丰富工具，还有一批很棒的工作开发伙伴。Nevercode 一直以来都是我们的重要合作伙伴之一，他们最新发布的工具提供了许多新功能，其中一项就是名为 [Remote Mac 的 Visual Studio Code 插件](https://marketplace.visualstudio.com/items?itemName=codemagic.remote-mac)。

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot12-release/remote-mac.png){:width="95%"}

The Remote Mac extension lets you connect directly to a Mac that they've hosted in the cloud for purposes of testing your iOS and macOS Flutter code. For more details about Nevercode's latest release, including new support for Flutter on the web and on macOS, new enterprise features and more, check out [their newest blog post](https://blog.codemagic.io/more-professional-capable-accessible/).

Remote Mac 扩展插件可以让您直接连上一台由团队托管在云端的 Mac 主机，然后测试 iOS 和 macOS 版本的 Flutter 代码。如果您想要了解更多关于 Nevercode 最新产品的信息，例如对 web 端和 macOS 端 Flutter 的最新支持，全新的企业功能等等，请参阅他们[最新发布的博文](https://blog.codemagic.io/more-professional-capable-accessible/)。

To see the progress being made by our other tooling partners, you should definitely [check out what Supernova, Rive and Adobe are up to in their latest releases](https://developers.googleblog.com/2019/12/flutter-ui-ambient-computing.html).

其他工具开发伙伴们的进展也不容错过，欢迎阅读《[Flutter: 首个面向环境计算打造的 UI 平台](https://developers.googleblog.com/2019/12/flutter-ui-ambient-computing.html)》了解 Supernove、2Dimensions 和 Adobe 最新发布的产品。

**Conclusion**

**结语**

This has definitely been a big year for Flutter and v1.12 is a big release. This blog post has been a whirlwind tour of what's new in this release; if you'd like to check on your favorite pull release, see where we've been spending our time in this release by how many pull releases in each area or see what we broke, then we recommend [the Flutter 1.12 Release Notes](https://flutter.cn/docs/development/tools/sdk/release-notes/release-notes-1.12.13).

今年对于 Flutter 来说是非常重要的一年，Flutter 1.12 更是一次意义重大的发布。本文大致为大家展示了本次发布版本中的新内容；如果您想要查看您最喜欢的 pull release，了解我们把精力投放在了哪些地方，想要看看每个领域中有多少 pull release，或者看看我们在代码和功能上做了哪些改动，欢迎查阅 [Flutter v1.12 发布说明](https://flutter.cn/docs/development/tools/sdk/release-notes/release-notes-1.12.13)。

We hope you agree that Flutter is moving in the right direction and picking up speed. With all of these new features and new tools, where do you want your app to run today?

我们认为 Flutter 正朝着正确的方向快步前进，希望您也同意我们的看法。拥有这么多的新功能和新工具之后，您会构建什么呢？我们拭目以待。

文/ (Flutter Blog](https://medium.com/flutter/announcing-flutter-1-12-what-a-year-22c256ba525d)，译/ [谷歌开发者](https://mp.weixin.qq.com/s/sETtUi-J4cxCCbKP_FQkpA)
