---
title: Flutter 1.12 发布
description: Flutter 1.12 正式发布，为这一年画上圆满的句号！
---

# Flutter 1.12 正式发布，为这一年画上圆满的句号！

作者 / Chris Sells，Flutter 开发者体验产品经理*


我们很高兴正式推出 Flutter 最新稳定版: Flutter 1.12。自从去年 12 月发布 Flutter 1.0 以来，这已经是我们发布的第 5 个稳定版本了。多么精彩的一年！我们一共解决了 5,303 个报错，合并了来自 484 位贡献者的 5,950 份 pull request。我们在 Flutter 引擎和框架中添加了对 Android App Bundles、iOS 13 和 web 的支持，实现了鼠标与键盘事件，发布了应用内购插件，融合了多项重要的性能改进，还新增了 24 种语言支持和多个 widget。

此外，随着 Dart DevTools 的发布，Flutter 开发工具也比之前更为强劲。Dart DevTools 内含 widget 检查器以及内存与 CPU 性能分析工具，而且优化后的日志功能在所有编辑器和 IDE 中都能流畅运行。此外，我们还针对引用类型添加了代码包自动导入功能，加入了 ChromeOS 显式支持以及 UI Guide，让您的构建方法更易读写，并从排版、配色和可操作性三方面对 Flutter 的错误信息进行了优化。

我们每次推出新版本的时候都会反复强调: 这是一个新的开始。Flutter 1.12 自然也不例外，作为我们到目前为止最大的一次版本更新，1.12 包含了 188 位贡献者的辛勤付出，解决了 4,571 个报错，合并了 1,905 份 pull request。与之前发布的版本类似，本次更新也包含了大量针对 Flutter 框架和开发工具的改进。

-   多项重要的性能改进

    https://github.com/flutter/engine/pull/12385

    https://github.com/flutter/flutter/pull/36482

    https://github.com/flutter/engine/pull/10182

    https://github.com/flutter/flutter/pull/37275

**Flutter 框架**

为更好地支持 iOS 13，Flutter 1.12 在视觉效果方面进行了全面更新，其中包括深色模式 (Dark Mode) 完整实现、全新的 Cupertino widget，多项 UX 微调以及增强版 Add-to-App 体验。

**全面支持 iOS 13 深色模式**

Flutter 1.12 带来的一个重磅消息是，我们现已支持 iOS 13 风格的界面和操作。这包括在 Cupertino widget 中对深色模式的全面支持。

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot12-release/ios-13-dark-mode.png)

仔细观察上图您会发现，如果想要支持深色模式，可不是单单换个背景颜色就大功告成了，必须要让屏幕上的其它颜色也适应偏暗的色调才行。这些细节处理为开发者带来了巨大的工作量，但是为了在深色和浅色模式下都能呈现出精美的 Cupertino 风格外观，这些努力都是值得的。

在 iOS 13 上实现像素级完美是我们一直在努力的目标，为此，我们在 Flutter 1.12 中新增了 2 个 widget。

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot12-release/cupertino-context-menu-and-cupertino-sliding-segmented-control.png)

△ 上图左侧为 CupertinoContextMenu

右侧为 CupertinoSlidingSegmentedControl

-   CupertinoContextMenu

    https://api.flutter.dev/flutter/cupertino/CupertinoContextMenu-class.html

-   CupertinoSlidingSegmentedControl

    https://api.flutter.dev/flutter/cupertino/CupertinoSlidingSegmentedControl-class.html

最后，为了让 Flutter 应用能在 iOS 13 设备上实现原生级别的界面和操作感受，我们还提高了滚动条保真度，提供了自适应对话框弹出模式 CupertinoAlertDialog，并在 CupertinoDatePicker 内添加了最小/最大日期约束。

-   提高滚动条保真度

    https://github.com/flutter/flutter/pull/41799

-   自适应对话框弹出模式 CupertinoAlertDialog

    https://github.com/flutter/flutter/pull/42967

-   在 CupertinoDatePicker 内添加最小/最大日期约束

    https://github.com/flutter/flutter/pull/44149

**Add-to-App 更新**

