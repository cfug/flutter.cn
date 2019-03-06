---
title: Launching Flutter 1.2 at Mobile World Congress
title: 首个稳定更新版 —— Flutter 1.2 发布
toc: true
---

*Posted by the Flutter team*

*由 Flutter 团队发布*

The Flutter team is coming to you [live this week from Mobile World Congress](https://www.mwcbarcelona.com/session/flutter-google-toolkit-for-building-mobile-experiences/)in Barcelona, the largest annual gathering of the mobile technology industry. One year ago, we announced the first beta of Flutter at this same event, and since then [Flutter has grown faster than we could have imagined](http://sotagtrends.com/?tags=[ionic-framework,react-native,flutter,xamarin]&relative=false). So it seems fitting that we celebrate this anniversary occasion with our first stable update release for Flutter.

2019 [世界移动通信大会](https://www.mwcbarcelona.com/session/flutter-google-toolkit-for-building-mobile-experiences/) (MWC 大会) 于 2 月 27 日在巴塞罗那顺利拉开帷幕。值此移动盛会，Flutter 团队宣布正式推出 Flutter 1.2。
其实，这个大会对 Flutter 有着特别的纪念意义，因为 Flutter 的首个 beta 测试版正是在去年的 MWC 大会上与大家见面的，自此以后，Flutter 的发展速度远[超我们的想象](http://sotagtrends.com/?tags=[ionic-framework,react-native,flutter,xamarin]&relative=false)。
如今我们再次聚首 MWC 大会，发布 Flutter 稳定版本的首个更新，以此庆祝 Flutter 诞生一周年。

![announced-12-at-mwc19](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot2-release/announced-12-at-mwc19.png){:width="85%"}

## Flutter 1.2

Flutter 1.2 is the first feature update for Flutter. We've focused this release on a few major areas:

作为 Flutter 1.0 之后的首次更新， Flutter 1.2 围绕以下点进行了重点优化与改进:

-   Improved stability, performance and quality of the core framework.
    
    提升核心框架的稳定性、性能和质量
    
-   Work to polish visual finish and functionality of existing widgets.

    改进现有 widget 视觉效果和功能

-   New web-based tooling for developers building Flutter applications.

    为 Flutter 开发者提供全新的基于 Web 的调试工具

Having shipped Flutter 1.0, we focused a good deal of energy in the last couple of months on improving our testing and code infrastructure, clearing a backlog of pull requests, and improving performance and quality of the overall framework. We have a comprehensive [list of these requests in the Flutter wiki](https://github.com/flutter/flutter/wiki/Release-Notes---Changes-in-1.2.0) for those who are interested in the specifics. This work also included broader support for new UI languages such as Swahili.

自 Flutter 1.0 发布已经过去几个月了，我们在这段时间内集中精力改进了测试和代码基础框架，解决了此前积压的 pull requests，并全面提升了框架的质量与性能。
有兴趣的开发者们可以前往 Flutter wiki 页面，[查看完整的 pull requests 列表](https://github.com/flutter/flutter/wiki/Release-Notes---Changes-in-1.2.0)。此外，我们还在这次更新中加强了对 Swahili 等新 UI 设计语言的支持。

We continue to make improvements to both the Material and Cupertino widget sets, to support more flexible usage of Material and continue to strive towards pixel-perfect fidelity on iOS. The latter work includes support for [floating cursor text editing](https://github.com/flutter/flutter/pull/25384), as well as showing continued attention to minor details (for example, we updated the way the text editing cursor paints on iOS for a faithful representation of the animation and painting order). We added support for a broader set of animation easing functions, [inspired by the work of Robert Penner](http://robertpenner.com/easing/). And we added support for new keyboard events and mouse hover support, in preparation for deeper support for desktop-class operating systems.

我们将继续改进 Material 和 Cupertino 系列的 widgets，为开发者提供更加灵活的 Material 设计体验，并持续在 iOS 设备上继续交付完美的像素保真度。为此，我们添加了对[浮动光标文本编辑](https://github.com/flutter/flutter/pull/25384)的支持，
并且对许多细节进行了进一步优化 (例如，我们更新了文本编辑光标在 iOS 设备上的绘制方式，以便真实呈现动画和绘图顺序)。
受 [Robert Penner 作品](http://robertpenner.com/easing/)的启发，我们扩展了动画缓动函数的支持范围。此外，Flutter 1.2 还引入了全新的键盘事件和鼠标悬停支持，以作好准备为桌面级操作系统提供深层支持。

The plug-in team has also been busy in Flutter 1.2, with work well underway to support [in-app purchases](https://github.com/flutter/plugins/tree/master/packages/in_app_purchase), as well as many bug fixes for [video player](https://pub.dartlang.org/packages/video_player), [webview](https://pub.dartlang.org/packages/webview_flutter), and [maps](https://pub.dartlang.org/packages/google_maps_flutter). And thanks to a [pull request contributed by a developer from Intuit](https://github.com/flutter/flutter/pull/24440), we now have support for [Android App Bundles](https://developer.android.com/guide/app-bundle/), a new packaging format that helps in reducing app size and enables new features like dynamic delivery for Android apps.

与此同时，Flutter 插件团队也在积极展开针对 Flutter 1.2 发布的相关优化工作，
主要负责实现 [应用内购买](https://github.com/flutter/plugins/tree/master/packages/in_app_purchase) 支持，以及修复[视频播放器 (video player)](https://pub.dartlang.org/packages/video_player)、[webview](https://pub.dartlang.org/packages/webview_flutter) 和 [地图 (maps)](https://pub.dartlang.org/packages/google_maps_flutter) 中的一些错误。
另外，我们还合并了一个来自 [Intuit 工程师提交的 pull request](https://github.com/flutter/flutter/pull/24440)，在 Flutter 中添加了 [Android App Bundles](https://developer.android.com/guide/app-bundle/) 支持。
Android App Bundles 是一种新的封装格式，它能有效减小应用的体积并启动应用动态交付等新特性。

Lastly, Flutter 1.2 includes the Dart 2.2 SDK, an update that brings significant performance improvements to compiled code along with new language support for initializing sets. For more information on this work, you can [read the Dart 2.2 announcement](https://medium.com/dartlang/announcing-dart-2-2-faster-native-code-set-literal-support-7e2ab19cc86d).

最后，Flutter 1.2 还包含了 Dart 2.2 SDK，此项更新为代码编译带来了显著的性能提升，
并且为初始化集合提供了新语言支持。更多信息，请阅读[《Dart 2.2 发布说明》](https://medium.com/dartlang/announcing-dart-2-2-faster-native-code-set-literal-support-7e2ab19cc86d)。

(As an aside, some might wonder why this release is numbered 1.2. Our goal is to ship a 1.x release to the 'beta' channel on about a monthly basis, and to release an update approximately every quarter to the 'stable' channel that is ready for production usage. Our 1.1 last month was a beta release, and so 1.2 is therefore our first stable release.)

特别说明: 有些读者或许会好奇为什么这个版本的编号是 1.2，请允许我在这里稍作解释。
我们的目标是大概每个月向 "测试版” 渠道发布 1.x 版本的 Flutter，
然后每季度向 “稳定版” 渠道发布可在生产环境下使用的更新版本。
上个月发布的 1.1 是测试版本，因此 1.2 是我们的首个稳定更新版本。

## New Tools for Flutter Developers

## 新的调试工具

Mobile developers come from a variety of backgrounds and often prefer different programming tools and editors. Flutter itself supports different tools, including first-class support for Android Studio and Visual Studio Code as well as support for building apps from the command line, so we knew we needed flexibility in how we expose debugging and runtime inspection tools.

每位开发者都有着不同的技术背景，偏爱的编程工具和编辑器也不尽相同。
为此，Flutter 添加了多种工具支持，其中包括 Android Studio 和 Visual Studio Code 的 一级支持，以及支持命令行构建工具，这也就意味着开发者需要更加灵活的调试和运行时检查工具。

Alongside Flutter 1.2, we're delighted to preview a new [web-based suite of programming tools to help Flutter developers debug and analyze their apps](https://flutter.github.io/devtools/). These tools are now available for installation alongside the extensions and add-ins for Visual Studio Code and Android Studio, and offer a number of capabilities:

所以我们在发布 Flutter 1.2 的同时，还带来了全新的[基于 Web 的调试工具套件](https://flutter.github.io/devtools/)，目的是帮助您更好地分析与调试应用性能。
这些工具支持与 Visual Studio Code 和 Android Studio 的扩展程序及加载项一同安装，并且提供多种功能：

-   A widget inspector, which enables visualization and exploration of the tree hierarchy that Flutter uses for rendering.

    Widget 检查器: 对 Flutter 用于渲染的树状分级结构实现可视化和直观的探索；

-   A timeline view that helps you diagnose your application at a frame-by-frame level, identifying rendering and computational work that may cause animation 'jank' in your apps.

    时间线视图: 可帮助您逐帧诊断自己的应用，并识别可能造成应用动画 “卡顿” 的渲染和计算问题；

-   A full source-level debugger that lets you step through code, set breakpoints and investigate the call stack.

    源代码级调试器: 支持单步执行代码，设置断点并检查调用堆栈；

-   A logging view that shows activity you log from your application as well as network, framework and garbage collection events.

    日志记录视图: 显示应用所记录的活动以及网络、框架和垃圾回收等事件。

![flutter-devtools-preview](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot2-release/flutter-devtools-preview.png){:width="85%"}

We plan to invest further in this new web-based tooling for both Flutter and Dart developers and, as integration for web-based experiences improves, we plan to build these services directly into tools like Visual Studio Code.

为了给 Flutter 和 Dart 开发者创造更好的开发体验，我们将进一步加大对基于 web 的调试工具的投入。此外，随着 web 集成技术的不断发展，我们还计划将这些服务直接添加到 Visual Studio Code 等工具中。

## What's next for Flutter?

## 下一步工作

In addition to the engineering work, we took some time after Flutter 1.0 to [document our 2019 roadmap](https://github.com/flutter/flutter/wiki/Roadmap), and you'll see that we've got plenty of work ahead of us.

发布 Flutter 1.0 之后，除了日常开发工作之外，我们还规划了 [Flutter 2019 产品路线图](https://github.com/flutter/flutter/wiki/Roadmap)，从中您会发现我们未来仍很多工作要做。

A big focus for 2019 is growing Flutter beyond mobile platforms. At [Flutter Live, we announced a project codenamed "Hummingbird"](https://youtu.be/5SZZfpkVhwk?list=PLOU2XLYxmsILq4ysYNWXq5TOGLgYDJgVD&t=175), which brings Flutter to the web, and we plan to share a technical preview in the coming months. In addition, we continue to work on bringing Flutter to desktop-class devices; this requires work both at the framework level as described above, as well as the ability to package and deploy applications for operating systems like Windows and Mac, in which we're investing through our [Flutter Desktop Embedding project](https://github.com/google/flutter-desktop-embedding).

2019 年的一个工作重点是将 Flutter 的应用范围扩展到移动平台之外。我们在 Flutter Live 上启动了 [Hummingbird 计划](https://youtu.be/5SZZfpkVhwk?list=PLOU2XLYxmsILq4ysYNWXq5TOGLgYDJgVD&t=175)，加快推进 Flutter 在 Web 端的发展。我们会接下来的几个月里公布该项目的初步技术成果，请大家拭目以待！另外，我们还计划将 Flutter 引入到桌面开发中。因此，除了上述框架层面的开发工作之外，我们还会通过 [Flutter 跨平台桌面应用计划 (Flutter Desktop Embedding Project)](https://github.com/google/flutter-desktop-embedding) 帮助各位开发者在 Windows 和 Mac 等操作系统上封装和部署应用。


## Flutter Create: what can you do with 5K of Dart?

## Flutter Create: 您能使用 5K 的 Dart 代码做些什么？

This week, we're also excited to launch [Flutter Create](http://flutter.dev/create), a contest that challenges you to build something interesting, inspiring, and beautiful with Flutter using five kilobytes or less of Dart code. 5K isn't a lot --- for a typical MP3 file, it's about a third of a second of music --- but we're betting you can amaze us with what you can achieve in Flutter with such a small amount of code.

[Flutter Create 挑战赛](http://flutter.dev/create)将从本周起开始接收报名，你敢来参加吗？参赛者需要利用 Flutter 构建充满创意和趣味的精美应用，并把这一切全部浓缩到 5K 的 Dart 代码里。5K 并不多，按照普通 MP3 格式的标准来算，差不多相当于三分之一秒的音乐。但我们敢说，有了 Flutter 的帮助，即使是使用如此少量的代码，您也能制作出令人大开眼界的应用。

![flutter-create-contest](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot2-release/flutter-create-contest-heroimg.png){:width="85%"}

The contest runs until April 7th, so you've got a few weeks to build something cool. We have some great prizes, including a [fully-loaded iMac Pro developer workstation](https://www.apple.com/imac-pro/specs/) with a 14-core processor and 128GB of memory that is worth over $10,000! We'll be announcing the winners at [Google I/O](https://events.google.com/io/), where we'll have a number of Flutter talks, codelabs and activities.

挑战赛将于 4 月 7 日结束，因此您将有几周的时间来构建出色应用。我们准备了一些很棒的奖品，其中包括一台搭载 14 核处理器和 128GB 内存的[顶配版 iMac Pro 工作站](https://www.apple.com/imac-pro/specs/)，价值超过 10,000 美元！我们将在 [Google I/O 大会](https://events.google.com/io/)上宣布获胜者名单，并且还会在此期间开展多个 Flutter 演讲、Codelab 课程和活动，敬请期待！

## In closing

## 结语

Flutter is now one of the top 20 software repos on Github, and the worldwide community grows with every passing month. Between meetups in [Chennai, India](https://twitter.com/Nikkitagandhi/status/1099745911985467392), articles from [Port Harcourt, Nigeria](https://twitter.com/Zfinix1/status/1079892033060392962), apps from [Copenhagen, Denmark](https://twitter.com/koorankka/status/1098579826355642368)and incubation studios in [New York City, USA](https://www.hotreload.io/), it's clear that Flutter continues to become a worldwide phenomenon, thanks to you. You can see Flutter in [apps that have hundreds of millions of users](https://play.google.com/store/apps/details?id=com.alibaba.intl.android.apps.poseidon), and in apps from [entrepreneurs who are bringing their first idea to market](https://play.google.com/store/apps/details?id=com.kissaan.gomitra). It's exciting to see the range of ideas you have, and we hope that we can help you express them with Flutter.

Flutter 现已进入 Github Top 20 软件库，与此同时，Flutter 全球社区也在以惊人的速度蓬勃发展，为世界各地的开发者正带去独特的编程乐趣——[印度清奈的开发者聚会](https://twitter.com/Nikkitagandhi/status/1099745911985467392)，[尼日利亚哈科特港的报道](https://twitter.com/Zfinix1/status/1079892033060392962)，[丹麦哥本哈根的应用](https://twitter.com/koorankka/status/1098579826355642368)，以及[美国纽约的孵化工作室](https://www.hotreload.io/) —— 从中我们可以清楚地看到 Flutter 正在成为一种全球现象，而这一切都离不开您的贡献！Flutter 作为移动开发领域一股不容小觑的新生力量，不仅为开发者赢得了[亿万用户](https://play.google.com/store/apps/details?id=com.alibaba.intl.android.apps.poseidon)，还[帮助创业者把理念推向市场](https://play.google.com/store/apps/details?id=com.kissaan.gomitra)。我们非常高兴看到您拥有如此多的创意，也希望能够帮助您使用 Flutter 来呈现这些创意。

![flutter-deep-dive-srmu](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot2-release/flutter-deep-dive-srmu.jpg){:width="85%"}

*Attendees of a Flutter deep dive at Technozzare, SRM University.*

*在印度 SRM 大学参加 Flutter 高级研讨会的与会者*

Finally, we've recently launched a YouTube channel exclusively dedicated to Flutter. Be sure to subscribe at [flutter.dev/youtube](https://flutter.dev/youtube) for shows including the [Boring Flutter Development Show](https://www.youtube.com/playlist?list=PLjxrf2q8roU3ahJVrSgAnPjzkpGmL9Czl), [Widget of the Week](https://www.youtube.com/playlist?list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG), and [Flutter in Focus](https://www.youtube.com/playlist?list=PLjxrf2q8roU2HdJQDjJzOeO6J3FoFLWr2). You'll also find a new case study from [Dream11, a popular Indian fantasy sports site](https://youtu.be/lCeRZhoqEP8), as well as other [Developer Stories](https://www.youtube.com/playlist?list=PLjxrf2q8roU33POuWi4bK0zvDpAHK6759). See you there!

我们最近还在 YouTube 网站上专门为 Flutter 开设了一个新频道。欢迎前来 [flutter.dev/youtube](https://flutter.dev/youtube) 进行订阅观看！
这个频道包含了大家非常喜爱的一些视频合集如 [Boring Flutter Development Show](https://www.youtube.com/playlist?list=PLjxrf2q8roU3ahJVrSgAnPjzkpGmL9Czl)、[Widget of the Week](https://www.youtube.com/playlist?list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG) 和 [Flutter in Focus](https://www.youtube.com/playlist?list=PLjxrf2q8roU2HdJQDjJzOeO6J3FoFLWr2)，
同时也欢迎前来学习 [Dream11 是如何使用 Flutter 的](https://youtu.be/lCeRZhoqEP8) ，以及 [其他的开发者故事](https://www.youtube.com/playlist?list=PLjxrf2q8roU33POuWi4bK0zvDpAHK6759)等。

![welcome-to-flutter-yt-channel](https://files.flutter-io.cn/posts/flutter-cn/2019/flutter-1dot2-release/welcome-to-flutter-yt-channel.png){:width="85%"}
