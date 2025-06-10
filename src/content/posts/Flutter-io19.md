---
title: Flutter 1.5 正式发布：适用于移动、Web、嵌入式和桌面平台的便携式界面框架
description: Flutter 1.5 正式发布：适用于移动、Web、嵌入式和桌面平台的便携式界面框架
toc: true
---

**作者: Flutter 团队**

I/O 期间我们迎来 [Flutter 框架](https://flutter.dev/) 的一个重要里程碑，因为我们的开发重点从移动平台扩展到了更广泛的设备和机型。在 I/O 大会上，我们发布了 [Web 版 Flutter 的首个技术预览版](https://flutter.dev/web)，宣布 Flutter 将为包括 Google Home Hub 在内的 Google Smart Display 平台提供技术支持，并迈出利用 Chrome 操作系统支持桌面级应用的第一步。

## 从移动设备到多平台

长期以来，Flutter 团队的使命一直是为开发 iOS 和 Android 版移动应用构建最佳框架。我们认为对移动开发作出改进的时机已经成熟，因为现在开发者不得不选择在两个平台上构建相同的应用两次，或者作出某些妥协以使用跨平台框架。Flutter 提供了一种最有效的方式，使单个代码库能够为两个平台提供美观、快速和量身定制的体验，并提高开发者的工作效率。我们很高兴能够看到早期的努力成功催生出目前最热门的[开源项目](https://github.com/flutter/flutter)之一。

从去年开始着力开发 1.0 版本时，我们就开始尝试将 Flutter 的范围扩展到其他平台。这是基于两方面考虑: 一是 Google 内部团队越来越依赖于 Flutter，二是 [Dart 平台](https://dart.dev)有提供便捷式体验的潜力。特别是，已经着手为 Dart 构建 Web 框架以供内部使用的小型团队启动了一个探索性项目 (代号为 "Hummingbird")，以评估移植 Flutter 引擎以支持基于标准的 Web 有何技术优势。

该项目的成效令人惊叹，这在很大程度上要归功于 Chrome、Firefox 和 Safari 等网络浏览器的快速发展。这些浏览器广泛地提供了硬件加速的图形、动画和文本，以及较快的 JavaScript 执行速度。在项目刚开始的几个月内，我们就成功构建了 Flutter 的核心框架原语。不久之后，我们在移动和桌面浏览器上运行了演示版本。长期以来，Dart 语言经常用于编译网页内容，这证明我们也能在 Web 端运行 Flutter 框架和应用。

与此同时，Flutter 核心项目不断取得进展，进而推动桌面级应用的发展，其中包括键盘和鼠标等输入工具、窗口大小调整，以及适用于 Chrome 操作系统应用开发的调试工具。针对在 Windows、Mac 和 Linux 上运行的桌面级应用，我们嵌入了 Flutter，而这项探索性工作已逐步演变成 Flutter 的核心引擎。

## 适用于所有屏幕的便携式界面框架

![Flutter Mobile, Web, Desktop, and Embedded]({{site.flutter-files-cn}}/posts/flutter-cn/2019/flutter-1dot5-release/flutter-platforms.png){:width="85%"}

毋庸置疑，高性能的便携式界面框架具有巨大的商业潜力。该框架可以通过单个代码库来为各种设备提供量身定制的出色体验。

对于创业公司来说，这让他们能够通过同一个应用在移动端、Web 端或桌面端接触用户。如此一来，他们从一开始就能全面覆盖所有用户，而不会受到技术上的限制。对于大型组织来说尤其如此，因为他们能够使用同一个代码库为所有用户提供相同的体验，而这会降低工作复杂度和开发成本，更加专注于提升相关体验的质量。

实现对移动、桌面和网络应用的支持后，我们肩负更大的使命: **我们要构建最佳框架，以便为所有屏幕开发出色体验。**

## 适用于 Web 平台的 Flutter

我们即将发布 Web 版 Flutter 的**首个技术预览版**。虽然这项技术还在开发中，但我们准备邀请尝鲜者来试用并提供反馈。对于 Web 版 Flutter，我们的最初设想并不是将其用作文档体验 (针对其优化 HTML ) 的通用替代品；相反，我们打算通过这种有效方式构建高度交互和图形丰富的内容，从而切实感受到成熟界面框架所带来的益处。

为了展示 Web 版 Flutter，我们与《纽约时报》合作构建了一个演示版本。《纽约时报》不仅是世界一流的新闻媒体，而且以设计纵横字谜等益智游戏而闻名。由于狂热的解谜玩家希望能在当时使用的任何设备上玩游戏，所以《纽约时报》的开发团队把目光转向 Flutter，将其作为满足读者需求的潜在解决方案。发现能够利用同一组代码访问网页给他们带来了巨大裨益。在 Google I/O 大会上，你可以率先了解他们最近更新的 [KENKEN 解谜游戏](https://www.nytimes.com/games/prototype/kenken)。该游戏利用同一组代码在 Android、iOS、Web、Mac 和 Chrome 操作系统上运行。

![ken-gratulations puzzle]({{site.flutter-files-cn}}/posts/flutter-cn/2019/flutter-1dot5-release/nyt-game.gif){:width="85%"}

以下是《纽约时报》解谜游戏执行总监 Eric von Coelln 对 Flutter 使用体验的看法:

> “《纽约时报》纵横字谜游戏的单独订阅数量已超过 40 万份，玩这款游戏已经成为解谜者每天必做的事情。除了纵横字谜游戏，我们还开发了数字解谜游戏，每个月都吸引了超过 200 万名解谜者。 
> 我们已经开始探索 Flutter，并将其作为快速开发有趣和优质的移动体验这一挑战的潜在解决方案。现在，我们能够在 Web 端发布游戏，这使 Flutter 成为在所有用户平台快速部署内容的更具吸引力的选择。之前基于 Flash 的 KenKen 游戏经过更新，能够提供多平台的畅玩体验。今年我们很高兴能为解谜者带来全新体验。"

由于篇幅有限，我们无法在此一一详述 Web 版 Flutter。若有兴趣，请前往 [Flutter 博客](https://medium.com/flutter-io/bringing-flutter-to-the-web-904de05f0df0)，阅读专门介绍 Web 版 Flutter 的文章。

鉴于目前处于早期开发阶段，我们非常希望收到你的反馈，了解你希望如何使用 Web 版 Flutter。我们希望以性能为重中之重，快速开发代码，并与 Flutter 项目的其他部分协调代码库。

## 适用于移动设备的 Flutter

我们还会升级核心 Flutter 框架，并会在**稳定版 channel 立即提供 Flutter 1.5**。根据开发者的反馈，我们对 [Flutter 1.5](https://medium.com/flutter-io/announcing-flutter-1-5-6e5d7e35b75f) 进行了数百处更改，包括对全新应用商店 iOS SDK 要求、iOS 和材料微件的更新，新增对新设备类型的引擎支持，以及对具有最新 [UI-as-code](https://medium.com/dartlang/making-dart-a-better-language-for-ui-f1ccaf9f546c) 语言特征的 Dart 2.3 作出改进。 

随着框架本身逐渐成熟，我们正在设法构建支持生态系统。Flutter 的架构模型一贯优先考虑小型核心框架，并辅以丰富的软件包社区。在过去的几个月，Google 为网页视图、Google 地图和 Firebase ML Vision 提供了产品级质量的软件包。我们还将新增对 [应用内支付](https://pub.flutter-io.cn/packages/in_app_purchase) 的初步支持。得益于 2,000 多个适用于 Flutter 的开放源代码软件包，大多数场景均有合适的选择。 

在今年的 I/O 上，我们宣布推出一个尤其令人振奋的项目，即 [ML Kit 自定义图像分类器](http://github.com/firebase/mlkit-custom-image-classifier)。该工具利用 Flutter 和 Firebase 构建，可为创建自定义图像分类模型提供基于应用的简易工作流。你可以使用手机的摄像头收集训练数据、邀请他人为你的数据集贡献素材、触发模型训练以及使用训练过的模型，这些操作都可以在同一个应用中实现。

![Flutter ML Kit: create datasets, collaborate to collect data, train model, run inference]({{site.flutter-files-cn}}/posts/flutter-cn/2019/flutter-1dot5-release/flutter-mlkit.png){:width="85%"}

Flutter 越来越受欢迎，使用人数也越来越多。[有需求的客户](https://flutter.dev/showcase)不断增加，其中包括 eBay、Sonos、Square、Capital One、Alibaba 和 Tencent。这些公司正在利用 Flutter 开发应用，并从中发现乐趣！以下是 eBay 的高级开发者 Larry McKenzie 对 Flutter 的看法:

> **“Flutter 运行速度很快！过去需要很多天才能实现的功能，现在只需一天就能完成。过去我们花费很多时间处理的问题，如今再也不会发生了。我们的团队现在可以专注于创建更出色的用户体验和提供相关功能。Flutter 让我们能够超越期望！”**

从更广泛的角度上看，LinkedIn 最近进行的一项研究显示，根据网站成员在过去一年中所添加的个人资料，Flutter 是软件工程师中[增长最快的一项技能](https://learning.linkedin.com/blog/tech-tips/the-fastest-growing-skills-among-software-engineers--and-how-to-)。在最近的 2019 年 StackOverflow 开发者调查问卷中，Flutter 被列为 [最受欢迎的开发者框架之一](https://insights.stackoverflow.com/survey/2019#technology-_-most-loved-dreaded-and-wanted-other-frameworks-libraries-and-tools)。

## 适用于桌面平台的 Flutter

Flutter 目前也被用于桌面平台。在过去几个月，我们一直在研究桌面平台这一 [实验性项目](https://github.com/google/flutter-desktop-embedding)。但现在该项目逐渐演变成 Flutter 引擎，并将这项工作直接集成到 mainline repo 中。尽管这些目标尚未在生产环境中部署，但我们已发布早期说明，以便开发 [在 Mac、Windows 和 Linux 上运行的 Flutter 应用](https://github.com/flutter/flutter/wiki/Desktop-shells)。

另一个快速发展的 Flutter 平台是 Chrome 操作系统，每年售出的 Chromebook 多达数百万台，尤其是在教育领域。无论是运行 Flutter 应用，还是作为开发者平台，Chrome 操作系统都为 Flutter 提供了绝佳环境，因为该系统支持执行 Android 和 Linux 应用。借助 Chrome 操作系统，你可以使用 Visual Studio Code 或 Android Studio 来开发 Flutter 应用，并在没有模拟器的情况下使用同一台设备本机测试和运行应用。你还可以在 Play Store 发布适用于 Chrome 操作系统的 Flutter 应用，让数百万用户因你的创作而受益。

## 适用于嵌入式设备的 Flutter

举例说明 Flutter 便携性的最后，我们将介绍可嵌入其他设备的 Flutter。最近我们发布了一些示例，演示了直接在 Raspberry Pi 等小型设备上运行 Flutter 的情况。我们还为 Flutter 开发了一个嵌入式 API，以便将其用于家庭和汽车等场景。

Smart Display 操作系统或许是 Flutter 目前已运行的最常见嵌入式平台之一，其为类似于 Google Home Hub 的设备提供技术支持。

![]({{site.flutter-files-cn}}/posts/flutter-cn/2019/flutter-1dot5-release/flutter-google-home-hub.png){:width="85%"}

目前在 Google 中，Smart Display 平台的部分 Google 自建功能由 Flutter 提供技术支持。Google 助理团队很高兴能够在接下来的几个月继续扩展通过 Flutter 为 Smart Display 构建的各项功能；而今年的目标是利用 Flutter 来驱动整个系统界面。

## 其他资源

开发者经常询问我们如何完成 Flutter 入门。现在我们很高兴地宣布推出全新的综合性 Flutter 培训课程。该课程由 Udemy 上评分最高的 iOS 培训课程的制作者 The App Brewery 构建。他们的最新课程涵盖 30 多个小时的 Flutter 内容，其中包括视频、演示和实验。在 Google 的赞助下，The App Brewery 宣布推出此课程的限时折扣，原来的零售价为 199 美元，现只需 10 美元。

许多开发者正在利用 Flutter 开发振奋人心的应用。在 Google I/O 大会的筹备阶段，我们举办了名为 Flutter Create 的挑战赛，鼓励开发者使用不超过 5KB 的 Dart 代码通过 Flutter 构建内容。我们收到来自世界各地的 750 多个独特参赛作品，其中一些作品让我们大开眼界，谁能想到如此少的代码竟然能创造出如此精彩的作品。

我们在此宣布获胜者，你可前往 flutter.dev/create 查看获胜名单。祝贺总冠军 Zebiao Hu，其将荣获价值超过 1 万美元的全加载式 iMac Pro！

<iframe src="{{site.bili.embed}}?aid=52416421&page=1&autoplay=false" {{site.bili.set}}></iframe>

Flutter 不再只是一个移动框架，更是一个多平台框架，可帮助你触及任何地方的用户。我们迫不及待地看到你利用 Flutter 在 Web、桌面、移动及其他平台上构建的内容！