Add-to-App 功能更新是我们在移动支持方面所做的另一项改进。通过 Add-to-App，开发者可以将 Flutter 集成到现有的 Android 或 iOS 应用中。我们一直在努力简化集成流程，让您可以更轻松地把 Flutter 代码库添加到应用中，比如说，我们在 Android Studio 中添加了一个全新的 Flutter 模块向导。

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot12-release/flutter-module.png)

Flutter 1.12 现已正式支持 Add-to-App 功能，允许开发者在应用中添加一个全屏 Flutter 实例。在支持这个功能的同时，我们还: 

-   提高了 API 稳定性，以便在平台中集成 Java、Kotlin、Objective-C 和 Swift 代码，其中包括一套全新的 Android API。请参阅 Android 项目迁移说明，了解变更细节。

-   支持在内嵌 Flutter 模块中使用插件。

-   通过 Android AAR 和 iOS 框架提供额外的集成机制，以提高与现有构建系统的兼容性。

-   更新了命令行工具、VSCode 和 IntelliJ 插件中的 "flutter attach" 机制，方便开发者接入正在运行的 Flutter 模块，并进行调试，使用 DevTools 或者进行热重载。

-   Android 项目迁移说明

    http://flutter.dev/go/android-project-migration

-   Android AAR

    https://flutter.dev/docs/development/add-to-app/android/project-setup#option-a---depend-on-the-android-archive-aar

-   iOS 框架

    https://flutter.dev/docs/development/add-to-app/ios/project-setup#option-b---embed-frameworks-in-xcode

如果您想要体验 Add-to-App 功能，请参阅文档或浏览我们的示例项目，我们在这些项目中展示了多种集成场景。

-   Add-to-App 文档

    https://flutter.dev/docs/development/add-to-app

-   示例项目

    https://github.com/flutter/samples/tree/master/add_to_app

**Dart 2.7**

当然，我们在 Flutter 中所做的一切都是构建在 Dart 的基础上的，所以，如果您还没有听过扩展方法和字符串安全处理 (包含表情符)，或是想要了解非空类型在空安全方面的最新知识，不妨阅读《Dart 2.7 现已发布》进一步了解相关信息。

-   Dart 2.7 现已发布

    https://medium.com/dartlang/dart-2-7-a3710ec54e97

**在 Flutter 1.12 稳定版之外也同样精彩**

Flutter 不仅通过稳定渠道发布了许多全新功能，稳定版之外亦是精彩纷呈，尤其是 Beta 版本的 web 支持以及 Alpha 版本的 macOS 支持。

**Beta 版 web 支持**

Flutter 1.12 master、dev 和 beta 三个渠道所提供的 web 支持均有明显提升。

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot12-release/support-for-web.png)

Rivet (应用界面如上图所示) 对 Flutter 在 web 端的表现非常满意。Rivet 是一个教育项目，旗下的移动版应用已经发布，目前，他们正在使用 Flutter 和 Firebase 构建 web 版本的应用，预计发布时间为 2020 年 1 月。

-   Rivet

    https://rivet.area120.com/link/flutter

请阅读这篇 Flutter web 支持文章，进一步了解其他开发者的 Flutter web 故事。

-   Flutter web 支持文章

    https://docs.google.com/document/d/1cM50TfAJ8O6tS5LQ2_sFuqoY6jg6dyQ7vZIlGBafYiE/edit#heading=h.q2gs8pjlvvhv

**macOS 端支持进入 alpha 版本**

macOS 桌面支持的进展也很顺利，现在已经从技术预览版迭代至 alpha 版，并通过 master 和 dev 两个渠道开放下载。

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot12-release/macos-desktop-support.png)

上图展示的是桌面尺寸的新版 Flutter Gallery，经过彻底升级，现在它已经支持 Android、iOS、web 和 macOS。

-   新版 Flutter Gallery

    https://github.com/material-components/material-components-flutter-gallery

macOS 端支持的 alpha 版代表着 Flutter 在桌面支持领域的重大进展，其中包括全新的 DataTree、Split 示例 widget、已成功移植至 macOS 的多个插件、发布 (release mode) 和分析模式 (profiling mode) 内的构建支持、以及更为简便的工具体验。如果您通过 master 和 dev 渠道运行 Flutter，请在 Flutter 系统配置中启用 macOS 桌面端支持，以便获取 macOS 工具:

