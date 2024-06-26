---
title: 字节跳动的多平台绽放秘诀 | Flutter 开发者故事
toc: true
keywords: Flutter开发者故事, 字节跳动
description: 更高效、更灵活、更精美，以及更多样的产品研发，需要什么样的开发工具？看字节跳动分享他们的故事。
image:
    path: https://files.flutter-io.cn/posts/images/2022/05/3o1bOf.png
---

字节跳动旗下运营着一系列成功的用户产品、企业应用以及服务，覆盖信息、教育、娱乐等不同领域。随着产品阵容的不断发展，传统的原生双平台开发已经难以满足团队更高效、更灵活、更精美，以及更多样的产品研发需求。Google 首次发布 Flutter 的时候，团队就果断决定用手上的 iOS 和 Android 应用来测试其跨平台开发能力，而 Flutter 也用不逊于原生框架的性能表现和极高的生产力迅速征服了团队成员们的心。

<iframe width="690" height="480" src="{{site.bili.embed}}?aid=596724784&bvid=BV1xB4y197Tc&cid=722160670&page=1&autoplay=false" {{site.bili.set-short}}> </iframe>


> Flutter 拥有令人难以置信的超高效率，与原生双端开发相比，Flutter 为我们的团队节省了大约 1/3 的开发时间。
> 
> —— 董岩, 字节跳动 Flutter Infra 团队负责人

## **多平台出击，拥抱更多机遇**

在更多的平台上覆盖更多用户一直是字节跳动产品团队的目标之一。比如在中国非常受欢迎的短视频娱乐应用 "抖音火山版"，就让 iOS 和 Android 平台的用户都可以通过分享短视频来展示他们的爱好、技能与日常，且拥有非常一致的体验。

![△ 抖音火山版]({{site.flutter-files-cn}}posts/images/2022/05/3xkCSz.gif)

△ 抖音火山版

在 2B 领域，字节跳动则有一款支持企业协同办公的一站式应用 Lark，通过音视频会议、文档共享、及一系列项目管理与能效工具来支持团队的即时通讯需求。其中，Lark 的移动版本使用了 Flutter 来实现跨平台开发。

![△ 协同办公一站式应用 Lark]({{site.flutter-files-cn}}posts/images/2022/05/slsqWB.gif)

△ 协同办公一站式应用 Lark

## **开发更高效，释放团队创意**

[热重载 (Hot reload)](https://docs.flutter.cn/development/tools/hot-reload) 一直是 Flutter 最令开发者们称道的开发特性之一，让工程师不再需要一遍遍地等待漫长的编译，从而高效调试代码，快速将 UI 设计师的想法变为现实。

为了让开发者们能最大限度利用各个平台的原生底层功能，Flutter 还提供了外部功能接口 [FFI](https://docs.flutter.cn/development/platform-integration/c-interop)。这使得 Flutter 应用可以直接调用 C++ 层代码，提高与硬件交互的效率，同时实现端上深度学习模型的部署。

"极课错题打印机" 和 "极课阅卷大师" 两款智能设备上搭载的应用都使用 Flutter 开发，前者用于放置在校园内供学生们自助打印错题，后者则可以帮助老师智能识别学生的答卷以及统计分数。借助 Flutter，团队得以为超过 200 所学校的师生快速完成设备软件的开发以及迭代。

![△ 智能设备 "极课错题打印机" 中的应用使用 Flutter 开发]({{site.flutter-files-cn}}posts/images/2022/05/oMNaBD.gif)

△ 智能设备 "极课错题打印机" 中的应用使用 Flutter 开发

有些时候，Flutter 打造的作品本身也能进一步提升团队的工作效率。比如字节跳动最有趣的 Flutter web 应用之一 Alchemy，这是一款服务于抖音内容创作的内部工具，为 PGC 与 UGC 用户提供便捷有趣的素材生成工具与海量素材，并批量产出受版权保护的设计物料。

![△ Alchemy]({{site.flutter-files-cn}}posts/images/2022/05/7AhByp.gif)

△ Alchemy

## **像素级精美，收获用户芳心**

Flutter 对应用屏幕渲染的精确控制能力，让团队得以放开手脚打磨产品的每一个像素。"Lemon8" 就凭借优良的用户体验荣登 2021 年日本地区 Google Play 年度应用榜单，这是一款兴趣种草社区应用，专注于时尚、美容、美食、旅游、居家、健身、艺术、户外、摄影等内容领域。多样的兴趣圈层对应用的一致认可，离不开 Flutter 对画布强大的控制力，以及团队的精心雕琢。

![△ Lemon8]({{site.flutter-files-cn}}posts/images/2022/05/wbj080.gif)

△ Lemon8

## **多平台开发解决方案**

> Flutter 是我们公司当下重要的多平台开发解决方案。我们从最初的几个应用开始，逐渐发展到现在的 90 多个应用，面向包括移动端、web 端、桌面端，以及嵌入式设备等多个平台。我们致力于推动 Flutter 在字节跳动的深度应用，并对核心框架作出贡献。
>
> —— 王莹，字节跳动 Flutter Infra 引擎技术负责人

移动端医疗服务应用 "小荷健康"、推荐优质房地产内容和信息的应用 "幸福里"、团队虚拟办公工具 "Coze"，以及程序员和产品经理们熟悉的社区平台 "掘金"……字节跳动如今使用 Flutter 开发的应用已经超过 90 款，全部由字节跳动的 800 多名 Flutter 开发者和 Flutter Infra 团队共同支持。

在如此广泛地采用 Flutter 的同时，团队自然也对 Flutter 开放的社区赞叹不已: 来自世界各地的开发者们都在为社区贡献代码、编写 package、完善文档和制作教程，而总有让你挠头的问题能在社区中找到答案。

团队也在为 Flutter 核心框架作出自己的贡献。比如提升核心框架在 [iOS](https://github.com/flutter/engine/pull/17366) 和 [Android](https://github.com/flutter/engine/pull/30924) 上的稳定性，[优化 RasterCache](https://github.com/flutter/engine/pull/31892)、[PlatformView](https://github.com/flutter/engine/pull/27662)、[多引擎](https://github.com/flutter/engine/pull/17366)、[线程调度](https://github.com/flutter/engine/pull/30605)、[x86 桌面系统](https://github.com/flutter/engine/pull/30417) 和 [Web](https://github.com/flutter/website/pull/3296) 等功能，以及为 Flutter 的 [DevTools](https://github.com/flutter/engine/pull/30538)、[空安全问题](https://github.com/flutter/engine/pull/30145) 提供修复等等。

随着 [Flutter 3](https://flutter.cn/posts/introducing-flutter-3) 的发布，相信字节跳动团队会创造出更多、更美好的多平台本地化应用，让我们拭目以待！
