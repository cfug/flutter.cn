---
title: 一起看 I/O | Flutter 休闲游戏工具包发布
toc: true
keywords: 游戏工具包
description: 帮助您的游戏从概念走向成功发布的入门套件。
image:
    path: https://devrel.andfun.cn/devrel/posts/2022/05/dSsVED.png
---

{% include docs/bili_shims.liquid %}

![](https://devrel.andfun.cn/devrel/posts/2022/05/dSsVED.png)

*作者 / Zoey Fan, Product Manager for Flutter, Google*

对于大多数开发者来说，Flutter 是一个应用框架。但利用 Flutter 提供的硬件加速图形支持，围绕休闲游戏开发的社区也在不断壮大。

在过去的一年里，已经有数千款 Flutter 游戏发布。拿游戏公司 Lotum 来举例，该公司旗下颇具人气的文字解谜游戏 [4 Pics 1 Word](https://flutter.dev/showcase/lotum "Flutter 案例: 4 Pics 1 Word") 最近就已经用 Flutter 完全重新编写。[Flame](https://flame-engine.org/ "基于 Flutter 一款开源游戏引擎 Flame Engine 主页") 则是一款基于 Flutter 构建的、由社区驱动的开源游戏引擎，其贡献者和用户也一直在稳步增长。

![△ Flutter 开发者构建的手机游戏](https://devrel.andfun.cn/devrel/posts/2022/05/7PH1QO.png)

△ Flutter 开发者构建的手机游戏

为了了解我们如何才能为大家提供更好的支持，我们 [采访了几位](https://medium.com/flutter/perspectives-from-early-adopters-of-flutter-as-a-game-development-tool-f95fb3406d51 "将 Flutter 用于休闲游戏的早期采纳者的访谈") 已经成功构建并发布 Flutter 移动端游戏的开发者。我们询问他们喜欢用 Flutter 创建游戏的原因，他们的回答给出了下面几个原因:

* Flutter 简单易学，可以轻松用于构建用户界面和休闲游戏
* Flutter 允许开发者查看框架源代码 (不存在 "黑盒")，并能完全控制画布
* Flutter 拥有开放的生态系统，开发者可以找到 (并使用) 许多有用的 package、插件和开发库
* Flutter 是可移植的，只需写一次代码，游戏就默认可以编译为多平台版本

同时，参与我们调研的开发者有提到，创建 Flutter 游戏的最大挑战是寻找用于入门的资源和学习材料，以及与平台游戏服务进行集成。为了解决这些需求，我们发布了新的入门工具包，以加速您的游戏开发进程。

[Flutter 休闲游戏工具包](http://flutter.dev/games "Flutter 休闲游戏工具包") (Casual Game Toolkit) 提供了专门的模板 (由 [Filip Hracek](https://github.com/filiph "Filip Hracek 的 GitHub 个人页面") 开发)，您可以用它来构建自己的游戏。这个启动项目提供了预先构建完毕的各种您可能用得着的「零部件」，包括主菜单、设置页面、声音支持等，最有趣的部分仍然留给您: 构建游戏！

![△ 在移动设备上运行的井字棋游戏](https://devrel.andfun.cn/devrel/posts/2022/05/qmT3RE.png)

△ 在移动设备上运行的井字棋游戏

## **视频教程**

如果想要上手开发游戏，请查看我们准备的关于如何使用游戏模板的 [视频教程]({{bili-video}}/BV12Y4y1z7m9/ "视频教程：使用 Flutter 开发游戏")。它为您提供了创建一个 [井字棋游戏](https://github.com/filiph/tictactoe "井字棋游戏的 GitHub 开源仓库地址") (您也可从 [iOS](https://apps.apple.com/us/app/tic-tac-toe-puzzle-game/id1611729977 "井字棋游戏 iOS 版下载地址")/[Android](https://play.google.com/store/apps/details?id=dev.flutter.tictactoe "井字棋游戏 Android 版下载地址") 应用商店下载这个游戏) 的逐步教学。如果您想要了解 Filip 在开发这款游戏时经历的所有细节，欢迎阅读他的 [游戏开发日志](https://files.flutter-io.cn/posts/flutter-cn/2022/announcing-the-flutter-casual-games-toolkit/flutter-game-sample-devlog/ "Filip 的游戏开发日志")。

## 预集成的服务

除了在游戏中可能需要用到的常见用户界面和功能元素之外，您还会得到游戏开发所需的关键服务的预集成模块和示例代码。例如，游戏模板中就集成了 Apple Game Center 和 Google Play Games Services，因此您可以轻松地实现排行榜和成就等功能。

如果您打算通过游戏盈利，模板还使用了 [Google 移动广告 SDK](https://pub.flutter-io.cn/packages/google_mobile_ads "Flutter package: Google 移动广告 SDK")，并告诉您如何实现广告样本。该模板还使用了 [应用内购买](https://pub.flutter-io.cn/packages/in_app_purchase "Flutter package: 应用内购买") package，可让您在游戏中为玩家提供额外的内容，如高级体验、数字商品和订阅等。

最后，游戏模板还包含 [Firebase Crashlytics](https://pub.flutter-io.cn/packages/firebase_crashlytics "Flutter package: Firebase Crashlytics")，让您可以获得更多关于游戏中可能发生的崩溃和错误的洞察。该游戏模板的所有源代码都可以在 GitHub 上的 [Flutter 示例 repo](https://github.com/flutter/samples/tree/master/game_template#readme "Flutter 示例代码仓库") 中找到。

## **Flutter 游戏 Discord 频道**

Flutter 的优势之一，在于它是充满温度、乐于助人的社区。如果您想要与其他 Flutter 游戏开发者聊天、提问和分享最佳实践，请加入 r/FlutterDev Discord 服务器上的 [游戏开发专属频道](https://discord.gg/WY5NwwjBQz "Flutter Discord 游戏开发专属频道加入链接")！非常感谢我们的社区成员 @Miyoyo 帮助创建这个社区空间来支持 Flutter 游戏开发者！(顺便说一下，如果您已经是 r/FlutterDev 社区的成员，可以通过 [链接](https://discord.com/channels/420324994703163402/964110538986651658 "Flutter Discord 游戏开发专属频道链接") 直接加入)。

## **Google Ads 和 Cloud 赞助额度**

如果您的游戏需要 Cloud 或 Firebase 服务，或者您想使用 Ads 向更多用户推广您的游戏，您可以获得由 [Google Ads](https://ads.google.cn/intl/en_us/home/flutter/#!/ "Google Ads 额度赞助页面") 和 [Cloud](https://cloud.google.com/free "Google Cloud 额度赞助页面") 团队提供的高达 900 美元的赞助额度 (受条款限制)！

## **由移动端开始，走向更广阔舞台**

从过去的研究中我们了解到，现在的 Flutter 游戏大多是休闲手机游戏，所以我们在设计 Flutter 休闲游戏工具包时优先考虑了移动场景。

但这并不意味着您的创意应该局限于移动平台。事实上，刚才提到的 [井字棋游戏](https://github.com/filiph/tictactoe "井字棋游戏开源代码仓库地址") 除了在 [web 端运行](https://filiph.github.io/tictactoe/ "井字棋游戏 Web 端运行网址") 外，也能在桌面端运行！

![△ 在 web 端和桌面端运行的井字棋游戏](https://devrel.andfun.cn/devrel/posts/2022/05/GwGAuu.png)

△ 在 web 端和桌面端运行的井字棋游戏

我们最近还在 DartPad 上增加了对社区驱动的游戏引擎 Flame 的支持，因此您可以在 DartPad 上探索 [用 Flame 构建游戏](https://dartpad.cn/?id=3e52ca7b51ba15f989ad880b8b3314a2 "DartPad 直接体验用 Flame 构建游戏")，而无需下载 SDK。另外，由 Very Good Ventures (VGV) 编写，并在 Google I/O 大会上推出的 web 端 [弹球游戏](https://pinball.flutter.dev/ "Flutter 弹球游戏")，就是使用 Flame 引擎在 Flutter 中构建的！如果您想要了解该弹球游戏是如何创建的，请关注我们近期的推送或直接 [阅读其代码](https://github.com/flutter/pinball "Flutter 弹球游戏开源代码")。

![△ Web 端的弹球游戏](https://devrel.andfun.cn/devrel/posts/2022/05/tzNjv7.png)

△ Web 端的弹球游戏

游戏开发是 Flutter 涉足的全新且令人兴奋的场景！展望未来，我们希望增加更多的 Codelab 和其他资源，来帮助您开发游戏。这是我们第一次尝试在这方面为您提供更多便利，我们充分知晓还有许多地方需要改进。我们最近开始与社区成员 [@wolfenrain](https://github.com/wolfenrain "@wolfenrain 的 GitHub 页面") 合作，对游戏相关的问题进行分流。如果您希望 Flutter SDK 提供更好的产品功能，请在 GitHub 上提交 issue (或对现有 issue 进行投票)。

## **Flutter 游戏开发**

请查看专门的 [游戏开发页面](http://flutter.dev/games "使用 Flutter 进行游戏开发页面") 以了解更多关于上述资源的详细信息，您还可以找到 [文档链接](http://docs.flutter.cn/docs/resources/games-toolkit "Flutter 游戏开发参考文档")，以及 Flutter 社区中游戏开发专家推荐的代码库、package 和工具的参考信息。

自 Flutter 1.0 发布以来，大家不断用精彩的应用为我们带来惊喜，现在我们迫不及待地想看到您将用 Flutter 打造出多么令人兴奋的游戏了！