```
$ flutter config --enable-macos-desktop
```

现在，您只需通过 "flutter create" 命令就能创建一个可在 macOS 平台上运行的 Flutter 项目，操作步骤和新建一个普通的 Flutter 项目一样简单。

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot12-release/flutter-create.png)

△ 请注意默认创建的新 macOS 目录

除了工具支持之外，我们也在一直探索适合桌面级应用的 widget 密度。移动应用需要较大的控制区域才能正常进行触控操作，但在桌面应用中，用户更可能会使用鼠标。为了把 Flutter 带到桌面，我们现在允许您选择 widget 密度，以便更好地满足桌面用户的需求。

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot12-release/sample-demonstrating-flutters-implementation-of-the-material-density-guidelines.gif)

示例: Material 视觉密度设计规范在 Flutter 上的实现 

-   示例

    https://github.com/gspencergoog/density_sample

-   Material 视觉密度设计规范

    https://material.io/design/layout/applying-density.html

最后一点，为了改善 Flutter 桌面应用的体验，我们还在键盘导航和键盘访问方面做了不少工作，包括:

-   在按键事件中同步修饰键信息

    https://github.com/flutter/flutter/pull/43948

-   在下拉列表打开时管理项目选取

    https://github.com/flutter/flutter/pull/43722

-   为主焦点添加便利访问器

    https://github.com/flutter/flutter/pull/43859

-   为切换控件添加键盘导航、悬浮和快捷方式

    https://github.com/flutter/flutter/pull/43384

-   勾选框和单选按钮

    https://github.com/flutter/flutter/pull/43384

-   自动滚动以便让焦点项维持在视野内

    https://github.com/flutter/flutter/pull/44965

-   基于键盘快捷方式的滚动

    https://github.com/flutter/flutter/pull/45019

-   处理焦点和悬浮的新 widget

    https://github.com/flutter/flutter/pull/44867

-   重写复制/粘贴和键盘选取

    https://github.com/flutter/flutter/pull/44130

-   下拉列表键盘导航

    https://github.com/flutter/flutter/pull/42811

-   视觉密度支持

    https://github.com/flutter/flutter/pull/43547

-   添加 macOS 功能键支持

    https://github.com/flutter/flutter/pull/44410

除了 Flutter Gallery，我们还推荐大家去看一下全新的 Photos Search 示例应用，我们在其中展示了桌面平台特有的强大功能，包括键盘操作、新加入的 widget 视觉密度、新插件、新 widget 等。

至于 Windows 和 Linux 支持，它们目前还处在技术预览阶段，不过，macOS alpha 版的开发经历很多值得借鉴的地方，有助于我们之后开展 Windows 和 Linux 的工作。我们近期就会和大家分享关于这两个平台的最新消息。如果您想进一步了解 Flutter 为 macOS、Windows 和 Linux 等桌面系统提供了哪些支持，请移步 flutter.dev/desktop。

-   了解 Flutter 桌面端支持

    https://flutter.dev/desktop

**Flutter 开发工具**

除了框架和引擎之外，我们在 Flutter 工具方面也有许多内容想与您分享，包括: 提供 Flutter 支持的新版本 DartPad、基于 IntelliJ 的增强版 IDE (内含新功能 Hot UI 的预览)、强化版 Dart DevTools (内含全新的视觉布局视图)、Visual Studio Code 同步多设备调试启用，以及改进版 Android 构建流程，此外，我们提供了更好的差异检测支持，帮助您检测已渲染 widget 在不同试运行中差异。

**DartPad 现已支持 Flutter**

如果您还没用过 DartPad 的话，不妨现在就上手试试！有了它，您不用安装任何工具就能体验 Dart 的功能。此外，最新的 DartPad 还支持 Flutter！

-   DartPad

    https://dartpad.dev

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot12-release/dartpad.png)

全新的 DartPad 活用了 Flutter 的 web 端支持，当您在左侧编写 Flutter 代码的时候，右侧就会实时运行一个真实的 Flutter (web) 程序。DartPad 的独特之处在于，您无需安装任何程序就能立即开始编写 Flutter 应用。\
除了单独的 DartPad 网站之外，我们还在文档和 codelab (如 "Flutter 布局基础教程" 和 "隐式动画") 中加入了带 Flutter 支持的 DartPad，从而方便大家在浏览器中学习 Flutter。如果您想要了解更多关于 DartPad 的信息，请阅读《DartPad.dev 全面升级，现已支持 Flutter》。

-   Flutter 布局基础教程

    https://flutter.dev/docs/codelabs/layout-basics

-   隐式动画

    https://flutter.dev/docs/codelabs/implicit-animations

-   DartPad.dev 全面升级，现已支持 Flutter

    https://medium.com/dartlang/a-brand-new-dartpad-dev-with-flutter-support-16fe6027784

**在 IDE 中通过 Hot UI 直接构建 widget**

如果您在自己的机器上安装了本地工具 (我们也希望您这么做)，您会在 Flutter 的 IntelliJ/Android Studio 插件中找到一个新功能预览。现在您可以在开发 widget 的过程中，直接在 IDE 里进行预览并与之进行交互。

![](https://mmbiz.qpic.cn/mmbiz_png/rFWVXwibLGtyn4iaG7GwAkOMXkjDfuuiahKVhguxIAccaiaLuloY0dQMEI4MUCrW9qXaq1gdFPuXgfsW5gD1fRrTDQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

我们把这个功能起名为 Hot UI，它与热重启有点类似，当您在代码中做出改动的时候，Hot UI 就会直接更新对应的 UI。您也可以和 UI 进行互动 (比如像上图中这样更改颜色)，所有改动会直接写入代码。如需启用 Hot UI 预览功能，请阅读 Github Flutter wiki 页面上的操作指南。

-   Github Flutter wiki 页面上的操作指南

    https://github.com/flutter/flutter-intellij/wiki/HotUI-Getting-Started-instructions

**使用 Layout Explorer 调试布局问题**

无论您是选择自己手写代码，还是让 Hot UI 替写，代码中出现问题总是难免的。我们推出 Dart DevTools 工具的目的就是，帮助您找到并修复这些问题。在新版 DevTools 中，我们添加了一个名为 Layout Explorer 的功能，它能够以可视化的方式呈现应用的布局信息，从而让检查器可以更好地发挥功能。

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot12-release/layout-explorer.gif)

Layout Explorer 不仅能以可视化的方式展现正在运行的应用中的 widget 布局，而且还允许您以交互的方式更改布局选项。我们希望这个功能预览可以让您更容易理解并修正布局问题。如需启用这一功能，请参阅 Layout Explorer 官方文档。

-   Layout Explorer 官方文档

    https://flutter.dev/docs/development/tools/devtools/inspector#flutter-layout-explorer

**多设备调试**

构建并调试 Flutter UI 的工作往往是在同一台设备上完成的。如果能同时在多台实体或虚拟的设备上调试您的应用，是不是会更好呢？Flutter 在 Visual Code 上提供的多会话调试支持就能帮您做到这一点。

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot12-release/multi-device-debugging.png)

从上面这张图里我们可以看到，一个 Flutter 应用正同时运行在 3 个不同的调试会话中，如果我们在代码中做出一处更改，Hot Reload 会确保这个更改反映在所有 3 个应用中。如果我们设置一个断点，那么无论哪个应用触发了相关代码，它都会停下来。如果您想中止某一个会话的调试，也不需要停止所有的会话。请前往 Github wiki 页面了解如何配置这个功能来实现多设备调试。

-   使用 VS Code 进行多设备调试

    https://github.com/flutter/flutter/wiki/Multi-device-debugging-in-VS-Code

**Android 构建改进**

最后一点，为了继续改进 Android，我们在新版本中解决了一些构建方面的问题。首先，我们让 Android 构建体验更加强健了，尤其是使用 Support 库的插件与使用 AndroidX 的插件混用的情况。我们的做法是把 Flutter 团队的插件移入 AndroidX，我们建议大家把应用和插件也迁移至 AndroidX。对于那些尚未迁移的插件，如果存在构建问题，我们已经在构建中添加了其它的代码路径，这个路径使用的是 Android Archive 文件和 Jetifier。但如此一来构建的速度也减慢了，所以我们不把它作为主要的构建机制，但我们发现，这个做法解决了我们遇到的大约 95% 的构建问题。

-   迁移至 AndroidX

    https://github.com/flutter/flutter/wiki/Upgrading-pre-1.12-Android-projects

我们解决的另一个问题使用 Google 旗下的最新代码优化器 R8 来替代 ProGuard。在此版本之前，应用开发者必须按照插件作者提供的指南手动配置 ProGuard 规则。在从新版本开始，插件可在源代码中定义规则，R8 会自动根据这些规则进行代码优化，从而为开发者解决了手动配置的难题。

此外，我们也在一直努力减少 Flutter 的应用体积，现在，供 Android 使用的 Hello, World 应用已经成功 "瘦身" 2.6% (从 3.8MB 降到 3.7MB)。不积跬步，无以至千里！

**Golden 图像测试**

Golden 图像指的是一个主图像文件，它是 widget、state、应用或其它您选择捕捉的视觉内容的正确渲染结果。在 Flutter 1.12 中，我们实现了 GoldenFileComparator 和 LocalFileComparator 类，它们依照像素而不是比特来进行比较，因此可以彻底消除错误的比较结果。这些新的实现强调呈现视觉差异，从而更清楚地展现出 Golden 图像和正在测试中的更新文件之间的差异。

-   GoldenFileComparator

    https://api.flutter.dev/flutter/flutter_test/GoldenFileComparator-class.html

-   LocalFileComparator

    https://api.flutter.dev/flutter/flutter_test/LocalFileComparator-class.html

-   消除错误比较结果

    https://github.com/flutter/flutter/issues/30036

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot12-release/golden-image-testing.png)

在这个例子中，主图像文件 (上图) 和测试图像文件 (下图) 之间的差异集中在轮廓上，通过差值图 (中图) 可以更容易地看出二者之间的差异。

**社区**

除了 Flutter 及其工具方面的工作，Flutter 社区还在不断地引领 Flutter 前往令人惊奇的新领域！请查看☟下方视频☟，了解一下社区中的开发者们正在做什么。

<iframe src="//player.bilibili.com/player.html?aid=86761188&cid=148257761&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="560" height="315"> </iframe>

-   腾讯视频链接

    https://v.qq.com/x/page/m3034tzisfx.html

-   Bilibili 视频链接

    https://www.bilibili.com/video/av78943055/

拥有这样一群了不起的开发者，真是 Flutter 社区的一大幸事。您们让全体 Flutter 团队成员深感骄傲！

**Flutter Favorite 代码包**

当我们在 2019 年 12 月推出 Flutter 1.0 的时候，pub.dev 上大约有 1,000 个代码包支持 Flutter，我们当时认为这个数字很大。现在，这个数字已经增加至 6 倍以上。选择这么多，究竟该用哪个代码包反而成了一件麻烦事。pub.dev 的综合评分系统和全新的 Verified Publishers (发布者认证) 功能都能帮助大家更好地做出选择。另外，pub.dev 即将迎来评分系统，进一步为大家提供方便。

-   Verified Publishers

    https://medium.com/dartlang/verified-publishers-98f05466558a

-   评分系统

    http://go/dart-2.7-annoucement

我们的用户仍在不断要求推出 "官方推荐" 的代码包和插件。为此，我们很高兴地推出 Flutter Favorite 计划。

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot12-release/the-flutter-favorite-program.png)

-   Flutter Favorite

    https://docs.google.com/document/d/1rjdOE5lo9vAJItfTRzyQeit_dYFYJALJdsxOdKNTvJE/

Flutter Favorite 代码包 (或插件) 是我们认为您在构建应用时的第一选择。这里的 "我们" 指的是 Flutter Ecosystem Committee (Flutter 生态圈委员会)。委员会成员来自各个地区，由 Google 的 Flutter 团队和 Flutter 社区共同推选，他们的目标是解决 Flutter 生态圈中存在的各种问题。委员会要做的第一件事就是建立一个高标准基线，并依照这个标准线挑选出合适的代码包。被选中的代码包的作者可以在代码包说明文档中使用 Flutter Favorite 徽标。此外，pub.dev 在更新后也会在搜索结果等位置显示 Flutter Favorite 徽标。

请大家前往 flutter.dev 网站上的 Flutter Favorite 页面了解详情。您也可以前往 pub.dev 查看完整的 Flutter Favorite 代码包列表。关键是，如果您是应用开发者，而且您看到了 Flutter Favorite 徽标，那么您就可以认为这个代码包是可以信赖的。如果您是得到 Flutter Favorite 认证的代码包作者，我们非常感谢您对 Flutter 生态圈所做的贡献。

-   Flutter Favorite

    https://docs.google.com/document/d/1rjdOE5lo9vAJItfTRzyQeit_dYFYJALJdsxOdKNTvJE/

-   Flutter Favorite 代码包列表

    https://pub.dev/flutter/favorites

**来自社区的工具**

谈到值得骄傲的贡献，就不得不说 Flutter 社区打造的众多出色工具。我们在下面列举部分成果。

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot12-release/flutter-device-preview.png)

△ Flutter 设备预览

![](https://mmbiz.qpic.cn/mmbiz_png/rFWVXwibLGtyn4iaG7GwAkOMXkjDfuuiahK95aYmxNib2OJcA1D7Vick8ojiayrEhF5bHlrQlIguEkC9ibpQibiauNKgiazw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

△ FlutterHub

![](https://mmbiz.qpic.cn/mmbiz_png/rFWVXwibLGtyn4iaG7GwAkOMXkjDfuuiahKJIOlUWO8ztapHcesBuDhfgebdryf0ZUicEOv2sNnUVicEAqA4Lq4mYyQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

△ Flutter Device Preview

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot12-release/widget-maker.png)

△ Widget Maker

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot12-release/panache.png)

△ Panache

-   Flutter 设备预览

    https://github.com/aloisdeniel/flutter_device_preview

-   FlutterHub

    https://flutterhub.io/

-   Flutter Device Preview

    https://github.com/aloisdeniel/flutter_device_preview

-   Widget Maker

    https://www.widgetmaker.dev/

-   Panache

    https://rxlabz.github.io/panache/#/

**工具开发伙伴鸣谢: Nevercode**

Flutter 生态圈不仅包括由社区开发的丰富工具，还有一批很棒的工作开发伙伴。Nevercode 一直以来都是我们的重要合作伙伴之一，他们最新发布的工具提供了许多新功能，其中一项就是名为 Remote Mac 的 Visual Studio Code 插件。

-   Remote Mac

    https://marketplace.visualstudio.com/items?itemName=codemagic.remote-mac

![](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot12-release/remote-mac.png)

Remote Mac 扩展插件可以让您直接连上一台由团队托管在云端的 Mac 主机，然后测试 iOS 和 macOS 版本的 Flutter 代码。如果您想要了解更多关于 Nevercode 最新产品的信息，例如对 web 端和 macOS 端 Flutter 的最新支持，全新的企业功能等等，请参阅他们最新发布的博文。

-   Codemagic - 企业功能及 VS 插件

    https://docs.google.com/document/d/1ymvS3E15dUbvrnj1qv0PzeBi40s7y1-t-YYudkHkLCM/

其他工具开发伙伴们的进展也不容错过，欢迎阅读《Flutter: 首个面向环境计算打造的 UI 平台》了解 Supernove、2Dimensions 和 Adobe 最新发布的产品。

-   Flutter: 首个面向环境计算打造的 UI 平台

    https://developers.googleblog.com/2019/12/flutter-ui-ambient-computing.html

**结语**

今年对于 Flutter 来说是非常重要的一年，Flutter 1.12 更是一次意义重大的发布。本文大致为大家展示了本次发布版本中的新内容；如果您想要查看您最喜欢的 pull release，了解我们把精力投放在了哪些地方，想要看看每个领域中有多少 pull release，或者看看我们在代码和功能上做了哪些改动，欢迎查阅 Flutter v1.12 发布说明。

-   Flutter v1.12 发布说明

    https://flutter.dev/docs/development/tools/sdk/release-notes/release-notes-1.12.13

我们认为 Flutter 正朝着正确的方向快步前进，希望您也同意我们的看法。拥有这么多的新功能和新工具之后，您会构建什么呢？我们拭目以待。

**Flutter 开发者社区中文资源: **https://flutter.cn